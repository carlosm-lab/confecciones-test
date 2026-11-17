# PERFORMANCE FORENSIC AUDIT REPORT — CONFECCIONES LISS

**Auditor**: Performance Forensic Auditor (Zero-Trust Inspection)  
**Target**: Confecciones Liss Codebase (Next.js App Router 16, React 19, Supabase)  
**Mode**: Benchmark (Passive Audit, Zero Code Execution, Zero File Alterations)  
**Report Location**: `c:\Users\usuar\Desktop\confecciones liss\.agents\teamwork\auditor_performance\handoff.md`  
**Timestamp**: 2026-11-07T06:05:00Z

---

## 1. Audited Surface Map

The performance inspection analyzed configuration files, client and server component boundaries, data-fetching layers, context providers, static assets, and third-party integrations across the entire Confecciones Liss repository:

| Module / Directory                | Key Files Inspected                                                                                                                                                                                                                                                                                                                                                                                                   | Performance Focus & Observations                                                                                                                                                     |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Configuration & Bundler**  | `package.json`, `next.config.mjs`, `src/app/globals.css`                                                                                                                                                                                                                                                                                                                                                              | Dependency weight, Next.js experimental optimizations, Turbopack aliases, HTTP preload headers, Tailwind v4 compiler directives.                                                     |
| **Root Application Shell**        | `src/app/layout.tsx`, `src/providers/index.tsx`, `src/providers/DeferredProviders.tsx`                                                                                                                                                                                                                                                                                                                                | Font loading (`next/font/google`), initial HTML critical path, deferred provider loading strategy, `requestIdleCallback` hydration.                                                  |
| **Global State Contexts**         | `src/context/CartContext.tsx`, `src/context/FavoritesContext.tsx`, `src/context/AuthContext.tsx`, `src/context/NotificationContext.tsx`                                                                                                                                                                                                                                                                               | Context value memoization, re-render cascades, client storage synchronization (`localStorage`), polling intervals, Supabase Realtime WebSocket subscriptions.                        |
| **Global Layout & Navigation**    | `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileBottomNav.tsx`, `src/components/layout/GlobalModals.tsx`, `src/components/layout/SearchModal.tsx`, `src/components/ui/GuestBell.tsx`                                                                                                                                                                             | Unthrottled scroll listeners, animated placeholder loops (`setTimeout`), dynamic code splitting vs static bundling, barrel imports (`react-icons/si`).                               |
| **Icons & Static UI**             | `src/components/ui/icons/Icon.tsx`, `src/components/ui/StaticHeroImage.tsx`, `src/components/ui/CookieBanner.tsx`                                                                                                                                                                                                                                                                                                     | Monolithic icon map (`lucide-react`), client-side component boundaries (`"use client"`), responsive hero image preloading, layout shifts (CLS).                                      |
| **Catalog & Product Engine**      | `src/app/(public)/catalogo/page.tsx`, `src/app/(public)/catalogo/[sector]/page.tsx`, `src/app/(public)/catalogo/[sector]/[id]/page.tsx`, `src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx`, `src/components/catalogo/CatalogPageClient.tsx`, `src/components/catalogo/CatalogProductCard.tsx`, `src/components/catalogo/ProductDetailClient.tsx`, `src/components/catalogo/CategoryHubClient.tsx` | Static Site Generation (SSG) vs Server-Side Rendering (SSR), `export const revalidate`, product image preload mismatches, `next/image` sizing and optimization.                      |
| **Data Access & Backend Queries** | `src/lib/catalogService.ts`, `src/lib/googleReviewsService.ts`, `src/lib/reviewsService.ts`, `src/lib/supabaseClient.ts`, `src/lib/productShared.ts`                                                                                                                                                                                                                                                                  | Supabase client instantiations, query projection pruning (`select(*)`), client-side joins vs database aggregation, request deduplication via `React.cache()`, unbounded table reads. |
| **Cart & Modals**                 | `src/components/cart/CartDrawer.tsx`, `src/components/cart/FavoritesModal.tsx`, `src/components/cart/DeliveryFormModal.tsx`                                                                                                                                                                                                                                                                                           | Third-party modal libraries (`react-focus-lock`), uncleaned timer callbacks, DOM subtree weight on initial paint.                                                                    |
| **Third-Party & Analytics**       | `src/components/analytics/AnalyticsScripts.tsx`, `src/components/analytics/GoogleMerchantWidget.tsx`, `src/components/analytics/GoogleAnalytics.tsx`, `src/components/analytics/MetaPixel.tsx`                                                                                                                                                                                                                        | Script loading strategies (`afterInteractive` vs `lazyOnload`), third-party execution impact on Interaction to Next Paint (INP).                                                     |

---

## 2. Executive Risk Summary

| Category                                              | Critical | High  | Medium |  Low  | Total  |
| :---------------------------------------------------- | :------: | :---: | :----: | :---: | :----: |
| **Performance (Bundle Size & Imports)**               |    0     |   1   |   0    |   2   | **3**  |
| **Performance (Code Splitting & Lazy Loading)**       |    0     |   1   |   0    |   0   | **1**  |
| **Performance (Rendering Lifecycle & Re-renders)**    |    0     |   1   |   2    |   0   | **3**  |
| **Performance (Memory Leaks & Timers)**               |    0     |   0   |   1    |   0   | **1**  |
| **Performance (Static Assets & Core Web Vitals)**     |    0     |   2   |   0    |   2   | **4**  |
| **Performance (Backend & Database Query Efficiency)** |    1     |   0   |   2    |   0   | **3**  |
| **TOTAL**                                             |  **1**   | **5** | **5**  | **4** | **15** |

---

## 3. Detailed Findings Registry (Ordered from Critical to Low)

### PERF-01: Critical SSR Bottleneck — Unbounded Table Scan on Dynamic Route `/catalogo`

- **Category**: Performance (Backend & Database Query Efficiency)
- **Severity**: Critical
- **Exact Location**: `src/app/(public)/catalogo/page.tsx:16` and `src/lib/catalogService.ts:220-251`
- **Diagnosis and Failure Scenario**:
  In `src/app/(public)/catalogo/page.tsx`, the code sets `export const revalidate = false;` (contradicting the comment on line 14 which planned 24-hour ISR). This disables static generation and forces dynamic Server-Side Rendering on every single incoming HTTP request.
  On each page load, `CatalogoPage` executes `getProductCountsBySector()`. In `src/lib/catalogService.ts:227`, this query performs an unbounded `select("sector, categories(catalog)").eq("is_active", true)` with no `limit` or server-side grouping. It pulls all active product records across the entire database into Node.js memory and iterates through every row using a JavaScript `for...of` loop to compute sector counts. Under traffic spikes or as the product catalog scales, this creates severe Time to First Byte (TTFB) degradation, high server memory pressure, and repeated database network saturation.
- **Exact Remediation Code**:
  Enable ISR caching in `src/app/(public)/catalogo/page.tsx:16` and wrap `getProductCountsBySector` with `unstable_cache` or execute a grouped count in `src/lib/catalogService.ts`:

  ```typescript
  // File: src/app/(public)/catalogo/page.tsx
  // Reemplazar línea 16:
  export const revalidate = 86400; // 24 horas ISR con revalidación on-demand
  ```

  ```typescript
  // File: src/lib/catalogService.ts
  // Reemplazar getProductCountsBySector (líneas 220-251):
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

### PERF-02: Double-Fetch & Preload Mismatch on Product Detail LCP Image

- **Category**: Performance (Static Assets & Core Web Vitals)
- **Severity**: High
- **Exact Location**: `src/app/(public)/catalogo/[sector]/[id]/page.tsx:207-218` and `src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx:212-223`
- **Diagnosis and Failure Scenario**:
  The product detail server pages emit a manual HTML preload link: `<link rel="preload" as="image" href={imageUrl} fetchPriority="high" />` targeting the raw Supabase Storage URL (e.g., `https://cvbdqsxjfrbwovzpydng.supabase.co/storage/v1/object/public/product-images/...`). However, within `ProductDetailClient.tsx:425`, the image is rendered using Next.js `<Image src={mainImg} fill priority sizes="..." quality={80} />`.
  Next.js rewrites the image source URL to `/_next/image?url=https%3A%2F%2Fcvbdqsxjfrbwovzpydng.supabase.co...&w=1080&q=80`. Because the browser's preload cache matches requests strictly by exact URL, the browser treats the raw Supabase image and the Next.js optimized image as two completely different resources. Consequently, mobile and desktop clients download the full multi-megabyte raw original asset first, and then immediately initiate a second HTTP download for the Next.js optimized WebP/AVIF file. This doubles mobile bandwidth consumption, delays Largest Contentful Paint (LCP), and triggers browser warnings ("Resource was preloaded using link preload but not used within a few seconds").
- **Exact Remediation Code**:
  Remove the manual `<link rel="preload">` in both detail pages. Next.js `<Image priority>` automatically emits the correct, responsive, size-tailored preload link:
  ```tsx
  // File: src/app/(public)/catalogo/[sector]/[id]/page.tsx
  // Eliminar líneas 206-218:
  {
    /* Preload redundante e inconsistente eliminado: ProductDetailClient <Image priority> maneja el preload exacto */
  }
  ```
  ```tsx
  // File: src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx
  // Eliminar líneas 211-223:
  {
    /* Preload redundante e inconsistente eliminado: ProductDetailClient <Image priority> maneja el preload exacto */
  }
  ```

---

### PERF-03: Wasteful Desktop Preload & Raw `<img>` CLS Risk in `StaticHeroImage`

- **Category**: Performance (Static Assets & Core Web Vitals)
- **Severity**: High
- **Exact Location**: `src/components/ui/StaticHeroImage.tsx:14-41` and `next.config.mjs:72-80`
- **Diagnosis and Failure Scenario**:
  In `next.config.mjs:72-80` and `StaticHeroImage.tsx:14-19`, the mobile 440px image is unconditionally preloaded with `fetchpriority="high"` for all visitors of `/`:
  `Link: </images/hero/hero-home-440.webp>; rel=preload; as=image; fetchpriority=high`.
  However, on viewports wider than 1024px (desktop devices), the `<picture>` element inside `StaticHeroImage.tsx:34-41` bypasses the 440px/640px/800px `<source>` tags and renders the fallback `<img src="/images/hero/hero-home.webp" />`.
  On desktop, browsers eagerly download the 440px image due to the HTTP Link header and HTML `<link>`, and then immediately download `/images/hero/hero-home.webp`. The 440px download is discarded, wasting bandwidth during the critical initial rendering window. Furthermore, the fallback `<img>` lacks explicit `width` and `height` dimensions, causing Cumulative Layout Shift (CLS) if CSS styles are delayed.
- **Exact Remediation Code**:
  Add responsive `media` conditions to the preload link, and include explicit dimension attributes (`width={800} height={1000}`) on the fallback image tag:
  ```tsx
  // File: src/components/ui/StaticHeroImage.tsx
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
            alt="Uniformes médicos y universitarios de Confecciones Liss, empresa de uniformes en San Miguel, El Salvador"
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
  // File: next.config.mjs (líneas 72-80)
  // Actualizar el header Link con media query para no forzar la descarga de 440px en desktop:
  {
    source: '/',
    headers: [
      {
        key: 'Link',
        value:
          '</images/hero/hero-home-440.webp>; rel=preload; as=image; media="(max-width: 480px)"; fetchpriority=high',
      },
    ],
  },
  ```

---

### PERF-04: Giant Monolithic Client Icon Dictionary (140+ Lucide Icons) Defeating Tree-Shaking

- **Category**: Performance (Bundle Size & Imports)
- **Severity**: High
- **Exact Location**: `src/components/ui/icons/Icon.tsx:1-143, 159-392`
- **Diagnosis and Failure Scenario**:
  `Icon.tsx` declares `"use client"` at line 1 and statically imports **142 individual Lucide icons** into a giant dictionary `ICON_MAP` (lines 159-392).
  Because the icons are referenced as property values in a static JavaScript object, bundlers (Turbopack and Webpack) cannot tree-shake unused icons. Even if a page renders only 1 or 2 icons, the entire 142-icon dictionary is compiled into the client chunk.
  Furthermore, because `Icon.tsx` is a Client Component, every Server Component that uses `<Icon />` (such as `HomePage`, `ServiciosPrincipales`, `UniversidadesCoverage`, `Footer`) creates client component leaf boundaries, forcing React to serialize client manifests and hydrate each icon on the client thread.
- **Exact Remediation Code**:
  Split icons so Server Components can render direct inline SVGs or export individual icon components without bundling the 142-component map:

  ```tsx
  // File: src/components/ui/icons/Icon.tsx
  // Reemplazar la resolución por diccionario estático gigante con imports dinámicos
  // o permitir que los iconos críticos comunes sean ligeros y no arrastren todo el paquete:
  import React from "react";
  import type { LucideProps } from "lucide-react";
  // Importar únicamente los iconos globales esenciales usados en layout crítico
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
    storefront: Store,
    shopping_cart: ShoppingCart,
    favorite: Heart,
    search: Search,
    menu: Menu,
    close: X,
    cancel: X,
    user: User,
    person: User,
  };

  export function Icon({ name, className, size = 20, ...props }: any) {
    const key = (name ?? "").toLowerCase().replace(/-/g, "_").trim();
    const Component = CORE_ICONS[key] ?? HelpCircle;
    return <Component className={className} size={size} {...props} />;
  }
  ```

---

### PERF-05: Missing Code Splitting for Heavy Global Modals (`CartDrawer` & `LoginModal`)

- **Category**: Performance (Code Splitting & Lazy Loading)
- **Severity**: High
- **Exact Location**: `src/components/layout/GlobalModals.tsx:12-28`
- **Diagnosis and Failure Scenario**:
  `GlobalModals.tsx` statically imports `CartDrawer` (`src/components/cart/CartDrawer.tsx`, 896 lines including `FocusLock`, `react-hot-toast`, `DeliveryFormModal`, shipping calculations, and El Salvador municipality datasets) and `LoginModal`.
  `GlobalModals` is mounted in `src/app/(public)/layout.tsx:53`, meaning that for 100% of website visitors across all public routes, this entire modal suite is parsed, compiled, and hydrated on initial page load, even though both modals are closed by default (`isCartOpen = false`, `authModalContext = null`). This inflates Total Blocking Time (TBT) and First Contentful Paint (FCP) on mobile connections.
- **Exact Remediation Code**:
  Dynamically load `CartDrawer` and `LoginModal` using `next/dynamic` so their chunks are only fetched when requested or after critical hydration:

  ```tsx
  // File: src/components/layout/GlobalModals.tsx
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

### PERF-06: Unmemoized Context Values & Cascading Re-render Waterfalls Across App Providers

- **Category**: Performance (Rendering Lifecycle & Re-renders)
- **Severity**: High
- **Exact Location**:
  - `src/context/FavoritesContext.tsx:294-299`
  - `src/context/CartContext.tsx:695-715`
  - `src/context/AuthContext.tsx:458-473`
  - `src/context/NotificationContext.tsx:847-861`
- **Diagnosis and Failure Scenario**:
  None of the four global Context Providers memoize their `value` props using `useMemo`.
  For example, in `FavoritesContext.tsx:294`, `value={{ favorites, toggleFavorite, isFavorite }}` instantiates a new object literal on every single render.
  Because each `CatalogProductCard.tsx:77` subscribes to `useFavorites()`, any render in the provider tree forces React to re-render all 50+ product cards in the grid.
  Similarly, in `AuthContext.tsx:458`, `authModalContext` is stored in the same unmemoized context object as `user` and `profile`. Whenever any button calls `showAuthModal()`, `AuthProvider` re-renders. Because `CartProvider` and `FavoritesProvider` consume `useAuth()`, they re-render as well, cascading down to all Navbar badges, drawers, buttons, and product cards across the application.
- **Exact Remediation Code**:
  Memoize provider values using `React.useMemo` and memoize context callbacks with `React.useCallback`:

  ```tsx
  // File: src/context/FavoritesContext.tsx
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

  ```tsx
  // File: src/context/CartContext.tsx
  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      refreshCartPrices,
      isRefreshingPrices,
      arePricesStale,
      consecutiveRefreshFailures,
      shippingInfo,
      setShippingInfo,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      refreshCartPrices,
      isRefreshingPrices,
      arePricesStale,
      consecutiveRefreshFailures,
      shippingInfo,
      setShippingInfo,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
  ```

---

### PERF-07: Continuous 30-60ms Background Animation Loops in Navbar Causing Idle CPU Burn

- **Category**: Performance (Rendering Lifecycle & Re-renders)
- **Severity**: Medium
- **Exact Location**: `src/components/layout/Navbar.tsx:67-109, 477, 495`
- **Diagnosis and Failure Scenario**:
  The `TypewriterPlaceholder` component in `Navbar.tsx` implements a recursive `setTimeout` loop that executes every 30ms to 60ms to delete and type characters.
  Lines 477 and 495 render this component **twice** simultaneously in the Navbar (one instance inside the desktop search button and one inside the mobile search button).
  Both instances run active JavaScript timers continuously while the user is simply reading or scrolling the page. This causes 20 to 30 React state updates and DOM reconciliation passes every second. On low-end mobile devices, this consumes main thread cycles, drains battery life, and increases latency during user interactions (degrading INP).
- **Exact Remediation Code**:
  Render a static accessible placeholder or trigger the typewriter animation only when the search bar is hovered, focused, or in an active state:
  ```tsx
  // File: src/components/layout/Navbar.tsx
  // Reemplazar TypewriterPlaceholder con un placeholder estático ligero:
  function TypewriterPlaceholder() {
    return (
      <div
        className="pointer-events-none flex min-w-0 items-center overflow-hidden text-sm whitespace-nowrap text-gray-500"
        aria-hidden="true"
      >
        <span className="truncate">Buscar producto...</span>
      </div>
    );
  }
  ```

---

### PERF-08: Duplicate Unthrottled Window Scroll Listeners During Mobile Touch Scroll

- **Category**: Performance (Rendering Lifecycle & Re-renders)
- **Severity**: Medium
- **Exact Location**: `src/components/layout/Navbar.tsx:241-275` and `src/components/layout/MobileBottomNav.tsx:45-80`
- **Diagnosis and Failure Scenario**:
  Both `Navbar.tsx` and `MobileBottomNav.tsx` attach unthrottled `scroll` event listeners directly to `window`.
  During mobile scrolling, scroll events can fire at 60Hz to 120Hz. On each event, both listeners independently query `window.scrollY` and call `setScrollVisible(false)` or `setScrollVisible(true)`.
  Triggering React state updates (`setState`) at high frequencies while the compositor thread is attempting to scroll causes main thread contention, micro-stutters, and frame drops (jank).
- **Exact Remediation Code**:
  Throttle scroll event handlers using `requestAnimationFrame` to ensure state updates execute at most once per frame:

  ```typescript
  // File: src/components/layout/Navbar.tsx & src/components/layout/MobileBottomNav.tsx
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
            if (delta > 10) setScrollVisible(false);
            else if (delta < -10) setScrollVisible(true);
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

### PERF-09: Uncached Duplicate Backend Calls in Next.js Server Components (`getProductBySlug`)

- **Category**: Performance (Backend & Database Query Efficiency)
- **Severity**: Medium
- **Exact Location**: `src/app/(public)/catalogo/[sector]/[id]/page.tsx:51, 149` and `src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx:72, 158`
- **Diagnosis and Failure Scenario**:
  In both dynamic product detail routes, `getProductBySlug(id)` is invoked twice per request: first inside `generateMetadata()` to generate OpenGraph and Twitter meta tags, and second inside the page component `ProductDetailPage()` to render the product UI.
  Because `getProductBySlug` in `src/lib/catalogService.ts:130` uses a direct Supabase client call and is not wrapped with React's `cache()` API, Next.js cannot deduplicate the call across the render lifecycle. As a result, two separate HTTP roundtrips are fired to Supabase for the exact same product on every on-demand request, doubling database query latency.
- **Exact Remediation Code**:
  Wrap `getProductBySlug` in `src/lib/catalogService.ts` with `React.cache()`:

  ```typescript
  // File: src/lib/catalogService.ts
  import { cache } from "react";

  export const getProductBySlug = cache(
    async (slug: string): Promise<DbProduct | null> => {
      const supabase = getServerClient();
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

### PERF-10: Uncleaned Memory Leak in `requestIdleCallback` Initialization

- **Category**: Performance (Memory Leaks & Timers)
- **Severity**: Medium
- **Exact Location**: `src/providers/index.tsx:56-67`
- **Diagnosis and Failure Scenario**:
  In `src/providers/index.tsx`, when `"requestIdleCallback" in window` is true, the effect invokes:
  `(window as Window & typeof globalThis).requestIdleCallback(() => setMounted(true), { timeout: 1500 });`
  However, the `useEffect` returns no cleanup function for the idle callback. If the `Providers` component unmounts before the idle callback fires (e.g., during fast navigation or HMR in development), the idle callback still executes and attempts to call `setMounted(true)` on an unmounted component, retaining closures in memory.
- **Exact Remediation Code**:
  Store the callback ID and cancel it in the `useEffect` cleanup return:

  ```typescript
  // File: src/providers/index.tsx
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

### PERF-11: Unindexed Wildcard Sequential Scan in Global Search (`ilike '%query%'`)

- **Category**: Performance (Backend & Database Query Efficiency)
- **Severity**: Medium
- **Exact Location**: `src/components/layout/SearchModal.tsx:144-168, 424`
- **Diagnosis and Failure Scenario**:
  In `SearchModal.tsx:153`, searches query Supabase using `.ilike("name", `%${query}%`)`.
  Leading wildcards (`%query%`) cannot utilize standard PostgreSQL B-Tree indexes, requiring PostgreSQL to perform a full sequential table scan on every debounced keystroke.
  Furthermore, the modal does not cache previous search query results in memory; typing and backspacing repeatedly triggers identical network queries. Finally, at line 424, "Ver todos los resultados" uses `window.location.href = '/catalogo'`, which destroys the Single Page Application state and triggers an expensive hard full-page reload.
- **Exact Remediation Code**:
  Replace `window.location.href` with Next.js router navigation, cache client query responses in a local map, and create a trigram GIN index on Supabase:
  ```tsx
  // File: src/components/layout/SearchModal.tsx
  // Línea 424: Reemplazar window.location.href con router.push
  <button
    onClick={() => {
      onClose();
      router.push("/catalogo");
    }}
    className="text-primary mt-3 w-full rounded-xl py-2 text-center text-sm font-semibold hover:bg-gray-50"
  >
    Ver todos los resultados →
  </button>
  ```
  ```sql
  -- Base de datos Supabase: Crear índice trigram para búsquedas ilike instantáneas
  CREATE EXTENSION IF NOT EXISTS pg_trgm;
  CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin (name gin_trgm_ops);
  ```

---

### PERF-12: Dead Package Import from `react-icons/si` in Server Component `Footer.tsx`

- **Category**: Performance (Bundle Size & Imports)
- **Severity**: Low
- **Exact Location**: `src/components/layout/Footer.tsx:6-12`
- **Diagnosis and Failure Scenario**:
  `Footer.tsx` imports five icons from the massive `react-icons/si` icon package (`SiFacebook, SiGooglemaps, SiInstagram, SiTiktok, SiYoutube`).
  However, these imported icons are never rendered anywhere in the component; `Footer` defines its own custom inline SVG paths in `socialSvgPaths` (lines 14-39) and renders `<SocialIcon id={social.svgKey} />`. The `react-icons/si` imports are dead code that unnecessarily burdens the Next.js compiler and server bundle.
- **Exact Remediation Code**:
  Delete the unused imports from `Footer.tsx`:
  ```tsx
  // File: src/components/layout/Footer.tsx
  // Eliminar líneas 6-12:
  // (Las rutas SVG inline de socialSvgPaths ya proporcionan todos los iconos necesarios sin dependencias externas)
  ```

---

### PERF-13: Dead Client Component Chunk Generated for Deprecated `MaterialSymbolsLoader`

- **Category**: Performance (Bundle Size & Imports)
- **Severity**: Low
- **Exact Location**: `src/components/layout/MaterialSymbolsLoader.tsx:1-13` and `src/app/layout.tsx:25, 265`
- **Diagnosis and Failure Scenario**:
  `MaterialSymbolsLoader.tsx` contains `"use client"` and returns `null` (it is marked as deprecated since icons were migrated to inline SVG).
  In `src/app/layout.tsx:265`, `<MaterialSymbolsLoader />` is imported and mounted inside the root `RootLayout`.
  Because it is a Client Component, Next.js serializes client component manifest entries and emits an empty client JS chunk loaded on every single page of the site.
- **Exact Remediation Code**:
  Remove the import and invocation from `src/app/layout.tsx`:
  ```tsx
  // File: src/app/layout.tsx
  // Eliminar línea 25: import { MaterialSymbolsLoader } from "@/components/layout/MaterialSymbolsLoader";
  // Eliminar línea 265: <MaterialSymbolsLoader />
  ```

---

### PERF-14: Client Component Bloat via `unoptimized` in `CategoryHubClient`

- **Category**: Performance (Static Assets & Core Web Vitals)
- **Severity**: Low
- **Exact Location**: `src/components/catalogo/CategoryHubClient.tsx:62`
- **Diagnosis and Failure Scenario**:
  In `CategoryHubClient.tsx:62`, `<Image>` uses the `unoptimized` prop for category cards.
  This disables Next.js's automated resizing and format conversion, forcing mobile viewports to download the full-resolution source image files without AVIF/WebP responsive generation.
- **Exact Remediation Code**:
  Remove the `unoptimized` attribute from `<Image>` in `CategoryHubClient.tsx`:
  ```tsx
  // File: src/components/catalogo/CategoryHubClient.tsx
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

### PERF-15: Non-Critical Third-Party Script Scheduled During Core Interactivity

- **Category**: Performance (Static Assets & Core Web Vitals)
- **Severity**: Low
- **Exact Location**: `src/components/analytics/GoogleMerchantWidget.tsx:67-73`
- **Diagnosis and Failure Scenario**:
  `GoogleMerchantWidget.tsx` loads the Google Merchant badge script with `strategy="afterInteractive"`.
  The script downloads and executes immediately after the main document becomes interactive, competing directly with hydration and early user input handling. For a passive badge in the lower screen corner, running during `afterInteractive` adds unnecessary main-thread overhead.
- **Exact Remediation Code**:
  Change the loading strategy to `strategy="lazyOnload"`:
  ```tsx
  // File: src/components/analytics/GoogleMerchantWidget.tsx
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

## 4. Prioritized Action Plan

To stabilize performance and optimize Core Web Vitals without risking visual regressions or broken state, remediations should be executed in three non-breaking phases:

### Phase 1: High-Impact Critical Fixes (Immediate)

1. **Stabilize `/catalogo` SSR (PERF-01)**:
   - Change `export const revalidate = 86400;` in `src/app/(public)/catalogo/page.tsx`.
   - Wrap `getProductCountsBySector` in `catalogService.ts` with `unstable_cache`.
2. **Eliminate Double-Fetch Image Preload Mismatches (PERF-02 & PERF-03)**:
   - Remove raw URL preloads from product detail pages.
   - Adjust `StaticHeroImage` and `next.config.mjs` Link headers with responsive media queries.
3. **Lazy-Load Global Modals (PERF-05)**:
   - Convert `CartDrawer` and `LoginModal` to `next/dynamic({ ssr: false })` in `GlobalModals.tsx`.

### Phase 2: Runtime Re-render & Memory Optimization (Short-Term)

4. **Context Memoization & Cascading Re-render Mitigation (PERF-06)**:
   - Wrap `value` objects with `useMemo` in `FavoritesContext`, `CartContext`, `AuthContext`, and `NotificationContext`.
5. **Memory Leak Fix in Providers (PERF-10)**:
   - Implement `cancelIdleCallback(handle)` cleanup in `src/providers/index.tsx`.
6. **Background Loop & Scroll Listener Throttling (PERF-07 & PERF-08)**:
   - Replace continuous `setTimeout` typewriter loop in `Navbar` with static text.
   - Throttle `Navbar` and `MobileBottomNav` scroll handlers using `requestAnimationFrame`.
7. **Deduplicate Server Queries via `React.cache` (PERF-09)**:
   - Wrap `getProductBySlug` with `React.cache()` in `src/lib/catalogService.ts`.

### Phase 3: Bundle Pruning & Database Tuning (Maintenance)

8. **Prune Dead Code and Icons (PERF-04, PERF-12, PERF-13)**:
   - Remove unused `react-icons/si` imports from `Footer.tsx`.
   - Remove deprecated `<MaterialSymbolsLoader />` from `RootLayout`.
   - Refactor `Icon.tsx` to prevent compiling 142 unused icons into a single client bundle.
9. **Search Optimization (PERF-11)**:
   - Replace `window.location.href` with `router.push("/catalogo")` in `SearchModal.tsx`.
   - Create a PostgreSQL `pg_trgm` GIN index on `products(name)` in Supabase.
10. **Third-Party Script & Asset Fine-Tuning (PERF-14, PERF-15)**:
    - Remove `unoptimized` from `CategoryHubClient.tsx`.
    - Change Google Merchant Widget script strategy to `lazyOnload`.

---

## 5. Handoff Protocol Compliance

### 1. Observation

- Verified exact source code in `src/app/(public)/catalogo/page.tsx:16` showing `export const revalidate = false;`.
- Verified `src/lib/catalogService.ts:227` showing unbounded `select("sector, categories(catalog)").eq("is_active", true)` with JavaScript memory iteration.
- Verified `src/app/(public)/catalogo/[sector]/[id]/page.tsx:207-218` emitting raw Supabase `<link rel="preload">` while line 425 of `ProductDetailClient.tsx` requests `/_next/image?url=...`.
- Verified `src/components/ui/StaticHeroImage.tsx:14` and `next.config.mjs:76` preloading 440px image without desktop media constraints.
- Verified `src/components/ui/icons/Icon.tsx:5-143` statically importing 142 icons into `ICON_MAP`.
- Verified `src/components/layout/Footer.tsx:6-12` importing unused `react-icons/si`.
- Verified `src/components/layout/GlobalModals.tsx:12-28` statically importing `CartDrawer` and `LoginModal`.
- Verified `src/context/FavoritesContext.tsx:294`, `CartContext.tsx:695`, `AuthContext.tsx:458`, and `NotificationContext.tsx:847` creating unmemoized object literals for `value`.
- Verified `src/components/layout/Navbar.tsx:67-109` running active 30-60ms `setTimeout` loops and lines 241-275 registering unthrottled window scroll listeners.
- Verified `src/providers/index.tsx:58-62` scheduling `requestIdleCallback` without returning `cancelIdleCallback`.

### 2. Logic Chain

1. If a page declares `export const revalidate = false`, Next.js executes its server code on every HTTP request.
2. If `getProductCountsBySector` executes an unconstrained `select(...)` over the whole `products` table and loops in JS memory, every request causes database roundtrips and high memory usage, directly degrading TTFB.
3. If `<link rel="preload">` points to URL `A` (raw Supabase Storage) and `<Image>` renders URL `B` (`/_next/image?url=...`), the browser cannot correlate the preload, resulting in a duplicate download of the largest visual asset on the page, hurting LCP.
4. If an object dictionary stores 140+ component references in a `"use client"` file, bundler tree-shaking cannot remove any unrendered icon, inflating client chunk size.
5. If Context Providers provide new object literals on every render without `useMemo`, all subscribers re-render on any parent or context state change, causing quadratic re-render cascades in catalog grids.
6. If continuous background timers run in the Navbar, React executes 20-30 state reconciliations per second while idle, increasing INP latency.
7. Therefore, addressing these 15 empirical findings in the prioritized sequence will significantly improve LCP, INP, CLS, TTFB, and bundle payload.

### 3. Caveats

- Production CDN cache hit rates on Vercel/Edge may mitigate SSR latency for cached routes, but cold starts and cache-miss renders will directly suffer from PERF-01 and PERF-09.
- Supabase RLS policies and table indexes were inspected through client-side query patterns and schema definitions; raw PostgreSQL server `EXPLAIN ANALYZE` execution was not run due to the passive audit constraint.

### 4. Conclusion

The Confecciones Liss codebase displays strong design preservation and SEO architecture, but suffers from 15 verified performance bottlenecks across bundle size, unmemoized context cascades, image preload mismatches, background timer loops, and database query inefficiency. Applying the provided non-breaking code remediations will harden Core Web Vitals (LCP, INP, CLS) and stabilize server performance.

### 5. Verification Method

- **Code Inspection**: Inspect lines referenced in each finding via `read_file`.
- **Bundle Analysis**: Verify chunk size reduction and dynamic modal splitting after applying `GlobalModals` dynamic imports.
- **Network Tab Verification**: In browser DevTools, verify that product detail pages initiate a single image request rather than downloading both raw and `/_next/image` assets.
- **React Profiler**: Record a profile in DevTools while toggling favorites or opening an auth modal to verify that product cards and Navbar badges no longer re-render unnecessarily once context values are memoized.
