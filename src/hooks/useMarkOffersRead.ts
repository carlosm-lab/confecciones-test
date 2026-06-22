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

import { useEffect, useRef } from "react";
import { useNotifications } from "@/context/NotificationContext";

export function useMarkOffersRead() {
  const { notifications, markRead } = useNotifications();

  // Guardamos los valores del primer render en un ref inicializado
  // síncronamente con useRef(initialValue). Dentro del efecto de
  // deps-vacíos los leemos desde el ref: esto evita tanto
  // eslint-disable como ref-en-render (react-hooks/refs).
  const initialRef = useRef({ notifications, markRead });

  useEffect(() => {
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
