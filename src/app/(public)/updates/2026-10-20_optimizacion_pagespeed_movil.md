# Optimización de Rendimiento Core Web Vitals en Móvil — 2026-10-20

---

## TASK-001: Eliminación del Retardo de Renderizado en LCP Móvil

### Archivos modificados

- `src/components/ui/StaticHeroImage.tsx`
- `next.config.mjs`

### Cambios realizados

- Se modificó la decodificación de la imagen hero a modo síncrono (`decoding="sync"`) y se asignaron dimensiones nativas explícitas (`width={440}` y `height={550}`) para que el navegador pinte el recurso en el pase inicial sin encolarlo en hilos asíncronos en segundo plano.
- Se reestructuró el tag `<picture>` mobile-first, fijando `hero-home-440.webp` como recurso base alineado 1:1 con el encabezado HTTP Link `rel=preload` emitido desde el servidor.

### Estado: COMPLETO ✓

---

## TASK-002: Optimización de Fuentes del Sistema y Fallbacks

### Archivos modificados

- `src/app/globals.css`
- `src/app/layout.tsx`

### Cambios realizados

- Se vincularon las variables de fuente `--font-sans` y `--font-serif` a las variables inyectadas por Next.js (`var(--font-sans)`, `var(--font-serif)`) agregando fallbacks nativos del sistema (`system-ui`, `-apple-system`, `Georgia`) para eliminar retardos por bloqueo de fuentes (FOUT/FOIT).
- Se purgó el componente NOP `MaterialSymbolsLoader.tsx` y la clase CSS huérfana `.material-symbols-outlined`.

### Estado: COMPLETO ✓

---

## TASK-003: Políticas de Almacenamiento en Caché y Tree-Shaking

### Archivos modificados

- `next.config.mjs`

### Cambios realizados

- Se actualizaron las cabeceras `Cache-Control` de `/images/:path*` e `/(icons|fonts)/:path*` a `public, max-age=31536000, immutable` (1 año).
- Se añadieron `framer-motion`, `@tanstack/react-query` y `zod` a `optimizePackageImports` en la configuración de Turbopack/Next.js.

### Estado: COMPLETO ✓

---

## TASK-004: Purga de JavaScript no utilizado y carga bajo demanda de modales

### Archivos modificados

- `src/components/cart/CartDrawer.tsx`
- `src/components/cart/FavoritesModal.tsx`
- `src/components/layout/SearchModal.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/GlobalModals.tsx`
- `src/context/ConfirmContext.tsx`
- `src/providers/DeferredProviders.tsx`
- `src/components/ui/StaticHeroImage.tsx`

### Cambios realizados

- Se eliminó el import estático de `@/lib/supabaseClient` en `CartDrawer`, `FavoritesModal` y `SearchModal`, cargándolo dinámicamente (`await import`) únicamente durante las acciones del usuario.
- Se condicionó el montaje de `SearchModal` y `FavoritesModal` en el `Navbar` para que solo se descarguen al abrirse (`isSearchOpen` / `isFavoritesOpen`).
- Se pospuso el montaje del chunk `CartDrawer` en `GlobalModals` hasta que el usuario interactúa con el carrito, manteniéndose activo para preservar transiciones fluidas.
- Se cargó `Toaster` (`react-hot-toast`) dinámicamente y se aisló `ConfirmDialog` de la renderización inicial.
- Se introdujo `preload` de `react-dom` en el Server Component `StaticHeroImage` para precarga síncrona en `<head>` para móviles.

### Estado: COMPLETO ✓
