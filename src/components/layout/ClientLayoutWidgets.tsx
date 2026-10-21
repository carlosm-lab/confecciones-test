"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const GlobalModals = lazy(() =>
  import("@/components/layout/GlobalModals").then((mod) => ({
    default: mod.GlobalModals,
  }))
);

const CookieBanner = lazy(() =>
  import("@/components/ui/CookieBanner").then((mod) => ({
    default: mod.CookieBanner,
  }))
);

const MobileBottomNav = lazy(() =>
  import("@/components/layout/MobileBottomNav").then((mod) => ({
    default: mod.MobileBottomNav,
  }))
);

/**
 * ClientLayoutWidgets — Client Component
 *
 * Agrupa los componentes interactivos globales no esenciales que no deben bloquear
 * el renderizado inicial del servidor (SSR) ni la descarga de bundles críticos
 * para First Contentful Paint (FCP) y Largest Contentful Paint (LCP).
 * Se difiere la carga de chunks via React.lazy hasta la primera interacción del usuario,
 * evitando que Next.js solicite los chunks durante la carga inicial crítica.
 */
export function ClientLayoutWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    const activate = () => {
      setMounted(true);
      cleanup();
    };

    const cleanup = () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("touchstart", activate);
      window.removeEventListener("scroll", activate);
    };

    window.addEventListener("pointerdown", activate, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchstart", activate, {
      passive: true,
      once: true,
    });
    window.addEventListener("scroll", activate, { passive: true, once: true });

    // Activación pasiva tras 6s si no hay interacción directa
    timerId = setTimeout(activate, 6000);

    return cleanup;
  }, []);

  return (
    <>
      <ScrollToTop />
      {mounted && (
        <Suspense fallback={null}>
          <GlobalModals />
          <CookieBanner />
          <MobileBottomNav />
        </Suspense>
      )}
    </>
  );
}
