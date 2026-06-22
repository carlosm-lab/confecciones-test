"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function MantenimientoLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando"
      className="flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center px-5 py-20 text-center"
    >
      <Shimmer className="mb-6 h-24 w-24 rounded-full" />
      <Shimmer className="mb-4 h-10 w-72" />
      <Shimmer className="mb-2 h-5 w-96" />
      <Shimmer className="mb-8 h-5 w-80" />
      <Shimmer className="h-12 w-48 rounded-md" />
    </div>
  );
}
