"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientEnv } from "@/lib/clientEnv";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icons/Icon";

const ITEMS = [
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/servicios", icon: "design_services", label: "Servicios" },
  { href: "/empresa", icon: "business", label: "Empresa" },
  { href: "/contacto", icon: "mail", label: "Contacto" },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const [scrollVisible, setScrollVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isHomeOnly = clientEnv.NEXT_PUBLIC_HOME_ONLY === "true";

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      if (delta > 10) {
        setScrollVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (delta < -10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isHomeOnly) return null;

  return (
    <nav
      data-mobile-bottom-nav
      className={cn(
        "nav-scroll-hide pb-safe fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white/90 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md select-none sm:hidden dark:border-white/5 dark:bg-slate-900/85",
        !scrollVisible && "nav-scroll-hidden-bottom"
      )}
      aria-label="Navegación principal móvil"
    >
      <div className="flex h-16 items-center justify-around">
        {ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? !pathname || pathname === "/" || pathname === ""
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex h-full w-full flex-col items-center justify-center gap-0.5 transition-colors",
                isActive
                  ? "text-primary font-bold"
                  : "text-slate-700 hover:text-slate-900 dark:text-slate-300"
              )}
            >
              <Icon
                name={item.icon}
                size={22}
                strokeWidth={isActive ? 2.5 : 1.75}
                aria-hidden="true"
                className={cn(
                  "transition-all duration-200",
                  isActive
                    ? "text-primary scale-110 opacity-100"
                    : "scale-100 text-slate-600 opacity-40 hover:opacity-80"
                )}
              />
              <span aria-hidden="true" className="text-[10px] font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
