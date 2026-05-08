"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = pages.filter((page) => {
    if (totalPages <= 5) return true;
    if (page === 1 || page === totalPages) return true;
    if (Math.abs(page - currentPage) <= 1) return true;
    return false;
  });

  const pagesWithEllipsis: (number | "ellipsis")[] = [];
  visiblePages.forEach((page, index) => {
    if (index > 0 && page - visiblePages[index - 1] > 1) {
      pagesWithEllipsis.push("ellipsis");
    }
    pagesWithEllipsis.push(page);
  });

  return (
    <nav
      aria-label="Paginación"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="material-symbols-outlined text-sm" aria-hidden="true">
          chevron_left
        </span>
      </button>

      {pagesWithEllipsis.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="mx-1 text-gray-400"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange?.(item)}
            aria-current={currentPage === item ? "page" : undefined}
            aria-label={`Página ${item}`}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded text-sm font-medium transition-colors",
              currentPage === item
                ? "bg-primary text-white"
                : "hover:bg-surface-container-low border border-gray-200 text-gray-700"
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="material-symbols-outlined text-sm" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </nav>
  );
}
