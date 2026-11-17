# INFORME MAESTRO DE AUDITORÍA FORENSE ZERO-TRUST

## PARTE 4: HALLAZGOS DE SEVERIDAD BAJA Y PLAN DE ACCIÓN PRIORIZADO

**Objetivo Auditado:** Aplicación Web Confecciones Liss (`confeccionesliss.com`)  
**Pila Tecnológica:** Next.js 16 (App Router), React 19, Supabase (PostgreSQL, Auth, RLS, Storage, Edge Functions), Tailwind CSS, TypeScript  
**Modalidad Forense:** Benchmark Pasivo Zero-Trust (Inspección estática sin mutaciones de código en repositorio)  
**Estándares de Referencia:** OWASP Top 10 (2021), OWASP ASVS v4.0.3, W3C WCAG 2.1 Nivel AA, Core Web Vitals, Arquitectura Next.js App Router, Directivas Inviolables de `AGENTS.md`

---

```
================================================================================
HALLAZGOS DE SEVERIDAD BAJA (11 VULNERABILIDADES Y DESVIACIONES DETECTADAS)
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
