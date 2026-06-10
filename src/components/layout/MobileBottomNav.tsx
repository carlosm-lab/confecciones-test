"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/env";

/*
 * Geometry: exact port of susonthapa/curved-bottom-navigation
 * FAB_CSS_TOP raised to 12 so bubble sits slightly lower (center at y=40, 16px into bar)
 */
const SVG_H = 80;
const BAR_Y = 24; // bar top in SVG coords (SVG_H - BAR_H)
const BAR_H = 56;
const BUBBLE_D = 56;
const BUBBLE_R = 28;
const FAB_CSS_TOP = 12; // +4 vs source → bubble center at y=40 (deeper in bar)
const NOTCH_Y = 64; // SVG_H - curveBottomOffset(16)
const CURVE_HALF = 56; // fabRadius * 2
const TOP_CTRL_X = 42; // fabRadius * 1.5
const TOP_CTRL_Y = BAR_Y + BUBBLE_R / 6; // ≈ 28.67 (absolute y)
const BOT_CTRL_X = 42;
const BOT_CTRL_Y = BUBBLE_R / 4; // 7

const NUM_TABS = 5;

/** Exact computeCurve() path — active tab shows concave notch */
function buildPath(w: number, cx: number): string {
  const lx = cx - CURVE_HALF;
  const rx = cx + CURVE_HALF;
  const cp1x = lx + TOP_CTRL_X,
    cp1y = TOP_CTRL_Y;
  const cp2x = cx - BOT_CTRL_X,
    cp2y = NOTCH_Y - BOT_CTRL_Y;
  const cp3x = cx + BOT_CTRL_X,
    cp3y = NOTCH_Y - BOT_CTRL_Y;
  const cp4x = rx - TOP_CTRL_X,
    cp4y = TOP_CTRL_Y;
  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${lx} ${BAR_Y}`,
    `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${cx} ${NOTCH_Y}`,
    `C ${cp3x} ${cp3y} ${cp4x} ${cp4y} ${rx} ${BAR_Y}`,
    `L ${w} ${BAR_Y}`,
    `L ${w} ${SVG_H}`,
    `Z`,
  ].join(" ");
}

/** Flat bar — used when no tab matches current route */
function buildFlatPath(w: number): string {
  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${w} ${BAR_Y}`,
    `L ${w} ${SVG_H}`,
    `Z`,
  ].join(" ");
}

// Order: Catálogo, Carrito, Inicio, Contacto, Perfil (user-specified)
const ITEMS = [
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/carrito", icon: "shopping_cart", label: "Carrito" },
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/contacto", icon: "mail", label: "Contacto" },
  { href: "/mi-cuenta", icon: "person", label: "Perfil" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);

  /*
   * Initialize navW from window.innerWidth immediately (not waiting for ResizeObserver).
   * This prevents the bar from disappearing after navigating through a 404 page
   * (which unmounts and remounts the (public) layout).
   */
  const [navW, setNavW] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [ready, setReady] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth > 0
  );

  const isHomeOnly = env.NEXT_PUBLIC_HOME_ONLY === "true";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Re-read exact element width (may differ from window.innerWidth on some devices)
    const w = el.getBoundingClientRect().width || window.innerWidth;
    if (w > 0) {
      window.requestAnimationFrame(() => {
        setNavW(w);
        setReady(true);
      });
    }
    const ro = new ResizeObserver(([entry]) => {
      const cw = entry.contentRect.width;
      if (cw > 0) {
        setNavW(cw);
        setReady(true);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (isHomeOnly) return null;

  /*
   * Active tab detection.
   * Returns -1 if the current pathname does NOT match any tab.
   * When -1 → flat bar (no notch, no bubble). Fixes the "Inicio falsely active" bug.
   */
  const activeIdx = ITEMS.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  // activeIdx === -1 means current page is not in the bottom nav

  const tabW = navW / NUM_TABS;
  const cx = activeIdx !== -1 ? (activeIdx + 0.5) * tabW : 0;
  const pathD = ready
    ? activeIdx !== -1
      ? buildPath(navW, cx)
      : buildFlatPath(navW)
    : "";
  const bubbleLeft = cx - BUBBLE_R;

  return (
    <nav
      ref={containerRef}
      className="fixed right-0 bottom-0 left-0 z-50 sm:hidden"
      style={{ height: SVG_H, overflow: "visible" }}
      aria-label="Navegación principal móvil"
    >
      {/* Bar with concave notch (or flat when no active tab) */}
      {ready && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          width={navW}
          height={SVG_H}
          viewBox={`0 0 ${navW} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter:
              "drop-shadow(0 -3px 12px rgba(20,48,103,0.20)) drop-shadow(0 -1px 4px rgba(20,48,103,0.10))",
          }}
        >
          <path
            d={pathD}
            fill="var(--color-primary)"
            style={{ transition: "d 0.38s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
      )}

      {/*
       * FAB bubble — same color as bar (var(--color-primary)), no boxShadow border.
       * Icon is white to contrast against the dark bar color.
       * Only rendered when a tab is active (activeIdx !== -1).
       */}
      {ready && activeIdx !== -1 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute flex items-center justify-center rounded-full"
          style={{
            width: BUBBLE_D,
            height: BUBBLE_D,
            top: FAB_CSS_TOP,
            left: bubbleLeft,
            background: "var(--color-primary)",
            transition: "left 0.38s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
          >
            {ITEMS[activeIdx].icon}
          </span>
        </span>
      )}

      {/* Clickable tab zones */}
      <ul
        className="absolute right-0 bottom-0 left-0 flex"
        style={{ height: BAR_H }}
      >
        {ITEMS.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <li key={item.href + idx} className="flex flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isActive ? -1 : 0}
                className="flex h-full w-full items-center justify-center"
                style={{
                  opacity: isActive ? 0 : 1,
                  pointerEvents: isActive ? "none" : "auto",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 22, color: "rgba(255,255,255,0.65)" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
