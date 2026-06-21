"use client";

/**
 * OffersReadTracker
 * ─────────────────────────────────────────────────────────────
 * Componente invisible que marca las notificaciones de ofertas
 * como leídas cuando el usuario visita el catálogo.
 * Se renderiza en las páginas de catálogo (Server Components).
 * ─────────────────────────────────────────────────────────────
 */

import { useMarkOffersRead } from "@/hooks/useMarkOffersRead";

export function OffersReadTracker() {
  useMarkOffersRead();
  return null;
}
