"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <Shimmer className="aspect-[4/3] w-full" />
      <div className="flex flex-col gap-3 p-4 md:p-5">
        <Shimmer className="h-6 w-2/3" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-2">
          <Shimmer className="h-5 w-24 rounded-full" />
          <Shimmer className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function CatalogoLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando catálogo"
      className="mx-auto max-w-screen-2xl px-5 py-10 md:px-8 md:py-14"
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3">
        <Shimmer className="h-10 w-64" />
        <Shimmer className="h-5 w-80" />
      </div>

      {/* Stats bar */}
      <div className="mb-8 flex items-center gap-4">
        <Shimmer className="h-7 w-32 rounded-full" />
        <Shimmer className="h-7 w-32 rounded-full" />
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
