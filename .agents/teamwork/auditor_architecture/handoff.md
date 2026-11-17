# Forensic Audit Report: Code Quality and Architecture

**Work Product**: Confecciones Liss Codebase (`src/`, configuration files, build & runtime architecture)  
**Profile**: General Project / Benchmark Integrity Mode  
**Auditor**: Forensic Code Quality & Architecture Auditor  
**Date**: 2026-11-07  
**Verdict**: **INTEGRITY VIOLATION / MULTIPLE ARCHITECTURAL VULNERABILITIES DETECTED**

---

## 1. Audited Surface Map

An exhaustive, non-destructive, zero-trust passive static audit was performed across all TypeScript, TSX, configuration, and build-system files within the repository. The inspected surface includes:

- **Server Actions & Mutations**: `src/actions/catalog.ts`, `src/actions/categories.ts`, `src/actions/contact.ts`, `src/actions/featuredProducts.ts`
- **Application Shell & Routing**: `src/app/layout.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/(public)/**`, `src/app/(admin)/**`, `src/app/api/**`, `src/app/auth/**`, `src/proxy.ts`
- **Global State & Context Providers**: `src/context/AuthContext.tsx`, `src/context/CartContext.tsx`, `src/context/ConfirmContext.tsx`, `src/context/FavoritesContext.tsx`, `src/context/NotificationContext.tsx`, `src/providers/index.tsx`, `src/providers/DeferredProviders.tsx`
- **Custom Hooks & Utilities**: `src/hooks/*`, `src/lib/catalogService.ts`, `src/lib/productUtils.ts`, `src/lib/reviewsService.ts`, `src/lib/googleReviewsService.ts`, `src/lib/logger.ts`, `src/lib/clientEnv.ts`, `src/lib/schemas.ts`, `src/lib/legalOgHelper.tsx`
- **Components & UI System**: `src/components/layout/*`, `src/components/cart/*`, `src/components/catalogo/*`, `src/components/admin/*`, `src/components/ui/*`, `src/components/ui/icons/*`, `src/components/REGISTRY.md`
- **Validation & Schemas**: `src/schemas/*`, `src/env.ts`
- **Build, Config & Testing Infrastructure**: `package.json`, `next.config.mjs`, `knip.json`, `tsconfig.json`, `vitest.config.ts`, `vitest.setup.ts`, `AGENTS.md`, `.agents/AGENTS.md`

### Identified Tooling & Test Gaps

1. **Zero Test Coverage**: Although `vitest` and `@testing-library/react` are configured in `package.json` and `vitest.config.ts`, there are **0 test files** (`*.test.ts`, `*.spec.tsx`) in `src/`. `package.json` had to be configured with `"test": "vitest run --passWithNoTests"` to avoid build errors.
2. **Missing Database Type Generator**: There are no generated Supabase types (`database.types.ts`). As a result, all database queries operate through unvalidated string columns, untyped `any`, or double-casting assertions (`as unknown as DbProduct[]`).
3. **No Root Error Boundary (`global-error.tsx`)**: Missing `src/app/global-error.tsx` leaves any root layout runtime failure unhandled, displaying an unstyled generic 500 error page.

---

## 2. Executive Risk Summary

| Category                                 | Critical | High  | Medium |  Low  | Total  |
| :--------------------------------------- | :------: | :---: | :----: | :---: | :----: |
| **Error Handling & Resilience**          |    1     |   1   |   0    |   0   | **2**  |
| **Concurrency & Race Conditions**        |    0     |   2   |   0    |   0   | **2**  |
| **Strict Typing & TS Integrity**         |    0     |   1   |   1    |   0   | **2**  |
| **Architectural Boundaries & AGENTS.md** |    1     |   1   |   2    |   0   | **4**  |
| **Dead / Orphaned Code & Dependencies**  |    0     |   0   |   2    |   0   | **2**  |
| **Debug Logs in Production**             |    0     |   1   |   0    |   0   | **1**  |
| **Technical SEO & Canonical Resilience** |    0     |   0   |   0    |   1   | **1**  |
| **TOTAL**                                |  **2**   | **6** | **5**  | **1** | **14** |

---

## 3. Detailed Findings Registry (Ordered Critical to Low)

### ARCH-01: Absence of `global-error.tsx` and Route-Group Error Boundaries

- **Category**: Code Quality / Error Handling
- **Severity**: **Critical**
- **Exact Location**: `src/app/error.tsx:1-39` (missing `src/app/global-error.tsx`, missing `src/app/(admin)/admin/error.tsx`)
- **Diagnosis and Failure Scenario**:
  In Next.js App Router, `src/app/error.tsx` does NOT catch errors thrown in the Root Layout (`src/app/layout.tsx`). The official Next.js App Router specification mandates `src/app/global-error.tsx` (which must render its own `<html>` and `<body>` tags) to recover from crashes in root providers, fonts, or analytics loaders. Currently, if an uncaught exception occurs during layout evaluation, the entire server process fails open to a default, unstyled browser 500 without brand identity, navigation, or recovery mechanism. Furthermore, because there is no route-group `error.tsx` in `(admin)`, an uncaught exception in the admin product table tears down the admin layout and sidebar entirely, presenting a customer-facing generic error screen to store administrators.
- **Exact Remediation Code**:
  Create `src/app/global-error.tsx`:

  ```tsx
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
      logger.error("[GlobalError] Root layout failure caught:", error);
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

### ARCH-02: Unauthenticated Server Action & Complete Omission of `next-safe-action`

- **Category**: Architectural Boundaries / Security & Resilience
- **Severity**: **Critical**
- **Exact Location**:
  - `src/actions/categories.ts:19`
  - `src/actions/contact.ts:23`
  - `src/actions/catalog.ts:39`
  - `src/actions/featuredProducts.ts:56`
- **Diagnosis and Failure Scenario**:
  `package.json` installs `"next-safe-action": "^8.4.0"` and `AGENTS.md` Rule 9 explicitly commands:
  _"Todo Server Action debe estar exclusivamente dentro de `src/actions/` y ser envuelto mediante `next-safe-action`."_
  However, **none** of the Server Actions in `src/actions/` use `next-safe-action`.
  Worse, `src/actions/categories.ts:19` (`revalidateAfterCategorySave`) performs **no authentication or session verification whatsoever**. Any unauthorized external actor can send a simple HTTP POST request to Next.js calling `revalidateAfterCategorySave()` and force repeated, unthrottled cache purges of all public paths (`/`, `/catalogo`, `/catalogo/universidades/*`), degrading server performance and opening a Denial of Service (DoS) attack vector on the server cache.
- **Exact Remediation Code**:
  Create `src/lib/safe-action.ts`:

  ```ts
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

  Refactor `src/actions/categories.ts`:

  ```ts
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

### ARCH-03: Race Conditions and State Updates on Unmounted Components in Debounced Search & Filter Effects

- **Category**: Concurrency & Race Conditions
- **Severity**: **High**
- **Exact Location**:
  - `src/components/layout/SearchModal.tsx:132-173`
  - `src/app/(admin)/admin/products/page.tsx:81-152`
  - `src/app/(admin)/admin/messages/page.tsx:36-62`
- **Diagnosis and Failure Scenario**:
  In `SearchModal.tsx:132-173`, when the user inputs characters (e.g., typing "enfer" then "medicina"), asynchronous queries are issued without an `AbortController` or cancellation flag. If the initial query takes 600ms and the subsequent query resolves in 150ms, the slower promise resolves _last_, overwriting the fresh search results with stale data from the previous keystroke. Furthermore, if the user closes the modal while a query is in-flight, `setResults` and `setIsLoading(false)` execute on an unmounted component, leading to memory leaks and React state warnings. Similar race conditions exist in `admin/products/page.tsx` and `admin/messages/page.tsx` when switching filters rapidly.
- **Exact Remediation Code**:
  Corrected `useEffect` in `src/components/layout/SearchModal.tsx:132-173`:

  ```tsx
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
            `id, name, description, short_description, price, old_price,
             image_path, images, slug, sector, category,
             categories(name, catalog)`
          )
          .eq("is_active", true)
          .ilike("name", `%${query}%`)
          .limit(8)
          .abortSignal(controller.signal);

        if (!isCancelled) {
          if (!error && data) {
            setResults(data as unknown as DbProduct[]);
          }
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled && (err as { name?: string })?.name !== "AbortError") {
          logger.error("[SearchModal] Search query failed:", err);
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

### ARCH-04: Uncleaned Auth State Change & Supabase Realtime Channel Memory Leaks

- **Category**: Concurrency & Memory Leaks
- **Severity**: **High**
- **Exact Location**:
  - `src/context/AuthContext.tsx:353-398`
  - `src/context/NotificationContext.tsx:413-501`
- **Diagnosis and Failure Scenario**:
  In `AuthContext.tsx:245-399`, `initSession` is an `async` function defined inside `useEffect`. Because `subscription` is assigned _after_ `await supabase.auth.getSession()`, if the component unmounts during the `await` phase, the cleanup function `return () => { mounted = false; if (subscription) subscription.unsubscribe(); }` runs while `subscription` is still `null`. When `onAuthStateChange` finally registers moments later, the subscription object is never unsubscribed and leaks in memory for the life of the application.
  In `NotificationContext.tsx:409-501`, a similar race condition leaves Postgres realtime WebSockets active after unmount, and line 498 silences channel removal errors in an empty `catch (e) {}` block.
- **Exact Remediation Code**:
  Refactor `src/context/AuthContext.tsx:244-399`:

  ```tsx
  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      const { getSupabaseClient } = await import("@/lib/supabaseClient");
      const supabase = getSupabaseClient();

      if (!mounted) return;

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(
        (event: AuthChangeEvent, currentSession: Session | null) => {
          if (!mounted) return;
          if (
            event === "SIGNED_OUT" ||
            (event === "TOKEN_REFRESHED" && !currentSession)
          ) {
            setSession(null);
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
            setLoading(false);
            return;
          }
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user ?? null);
            setLoading(false);
          }
        }
      );

      if (!mounted) {
        subscription.unsubscribe();
      } else {
        authSubscription = subscription;
      }
    };

    setupAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);
  ```

---

### ARCH-05: Complete Non-Compliance with Zustand State Mandate Causing React Context Re-render Churn

- **Category**: Architectural Boundaries / Performance & Maintainability
- **Severity**: **High**
- **Exact Location**:
  - `src/context/CartContext.tsx:1-717`
  - `src/context/NotificationContext.tsx:1-863`
  - `src/providers/index.tsx:75-85`
  - `AGENTS.md:Rule 6`
- **Diagnosis and Failure Scenario**:
  `AGENTS.md` Rule 6 dictates:
  _"- `src/context/` es solo para estados globales con Zustand._
  _- `src/providers/` es EXCLUSIVO para englobar context providers de React (ThemeProvider, QueryClientProvider)."_
  `package.json` installs `"zustand": "^5.0.12"`, yet Zustand is **never imported anywhere in `src/`**.
  Instead, `src/context/` contains 5 monolithic React Context providers (`CartContext` 717 lines, `NotificationContext` 863 lines, `AuthContext` 475 lines, `FavoritesContext`, `ConfirmContext`). Whenever a cart item is adjusted or a notification polling tick occurs, the entire subtree re-renders, bypassing selector-based memoization.
- **Exact Remediation Code**:
  Migrate cart state to Zustand (`src/context/useCartStore.ts`):

  ```ts
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

### ARCH-06: Direct `console.log` / `console.error` Statements in Production Bypassing `logger.ts`

- **Category**: Code Quality / Information Disclosure & Standards
- **Severity**: **High**
- **Exact Location**:
  - `src/actions/contact.ts:101`
  - `src/actions/catalog.ts:65`
  - `src/actions/featuredProducts.ts:136`
  - `src/app/(public)/confirmacion-pedido/ConfirmacionPedidoClient.tsx:88`
  - `src/app/api/csp-report/route.ts:122`
  - `src/app/auth/callback/route.ts:64`
  - `src/components/analytics/GoogleCustomerReviewsOptIn.tsx:50`
  - `src/components/analytics/GoogleMerchantWidget.tsx:35, 58`
  - `src/app/(dev)/sandbox/page.tsx:265`
- **Diagnosis and Failure Scenario**:
  `src/lib/logger.ts` is explicitly implemented to prevent console clutter and telemetry leaks in production environments (`if (isDev) console.log(...)`). However, multiple Server Actions and client components bypass `logger` and call raw `console.error` and `console.warn` directly. In `src/actions/contact.ts:101`, `console.error("[sendContactMessage] Supabase error:", error.message)` logs internal Postgres/Supabase database errors directly to server logs in plain text.
- **Exact Remediation Code**:
  Replace raw console invocations with `logger`:
  In `src/actions/contact.ts:101`:
  ```ts
  // Replace: console.error("[sendContactMessage] Supabase error:", error.message);
  import { logger } from "@/lib/logger";
  // ...
  if (error) {
    logger.error("[sendContactMessage] Supabase error:", error.message);
    return {
      success: false,
      error: "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
    };
  }
  ```
  In `src/actions/catalog.ts:65`:
  ```ts
  // Replace: console.warn("[revalidateAfterProductSave] Intento de revalidación no autorizado.");
  logger.warn(
    "[revalidateAfterProductSave] Intento de revalidación no autorizado."
  );
  ```

---

### ARCH-07: Silent Empty `catch {}` Blocks Swallowing Security Audit Events

- **Category**: Error Handling / OWASP A09 Audit Integrity
- **Severity**: **High**
- **Exact Location**:
  - `src/actions/contact.ts:61`
  - `src/actions/contact.ts:115`
  - `src/context/NotificationContext.tsx:500`
- **Diagnosis and Failure Scenario**:
  In `src/actions/contact.ts:55-61` and `109-115`, audit logging insertions to the `security_events` table are enclosed in completely empty `try { ... } catch {}` blocks. If database permissions, column constraints, or network connectivity issues prevent security event logging, the system silently discards the error. Under a security attack or rate limit surge, security telemetry vanishes without any indication or alert in system logs.
- **Exact Remediation Code**:
  Refactor `src/actions/contact.ts:55-62` and `109-116`:

  ```ts
  try {
    await supabase.from("security_events").insert({
      event_type: "contact_rate_limit_exceeded",
      payload: { email: emailKey, count: rateRecord.count },
      url: "/contacto",
    });
  } catch (auditError) {
    logger.error(
      "[sendContactMessage] Failed to record rate limit security event:",
      auditError
    );
  }

  // ... and line 109:
  try {
    await supabase.from("security_events").insert({
      event_type: "contact_message_sent",
      payload: { email: emailKey, subject: parsed.data.asunto },
      url: "/contacto",
    });
  } catch (auditError) {
    logger.error(
      "[sendContactMessage] Failed to record message sent security event:",
      auditError
    );
  }
  ```

---

### ARCH-08: Complete Absence of Generated Supabase Database Types & Type Safety Bypasses

- **Category**: Strict Typing
- **Severity**: **High**
- **Exact Location**:
  - `src/lib/catalogService.ts:113, 119, 147, 176, 206`
  - `src/lib/productUtils.ts:123`
  - `src/app/(admin)/admin/messages/page.tsx:41`
  - `src/context/NotificationContext.tsx:414`
  - `src/components/cart/DeliveryFormModal.tsx:110`
- **Diagnosis and Failure Scenario**:
  The repository contains zero generated database types. Consequently:
  1. `src/lib/productUtils.ts:123` exports `export const applyActiveOfferFilter = (query: any): any => { ... }` with both input and return types typed as `any`.
  2. `src/lib/catalogService.ts` repeats double-casting `(data as unknown as DbProduct[])` more than 10 times to satisfy TypeScript.
  3. In `src/app/(admin)/admin/messages/page.tsx:41`, query construction starts with `let query: any = supabase...`.
     If column names change or are misspelled in queries (`price`, `old_price`, `is_active`), TypeScript cannot catch the regression during build time, resulting in silent runtime data loss or UI crashes.
- **Exact Remediation Code**:
  Generate and export `src/types/database.types.ts`:

  ```ts
  export interface Database {
    public: {
      Tables: {
        products: {
          Row: {
            id: string;
            name: string;
            description: string | null;
            short_description: string | null;
            price: number;
            old_price: number | null;
            is_active: boolean;
            is_featured: boolean;
            image_path: string | null;
            images: string[] | null;
            slug: string;
            sector: string | null;
            category: string | null;
            created_at: string;
            updated_at: string;
          };
          Insert: Omit<
            Database["public"]["Tables"]["products"]["Row"],
            "id" | "created_at" | "updated_at"
          >;
          Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        };
        messages: {
          Row: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            subject: string;
            message: string;
            is_read: boolean;
            created_at: string;
          };
        };
      };
    };
  }
  ```

  Type `applyActiveOfferFilter` strictly in `src/lib/productUtils.ts:123`:

  ```ts
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

### ARCH-09: Phantom Imports of Lit Web Components (`@aejkatappaja/phantom-ui`) in 40+ Skeletons

- **Category**: Dead Code / Architectural Boundaries
- **Severity**: **Medium**
- **Exact Location**:
  - `src/app/(public)/ayuda/loading.tsx:15`
  - `src/app/(public)/catalogo/loading.tsx:32`
  - `src/app/(public)/empresa/loading.tsx:15`
  - (and 40+ other `loading.tsx` files across `src/app/`)
  - `src/phantom-ui.d.ts:1-15`
  - `src/app/layout.tsx:3`
- **Diagnosis and Failure Scenario**:
  In `src/app/layout.tsx:3`, comments state that `<phantom-ui>` is never rendered in JSX because all loading skeletons use native Tailwind `div`s with `animate-pulse`. Nevertheless, over 40 `loading.tsx` files maintain `"use client"` and execute `useEffect(() => { import("@aejkatappaja/phantom-ui"); }, []);`. This dynamically downloads the Lit runtime (`@lit/reactive-element`, `lit-html`) on every client skeleton hydration, causes the "Lit is in dev mode" warning in `next dev`, forces Turbopack resolve aliases in `next.config.mjs`, and prevents Next.js from streaming static server-rendered HTML loading skeletons.
- **Exact Remediation Code**:
  Convert all `loading.tsx` files to pure Server Components without client runtime overhead:

  ```tsx
  // Pure Server Component: NO "use client", NO phantom-ui import
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
      </div>
    );
  }
  ```

  Remove `@aejkatappaja/phantom-ui` from `package.json` and delete `src/phantom-ui.d.ts`.

---

### ARCH-10: 21 Fragile Deep Imports with `@ts-ignore` in `legalOgHelper.tsx`

- **Category**: Strict Typing / Dependency Encapsulation
- **Severity**: **Medium**
- **Exact Location**: `src/lib/legalOgHelper.tsx:6-47`
- **Diagnosis and Failure Scenario**:
  `src/lib/legalOgHelper.tsx` contains 21 consecutive `// @ts-ignore` pragmas to bypass TypeScript while importing internal ESM private paths of `lucide-react` (e.g. `import { __iconNode as shieldNode } from "lucide-react/dist/esm/icons/shield.js"`). Deep-importing internal dist files violates standard package encapsulation. Any minor upgrade or repackaging of `lucide-react` breaks these paths at build time, crashing the OpenGraph image generation endpoint.
- **Exact Remediation Code**:
  Replace private dist paths with standard SVG icon nodes or public Lucide helpers in `src/lib/legalOgHelper.tsx`:

  ```tsx
  import { ImageResponse } from "next/og";
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
  } from "lucide-react";

  // Use official React elements or clean SVG path mappings without @ts-ignore
  ```

---

### ARCH-11: Missing Form Zod Schemas & Direct Database Mutations in UI Views

- **Category**: Architectural Boundaries / AGENTS.md Compliance
- **Severity**: **Medium**
- **Exact Location**:
  - `src/components/cart/DeliveryFormModal.tsx:155-210`
  - `src/components/admin/ProductModal.tsx:415-560`
  - `src/schemas/`
- **Diagnosis and Failure Scenario**:
  `AGENTS.md` Rule 9 explicitly states:
  _"La validación de los datos que le llegan a una Actions o las validaciones de Forms, no deben ir directamente en las vistas, se deben definir como esquemas con Zod en `src/schemas/`."_
  However, only two schemas exist in `src/schemas/` (`contactSchema.ts` and `reviewSchema.ts`).
  Both `DeliveryFormModal.tsx` and `ProductModal.tsx` perform manual inline procedural string checks directly in client components. In `ProductModal.tsx:433-560`, the client executes direct `supabase.from("products").insert/update` operations inside a 2063-line view without server action wrapping, schema validation, or sanitization layers.
- **Exact Remediation Code**:
  Create `src/schemas/deliverySchema.ts`:

  ```ts
  import { z } from "zod";

  export const deliverySchema = z.object({
    deliveryMethod: z.enum(["taller", "punto_medio", "domicilio"], {
      required_error: "Selecciona un método de entrega",
    }),
    recipientName: z
      .string()
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    recipientPhone: z
      .string()
      .trim()
      .regex(
        /^[267][0-9]{7}$/,
        "Ingresa un número salvadoreño válido de 8 dígitos"
      ),
    recipientEmail: z
      .string()
      .trim()
      .email("Correo electrónico inválido")
      .optional()
      .or(z.literal("")),
    alternatePhone: z.string().trim().optional(),
    department: z.string().min(1, "Selecciona un departamento"),
    municipality: z.string().min(1, "Selecciona un municipio"),
    addressColonia: z.string().trim().min(2, "Ingresa colonia o barrio"),
    addressStreet: z.string().trim().min(2, "Ingresa calle, avenida o pasaje"),
    addressNumber: z.string().trim().optional(),
    addressReference: z.string().trim().optional(),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos de envío" }),
    }),
  });

  export type DeliveryFormData = z.infer<typeof deliverySchema>;
  ```

---

### ARCH-12: Raw `<svg>` Inclusions in React Layouts Violating `AGENTS.md` Rule 10.2

- **Category**: Architectural Boundaries / UI Modularization
- **Severity**: **Medium**
- **Exact Location**:
  - `src/components/cart/LoginModal.tsx:129`
  - `src/components/layout/Footer.tsx:127`
  - `src/components/ui/HeroImageCarousel.tsx:186, 213`
  - `src/components/catalogo/MobileFilterDrawer.tsx:295`
  - `src/components/legal/LegalArticleReader.tsx:19, 36, 53, 72`
- **Diagnosis and Failure Scenario**:
  `AGENTS.md` Rule 10.2 strictly prohibits embedded SVG structures in JSX:
  _"Extracción de SVGs: Nunca, ¡JAMÁS!, dejes archivos SVG enteros inmersos estáticamente dentro del JSX de React layout. Extrae los SVGs del DOM o: a) Los descargas/guardas en archivos en `/public/icons/`. b) Si necesitan prop logic, sepáralos obligatoriamente como `<Icons.IconName />` en el directorio de `src/components/ui/icons/` y reemplaza el JSX para importarlo prolijamente."_
  Direct `<svg>` embedding inflates bundle size, breaks consistent icon caching, and bypasses accessibility properties handled by the central `Icon` component.
- **Exact Remediation Code**:
  Extract the Google login icon to `src/components/ui/icons/GoogleIcon.tsx`:
  ```tsx
  export function GoogleIcon({ className }: { className?: string }) {
    return (
      <svg
        className={className ?? "h-5 w-5 shrink-0"}
        viewBox="0 0 24 24"
        aria-hidden="true"
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
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    );
  }
  ```
  Replace line 129 in `src/components/cart/LoginModal.tsx` with `<GoogleIcon />`.

---

### ARCH-13: Orphaned Dead Code, Unused Dependencies & Phantom Registry Documentation

- **Category**: Dead Code & Documentation Integrity
- **Severity**: **Medium**
- **Exact Location**:
  - `src/components/empresa/PerfilDetalleClient.tsx:1-151`
  - `src/config/mediaKit.ts:1-136`
  - `src/components/REGISTRY.md:62, 72, 84`
  - `package.json:18, 19, 24, 25, 28, 38`
  - `knip.json:3-25`
- **Diagnosis and Failure Scenario**:
  1. `src/components/empresa/PerfilDetalleClient.tsx` (151 lines) and `src/config/mediaKit.ts` (136 lines) are never imported or routed anywhere in the application. They were added to `knip.json` `ignore` to hide dead-code warnings.
  2. `package.json` retains completely unused production dependencies: `groq-sdk`, `@base-ui/react`, `class-variance-authority`, `client-only`, and `server-only`.
  3. `src/components/REGISTRY.md` documents `Badge.tsx`, `CategoryChip.tsx`, and `ProductCard.tsx` as components residing in `src/components/ui/`, yet **none of these files exist** in the repository. Meanwhile, core components like `DeliveryFormModal`, `ProductModal`, and `CatalogProductCard` are completely omitted from the registry.
- **Exact Remediation Code**:
  - Delete `src/components/empresa/PerfilDetalleClient.tsx` and `src/config/mediaKit.ts`.
  - Uninstall unused dependencies:
    ```bash
    npm uninstall groq-sdk @base-ui/react class-variance-authority client-only server-only
    ```
  - Clean `knip.json` ignore list and synchronize `src/components/REGISTRY.md` with actual components.

---

### ARCH-14: Technical SEO Canonical Inheritance Inconsistencies & Robot Directive Gaps

- **Category**: Technical SEO Resilience
- **Severity**: **Low**
- **Exact Location**:
  - `src/app/layout.tsx:36-38`
  - `src/app/(public)/confirmacion-pedido/page.tsx:11-18`
  - `src/app/(public)/cuenta/page.tsx:4-8`
  - `src/app/(public)/mantenimiento/page.tsx:5-10`
  - `src/app/robots.ts:13-22`
- **Diagnosis and Failure Scenario**:
  `src/app/layout.tsx:37` sets a default canonical URL `alternates: { canonical: siteConfig.url }`.
  In Next.js App Router, any route that omits `alternates` inherits the parent layout's canonical.
  In `confirmacion-pedido/page.tsx` and `cuenta/page.tsx`, `robots` is set to `noindex`, but `alternates` is omitted. These private user-specific pages emit a canonical tag pointing to `https://confeccionesliss.com` (the home page), which creates conflicting crawl signals in Google Search Console. Furthermore, `/confirmacion-pedido` and `/mantenimiento` are omitted from `robots.ts` disallow rules.
- **Exact Remediation Code**:
  In `src/app/(public)/confirmacion-pedido/page.tsx:11-18`:
  ```ts
  export const metadata: Metadata = {
    title: { absolute: PAGE_TITLE },
    description: PAGE_DESCRIPTION,
    alternates: { canonical: `${siteConfig.url}/confirmacion-pedido` },
    robots: {
      index: false,
      follow: false,
    },
  };
  ```
  In `src/app/(public)/cuenta/page.tsx:4-8`:
  ```ts
  export const metadata: Metadata = {
    title: "Cuenta | Confecciones Liss",
    description: "Accede a tu cuenta en Confecciones Liss.",
    alternates: { canonical: `${siteConfig.url}/cuenta` },
    robots: { index: false, follow: false },
  };
  ```
  In `src/app/robots.ts:13-22`:
  ```ts
  disallow: [
    "/cuenta",
    "/login",
    "/confirmacion-pedido",
    "/mantenimiento",
    "/api/",
    "/_next/",
    "/carrito",
    "/admin",
    "/sandbox",
    ...(isBlogDisabled ? ["/blog", "/blog/"] : []),
  ],
  ```

---

## 4. Prioritized Action Plan

To stabilize and harden the Confecciones Liss codebase without breaking existing functionality or pixel styling:

1. **Phase 1 — Emergency Resilience & Security Hardening (Immediate)**:
   - Implement `src/app/global-error.tsx` to prevent root layout 500 white-screens.
   - Secure `src/actions/categories.ts` and `src/actions/catalog.ts` with admin session verification.
   - Wrap all Server Actions with `next-safe-action` (`src/lib/safe-action.ts`).
   - Fix silent `catch {}` blocks in `src/actions/contact.ts` to log audit events via `logger`.

2. **Phase 2 — Concurrency & Memory Leak Remediation**:
   - Add `isCancelled` flags and `AbortController` cancellation signals to `SearchModal.tsx`, `admin/products/page.tsx`, and `admin/messages/page.tsx`.
   - Fix the asynchronous cleanup race conditions in `AuthContext.tsx` and `NotificationContext.tsx`.

3. **Phase 3 — Dead Code Purge & Bundle Optimization**:
   - Remove phantom Lit imports (`@aejkatappaja/phantom-ui`) from all 40+ `loading.tsx` skeletons and delete `src/phantom-ui.d.ts`.
   - Remove unused production dependencies (`groq-sdk`, `@base-ui/react`, `class-variance-authority`, `client-only`, `server-only`).
   - Delete orphaned dead files `PerfilDetalleClient.tsx` and `mediaKit.ts`.

4. **Phase 4 — Type Safety & Architecture Harmonization**:
   - Generate Supabase TypeScript definitions (`src/types/database.types.ts`) and eliminate untyped `any` / double assertions in `catalogService.ts` and `productUtils.ts`.
   - Define dedicated Zod schemas in `src/schemas/` for `DeliveryFormModal` and `ProductModal`.
   - Extract raw `<svg>` elements from `LoginModal.tsx`, `Footer.tsx`, and `HeroImageCarousel.tsx` into modular icon components.
   - Correct `src/components/REGISTRY.md` to reflect actual components in the codebase.

5. **Phase 5 — SEO & Canonical Hygiene**:
   - Add explicit canonical tags to `confirmacion-pedido` and `cuenta`.
   - Update `robots.ts` disallow rules.

---

## 5. Verification Method

To verify these findings independently without modifying repository code:

1. **Error Boundaries & Root Crash Verification**:
   Inspect `src/app/` to verify absence of `global-error.tsx`:
   `Test-Path src/app/global-error.tsx` (returns `False`).
2. **Server Action Safe-Action Verification**:
   Search `src/actions/` for `next-safe-action`:
   `Select-String -Path src/actions/*.ts -Pattern "next-safe-action"` (returns 0 matches).
3. **Empty Catch & Console Log Verification**:
   Search for empty catch blocks:
   `Select-String -Path src/actions/contact.ts -Pattern "catch\s*\{\}"` (matches lines 61 and 115).
   Search for unmanaged console calls:
   `Select-String -Path src/actions/*.ts -Pattern "console\.(log|warn|error)"` (matches catalog.ts:65, contact.ts:101, featuredProducts.ts:136).
4. **Phantom UI Skeleton Verification**:
   Search for phantom imports across loading files:
   `Select-String -Path src/app/**/loading.tsx -Pattern "@aejkatappaja/phantom-ui"` (matches 40+ files).
5. **Ghost Components in Registry Verification**:
   Verify non-existence of components documented in `src/components/REGISTRY.md`:
   `Test-Path src/components/ui/Badge.tsx, src/components/ui/CategoryChip.tsx, src/components/ui/ProductCard.tsx` (all return `False`).
