"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function ProductDetailLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando producto"
      className="mx-auto max-w-screen-xl px-5 py-8 md:px-8"
    >
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <Shimmer className="h-4 w-12" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-36" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: image gallery */}
        <div className="flex flex-col gap-3">
          <Shimmer className="aspect-square w-full rounded-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Shimmer key={i} className="h-20 w-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Right: product info */}
        <div className="flex flex-col gap-5">
          {/* Badge */}
          <Shimmer className="h-6 w-24 rounded-full" />
          {/* Title */}
          <Shimmer className="h-10 w-4/5" />
          <Shimmer className="h-8 w-3/5" />
          {/* Price */}
          <Shimmer className="h-12 w-36" />
          {/* Description */}
          <div className="flex flex-col gap-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
            <Shimmer className="h-4 w-4/6" />
          </div>
          {/* Variants */}
          <div className="flex flex-col gap-2">
            <Shimmer className="h-5 w-24" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Shimmer key={i} className="h-10 w-16 rounded-lg" />
              ))}
            </div>
          </div>
          {/* Size selector */}
          <div className="flex flex-col gap-2">
            <Shimmer className="h-5 w-20" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Shimmer key={i} className="h-10 w-14 rounded-lg" />
              ))}
            </div>
          </div>
          {/* CTA buttons */}
          <div className="mt-4 flex flex-col gap-3">
            <Shimmer className="h-14 w-full rounded-xl" />
            <Shimmer className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
