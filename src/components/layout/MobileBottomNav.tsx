"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { env } from "@/env";

interface NavItem {
  href: string;
  icon: string;
  label: string;
  isSearch?: boolean;
}

const ITEMS: NavItem[] = [
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/buscar", icon: "search", label: "Buscar", isSearch: true },
  { href: "/contacto", icon: "mail", label: "Contacto" },
  { href: "/carrito", icon: "shopping_cart", label: "Carrito" },
];

/* ─────────────────────────────────────────────
   Medidas clave (en px):
   - Barra: h = 56 (fija en bottom-0)
   - Burbuja activa: Ø = 52, center = 16 px sobre la barra
   - Muesca (círculo blanco): Ø = 72, center en el borde superior de la barra
───────────────────────────────────────────── */
const BAR_H = 56; // px – altura de la barra oscura
const BUBBLE_D = 52; // px – diámetro de la burbuja activa
const NOTCH_D = 76; // px – diámetro del "mordisco" blanco
const BUBBLE_CENTER_ABOVE = 16; // px sobre el borde superior de la barra

// Posición bottom del centro de la burbuja
const BUBBLE_CENTER_Y = BAR_H + BUBBLE_CENTER_ABOVE;
// bottom del elemento (top edge) = centro - radio
const BUBBLE_BOTTOM = BUBBLE_CENTER_Y - BUBBLE_D / 2;
// La muesca se centra justo en el borde superior de la barra
const NOTCH_BOTTOM = BAR_H - NOTCH_D / 2;

interface MobileBottomNavProps {
  onSearchOpen?: () => void;
}

export function MobileBottomNav({ onSearchOpen }: MobileBottomNavProps) {
  const pathname = usePathname();
  const isHomeOnly = env.NEXT_PUBLIC_HOME_ONLY === "true";

  if (isHomeOnly) return null;

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 sm:hidden"
      style={{ height: BAR_H }}
      aria-label="Navegación principal"
    >
      {/* ── Barra oscura ── */}
      <div
        className="bg-primary absolute inset-x-0 bottom-0"
        style={{ height: BAR_H }}
        aria-hidden="true"
      />

      {/* ── Tabs ── */}
      <ul
        className="relative flex h-full items-stretch overflow-visible"
        style={{ height: BAR_H }}
      >
        {ITEMS.map((item) => {
          const isActive = item.isSearch
            ? false
            : item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li
              key={item.href}
              className="relative flex flex-1 items-center justify-center"
            >
              {/* ── Muesca blanca (notch) – crea el efecto cóncavo ── */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 rounded-full bg-white"
                  style={{
                    width: NOTCH_D,
                    height: NOTCH_D,
                    bottom: NOTCH_BOTTOM,
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                />
              )}

              {/* ── Burbuja elevada (activa) ── */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="bg-primary pointer-events-none absolute left-1/2 flex items-center justify-center rounded-full"
                  style={{
                    width: BUBBLE_D,
                    height: BUBBLE_D,
                    bottom: BUBBLE_BOTTOM,
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    boxShadow:
                      "0 8px 24px -4px rgba(20,48,103,0.45), 0 4px 10px -2px rgba(20,48,103,0.3)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-white"
                    style={{
                      fontSize: 22,
                      fontVariationSettings: "'FILL' 1",
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                </span>
              )}

              {/* ── Elemento clickeable ── */}
              {item.isSearch ? (
                <button
                  type="button"
                  onClick={onSearchOpen}
                  aria-label={item.label}
                  className={cn(
                    "relative z-[2] flex h-full w-full flex-col items-center justify-center gap-0.5 transition-opacity",
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  )}
                >
                  <span
                    className="material-symbols-outlined text-white/70"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-[2] flex h-full w-full flex-col items-center justify-center gap-0.5 transition-opacity",
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  )}
                >
                  <span
                    className="material-symbols-outlined text-white/70"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
