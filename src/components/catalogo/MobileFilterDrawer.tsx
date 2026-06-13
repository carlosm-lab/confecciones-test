"use client";

/**
 * MobileFilterDrawer — Catálogo de Confecciones Liss
 * Réplica exacta del MobileFilterDrawer de Padilla Store, adaptada a TypeScript.
 * Slide-in desde la derecha, contiene Sort + Categorías con Iconos + Ofertas + Footer.
 */

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { FilterGroup } from "@/data/types";
import type { ActiveFilters } from "./FilterSidebar";

export type SortOption = "best-selling" | "newest" | "price-low" | "price-high";

const SORT_OPTIONS: { value: SortOption; label: string; icon: string }[] = [
  { value: "best-selling", label: "Recomendados", icon: "trending_up" },
  { value: "newest", label: "Más Nuevos", icon: "schedule" },
  { value: "price-low", label: "Menor a Mayor Precio", icon: "arrow_upward" },
  {
    value: "price-high",
    label: "Mayor a Menor Precio",
    icon: "arrow_downward",
  },
];

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categoriesGroup: FilterGroup;
  categoryChips?: { label: string; icon: string }[];
  activeFilters: ActiveFilters;
  onFilterToggle: (field: string, value: string) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (v: boolean) => void;
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  totalCount: number;
}

function getCategoryIcon(
  optionLabel: string,
  categoryChips: { label: string; icon: string }[] = [],
  fallbackIcon: string = "checkroom"
): string {
  const cleanLabel = optionLabel.toLowerCase();
  const found = categoryChips.find(
    (chip) =>
      cleanLabel.includes(chip.label.toLowerCase()) ||
      chip.label.toLowerCase().includes(cleanLabel)
  );
  return found ? found.icon : fallbackIcon;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  categoriesGroup,
  categoryChips = [],
  activeFilters,
  onFilterToggle,
  onSaleOnly,
  setOnSaleOnly,
  sortBy,
  setSortBy,
  hasActiveFilters,
  onClearFilters,
  totalCount,
}: MobileFilterDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const field = categoriesGroup.filterField;
  const selected = activeFilters[field] ?? [];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 cursor-pointer bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-[22rem] transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-[var(--space-lg)] py-[var(--space-md)]">
          <h2
            id="filter-drawer-title"
            className="font-sans font-bold text-[var(--text-lg)] text-slate-900"
          >
            Filtros y Orden
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-primary rounded-lg p-[var(--space-xs)] text-slate-500 transition-colors"
            aria-label="Cerrar filtros"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-[var(--space-lg)] overflow-y-auto px-[var(--space-lg)] py-[var(--space-lg)]">
          {/* Sort */}
          <div>
            <h3
              id="sort-label"
              className="mb-[var(--space-sm)] font-sans font-bold tracking-wider text-[var(--text-sm)] text-slate-900 uppercase"
            >
              Ordenar por
            </h3>
            <div
              role="radiogroup"
              aria-labelledby="sort-label"
              className="flex flex-col gap-[0.25rem]"
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={sortBy === opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={cn(
                    "flex w-full items-center justify-start gap-[var(--space-sm)] rounded-lg px-[var(--space-sm)] py-[var(--space-sm)] transition-all",
                    sortBy === opt.value
                      ? "bg-primary text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "var(--icon-md)" }}
                    aria-hidden="true"
                  >
                    {opt.icon}
                  </span>
                  <span
                    className={cn(
                      "text-[var(--text-sm)]",
                      sortBy === opt.value ? "font-semibold" : "font-medium"
                    )}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200" />

          {/* Categories */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-sans font-bold tracking-wider text-[var(--text-sm)] text-slate-900 uppercase">
              Categorías
            </h3>
            <div className="flex flex-col gap-[0.25rem]">
              {categoriesGroup.options.map((opt) => {
                const isActive = selected.includes(opt.value);
                const icon = getCategoryIcon(
                  opt.label,
                  categoryChips,
                  categoriesGroup.icon ?? "checkroom"
                );

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onFilterToggle(field, opt.value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-[var(--space-sm)] py-[var(--space-sm)] transition-all",
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "var(--icon-md)" }}
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                      <span
                        className={cn(
                          "text-[var(--text-sm)]",
                          isActive ? "font-semibold" : "font-medium"
                        )}
                      >
                        {opt.label}
                      </span>
                    </div>
                    {isActive && (
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "var(--icon-sm)" }}
                        aria-hidden="true"
                      >
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200" />

          {/* Promociones */}
          <div>
            <h3 className="mb-[var(--space-sm)] font-sans font-bold tracking-wider text-[var(--text-sm)] text-slate-900 uppercase">
              Promociones
            </h3>
            <label className="group flex cursor-pointer items-center gap-[var(--space-sm)] px-[var(--space-sm)] py-[var(--space-sm)]">
              <div className="group-hover:border-primary relative flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white transition-colors">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                />
                <div className="bg-primary pointer-events-none absolute inset-0 flex items-center justify-center rounded opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <span className="group-hover:text-primary cursor-pointer text-[var(--text-sm)] text-slate-600 transition-colors select-none">
                Solo Ofertas
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-[var(--space-sm)] border-t border-slate-200 px-[var(--space-lg)] py-[var(--space-md)]">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onClearFilters();
                setSortBy("best-selling");
              }}
              className="text-primary flex-1 rounded-xl border border-slate-200 py-[var(--space-sm)] font-semibold text-[var(--text-sm)] transition-colors hover:bg-slate-50"
            >
              Limpiar todo
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 flex-1 rounded-xl py-[var(--space-sm)] font-semibold text-[var(--text-sm)] text-white transition-colors"
          >
            Ver {totalCount} prenda{totalCount !== 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </>
  );
}
