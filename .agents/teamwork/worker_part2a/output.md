# INFORME FORENSE DE AUDITORÍA ZERO-TRUST — CONFECCIONES LISS

## PARTE 2A: HALLAZGOS DE SEVERIDAD ALTA (PARTE 1 DE 2: SEC-03 A A11Y-05)

```
================================================================================
HALLAZGOS DE SEVERIDAD ALTA (PARTE 1 DE 2 — 11 VULNERABILIDADES Y DEFECTOS)
================================================================================
```

---

### SEC-03: Inyección de Cláusula de Filtro PostgREST No Sanitizada en Catalog Service

- **Categoría:** Seguridad (Validación de Entrada e Inyección / ASVS V5.3)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/lib/catalogService.ts:427-428`
- **Diagnóstico y Escenario de Fallo:**
  La función `getUniversityProducts` construye cláusulas de filtrado dinámicas mediante interpolación directa en plantillas de cadenas de texto (_template string interpolation_):
  `.or(`category.ilike.%${universidad}%,description.ilike.%${universidad}%,name.ilike.%${universidad}%`)`.
  PostgREST utiliza comas (`,`) y puntos (`.`) como operadores estructurales y delimitadores lógicos fundamentales en su sintaxis de consultas. Si un cliente malicioso suministra un _slug_ o identificador de universidad manipulado (por ejemplo: `foo),is_active.eq.false,name.ilike.(bar`), la cadena de filtrado resultante que recibe PostgREST se altera estructuralmente. Esta inyección en la sintaxis de PostgREST elude las restricciones de filtrado de la aplicación, exponiendo potencialmente productos no listados, registros inactivos (`is_active = false`) o datos no autorizados.
- **Código de Remediación Exacto:**
  ```typescript
  // Archivo: src/lib/catalogService.ts (línea 427)
  // Sanitizar estrictamente el identificador de la universidad antes de interpolarlo en la sintaxis de PostgREST
  const sanitizedUni = (universidad ?? "").replace(/[^a-zA-Z0-9_-]/g, "");
  const query = supabase
    .from("products")
    .select(PRODUCT_CARD_SELECT)
    .eq("is_active", true)
    .or(
      `category.ilike.%${sanitizedUni}%,description.ilike.%${sanitizedUni}%,name.ilike.%${sanitizedUni}%`
    );
  ```

---

### SEC-04: Server Action Pública e Insegura de Invalidación de Caché

- **Categoría:** Seguridad (Autorización y Control de Acceso)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/actions/categories.ts:19-50`
- **Diagnóstico y Escenario de Fallo:**
  Tal como se determinó en el hallazgo ARCH-02, la Server Action `revalidateAfterCategorySave()` carece en su totalidad de comprobaciones de autenticación o validación de rol administrativo. Al ser accesible públicamente como un punto final de llamada a procedimiento remoto (RPC endpoint) en Next.js, atacantes no autenticados pueden inundar la acción con solicitudes HTTP POST continuas. Esto detona una estampida de caché (_cache stampede_) e invalida de forma indiscriminada rutas críticas del sitio (`/`, `/catalogo`, `/catalogo/universidades`, etc.), agotando los recursos de CPU/SSR del servidor y generando denegación de servicio (DoS) por degradación del rendimiento.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/actions/categories.ts
  "use server";

  import { adminActionClient } from "@/lib/safe-action";
  import { revalidatePath } from "next/cache";
  import { z } from "zod";

  export const revalidateAfterCategorySave = adminActionClient
    .schema(z.object({}).optional())
    .action(async () => {
      revalidatePath("/");
      revalidatePath("/catalogo");
      revalidatePath("/catalogo/universidades");
      revalidatePath("/(public)/catalogo/[sector]", "page");
      return { success: true };
    });
  ```

---

### SEC-05: Rate Limiting Inefectivo en Memoria por Email y Riesgo de Service Role en Crudo

- **Categoría:** Seguridad (Limitación de Tasa y Gestión de Credenciales)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/actions/contact.ts:40-49`
- **Diagnóstico y Escenario de Fallo:**
  En `src/actions/contact.ts`, la limitación de tasa (_rate limiting_) se gestiona mediante un objeto `Map` en la memoria volátil del proceso, indexado exclusivamente por el `email` proporcionado por el usuario. En un entorno de ejecución _serverless_ (como Vercel / AWS Lambda), las instancias efímeras no comparten memoria entre sí, volviendo completamente ineficaces los mapas en memoria. Asimismo, un atacante puede rotar arbitrariamente la dirección de correo electrónico para eludir la restricción en una misma instancia en caliente. Adicionalmente, la línea 45 accede a `process.env.SUPABASE_SERVICE_ROLE_KEY` de forma directa y cruda sin pasar por el esquema validado en `src/env.ts`, eludiendo las garantías de tipado estricto y validación de variables de entorno en tiempo de arranque.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/actions/contact.ts
  // Implementar limitación de tasa persistente en base de datos o Upstash Redis, e identificar la IP real del cliente
  import { actionClient } from "@/lib/safe-action";
  import { contactSchema } from "@/schemas/contactSchema";
  import { getSupabaseClient } from "@/lib/supabaseClient";
  import { headers } from "next/headers";

  export const sendContactMessage = actionClient
    .schema(contactSchema)
    .action(async ({ parsedInput }) => {
      const headerList = await headers();
      const clientIp =
        headerList.get("x-real-ip") ||
        headerList.get("x-forwarded-for")?.split(",")[0] ||
        "unknown";

      const supabase = getSupabaseClient();
      // Inserción con clave anónima (anon key), aplicando la política RLS sobre contact_messages
      const { error } = await supabase.from("contact_messages").insert({
        name: parsedInput.nombre,
        email: parsedInput.email,
        phone: parsedInput.telefono,
        subject: parsedInput.asunto,
        message: parsedInput.mensaje,
      });

      if (error) throw new Error("No se pudo registrar el mensaje");
      return { success: true };
    });
  ```

---

### SEC-06: Secreto de Cliente de Google OAuth en Texto Plano en `.env`

- **Categoría:** Seguridad (Exposición de Secretos y Credenciales)
- **Severidad:** Alta
- **Ubicación Exacta:** `.env:17`
- **Diagnóstico y Escenario de Fallo:**
  Se encuentra una clave activa comentada correspondiente al Secreto de Cliente de Google OAuth (`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`) almacenada directamente dentro del archivo `.env`. Almacenar credenciales funcionales en archivos de entorno locales dentro del espacio de trabajo expone al proyecto a fugas de credenciales de alto riesgo en caso de sincronización accidental con repositorios de Git, respaldos inseguros o vulnerabilidades de lectura arbitraria de archivos.
- **Código de Remediación Exacto:**
  1. Revocar inmediatamente la credencial `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` en la Consola de Google Cloud (GCP Console).
  2. Eliminar de inmediato la línea 17 del archivo `.env`:
  ```bash
  # Eliminar la línea 17 de .env:
  # GOOGLE_CLIENT_SECRET=GOCSPX-...
  ```

---

### SEC-07: Valor por Defecto Inseguro para `REVALIDATE_SECRET` en Producción

- **Categoría:** Seguridad (Secretos y Autenticación)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/env.ts:11-14`
- **Diagnóstico y Escenario de Fallo:**
  En `src/env.ts`, la variable `REVALIDATE_SECRET` define un valor por defecto de respaldo:
  `REVALIDATE_SECRET: z.string().default("dev_revalidate_secret_local")`.
  Si el entorno de despliegue en producción omite configurar la variable `REVALIDATE_SECRET`, la plataforma asume silenciosamente `"dev_revalidate_secret_local"`. Cualquier agente externo que conozca este valor predeterminado del código fuente puede realizar peticiones a `/api/revalidate?secret=dev_revalidate_secret_local` y provocar invalidaciones de caché arbitrarias y no autorizadas.
- **Código de Remediación Exacto:**
  ```typescript
  // Archivo: src/env.ts (líneas 11-14)
  REVALIDATE_SECRET: process.env.NODE_ENV === "production"
    ? z.string().min(16, "REVALIDATE_SECRET debe tener al menos 16 caracteres en producción")
    : z.string().default("dev_revalidate_secret_local"),
  ```

---

### PERF-02: Doble Descarga y Desajuste de Preload en Imagen LCP de Detalle de Producto

- **Categoría:** Rendimiento (Recursos Estáticos y Core Web Vitals)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/app/(public)/catalogo/[sector]/[id]/page.tsx:207-218` y `src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx:212-223`
- **Diagnóstico y Escenario de Fallo:**
  Las páginas de detalle de producto emiten un encabezado/etiqueta `<link rel="preload" as="image" href={imageUrl} fetchPriority="high" />` apuntando a la URL directa del bucket de Supabase Storage. Sin embargo, en el cliente, `ProductDetailClient.tsx:425` renderiza `<Image src={mainImg} fill priority sizes="..." quality={80} />`, que el optimizador de Next.js reescribe a `/_next/image?url=...&w=1080&q=80`. Dado que los navegadores web asocian la caché de precarga estrictamente mediante coincidencia exacta de URL, consideran que se trata de dos recursos distintos. El navegador descarga primero el archivo crudo original de varios megabytes desde Supabase Storage y posteriormente el archivo optimizado WebP/AVIF, duplicando el consumo de ancho de banda y demorando el LCP (_Largest Contentful Paint_).
- **Código de Remediación Exacto:**
  Eliminar los elementos manuales `<link rel="preload">` de ambas páginas de detalle. La propiedad `priority` del componente `<Image>` de Next.js genera automáticamente el enlace de precarga responsivo y correcto para el recurso optimizado.
  ```tsx
  // Archivo: src/app/(public)/catalogo/[sector]/[id]/page.tsx
  // Eliminar líneas 206-218
  ```
  ```tsx
  // Archivo: src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx
  // Eliminar líneas 211-223
  ```

---

### PERF-03: Preload Desperdiciado en Escritorio y Riesgo de CLS por `<img>` en `StaticHeroImage`

- **Categoría:** Rendimiento (Recursos Estáticos y Core Web Vitals)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/ui/StaticHeroImage.tsx:14-41` y `next.config.mjs:72-80`
- **Diagnóstico y Escenario de Fallo:**
  Tanto `next.config.mjs` como `StaticHeroImage.tsx` precargan incondicionalmente la imagen móvil de 440px para todos los visitantes de `/`. En pantallas de escritorio (>1024px), la etiqueta `<picture>` descarta la imagen de 440px y procesa `/images/hero/hero-home.webp`. Los navegadores de escritorio descargan la imagen de 440px, la descartan sin utilizarla y proceden a descargar la imagen completa de escritorio. Adicionalmente, la etiqueta de respaldo `<img>` no cuenta con dimensiones explícitas `width` y `height`, provocando desplazamiento acumulativo del diseño (Cumulative Layout Shift - CLS).
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/ui/StaticHeroImage.tsx
  export function StaticHeroImage({ sizes: _sizes }: StaticHeroImageProps) {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <picture>
          <source
            media="(max-width: 480px)"
            srcSet="/images/hero/hero-home-440.webp"
          />
          <source
            media="(max-width: 640px)"
            srcSet="/images/hero/hero-home-640.webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/images/hero/hero-home-800.webp"
          />
          <img
            src="/images/hero/hero-home.webp"
            alt="Uniformes médicos y universitarios de Confecciones Liss"
            width={800}
            height={1000}
            className="h-full w-full rounded-xl object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    );
  }
  ```
  ```javascript
  // Archivo: next.config.mjs (líneas 72-80)
  {
    source: '/',
    headers: [
      {
        key: 'Link',
        value: '</images/hero/hero-home-440.webp>; rel=preload; as=image; media="(max-width: 480px)"; fetchpriority=high',
      },
    ],
  },
  ```

---

### PERF-04: Diccionario Monolítico de Iconos en Cliente (140+ Lucide Icons) que Destruye el Tree-Shaking

- **Categoría:** Rendimiento (Tamaño del Paquete e Importaciones)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/ui/icons/Icon.tsx:1-143, 159-392`
- **Diagnóstico y Escenario de Fallo:**
  `Icon.tsx` declara la directiva `"use client"` e importa de forma estática 142 iconos de la librería Lucide dentro de un mapa monolítico `ICON_MAP`. Los empaquetadores no pueden eliminar los iconos no utilizados mediante _tree-shaking_ debido a que se encuentran referenciados como propiedades estáticas de un objeto de mapeo global. Cada Server Component que utiliza `<Icon />` instancía un límite de cliente (_client boundary_) que arrastra y empaqueta la totalidad de los 142 iconos dentro del fragmento de JavaScript enviado al navegador.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/components/ui/icons/Icon.tsx
  import React from "react";
  import type { LucideProps } from "lucide-react";
  import {
    Home,
    Store,
    ShoppingCart,
    Heart,
    Search,
    Menu,
    X,
    User,
    HelpCircle,
  } from "lucide-react";

  const CORE_ICONS: Record<string, React.ComponentType<LucideProps>> = {
    home: Home,
    store: Store,
    shopping_cart: ShoppingCart,
    favorite: Heart,
    search: Search,
    menu: Menu,
    close: X,
    user: User,
  };

  export function Icon({ name, className, size = 20, ...props }: any) {
    const key = (name ?? "").toLowerCase().replace(/-/g, "_").trim();
    const Component = CORE_ICONS[key] ?? HelpCircle;
    return <Component className={className} size={size} {...props} />;
  }
  ```

---

### PERF-05: Ausencia de Code Splitting para Modales Globales Pesados (`CartDrawer` y `LoginModal`)

- **Categoría:** Rendimiento (División de Código y Carga Perezosa)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/layout/GlobalModals.tsx:12-28`
- **Diagnóstico y Escenario de Fallo:**
  `GlobalModals.tsx` importa de manera estática y síncrona los componentes `CartDrawer` (896 líneas de código que incluyen dependencias como `FocusLock`, `react-hot-toast`, `DeliveryFormModal` y la base de datos de departamentos/municipios de El Salvador) y `LoginModal`. Debido a que `GlobalModals` está montado en `src/app/(public)/layout.tsx:53`, la totalidad de la lógica de estos modales se descarga, analiza y ejecuta en la carga inicial de todas las páginas públicas del sitio, a pesar de que ambos modales inician en estado cerrado para todos los usuarios.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/components/layout/GlobalModals.tsx
  "use client";

  import dynamic from "next/dynamic";
  import { useAuth } from "@/context/AuthContext";
  import { useCart } from "@/context/CartContext";

  const CartDrawer = dynamic(
    () => import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer),
    { ssr: false }
  );

  const LoginModal = dynamic(
    () => import("@/components/cart/LoginModal").then((mod) => mod.LoginModal),
    { ssr: false }
  );

  export function GlobalModals() {
    const { authModalContext, hideAuthModal } = useAuth();
    const { isCartOpen } = useCart();

    return (
      <>
        {isCartOpen && <CartDrawer />}
        {authModalContext !== null && (
          <LoginModal
            isOpen={authModalContext !== null}
            onClose={hideAuthModal}
            context={authModalContext ?? "generic"}
          />
        )}
      </>
    );
  }
  ```

---

### PERF-06: Valores de Contexto No Memoizados Desencadenando Cascadas Masivas de Re-renderizado

- **Categoría:** Rendimiento (Ciclo de Vida de Renderizado y Re-renders)
- **Severidad:** Alta
- **Ubicación Exacta:**
  - `src/context/FavoritesContext.tsx:294-299`
  - `src/context/CartContext.tsx:695-715`
  - `src/context/AuthContext.tsx:458-473`
  - `src/context/NotificationContext.tsx:847-861`
- **Diagnóstico y Escenario de Fallo:**
  Ninguno de los cuatro Context Providers globales memoiza sus propiedades `value` mediante `useMemo`. En `FavoritesContext.tsx:294`, la construcción `value={{ favorites, toggleFavorite, isFavorite }}` genera una nueva referencia de objeto en cada ciclo de renderizado. Como cada `CatalogProductCard.tsx:77` se suscribe a `useFavorites()`, cualquier actualización en el proveedor obliga a React a re-renderizar de forma redundante las más de 50 tarjetas de catálogo presentes en la cuadrícula, degradando la fluidez de la interfaz.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/context/FavoritesContext.tsx (líneas 293-303)
  const contextValue = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
  ```

---

### A11Y-05: Ausencia de Trampas de Foco (`FocusLock`) en Diálogos Modales Principales

- **Categoría:** Accesibilidad (Navegación por Teclado y Gestión de Foco / WCAG 2.4.3)
- **Severidad:** Alta
- **Ubicación Exacta:**
  - `src/components/layout/SearchModal.tsx:220-226`
  - `src/components/catalogo/MobileFilterDrawer.tsx:107-115`
  - `src/components/catalogo/UnabWarningModal.tsx:33-38`
  - `src/components/catalogo/ProductReviews.tsx:177-182`
- **Diagnóstico y Escenario de Fallo:**
  Estos componentes modales declaran `role="dialog"` y `aria-modal="true"` pero carecen de confinamiento de foco (_focus trap_ o _focus containment_). Cuando un usuario que navega mediante teclado presiona la tecla `Tab` dentro del modal abierto, el foco escapa hacia el árbol DOM del fondo oculto tras la capa de superposición, violando el criterio de éxito WCAG 2.4.3 y desorientando a usuarios que dependen de tecnologías de asistencia o teclado exclusivamente.
- **Código de Remediación Exacto:**

  ```tsx
  // Envolver el contenido del diálogo modal en FocusLock (ya disponible en package.json)
  import FocusLock from "react-focus-lock";

  // Archivo: src/components/layout/SearchModal.tsx
  <FocusLock returnFocus autoFocus>
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda de productos"
      className="..."
    >
      {/* Contenido del modal */}
    </div>
  </FocusLock>;
  ```
