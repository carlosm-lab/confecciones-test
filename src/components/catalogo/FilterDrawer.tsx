"use client";

import { useEffect, useRef, useCallback } from "react";
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

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function FilterDrawer({
  isOpen,
  onClose,
  groups,
  selected,
  onFilterChange,
  onClearAll,
}: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus first focusable element when opening
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector(
        FOCUSABLE_SELECTOR
      ) as HTMLElement | null;
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        drawerRef.current.focus();
      }
    }
  }, [isOpen]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Focus trap + Escape to close
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusableElements = Array.from(
        drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

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
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros de productos"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
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
