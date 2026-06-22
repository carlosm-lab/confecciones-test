"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function MessageItemSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Shimmer className="h-10 w-10 flex-shrink-0 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-3 w-48" />
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
      <div className="flex gap-2 pt-1">
        <Shimmer className="h-8 w-24 rounded-lg" />
        <Shimmer className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export default function AdminMessagesLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando mensajes"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-8 w-36" />
          <Shimmer className="h-5 w-52" />
        </div>
        <Shimmer className="h-6 w-24 rounded-full" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Message list */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <MessageItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
