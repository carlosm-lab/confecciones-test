"use client";
// ──────────────────────────────────────────────────────────────
// PROVIDERS — Capa de contextos globales
// ──────────────────────────────────────────────────────────────
// Arquitectura de dos capas:
//
// CAPA 1 — Bundle inicial (ligero, no bloquea FCP/LCP):
//   - QueryClientProvider (React Query)
//   - ThemeProvider (next-themes, necesario para evitar FOUC de tema)
//
// CAPA 2 — DeferredProviders (lazy con next/dynamic, ssr: false):
//   - AuthProvider  → saca Supabase del critical path
//   - CartProvider  → saca Supabase + react-hot-toast del critical path
//   - FavoritesProvider, ConfirmProvider, NotificationProvider
//   - Toaster (react-hot-toast)
//
// ESTRATEGIA DE CARGA:
//   DeferredProviders NO se monta inmediatamente al hidratarse React.
//   Se usa requestIdleCallback (fallback: setTimeout 200ms) para diferir
//   la carga hasta que el main thread esté libre, DESPUÉS del LCP.
//   Esto evita que el chunk (~100ms long task) bloquee el paint del LCP.
//
//   Durante la ventana de carga (<~200ms post-hidratación),
//   los hooks de contexto devuelven sus valores por defecto (null-safe):
//   useAuth() → AUTH_GUEST_DEFAULT, useCart() → CART_EMPTY_DEFAULT, etc.
// ──────────────────────────────────────────────────────────────
import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { DeferredProviders } from "./DeferredProviders";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <DeferredProviders>{children}</DeferredProviders>
    </ThemeProvider>
  );
}
