"use client";

/**
 * useMarkOffersRead
 * ─────────────────────────────────────────────────────────────
 * Marca las notificaciones de tipo new_product, new_offer y manual
 * como leídas cuando el usuario visita la página de catálogo/ofertas.
 *
 * Se usa dentro de las páginas de catálogo (client component).
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";

export function useMarkOffersRead() {
  const { notifications, markRead } = useNotifications();

  useEffect(() => {
    const offerTypes = ["new_product", "new_offer", "manual", "info"] as const;
    const unreadOffers = notifications.filter(
      (n) =>
        offerTypes.includes(n.type as (typeof offerTypes)[number]) && !n.read
    );

    unreadOffers.forEach((n) => {
      markRead(n.id);
    });
    // Solo corre una vez al montar (cuando el usuario entra a la página)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
