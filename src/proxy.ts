import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/env";

/**
 * Routes that are blocked in production even when HOME_ONLY is disabled.
 * These pages are not ready for public access yet.
 * The proxy redirects them back to home.
 *
 * NOTE: /catalogo and /carrito have been removed — the catalog is now
 * fully dynamic (Supabase) and ready for production.
 */
const BLOCKED_ROUTES = ["/servicios", "/mi-cuenta"];

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // ── HOME_ONLY mode: block everything except / and /links ──
  if (env.NEXT_PUBLIC_HOME_ONLY === "true") {
    if (url.pathname !== "/" && url.pathname !== "/links") {
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

  // ── Selective blocking: redirect BLOCKED_ROUTES to home only in production ──
  if (env.NODE_ENV === "production") {
    const isBlocked = BLOCKED_ROUTES.some(
      (route) => url.pathname === route || url.pathname.startsWith(`${route}/`)
    );

    if (isBlocked) {
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    }
  }

  // ── SEC-002: Protección de rutas /admin a nivel de servidor ──────────────
  // Sin esta verificación, las rutas /admin solo estaban protegidas en el cliente.
  // Patrón oficial: https://supabase.com/docs/guides/auth/server-side/nextjs
  // La verificación de rol usa app_metadata.role del JWT — fuente de verdad
  // inmutable por el propio usuario (solo modificable vía Service Role / Dashboard).
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // getUser() valida el JWT contra Supabase Auth Server — no confía en cookies sin validar
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Sin sesión → redirigir al login
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Con sesión pero sin rol admin → redirigir al inicio
    // Verificación via app_metadata.role del JWT — NO manipulable por el usuario
    const userRole = user.app_metadata?.role;
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

// Run proxy on all routes except static assets, media, and API endpoints
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.png, icon.png, apple-icon.png (static public files)
     * - any files with extensions like .png, .jpg, .webp, .svg
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|icon.png|apple-icon.png|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.svg|.*\\.css|.*\\.js|.*\\.xml|.*\\.txt).*)",
  ],
};
