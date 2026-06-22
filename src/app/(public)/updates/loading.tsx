"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function UpdateCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-start md:gap-6 md:p-6">
      <Shimmer className="aspect-video w-full rounded-xl md:h-40 md:w-60 md:flex-shrink-0" />
      <div className="flex flex-1 flex-col gap-3">
        <Shimmer className="h-5 w-24 rounded-full" />
        <Shimmer className="h-7 w-4/5" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <Shimmer className="mt-auto h-4 w-32" />
      </div>
    </div>
  );
}

export default function UpdatesLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando actualizaciones"
      className="mx-auto max-w-screen-xl px-5 py-10 md:px-8 md:py-16"
    >
      {/* Header */}
      <div className="mb-10 flex flex-col gap-3">
        <Shimmer className="h-12 w-64" />
        <Shimmer className="h-5 w-80" />
      </div>

      {/* Filter tabs */}
      <div className="mb-8 flex gap-3 overflow-x-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-28 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* Update cards */}
      <div className="flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <UpdateCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
