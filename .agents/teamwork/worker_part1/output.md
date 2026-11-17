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
