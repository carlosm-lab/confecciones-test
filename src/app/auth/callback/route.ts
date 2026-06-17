import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ─────────────────────────────────────────────────────────────
// /auth/callback — Intercambia el ?code= de OAuth por una sesión
// y redirige al panel admin.
// ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const response = NextResponse.redirect(`${origin}/admin`);

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
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return response;
    }

    console.error("[auth/callback] Error exchanging code:", error.message);
  }

  // Sin código o error → redirigir al login
  return NextResponse.redirect(
    `${origin}/admin/login?error=auth_callback_failed`
  );
}
