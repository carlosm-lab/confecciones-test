"use client";

import { useEffect, useRef } from "react";
import { FilterSidebar } from "./FilterSidebar";
import type { FilterGroup } from "@/data/types";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onFilterChange: (groupLabel: string, values: string[]) => void;
  onClearAll: () => void;
}

export function FilterDrawer({
  isOpen,
  onClose,
  groups,
  selected,
  onFilterChange,
  onClearAll,
}: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Focus trap: return focus on close
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const totalActive = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros de productos"
        tabIndex={-1}
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-primary font-serif text-lg font-bold">Filtros</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterSidebar
            groups={groups}
            selected={selected}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-primary w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Ver resultados
            {totalActive > 0 && ` (${totalActive} filtros)`}
          </button>
        </div>
      </div>
    </>
  );
}
