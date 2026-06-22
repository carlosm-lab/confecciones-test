"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function NotificationCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-5 w-32" />
        </div>
        <Shimmer className="h-6 w-20 rounded-full" />
      </div>
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-4/5" />
      <div className="flex items-center justify-between pt-1">
        <Shimmer className="h-3 w-28" />
        <div className="flex gap-2">
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function AdminNotificacionesLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando notificaciones"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-5 w-64" />
        </div>
        <Shimmer className="h-10 w-44 rounded-lg" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-slate-900"
          >
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-8 w-12" />
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      {/* Notification cards */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <NotificationCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
