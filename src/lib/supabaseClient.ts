"use client";
// ──────────────────────────────────────────────────────────────
// CLIENTE DE SUPABASE (BROWSER / CLIENTE)
// ──────────────────────────────────────────────────────────────
// Para uso en Client Components y el panel admin.
// Usa @supabase/ssr para soporte correcto en Next.js.
// ──────────────────────────────────────────────────────────────
import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/env";

// Singleton — se crea una sola vez por sesión de navegador
let _supabase: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    _supabase = createBrowserClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return _supabase;
}
