# INFORME FORENSE DE AUDITORÍA EXHAUSTIVA DE CÓDIGO BASE ZERO-TRUST

**Objetivo:** Aplicación Web Confecciones Liss (`confeccionesliss.com`)  
**Pila Tecnológica:** Next.js 16 (App Router), React 19, Supabase (PostgreSQL, Auth, RLS, Storage, Edge Functions), Tailwind CSS, TypeScript  
**Modo de Integridad:** Benchmark (Inspección Pasiva Zero-Trust — Cero Ejecución de Código, Cero Mutaciones en Archivos del Repositorio)  
**Fecha de Auditoría:** 2026-11-07  
**Estándares:** OWASP Top 10 (2021), OWASP ASVS v4.0.3, W3C WCAG 2.1 AA, Core Web Vitals, Arquitectura App Router de Next.js, Directivas de `AGENTS.md`

---

## 1. Mapa de Superficie Auditada

Se llevó a cabo una inspección estática pasiva y exhaustiva de la totalidad de los **813 archivos rastreados** en el repositorio. El mapeo de superficie abarca configuraciones, límites entre componentes de cliente y servidor, esquemas de bases de datos, rutas de API, Server Actions, almacenes de estado, hooks personalizados y scripts de terceros.

### 1.1 Estructura del Código y Módulos

| Módulo / Subsistema                             | Archivos y Directorios Clave Inspeccionados                                                                                                                            | Rol Funcional y Notas de Arquitectura                                                                                                                                                   |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shell Raíz y Enrutamiento**                   | `src/app/layout.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/proxy.ts`                                          | Shell de Next.js 16 App Router, optimización de fuentes (`next/font`), metadatos raíz, middleware de interruptor de emergencia (killswitch), protección de rutas mediante proxy.        |
| **Rutas Públicas del Catálogo**                 | `src/app/(public)/catalogo/**`, `src/app/(public)/page.tsx`, `src/components/catalogo/**`                                                                              | Catálogo maestro, páginas por sector (`scrubs`, `escolar`, `corporativo`), catálogos universitarios (`univo`, `ugb`, `unab`, `ieproes`, `ues`, `uma`), detalles dinámicos de productos. |
| **Comercio Electrónico y Checkout**             | `src/components/cart/CartDrawer.tsx`, `src/components/cart/DeliveryFormModal.tsx`, `src/components/cart/FavoritesModal.tsx`, `src/app/(public)/confirmacion-pedido/**` | Estado del carrito, sincronización de precios del lado del cliente, conjunto de datos de municipios de El Salvador, selección de método de entrega, despacho de pedidos vía WhatsApp.   |
| **Autenticación y Perfil**                      | `src/app/auth/callback/route.ts`, `src/context/AuthContext.tsx`, `src/app/(public)/cuenta/**`, `src/app/(admin)/admin/login/**`                                        | Intercambio de cookies SSR de Supabase, inicio de sesión OAuth con Google, escucha de sesión, inspección de roles (`user.app_metadata.role === 'admin'`).                               |
| **Suite de Administración**                     | `src/app/(admin)/admin/**` (`products`, `categories`, `messages`, `notificaciones`, `settings`, `usuarios`)                                                            | Panel de administración protegido, gestión de inventario, visor de mensajes, difusor de campañas Web Push, interruptor de emergencia (killswitch).                                      |
| **Server Actions**                              | `src/actions/catalog.ts`, `src/actions/categories.ts`, `src/actions/contact.ts`, `src/actions/featuredProducts.ts`                                                     | Server Actions de Next.js para purga de caché (`revalidatePath`), envío de formularios de contacto y alternancia de productos destacados.                                               |
| **Puntos de Entrada API (Endpoints)**           | `src/app/api/csp-report/route.ts`, `src/app/api/revalidate/route.ts`                                                                                                   | Ingesta de reportes de violaciones de CSP, manejador de webhook de revalidación on-demand para ISR.                                                                                     |
| **Base de Datos y Migraciones**                 | `supabase/migrations/*.sql` (14 migraciones SQL), `supabase/functions/send-push/index.ts`                                                                              | Políticas de Row Level Security (RLS), esquemas de tablas, funciones RPC de PostgreSQL (`get_killswitch_public`), Edge Function de Deno para Web Push.                                  |
| **Estado Global y Proveedores (Providers)**     | `src/context/*` (`CartContext`, `FavoritesContext`, `AuthContext`, `NotificationContext`, `ConfirmContext`), `src/providers/*`                                         | Proveedores de React Context monolíticos, proveedores diferidos mediante `requestIdleCallback`, cliente de React Query.                                                                 |
| **Componentes de Interfaz e Iconos**            | `src/components/layout/**`, `src/components/ui/**`, `src/components/ui/icons/Icon.tsx`                                                                                 | Barra de navegación adaptable (Navbar), barra de navegación inferior móvil, pie de página (Footer), carrusel principal (Hero Carousel), diccionario monolítico de iconos Lucide.        |
| **Configuración de Compilación y Herramientas** | `package.json`, `next.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `knip.json`, `vercel.json`                                                                     | Encabezados de Next.js, patrones remotos de imágenes, directivas de CSP, arnés de pruebas Vitest, configuración de detección de código muerto con Knip.                                 |

### 1.2 Brechas de Herramientas, Pruebas e Infraestructura Identificadas

1. **Cero Cobertura de Pruebas**: A pesar de contar con `vitest` y `@testing-library/react` configurados, existen **0 archivos de prueba** en `src/`. El archivo `package.json` depende de `"test": "vitest run --passWithNoTests"` para aprobar las compilaciones sin ejecutar ninguna prueba real.
2. **Ausencia de Generación de Tipos de Base de Datos**: No existen tipos TypeScript generados desde Supabase (`database.types.ts`). Las operaciones de base de datos dependen de cadenas sin tipar y aserciones dobles inseguras (`as unknown as DbProduct[]`).
3. **Ausencia de `global-error.tsx`**: El App Router de Next.js carece de un límite de errores raíz, dejando las fallas de renderizado del layout raíz sin manejar y emitiendo pantallas en blanco (500 White-Screen) sin estilos del navegador.
4. **Discrepancia en la Rama Destino de CI**: El archivo `.github/workflows/ci.yml` está configurado para la rama `main`, pero las reglas del repositorio en `.agents/AGENTS.md` exigen `master` como la única rama de despliegue válida. Como consecuencia, la integración continua automatizada nunca se ejecuta en los commits dirigidos a producción.
5. **MSW Sin Inicializar**: El archivo `src/mocks/handlers.ts` existe de acuerdo con la Regla 8 de `AGENTS.md`, pero los scripts de inicialización del worker/servidor de MSW están ausentes en el entorno de desarrollo.
6. **Superficies de Depuración y Desarrollo Expuestas Públicamente**: Las rutas `/test-cache` (volcado de tablas de base de datos con `force-dynamic`) y `/sandbox` (suite interactiva de mutación de productos) se encuentran activas en rutas públicas sin barreras de autenticación ni protección de acceso.

---

## 2. Resumen Ejecutivo de Riesgo

| Dominio Auditado                                                                                                               | Crítico |  Alto  | Medio  |  Bajo  | Total Hallazgos |
| :----------------------------------------------------------------------------------------------------------------------------- | :-----: | :----: | :----: | :----: | :-------------: |
| **Seguridad** (Secretos, Autenticación, Control de Acceso, Inyección, XSS/CSRF, Encabezados, Cadena de Suministro)             |    2    |   5    |   5    |   4    |     **16**      |
| **Rendimiento** (Tamaño de Paquete, División de Código, Ciclo de Vida de Renderizado, Fugas de Memoria, Activos, Consultas)    |    1    |   5    |   5    |   4    |     **15**      |
| **Accesibilidad** (Jerarquía Semántica, Teclado/Foco, Formularios/Lectores de Pantalla, Contraste y Movimiento)                |    4    |   7    |   4    |   2    |     **17**      |
| **Calidad de Código y Arquitectura** (Resiliencia ante Errores, Condiciones de Carrera, Tipado, AGENTS.md, Código Muerto, SEO) |    2    |   6    |   5    |   1    |     **14**      |
| **TOTAL**                                                                                                                      |  **9**  | **23** | **19** | **11** |     **62**      |

---

## 3. Registro Detallado de Hallazgos (Ordenado de Crítico a Bajo)

```
================================================================================
HALLAZGOS DE SEVERIDAD CRÍTICA (9 INCIDENCIAS)
================================================================================
```

### SEC-01: Eliminación Arbitraria de Todas las Suscripciones Web Push Mediante Política RLS Insegura

- **Categoría:** Seguridad (Autorización y Control de Acceso / RLS)
- **Severidad:** Crítica
- **Ubicación Exacta:** `supabase/migrations/20260620_notifications_system.sql:108-111`
- **Diagnóstico y Escenario de Fallo:**
  En la migración `20260620_notifications_system.sql`, la política `"push_sub_own_delete"` se encuentra declarada como:
  ```sql
  CREATE POLICY "push_sub_own_delete" ON public.push_subscriptions
    FOR DELETE TO public
    USING (true);
  ```
  El predicado `USING (true)` aplica a la función `public` (la cual incluye visitantes anónimos que utilizan la clave pública `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Cualquier atacante o usuario no autenticado puede enviar una solicitud HTTP `DELETE` hacia `https://<supabase-url>/rest/v1/push_subscriptions` y purgar de manera instantánea todos los endpoints de notificaciones push de la base de datos, destruyendo por completo el canal de notificaciones push de la tienda.
- **Código de Remediación Exacto:**

  ```sql
  -- Archivo: supabase/migrations/20261107_fix_push_subscriptions_rls.sql
  DROP POLICY IF EXISTS "push_sub_own_delete" ON public.push_subscriptions;

  -- Los usuarios autenticados únicamente eliminan sus propias suscripciones push
  CREATE POLICY "push_sub_authenticated_delete" ON public.push_subscriptions
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

  -- Los usuarios anónimos solo pueden eliminar suministrando exactamente su endpoint único de suscripción
  CREATE POLICY "push_sub_anon_delete_by_endpoint" ON public.push_subscriptions
    FOR DELETE TO anon
    USING (
      user_id IS NULL
      AND endpoint = current_setting('request.headers', true)::json->>'x-push-endpoint'
    );
  ```

---

### SEC-02: Ausencia de Autenticación de Llamadas en Edge Function Supabase `send-push` con Privilegios Service Role

- **Categoría:** Seguridad (Autenticación y Autorización / Servidores sin Servidor Edge)
- **Severidad:** Crítica
- **Ubicación Exacta:** `supabase/functions/send-push/index.ts:91-135`
- **Diagnóstico y Escenario de Fallo:**
  La Edge Function `send-push` se ejecuta mediante `serve(...)` de Deno y procesa solicitudes POST sin verificar el encabezado `Authorization` entrante. Cualquier atacante no autenticado puede realizar solicitudes POST a `https://<project-ref>.supabase.co/functions/v1/send-push` con una carga útil arbitraria `{"notification_id": "..."}`. La función utiliza `SUPABASE_SERVICE_ROLE_KEY` para consultar notificaciones y transmitir mensajes push a todos los dispositivos registrados, agotando las cuotas serverless y enviando notificaciones spam a todos los suscriptores.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: supabase/functions/send-push/index.ts
  serve(async (req) => {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "authorization, content-type",
        },
      });
    }

    // ── Imponer Autenticación de Administrador ─────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing or invalid authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user || user.app_metadata?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden: Admin privileges required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Proceder con el despacho de la notificación...
  ```

---

### PERF-01: Cuello de Botella Crítico en SSR — Escaneo de Tabla Sin Límites en Ruta Dinámica `/catalogo`

- **Categoría:** Rendimiento (Eficiencia de Backend y Consultas de Base de Datos)
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/app/(public)/catalogo/page.tsx:16` y `src/lib/catalogService.ts:220-251`
- **Diagnóstico y Escenario de Fallo:**
  `src/app/(public)/catalogo/page.tsx` declara `export const revalidate = false;`, forzando SSR dinámico en cada petición individual. En cada carga, `CatalogoPage` ejecuta `getProductCountsBySector()`. En `src/lib/catalogService.ts:227`, esta consulta ejecuta una llamada no acotada `select("sector, categories(catalog)").eq("is_active", true)` sin `limit` ni agrupación del lado del servidor, trayendo todas las filas de productos activos a la memoria de Node.js e iterando en JavaScript para calcular los conteos por sector. Ante picos de tráfico, esto genera un alto TTFB (Time to First Byte), agotamiento de la memoria del servidor y saturación de la red de la base de datos.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/app/(public)/catalogo/page.tsx
  // Reemplazar línea 16:
  export const revalidate = 86400; // 24 horas ISR con revalidación on-demand
  ```

  ```typescript
  // Archivo: src/lib/catalogService.ts (líneas 220-251)
  import { unstable_cache } from "next/cache";

  export const getProductCountsBySector = unstable_cache(
    async (): Promise<Record<string, number>> => {
      const supabase = getServerClient();
      const { data, error } = await supabase
        .from("products")
        .select("sector, categories(catalog)")
        .eq("is_active", true);

      if (error) {
        logger.error("[catalogService] getProductCountsBySector error:", error);
        return {};
      }

      const counts: Record<string, number> = {};
      for (const row of data ?? []) {
        const r = row as {
          sector: string | null;
          categories: { catalog: string } | { catalog: string }[] | null;
        };
        const cat = Array.isArray(r.categories)
          ? r.categories[0]
          : r.categories;
        const s = r.sector ?? cat?.catalog ?? null;
        if (s) counts[s] = (counts[s] ?? 0) + 1;
      }
      return counts;
    },
    ["product-counts-by-sector"],
    { revalidate: 3600, tags: ["products", "categories"] }
  );
  ```

---

### A11Y-01: Barrera de Exclusión para Teclado en Carrusel Principal de Imágenes Mediante Estado Exclusivo de Puntero

- **Categoría:** Accesibilidad (Navegación por Teclado y Gestión del Foco / WCAG 2.1.1)
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/components/ui/HeroImageCarousel.tsx:57, 133, 140-249`
- **Diagnóstico y Escenario de Fallo:**
  `HeroImageCarousel` condiciona todos los controles del carrusel (botones Siguiente/Anterior, indicadores de diapositiva) a la variable de estado `hasInteracted`:
  `{hasInteracted ? ( <> <button onClick={goNext} ... aria-label="Imagen siguiente"> ... </> ) : null}`.
  `hasInteracted` solo se establece en `true` mediante eventos de puntero (`onTouchStart` en línea 57 y `onMouseEnter` en línea 133). No existe un manejador `onFocus` ni atributo `tabIndex` en el contenedor. Un usuario dependiente exclusivamente del teclado que navegue mediante la tecla `Tab` jamás podrá disparar `onMouseEnter`, manteniendo todos los controles del carrusel permanentemente ocultos del DOM y de las tecnologías de asistencia.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/ui/HeroImageCarousel.tsx
  // Línea 133: Agregar escuchadores de foco para usuarios de teclado:
  <div
    className="relative h-full w-full overflow-hidden"
    onMouseEnter={() => setHasInteracted(true)}
    onTouchStart={() => setHasInteracted(true)}
    onFocus={() => setHasInteracted(true)}
    tabIndex={0}
    aria-label="Galería de imágenes principales de Confecciones Liss"
    role="region"
  >
  ```

---

### A11Y-02: Anidamiento Ilegal de Elementos Interactivos en Modal de Favoritos (`<button>` dentro de `<Link>`)

- **Categoría:** Accesibilidad (Estructura Semántica y WAI-ARIA / WCAG 4.1.2)
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/components/cart/FavoritesModal.tsx:198-242`
- **Diagnóstico y Escenario de Fallo:**
  En `FavoritesModal.tsx`, cada tarjeta de producto renderiza un `<Link>` de Next.js (etiqueta HTML `<a>`), y dentro de él anida un `<button>` ("Quitar de favoritos"):
  ```tsx
  <Link key={product.id} href={getProductUrl(product as any)} ...>
    ...
    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }} ...>
  </Link>
  ```
  Anidar un elemento `<button>` dentro de un elemento `<a>` constituye una violación explícita del estándar HTML Living Standard (sección 4.5.1) y de las especificaciones de accesibilidad del W3C. Los lectores de pantalla exhiben comportamientos impredecibles (ignorando el botón interno, anunciando roles duplicados o fallando en la activación interactiva), imposibilitando el enrutamiento limpio del foco del teclado.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/cart/FavoritesModal.tsx (líneas 198-242)
  <div
    key={product.id}
    className="group relative flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-xs transition-shadow hover:shadow-md"
  >
    <Link
      href={getProductUrl(product as any)}
      onClick={onClose}
      className="flex min-w-0 flex-1 items-center gap-3"
      aria-label={`Ver detalles de ${product.name}`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={product.image_path || "/images/placeholder-product.svg"}
          alt={product.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-gray-900 group-hover:text-[#143067]">
          {product.name}
        </h4>
        <p className="mt-0.5 text-xs font-bold text-[#143067]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
    <button
      type="button"
      onClick={() => toggleFavorite(product.id)}
      className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-[#143067]"
      aria-label={`Quitar ${product.name} de favoritos`}
    >
      <Icon name="close" size={18} />
    </button>
  </div>
  ```

---

### A11Y-03: Elementos Interactivos Anidados y Colapso de Jerarquía de Documento en Campana de Notificaciones

- **Categoría:** Accesibilidad (Jerarquía Semántica / WCAG 1.3.1, 4.1.2)
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/components/ui/GuestBell.tsx:808, 874`
- **Diagnóstico y Escenario de Fallo:**
  En `GuestBell.tsx`, al contenedor de fila se le asigna `role="button"` y `tabIndex={0}` en la línea 808. En la línea 874, un `<button aria-label="Eliminar notificación">` interno está anidado directamente dentro de este contenedor interactivo. Los lectores de pantalla anuncian el botón exterior y absorben o corrompen totalmente el árbol de accesibilidad del botón de eliminación interno, impidiendo a personas con discapacidad motriz o usuarias de lectores de pantalla eliminar notificaciones sin abrirlas involuntariamente.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/ui/GuestBell.tsx (líneas 807-885)
  <li className="flex items-center justify-between border-b border-gray-100 p-3 hover:bg-gray-50">
    <button
      type="button"
      onClick={() => onOpen(notif)}
      className="flex min-w-0 flex-1 items-start gap-3 text-left focus-visible:ring-2 focus-visible:ring-[#143067]"
      aria-label={`Ver notificación: ${notif.title}`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{notif.title}</p>
        <p className="truncate text-xs text-gray-500">{notif.body}</p>
      </div>
    </button>
    <button
      type="button"
      onClick={(e) => onTrash(e, notif)}
      className="shrink-0 p-2 text-gray-400 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
      aria-label={`Eliminar notificación: ${notif.title}`}
    >
      <Icon name="delete" size={16} />
    </button>
  </li>
  ```

---

### A11Y-04: Aniquilación de Semántica de Documento por `role="button"` en Lector de Artículos Legales a Pantalla Completa

- **Categoría:** Accesibilidad (Estructura Semántica / WCAG 1.3.1)
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/components/legal/LegalArticleReader.tsx:215-220`
- **Diagnóstico y Escenario de Fallo:**
  Al contenedor principal de escritorio del lector de documentos legales se le asigna `role="button"`:
  `<div role="button" tabIndex={-1} aria-label="Cerrar documento y volver a la lista" className="fixed inset-0 ...">`.
  Dentro de este contenedor, el componente renderiza el artículo legal completo: etiquetas `<article>`, `<h1>`, `<header>`, párrafos y enlaces interactivos. En las especificaciones W3C ARIA, aplicar `role="button"` a un ancestro hace que los lectores de pantalla colapsen todos los elementos del DOM descendiente en un único nombre de botón, despojando todos los encabezados, secciones y enlaces del árbol de accesibilidad y haciendo el contenido ilegible para tecnologías de asistencia.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/legal/LegalArticleReader.tsx (líneas 215-225)
  {/* Reemplazar role="button" en el contenedor general con un backdrop dedicado */}
  <div
    className="fixed inset-0 z-[9999] hidden items-center justify-center overflow-hidden lg:flex"
    role="dialog"
    aria-modal="true"
    aria-label={policy.title}
  >
    {/* Backdrop accesible */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
      aria-hidden="true"
    />
    {/* Contenedor del documento legal */}
    <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
  ```

---

### ARCH-01: Ausencia de `global-error.tsx` y Límites de Error en Grupos de Rutas

- **Categoría:** Calidad de Código / Resiliencia ante Errores
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/app/error.tsx:1-39` (ausencia de `src/app/global-error.tsx` y `src/app/(admin)/admin/error.tsx`)
- **Diagnóstico y Escenario de Fallo:**
  En el App Router de Next.js, `src/app/error.tsx` NO captura errores arrojados en el Root Layout (`src/app/layout.tsx`). La especificación oficial del App Router de Next.js exige obligatoriamente un archivo `src/app/global-error.tsx` (que renderiza sus propias etiquetas `<html>` y `<body>`) para recuperarse de fallos críticos en proveedores raíz, carga de fuentes o analíticas. Si ocurre una excepción no capturada durante la evaluación del layout raíz, todo el proceso del servidor falla hacia una pantalla blanca 500 no estilizada del navegador, sin navegación ni mecanismos de recuperación para el usuario.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/app/global-error.tsx
  "use client";

  import * as React from "react";
  import { logger } from "@/lib/logger";

  export default function GlobalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    React.useEffect(() => {
      logger.error("[GlobalError] Fallo en layout raíz capturado:", error);
    }, [error]);

    return (
      <html lang="es">
        <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 font-sans text-slate-900">
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
            <h1 className="mb-3 text-2xl font-bold text-[#143067]">
              Error Inesperado del Sistema
            </h1>
            <p className="mb-6 text-sm text-slate-600">
              Ocurrió una falla crítica en el renderizado principal. Nuestro
              equipo ha sido notificado.
            </p>
            {error.digest && (
              <p className="mb-4 font-mono text-xs text-slate-400">
                Ref: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              className="w-full rounded-xl bg-[#143067] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#0f244e] active:scale-[0.98]"
            >
              Recargar Aplicación
            </button>
          </div>
        </body>
      </html>
    );
  }
  ```

---

### ARCH-02: Omisión Total de `next-safe-action` y Server Actions No Autenticadas

- **Categoría:** Límites Arquitectónicos / Seguridad y Resiliencia
- **Severidad:** Crítica
- **Ubicación Exacta:** `src/actions/categories.ts:19`, `src/actions/contact.ts:23`, `src/actions/catalog.ts:39`, `src/actions/featuredProducts.ts:56`
- **Diagnóstico y Escenario de Fallo:**
  `package.json` instala `"next-safe-action": "^8.4.0"` y la Regla 9 de `AGENTS.md` ordena explícitamente:
  _"Todo Server Action debe estar exclusivamente dentro de `src/actions/` y ser envuelto mediante `next-safe-action`."_
  Sin embargo, **ninguna** de las Server Actions implementa `next-safe-action`.
  Adicionalmente, `src/actions/categories.ts:19` (`revalidateAfterCategorySave`) **no realiza ninguna verificación de autenticación ni de sesión**. Cualquier cliente externo no autorizado puede enviar solicitudes HTTP POST a Next.js invocando `revalidateAfterCategorySave()` y forzar purgas de caché continuas y sin límite de todas las rutas públicas (`/`, `/catalogo`, `/catalogo/universidades/*`), introduciendo una vulnerabilidad de Denegación de Servicio (DoS) sobre la caché del servidor.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/lib/safe-action.ts
  import { createSafeActionClient } from "next-safe-action";
  import { createServerClient } from "@supabase/ssr";
  import { cookies } from "next/headers";
  import { env } from "@/env";

  export const actionClient = createSafeActionClient();

  export const adminActionClient = actionClient.use(async ({ next }) => {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user || user.app_metadata?.role !== "admin") {
      throw new Error("No autorizado. Se requieren permisos de administrador.");
    }

    return next({ ctx: { user, supabase } });
  });
  ```

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

```
================================================================================
HALLAZGOS DE SEVERIDAD ALTA (23 INCIDENCIAS)
================================================================================
```

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

---

### A11Y-06: Inacción de la Tecla Escape en Menús Móviles y Drawers de Filtro

- **Categoría:** Accesibilidad (Navegación por Teclado / WCAG 2.1.2 Sin Trampas de Teclado)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/layout/Navbar.tsx:217-230`, `src/components/catalogo/MobileFilterDrawer.tsx:78-90`
- **Diagnóstico y Escenario de Fallo:**
  Los componentes `Navbar.tsx` y `MobileFilterDrawer.tsx` gestionan los eventos de clic exterior mediante escuchadores de `mousedown`, pero omiten registrar un escuchador `keydown` para capturar la pulsación de la tecla `Escape`. Los usuarios dependientes de tecnologías de asistencia o de navegación exclusiva por teclado no pueden cerrar menús ni paneles superpuestos mediante el mecanismo estándar de escape, quedando atrapados u obligados a tabular secuencialmente a través de todo el árbol del DOM hasta alcanzar controles explícitos de cierre, lo cual contraviene directamente el criterio de conformidad WCAG 2.1.2.
- **Código de Remediación Exacto:**
  ```typescript
  // Archivo: src/components/layout/Navbar.tsx (líneas 217-230)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen]);
  ```

---

### A11Y-07: Controles de Formulario Sin Etiquetar en Notas de Personalización de Producto

- **Categoría:** Accesibilidad (Formularios y Lectores de Pantalla / WCAG 3.3.2, 4.1.2)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/catalogo/ProductDetailClient.tsx:920-932`
- **Diagnóstico y Escenario de Fallo:**
  El área de texto (`textarea`) destinada a las notas de personalización del producto carece de un elemento `<label htmlFor="custom-note">` asociado. Los lectores de pantalla anuncian únicamente "Edición de texto, en blanco", sin proporcionar ninguna indicación de su propósito, contexto ni instrucciones al usuario.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/catalogo/ProductDetailClient.tsx (líneas 920-932)
  <label htmlFor="custom-note" className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
    <Icon name="edit_note" className="text-[1.125rem]" aria-hidden="true" />
    <span>¿Necesitas personalizar tu pedido?</span>
  </label>
  <textarea
    id="custom-note"
    value={customNote}
    onChange={(e) => setCustomNote(e.target.value)}
    placeholder="Escribe nombres, bordados especiales o indicaciones..."
    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus-visible:ring-2 focus-visible:ring-[#143067]"
  />
  ```

---

### A11Y-08: Ausencia de Semántica de Radio Group en Modal de Formulario de Entrega

- **Categoría:** Accesibilidad (Formularios y Semántica / WCAG 1.3.1, 4.1.2)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/cart/DeliveryFormModal.tsx:295-340`
- **Diagnóstico y Escenario de Fallo:**
  Las opciones del método de entrega ("Retiro en Taller", "Punto Medio", "A Domicilio") se renderizan como simples elementos `<button>` sin `role="radiogroup"` en el contenedor ni `role="radio"` y `aria-checked` en cada una de las opciones. Los lectores de pantalla no anuncian la relación de grupo ni el estado de selección de la opción activa.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/cart/DeliveryFormModal.tsx (líneas 295-340)
  <div
    role="radiogroup"
    aria-label="Método de entrega"
    className="grid grid-cols-3 gap-3"
  >
    {DELIVERY_METHODS.map((method) => {
      const isSelected = selectedMethod === method.id;
      return (
        <button
          key={method.id}
          type="button"
          role="radio"
          aria-checked={isSelected}
          onClick={() => setSelectedMethod(method.id)}
          className={cn(
            "rounded-xl border p-3 text-center transition",
            isSelected
              ? "border-[#143067] bg-[#143067]/5 font-semibold text-[#143067]"
              : "border-gray-200 text-gray-600"
          )}
        >
          {method.label}
        </button>
      );
    })}
  </div>
  ```

---

### A11Y-09: Enlaces Anidados Dentro de `<label>` y Omisión de Atributos `required`

- **Categoría:** Accesibilidad (Formularios y Semántica / WCAG 1.3.1, 3.3.2)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/cart/DeliveryFormModal.tsx:408, 664-703`
- **Diagnóstico y Escenario de Fallo:**
  El elemento `<label htmlFor="delivery-terms">` envuelve dos elementos `<Link>`, violando el modelo de contenido HTML para etiquetas y desorientando a los lectores de pantalla al calcular el nombre accesible. Además, los campos de entrada obligatorios muestran un asterisco visual (`*`), pero omiten los atributos obligatorios `required` o `aria-required="true"`.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/cart/DeliveryFormModal.tsx
  // Separar los elementos label y link:
  <div className="flex items-start gap-2">
    <input
      type="checkbox"
      id="delivery-terms"
      required
      aria-required="true"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#143067] focus:ring-[#143067]"
    />
    <label htmlFor="delivery-terms" className="text-xs text-gray-600">
      Acepto las políticas de entrega. Consulta los{" "}
    </label>
    <Link
      href="/legal/terminos-y-condiciones"
      target="_blank"
      className="text-xs text-[#143067] underline"
    >
      Términos y Condiciones
    </Link>
  </div>
  ```

---

### A11Y-10: Supresión de Outlines Sin Indicador de Foco Accesible en Acordeones de FAQ

- **Categoría:** Accesibilidad (Foco Visible / WCAG 2.4.7)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/servicios/ServicioFAQ.tsx:23`
- **Diagnóstico y Escenario de Fallo:**
  Los botones del acordeón declaran la clase `focus:outline-none` sin suministrar `focus-visible:ring-2`, dejando el foco de navegación por teclado completamente invisible en pantalla.
- **Código de Remediación Exacto:**
  ```tsx
  // Archivo: src/components/servicios/ServicioFAQ.tsx (línea 23)
  className =
    "flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143067] focus-visible:ring-offset-2";
  ```

---

### A11Y-11: Omisión de Preferencia de Movimiento Reducido en Proveedor de Framer Motion

- **Categoría:** Accesibilidad (Movimiento / WCAG 2.2.2, 2.3.3)
- **Severidad:** Alta
- **Ubicación Exacta:** `src/providers/index.tsx:69-80`
- **Diagnóstico y Escenario de Fallo:**
  La aplicación utiliza ampliamente la librería Framer Motion, pero no configura `<MotionConfig reducedMotion="user">` en el proveedor raíz. Los usuarios con trastornos vestibulares del movimiento que han establecido la preferencia de sistema `prefers-reduced-motion` a nivel del sistema operativo continúan siendo expuestos a animaciones forzadas de layout y transformaciones visuales.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/providers/index.tsx
  import { MotionConfig } from "framer-motion";

  export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MotionConfig>
    );
  }
  ```

---

### ARCH-03: Condiciones de Carrera y Actualizaciones de Estado en Componentes Desmontados en Búsqueda Debounced

- **Categoría:** Calidad de Código / Concurrencia y Condiciones de Carrera
- **Severidad:** Alta
- **Ubicación Exacta:** `src/components/layout/SearchModal.tsx:132-173`, `src/app/(admin)/admin/products/page.tsx:81-152`
- **Diagnóstico y Escenario de Fallo:**
  En `SearchModal.tsx:132-173`, las consultas de búsqueda con debouncing se disparan sin banderas de cancelación ni `AbortController`. Si una consulta lenta previa se resuelve después de una consulta más reciente, los resultados obsoletos sobrescriben los resultados frescos. Si el modal se cierra mientras las solicitudes de red están en tránsito, los setters de estado se ejecutan sobre componentes ya desmontados.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/components/layout/SearchModal.tsx (líneas 132-173)
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("products")
          .select(
            "id, name, price, old_price, image_path, slug, sector, category"
          )
          .eq("is_active", true)
          .ilike("name", `%${query}%`)
          .limit(8)
          .abortSignal(controller.signal);

        if (!isCancelled) {
          if (!error && data) setResults(data as unknown as DbProduct[]);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled && (err as { name?: string })?.name !== "AbortError") {
          logger.error("[SearchModal] Query failed:", err);
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      isCancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);
  ```

---

### ARCH-04: Condición de Carrera en Inicialización Asíncrona y Fuga de Memoria en Suscripción de Auth

- **Categoría:** Calidad de Código / Concurrencia y Fugas de Memoria
- **Severidad:** Alta
- **Ubicación Exacta:** `src/context/AuthContext.tsx:353-398`, `src/context/NotificationContext.tsx:413-501`
- **Diagnóstico y Escenario de Fallo:**
  En `AuthContext.tsx:245-399`, `initSession` es una función asíncrona (`async`) dentro de `useEffect`. Dado que `subscription` se asigna _después_ de `await supabase.auth.getSession()`, si el componente se desmonta durante la espera de la promesa (`await`), la función de limpieza se ejecuta mientras `subscription` todavía es `null`. Cuando `onAuthStateChange` se registra posteriormente, nunca se desuscribe y permanece fugando memoria de forma indefinida.
- **Código de Remediación Exacto:**

  ```tsx
  // Archivo: src/context/AuthContext.tsx (líneas 245-399)
  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      const { getSupabaseClient } = await import("@/lib/supabaseClient");
      const supabase = getSupabaseClient();
      if (!mounted) return;

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, currentSession) => {
        if (!mounted) return;
        if (
          event === "SIGNED_OUT" ||
          (event === "TOKEN_REFRESHED" && !currentSession)
        ) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          setLoading(false);
        }
      });

      if (!mounted) subscription.unsubscribe();
      else authSubscription = subscription;
    };

    setupAuth();

    return () => {
      mounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);
  ```

---

### ARCH-05: Incumplimiento Total de la Directiva de Zustand Causando Sobrecarga de Re-renderizado por Contextos

- **Categoría:** Límites Arquitectónicos / Rendimiento y Mantenibilidad
- **Severidad:** Alta
- **Ubicación Exacta:** `src/context/CartContext.tsx:1-717`, `AGENTS.md:Regla 6`
- **Diagnóstico y Escenario de Fallo:**
  La Regla 6 de `AGENTS.md` ordena estrictamente:
  _"- `src/context/` es solo para estados globales con Zustand."_
  El archivo `package.json` instala `"zustand": "^5.0.12"`, sin embargo, Zustand **nunca se importa en ningún archivo de `src/`**. En su lugar, `src/context/` contiene 5 proveedores monolíticos de React Context (más de 700 líneas cada uno), provocando una amplia sobrecarga y cascada de re-renderizados innecesarios a través de toda la aplicación.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/context/useCartStore.ts
  import { create } from "zustand";
  import { persist, createJSONStorage } from "zustand/middleware";
  import type { CartItem, CartProduct } from "@/data/types";
  import { STORAGE_CART_KEY } from "@/lib/constants";

  interface CartState {
    items: CartItem[];
    isCartOpen: boolean;
    addItem: (
      product: CartProduct,
      quantity?: number,
      color?: string | null,
      note?: string
    ) => void;
    removeItem: (productId: string, color?: string | null) => void;
    updateQuantity: (
      productId: string,
      quantity: number,
      color?: string | null
    ) => void;
    setCartOpen: (open: boolean) => void;
    clearCart: () => void;
  }

  export const useCartStore = create<CartState>()(
    persist(
      (set) => ({
        items: [],
        isCartOpen: false,
        addItem: (product, quantity = 1, color = null, note = "") =>
          set((state) => {
            const existing = state.items.find(
              (i) =>
                i.product.id === product.id &&
                i.color === color &&
                i.note === note
            );
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i === existing ? { ...i, quantity: i.quantity + quantity } : i
                ),
              };
            }
            return {
              items: [...state.items, { product, quantity, color, note }],
            };
          }),
        removeItem: (productId, color = null) =>
          set((state) => ({
            items: state.items.filter(
              (i) => !(i.product.id === productId && i.color === color)
            ),
          })),
        updateQuantity: (productId, quantity, color = null) =>
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === productId && i.color === color
                ? { ...i, quantity }
                : i
            ),
          })),
        setCartOpen: (open) => set({ isCartOpen: open }),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: STORAGE_CART_KEY,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
  ```

---

### ARCH-06: Invocaciones Directas de `console.log` / `console.error` en Archivos de Producción

- **Categoría:** Calidad de Código / Divulgación de Información
- **Severidad:** Alta
- **Ubicación Exacta:** `src/actions/contact.ts:101`, `src/actions/catalog.ts:65`, `src/actions/featuredProducts.ts:136`, `src/app/auth/callback/route.ts:64`
- **Diagnóstico y Escenario de Fallo:**
  El código de producción invoca directamente `console.error` y `console.warn` en lugar de utilizar el módulo centralizado `src/lib/logger.ts`. En `src/actions/contact.ts:101`, la instrucción `console.error("[sendContactMessage] Supabase error:", error.message)` expone detalles internos de la base de datos en registros no administrados.
- **Código de Remediación Exacto:**

  ```typescript
  // Archivo: src/actions/contact.ts (línea 101)
  import { logger } from "@/lib/logger";

  if (error) {
    logger.error("[sendContactMessage] Supabase error:", error.message);
    return {
      success: false,
      error: "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
    };
  }
  ```

---

### ARCH-07: Bloques `catch {}` Vacíos y Silenciosos que Tragan el Registro de Auditoría de Seguridad

- **Categoría:** Calidad de Código / Integridad de Auditoría
- **Severidad:** Alta
- **Ubicación Exacta:** `src/actions/contact.ts:61, 115`, `src/context/NotificationContext.tsx:500`
- **Diagnóstico y Escenario de Fallo:**
  En `src/actions/contact.ts:55-61, 109-115`, las inserciones de registros de auditoría en la tabla `security_events` están encerradas en bloques `catch {}` vacíos. Si violaciones de restricciones de esquema o errores de permisos rechazan el registro, el fallo se descarta silenciosamente sin generar alertas.
- **Código de Remediación Exacto:**
  ```typescript
  // Archivo: src/actions/contact.ts (líneas 55-62)
  try {
    await supabase.from("security_events").insert({
      event_type: "contact_rate_limit_exceeded",
      payload: { email: emailKey, count: rateRecord.count },
      url: "/contacto",
    });
  } catch (auditError) {
    logger.error(
      "[sendContactMessage] Failed to record security event:",
      auditError
    );
  }
  ```

---

### ARCH-08: Ausencia Total de Tipos Generados de Base de Datos Supabase y Uso Generalizado de `any`

- **Categoría:** Tipado Estricto
- **Severidad:** Alta
- **Ubicación Exacta:** `src/lib/catalogService.ts:113, 119, 147`, `src/lib/productUtils.ts:123`, `src/app/(admin)/admin/messages/page.tsx:41`
- **Diagnóstico y Escenario de Fallo:**
  El repositorio carece por completo de tipos generados para la base de datos. Como consecuencia, `productUtils.ts:123` exporta `export const applyActiveOfferFilter = (query: any): any => { ... }`, y `catalogService.ts` recurre a dobles aserciones de tipo reiteradas `(data as unknown as DbProduct[])`. Los errores tipográficos o discrepancias en los esquemas no pueden ser detectados en tiempo de compilación.
- **Código de Remediación Exacto:**
  Generar `src/types/database.types.ts` y tipar estrictamente las consultas de utilidad:

  ```typescript
  // Archivo: src/lib/productUtils.ts (líneas 123-130)
  import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
  import type { Database } from "@/types/database.types";

  export const applyActiveOfferFilter = <
    T extends PostgrestFilterBuilder<
      Database["public"],
      Database["public"]["Tables"]["products"]["Row"],
      unknown
    >,
  >(
    query: T
  ): T => {
    const now = new Date().toISOString();
    return query
      .not("old_price", "is", null)
      .or(`offer_starts_at.is.null,offer_starts_at.lte.${now}`)
      .or(`offer_ends_at.is.null,offer_ends_at.gt.${now}`) as T;
  };
  ```

---

```
================================================================================
HALLAZGOS DE SEVERIDAD MEDIA (19 INCIDENCIAS)
================================================================================
```

### SEC-08: Token de Revalidación Sensible en Parámetro de Consulta GET y Comparación Vulnerable a Ataques de Temporización

- **Categoría:** Seguridad (Gestión de Secretos y Ataques de Temporización)
- **Severidad:** Media
- **Ubicación Exacta:** `src/app/api/revalidate/route.ts:8-13`
- **Diagnóstico y Escenario de Fallo:**
  En el manejador de la ruta `GET` de revalidación (`src/app/api/revalidate/route.ts`), el token secreto de autorización se recibe a través del parámetro de consulta de la URL (`request.nextUrl.searchParams.get("secret")`). Transmitir credenciales o secretos en cadenas de consulta (query strings) viola las mejores prácticas de seguridad de OWASP, ya que las URLs se almacenan de forma persistente e inadvertida en historiales de navegación, registros de acceso de servidores web (access logs), cabeceras `Referer`, balanceadores de carga, proxies intermedios y rastreos de depuración de CDN.
  Adicionalmente, la validación `secret !== env.REVALIDATE_SECRET` emplea la comparación estándar de cadenas en JavaScript (`!==`), la cual compara carácter por carácter y aborta en el primer byte discordante (fail-early). Esto introduce una vulnerabilidad de canal lateral (side-channel) por análisis de temporización (timing attack), permitiendo que un atacante remoto determine de forma iterativa el valor de `REVALIDATE_SECRET` midiendo con precisión nanométrica las diferencias en la latencia de respuesta HTTP.
  Un atacante con posesión de este secreto puede disparar de forma masiva e indiscriminada la revalidación forzada de rutas críticas (`/`, `/catalogo`, layouts raíz), saturando el servidor de Next.js, agotando la memoria caché y degradando drásticamente el rendimiento global de la plataforma (Cache Invalidation Denial of Service).
- **Código de Remediación Exacto:**
  Se migra el endpoint del método `GET` al método `POST`, se exige la transmisión del token en la cabecera estándar `Authorization: Bearer <token>` (evitando la filtración en URLs y logs) y se efectúa una comparación en tiempo constante utilizando `crypto.timingSafeEqual` sobre buffers de bytes con validación previa de longitud.

  ```typescript
  // Archivo: src/app/api/revalidate/route.ts
  import { NextRequest, NextResponse } from "next/server";
  import { revalidatePath } from "next/cache";
  import crypto from "node:crypto";
  import { env } from "@/env";

  export const dynamic = "force-dynamic";

  export async function POST(request: NextRequest) {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");

    const tokenBuf = Buffer.from(token);
    const secretBuf = Buffer.from(env.REVALIDATE_SECRET);

    if (
      tokenBuf.length === 0 ||
      tokenBuf.length !== secretBuf.length ||
      !crypto.timingSafeEqual(tokenBuf, secretBuf)
    ) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    try {
      const body = await request.json().catch(() => ({}));
      const path = typeof body.path === "string" ? body.path : "/";

      revalidatePath(path);
      if (path === "/") {
        revalidatePath("/catalogo");
        revalidatePath("/(public)", "page");
        revalidatePath("/(public)/catalogo", "page");
        revalidatePath("/", "layout");
      }

      return NextResponse.json({
        success: true,
        message: `Revalidation triggered successfully for path: ${path}`,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: error?.message || "Internal server error during revalidation",
        },
        { status: 500 }
      );
    }
  }
  ```

---

### SEC-09: Violación de Restricción de Esquema Causando Fallo Silencioso en Registro de Eventos de Seguridad

- **Categoría:** Seguridad (Pistas de Auditoría y Registro de Incidentes)
- **Severidad:** Media
- **Ubicación Exacta:** `supabase/migrations/20260620_security_killswitch.sql:33-41` y `src/actions/contact.ts:57, 111`
- **Diagnóstico y Escenario de Fallo:**
  En la Server Action `sendContactMessage` (`src/actions/contact.ts`), se implementa telemetría de seguridad para registrar tanto los bloqueos por tasa de envío excesiva (`event_type: "contact_rate_limit_exceeded"`) como los mensajes enviados exitosamente (`event_type: "contact_message_sent"`).
  Sin embargo, la definición de la tabla `public.security_events` en la migración `20260620_security_killswitch.sql` impone una restricción de validación rígida mediante restricción de chequeo:
  `CHECK (event_type IN ('csp_violation', 'rate_limit_exceeded', 'killswitch_activated', 'killswitch_deactivated', 'anomaly_detected'))`.
  Debido a que `"contact_rate_limit_exceeded"` y `"contact_message_sent"` no pertenecen a los valores enumerados permitidos, el motor PostgreSQL rechaza las operaciones `INSERT` arrojando un error `23514 (check_violation)`. Dado que estas inserciones están envueltas en bloques `try { ... } catch {}` vacíos (silent catch), el fallo se suprime silenciosamente sin registrar ninguna advertencia o registro de error en el runtime.
  Como resultado, la pista de auditoría de seguridad se encuentra rota: ningún intento de abuso del formulario de contacto ni eventos de auditoría son registrados en la base de datos, imposibilitando el análisis forense de ataques de spam o saturación de mensajes.
- **Código de Remediación Exacto:**
  Se crea una nueva migración SQL que actualiza la restricción `security_events_event_type_check` incorporando los nuevos tipos de eventos necesarios para el formulario de contacto y eventos de administración:

  ```sql
  -- Archivo: supabase/migrations/20261107_expand_security_event_types.sql
  ALTER TABLE public.security_events DROP CONSTRAINT IF EXISTS security_events_event_type_check;

  ALTER TABLE public.security_events ADD CONSTRAINT security_events_event_type_check
    CHECK (event_type IN (
      'csp_violation',
      'rate_limit_exceeded',
      'killswitch_activated',
      'killswitch_deactivated',
      'anomaly_detected',
      'auth_failure',
      'suspicious_activity',
      'contact_rate_limit_exceeded',
      'contact_message_sent',
      'admin_featured_product_toggle'
    ));
  ```

---

### SEC-10: Directivas de Content Security Policy (CSP) Incompletas para Analítica Consentida

- **Categoría:** Seguridad (Cabeceras HTTP de Seguridad y CSP)
- **Severidad:** Media
- **Ubicación Exacta:** `next.config.mjs:50-59`
- **Diagnóstico y Escenario de Fallo:**
  La configuración de cabeceras de seguridad en `next.config.mjs` define una directiva de Content Security Policy (CSP). No obstante, presenta dos debilidades críticas:
  1. Omite dominios de orígenes requeridos por scripts y servicios consentidos mediante el banner de cookies (`CookieBanner.tsx`), específicamente `https://connect.facebook.net` (Meta Pixel) y `https://www.gstatic.com` (Google Merchant Widget / Maps). Como consecuencia directa, cuando un usuario otorga consentimiento expreso, los navegadores bloquean la ejecución de estos scripts de analítica e imágenes de seguimiento arrojando violaciones CSP en la consola y disparando reportes espurios a `/api/csp-report`.
  2. Carece de directivas esenciales de endurecimiento contra ataques de secuestro de clics (Clickjacking), inyección de objetos de plugin y manipulación de URIs base: `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` y `frame-ancestors 'none'`.
- **Código de Remediación Exacto:**
  Se actualiza la cabecera `Content-Security-Policy` en `next.config.mjs` para incorporar los orígenes legítimos autorizados y añadir las directivas de restricción estructural recomendadas por OWASP ASVS:

  ```javascript
  // Archivo: next.config.mjs (líneas 50-64)
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.gstatic.com"
    : "'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.gstatic.com";

  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrc};
    style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com;
    img-src 'self' blob: data: https://lh3.googleusercontent.com https://*.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.co https://images.unsplash.com https://www.google-analytics.com https://www.facebook.com https://www.gstatic.com;
    font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com;
    connect-src 'self' ws: wss: https://*.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.in https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://connect.facebook.net;
    frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://maps.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    report-uri /api/csp-report;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const securityHeaders = [
    ...(isDev
      ? []
      : [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ]),
    {
      key: "Content-Security-Policy",
      value: cspHeader,
    },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), interesting-features=()",
    },
  ];
  ```

---

### SEC-11: Cabecera IP de Cliente Suplantable y Rate Limiting en Memoria en `/api/csp-report`

- **Categoría:** Seguridad (Limitación de Tasa y Validación de Entradas)
- **Severidad:** Media
- **Ubicación Exacta:** `src/app/api/csp-report/route.ts:36-42, 107-119`
- **Diagnóstico y Escenario de Fallo:**
  El endpoint `/api/csp-report` procesa los informes de violación CSP enviados por los navegadores. Para mitigar ataques de denegación de servicio o saturación de la base de datos, implementa una limitación de tasa (10 solicitudes por minuto por IP).
  Sin embargo, la función `getClientIp` obtiene la dirección IP del cliente inspeccionando preferencialmente `request.headers.get("x-forwarded-for")?.split(",")[0]`. Dado que en entornos que no limpian cabeceras entrantes o detrás de proxies inversos sin reescritura estricta, la cabecera `X-Forwarded-For` es completamente controlable por el cliente HTTP, un atacante puede enviar direcciones IP arbitrarias (`X-Forwarded-For: 1.1.1.1`, `1.1.1.2`, etc.) en cada petición.
  Esto le permite evadir completamente el límite de tasa almacenado en el `Map` en memoria (`ipHits`), posibilitando la inserción masiva de miles de registros fraudulentos en la tabla `security_events`, degradando el rendimiento de PostgreSQL y saturando la cuota de almacenamiento de Supabase.
- **Código de Remediación Exacto:**
  Se restringe la extracción de la dirección IP a cabeceras confiables inmutables proporcionadas por la infraestructura perimetral (por ejemplo, `x-real-ip` en Vercel/Nginx o la IP directa de conexión), impidiendo la suplantación de identidad mediante cabeceras `X-Forwarded-For` arbitrarias:

  ```typescript
  // Archivo: src/app/api/csp-report/route.ts (líneas 36-43)
  function getClientIp(req: NextRequest): string {
    // x-real-ip es inyectada de forma inmutable por el proxy perimetral (Vercel / Cloudflare)
    const trustedIp = req.headers.get("x-real-ip");
    if (trustedIp) return trustedIp.trim();

    // En caso de usar x-forwarded-for, tomar el último salto confiable o fallback seguro
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      const parts = forwarded
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      // La IP más cercana al servidor perimetral suele ser la última
      return parts[parts.length - 1] || "unknown";
    }

    return "unknown";
  }
  ```

---

### SEC-12: Verificación de Administrador que Falla Abierta en Server Action `revalidateAfterProductSave`

- **Categoría:** Seguridad (Autenticación y Control de Acceso en Server Actions)
- **Severidad:** Media
- **Ubicación Exacta:** `src/actions/catalog.ts:49-70`
- **Diagnóstico y Escenario de Fallo:**
  En la Server Action `revalidateAfterProductSave` (`src/actions/catalog.ts`), la comprobación de autenticación y privilegios de administrador se encuentra encapsulada dentro de una estructura condicional defensiva:

  ```typescript
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    // Comprobación de usuario y rol admin...
    if (error || !user || user.app_metadata?.role !== "admin") {
      return;
    }
  }

  // Invalidación de caché:
  revalidatePath("/");
  ...
  ```

  Si por error de configuración o despliegue las variables de entorno `NEXT_PUBLIC_SUPABASE_URL` o `NEXT_PUBLIC_SUPABASE_ANON_KEY` no están definidas o se encuentran vacías, la condición `if (url && key)` evalúa a `false`. En consecuencia, todo el bloque de verificación de credenciales de administrador es omitido y el flujo de ejecución continúa directamente hacia las llamadas de `revalidatePath()`.
  Este es un patrón de falla abierta (fail-open), violando el principio de diseño seguro por defecto (Secure by Default). Cualquier cliente no autenticado podría invocar la Server Action forzando la revalidación de las rutas de toda la tienda.

- **Código de Remediación Exacto:**
  Se refactoriza la Server Action para que adopte una arquitectura segura de falla cerrada (fail-closed) comprobando obligatoriamente la presencia de las variables y la validez de la sesión con privilegios administrativos antes de cualquier ejecución:

  ```typescript
  // Archivo: src/actions/catalog.ts (líneas 45-78)
  import { createServerClient } from "@supabase/ssr";
  import { cookies } from "next/headers";
  import { revalidatePath } from "next/cache";

  export async function revalidateAfterProductSave(): Promise<{
    success: boolean;
    error?: string;
  }> {
    const cookieStore = await cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Fail-Closed: Si las variables no existen, abortar de inmediato con error
    if (!url || !key) {
      console.error(
        "[revalidateAfterProductSave] Configuración de servidor incompleta."
      );
      return { success: false, error: "Server misconfiguration" };
    }

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || user.app_metadata?.role !== "admin") {
      console.warn(
        "[revalidateAfterProductSave] Intento de revalidación no autorizado."
      );
      return { success: false, error: "Unauthorized" };
    }

    // Invalidar Full Route Cache de las páginas principales de forma autorizada
    revalidatePath("/");
    revalidatePath("/catalogo");
    revalidatePath("/(public)", "page");
    revalidatePath("/(public)/catalogo", "page");
    revalidatePath("/", "layout");

    return { success: true };
  }
  ```

---

### PERF-07: Bucles Continuos de Animación en Fondo de 30-60ms en Navbar Consumiendo CPU en Reposo

- **Categoría:** Rendimiento (Ciclo de Vida de Renderizado y Re-renders Innecesarios)
- **Severidad:** Media
- **Ubicación Exacta:** `src/components/layout/Navbar.tsx:67-109, 477, 495`
- **Diagnóstico y Escenario de Fallo:**
  El componente `TypewriterPlaceholder` en `Navbar.tsx` ejecuta un efecto mecanográfico continuo mediante llamadas recursivas a `setTimeout` con intervalos ultracortos de 30ms a 60ms. Además, dicho componente se instancia simultáneamente en dos lugares del DOM: en el contenedor de búsqueda para escritorio (línea 477) y en la barra de búsqueda para dispositivos móviles (línea 495).
  Esta ejecución en bucle perpetuo dispara entre 20 y 30 ciclos de reconciliación de React por segundo mientras la aplicación se encuentra en reposo total (idle). Esto produce un consumo constante e injustificado de ciclos de CPU en el hilo principal (main thread), agota rápidamente la batería en dispositivos móviles e inflige una penalización severa en las métricas de Interaction to Next Paint (INP), ya que el hilo principal se encuentra ocupado procesando micro-renders de texto en lugar de responder a las interacciones del usuario.
- **Código de Remediación Exacto:**
  Se reemplaza el bucle de estado activo de React por un placeholder estático estilizado o una animación pura basada en CSS que no bloquee el hilo de JavaScript y no dispare reconciliaciones de componentes:
  ```tsx
  // Archivo: src/components/layout/Navbar.tsx (líneas 67-118)
  /* ─── Typewriter visual placeholder (CSS-driven o estático ligero, sin re-renders) ─── */
  function TypewriterPlaceholder() {
    return (
      <div
        className="pointer-events-none flex min-w-0 items-center overflow-hidden text-sm whitespace-nowrap text-gray-500"
        aria-hidden="true"
      >
        <span className="truncate">Buscar en el catálogo...</span>
      </div>
    );
  }
  ```

---

### PERF-08: Escuchadores Duplicados de Scroll en Ventana No Limitados Durante Desplazamiento Táctil Móvil

- **Categoría:** Rendimiento (Manejo de Eventos y Caída de Fotogramas / Jank)
- **Severidad:** Media
- **Ubicación Exacta:** `src/components/layout/Navbar.tsx:241-275` y `src/components/layout/MobileBottomNav.tsx:45-80`
- **Diagnóstico y Escenario de Fallo:**
  Tanto `Navbar.tsx` como `MobileBottomNav.tsx` configuran escuchadores de eventos directos sobre `window.addEventListener("scroll", handleScroll, { passive: true })` para alternar la visibilidad de las barras de navegación en función de la dirección del desplazamiento.
  Aunque se utiliza la bandera `{ passive: true }`, las funciones controladoras `handleScroll` carecen de limitación de tasa (throttling o debouncing) ni sincronización mediante `requestAnimationFrame`. En dispositivos móviles modernos con pantallas de 90Hz o 120Hz, el evento de desplazamiento táctil se dispara continuamente a frecuencias de 60 a 120 veces por segundo. Cada disparo ejecuta lecturas de `window.scrollY` y mutaciones directas de estado (`setScrollVisible`), provocando caídas de fotogramas notorias (jank), recalificación de estilos forzada y degradación notable de la fluidez del scroll.
- **Código de Remediación Exacto:**
  Se implementa un mecanismo de bloqueo de fotogramas basado en `window.requestAnimationFrame` con bandera booleana (`ticking`), garantizando que la lógica de cálculo de scroll y actualización de estado de React se ejecute como máximo una única vez por fotograma de pantalla (render frame):

  ```typescript
  // Archivo: src/components/layout/Navbar.tsx y src/components/layout/MobileBottomNav.tsx
  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY <= 10) {
            setScrollVisible(true);
          } else {
            const delta = currentY - lastY;
            if (delta > 10) {
              setScrollVisible(false);
            } else if (delta < -10) {
              setScrollVisible(true);
            }
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  ```

---

### PERF-09: Peticiones Duplicadas No Cacheadas al Backend en Server Components (`getProductBySlug`)

- **Categoría:** Rendimiento (Eficiencia de Consultas de Base de Datos y Backend)
- **Severidad:** Media
- **Ubicación Exacta:** `src/app/(public)/catalogo/[sector]/[id]/page.tsx:51, 149` y `src/lib/catalogService.ts:130-148`
- **Diagnóstico y Escenario de Fallo:**
  En la ruta de detalle de producto (`src/app/(public)/catalogo/[sector]/[id]/page.tsx`), la función `getProductBySlug(id)` se invoca de manera secuencial dos veces durante la misma solicitud HTTP entrante:
  1. En la función `generateMetadata()` (línea 51) para obtener el título, la descripción y las imágenes de OpenGraph del producto.
  2. En el componente de servidor `ProductDetailPage()` (línea 149) para renderizar el contenido visual de la página.
     Dado que `getProductBySlug` consulta directamente la API de Supabase mediante el cliente `@supabase/ssr` (sin utilizar `fetch` nativo cacheado ni la utilidad `React.cache`), Next.js no puede deduplicar la llamada automáticamente. Como consecuencia directa, cada visita o generación dinámica de una página de producto emite dos consultas idénticas a la base de datos PostgreSQL, duplicando la latencia de red, consumiendo conexiones redundantes y duplicando el tiempo de respuesta inicial (TTFB).
- **Código de Remediación Exacto:**
  Se envuelve `getProductBySlug` con la utilidad nativa de deduplicación de peticiones por ciclo de vida de React (`cache` de `react`), asegurando que durante el renderizado de la solicitud la consulta a la base de datos se ejecute exactamente una vez y el resultado se comparta en memoria entre `generateMetadata` y el componente de la página:

  ```typescript
  // Archivo: src/lib/catalogService.ts
  import { cache } from "react";
  import { createClient } from "@supabase/supabase-js";
  import { env } from "@/env";
  import { logger } from "@/lib/logger";
  import type { DbProduct } from "@/types";

  // Envolver la consulta con cache() de React para deduplicación por ciclo de solicitud
  export const getProductBySlug = cache(
    async (slug: string): Promise<DbProduct | null> => {
      const supabase = createServerClient(["products"]);

      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_DETAIL_SELECT)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        logger.error("[catalogService] getProductBySlug error:", error);
        return null;
      }

      return (data ?? null) as unknown as DbProduct | null;
    }
  );
  ```

---

### PERF-10: Fuga de Memoria Sin Limpieza en Inicialización de `requestIdleCallback`

- **Categoría:** Rendimiento (Fugas de Memoria y Temporizadores en Componentes)
- **Severidad:** Media
- **Ubicación Exacta:** `src/providers/index.tsx:56-67`
- **Diagnóstico y Escenario de Fallo:**
  En el componente contenedor de proveedores (`src/providers/index.tsx`), se programa el montaje diferido de proveedores secundarios no críticos utilizando la API `requestIdleCallback` para no bloquear el First Contentful Paint ni el Largest Contentful Paint:
  ```typescript
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(
        () => setMounted(true),
        { timeout: 1500 }
      );
    } else {
      const id = setTimeout(() => setMounted(true), 200);
      return () => clearTimeout(id);
    }
  }, []);
  ```
  En la rama condicional que soporta `requestIdleCallback`, no se almacena el identificador devuelto ni se retorna una función de limpieza en el `useEffect`. Si el componente se desmonta (por ejemplo, en transiciones de ruta, recarga de módulos en desarrollo mediante Fast Refresh o desmontaje condicional), la retrollamada permanece en cola en el navegador. Cuando se ejecuta, intenta invocar `setMounted(true)` sobre una instancia de componente ya desmontada, provocando advertencias de fugas de memoria en React y reteniendo referencias en el recolector de basura.
- **Código de Remediación Exacto:**
  Se captura el handle devuelto por `requestIdleCallback` y se retorna la función de limpieza correspondiente invocando `cancelIdleCallback`:

  ```typescript
  // Archivo: src/providers/index.tsx (líneas 56-67)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const handle = (window as Window & typeof globalThis).requestIdleCallback(
        () => setMounted(true),
        { timeout: 1500 }
      );
      return () =>
        (window as Window & typeof globalThis).cancelIdleCallback(handle);
    } else {
      const id = setTimeout(() => setMounted(true), 200);
      return () => clearTimeout(id);
    }
  }, []);
  ```

---

### PERF-11: Escaneo Secuencial No Indexado con Comodines y Navegación Forzada en Search Modal

- **Categoría:** Rendimiento (Eficiencia de Consultas de Base de Datos y Navegación SPA)
- **Severidad:** Media
- **Ubicación Exacta:** `src/components/layout/SearchModal.tsx:144-168, 424`
- **Diagnóstico y Escenario de Fallo:**
  El modal de búsqueda (`SearchModal.tsx`) presenta dos ineficiencias de rendimiento severas:
  1. Consulta a la base de datos con comodines bilaterales (`.ilike("name", `%${query}%`)`): En bases de datos PostgreSQL estándar, los índices B-Tree convencionales son incapaces de optimizar búsquedas con comodines que inician con `%` (prefijos no anclados). Esto obliga al motor de la base de datos a realizar un escaneo secuencial completo de la tabla (`Seq Scan`) en cada pulsación de tecla tras el debounce. Con el crecimiento del catálogo, esto degrada los tiempos de respuesta del buscador e incrementa el uso de I/O en la base de datos.
  2. Navegación forzada con recarga completa de página en el botón "Ver todos los resultados" (línea 424): El componente ejecuta directamente `window.location.href = '/catalogo'`. Esta asignación ignora por completo el enrutador de Next.js (`useRouter`), destruyendo el estado de la aplicación en memoria (Single Page Application), descartando la caché de cliente de React Query y forzando una recarga completa del documento en el navegador con re-descarga de bundles JavaScript y CSS.
- **Código de Remediación Exacto:**
  Se aplica navegación del lado del cliente mediante `router.push("/catalogo")` desde `next/navigation` y se crea un índice trigram GIN en PostgreSQL para acelerar drásticamente las consultas `ILIKE`:

  ```tsx
  // Archivo: src/components/layout/SearchModal.tsx (líneas 420-431)
  // Asegurar la importación de useRouter desde "next/navigation" en el encabezado del archivo
  // const router = useRouter();

  {
    hasMoreResults && (
      <button
        onClick={() => {
          onClose();
          router.push("/catalogo");
        }}
        className="text-primary mt-3 w-full rounded-xl py-2 text-center text-sm font-semibold hover:bg-gray-50"
      >
        Ver todos los resultados →
      </button>
    );
  }
  ```

  ```sql
  -- Archivo: supabase/migrations/20261107_add_trigram_search_index.sql
  -- Activar extensión pg_trgm para soporte de índices trigram GIN
  CREATE EXTENSION IF NOT EXISTS pg_trgm;

  -- Crear índice GIN acelerador para búsquedas ILIKE sobre la columna name
  CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON public.products USING gin (name gin_trgm_ops);
  ```

---

### A11Y-12: Nombres Accesibles Ambiguos y Repetitivos en Botones Interactivos

- **Categoría:** Accesibilidad (Lectores de Pantalla / WCAG 2.4.4 Enlace en Contexto, WCAG 2.4.6 Encabezados y Etiquetas, WCAG 4.1.2 Nombre, Rol, Valor)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/catalogo/CatalogProductCard.tsx:111`
  - `src/components/cart/CartDrawer.tsx:757, 782, 795`
  - `src/components/cart/FavoritesModal.tsx:234`
- **Diagnóstico y Escenario de Fallo:**
  En las cuadrículas del catálogo de productos y dentro del panel deslizante del carrito de compras (`CartDrawer.tsx`), múltiples botones de acción utilizan etiquetas accesibles estáticas y genéricas que no contextualizan el elemento específico sobre el cual operan.
  En `CatalogProductCard.tsx:111`, el botón de favoritos declara:
  ```tsx
  aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
  ```
  En una página con 20 productos visibles, una persona invidente que utilice la lista de botones de un lector de pantalla (como NVDA con `Insert + F7` o VoiceOver con el rotor de navegación) escucha una secuencia de 20 botones idénticos: _"Agregar a favoritos, botón"_, _"Agregar a favoritos, botón"_, etc., sin ninguna asociación con el nombre o la categoría de la prenda.
  De manera idéntica, en `CartDrawer.tsx`, los botones de control de cantidad declaran únicamente `aria-label="Disminuir cantidad"` (línea 782), `aria-label="Aumentar cantidad"` (línea 795) y el botón de borrado declara `aria-label="Eliminar producto"` (línea 757). Si el carrito contiene cuatro artículos distintos, el árbol de accesibilidad presenta cuatro botones idénticos con el nombre "Eliminar producto", forzando al usuario asistido a navegar minuciosamente el DOM circundante para adivinar qué prenda se verá afectada antes de ejecutar la acción.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/catalogo/CatalogProductCard.tsx (líneas 107-113)
{
  /* Favorito — idéntico a la vista de detalle */
}
<button
  type="button"
  onClick={handleToggleFavorite}
  className="focus-visible:ring-primary absolute top-2 right-2 z-[20] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 focus:outline-none focus-visible:ring-2 active:scale-95"
  aria-label={
    isFavorited
      ? `Quitar ${product.name} de favoritos`
      : `Agregar ${product.name} a favoritos`
  }
>
  <Icon
    name={isFavorited ? "favorite" : "favorite_border"}
    size={17}
    fill={isFavorited}
    className={isFavorited ? "text-red-500" : "text-slate-400"}
  />
</button>;
```

```tsx
// Archivo: src/components/cart/CartDrawer.tsx (líneas 755-801)
                              <button
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Eliminar ${item.product.name} del carrito`}
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-outline)] transition-all duration-200 hover:bg-[var(--color-tertiary)]/8 hover:text-[var(--color-tertiary)] active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <Icon name="delete" />
                              </button>
                            </div>
                            {(item.color || item.note) && (
                              <div className="mt-1 space-y-0.5 text-[11px] text-[var(--color-on-surface-variant)]">
                                {item.color && <p>Color: {item.color}</p>}
                                {item.note && (
                                  <p className="line-clamp-1 italic">
                                    {item.note}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mt-2 flex items-end justify-between">
                            {/* Quantity stepper — pill */}
                            <div className="flex items-center rounded-full bg-[var(--color-surface-container)] ring-1 ring-[var(--color-outline-variant)]/20">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label={`Disminuir cantidad de ${item.product.name}`}
                                disabled={item.quantity <= 1}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)] active:scale-90 disabled:opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <Icon name="remove" />
                              </button>
                              <span className="w-7 text-center text-sm font-bold text-[var(--color-on-surface)] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label={`Aumentar cantidad de ${item.product.name}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)] active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <Icon name="add" />
                              </button>
                            </div>
```

---

### A11Y-13: Cambios Dinámicos de Estado Invisibles para Lectores de Pantalla (Falta de Regiones ARIA Live)

- **Categoría:** Accesibilidad (Mensajes de Estado / WCAG 4.1.3 Mensajes de Estado)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/layout/SearchModal.tsx:347-351`
  - `src/components/ui/ShareButton.tsx:78-105`
  - `src/components/catalogo/ProductDetailClient.tsx:1024-1028`
  - `src/components/contacto/ContactForm.tsx:101-118`
- **Diagnóstico y Escenario de Fallo:**
  Las mutaciones asíncronas de interfaz y las retroalimentaciones transitorias de éxito o error se reflejan visualmente en pantalla, pero carecen de contenedores con regiones en vivo ARIA (`role="status"`, `aria-live="polite"` o `role="alert"`).
  1. En el modal de búsqueda `SearchModal.tsx:347`, a medida que el usuario escribe un término, el recuento de coincidencias se actualiza en el elemento `<p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">{results.length} resultados</p>`. Al no poseer atributos de región en vivo, el sintetizador de voz del lector de pantalla permanece en absoluto silencio; el usuario no tiene ninguna confirmación de si la búsqueda devolvió resultados o si la lista quedó vacía sin mover deliberadamente el foco fuera del input de búsqueda.
  2. En `ShareButton.tsx:78-105`, al presionar el botón de compartir, la URL se copia al portapapeles y se renderiza un toast flotante con el texto `"Enlace copiado"`. Al carecer de `role="status"` y `aria-live="polite"`, la notificación se desvanece tras 2.5 segundos sin haber sido vocalizada por el lector de pantalla, dejando al usuario con discapacidad visual en incertidumbre respecto a si la acción se ejecutó con éxito.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/layout/SearchModal.tsx (líneas 345-353)
{
  /* Results header con región ARIA Live */
}
<div className="mb-3 flex items-center justify-between">
  <p
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="text-xs font-semibold tracking-widest text-slate-600 uppercase"
  >
    {results.length}{" "}
    {results.length === 1 ? "resultado encontrado" : "resultados encontrados"}
    {hasMoreResults && " (mostrando 6)"}
  </p>
</div>;
```

```tsx
// Archivo: src/components/ui/ShareButton.tsx (líneas 77-105)
{
  /* Toast Notification accesible */
}
{
  showToast && (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1e1e24",
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "9999px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        fontSize: "0.875rem",
        fontWeight: 600,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        whiteSpace: "nowrap",
        animation: "toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <Icon
        name="check_circle"
        size={20}
        className="text-emerald-500"
        aria-hidden="true"
      />
      <span>Enlace copiado al portapapeles</span>
    </div>
  );
}
```

---

### A11Y-14: Elemento `<li>` Huérfano Renderizado Fuera de un Contenedor de Lista

- **Categoría:** Accesibilidad (Estructura Semántica / WCAG 1.3.1 Información y Relaciones)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/catalogo/ProductDetailClient.tsx:792`
- **Diagnóstico y Escenario de Fallo:**
  En la vista detallada de producto (`ProductDetailClient.tsx`), dentro del bloque condicional correspondiente a productos que se comercializan bajo confección a la medida (`isALaMedida`), se renderiza un elemento `<li className="flex items-start gap-2 text-sm text-slate-600">` directamente dentro de un contenedor `<div>`, sin ningún elemento padre `<ul>` u `<ol>`.
  De acuerdo con la especificación de HTML5 del W3C y el criterio de conformidad WCAG 1.3.1, un elemento `<li>` debe estar obligatoriamente contenido de forma directa dentro de un elemento padre de lista (`<ul>`, `<ol>` o `<menu>`).
  Escenario de falla: Motores de renderizado y tecnologías asistivas (VoiceOver, JAWS, NVDA) reportan un elemento de lista desvinculado, anunciando de forma anómala _"Elemento de lista 1 de 1"_ dentro de un bloque que en realidad corresponde a una nota explicativa de cotizaciones, corrompiendo el árbol de accesibilidad y generando una falla automática en analizadores sintácticos como axe-core y Lighthouse.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/catalogo/ProductDetailClient.tsx (líneas 788-808)
                {/* Precio */}
                <div className="flex flex-col gap-1">
                  {isALaMedida ? (
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <Icon
                        name="chat"
                        className="text-primary mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        Los precios por servicio a la medida se cotizan por
                        WhatsApp. Pero tranquil@ 🥰 los uniformes confeccionados
                        a la medida tienen el mismo precio que las tallas
                        estándar y se cobran según la equivalencia de tus
                        medidas; por ejemplo, si estas corresponden a una talla
                        M, se aplicará el precio de la talla M.
                      </span>
                    </div>
                  ) : (
                    <>
```

---

### A11Y-15: No Conformidades en Ratios de Contraste de Color (Incumplimiento de WCAG 1.4.3 Mínimo 4.5:1)

- **Categoría:** Accesibilidad (Contraste Visual / WCAG 1.4.3 Contraste Mínimo Nivel AA)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/ui/GuestBell.tsx:864, 867` (`text-slate-300` sobre blanco: 1.56:1)
  - `src/components/layout/SearchModal.tsx:290, 335, 347, 436` (`text-gray-400` sobre blanco: 2.55:1)
  - `src/components/catalogo/ProductReviews.tsx:290` (`text-slate-400` sobre blanco: 2.76:1)
  - `src/components/catalogo/CatalogProductCard.tsx:158` (`text-slate-400` sobre blanco: 2.76:1)
  - `src/components/empresa/InstalacionesClient.tsx:812` (`text-white/40` sobre `#143067`: 3.43:1)
- **Diagnóstico y Escenario de Fallo:**
  El criterio WCAG 1.4.3 exige un ratio de contraste cromático mínimo de **4.5:1** para todo texto de cuerpo normal frente a su color de fondo adyacente (y 3:1 para texto grande o elementos gráficos esenciales). En múltiples áreas de la plataforma se detectaron clases de Tailwind CSS con grises excesivamente tenues que no alcanzan este umbral:
  1. En `GuestBell.tsx:864, 867`, el uso de `text-slate-300` (`#cbd5e1`) sobre fondo blanco puro (`#ffffff`) arroja un contraste de **1.56:1**, haciendo casi invisible la fecha relativa de las notificaciones (`timeAgo`) y el texto de acción `"Ver detalle →"`.
  2. En `SearchModal.tsx`, las indicaciones de ayuda y estados vacíos utilizan `text-gray-400` (`#9ca3af`), produciendo un contraste de **2.55:1**. Los usuarios con visión disminuida, daltonismo o que utilicen dispositivos con brillo reducido no logran discernir los textos secundarios.
  3. En `CatalogProductCard.tsx:158`, el precio tachado de rebaja (`oldPrice`) utiliza `text-slate-400` (**2.76:1**), careciendo además de una indicación textual oculta para lectores de pantalla que distinga el precio anterior del precio final actual.
- **Código de Remediación Exacto:**

```tsx
// Archivo: src/components/catalogo/CatalogProductCard.tsx (líneas 152-163)
{
  /* Precio: final a la izquierda, tachado a la derecha */
}
<div className="mt-auto flex items-center justify-between gap-1 pt-0.5 select-none">
  <span className="text-primary pointer-events-none text-base font-bold">
    {hasMultiplePrices ? "Desde " : ""}${price.toFixed(2)}
  </span>
  {onSale && oldPrice && (
    <span className="pointer-events-none text-xs text-slate-600 line-through decoration-slate-400/50">
      <span className="sr-only">Precio regular antes del descuento: </span>$
      {oldPrice.toFixed(2)}
    </span>
  )}
</div>;
```

```tsx
// Archivo: src/components/ui/GuestBell.tsx (líneas 863-871)
<div className="mt-1.5 flex items-center justify-between gap-2">
  <p className="text-[10px] font-medium text-slate-600">
    {timeAgo(notif.created_at)}
  </p>
  <span className="text-[10px] font-medium text-slate-600 opacity-0 transition-opacity group-hover:opacity-100">
    Ver detalle →
  </span>
</div>
```

```tsx
// Archivo: src/components/layout/SearchModal.tsx (líneas 334-340)
<div className="py-12 text-center">
  <Icon name="search_off" size={40} className="mx-auto mb-2 text-slate-500" />
  <p className="text-sm font-medium text-slate-700">
    No encontramos productos con &quot;{query}&quot;
  </p>
  <p className="mt-1 text-xs text-slate-600">
    Prueba con otro término como &quot;scrub&quot;, &quot;UNIVO&quot; o
    &quot;bordados&quot;.
  </p>
</div>
```

---

### ARCH-09: Importaciones Fantasma de Web Components Lit (`@aejkatappaja/phantom-ui`) en Más de 40 Skeletons

- **Categoría:** Código Muerto / Límites Arquitectónicos (Next.js App Router Architecture)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/app/(public)/ayuda/loading.tsx:1-16`
  - `src/app/(public)/catalogo/loading.tsx:1-35`
  - `src/app/(public)/empresa/loading.tsx:1-16`
  - Más de 40 archivos `loading.tsx` en `src/app/`
  - `src/phantom-ui.d.ts:1-15`
  - `src/app/layout.tsx:3`
  - `package.json:18`
- **Diagnóstico y Escenario de Fallo:**
  En toda la estructura de rutas de Next.js App Router, más de 40 archivos de skeleton de carga diferida (`loading.tsx`) contienen obligatoriamente la directiva `"use client"` para ejecutar la siguiente importación dinámica dentro de un hook `useEffect`:
  ```tsx
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);
  ```
  Sin embargo, un análisis estático exhaustivo del DOM confirma que la etiqueta personalizada `<phantom-ui>` **jamás se utiliza ni se renderiza** en ningún componente JSX del sistema. Todos los esqueletos visuales están implementados con elementos nativos `<div>` de React estilizados con clases Tailwind CSS (`animate-pulse rounded-md bg-gray-200`).
  Impactos técnicos negativos identificados:
  1. **Anulación de Streaming Server-Side de Skeletons**: Next.js App Router está diseñado para transmitir (`stream`) los fallbacks de `loading.tsx` como HTML estático puro desde el servidor antes de que el bundle de JavaScript del cliente se descargue. Al marcar más de 40 skeletons con `"use client"`, se bloquea el renderizado puramente estático del skeleton en servidor, forzando la hidratación innecesaria en el cliente.
  2. **Sobrecarga de Paquetes y Tiempos de Bloqueo (TBT)**: En cada transición de ruta, el navegador descarga e inicializa innecesariamente el motor de Lit (`@lit/reactive-element`, `lit-html` y `@aejkatappaja/phantom-ui`), emitiendo advertencias en la consola del desarrollador (`"Lit is in dev mode. Not recommended for production!"`).
  3. **Deuda Técnica en Tooling**: La presencia de este paquete obligó a mantener un archivo de tipados suprimidos (`src/phantom-ui.d.ts`) y configuraciones de resolución en Turbopack para un componente no funcional.
- **Código de Remediación Exacto:**

1. Convertir todos los archivos `loading.tsx` a **Server Components puros** eliminando la directiva `"use client"`, el hook `useEffect` y la importación de `@aejkatappaja/phantom-ui`:

```tsx
// Archivo: src/app/(public)/ayuda/loading.tsx
// Server Component puro: sin "use client" ni sobrecarga de tiempo de ejecución de Lit

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function AyudaLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando centro de ayuda..."
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <Shimmer className="h-12 w-64 md:h-16" />
        <Shimmer className="h-6 w-full max-w-lg" />
        <Shimmer className="h-12 w-full max-w-md rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <Shimmer className="h-10 w-10 rounded-full" />
            <Shimmer className="h-6 w-3/4" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

2. Ejecutar la desinstalación del paquete obsoleto en la raíz del proyecto:

```bash
npm uninstall @aejkatappaja/phantom-ui
```

3. Eliminar el archivo de tipos huérfano `src/phantom-ui.d.ts`.

---

### ARCH-10: 21 Importaciones Profundas Frágiles con `@ts-ignore` en `legalOgHelper.tsx`

- **Categoría:** Tipado Estricto / Encapsulamiento de Dependencias
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/lib/legalOgHelper.tsx:6-47`
- **Diagnóstico y Escenario de Fallo:**
  El módulo `src/lib/legalOgHelper.tsx` es responsable de la generación dinâmica de imágenes de OpenGraph (`ImageResponse`) para las páginas legales y normativas. En dicho archivo se utilizan **21 directivas consecutivas `// @ts-ignore`** para suprimir errores de compilación de TypeScript e importar rutas ESM privadas internas del paquete `lucide-react`:
  ```tsx
  // @ts-ignore
  import { __iconNode as shieldNode } from "lucide-react/dist/esm/icons/shield.js";
  // @ts-ignore
  import { __iconNode as fileTextNode } from "lucide-react/dist/esm/icons/file-text.js";
  // ... hasta 21 importaciones idénticas
  ```
  La importación profunda de archivos situados dentro de subdirectorios `/dist/esm/icons/*.js` rompe el encapsulamiento del paquete npm. La propiedad interna `__iconNode` es un artefacto no contractual de empaquetado de Lucide y carece de soporte semántico garantizado. Cualquier actualización de versiones menores o parches de `lucide-react`, o cambios en los módulos ESM de Turbopack/Next.js, romperá estas resoluciones de ruta al compilar (`Module not found`), provocando el colapso con error 500 en tiempo de ejecución del generador de imágenes OpenGraph en todas las páginas de políticas legales.
- **Código de Remediación Exacto:**
  Sustituir la extracción privada por los componentes oficiales exportados públicamente por `lucide-react` compatibles de forma nativa con el motor Satori de Next.js `ImageResponse`:

```tsx
// Archivo: src/lib/legalOgHelper.tsx (líneas 1-52)
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";
import {
  Shield,
  FileText,
  DollarSign,
  Truck,
  RefreshCw,
  Ruler,
  Tags,
  UserPlus,
  Brain,
  CheckCircle2,
  BadgeCheck,
  Landmark,
  Cookie,
  MessageCircle,
  Megaphone,
  Accessibility,
  Users,
  Camera,
  Scale,
  Sparkles,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mapeo seguro y tipado de iconos sin @ts-ignore ni dependencias internas de dist
const LEGAL_OG_ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  description: FileText,
  attach_money: DollarSign,
  local_shipping: Truck,
  replay: RefreshCw,
  straighten: Ruler,
  sell: Tags,
  group_add: UserPlus,
  psychology: Brain,
  task_alt: CheckCircle2,
  verified_user: BadgeCheck,
  account_balance: Landmark,
  cookie: Cookie,
  forum: MessageCircle,
  campaign: Megaphone,
  accessibility_new: Accessibility,
  groups: Users,
  photo_camera: Camera,
  gavel: Scale,
  workspace_premium: Sparkles,
  handshake: Handshake,
};

export function renderLegalOgIcon(
  iconName: string,
  color: string = "#ffffff",
  size: number = 48
) {
  const IconComponent = LEGAL_OG_ICONS[iconName] ?? Shield;
  return <IconComponent size={size} color={color} strokeWidth={2} />;
}
```

---

### ARCH-11: Omisión de Esquemas Zod de Formularios y Mutaciones Directas a Base de Datos en Vistas UI

- **Categoría:** Límites Arquitectónicos / Cumplimiento de Regla 9 de `AGENTS.md`
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/cart/DeliveryFormModal.tsx:155-210`
  - `src/components/admin/ProductModal.tsx:415-560`
  - `src/schemas/` (únicamente existen `contactSchema.ts` y `reviewSchema.ts`)
- **Diagnóstico y Escenario de Fallo:**
  La Regla 9 de `AGENTS.md` ("Estándar de App Router: Mutaciones y Esquemas") impone:

  > _"Prohibido crear Server Actions (use server) al vuelo dentro del archivo de los Client Components o de las vistas. Todo Server Action debe estar exclusivamente dentro de `src/actions/` y ser envuelto mediante `next-safe-action`. La validación de los datos que le llegan a una Actions o las validaciones de Forms, no deben ir directamente en las vistas, se deben definir como esquemas con Zod en `src/schemas/`."_

  La auditoría técnica constató que:
  1. En `DeliveryFormModal.tsx:155-210`, la función `handleConfirm` implementa más de 50 líneas de validación manual procedural (`if (!form.recipientName.trim())`, `if (!form.recipientPhone.trim())`, etc.), acoplando la lógica de validación del formulario directamente en la vista React en lugar de validar contra un esquema declarativo Zod en `src/schemas/`.
  2. En `ProductModal.tsx:415-560`, dentro de un componente de cliente masivo de 2063 líneas, se realizan llamadas directas de mutación a la base de datos con el cliente Supabase (`supabase.from("products").select(...)`, `supabase.from("products").insert(...)` y `supabase.from("products").update(...)`). Esto vulnera la arquitectura en capas al eludir Server Actions tipados con `next-safe-action`, impidiendo la auditoría centralizada de transacciones e incrementando el riesgo de mutaciones inconsistentes.

- **Código de Remediación Exacto:**

1. Crear el esquema canónico de validación en `src/schemas/deliverySchema.ts`:

```typescript
// Archivo: src/schemas/deliverySchema.ts
import { z } from "zod";

export const deliverySchema = z.object({
  deliveryMethod: z.enum(["taller", "punto_medio", "domicilio"], {
    required_error: "Debes seleccionar un método de entrega válido",
  }),
  recipientName: z
    .string()
    .trim()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  recipientPhone: z
    .string()
    .trim()
    .regex(
      /^[267][0-9]{7}$/,
      "Ingresa un número salvadoreño válido de 8 dígitos (ej: 71234567)"
    ),
  recipientEmail: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido")
    .optional()
    .or(z.literal("")),
  alternatePhone: z
    .string()
    .trim()
    .regex(/^[267][0-9]{7}$/, "Ingresa un número de contacto secundario válido")
    .optional()
    .or(z.literal("")),
  department: z.string().min(1, "Debes seleccionar un departamento"),
  municipality: z.string().min(1, "Debes seleccionar un municipio"),
  addressColonia: z
    .string()
    .trim()
    .min(2, "Ingresa colonia, barrio o residencial"),
  addressStreet: z
    .string()
    .trim()
    .min(2, "Ingresa calle, avenida, block o pasaje"),
  addressPolygon: z.string().trim().optional(),
  addressNumber: z.string().trim().optional(),
  addressReference: z.string().trim().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message:
        "Debes aceptar los términos de envío y devolución de Confecciones Liss",
    }),
  }),
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;
```

2. Refactorizar el manejador de confirmación en `src/components/cart/DeliveryFormModal.tsx`:

```tsx
// Archivo: src/components/cart/DeliveryFormModal.tsx (líneas 155-195)
const handleConfirm = () => {
  const validation = deliverySchema.safeParse(form);

  if (!validation.success) {
    const firstError =
      validation.error.errors[0]?.message ??
      "Verifica los datos del formulario.";
    toast.error(firstError);
    return;
  }

  const validData = validation.data;
  const finalInfo = getShippingInfo(
    validData.department,
    validData.municipality,
    validData.deliveryMethod
  );

  finalInfo.recipientName = validData.recipientName;
  finalInfo.recipientEmail = validData.recipientEmail;
  finalInfo.recipientPhone = validData.recipientPhone;
  finalInfo.alternatePhone = validData.alternatePhone;
  finalInfo.termsAccepted = validData.termsAccepted;
  finalInfo.deliveryMethod = validData.deliveryMethod;

  if (validData.deliveryMethod === "domicilio") {
    finalInfo.addressColonia = validData.addressColonia;
    finalInfo.addressStreet = validData.addressStreet;
    finalInfo.addressPolygon = validData.addressPolygon;
    finalInfo.addressNumber = validData.addressNumber;
    finalInfo.addressReference = validData.addressReference;
  }

  onConfirm(finalInfo);
};
```

---

### ARCH-12: Inclusiones de `<svg>` en Crudo en Layouts de React Violando la Regla 10.2 de `AGENTS.md`

- **Categoría:** Límites Arquitectónicos / Modularización de UI
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/cart/LoginModal.tsx:129-150`
  - `src/components/layout/Footer.tsx:127-135`
  - `src/components/ui/HeroImageCarousel.tsx:186, 213`
  - `src/components/catalogo/MobileFilterDrawer.tsx:295`
  - `src/components/legal/LegalArticleReader.tsx:19, 36, 53, 72`
- **Diagnóstico y Escenario de Fallo:**
  La Regla 10.2 de `AGENTS.md` ("Extracción de SVGs") establece de manera taxativa:

  > _"Extracción de SVGs: Nunca, ¡JAMÁS!, dejes archivos SVG enteros inmersos estáticamente dentro del JSX de React layout. Extrae los SVGs del DOM o: a) Los descargas/guardas en archivos en `/public/icons/`. b) Si necesitan prop logic, sepáralos obligatoriamente como `<Icons.IconName />` en el directorio de `src/components/ui/icons/` y reemplaza el JSX para importarlo prolijamente."_

  Múltiples vistas y componentes del sistema infringen esta directriz incluyendo elementos `<svg>` en crudo directamente en el marcado JSX:
  - En `LoginModal.tsx:129-150`, el logotipo de autenticación de Google se encuentra hardcodeado mediante 22 líneas de paths vectoriales inmersos en el botón de login.
  - En `Footer.tsx:127-135`, los iconos sociales se generan insertando elementos `<svg>` inline dinámicos en vez de consumir componentes modulares del directorio `src/components/ui/icons/`.

  Impacto: La duplicación de definiciones vectoriales incrementa innecesariamente el peso del árbol de componentes de React, rompe el encapsulamiento de estilos y elude las propiedades de accesibilidad estandarizadas del sistema de diseño (tales como `aria-hidden="true"`, foco y escalabilidad de color).

- **Código de Remediación Exacto:**

1. Crear el componente modular reutilizable `src/components/ui/icons/GoogleIcon.tsx`:

```tsx
// Archivo: src/components/ui/icons/GoogleIcon.tsx
import React from "react";

interface GoogleIconProps {
  className?: string;
}

export function GoogleIcon({
  className = "h-5 w-5 shrink-0",
}: GoogleIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
```

2. Reemplazar el SVG en crudo en `src/components/cart/LoginModal.tsx`:

```tsx
// Archivo: src/components/cart/LoginModal.tsx (líneas 122-132)
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

// ... dentro del JSX del botón:
<button
  onClick={() => {
    signInWithGoogle();
  }}
  className="focus-visible:ring-primary flex w-full items-center justify-center gap-[var(--space-sm)] rounded-xl border border-gray-200 bg-white px-[var(--space-md)] py-[var(--space-md)] font-medium text-slate-700 shadow-md transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2"
>
  <GoogleIcon />
  <span>Continuar con Google</span>
</button>;
```

---

### ARCH-13: Código Muerto Huérfano, Dependencias Sin Uso y Documentación Fantasma en Registro de Componentes

- **Categoría:** Código Muerto e Integridad Documental (Dead Code & Documentation Drift)
- **Severidad:** Media (Medium)
- **Ubicación Exacta:**
  - `src/components/empresa/PerfilDetalleClient.tsx:1-151`
  - `src/config/mediaKit.ts:1-136`
  - `src/components/REGISTRY.md:60-95` (entradas para `Badge`, `CategoryChip`, `ProductCard`)
  - `package.json:18, 19, 24, 25, 28, 38` (`@aejkatappaja/phantom-ui`, `@base-ui/react`, `class-variance-authority`, `client-only`, `groq-sdk`, `server-only`)
  - `knip.json:3-25`
- **Diagnóstico y Escenario de Fallo:**
  Una inspección forense rigurosa de las herramientas de compilación y control de calidad (`knip`, `eslint`, `package.json`, `REGISTRY.md`) reveló tres anomalías graves de acumulación de código muerto y desincronización arquitectónica:
  1. **Archivos Huérfanos Ignorados**: El componente `src/components/empresa/PerfilDetalleClient.tsx` (151 líneas) y el archivo `src/config/mediaKit.ts` (136 líneas) no son importados, referenciados ni enrutados por ningún punto de entrada del proyecto. Para eludir que la tarea automatizada de CI `npm run dead-code` (`knip`) reporte fallos, ambos archivos fueron agregados manualmente a la lista `"ignore"` de `knip.json` (líneas 20-21).
  2. **Dependencias Inutilizadas en Producción**: `package.json` declara dependencias que no poseen ninguna llamada en el árbol de código fuente:
     - `groq-sdk`: SDK de inteligencia artificial no utilizado.
     - `@base-ui/react`: Librería headless que no se utiliza en ninguna vista.
     - `class-variance-authority`: Paquete redundante frente a la convención unificada de Tailwind y `cn()`.
     - `client-only` y `server-only`: Directivas de límite no importadas en ningún archivo.
       Dichos paquetes fueron silenciados en `knip.json` bajo `ignoreDependencies` para ocultar alertas de dependencias muertas.
  3. **Registro de Componentes Inconsistente y Fantasma**: `src/components/REGISTRY.md` (documento de catálogo estipulado obligatoriamente por la Regla 7 de `AGENTS.md`) documenta en sus líneas 60 a 95 tres componentes: `src/components/ui/Badge.tsx`, `src/components/ui/CategoryChip.tsx` y `src/components/ui/ProductCard.tsx`. **Ninguno de estos archivos existe en el repositorio** (el catálogo utiliza `CatalogProductCard.tsx` en `src/components/catalogo/`). Esta documentación errónea induce a alucinaciones en agentes de IA y confusiones en desarrolladores. Simultáneamente, componentes centrales masivos como `DeliveryFormModal.tsx`, `ProductModal.tsx` o `SearchModal.tsx` se encuentran omitidos del registro.
- **Código de Remediación Exacto:**

1. Eliminar los archivos huérfanos del proyecto mediante la terminal:

```bash
Remove-Item -Path "src\components\empresa\PerfilDetalleClient.tsx" -Force
Remove-Item -Path "src\config\mediaKit.ts" -Force
```

2. Desinstalar las dependencias de producción no utilizadas:

```bash
npm uninstall @aejkatappaja/phantom-ui @base-ui/react class-variance-authority client-only groq-sdk server-only
```

3. Limpiar las reglas artificiales en `knip.json`:

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "ignoreDependencies": [
    "next-safe-action",
    "zustand",
    "@testing-library/react",
    "sharp"
  ],
  "ignore": [
    ".agents/**",
    ".backup/**",
    ".gemini/**",
    "public/sw.js",
    "supabase/**",
    "src/providers/DeferredProviders.tsx",
    "scratch/**",
    "scripts/**"
  ],
  "entry": [
    "src/app/**/*.{ts,tsx}",
    "src/mocks/handlers.ts",
    "src/components/legal/LegalContent.tsx"
  ]
}
```

4. Sincronizar `src/components/REGISTRY.md` eliminando las entradas ficticias (`Badge`, `CategoryChip`, `ProductCard`) y agregando las especificaciones reales de los componentes operativos (`CatalogProductCard`, `DeliveryFormModal`, `ProductModal`, `SearchModal`).

---

```
================================================================================
HALLAZGOS DE SEVERIDAD BAJA (11 INCIDENCIAS)
================================================================================
```

### SEC-13: Validación Incompleta de URL Permitiendo Redirección Relativa al Protocolo (Open Redirect)

- **Categoría:** Seguridad (Seguridad del Lado del Cliente / Redirección Abierta)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/app/auth/callback/route.ts:49-55` y `src/lib/sanitize.ts:17-19`
- **Diagnóstico y Escenario de Fallo:**
  El manejador de intercambio de tokens OAuth en la ruta `src/app/auth/callback/route.ts` procesa el parámetro de redirección posterior al inicio de sesión (`nextParam`) evaluando únicamente la condición:
  ```typescript
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    redirectTo = nextParam;
  }
  ```
  De forma concurrente, la función auxiliar de sanitización `sanitizeUrl` en `src/lib/sanitize.ts` permite cualquier entrada que empiece con barra diagonal:
  ```typescript
  if (trimmed.startsWith("/")) {
    return trimmed;
  }
  ```
  En múltiples analizadores de URL de navegadores basados en Chromium y WebKit, así como en diversos motores proxy, secuencias de redirección que combinan barras inclinadas y barras invertidas (por ejemplo, `/\evil.com`, `/\test.com` o `//evil.com\`) son normalizadas convirtiendo las barras invertidas en diagonales (`//evil.com`). Dado que `/\evil.com` comienza con `/` pero **no** con `//`, supera con éxito la verificación `!nextParam.startsWith("//")`. Al componerse `${baseUrl}${redirectTo}`, o al procesarse la cabecera HTTP `Location` resultante en el cliente, el navegador interpreta la ruta como una URL relativa al protocolo, redirigiendo al usuario fuera del dominio legítimo de Confecciones Liss hacia un servidor externo controlado por un atacante (Open Redirect posterior a la autenticación).
- **Código de Remediación Exacto:**
  Endurecer la función `sanitizeUrl` y crear la función especializada `sanitizeRedirectPath` en `src/lib/sanitize.ts`:

  ```typescript
  // File: src/lib/sanitize.ts (líneas 12-25)
  /**
   * Sanitiza una ruta de redirección interna asegurando que sea estrictamente
   * relativa al mismo origen y previniendo ataques de open redirect basados
   * en caracteres de barra invertida (/\evil.com) o dobles barras (//evil.com).
   */
  export function sanitizeRedirectPath(
    path: string | null | undefined
  ): string {
    if (!path || typeof path !== "string") return "/";
    const cleaned = path.trim().replace(/[\\]+/g, "/");
    if (cleaned.startsWith("/") && !cleaned.startsWith("//")) {
      // Bloquear secuencias anómalas que no comiencen con carácter alfanumérico o ruta válida
      if (cleaned.length > 1 && !/^\/[a-zA-Z0-9_\-\.\?\#]/.test(cleaned)) {
        return "/";
      }
      return cleaned;
    }
    return "/";
  }

  /**
   * Sanitiza una URL. Bloquea protocolos peligrosos y redirecciones relativas al protocolo.
   * Retorna string vacío si la URL es sospechosa.
   */
  export const sanitizeUrl = (url: unknown): string => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim().replace(/[\\]+/g, "/");

    // Permite rutas relativas locales seguras (sin dobles barras)
    if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
      return trimmed;
    }

    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return "";
      }

      const host = parsed.hostname.toLowerCase();
      const isWhitelisted =
        host === "lh3.googleusercontent.com" ||
        host.endsWith(".googleusercontent.com") ||
        host.includes("supabase.co");

      return isWhitelisted ? trimmed : "";
    } catch {
      return "";
    }
  };
  ```

  Integrar la sanitización en el manejador del callback en `src/app/auth/callback/route.ts`:

  ```typescript
  // File: src/app/auth/callback/route.ts (líneas 46-56)
  import { sanitizeRedirectPath } from "@/lib/sanitize";

  // ...
  const userRole = data.user.app_metadata?.role;
  let redirectTo = userRole === "admin" ? "/admin" : "/";

  // Validar si viene un parámetro 'next' seguro
  if (nextParam) {
    const validatedNext = sanitizeRedirectPath(nextParam);
    if (validatedNext !== "/") {
      redirectTo = validatedNext;
    }
  }

  const successResponse = NextResponse.redirect(`${baseUrl}${redirectTo}`);
  ```

---

### SEC-14: Condición de Carrera TOCTOU Permitiendo Exceder el Máximo de Productos Destacados

- **Categoría:** Seguridad (Concurrencia / Lógica de Negocio)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/actions/featuredProducts.ts:85-114`
- **Diagnóstico y Escenario de Fallo:**
  La Server Action `toggleFeaturedProduct` gestiona el estado fijado de productos en la página principal (`is_featured`). Para garantizar que no existan más de 10 productos destacados simultáneamente, ejecuta una verificación previa en Node.js/Next.js:
  ```typescript
  if (newValue === true) {
    const { count, error: countError } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true);
    // ...
    if ((count ?? 0) >= MAX_FEATURED) {
      return { success: false, error: `Máximo ${MAX_FEATURED} productos...` };
    }
  }
  ```
  Seguidamente, ejecuta una consulta de actualización independiente:
  ```typescript
  const { error: updateError } = await supabase
    .from("products")
    .update({ is_featured: newValue, updated_at: new Date().toISOString() })
    .eq("id", productId);
  ```
  Este patrón introduce una vulnerabilidad clásica de concurrencia tipo Time-of-Check to Time-of-Use (TOCTOU). Si dos administradores o múltiples peticiones concurrentes intentan destacar dos productos distintos en un momento en que ya existen 9 productos destacados, ambas transacciones leen concurrentemente `count = 9`. Ambas superan la comprobación lógica y emiten sendos comandos `UPDATE`. Como consecuencia, la base de datos almacena 11 productos destacados, desbordando el límite de negocio estipulado y rompiendo el layout del carrusel y de la rejilla de la vista principal.
- **Código de Remediación Exacto:**
  Establecer una restricción transaccional a nivel de motor PostgreSQL mediante un trigger BEFORE INSERT OR UPDATE en Supabase:

  ```sql
  -- File: supabase/migrations/20261107_enforce_max_featured_products.sql
  CREATE OR REPLACE FUNCTION check_max_featured_products()
  RETURNS TRIGGER AS $$
  DECLARE
    featured_count INTEGER;
  BEGIN
    -- Solo verificar cuando se intenta fijar a TRUE un producto que no lo estaba
    IF NEW.is_featured = TRUE AND (OLD.is_featured IS NULL OR OLD.is_featured = FALSE) THEN
      SELECT COUNT(*) INTO featured_count
      FROM products
      WHERE is_featured = TRUE;

      IF featured_count >= 10 THEN
        RAISE EXCEPTION 'Límite de negocio excedido: Máximo 10 productos pueden estar fijados simultáneamente en el home.'
          USING ERRCODE = 'check_violation';
      END IF;
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS trigger_enforce_max_featured_products ON products;
  CREATE TRIGGER trigger_enforce_max_featured_products
  BEFORE INSERT OR UPDATE OF is_featured ON products
  FOR EACH ROW
  EXECUTE FUNCTION check_max_featured_products();
  ```

  Y en `src/actions/featuredProducts.ts`, capturar de forma segura la excepción lanzada por la base de datos:

  ```typescript
  // File: src/actions/featuredProducts.ts (líneas 115-121)
  if (updateError) {
    if (
      updateError.code === "23514" ||
      updateError.message?.includes("Límite de negocio excedido")
    ) {
      return {
        success: false,
        error: `Máximo ${MAX_FEATURED} productos pueden estar fijados en el home. Desfija uno primero.`,
      };
    }
    return {
      success: false,
      error: "Error al actualizar el producto. Intenta de nuevo.",
    };
  }
  ```

---

### SEC-15: Riesgo de Ruptura de Script (Breakout) en Datos Estructurados JSON-LD

- **Categoría:** Seguridad (XSS / Seguridad del Lado del Cliente)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/app/layout.tsx:140-141`
- **Diagnóstico y Escenario de Fallo:**
  En `src/app/layout.tsx`, los datos estructurados Schema.org para el comercio electrónico se inyectan en el DOM utilizando la propiedad `dangerouslySetInnerHTML`:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [ ... ],
      }),
    }}
  />
  ```
  De acuerdo con la especificación de análisis sintáctico HTML5, el analizador del navegador da prioridad absoluta a la secuencia literal `</script>` independientemente de si se encuentra contenida dentro de una cadena de texto entrecomillada en un bloque de script. Si cualquiera de los campos dinámicos inyectados en el grafo JSON-LD (por ejemplo, descripciones de catálogo, atributos de configuración recuperados de variables de entorno o futuras extensiones administradas dinámicamente) llega a contener la subcadena `</script><script>maliciousCode()</script>`, el navegador cierra abruptamente el script de metadatos y ejecuta el código arbitrario inyectado, provocando un ataque de Cross-Site Scripting (XSS).
- **Código de Remediación Exacto:**
  Reemplazar el carácter `<` por su secuencia de escape Unicode segura `\u003c`, la cual es interpretada con total transparencia por los analizadores JSON pero es completamente inerte para el analizador sintáctico de etiquetas HTML:
  ```tsx
  // File: src/app/layout.tsx (líneas 140-142)
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ClothingStore",
            "@id": `${siteConfig.url}/#business`,
            name: siteConfig.name,
            alternateName: ["Confeccion Liss", "Confecciones Liss San Miguel"],
            description: siteConfig.description,
            url: siteConfig.url,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/icons/icon-512x512.png`,
              width: 512,
              height: 512,
            },
            image: `${siteConfig.url}/og-image.jpg`,
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.contact.address,
              addressLocality: "San Miguel",
              addressRegion: "San Miguel",
              addressCountry: "SV",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 13.4833,
              longitude: -88.1833,
            },
            priceRange: "$$",
            currenciesAccepted: "USD",
            paymentAccepted: "Cash, Credit Card, Transfer",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "08:00",
                closes: "12:00",
              },
            ],
          },
        ],
      }).replace(/</g, "\\u003c"),
    }}
  />
  ```

---

### SEC-16: Dependencia `groq-sdk` Sin Referencia y Variable `GROQ_API_KEY` Obsoleta en `.env`

- **Categoría:** Seguridad (Cadena de Suministro / Higiene de Secretos)
- **Severidad:** Baja
- **Ubicación Exacta:** `package.json:28` y `.env:38` (así como `.env.example:45`)
- **Diagnóstico y Escenario de Fallo:**
  El manifiesto de dependencias `package.json` declara `"groq-sdk": "^1.4.0"` en su lista de dependencias principales de producción. Consecuentemente, el archivo `.env.example` (línea 45) y el archivo de entorno `.env` declaran la clave de autenticación `GROQ_API_KEY=gsk_...` asignada originalmente para un prototipo de chatbot conversacional con IA ("Lucas").
  La inspección forense estática en todos los 813 archivos del repositorio confirmó que el SDK de Groq **no se importa en ningún archivo** (`grep -rn "groq-sdk"` y `grep -rn "GROQ_API_KEY"` no arrojaron referencias en `src/`). Mantener paquetes huérfanos en `dependencies` incrementa la superficie de ataque frente a incidentes de seguridad en la cadena de suministro de npm, añade peso superfluo a la instalación de dependencias en los pipelines de despliegue y genera falsas expectativas sobre credenciales de infraestructura activas.
- **Código de Remediación Exacto:**
  Eliminar el paquete huérfano de las dependencias y suprimir las variables obsoletas:
  ```bash
  # Ejecutar en la terminal raíz:
  npm uninstall groq-sdk
  ```
  ```dotenv
  # Eliminar de .env.example (líneas 43-45) y de .env:
  # [ELIMINADO]:
  # # Groq API Key para el Chat con IA (Lucas)
  # # Obtener en: https://console.groq.com
  # GROQ_API_KEY=gsk_your_groq_api_key_here
  ```

---

### PERF-12: Importación de Paquete Muerto desde `react-icons/si` en `Footer.tsx`

- **Categoría:** Rendimiento (Tamaño del Bundle e Importaciones)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/components/layout/Footer.tsx:6-12`
- **Diagnóstico y Escenario de Fallo:**
  En la cabecera de `src/components/layout/Footer.tsx`, se importan cinco iconos de redes sociales desde el subpaquete de Simple Icons de React Icons:
  ```typescript
  import {
    SiFacebook,
    SiGooglemaps,
    SiInstagram,
    SiTiktok,
    SiYoutube,
  } from "react-icons/si";
  ```
  Inmediatamente después, el componente define en las líneas 14 a 25 una estructura constante `socialSvgPaths: Record<string, string>` con las cadenas de datos de vectores SVG explícitas, y renderiza los iconos de redes sociales mediante etiquetas `<svg><path d={socialSvgPaths[key]} /></svg>`. Ninguno de los componentes `Si*` importados se utiliza en el código JSX. Aunque los empaquetadores como Webpack o Turbopack intentan aplicar tree-shaking, la resolución innecesaria de módulos en `react-icons` añade sobrecarga de análisis en tiempo de compilación e infla el grafo de dependencias del layout.
- **Código de Remediación Exacto:**
  Purgar el bloque de importación huérfano en `src/components/layout/Footer.tsx`:

  ```typescript
  // File: src/components/layout/Footer.tsx (líneas 1-13)
  import { siteConfig } from "@/config/site";
  import { clientEnv } from "@/lib/clientEnv";
  import { Icon } from "@/components/ui/icons/Icon";
  import Image from "next/image";
  import Link from "next/link";
  // [ELIMINADO]: Bloque de importación de react-icons/si (líneas 6-12)

  const socialSvgPaths: Record<string, string> = {
    instagram:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148...",
  // ... resto del componente sin modificaciones
  ```

---

### PERF-13: Fragmento JS Innecesario de Componente de Cliente para `MaterialSymbolsLoader` Deprecado

- **Categoría:** Rendimiento (Tamaño del Bundle e Hidratación del Layout)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/components/layout/MaterialSymbolsLoader.tsx:1-13` y `src/app/layout.tsx:25, 265`
- **Diagnóstico y Escenario de Fallo:**
  El componente `MaterialSymbolsLoader.tsx` declara la directiva `"use client"` en su primera línea y consiste en una función que simplemente retorna `null`, documentada internamente como deprecada tras la migración de todas las fuentes de iconos a vectores SVG nativos.
  No obstante, este componente se importa en `src/app/layout.tsx` (línea 25) y se incluye en el cuerpo de la página: `<MaterialSymbolsLoader />` (línea 265). Dado que incluye la directiva `"use client"`, Next.js está obligado a tratar el componente como un límite de cliente, emitiendo un fragmento JavaScript dedicado en el manifiesto de hidratación y obligando al motor del navegador a descargar, analizar y ejecutar un módulo de React en el hilo principal durante la carga inicial para no renderizar absolutamente nada.
- **Código de Remediación Exacto:**
  Eliminar el componente del layout raíz y purgar el archivo del árbol del proyecto:

  ```tsx
  // File: src/app/layout.tsx (línea 25)
  // [ELIMINAR]:
  // import { MaterialSymbolsLoader } from "@/components/layout/MaterialSymbolsLoader";

  // File: src/app/layout.tsx (líneas 263-267)
  <body className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip antialiased">
    {/* Material Symbols deprecado eliminado para evitar chunk cliente innecesario */}
    <Providers>{children}</Providers>
    <AnalyticsScripts
      gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
      pixelId={env.NEXT_PUBLIC_META_PIXEL_ID}
    />
  </body>
  ```

  ```bash
  # Eliminar el archivo obsoleto en disco:
  rm src/components/layout/MaterialSymbolsLoader.tsx
  ```

---

### PERF-14: Optimización de Imágenes Ignorada Mediante `unoptimized` en Category Hub

- **Categoría:** Rendimiento (Optimización de Activos Estáticos)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/components/catalogo/CategoryHubClient.tsx:62`
- **Diagnóstico y Escenario de Fallo:**
  En el componente de presentación de sectores del catálogo `CategoryHubClient.tsx`, las tarjetas de categoría renderizan imágenes representativas utilizando el componente `<Image>` de Next.js con la bandera `unoptimized`:
  ```tsx
  <Image
    src={config.hubImage}
    alt={`Colección de ${config.subtitle}`}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-103"
    loading={isPriority ? "eager" : "lazy"}
    unoptimized
    priority={isPriority}
  />
  ```
  La instrucción `unoptimized` instruye a Next.js a ignorar el pipeline de optimización de imágenes (`/_next/image`), entregando los archivos directamente desde el almacenamiento sin reescalado dimensional ni conversión automática a formatos de última generación más compactos como WebP o AVIF adaptados al DPR (Device Pixel Ratio) de la pantalla. En dispositivos móviles sobre redes con ancho de banda restringido, esto provoca la descarga de activos de imagen con un peso en kilobytes significativamente mayor al necesario, impactando negativamente las métricas de Largest Contentful Paint (LCP) y transferencia acumulada de red.
- **Código de Remediación Exacto:**
  Suprimir el atributo `unoptimized` en `src/components/catalogo/CategoryHubClient.tsx` para reactivar el pipeline responsivo automático:
  ```tsx
  // File: src/components/catalogo/CategoryHubClient.tsx (líneas 52-64)
  <Image
    src={config.hubImage}
    alt={`Colección de ${config.subtitle}`}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-103"
    loading={isPriority ? "eager" : "lazy"}
    priority={isPriority}
  />
  ```

---

### PERF-15: Widget No Crítico de Google Merchant Cargado Durante la Fase Central de Interactividad

- **Categoría:** Rendimiento (Core Web Vitals / TBT e INP)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/components/analytics/GoogleMerchantWidget.tsx:67-73`
- **Diagnóstico y Escenario de Fallo:**
  El componente `GoogleMerchantWidget.tsx` inyecta el script externo de reseñas y reputación comercial de Google (`https://www.gstatic.com/shopping/merchant/merchantwidget.js`) configurando la propiedad `strategy="afterInteractive"`:
  ```tsx
  return (
    <Script
      id="merchantWidgetScript"
      src="https://www.gstatic.com/shopping/merchant/merchantwidget.js"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
    />
  );
  ```
  La estrategia `afterInteractive` ejecuta el script inmediatamente después de que el hilo principal finaliza el primer paso de interactividad de la página. Dado que este widget de terceros realiza operaciones intensivas de análisis del DOM, renderizado de insignias y establecimiento de conexiones de red externas, compite directamente con la hidratación de los componentes interactivos principales (menú de navegación, carrusel y filtros del catálogo). Esto prolonga innecesariamente las tareas largas (Long Tasks) en el hilo principal, inflando el Tiempo Total de Bloqueo (TBT) y degradando la métrica de Interacción con la Siguiente Pintura (INP).
- **Código de Remediación Exacto:**
  Modificar la estrategia de carga a `lazyOnload` para posponer la inyección del script hasta que el navegador haya entrado en estado de reposo (idle):
  ```tsx
  // File: src/components/analytics/GoogleMerchantWidget.tsx (líneas 66-74)
  return (
    <Script
      id="merchantWidgetScript"
      src="https://www.gstatic.com/shopping/merchant/merchantwidget.js"
      strategy="lazyOnload"
      onLoad={handleScriptLoad}
    />
  );
  ```

---

### A11Y-16: Jerarquía de Encabezados con Salto de Nivel (`<h2>` a `<h4>`)

- **Categoría:** Accesibilidad (Jerarquía Semántica / WCAG 2.1 Criterio 1.3.1 Nivel A)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/components/empresa/SobreNosotrosClient.tsx:638, 667`
- **Diagnóstico y Escenario de Fallo:**
  En la sección narrativa de `SobreNosotrosClient.tsx`, el contenedor principal de la columna de texto define el encabezado de sección mediante:
  ```tsx
  <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
    Transformación digital desde 2026
  </h2>
  ```
  Inmediatamente después, en la columna complementaria adyacente (tarjeta de presencia institucional), se define el siguiente encabezado utilizando un elemento `<h4>`:
  ```tsx
  <h4 className="font-serif text-lg font-bold">Presencia digital regional</h4>
  ```
  Esta disposición omite deliberadamente el nivel de encabezado `<h3>`. Los usuarios de tecnologías de asistencia y lectores de pantalla (como NVDA, JAWS y VoiceOver) dependen fundamentalmente de una estructura de encabezados secuencial y sin saltos para construir mentalmente el esquema de contenidos de la página y saltar rápidamente entre secciones. Omitir niveles altera el orden estructural del árbol de accesibilidad (AOM), vulnerando el Criterio de Conformidad 1.3.1 (Información y Relaciones) de las directrices WCAG 2.1.
- **Código de Remediación Exacto:**
  Sustituir la etiqueta `<h4>` por `<h3>`, manteniendo idénticas las clases visuales de Tailwind CSS para garantizar cero impacto visual:
  ```tsx
  // File: src/components/empresa/SobreNosotrosClient.tsx (líneas 661-670)
  <div className="flex items-center gap-3">
    <Icon name="monitoring" size={36} className="font-bold text-[#143067]" />
    <h3 className="font-serif text-lg font-bold">Presencia digital regional</h3>
  </div>
  ```

---

### A11Y-17: Acciones de Reseña de Propietario Invisibles en Navegación por Teclado

- **Categoría:** Accesibilidad (Foco Visible y Operabilidad / WCAG 2.1 Criterios 2.1.1 y 2.4.7 Nivel AA)
- **Severidad:** Baja
- **Ubicación Exacta:** `src/components/catalogo/ProductReviews.tsx:296`
- **Diagnóstico y Escenario de Fallo:**
  En el componente de reseñas de producto `ProductReviews.tsx`, los botones de gestión ("Editar reseña" y "Eliminar reseña") reservados para el autor de la reseña están agrupados dentro de un contenedor configurado con las siguientes clases:
  ```tsx
  {isOwner && (
    <div className="relative z-10 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
      <button ... aria-label="Editar reseña">...</button>
      <button ... aria-label="Eliminar reseña">...</button>
    </div>
  )}
  ```
  Debido a la clase `opacity-0` combinada de manera exclusiva con `group-hover:opacity-100`, los botones se vuelven visibles únicamente cuando un puntero físico de ratón sobrevuela la fila. Cuando un usuario accede mediante teclado utilizando la tecla `Tab`, los botones interiores reciben el foco de navegación nativo, pero el contenedor circundante permanece con opacidad cero (`opacity: 0`). El usuario no puede visualizar qué elemento tiene enfocado, vulnerando el Criterio 2.4.7 (Foco Visible) y dificultando severamente la operabilidad por teclado exigida por el Criterio 2.1.1 de WCAG 2.1.
- **Código de Remediación Exacto:**
  Agregar las pseudoclases de foco al contenedor para garantizar que los botones se muestren plenamente cuando cualquier elemento hijo reciba el foco del teclado:
  ```tsx
  // File: src/components/catalogo/ProductReviews.tsx (líneas 295-300)
  {isOwner && (
    <div className="relative z-10 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(review);
        }}
        className="hover:text-primary rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Editar reseña"
        title="Editar"
      >
        <Icon name="edit" size={14} />
      </button>
  ```

---

### ARCH-14: Inconsistencias de Herencia Canónica en SEO Técnico y Brechas en Directivas de Robots

- **Categoría:** Calidad de Código / SEO Técnico y Arquitectura de Metadatos
- **Severidad:** Baja
- **Ubicación Exacta:** `src/app/(public)/confirmacion-pedido/page.tsx:11-18`, `src/app/(public)/cuenta/page.tsx:4-8`, `src/app/robots.ts:13-22`
- **Diagnóstico y Escenario de Fallo:**
  El layout raíz `src/app/layout.tsx` estipula en sus metadatos globales la directiva canónica por defecto: `alternates: { canonical: siteConfig.url }`. En la arquitectura de metadatos de Next.js App Router, todas las páginas secundarias que no declaren explícitamente su propio campo `alternates.canonical` heredan la URL canónica de la raíz (`https://confeccionesliss.com`).
  Las páginas privadas `confirmacion-pedido/page.tsx` y `cuenta/page.tsx` declaran instrucciones de exclusión de robots (`robots: { index: false }`), pero omiten declarar `alternates`. Como resultado, los motores de búsqueda reciben señales semánticas contradictorias: una directiva que prohíbe indexar la página combinada con una declaración canónica que indica que el contenido equivale a la página de inicio. Asimismo, el archivo dinámico `src/app/robots.ts` omite `/confirmacion-pedido` dentro del array `disallow`, permitiendo que los rastreadores web indexen rutas de confirmación de compra transaccionales que contienen identificadores de pedidos de clientes.
- **Código de Remediación Exacto:**
  Definir URLs canónicas autorreferenciales y coherentes en las páginas afectadas y actualizar las directivas de exclusión en `robots.ts`:

  ```typescript
  // File: src/app/(public)/confirmacion-pedido/page.tsx (líneas 11-18)
  export const metadata: Metadata = {
    title: { absolute: PAGE_TITLE },
    description: PAGE_DESCRIPTION,
    alternates: {
      canonical: `${siteConfig.url}/confirmacion-pedido`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
  ```

  ```typescript
  // File: src/app/(public)/cuenta/page.tsx (líneas 4-8)
  import { siteConfig } from "@/config/site";

  export const metadata: Metadata = {
    title: "Cuenta | Confecciones Liss",
    description: "Accede a tu cuenta en Confecciones Liss.",
    alternates: {
      canonical: `${siteConfig.url}/cuenta`,
    },
    robots: { index: false, follow: false },
  };
  ```

  ```typescript
  // File: src/app/robots.ts (líneas 13-23)
  disallow: [
    "/cuenta",
    "/confirmacion-pedido",
    "/auth/",
    "/login",
    "/api/",
    "/_next/",
    "/carrito",
    "/admin",
    "/sandbox",
    "/test-cache",
    ...(isBlogDisabled ? ["/blog", "/blog/"] : []),
  ],
  ```

---

```
================================================================================
4. PLAN DE ACCIÓN PRIORIZADO (REMEDIACIÓN INTEGRAL EN 5 FASES Y 23 PASOS)
================================================================================
```

Para estabilizar, blindar y optimizar la plataforma digital de Confecciones Liss sin introducir regresiones visuales ni alterar la lógica funcional existente (garantizando el estricto cumplimiento de `AGENTS.md` y la Directiva Inviolable de Preservación de Diseño, Interfaz y Seguridad), se define un plan de acción estructurado en **cinco fases secuenciales y veintitrés pasos detallados sin omisiones**:

---

### FASE 1: Seguridad Crítica y Prevención de Caídas del Sistema (Día 1 — Inmediato)

_Objetivo: Mitigar vulnerabilidades de acceso no autorizado, riesgos de filtración de datos y puntos únicos de fallo que puedan provocar caídas del sistema._

1. **Paso 1 — Corregir la Política RLS Insegura de Notificaciones Push (SEC-01)**:
   Aplicar la migración SQL `20261107_fix_push_subscriptions_rls.sql` en Supabase para restringir el comando `DELETE` en la tabla `push_subscriptions`. La política debe exigir estrictamente la coincidencia del identificador autenticado (`auth.uid() = user_id`) o el rol administrativo (`auth.jwt() ->> 'role' = 'admin'`), impidiendo que usuarios anónimos o no autorizados puedan purgar masivamente las suscripciones push de la plataforma mediante llamadas a la API REST de Supabase.

2. **Paso 2 — Autenticar la Edge Function `send-push` (SEC-02)**:
   Modificar `supabase/functions/send-push/index.ts` para requerir y verificar una cabecera `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>` o un token JWT con privilegios administrativos válidos antes de procesar el envío de notificaciones web push. Bloquear de manera fulminante cualquier invocación pública no autenticada retornando un código de estado HTTP 401 Unauthorized.

3. **Paso 3 — Implementar el Límite de Error Raíz `global-error.tsx` (ARCH-01)**:
   Crear el componente `src/app/global-error.tsx` conforme a las especificaciones de Next.js App Router. Este componente debe incluir su propia estructura `<html>` y `<body>`, capturar excepciones no controladas originadas en el layout raíz y proporcionar una interfaz de usuario accesible con opción de reintento (`reset()`), eliminando las pantallas en blanco genéricas de error 500 del navegador.

4. **Paso 4 — Asegurar las Server Actions con `next-safe-action` (ARCH-02, SEC-04, SEC-12)**:
   Implementar la capa base de acciones seguras en `src/lib/safe-action.ts`. Refactorizar las mutaciones de servidor en `src/actions/categories.ts`, `src/actions/catalog.ts`, `src/actions/contact.ts` y `src/actions/featuredProducts.ts` para que utilicen procedimientos envueltos en `actionClient` y esquemas de validación Zod en `src/schemas/`, validando estrictamente los roles administrativos y mitigando la manipulación de parámetros.

5. **Paso 5 — Revocar, Rotar Secretos Filtrados y Endurecer Variables de Entorno (SEC-06, SEC-07)**:
   Acceder de inmediato a la consola de Google Cloud Platform (GCP) para revocar el Client Secret de Google OAuth comprometido y regenerar las credenciales asociadas al dominio de producción. Eliminar todos los valores de reserva por defecto (fallback defaults inseguros) en `src/env.ts`, forzando que la aplicación falle en tiempo de construcción si falta alguna variable crítica.

6. **Paso 6 — Corregir la Rama de Despliegue en el Flujo de Integración Continua**:
   Actualizar el archivo `.github/workflows/ci.yml` modificando la regla `on.push.branches` y `on.pull_request.branches` para que apunten obligatoriamente a la rama `master` en lugar de `main`, restableciendo la ejecución automatizada de pruebas y comprobaciones de integridad antes de cada pase a producción.

---

### FASE 2: Cuellos de Botella de Rendimiento y Barreras Críticas de Accesibilidad (Días 2–3)

_Objetivo: Descongestionar el hilo principal, optimizar el tiempo hasta el primer byte (TTFB) y suprimir barreras de accesibilidad que impiden la interacción de usuarios con tecnologías de asistencia._

7. **Paso 7 — Estabilizar el Renderizado Dinámico SSR en `/catalogo` (PERF-01)**:
   Configurar `export const revalidate = 86400;` (o revalidación estática bajo demanda mediante tags ISR) en la ruta maestra `/catalogo`. Envolver las consultas agregadas de recuento de productos por sector universitario y profesional utilizando `unstable_cache` de Next.js, mitigando el agotamiento de conexiones en el pool de PostgreSQL y recortando drásticamente la latencia de respuesta del servidor.

8. **Paso 8 — Eliminar Conflictos de Precarga de Imágenes por Doble Petición (PERF-02, PERF-03)**:
   Remover todas las etiquetas manuales `<link rel="preload">` que apuntan a rutas directas de Supabase Storage en el catálogo y en el carrusel hero. Permitir que el componente `<Image priority />` de Next.js gobierne de forma exclusiva la precarga con las dimensiones optimizadas para el dispositivo del usuario, eliminando la descarga duplicada de imágenes de gran tamaño.

9. **Paso 9 — Cargar Diferidamente los Modales Globales Pesados (PERF-05)**:
   Convertir las importaciones de `CartDrawer`, `LoginModal` y `FavoritesModal` en importaciones dinámicas (`next/dynamic` con `{ ssr: false }`) dentro de `src/components/layout/GlobalModals.tsx`. Esto extrae los componentes modales del bundle JavaScript inicial del layout raíz, acelerando el First Contentful Paint (FCP) y el Time to Interactive (TTI).

10. **Paso 10 — Remediar la Barrera de Navegación por Teclado en el Carrusel Hero (A11Y-01)**:
    Incorporar manejadores de eventos `onFocus` y `onBlur`, junto con un botón accesible de pausa/reanudación y gestión de `tabIndex` en `HeroImageCarousel.tsx`. El carrusel debe detener automáticamente su reproducción cíclica tan pronto como un elemento interior reciba el foco de navegación por teclado.

11. **Paso 11 — Desmantelar el Anidamiento Interactivo Ilegal (A11Y-02, A11Y-03, A11Y-04)**:
    Corregir las infracciones de árbol de accesibilidad en componentes clave:
    - En `FavoritesModal.tsx`, extraer el botón `<button>` que se encuentra anidado de forma inválida dentro del componente `<Link>`.
    - En `GuestBell.tsx`, suprimir el elemento interactivo `<button>` renderizado dentro de otro botón contenedor.
    - En `LegalArticleReader.tsx`, reemplazar el elemento `<div role="button">` que encapsula el modal con un fondo de diálogo semántico accesible.

---

### FASE 3: Concurrencia en Tiempo de Ejecución, Re-renderizados y Accesibilidad de Formularios (Días 4–5)

_Objetivo: Evitar degradaciones de memoria, estabilizar estados globales reactivos y certificar la operabilidad accesible de formularios de compra._

12. **Paso 12 — Memorizar los Proveedores de Contexto Global (PERF-06)**:
    Envolver los valores de retorno expuestos por `FavoritesContext`, `CartContext`, `AuthContext` y `NotificationContext` utilizando `useMemo`, y encapsular las funciones de mutación asociadas con `useCallback`. Esta optimización previene cascadas masivas de renderizado innecesario en todo el árbol de componentes de React ante actualizaciones locales de estado.

13. **Paso 13 — Resolver Condiciones de Carrera en Búsqueda y Autenticación (ARCH-03, ARCH-04)**:
    Implementar cancelación reactiva de peticiones mediante instancias de `AbortController` en el modal de búsqueda `SearchModal.tsx`, garantizando que peticiones asíncronas lentas previas no sobreescriban los resultados de una búsqueda posterior. En `AuthContext.tsx`, corregir la limpieza asíncrona de la suscripción de sesión de Supabase Auth para evitar fugas de memoria al desmontar componentes.

14. **Paso 14 — Implementar Trampas de Foco y Captura de Tecla Escape en Diálogos Modales (A11Y-05, A11Y-06)**:
    Envolver los modales y paneles desplegables (`SearchModal`, `CartDrawer`, `DeliveryFormModal`, `FavoritesModal`) con `<FocusLock>` y registrar escuchadores globales para la tecla `Escape`, garantizando que el foco permanezca confinado dentro del modal activo y que el usuario pueda cerrarlo intuitivamente mediante teclado.

15. **Paso 15 — Añadir Etiquetas Semánticas y Accesibilidad en Formularios (A11Y-07, A11Y-08, A11Y-09, ARCH-11)**:
    Asociar elementos `<label>` semánticos mediante el atributo `htmlFor` a los campos de texto y notas de personalización de producto. Implementar los roles `role="radiogroup"` y atributos `aria-checked` en la selección de opciones de entrega en `DeliveryFormModal.tsx`, y trasladar la validación de checkout al esquema centralizado `src/schemas/deliverySchema.ts`.

---

### FASE 4: Optimización del Bundle y Eliminación de Código Muerto (Días 6–7)

_Objetivo: Sanear el peso del código distribuido a los clientes, purgar dependencias huérfanas y reducir el impacto del scroll y temporizadores._

16. **Paso 16 — Purgar Importaciones Fantasma de Phantom Lit (ARCH-09)**:
    Refactorizar los más de 40 archivos de esqueleto `loading.tsx` distribuidos en las carpetas de rutas de `src/app/`, reemplazando los componentes experimentales de `@aejkatappaja/phantom-ui` por Server Components nativos estilizados con Tailwind CSS estándar, reduciendo el bundle final y eliminando discrepancias de hidratación.

17. **Paso 17 — Podar el Diccionario Monolítico de Iconos Lucide (PERF-04)**:
    Refactorizar el componente centralizado `src/components/ui/icons/Icon.tsx` para erradicar la compilación en bloque de 142 iconos de `lucide-react` en un único chunk cliente, adoptando un esquema de importación modular o tabla de iconos específicos que permita al compilador ejecutar tree-shaking eficaz.

18. **Paso 18 — Desinstalar Dependencias Muertas y Purgar Módulos Obsoletos (ARCH-13, SEC-16)**:
    Ejecutar la desinstalación limpia de librerías en desuso mediante:

    ```bash
    npm uninstall groq-sdk @base-ui/react class-variance-authority client-only server-only
    ```

    Eliminar los archivos huérfanos `src/components/empresa/PerfilDetalleClient.tsx` y `src/config/mediaKit.ts`, los cuales no cuentan con importaciones ni rutas activas en la aplicación.

19. **Paso 19 — Regular Listeners de Desplazamiento y Sustituir Temporizadores de Fondo (PERF-07, PERF-08)**:
    Optimizar los escuchadores del evento `scroll` en el encabezado y barra de navegación superior utilizando `requestAnimationFrame` o controladores con estrangulamiento (throttling). Sustituir el bucle de temporizador continuo de `TypewriterPlaceholder` por un texto descriptivo estático y accesible que no consuma ciclos de CPU en segundo plano.

---

### FASE 5: Robustecimiento de TypeScript, SEO y Documentación (Día 8)

_Objetivo: Consolidar la seguridad de tipos estáticos de la base de datos, perfeccionar los índices de rastreo en motores de búsqueda y alinear la documentación viva del proyecto._

20. **Paso 20 — Generar Tipos Tipados Fuertemente de Supabase (ARCH-08)**:
    Generar el archivo de tipos oficiales de la base de datos `src/types/database.types.ts` mediante el CLI de Supabase. Sustituir todas las aserciones inseguras (`as unknown as DbProduct[]` o tipos `any`) en `src/lib/productUtils.ts`, `src/services/catalogService.ts` y componentes del catálogo por tipos fuertemente tipados derivados del esquema relacional.

21. **Paso 21 — Corregir Ratios de Contraste de Color y Respetar Preferencia de Movimiento Reducido (A11Y-11, A11Y-15)**:
    Ajustar los tokens de color de texto tenue (`text-slate-400` y `text-gray-400` sobre fondos blancos) elevando su contraste hasta superar el ratio mínimo de 4.5:1 exigido por WCAG 2.1 Nivel AA. Configurar el proveedor global de Framer Motion con `<MotionConfig reducedMotion="user">` para desactivar transiciones complejas en clientes con preferencias de accesibilidad vestibular activadas en su sistema operativo.

22. **Paso 22 — Endurecer Metadatos Canónicos de SEO Técnico y Archivo Robots (ARCH-14)**:
    Establecer URLs canónicas autorreferenciales explícitas en `src/app/(public)/confirmacion-pedido/page.tsx` y `src/app/(public)/cuenta/page.tsx`. Añadir `/confirmacion-pedido`, `/auth/` y `/test-cache` a la lista de exclusiones (`disallow`) del archivo `src/app/robots.ts`, garantizando coherencia indexatoria absoluta.

23. **Paso 23 — Sincronizar el Catálogo de Componentes de la Aplicación (ARCH-13)**:
    Actualizar exhaustivamente el archivo `src/components/REGISTRY.md` conforme a la regla 7 de `AGENTS.md`. Eliminar las entradas fantasma de componentes no existentes (`Badge.tsx`, `CategoryChip.tsx`, `ProductCard.tsx`) y documentar todos los componentes reales existentes con sus propiedades, dependencias y ejemplos de consumo.
