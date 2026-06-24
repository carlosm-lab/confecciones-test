"use client";

/**
 * useMarkOffersRead
 * ─────────────────────────────────────────────────────────────
 * Marca las notificaciones de tipo new_product, new_offer y manual
 * como leídas cuando el usuario visita la página de catálogo/ofertas.
 *
 * Se usa dentro de las páginas de catálogo (client component).
 *
 * NOTA: Usa useNotificationsSafe() en lugar de useNotifications()
 * porque OffersReadTracker se renderiza en Server Component pages
 * (/catalogo, /catalogo/[sector]) donde el contexto de React aún no
 * está establecido durante el SSR pass. useNotificationsSafe() devuelve
 * null sin lanzar error. Los effects que marcan notificaciones como
 * leídas son puramente client-side y nunca corren en SSR de todas formas.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import { useNotificationsSafe } from "@/context/NotificationContext";
import type { AppNotification } from "@/context/NotificationContext";

const EMPTY_NOTIFICATIONS: AppNotification[] = [];
const NOOP_MARK_READ = (_id: string): void => {};

export function useMarkOffersRead() {
  const ctx = useNotificationsSafe();

  // useRef debe llamarse incondicionalmente (Rules of Hooks).
  // Si ctx es null (SSR / fuera del provider), usamos valores vacíos seguros.
  const initialRef = useRef({
    notifications: ctx?.notifications ?? EMPTY_NOTIFICATIONS,
    markRead: ctx?.markRead ?? NOOP_MARK_READ,
  });

  useEffect(() => {
    // ctx null = SSR o componente fuera del provider — no hay nada que marcar.
    if (!initialRef.current.notifications.length) return;

    const offerTypes = ["new_product", "new_offer", "manual", "info"] as const;
    const { notifications: notifs, markRead: mark } = initialRef.current;
    const unreadOffers = notifs.filter(
      (n) =>
        offerTypes.includes(n.type as (typeof offerTypes)[number]) && !n.read
    );
    unreadOffers.forEach((n) => mark(n.id));
    // Deps vacíos: solo corre una vez al montar (cuando el usuario entra a la página)
  }, []);
}
