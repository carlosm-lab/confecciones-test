"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATALOG_PAGES } from "@/data/catalog-pages";
import { cn } from "@/lib/utils";

export function CatalogSubNav() {
  const pathname = usePathname();

  return (
    <div className="bg-surface sticky top-[60px] z-40 w-full border-b border-gray-200 shadow-sm md:top-[72px]">
      <div className="mx-auto max-w-screen-2xl">
        <nav
          className="hide-scrollbar flex items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Navegación de categorías"
        >
          {/* Enlace "Todos" para ir al catálogo general */}
          <Link
            href="/catalogo"
            aria-current={pathname === "/catalogo" ? "page" : undefined}
            className={cn(
              "flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/catalogo"
                ? "bg-primary text-white"
                : "bg-surface-container hover:bg-surface-container-high text-gray-700"
            )}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              grid_view
            </span>
            Todos
          </Link>

          {/* Solo páginas de catálogo (no servicios) */}
          {CATALOG_PAGES.map((page) => {
            const isSector = page.slug === page.parentSector;
            const isActive = pathname === `/catalogo/${page.slug}`;

            return (
              <Link
                key={page.slug}
                href={`/catalogo/${page.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  // Separador visual antes de cada sector
                  isSector && "ml-3 border-l-2 border-gray-300 pl-5",
                  isActive
                    ? "bg-primary font-medium text-white"
                    : isSector
                      ? "bg-primary/10 text-primary hover:bg-primary/20 font-medium"
                      : "bg-surface-container hover:bg-surface-container-high font-normal text-gray-700"
                )}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  aria-hidden="true"
                >
                  {page.navIcon}
                </span>
                {page.navLabel}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
