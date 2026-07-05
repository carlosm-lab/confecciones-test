"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop Component — Confecciones Liss
 * Garantiza que al navegar a cualquier página nueva, el scroll se posicione
 * de forma inmediata en la parte superior (top: 0, left: 0), evitando que
 * la vista cargue desplazada hacia el medio o hacia el final de la página.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Evita que el navegador intente restaurar posiciones de scroll antiguas en SPA
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Restablece la posición al inicio inmediatamente
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
