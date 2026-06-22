"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm">
      <Shimmer className="h-12 w-12 rounded-full" />
      <Shimmer className="h-6 w-3/4" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
      <Shimmer className="mt-2 h-8 w-28 rounded-full" />
    </div>
  );
}

export default function ServiciosLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando servicios"
      className="mx-auto max-w-screen-2xl px-5 py-10 md:px-8 md:py-16"
    >
      {/* Hero */}
      <div className="mb-16 flex flex-col items-center gap-5 text-center">
        <Shimmer className="h-6 w-32 rounded-full" />
        <Shimmer className="h-14 w-3/4 max-w-xl" />
        <Shimmer className="h-14 w-2/4 max-w-lg" />
        <Shimmer className="h-5 w-full max-w-2xl" />
        <Shimmer className="h-5 w-4/5 max-w-xl" />
        <div className="flex gap-4">
          <Shimmer className="h-12 w-40 rounded-md" />
          <Shimmer className="h-12 w-40 rounded-md" />
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>

      {/* Process steps */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <Shimmer className="h-10 w-64" />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Shimmer className="h-16 w-16 rounded-full" />
              <Shimmer className="h-5 w-28" />
              <Shimmer className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
