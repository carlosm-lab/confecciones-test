# Forensic Security Audit Report — Confecciones Liss

**Auditor Role**: Security Forensic Auditor (Zero-Trust Box-White Inspection)  
**Integrity Mode**: Benchmark (Passive Static Code Analysis — Zero Repository Mutations)  
**Date**: 2026-11-07  
**Target Repository**: `c:\Users\usuar\Desktop\confecciones liss`  
**Compliance Standards**: OWASP Top 10 (2021), OWASP ASVS v4.0.3, Next.js Security Guidelines, Supabase Zero-Trust Model

---

## 1. Executive Risk Summary

| Category                                                                       | Critical | High | Medium | Low | Total  |
| :----------------------------------------------------------------------------- | :------: | :--: | :----: | :-: | :----: |
| **Security (Auth, Access Control, Injection, Secrets, Headers, Dependencies)** |    2     |  5   |   5    |  4  | **16** |

### Severity Distribution & Verdict

- **CRITICAL**: 2
- **HIGH**: 5
- **MEDIUM**: 5
- **LOW**: 4
- **OVERALL STATUS**: 🔴 **INTEGRITY VIOLATION / CRITICAL RISKS DETECTED**
- **Core Vectors**: Arbitrary deletion of all Web Push subscriptions via public RLS flaw; Unauthenticated invocation of Supabase Edge Function with service_role privileges; PostgREST filter injection in university catalog queries; Publicly callable Server Action without authorization; Secrets lingering in configuration files.

---

## 2. Audited Surface Map

| Surface Area                        | Inspected Files / Components                                                                                                                                                                                    | Coverage & Tools Inspected                                                                                |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Configuration & Secrets**         | `next.config.mjs`, `vercel.json`, `package.json`, `.env`, `.env.example`, `.env.local`, `.gitignore`, `src/env.ts`, `src/lib/clientEnv.ts`                                                                      | 100% inspected. Scanned for hardcoded keys, loose regex, env exposure, build configs.                     |
| **Authentication & Routing**        | `src/proxy.ts`, `src/app/auth/callback/route.ts`, `src/context/AuthContext.tsx`, `src/app/(admin)/admin/layout.tsx`, `src/app/(admin)/admin/login/page.tsx`                                                     | 100% inspected. Evaluated SSR cookie propagation, getUser vs getSession, OAuth exchange, Open Redirects.  |
| **Server Actions & API Handlers**   | `src/actions/catalog.ts`, `src/actions/categories.ts`, `src/actions/contact.ts`, `src/actions/featuredProducts.ts`, `src/app/api/revalidate/route.ts`, `src/app/api/csp-report/route.ts`                        | 100% inspected. Evaluated input validation (Zod), rate-limiting, timing attacks, service_role escalation. |
| **Data Services & Helpers**         | `src/lib/catalogService.ts`, `src/lib/reviewsService.ts`, `src/lib/googleReviewsService.ts`, `src/lib/whatsapp.ts`, `src/lib/sanitize.ts`, `src/lib/storageUtils.ts`, `src/lib/logger.ts`, `src/lib/schemas.ts` | 100% inspected. Checked for PostgREST query injection, price manipulation, dead sanitize functions.       |
| **Database Migrations & Edge RPCs** | `supabase/migrations/*.sql` (all 14 migration files), `supabase/functions/send-push/index.ts`                                                                                                                   | 100% inspected. Verified RLS policies, SECURITY DEFINER functions, CHECK constraints, function grants.    |
| **Client UI & DOM Manipulation**    | `src/app/layout.tsx`, `src/components/analytics/*`, `src/components/ui/CookieBanner.tsx`, `src/components/cart/CartDrawer.tsx`, `src/app/(admin)/admin/**`                                                      | 100% inspected. Evaluated XSS in JSON-LD, CSP directive matching, client-side price tampering.            |

---

## 3. 5-Component Forensic Assessment

### 3.1 Observation

- `supabase/migrations/20260620_notifications_system.sql:108-111`: Policy `"push_sub_own_delete"` grants `DELETE` on `push_subscriptions` to `public` using predicate `USING (true)`.
- `supabase/functions/send-push/index.ts:91-105`: Edge Function does not inspect or validate incoming `Authorization` headers before broadcasting push notifications using `SUPABASE_SERVICE_ROLE_KEY`.
- `src/lib/catalogService.ts:427-428`: Interpolates raw dynamic route parameters (`universidad`) directly into PostgREST `.or()` filter string.
- `src/actions/categories.ts:19-50`: Server Action `revalidateAfterCategorySave()` is exposed to the internet with zero session or role verification.
- `src/actions/catalog.ts:49-70`: Revalidation authentication logic checks `if (url && key)`; if env variables fail to load, the check is skipped and execution proceeds (fail-open).
- `src/actions/contact.ts:40-49`: In-memory rate limiting relies exclusively on user-supplied email strings, allowing trivial rotation bypass. Turnstile captcha verification is absent. Action uses `SUPABASE_SERVICE_ROLE_KEY` if present, bypassing RLS.
- `src/actions/contact.ts:56-61, 110-115` & `src/actions/featuredProducts.ts:124-133`: Inserts event types (`contact_rate_limit_exceeded`, `contact_message_sent`, `admin_featured_product_toggle`) that violate the table's `CHECK (event_type IN (...))` constraint, causing unhandled or silent database rejections.
- `.env:17`: Commented-out production Google OAuth client secret (`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`) is stored in `.env`.
- `src/env.ts:11-14`: `REVALIDATE_SECRET` defaults to `"dev_revalidate_secret_local"`.
- `src/app/api/revalidate/route.ts:8-13`: `secret` is received in URL query parameters and evaluated with standard non-constant-time string comparison (`!==`).
- `next.config.mjs:50-59`: CSP `script-src` lacks `https://connect.facebook.net` and `https://www.gstatic.com`, causing runtime browser blocks when consent is given. Lacks `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'`.
- `src/app/api/csp-report/route.ts:36-42, 107-119`: Rate limiting relies on spoofable `x-forwarded-for` and inserts directly into `security_events` table without database-backed quotas.
- `src/lib/sanitize.ts:17-19` & `src/app/auth/callback/route.ts:49-55`: Path sanitization only tests for `startsWith("/") && !startsWith("//")`, leaving protocol-relative backslash sequences (`/\evil.com`) unmitigated.
- `src/app/layout.tsx:140-141`: `<script type="application/ld+json">` embeds raw `JSON.stringify()` without escaping `<` characters.

### 3.2 Logic Chain

1. _Access Control_: An application exposing public API endpoints or database roles without authentication violates ASVS V4.1. By setting `USING (true)` for `DELETE TO public` in `push_subscriptions`, the database engine cannot distinguish legitimate owners from anonymous attackers.
2. _Edge Security_: An Edge function running with `service_role` privileges that does not check caller JWT identity allows unauthorized parties to trigger expensive background jobs and delete registered push endpoints.
3. _Query Integrity_: The PostgREST `.or()` clause interprets commas and periods as logical delimiters. Concatenating user-controlled route variables into `.or(...)` allows filter restructuring.
4. _Fail-Open Defaults_: Authentication gates structured as `if (url && key)` fail open if environment resolution fails or changes.
5. _Audit Integrity_: If event logs throw schema constraint errors, incident tracking fails completely, blinding administrators to malicious behavior.

### 3.3 Caveats

- No code was executed or modified in the workspace per passive audit rules.
- Supabase live database tables were inspected through repository migration files and verified against past audit artifacts.
- Remote production secrets (e.g. Supabase dashboard service key) were evaluated based on repository references and `.env` local configurations.

### 3.4 Conclusion

The application demonstrates strong architectural foundations (Next.js 16 App Router, Supabase SSR client with `getUser()`, typed schemas), but contains 2 Critical, 5 High, 5 Medium, and 4 Low security vulnerabilities that must be resolved prior to production operation.

### 3.5 Verification Method

- Static AST inspection of file paths and line numbers via `read_file`.
- Schema constraint verification against `supabase/migrations/20260620_security_killswitch.sql`.
- Policy syntax validation against PostgreSQL 15 Row Level Security rules.
- HTTP header and CSP specification validation against W3C CSP Level 3 and RFC 6749.

---

## 4. Detailed Findings Registry (Ordered Critical to Low)

```
================================================================================
CRITICAL FINDINGS
================================================================================
```

### SEC-01: Insecure Direct Object Deletion (IDOR) & Arbitrary Data Wipe on `push_subscriptions`

- **ID & Title**: SEC-01: Arbitrary Deletion of All Web Push Subscriptions via Insecure RLS Policy
- **Category**: Security (Authorization & Access Control / RLS)
- **Severity**: Critical
- **Exact Location**: `supabase/migrations/20260620_notifications_system.sql:108-111`
- **Diagnosis and Failure Scenario**:  
  In migration `20260620_notifications_system.sql`, the policy `"push_sub_own_delete"` is declared as:
  ```sql
  CREATE POLICY "push_sub_own_delete" ON public.push_subscriptions
    FOR DELETE TO public
    USING (true);
  ```
  The predicate `USING (true)` applies to `public` (which includes anonymous visitors using `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Any unauthenticated actor can send a single HTTP `DELETE` request to `https://<supabase-url>/rest/v1/push_subscriptions` and instantly wipe out all registered subscriber endpoints in the database.
- **Exact Remediation Code**:
  Replace the insecure deletion policy with an authenticated ownership check or endpoint-restricted deletion:

  ```sql
  -- Drop insecure policy
  DROP POLICY IF EXISTS "push_sub_own_delete" ON public.push_subscriptions;

  -- Allow authenticated users to delete only their own push subscriptions
  CREATE POLICY "push_sub_authenticated_delete" ON public.push_subscriptions
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

  -- Allow anonymous guests to delete only by supplying their exact unique endpoint
  CREATE POLICY "push_sub_anon_delete_by_endpoint" ON public.push_subscriptions
    FOR DELETE TO anon
    USING (
      user_id IS NULL
      AND endpoint = current_setting('request.headers', true)::json->>'x-push-endpoint'
    );
  ```

---

### SEC-02: Unauthenticated Execution of Edge Function `send-push` with Service Role Privileges

- **ID & Title**: SEC-02: Missing Caller Authentication in Supabase Edge Function `send-push`
- **Category**: Security (Authentication & Authorization / Edge Serverless)
- **Severity**: Critical
- **Exact Location**: `supabase/functions/send-push/index.ts:91-135`
- **Diagnosis and Failure Scenario**:  
  The `send-push` edge function executes via `serve(...)` and handles POST requests without validating the `Authorization` header. Although client components like `src/app/(admin)/admin/products/page.tsx:265` send `Authorization: Bearer <token>`, the Edge function completely ignores the header. An unauthenticated attacker can make POST requests to `https://<project-ref>.supabase.co/functions/v1/send-push` with arbitrary `{"notification_id": "..."}` payloads. The function uses `SUPABASE_SERVICE_ROLE_KEY` to fetch notification records and dispatch Web Push messages to all devices, purging endpoints that fail and consuming serverless invocation quotas.
- **Exact Remediation Code**:
  Enforce admin caller authentication at the very start of the Edge Function handler in `supabase/functions/send-push/index.ts`:

  ```typescript
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

    // ── Enforce Admin Authentication ──────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing or invalid authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")!;

    // Validate caller token using Supabase Auth
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: { user }, error: authErr } = await authClient.auth.getUser();

    if (authErr || !user || user.app_metadata?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden: Admin privileges required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const { notification_id } = (await req.json()) as { notification_id: string };
      // ... continue processing
  ```

---

```
================================================================================
HIGH FINDINGS
================================================================================
```

### SEC-03: PostgREST Filter Injection in `getProductsByUniversity`

- **ID & Title**: SEC-03: Unsanitized PostgREST Filter Clause Injection in Catalog Service
- **Category**: Security (Input Validation & Injection Risks)
- **Severity**: High
- **Exact Location**: `src/lib/catalogService.ts:427-428`
- **Diagnosis and Failure Scenario**:  
  In `src/lib/catalogService.ts`:
  ```typescript
  .or(`sector.eq.universitario,sector.eq.${universidad}`)
  .ilike("category", `%${universidad}%`)
  ```
  The parameter `universidad` originates from the URL slug in `src/app/(public)/catalogo/universidades/[universidad]/page.tsx`. If this function is invoked or reused without prior strict validation, an attacker could supply input containing PostgREST filter delimiters (e.g. `universitario),is_active.is.null,(` or `univo,is_featured.eq.true`). PostgREST evaluates `.or()` by splitting strings on commas and parentheses, which alters query logic and can bypass active product filters or extract unintentional records.
- **Exact Remediation Code**:
  Sanitize and strictly validate `universidad` with a whitelist of allowable university slugs before constructing the query in `src/lib/catalogService.ts:382-430`:

  ```typescript
  const ALLOWED_UNIVERSITIES = new Set([
    "univo",
    "ieproes",
    "ugb",
    "unab",
    "ues",
    "uma",
  ]);

  export async function getProductsByUniversity(
    universidad: string
  ): Promise<DbProduct[]> {
    const cleanUni = String(universidad || "").toLowerCase().trim();
    if (!ALLOWED_UNIVERSITIES.has(cleanUni)) {
      logger.warn(`[catalogService] Invalid university identifier: ${universidad}`);
      return [];
    }

    const supabase = createServerClient(["products", "categories"]);

    // Safe to interpolate only after strict set validation
    const { data: byDirect, error: errDirect } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .or(`sector.eq.universitario,sector.eq.${cleanUni}`)
      .ilike("category", `%${cleanUni}%`)
      .order("created_at", { ascending: false });
  ```

---

### SEC-04: Missing Authorization Gate on Server Action `revalidateAfterCategorySave`

- **ID & Title**: SEC-04: Publicly Callable Cache Invalidation Server Action
- **Category**: Security (Authorization & Access Control / Server Actions)
- **Severity**: High
- **Exact Location**: `src/actions/categories.ts:19-50`
- **Diagnosis and Failure Scenario**:  
  `src/actions/categories.ts` exports `revalidateAfterCategorySave()` with the `"use server"` directive. In Next.js, every Server Action is compiled into a public HTTP POST endpoint callable by any client with a JSON-RPC payload. Unlike `catalog.ts`, `categories.ts` performs NO session check and NO role validation. An attacker can repeatedly call this action from an automated script, triggering continuous revalidations across `/`, `/catalogo`, all sectors, and all university landing pages, inducing cache thrashing and server CPU/memory exhaustion.
- **Exact Remediation Code**:
  Add server-side session and admin role verification in `src/actions/categories.ts:19-27`:

  ```typescript
  "use server";

  import { createServerClient } from "@supabase/ssr";
  import { revalidatePath } from "next/cache";
  import { cookies } from "next/headers";
  import { env } from "@/env";

  export async function revalidateAfterCategorySave(): Promise<void> {
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
      throw new Error("Unauthorized: Admin privileges required to revalidate categories.");
    }

    // Invalidar Full Route Cache de las rutas que muestran categorías.
    revalidatePath("/");
    revalidatePath("/catalogo");
    revalidatePath("/(public)", "page");
    revalidatePath("/(public)/catalogo", "page");
    revalidatePath("/", "layout");
  ```

---

### SEC-05: Ineffective Email-Only Rate Limiting and Service Role Risk in `sendContactMessage`

- **ID & Title**: SEC-05: Bypassable In-Memory Email Rate Limiting & Unenforced Bot Protection
- **Category**: Security (Input Validation & Abuse Mitigation)
- **Severity**: High
- **Exact Location**: `src/actions/contact.ts:40-49`
- **Diagnosis and Failure Scenario**:  
  In `src/actions/contact.ts`:
  1. Rate limiting is enforced solely via `const emailKey = parsed.data.email.toLowerCase().trim();`. An attacker can submit unlimited contact messages by appending arbitrary suffixes (`bot+1@domain.com`, `bot+2@domain.com`).
  2. The server action does not verify Cloudflare Turnstile tokens, even though `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is defined in `env.ts`.
  3. Lines 45-47 conditionally use `SUPABASE_SERVICE_ROLE_KEY`. If this environment variable is defined in production, all inserts bypass Row Level Security completely.
- **Exact Remediation Code**:
  Update `src/actions/contact.ts` to include client IP-based rate limiting, Cloudflare Turnstile token validation, and ensure operations run strictly with the anonymous key:

  ```typescript
  import { headers } from "next/headers";

  // Rate limiting by client IP + email
  const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
  const RATE_LIMIT_MAX = 5;
  const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

  export async function sendContactMessage(
    data: ContactFormData & { turnstileToken?: string }
  ): Promise<ActionResult> {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Datos inválidos" };
    }

    const headerStore = await headers();
    const clientIp =
      headerStore.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      headerStore.get("x-real-ip") ||
      "unknown-client";

    const rateKey = `${clientIp}:${parsed.data.email.toLowerCase().trim()}`;
    const now = Date.now();
    const existing = rateLimitMap.get(rateKey);

    if (existing && now < existing.resetAt) {
      if (existing.count >= RATE_LIMIT_MAX) {
        return {
          success: false,
          error: "Demasiados mensajes enviados. Por favor espera 10 minutos.",
        };
      }
      existing.count++;
    } else {
      rateLimitMap.set(rateKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // Always use anon key for contact form insertions to respect DB RLS policies
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false } }
    );

    const { error } = await supabase.from("messages").insert([{
      name: parsed.data.nombre,
      email: parsed.data.email,
      phone: parsed.data.telefono || null,
      subject: parsed.data.asunto,
      message: parsed.data.mensaje,
    }]);
  ```

---

### SEC-06: Production Google OAuth Client Secret Committed in `.env`

- **ID & Title**: SEC-06: Plaintext OAuth Client Secret Stored in Workspace `.env` File
- **Category**: Security (Secrets & Credential Exposure)
- **Severity**: High
- **Exact Location**: `.env:17`
- **Diagnosis and Failure Scenario**:  
  Line 17 of `.env` contains an actual Google OAuth Client Secret:
  `# GOOGLE_CLIENT_SECRET=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  <-- solo en Supabase, NO aquí`
  Although commented out with `#`, storing plaintext credentials in configuration files within the working tree risks accidental staging, exposure in backups, CI/CD artifacts, or developer workstation exfiltration (CWE-312 / CWE-522).
- **Exact Remediation Code**:
  1. Revoke and rotate the OAuth Client Secret immediately in the Google Cloud Console (APIs & Services > Credentials).
  2. Clean `.env:17` and `.env.example`:
  ```bash
  # In .env and .env.example:
  # Google OAuth Client Secret must ONLY be configured in the Supabase Dashboard
  # (Authentication > Providers > Google). NEVER include it in local workspace files.
  ```

---

### SEC-07: Insecure Fallback Default for Revalidation Secret in `src/env.ts`

- **ID & Title**: SEC-07: Hardcoded Default Value for `REVALIDATE_SECRET`
- **Category**: Security (Authentication & Session Management / Configuration)
- **Severity**: High
- **Exact Location**: `src/env.ts:11-14`
- **Diagnosis and Failure Scenario**:  
  In `src/env.ts`:
  ```typescript
  REVALIDATE_SECRET: z
    .string()
    .min(16)
    .default("dev_revalidate_secret_local"),
  ```
  `@t3-oss/env-nextjs` applies `.default()` in all environments (including production) when the environment variable is not supplied in hosting dashboards. If `REVALIDATE_SECRET` is omitted on Vercel, production defaults to `"dev_revalidate_secret_local"`. Any user who observes the repository or guesses standard defaults can invoke `/api/revalidate?secret=dev_revalidate_secret_local&path=/` to purge CDN caches at will.
- **Exact Remediation Code**:
  Conditionally require a strict secret in production without default fallback in `src/env.ts:11-16`:
  ```typescript
  REVALIDATE_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(32, "REVALIDATE_SECRET must be at least 32 characters in production")
      : z.string().min(16).default("dev_revalidate_secret_local_only"),
  ```

---

```
================================================================================
MEDIUM FINDINGS
================================================================================
```

### SEC-08: Sensitive Token in GET Query Parameter and Non-Constant-Time Comparison in `/api/revalidate`

- **ID & Title**: SEC-08: Credential Leakage via URL Query String & Timing Attack in Route Handler
- **Category**: Security (Authentication & Transport Security / CWE-598 & CWE-208)
- **Severity**: Medium
- **Exact Location**: `src/app/api/revalidate/route.ts:8-13`
- **Diagnosis and Failure Scenario**:  
  `src/app/api/revalidate/route.ts` reads `const secret = request.nextUrl.searchParams.get("secret");` and compares it using `if (secret !== env.REVALIDATE_SECRET)`.
  1. Passing secrets in query strings exposes them to browser histories, corporate proxy logs, CDN logs, and `Referer` headers (CWE-598).
  2. JavaScript `!==` evaluates characters sequentially and terminates upon the first non-matching byte, introducing side-channel timing attack vectors (CWE-208).
- **Exact Remediation Code**:
  Switch authentication to a bearer header or POST payload and use constant-time byte comparison in `src/app/api/revalidate/route.ts:7-14`:

  ```typescript
  import crypto from "crypto";

  export async function POST(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    const secret = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!secret || !env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secretBuffer = Buffer.from(secret);
    const expectedBuffer = Buffer.from(env.REVALIDATE_SECRET);

    if (
      secretBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(secretBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  ```

---

### SEC-09: Schema Constraint Violation Causing Silent Failure of Security Event Logging

- **ID & Title**: SEC-09: Unchecked Event Types Causing Complete Audit Trail Failure
- **Category**: Security (Error Handling & Audit Logging / Schema Integrity)
- **Severity**: Medium
- **Exact Location**: `supabase/migrations/20260620_security_killswitch.sql:33-41` & `src/actions/contact.ts:57, 111` & `src/actions/featuredProducts.ts:125`
- **Diagnosis and Failure Scenario**:  
  `supabase/migrations/20260620_security_killswitch.sql` establishes a strict CHECK constraint:
  ```sql
  event_type IN ('csp_violation', 'rate_limit_exceeded', 'killswitch_activated', 'killswitch_deactivated', 'anomaly_detected')
  ```
  However, application code attempts to insert unregistered event types:
  - `src/actions/contact.ts:57`: `contact_rate_limit_exceeded`
  - `src/actions/contact.ts:111`: `contact_message_sent`
  - `src/actions/featuredProducts.ts:125`: `admin_featured_product_toggle`
    PostgreSQL aborts every single insert with a check constraint violation. Because the callers wrap these queries in empty `try {} catch {}` blocks, the system fails silently and no security event audit records are ever written.
- **Exact Remediation Code**:
  Create a migration to expand the allowed event types in PostgreSQL:

  ```sql
  ALTER TABLE public.security_events
    DROP CONSTRAINT IF EXISTS security_events_event_type_check;

  ALTER TABLE public.security_events
    ADD CONSTRAINT security_events_event_type_check
    CHECK (
      event_type IN (
        'csp_violation',
        'rate_limit_exceeded',
        'killswitch_activated',
        'killswitch_deactivated',
        'anomaly_detected',
        'contact_rate_limit_exceeded',
        'contact_message_sent',
        'admin_featured_product_toggle'
      )
    );
  ```

---

### SEC-10: Restrictive Content Security Policy (CSP) Blocking Legitimate Functional Integrations

- **ID & Title**: SEC-10: Misconfigured CSP Directives Breaking Meta Pixel & Google Merchant Integrations
- **Category**: Security (HTTP Security Headers / CSP)
- **Severity**: Medium
- **Exact Location**: `next.config.mjs:50-59`
- **Diagnosis and Failure Scenario**:  
  The Content-Security-Policy in `next.config.mjs` configures:
  - `script-src` allowing only `challenges.cloudflare.com`, `googletagmanager.com`, `google-analytics.com`.
  - However, `src/components/analytics/MetaPixel.tsx:16` loads `https://connect.facebook.net/en_US/fbevents.js`, and `src/components/analytics/GoogleMerchantWidget.tsx:69` loads `https://www.gstatic.com/shopping/merchant/merchantwidget.js`.
    When a user consents to cookies, both scripts are blocked by the browser. In addition, every block posts a CSP violation report to `/api/csp-report`, consuming database storage and falsifying security dashboards. Furthermore, CSP lacks `object-src 'none'` and `base-uri 'self'`.
- **Exact Remediation Code**:
  Update the CSP header in `next.config.mjs:50-64`:

  ```javascript
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.gstatic.com"
    : "'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.gstatic.com";

  const securityHeaders = [
    ...(isDev
      ? []
      : [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ]),
    {
      key: "Content-Security-Policy",
      value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: blob: https://lh3.googleusercontent.com https://cvbdqsxjfrbwovzpydng.supabase.co https://www.google-analytics.com https://www.facebook.com; font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' ws: wss: https://cvbdqsxjfrbwovzpydng.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.in https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://connect.facebook.net; frame-src 'self' https://challenges.cloudflare.com https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; report-uri /api/csp-report;`,
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
  ];
  ```

---

### SEC-11: Spoofable Client IP Address & Unrestricted Ingestion in `/api/csp-report`

- **ID & Title**: SEC-11: IP Header Spoofing and Unbounded CSP Ingestion
- **Category**: Security (Input Validation & Denial of Service / CSP)
- **Severity**: Medium
- **Exact Location**: `src/app/api/csp-report/route.ts:36-42, 107-119`
- **Diagnosis and Failure Scenario**:  
  `getClientIp` checks `req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()`. Unless validated by an edge reverse proxy, `x-forwarded-for` is directly forgeable by HTTP clients. A malicious script can randomize the `x-forwarded-for` header in each request, completely evading the in-memory rate limiter `ipHits` and flooding the `security_events` table via unauthenticated inserts.
- **Exact Remediation Code**:
  Use platform-verified IP headers and implement body size limits in `src/app/api/csp-report/route.ts:36-42`:
  ```typescript
  function getClientIp(req: NextRequest): string {
    // Rely exclusively on trusted edge proxy headers (Vercel)
    return (
      req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"
    );
  }
  ```

---

### SEC-12: Fail-Open Admin Verification in Server Action `revalidateAfterProductSave`

- **ID & Title**: SEC-12: Fail-Open Environmental Guard in Cache Revalidation
- **Category**: Security (Authentication & Authorization / Server Actions)
- **Severity**: Medium
- **Exact Location**: `src/actions/catalog.ts:49-70`
- **Diagnosis and Failure Scenario**:  
  In `src/actions/catalog.ts`:
  ```typescript
  if (url && key) {
    const supabase = createServerClient(url, key, { ... });
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user || user.app_metadata?.role !== "admin") {
      console.warn("[revalidateAfterProductSave] Intento no autorizado.");
      return;
    }
  }
  revalidatePath("/");
  ```
  If `url` or `key` is not evaluated (e.g. variable naming differences or cold start timing), the entire `if (url && key)` block is skipped. The function then proceeds directly to execute `revalidatePath(...)` across multiple public routes without authentication (fail-open architecture).
- **Exact Remediation Code**:
  Enforce a strict fail-closed structure in `src/actions/catalog.ts:45-71`:

  ```typescript
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Configuration Error: Missing Supabase environment variables."
    );
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
    throw new Error("Unauthorized: Admin privileges required.");
  }
  ```

---

```
================================================================================
LOW FINDINGS
================================================================================
```

### SEC-13: Incomplete URL Validation Allowing Protocol-Relative Redirection

- **ID & Title**: SEC-13: Open Redirect Vulnerability via Protocol-Relative Backslash Sequences
- **Category**: Security (Input Validation & Client-Side Security)
- **Severity**: Low
- **Exact Location**: `src/app/auth/callback/route.ts:49-55` & `src/lib/sanitize.ts:17-19`
- **Diagnosis and Failure Scenario**:  
  In `src/app/auth/callback/route.ts`:
  ```typescript
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    redirectTo = nextParam;
  }
  ```
  And in `src/lib/sanitize.ts`:
  ```typescript
  if (trimmed.startsWith("/")) return trimmed;
  ```
  Browsers (Chromium, WebKit) interpret backslash sequences such as `/\evil.com` or `//evil.com` as protocol-relative network path references. In `src/lib/sanitize.ts`, any string starting with `/` is returned verbatim without even testing for `//`.
- **Exact Remediation Code**:
  Implement strict RFC-compliant path validation:
  ```typescript
  export function isValidRelativeUrl(url: string): boolean {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    // Must begin with single forward slash, must not begin with // or /\ or /\\
    return (
      trimmed.startsWith("/") &&
      !trimmed.startsWith("//") &&
      !trimmed.startsWith("/\\") &&
      !trimmed.includes("\\")
    );
  }
  ```

---

### SEC-14: Time-of-Check to Time-of-Use (TOCTOU) Race Condition in `toggleFeaturedProduct`

- **ID & Title**: SEC-14: Concurrency Race Condition Exceeding Maximum Featured Product Limit
- **Category**: Security (Business Logic / Concurrency)
- **Severity**: Low
- **Exact Location**: `src/actions/featuredProducts.ts:85-114`
- **Diagnosis and Failure Scenario**:  
  `toggleFeaturedProduct` counts existing featured items via `.select("id", { count: "exact", head: true })`. If `count < MAX_FEATURED`, it updates the product with `.update({ is_featured: true })`. Two concurrent requests from different administrators or rapid double-clicks can both observe `count = 9` and execute updates, resulting in 11 active featured items and violating UI display constraints.
- **Exact Remediation Code**:
  Enforce the 10-item limit atomically in PostgreSQL:

  ```sql
  CREATE OR REPLACE FUNCTION public.check_max_featured_products()
  RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.is_featured = true AND (OLD.is_featured IS DISTINCT FROM true) THEN
      IF (SELECT COUNT(*) FROM public.products WHERE is_featured = true) >= 10 THEN
        RAISE EXCEPTION 'Maximum limit of 10 featured products reached.';
      END IF;
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS trg_limit_featured_products ON public.products;
  CREATE TRIGGER trg_limit_featured_products
    BEFORE INSERT OR UPDATE OF is_featured ON public.products
    FOR EACH ROW
    WHEN (NEW.is_featured = true)
    EXECUTE FUNCTION public.check_max_featured_products();
  ```

---

### SEC-15: Script Breakout Risk in JSON-LD Structured Data

- **ID & Title**: SEC-15: Unescaped JSON Serialization in `<script type="application/ld+json">`
- **Category**: Security (Client-Side Security / XSS Prevention)
- **Severity**: Low
- **Exact Location**: `src/app/layout.tsx:140-141`
- **Diagnosis and Failure Scenario**:  
  `src/app/layout.tsx` embeds JSON-LD metadata via `dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}`. If strings incorporated into structured data contain `</script>`, HTML parsers terminate script block processing immediately and interpret subsequent characters as markup or scripts (OWASP ASVS 5.1.4).
- **Exact Remediation Code**:
  Escape `<` characters in JSON serialization in `src/app/layout.tsx:140-141`:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(schemaObject).replace(/</g, "\\u003c"),
    }}
  />
  ```

---

### SEC-16: Unused SDK Dependency & Plaintext API Key Exposure in `.env` (`groq-sdk`)

- **ID & Title**: SEC-16: Unreferenced Third-Party SDK & Lingering API Key
- **Category**: Security (Supply Chain & Attack Surface Reduction)
- **Severity**: Low
- **Exact Location**: `package.json:28` & `.env:38`
- **Diagnosis and Failure Scenario**:  
  `package.json` imports `"groq-sdk": "^1.4.0"` and `.env` defines `GROQ_API_KEY=gsk_...`. Static analysis of the `src/` directory confirms zero imports or usages of Groq or Lucas AI chat functionality. Retaining unreferenced packages increases dependency graph risk and bloats maintenance overhead.
- **Exact Remediation Code**:
  1. Remove `groq-sdk` from `package.json`:

  ```bash
  npm uninstall groq-sdk
  ```

  2. Remove `GROQ_API_KEY` from `.env` and revoke the key at `https://console.groq.com`.

---

## 5. Prioritized Action Plan

To stabilize and harden Confecciones Liss without introducing breaking changes or altering user experience:

### Phase 1: Immediate Critical Remediation (Day 1)

1. **Apply Migration for `push_subscriptions` RLS**: Drop `push_sub_own_delete` and restrict deletion to authenticated users or matching endpoint headers (**SEC-01**).
2. **Harden Edge Function `send-push`**: Deploy JWT verification and admin role checking before processing notification IDs (**SEC-02**).
3. **Revoke and Rotate Leaked Secrets**: Rotate Google OAuth client secret in Google Cloud Console; remove commented secret from `.env` (**SEC-06**).

### Phase 2: Server Action & Injection Hardening (Day 2)

4. **Protect Server Actions**: Add session checks and admin authorization to `src/actions/categories.ts` (**SEC-04**) and convert `src/actions/catalog.ts` to fail-closed (**SEC-12**).
5. **Sanitize University Catalog Query**: Whitelist university parameter slugs in `src/lib/catalogService.ts` before PostgREST query execution (**SEC-03**).
6. **Harden Contact Action**: Enforce IP rate limiting and remove service_role fallback in `src/actions/contact.ts` (**SEC-05**).

### Phase 3: Configuration, Schema & Headers Stabilization (Day 3)

7. **Expand Database CHECK Constraint**: Run SQL migration updating `security_events.event_type` to allow contact and toggle audit events (**SEC-09**).
8. **Harden Revalidation Route**: Switch `/api/revalidate` to POST with bearer token authentication and constant-time comparison; enforce strict production secret in `env.ts` (**SEC-07**, **SEC-08**).
9. **Align CSP Directives**: Add Meta Pixel and Google Merchant domains to `next.config.mjs` and include `object-src 'none'`, `base-uri 'self'` (**SEC-10**).
10. **Address Remaining Defenses**: Update relative URL sanitizer (**SEC-13**), escape JSON-LD `<` characters (**SEC-15**), add PostgreSQL trigger for featured product count (**SEC-14**), and remove `groq-sdk` (**SEC-16**).
