import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ─────────────────────────────────────────────────────────────
// /auth/callback — Intercambia el ?code= de OAuth por una sesión
// Redirige según el rol: admins → /admin, usuarios → /
// SEC-005: El callback ya no redirige ciegamente a /admin.
// La cookie de sesión se fija en el redirect response correctamente.
// ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next");

  // Validar origin para prevenir Host Header Tampering / Open Redirect
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = siteUrl ? new URL(siteUrl).origin : requestUrl.origin;

  if (code) {
    // Fallback inicial en caso de error
    const redirectFallback = NextResponse.redirect(
      `${baseUrl}/admin/login?error=auth_callback_failed`
    );

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              redirectFallback.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const userRole = data.user.app_metadata?.role;
      let redirectTo = userRole === "admin" ? "/admin" : "/";

      // Validar si viene un parámetro 'next' seguro (relativo sin //)
      if (
        nextParam &&
        nextParam.startsWith("/") &&
        !nextParam.startsWith("//")
      ) {
        redirectTo = nextParam;
      }

      const successResponse = NextResponse.redirect(`${baseUrl}${redirectTo}`);
      redirectFallback.cookies.getAll().forEach(({ name, value, ...rest }) => {
        successResponse.cookies.set(name, value, rest);
      });
      return successResponse;
    }

    console.error("[auth/callback] Error exchanging code:", error?.message);
    return redirectFallback;
  }

  return NextResponse.redirect(
    `${baseUrl}/admin/login?error=auth_callback_failed`
  );
}
