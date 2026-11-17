# Surface Mapping & Zero-Trust Codebase Cartography Report

**Project:** Confecciones Liss  
**Auditor Archetype:** Teamwork Explorer / Surface Mapper  
**Target:** Full repository surface inspection (passive audit, zero code execution, zero modifications)  
**Date:** 2026-11-07  
**Working Directory:** `c:\Users\usuar\Desktop\confecciones liss\.agents\teamwork\explorer_surface\`

---

## 1. Observation

### 1.1 Complete Codebase Inventory & Directory Architecture

The repository contains **813 tracked files** in Git. Active branch is `master`. A local `main` branch also exists.

```
c:\Users\usuar\Desktop\confecciones liss\
├── .agents/                        # AI skills, rules, agent configurations (107 files)
│   ├── AGENTS.md                   # Git master-only & design/security preservation directives
│   └── skills/                     # 17 local skills (ant, brandkit, design-taste, etc.)
├── .backup/                        # AI Chat System backup code (23 files)
│   └── ai-chat-system/             # Complete decommissioned Lucas AI chat system
├── .github/
│   └── workflows/ci.yml            # GitHub Actions CI pipeline (targets "main"!)
├── .husky/                         # Git hooks (pre-commit -> lint-staged, commit-msg -> commitlint)
├── error-logs/                     # 5 Vercel error log markdown files
├── HUB/                            # 3 prototype files (code.html, screen.png, DESIGN.md)
├── OG/                             # 6 OpenGraph prototype images/specifications
├── logos/                          # 7 vector/raster branding assets
├── nosotros/                       # 3 prototype files (code.html, screen.png, DESIGN.md)
├── public/                         # 194 static public assets (images, fonts, icons, sw.js, llms.txt)
├── scratch/                        # 26 ad-hoc scripts, debug JSONs, trace logs, conversion files
├── scripts/                        # 4 utility/migration scripts (pagespeed, migrate-prices, logo)
├── seo-audit-and-data/             # 8 GSC and ranking CSV exports
├── servicios/                      # 15 prototype files for 5 service sub-pages
├── src/                            # 319 core application source files
│   ├── actions/                    # 4 Server Actions
│   ├── app/                        # Next.js App Router (56 routes/pages, layouts, API handlers)
│   ├── components/                 # 85 React components across 12 domains + REGISTRY.md
│   ├── config/                     # 3 site & catalog configuration files
│   ├── context/                    # 5 React Context providers
│   ├── data/                       # 7 static data dictionaries (categories, blog, team, services)
│   ├── hooks/                      # 5 custom hooks
│   ├── lib/                        # 19 utility libraries, clients, schemas, helpers
│   ├── mocks/                      # 1 MSW handlers file
│   ├── providers/                  # 3 provider wrappers (Theme, React Query, Deferred)
│   ├── schemas/                    # 2 Zod schemas (contact, review)
│   └── types/                      # 2 ambient type definitions
├── supabase/                       # 1 Edge Function + 14 SQL migration files
├── updates/                        # 6 historical audit & feature markdown reports
└── Root configuration & metadata:
    ├── package.json, package-lock.json
    ├── tsconfig.json, next.config.mjs, vercel.json, postcss.config.mjs
    ├── vitest.config.ts, vitest.setup.ts, knip.json, eslint.config.mjs, commitlint.config.mjs
    ├── components.json, AGENTS.md, ARCHITECTURE.md, README.md
    ├── .gitignore, .prettierrc, .prettierignore
    └── 19 loose root policy & architecture text files (Politica_*.txt, etc.)
```

---

### 1.2 Inventory of Next.js Routes, APIs, and Middleware

#### Middleware / Proxy (`src/proxy.ts`)

- **File:** `src/proxy.ts` (Next.js 16 proxy convention).
- **Responsibilities:**
  - Database killswitch check via Supabase RPC `get_killswitch_public` (30s in-memory TTL; fails open).
  - Single Page Mode check (`NEXT_PUBLIC_HOME_ONLY === "true"`).
  - Production Blog gate (`NEXT_PUBLIC_ENABLE_BLOG !== "true"` returns HTTP 404 rewrite).
  - Admin Server-side Session & Role Protection: inspects `/admin` routes via `supabase.auth.getUser()`, validates `user.app_metadata.role === 'admin'`.
- **Matcher:** Excludes static extensions and `/api/*` (`(?!api|_next/static|_next/image|...)`).

#### API Routes (`src/app/api/` & `src/app/auth/`)

| Route             | Method | File                              | Purpose                       | Security / Auth                                                                                              |
| ----------------- | ------ | --------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/api/csp-report` | `POST` | `src/app/api/csp-report/route.ts` | CSP violation report receiver | Unauthenticated; in-memory IP rate limit (10/min); inserts directly to `security_events` table via anon key. |
| `/api/revalidate` | `GET`  | `src/app/api/revalidate/route.ts` | On-demand ISR CDN cache purge | Protected by query param `secret === env.REVALIDATE_SECRET`. `force-dynamic`.                                |
| `/auth/callback`  | `GET`  | `src/app/auth/callback/route.ts`  | Supabase OAuth code exchange  | Exchanges OAuth code for session cookies; role-based redirection.                                            |

#### App Router Pages & Layouts (`src/app/`)

| Route                                        | File Path                                                             | Rendering Mode                                       | Auth / Role             | Notes                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| `/`                                          | `src/app/(public)/page.tsx`                                           | SSG / ISR (`revalidate = 3600`)                      | Public                  | LCP preloaded hero image, JSON-LD schemas.                                               |
| `/ayuda`                                     | `src/app/(public)/ayuda/page.tsx`                                     | SSG (Static)                                         | Public                  | Help center accordion and FAQ categories.                                                |
| `/blog`                                      | `src/app/(public)/blog/page.tsx`                                      | SSG (Static)                                         | Public (Gate in proxy)  | Returns 404 in production if `NEXT_PUBLIC_ENABLE_BLOG !== 'true'`.                       |
| `/catalogo`                                  | `src/app/(public)/catalogo/page.tsx`                                  | SSG (`revalidate = false`)                           | Public                  | Master catalog listing.                                                                  |
| `/catalogo/[sector]`                         | `src/app/(public)/catalogo/[sector]/page.tsx`                         | SSG (`generateStaticParams`)                         | Public                  | Sector-specific listings (`scrubs`, `escolar`, `corporativo`, `accesorios`, `bordados`). |
| `/catalogo/[sector]/[id]`                    | `src/app/(public)/catalogo/[sector]/[id]/page.tsx`                    | SSG (`generateStaticParams`, `dynamicParams = true`) | Public                  | Product detail view (`id` is actually product slug).                                     |
| `/catalogo/universidades`                    | `src/app/(public)/catalogo/universidades/page.tsx`                    | Client Component in SSG Layout                       | Public                  | Interactive university hub bento grid.                                                   |
| `/catalogo/universidades/[universidad]`      | `src/app/(public)/catalogo/universidades/[universidad]/page.tsx`      | SSG (`generateStaticParams`)                         | Public                  | University specific catalog (`univo`, `ieproes`, `ugb`, `unab`, `ues`, `uma`).           |
| `/catalogo/universidades/[universidad]/[id]` | `src/app/(public)/catalogo/universidades/[universidad]/[id]/page.tsx` | SSG (`generateStaticParams`, `dynamicParams = true`) | Public                  | University product detail view.                                                          |
| `/confirmacion-pedido`                       | `src/app/(public)/confirmacion-pedido/page.tsx`                       | SSR (`revalidate = 0`)                               | Public                  | Order confirmation screen reading `sessionStorage`.                                      |
| `/contacto`                                  | `src/app/(public)/contacto/page.tsx`                                  | SSG (`revalidate = 3600`)                            | Public                  | Contact form and lazy-loaded map.                                                        |
| `/cuenta`                                    | `src/app/(public)/cuenta/page.tsx`                                    | Client Component in SSG shell                        | Public / Authenticated  | User profile, cart review, admin link.                                                   |
| `/empresa`                                   | `src/app/(public)/empresa/page.tsx`                                   | SSG (Static)                                         | Public                  | Company hub landing page.                                                                |
| `/empresa/calidad`                           | `src/app/(public)/empresa/calidad/page.tsx`                           | SSG (Static)                                         | Public                  | Quality assurance presentation.                                                          |
| `/empresa/certificaciones`                   | `src/app/(public)/empresa/certificaciones/page.tsx`                   | SSG (Static)                                         | Public                  | Certifications showcase.                                                                 |
| `/empresa/equipo`                            | `src/app/(public)/empresa/equipo/page.tsx`                            | SSG (Static)                                         | Public                  | Team directory and artisan profiles.                                                     |
| `/empresa/filosofia`                         | `src/app/(public)/empresa/filosofia/page.tsx`                         | SSG (Static)                                         | Public                  | Editorial manifesto.                                                                     |
| `/empresa/instalaciones`                     | `src/app/(public)/empresa/instalaciones/page.tsx`                     | SSG (Static)                                         | Public                  | Workshop tour.                                                                           |
| `/empresa/media-kit`                         | `src/app/(public)/empresa/media-kit/page.tsx`                         | SSG (Static)                                         | Public                  | Press resources and brand assets.                                                        |
| `/empresa/proceso-de-confeccion`             | `src/app/(public)/empresa/proceso-de-confeccion/page.tsx`             | SSG (Static)                                         | Public                  | Step-by-step manufacturing process.                                                      |
| `/empresa/responsabilidad-social`            | `src/app/(public)/empresa/responsabilidad-social/page.tsx`            | SSG (Static)                                         | Public                  | Social responsibility initiatives.                                                       |
| `/empresa/sobre-nosotros`                    | `src/app/(public)/empresa/sobre-nosotros/page.tsx`                    | SSG (Static)                                         | Public                  | Company history since 2005.                                                              |
| `/empresa/transparencia`                     | `src/app/(public)/empresa/transparencia/page.tsx`                     | SSG (Static)                                         | Public                  | Transparency and pricing breakdown.                                                      |
| `/legal`                                     | `src/app/(public)/legal/page.tsx`                                     | SSG (Static)                                         | Public                  | Legal policies portal.                                                                   |
| `/legal/[subpage]` (21 routes)               | `src/app/(public)/legal/*/page.tsx`                                   | SSG (Static)                                         | Public                  | 21 individual policy pages with dedicated OpenGraph generators.                          |
| `/links`                                     | `src/app/(public)/links/page.tsx`                                     | SSG (Static)                                         | Public                  | Linktree-style mobile quick links.                                                       |
| `/mantenimiento`                             | `src/app/(public)/mantenimiento/page.tsx`                             | SSG (Static)                                         | Public                  | Maintenance landing page (killswitch target).                                            |
| `/servicios`                                 | `src/app/(public)/servicios/page.tsx`                                 | SSG (Static)                                         | Public                  | Services hub.                                                                            |
| `/servicios/[slug]`                          | `src/app/(public)/servicios/[slug]/page.tsx`                          | SSG (`generateStaticParams`)                         | Public                  | 5 service detail pages.                                                                  |
| `/test-cache`                                | `src/app/(public)/test-cache/page.tsx`                                | SSR (`dynamic = "force-dynamic"`)                    | Public (UNPROTECTED)    | **SECURITY/ARCHITECTURE RISK:** Debug page dumping database IDs, names, and timestamps.  |
| `/updates`                                   | `src/app/(public)/updates/page.tsx`                                   | SSG (Static)                                         | Public                  | Public changelog.                                                                        |
| `/sandbox`                                   | `src/app/(dev)/sandbox/page.tsx`                                      | Client Component                                     | Public (UNPROTECTED)    | **SECURITY RISK:** Contains interactive Supabase update routines (`handleMigrate`).      |
| `/admin`                                     | `src/app/(admin)/admin/page.tsx`                                      | Client Component                                     | Admin (Proxy protected) | Analytics dashboard.                                                                     |
| `/admin/categories`                          | `src/app/(admin)/admin/categories/page.tsx`                           | Client Component                                     | Admin (Proxy protected) | Categories CRUD.                                                                         |
| `/admin/login`                               | `src/app/(admin)/admin/login/page.tsx`                                | Client Component                                     | Admin                   | Admin OAuth and credentials login.                                                       |
| `/admin/messages`                            | `src/app/(admin)/admin/messages/page.tsx`                             | Client Component                                     | Admin (Proxy protected) | Contact message inbox.                                                                   |
| `/admin/notificaciones`                      | `src/app/(admin)/admin/notificaciones/page.tsx`                       | Client Component                                     | Admin (Proxy protected) | Web Push broadcast manager.                                                              |
| `/admin/products`                            | `src/app/(admin)/admin/products/page.tsx`                             | Client Component                                     | Admin (Proxy protected) | Product inventory manager.                                                               |
| `/admin/settings`                            | `src/app/(admin)/admin/settings/page.tsx`                             | Client Component                                     | Admin (Proxy protected) | Security settings & killswitch toggle.                                                   |
| `/admin/usuarios`                            | `src/app/(admin)/admin/usuarios/page.tsx`                             | Client Component                                     | Admin (Proxy protected) | User and role management.                                                                |

---

### 1.3 Inventory of Server Actions (`src/actions/`)

All Server Actions reside in `src/actions/`:

1. **`src/actions/catalog.ts`**:
   - Function: `revalidateAfterProductSave({ sector, slug, category })`
   - Purpose: Purges Full Route Cache for affected catalog paths after product creation/update.
   - Authentication: Checks Supabase cookie session and `user.app_metadata.role === 'admin'`.
   - Wrapping: **Does NOT use `next-safe-action`** (plain async function).
   - Validation: TypeScript interface; no runtime Zod validation.

2. **`src/actions/categories.ts`**:
   - Function: `revalidateAfterCategorySave()`
   - Purpose: Inundates `revalidatePath` across all category, sector, and university routes.
   - Authentication: **ZERO AUTHENTICATION CHECK.** Can be invoked by any anonymous client or script.
   - Wrapping: **Does NOT use `next-safe-action`**.
   - Validation: None.

3. **`src/actions/contact.ts`**:
   - Function: `sendContactMessage(data: ContactFormData)`
   - Purpose: Validates contact submission and inserts into `contact_messages` table.
   - Wrapping: **Does NOT use `next-safe-action`**.
   - Validation: Uses Zod `contactSchema.safeParse(data)`.
   - Security issues:
     - Rate limiter uses in-memory `Map<string, ...>` (`messageSubmissions`), which is ineffective in serverless Vercel lambdas.
     - Rate limit identifier is the user-supplied `email`, allowing trivial bypass by submitting different emails.
     - Direct access to `process.env.SUPABASE_SERVICE_ROLE_KEY` (line 45), bypassing `src/env.ts`.

4. **`src/actions/featuredProducts.ts`**:
   - Function: `toggleFeaturedProduct(productId: string, currentValue: boolean)`
   - Purpose: Toggles `is_featured` flag on products for homepage showcase (max 10 limit).
   - Authentication: Checks Supabase cookie session and `user.app_metadata.role === 'admin'`.
   - Wrapping: **Does NOT use `next-safe-action`**.
   - Validation: Primitive argument checks; no Zod schema.

---

### 1.4 Component Architecture Inventory (`src/components/`)

A total of **85 components** organized into 12 functional domains:

1. **`layout/` (7 components):**
   - `Navbar.tsx`: Sticky primary desktop & mobile navigation header with search triggers and cart counters.
   - `MobileBottomNav.tsx`: Bottom navigation with concave notch animation and 5 tabs.
   - `Footer.tsx`: Comprehensive footer with contact NAP, social links, legal directory.
   - `GlobalModals.tsx`: Singleton mounting wrapper for `CartDrawer` and `LoginModal`.
   - `MaterialSymbolsLoader.tsx`: Deprecated stub component returning `null`.
   - `ScrollToTop.tsx`: Floating smooth-scroll button.
   - `SearchModal.tsx`: Real-time modal product search.
2. **`ui/` (9 components):**
   - `icons/Icon.tsx`: Universal SVG inline icon component mapping 100+ Material Symbols icon names to `lucide-react`.
   - `Breadcrumb.tsx`: Accessible breadcrumb with WCAG contrast variants.
   - `CookieBanner.tsx`: GDPR/LGPD consent banner with 4-second delayed mounting.
   - `CustomSelect.tsx`: Accessible custom dropdown selector.
   - `GuestBell.tsx`: Push notification subscription prompt for guest users.
   - `HeroImageCarousel.tsx`: Homepage hero image cross-fade carousel.
   - `OffersReadTracker.tsx`: Client-side beacon recording offer views in `sessionStorage`.
   - `ShareButton.tsx`: Web Share API with clipboard fallback.
   - `StaticHeroImage.tsx`: High-performance LCP hero image with `ReactDOM.preload`.
3. **`catalogo/` (9 components):**
   - `CatalogPageClient.tsx`: Master catalog filter, sort, pagination orchestrator.
   - `CatalogProductCard.tsx`: Product card with image, badges, pricing, and WhatsApp trigger.
   - `CategoryHubClient.tsx`: Interactive category navigation tiles.
   - `FilterSidebar.tsx`: Desktop sticky facet filter sidebar.
   - `MobileFilterDrawer.tsx`: Mobile slide-out facet filter drawer with scroll lock.
   - `ProductDetailClient.tsx`: Split-screen product detail layout with size selector and dynamic buy box.
   - `ProductReviews.tsx`: Customer review submission form and verified review listing.
   - `UnabWarningModal.tsx`: Mandatory legal modal warning on UNAB university routes.
   - `UniversityHubClient.tsx`: Interactive university selector bento grid.
4. **`cart/` (4 components):**
   - `CartDrawer.tsx`: Multi-step checkout drawer (cart review, department/municipality selector, delivery details, WhatsApp order dispatcher).
   - `DeliveryFormModal.tsx`: Extended recipient name, phone, address, and delivery notes form.
   - `FavoritesModal.tsx`: Saved wishlist drawer.
   - `LoginModal.tsx`: Contextual Google OAuth login modal.
5. **`admin/` (13 components):**
   - `Sidebar.tsx`, `AdminFooterBar.tsx`, `ConfirmDialog.tsx`, `ImageUploader.tsx`, `MessageCard.tsx`, `ProductModal.tsx` (2,063 lines), `ProductTable.tsx`, `RecentMessages.tsx`, `RecentProducts.tsx`, `StatDetailModal.tsx`, `StatsCards.tsx`, `TopFavorites.tsx`, `CategoryChart.tsx`.
6. **`empresa/` (11 components):**
   - `SobreNosotrosClient.tsx`, `FilosofiaClient.tsx`, `EquipoClient.tsx`, `InstalacionesClient.tsx`, `ProcesoDeConfeccionClient.tsx`, `CalidadClient.tsx`, `CertificacionesClient.tsx`, `ResponsabilidadSocialClient.tsx`, `TransparenciaClient.tsx`, `MediaKitClient.tsx`, `TextilePatternCanvas.tsx`, `PerfilDetalleClient.tsx`.
7. **`legal/` (4 components):**
   - `LegalArticleReader.tsx`, `LegalContent.tsx`, `LegalHubBackground.tsx`, `LegalHubClient.tsx`.
8. **`contacto/` (2 components):**
   - `ContactForm.tsx`, `LazyMap.tsx`.
9. **`seo/` (8 components):**
   - `CoberturaNacional.tsx`, `FaqSection.tsx`, `GoogleReviews.tsx`, `KeywordsSeoFooter.tsx`, `NapContacto.tsx`, `ProfesionesMedicas.tsx`, `ServiciosPrincipales.tsx`, `UniversidadesCoverage.tsx`.
10. **`servicios/` (10 components):**
    - `ServicioDetallePage.tsx`, `ServicioHero.tsx`, `ServicioCTABanner.tsx`, `ServicioFAQ.tsx`, `ServicioBordadosDetalle.tsx`, `ServicioSublimacionDetalle.tsx`, `ServicioSastreriaDetalle.tsx`, `ServicioManoObraDetalle.tsx`, `ServicioRopaCasualDetalle.tsx`, `ServicioDetalleGeneric.tsx`.
11. **`blog/` (4 components):**
    - `BlogIndexClient.tsx`, `BlogCard.tsx`, `BlogEmptyState.tsx`, `BlogWhatsAppCTA.tsx`.
12. **`analytics/` (5 components):**
    - `AnalyticsScripts.tsx`, `GoogleAnalytics.tsx`, `MetaPixel.tsx`, `GoogleMerchantWidget.tsx`, `GoogleCustomerReviewsOptIn.tsx`.

---

### 1.5 Hooks, State Contexts, Libs, Config, Data & Mocks

#### Custom Hooks (`src/hooks/` - 5 files)

- `useBodyScrollLock.ts`: Traps body scrolling when modals/drawers open.
- `useCategories.ts`: Fetches and caches categories from Supabase via React Query.
- `useDebounce.ts`: Value debouncing for live search inputs.
- `useMarkOffersRead.ts`: Tracks unread offer notifications.
- `useModal.ts`: Accessible keyboard escape and click-outside state.

#### Contexts & State Management (`src/context/` - 5 files)

- `AuthContext.tsx`: Supabase authentication, profile caching in `sessionStorage`, JWT role validation, contextual auth modals.
- `CartContext.tsx`: 717-line guest-first cart store persisting to `localStorage`, syncing with Supabase `user_carts`, 60-second price staleness checks, cross-tab synchronization.
- `ConfirmContext.tsx`: Imperative confirmation dialogs.
- `FavoritesContext.tsx`: Wishlist state synchronized with `localStorage` and Supabase `user_favorites`.
- `NotificationContext.tsx`: Web Push notification registration, service worker subscription, unread offer counts.
  _Observation:_ **All 5 stores are React Contexts (`createContext`). Zustand is completely unused in `src/`.**

#### Providers (`src/providers/` - 3 files)

- `index.tsx`: Two-tier provider pipeline. Tier 1 mounts `QueryClientProvider` and `ThemeProvider` immediately. Tier 2 defers heavier providers via `requestIdleCallback` (fallback 200ms) to safeguard LCP.
- `DeferredProviders.tsx`: Lazy bundle containing `AuthProvider`, `NotificationProvider`, `CartProvider`, `FavoritesProvider`, `ConfirmProvider`, and `react-hot-toast` `Toaster`.
- `theme-provider.tsx`: `next-themes` wrapper.

#### Utility Libraries (`src/lib/` - 19 files)

- `catalogService.ts`: RSC database query service for products and categories.
- `clientEnv.ts`: Safe client copy of `NEXT_PUBLIC_*` environment variables.
- `constants.ts`: Global pagination, cart limits, cache TTLs, and storage keys.
- `formatPrice.ts`: Standardized USD currency formatting.
- `googleReviewsService.ts`: Cached Google Reviews fetcher.
- `legalOgHelper.tsx`: Dynamic OpenGraph PNG image generator for legal policies.
- `logger.ts`: Conditional logger silencing console statements in production.
- `productShared.ts`: Shared product normalization functions (images, sector, university).
- `productUtils.ts`: Legacy price and slug utilities.
- `reviewsService.ts`: Product reviews CRUD and rating calculations.
- `sanitize.ts`: URL and input sanitizer blocking `javascript:`, `data:`, and unauthorized protocols.
- `schemas.ts`: JSON-LD Schema.org structured data builders (`WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, etc.).
- `shipping.ts`: El Salvador departments and shipping rate definitions.
- `slug.ts`: Deterministic ASCII slug generator.
- `storageUtils.ts`: Supabase Storage public URL builders.
- `supabaseClient.ts`: Client-side Supabase browser client singleton.
- `utils.ts`: `cn()` utility combining `clsx` and `tailwind-merge`.
- `whatsapp.ts`: WhatsApp URL and order message encoder.

#### Data & Config (`src/data/` & `src/config/` - 10 files)

- Config: `site.ts` (SEO metadata, URLs, coordinates, phone), `catalogs.ts` (sector definitions), `mediaKit.ts` (brand assets).
- Data: `categories.ts`, `services.ts`, `blog-posts.ts`, `team.ts`, `ayuda.ts`, `changelog.ts`, `types.ts`.

#### Schemas (`src/schemas/` - 2 files)

- `contactSchema.ts`: Zod validation for contact form submissions.
- `reviewSchema.ts`: Zod validation for product reviews.

#### Mocks (`src/mocks/` - 1 file)

- `handlers.ts`: Contains empty `export const handlers = [];`.
- _Observation:_ No Mock Service Worker browser setup (`public/mockServiceWorker.js` is missing).

---

### 1.6 Tooling, Dependencies & Infrastructure Audit

#### Automated Testing Infrastructure

- `package.json` line 12: `"test": "vitest run --passWithNoTests"`.
- Config files: `vitest.config.ts`, `vitest.setup.ts`.
- **Finding:** **ZERO test files exist in the entire repository.** There are no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `__tests__/` directories. Testing infrastructure is 100% cosmetic and bypassed with `--passWithNoTests`.
- No Playwright or Cypress E2E test setup exists.

#### CI/CD Pipeline (`.github/workflows/ci.yml`)

- Lines 4-7:
  ```yaml
  on:
    push:
      branches: ["main"]
    pull_request:
      branches: ["main"]
  ```
- **Finding:** The CI workflow triggers strictly on `main`. However, `.agents/AGENTS.md` explicitly states:  
  _"Rama de Producción/Despliegue Obligatoria: La única rama válida para commits, fusiones y despliegues en este repositorio es master. Prohibición de main: Está estrictamente prohibido realizar commits directos o push a la rama main..."_  
  Because all development occurs on `master`, **the CI pipeline NEVER executes on pushes or PRs.**

#### Unused Dependencies Installed in `package.json`

The following packages are installed in `package.json` dependencies/devDependencies but have zero imports across `src/`:

1. `zustand: ^5.0.12`: Installed for global state; 0 imports in `src/`.
2. `next-safe-action: ^8.4.0`: Mandated by `AGENTS.md`; 0 imports in `src/`.
3. `@base-ui/react: ^1.3.0`: 0 imports in `src/`.
4. `class-variance-authority: ^0.7.1`: 0 imports in `src/`.
5. `server-only: ^0.0.1`: 0 imports in `src/`.
6. `client-only: ^0.0.1`: 0 imports in `src/`.
7. `groq-sdk: ^1.4.0`: Decommissioned chat system; 0 imports in `src/`.
8. `sharp: ^0.35.3`: Installed under `devDependencies` instead of `dependencies`, risking image optimization failures in runtime environments where devDependencies are pruned.

#### Dead Code Bloat: `@aejkatappaja/phantom-ui`

- `package.json` line 18: `@aejkatappaja/phantom-ui: ^1.3.0`.
- **56 different `loading.tsx` files** across the codebase contain:
  ```tsx
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);
  ```
- **None of these 56 files ever renders `<phantom-ui>`.** All 56 files render an internal `Shimmer` div with Tailwind's `animate-pulse`.
- This unneeded import forces Lit / `@lit/reactive-element` into dynamic chunks and necessitated complex Turbopack alias workarounds in `next.config.mjs` lines 19–36 to suppress "Lit is in dev mode" warnings.

#### Static Asset Bloat (`public/`)

Multiple uncompressed, full-resolution camera and raw assets reside in `public/`:

- `public/images/calidad/revision-de-costuras.jpg`: **13.6 MB**
- `public/images/proceso/confeccion.jpg`: **9.4 MB**
- `public/images/transparencia/imagen-lateral.png`: **8.8 MB**
- `public/images/servicios/ropa-general/Ropa infantil.png`: **8.0 MB**
- `public/images/empresa-hero.png`: **7.9 MB**
- `public/images/proceso/hero.jpg`: **7.1 MB**
- `public/images/servicios/bordados-personalizados/bordado sublimación o estampado.png`: **7.1 MB**
- `public/images/servicios/mano-de-obra/cuanta tela necesito.png`: **7.0 MB**
- Total public images exceed 100 MB of unoptimized raw files.

---

### 1.7 Environment Variables Audit Table

| Variable                         | In `.env.example` | In `src/env.ts` | In `src/lib/clientEnv.ts` | Used in Code                                                               | Severity / Issue                                                         |
| -------------------------------- | :---------------: | :-------------: | :-----------------------: | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `NODE_ENV`                       |        ❌         |       ✅        |            ❌             | `src/proxy.ts`, `next.config.mjs`, `src/lib/logger.ts`                     | OK                                                                       |
| `NEXT_PUBLIC_SUPABASE_URL`       |        ✅         |       ✅        |            ✅             | `src/lib/supabaseClient.ts`, `src/proxy.ts`, `src/lib/catalogService.ts`   | OK                                                                       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  |        ✅         |       ✅        |            ✅             | `src/lib/supabaseClient.ts`, `src/proxy.ts`, `src/lib/catalogService.ts`   | **Insecure fallback:** default is `"placeholder_key"`                    |
| `SUPABASE_SERVICE_ROLE_KEY`      |    ✅ (line 8)    | ❌ **MISSING**  |            ❌             | `src/actions/contact.ts:45`, `scripts/migrate-prices.mjs:24`               | **Critical:** Used via raw `process.env`, bypassing Zod validation       |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`   |        ✅         |       ✅        |            ✅             | `src/context/AuthContext.tsx`                                              | OK                                                                       |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    |        ✅         |       ✅        |            ✅             | `src/lib/whatsapp.ts`, `src/lib/clientEnv.ts`                              | OK                                                                       |
| `NEXT_PUBLIC_CONTACT_EMAIL`      |        ✅         |       ✅        |            ✅             | `src/config/site.ts`                                                       | OK                                                                       |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` |        ✅         |  ✅ (optional)  |            ✅             | Declared; Turnstile widget not implemented                                 | Low                                                                      |
| `NEXT_PUBLIC_SITE_URL`           |        ✅         |       ✅        |            ✅             | `src/proxy.ts`, `src/app/auth/callback/route.ts`                           | Insecure default `"http://localhost:3000"`                               |
| `NEXT_PUBLIC_HOME_ONLY`          |        ✅         |       ✅        |            ✅             | `src/proxy.ts`, `src/app/sitemap.ts`                                       | OK                                                                       |
| `NEXT_PUBLIC_ENABLE_BLOG`        |  ❌ **MISSING**   |       ✅        |            ✅             | `src/proxy.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`                  | Missing from `.env.example`                                              |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY`   |        ✅         |       ✅        |            ✅             | `src/context/NotificationContext.tsx`                                      | Insecure default `"placeholder_vapid"`                                   |
| `VAPID_PRIVATE_KEY`              |        ✅         |       ✅        |            ❌             | `supabase/functions/send-push/index.ts`                                    | **High:** Insecure default `"placeholder_vapid_private"`                 |
| `VAPID_SUBJECT`                  |        ✅         |       ✅        |            ❌             | Web Push                                                                   | OK                                                                       |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  |        ✅         |  ✅ (optional)  |            ✅             | `src/components/analytics/AnalyticsScripts.tsx`                            | OK                                                                       |
| `NEXT_PUBLIC_META_PIXEL_ID`      |        ✅         |  ✅ (optional)  |            ✅             | `src/components/analytics/AnalyticsScripts.tsx`                            | OK                                                                       |
| `NEXT_PUBLIC_GOOGLE_MERCHANT_ID` |  ❌ **MISSING**   |  ✅ (default)   |      ❌ **MISSING**       | `src/components/analytics/AnalyticsScripts.tsx:49` (hardcoded 5773588467!) | Discrepancy: hardcoded in component, missing in clientEnv                |
| `REVALIDATE_SECRET`              |        ✅         |       ✅        |            ❌             | `src/app/api/revalidate/route.ts:11`                                       | **High:** Insecure default `"dev_revalidate_secret_local"` in production |
| `PAGESPEED_API_KEY`              |        ✅         |  ✅ (optional)  |            ❌             | `scripts/pagespeed-audit.mjs`                                              | OK                                                                       |
| `GROQ_API_KEY`                   |   ✅ (line 45)    | ❌ **MISSING**  |            ❌             | `.backup/ai-chat-system/`                                                  | Lingers in `.env.example`; unused in `src/`                              |

**Gitignore Defect:** `.gitignore` line 34 has `.env*`. This ignores `.env.example` from being committed to Git! The file only exists locally and is not tracked.

---

### 1.8 Compliance Audit with AGENTS.md and .agents/AGENTS.md

| Rule / Requirement                                        | Mandate in Documentation                                                                               | Codebase Reality                                                                                                                                                                                                                  | Status            |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **Prototypes Location** (`AGENTS.md` R1 & R2)             | Designs must reside in `prototypes/`. Represent final design.                                          | `prototypes/` does NOT exist. Designs are scattered in root folders (`HUB/`, `nosotros/`, `servicios/`, `scratch/`).                                                                                                              | **VIOLATION**     |
| **Sandbox Testing** (`AGENTS.md` R3)                      | All components must be tested in `/sandbox` prior to integration.                                      | `/sandbox` exists at `src/app/(dev)/sandbox/page.tsx`, but is publicly exposed in production and contains interactive database migration routines (`handleMigrate` updating product records).                                     | **RISK / DEFECT** |
| **Strict Architecture** (`AGENTS.md` R6)                  | `src/context/` is strictly for Zustand global stores. `src/providers/` is for React context providers. | `src/context/` contains 5 React Contexts (`AuthContext`, `CartContext`, etc.). Zustand has 0 usages across the repo.                                                                                                              | **VIOLATION**     |
| **Server Actions Standard** (`AGENTS.md` R9)              | Every Server Action must be in `src/actions/` and wrapped with `next-safe-action`.                     | All 4 actions (`catalog.ts`, `categories.ts`, `contact.ts`, `featuredProducts.ts`) are plain async functions without `next-safe-action`.                                                                                          | **VIOLATION**     |
| **Input Validation Standard** (`AGENTS.md` R9)            | Action arguments must be validated with Zod schemas in `src/schemas/`.                                 | `catalog.ts`, `categories.ts`, and `featuredProducts.ts` do not use Zod schemas. Only `contact.ts` uses Zod.                                                                                                                      | **VIOLATION**     |
| **Color Variable Tokens** (`AGENTS.md` R10)               | Extract all colors into HSL CSS variables in `globals.css`.                                            | `src/app/globals.css` defines hex tokens (`#143067`, etc.) in `@theme inline`, not HSL variables.                                                                                                                                 | **INCONSISTENCY** |
| **Component Registry** (`AGENTS.md` R7)                   | Every new/refactored component must be documented in `src/components/REGISTRY.md`.                     | `REGISTRY.md` documents phantom components that do not exist: `src/components/ui/Badge.tsx`, `src/components/ui/CategoryChip.tsx`, `src/components/ui/ProductCard.tsx`. `WebMCPRegistration` is empty.                            | **DISCREPANCY**   |
| **Prohibition of SSR** (`ARCHITECTURE.md` ADR 2026-07-06) | Strict SSG only; zero usage of `force-dynamic` or dynamic SSR on public routes.                        | `src/app/(public)/test-cache/page.tsx` uses `export const dynamic = "force-dynamic"`. `src/app/(public)/confirmacion-pedido/page.tsx` uses `export const revalidate = 0`. `src/app/api/revalidate/route.ts` uses `force-dynamic`. | **VIOLATION**     |
| **Git Deployment Branch** (`.agents/AGENTS.md`)           | Mandatory branch for commits, PRs, and deployments is `master`. `main` is strictly prohibited.         | `.github/workflows/ci.yml` is configured to run on `main`, making the CI workflow permanently disabled on `master`.                                                                                                               | **VIOLATION**     |

---

## 2. Logic Chain

1. **Step 1 (Repository Inventory):** Listing all 813 tracked files via Git index and powershell queries revealed that alongside `src/` and `public/`, the repository root contains 11 auxiliary folders (`.backup/`, `HUB/`, `OG/`, `error-logs/`, `scratch/`, `servicios/`, `nosotros/`, etc.) and 19 markdown/txt documentation dumps.
2. **Step 2 (Configuration Analysis):** Comparing `package.json`, `tsconfig.json`, `next.config.mjs`, and `.github/workflows/ci.yml` revealed that while modern tools (Next.js 16, React 19, Tailwind v4, Vitest, Zod) are installed, several dependencies are completely unreferenced (`zustand`, `@base-ui/react`, `class-variance-authority`, `client-only`, `server-only`, `groq-sdk`), and the CI pipeline listens exclusively on `main` despite project rules prohibiting `main` in favor of `master`.
3. **Step 3 (Route & Security Topology):** Examining `src/proxy.ts` and `src/app/` demonstrated that while `/admin` is properly guarded via server-side Supabase JWT validation, `/sandbox` and `/test-cache` are exposed to public unauthenticated traffic. `/test-cache` executes dynamic database queries, and `/sandbox` contains database mutation scripts.
4. **Step 4 (Server Action Scrutiny):** Inspecting all 4 files in `src/actions/` proved that none employ `next-safe-action`, violating Rule 9 of `AGENTS.md`. Furthermore, `revalidateAfterCategorySave` lacks any authentication, and `sendContactMessage` uses an in-memory Map for rate limiting by email that is ineffective in serverless Vercel environments.
5. **Step 5 (Environment Consistency):** Cross-referencing `.env.example`, `src/env.ts`, `src/lib/clientEnv.ts`, and source code proved that `SUPABASE_SERVICE_ROLE_KEY` is consumed via raw `process.env` in `src/actions/contact.ts` without Zod schema validation, `.env.example` is ignored by Git, and sensitive fallback defaults exist in `src/env.ts`.
6. **Step 6 (Component & Registry Audit):** Cross-referencing `src/components/REGISTRY.md` against actual files on disk revealed stale documentation for non-existent UI components (`Badge.tsx`, `CategoryChip.tsx`, `ProductCard.tsx`), while 56 `loading.tsx` files import `@aejkatappaja/phantom-ui` via dynamic `import()` without ever rendering it.

---

## 3. Caveats

- No active penetration testing or live requests were executed, strictly adhering to the passive audit constraint.
- Database policies and RLS rules were inspected via the 14 SQL migration scripts in `supabase/migrations/` rather than live database introspection.
- `public/` assets were inspected for file size, dimensions, and naming conventions from the local file system without downloading live CDN representations.

---

## 4. Conclusion

The Confecciones Liss codebase exhibits strong individual architectural choices (Next.js 16 App Router, ISR on-demand revalidation, SVG inline icon centralization via `Icon.tsx`, two-tier provider deferral). However, the codebase suffers from **significant structural divergence from its governing rules (`AGENTS.md` and `.agents/AGENTS.md`)**, including:

1. Complete lack of automated testing (0 tests) and an inactive CI workflow due to branch mismatch (`main` vs `master`).
2. Server Actions failing to adopt `next-safe-action` and lacking authentication on cache purge actions.
3. Zustand state mandate abandoned in favor of React Contexts.
4. Environment variable leakage, missing schema declarations (`SUPABASE_SERVICE_ROLE_KEY`), and uncommitted `.env.example`.
5. Public exposure of dangerous debug routes (`/test-cache`, `/sandbox`).
6. Widespread dead-weight imports (56 `loading.tsx` files loading phantom Lit packages) and massive uncompressed public assets (13.6 MB).

---

## 5. Verification Method

To independently verify all observations in this report:

1. **Verify Tracked Files & Branch:**
   ```powershell
   git status
   git branch
   git ls-files | Measure-Object -Line
   ```
2. **Verify Zero Tests & Test Bypass:**
   ```powershell
   git ls-files "*test*" "*spec*"
   Get-Content package.json | Select-String "test"
   ```
3. **Verify CI Branch Discrepancy:**
   ```powershell
   Get-Content .github/workflows/ci.yml | Select-String "branches"
   ```
4. **Verify Server Actions lack of `next-safe-action`:**
   ```powershell
   Get-ChildItem -Path src/actions -Recurse | Select-String "next-safe-action"
   ```
5. **Verify Zustand Unused:**
   ```powershell
   Get-ChildItem -Path src -Recurse -Include "*.ts","*.tsx" | Select-String "zustand"
   ```
6. **Verify Phantom-UI in 56 loading screens:**
   ```powershell
   git grep -l "phantom-ui" src/app | Measure-Object -Line
   ```
7. **Verify Public Image Sizes:**
   ```powershell
   Get-ChildItem -Path public -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 Length, FullName
   ```
8. **Verify Exposed Debug Routes:**
   ```powershell
   Get-Content src/app/(public)/test-cache/page.tsx
   Get-Content src/app/(dev)/sandbox/page.tsx -TotalCount 115
   ```
