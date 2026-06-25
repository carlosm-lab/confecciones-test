"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function DevolucionesLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando política de devoluciones y cambios"
      className="mx-auto max-w-screen-md px-5 py-12 md:px-8 md:py-20"
    >
      <Shimmer className="mb-4 h-12 w-3/4" />
      <Shimmer className="mb-10 h-5 w-56" />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="mb-8">
          <Shimmer className="mb-3 h-7 w-2/3" />
          <Shimmer className="mb-2 h-4 w-full" />
          <Shimmer className="mb-2 h-4 w-5/6" />
          <Shimmer className="mb-2 h-4 w-full" />
          <Shimmer className="h-4 w-4/6" />
        </div>
      ))}
    </div>
  );
}
