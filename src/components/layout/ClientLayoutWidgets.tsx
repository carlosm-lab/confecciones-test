"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const GlobalModals = dynamic(
  () =>
    import("@/components/layout/GlobalModals").then((mod) => mod.GlobalModals),
  { ssr: false }
);

const CookieBanner = dynamic(
  () => import("@/components/ui/CookieBanner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

const MobileBottomNav = dynamic(
  () =>
    import("@/components/layout/MobileBottomNav").then(
      (mod) => mod.MobileBottomNav
    ),
  { ssr: false }
);

/**
 * ClientLayoutWidgets — Client Component
 *
 * Agrupa los componentes interactivos globales no esenciales que no deben bloquear
 * el renderizado inicial del servidor (SSR) ni la descarga de bundles críticos
 * para First Contentful Paint (FCP) y Largest Contentful Paint (LCP).
 * Se difiere el montaje de modales, cookies y barra inferior hasta la primera
 * interacción del usuario para eliminar long tasks de TBT y contención de red en el inicio.
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
        <>
          <GlobalModals />
          <CookieBanner />
          <MobileBottomNav />
        </>
      )}
    </>
  );
}
