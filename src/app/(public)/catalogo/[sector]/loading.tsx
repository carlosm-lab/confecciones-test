"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <Shimmer className="aspect-[3/4] w-full" />
      <div className="flex flex-col gap-2 p-3">
        <Shimmer className="h-4 w-5/6" />
        <Shimmer className="h-4 w-2/3" />
        <Shimmer className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export default function SectorLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando productos"
      className="mx-auto max-w-screen-2xl px-5 py-8 md:px-8"
    >
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Shimmer className="h-4 w-12" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-32" />
      </div>

      {/* Hero section */}
      <div className="mb-10 flex flex-col gap-3">
        <Shimmer className="h-12 w-3/4" />
        <Shimmer className="h-5 w-full max-w-xl" />
        <Shimmer className="h-5 w-2/3 max-w-md" />
      </div>

      {/* Category chips */}
      <div className="mb-6 flex gap-3 overflow-x-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-24 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* Filters row */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Shimmer className="h-9 w-28 rounded-full" />
        <Shimmer className="h-9 w-28 rounded-full" />
        <Shimmer className="h-9 w-28 rounded-full" />
        <Shimmer className="ml-auto h-9 w-32 rounded-full" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
