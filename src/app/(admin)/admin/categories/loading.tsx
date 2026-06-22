"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function CategoryRowSkeleton() {
  return (
    <tr className="border-b border-slate-100 dark:border-white/5">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Shimmer className="h-10 w-10 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-36" />
            <Shimmer className="h-3 w-24" />
          </div>
        </div>
      </td>
      <td className="p-4">
        <Shimmer className="h-6 w-20 rounded-full" />
      </td>
      <td className="p-4">
        <Shimmer className="h-4 w-10" />
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-8 w-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}

export default function AdminCategoriesLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando categorías"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-8 w-40" />
          <Shimmer className="h-5 w-56" />
        </div>
        <Shimmer className="h-10 w-40 rounded-lg" />
      </div>

      {/* Search */}
      <Shimmer className="h-10 w-72 rounded-lg" />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              {["Categoría", "Sector", "Productos", "Acciones"].map((col) => (
                <th key={col} className="p-4 text-left">
                  <Shimmer className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <CategoryRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
