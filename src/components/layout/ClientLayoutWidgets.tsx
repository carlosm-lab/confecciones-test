"use client";

import dynamic from "next/dynamic";

const GlobalModals = dynamic(
  () =>
    import("@/components/layout/GlobalModals").then((mod) => mod.GlobalModals),
  { ssr: false }
);

const CookieBanner = dynamic(
  () => import("@/components/ui/CookieBanner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

import { ScrollToTop } from "@/components/layout/ScrollToTop";

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
 */
export function ClientLayoutWidgets() {
  return (
    <>
      <ScrollToTop />
      <GlobalModals />
      <CookieBanner />
      <MobileBottomNav />
    </>
  );
}
