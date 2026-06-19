import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ─────────────────────────────────────────────────────────────
// /auth/callback — Intercambia el ?code= de OAuth por una sesión
// Redirige según el rol: admins → /admin, usuarios → /
// SEC-005: El callback ya no redirige ciegamente a /admin.
// La cookie de sesión se fija en el redirect response correctamente.
// ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    // Creamos el redirect a /admin/login como fallback mutable
    // Se sobreescribe si el intercambio tiene éxito
    const redirectFallback = NextResponse.redirect(
      `${origin}/admin/login?error=auth_callback_failed`
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
            // Escribimos las cookies de sesión en el fallback response
            // Si el intercambio tiene éxito, crearemos un nuevo redirect con las mismas cookies
            cookiesToSet.forEach(({ name, value, options }) =>
              redirectFallback.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Determinar destino según el rol del usuario
      // Usamos app_metadata.role del JWT — fuente inamovible por el usuario
      const userRole = data.user.app_metadata?.role;
      const redirectTo = userRole === "admin" ? "/admin" : "/";

      // Crear el redirect final y copiar las cookies de sesión
      const successResponse = NextResponse.redirect(`${origin}${redirectTo}`);
      redirectFallback.cookies.getAll().forEach(({ name, value, ...rest }) => {
        successResponse.cookies.set(name, value, rest);
      });
      return successResponse;
    }

    console.error("[auth/callback] Error exchanging code:", error?.message);
    return redirectFallback;
  }

  // Sin código → redirigir al login
  return NextResponse.redirect(
    `${origin}/admin/login?error=auth_callback_failed`
  );
}
