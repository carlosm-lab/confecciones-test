"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function UserRowSkeleton() {
  return (
    <tr className="border-b border-slate-100 dark:border-white/5">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Shimmer className="h-10 w-10 flex-shrink-0 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-3 w-48" />
          </div>
        </div>
      </td>
      <td className="p-4">
        <Shimmer className="h-6 w-20 rounded-full" />
      </td>
      <td className="p-4">
        <Shimmer className="h-4 w-24" />
      </td>
      <td className="p-4">
        <Shimmer className="h-4 w-20" />
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

export default function AdminUsuariosLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando usuarios"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-8 w-36" />
          <Shimmer className="h-5 w-52" />
        </div>
        <Shimmer className="h-10 w-36 rounded-lg" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-slate-900"
          >
            <Shimmer className="h-3 w-24" />
            <Shimmer className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3">
        <Shimmer className="h-10 w-72 rounded-lg" />
        <Shimmer className="h-10 w-36 rounded-lg" />
        <Shimmer className="h-10 w-36 rounded-lg" />
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              {["Usuario", "Rol", "Registro", "Último acceso", "Acciones"].map(
                (col) => (
                  <th key={col} className="p-4 text-left">
                    <Shimmer className="h-4 w-20" />
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <UserRowSkeleton key={i} />
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
