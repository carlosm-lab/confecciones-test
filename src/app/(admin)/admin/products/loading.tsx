"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function ProductRowSkeleton() {
  return (
    <tr className="border-b border-slate-100 dark:border-white/5">
      <td className="p-4">
        <Shimmer className="h-12 w-12 rounded-lg" />
      </td>
      <td className="p-4">
        <div className="flex flex-col gap-1.5">
          <Shimmer className="h-4 w-40" />
          <Shimmer className="h-3 w-24" />
        </div>
      </td>
      <td className="p-4">
        <Shimmer className="h-6 w-20 rounded-full" />
      </td>
      <td className="p-4">
        <Shimmer className="h-4 w-16" />
      </td>
      <td className="p-4">
        <Shimmer className="h-4 w-12" />
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

export default function AdminProductsLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando productos"
      className="flex flex-col gap-6"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-8 w-40" />
          <Shimmer className="h-5 w-56" />
        </div>
        <Shimmer className="h-10 w-36 rounded-lg" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Shimmer className="h-10 w-64 rounded-lg" />
        <Shimmer className="h-10 w-36 rounded-lg" />
        <Shimmer className="h-10 w-36 rounded-lg" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              {[
                "Foto",
                "Nombre",
                "Categoría",
                "Precio",
                "Stock",
                "Acciones",
              ].map((col) => (
                <th key={col} className="p-4 text-left">
                  <Shimmer className="h-4 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Shimmer className="h-4 w-32" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-8 w-8 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
