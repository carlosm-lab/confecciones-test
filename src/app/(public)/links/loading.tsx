"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function LinkCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm md:p-5">
      <Shimmer className="h-14 w-14 flex-shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col gap-2">
        <Shimmer className="h-5 w-48" />
        <Shimmer className="h-4 w-32" />
      </div>
      <Shimmer className="h-8 w-8 flex-shrink-0 rounded-full" />
    </div>
  );
}

export default function LinksLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando links"
      className="mx-auto flex max-w-md flex-col items-center px-5 py-12 md:py-20"
    >
      {/* Profile header */}
      <Shimmer className="mb-4 h-24 w-24 rounded-full" />
      <Shimmer className="mb-2 h-7 w-40" />
      <Shimmer className="mb-8 h-5 w-56" />

      {/* Social icons row */}
      <div className="mb-8 flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="h-10 w-10 rounded-full" />
        ))}
      </div>

      {/* Link cards */}
      <div className="flex w-full flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <LinkCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
