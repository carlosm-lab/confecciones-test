```
================================================================================
HALLAZGOS DE SEVERIDAD MEDIA (PARTE 3A: SEC-08 A SEC-12 Y PERF-07 A PERF-11)
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
