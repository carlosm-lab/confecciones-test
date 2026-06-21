"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

/**
 * useServiceWorker
 * Registra el Service Worker (public/sw.js) en el cliente.
 * Solo se ejecuta una vez al montar.
 * No hace nada en SSR ni en navegadores sin soporte.
 */
export function useServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        logger.info("Service Worker registrado:", reg.scope);
      })
      .catch((err) => {
        logger.error("Error registrando Service Worker:", err);
      });
  }, []);
}
