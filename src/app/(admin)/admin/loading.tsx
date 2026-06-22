"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function StatCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <Shimmer className="h-4 w-24" />
        <Shimmer className="h-9 w-9 rounded-lg" />
      </div>
      <Shimmer className="h-8 w-20" />
      <Shimmer className="h-3 w-32" />
    </div>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 p-5 dark:border-white/5">
        <Shimmer className="h-6 w-40" />
      </div>
      {/* Rows */}
      <div className="flex flex-col divide-y divide-slate-100 p-2 dark:divide-white/5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-3 py-3">
            <Shimmer className="h-10 w-10 flex-shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Shimmer className="h-4 w-2/5" />
              <Shimmer className="h-3 w-1/4" />
            </div>
            <Shimmer className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-slate-900">
      <Shimmer className="mb-4 h-6 w-40" />
      <Shimmer className="flex-1 rounded-xl" />
    </div>
  );
}

export default function AdminDashboardLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando panel de control"
      className="mx-auto max-w-[1400px] space-y-6 pb-10 md:space-y-8"
    >
      {/* Heading */}
      <div>
        <Shimmer className="mb-2 h-8 w-48" />
        <Shimmer className="h-5 w-64" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="h-[400px]">
            <TableSkeleton rows={6} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="h-[350px]">
              <ChartSkeleton />
            </div>
            <div className="h-[350px]">
              <TableSkeleton rows={5} />
            </div>
          </div>
        </div>
        {/* Messages panel */}
        <div className="h-[400px] xl:h-[782px]">
          <TableSkeleton rows={8} />
        </div>
      </div>

      {/* Notifications link */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shimmer className="h-6 w-6 rounded" />
            <div className="flex flex-col gap-1">
              <Shimmer className="h-4 w-32" />
              <Shimmer className="h-3 w-56" />
            </div>
          </div>
          <Shimmer className="h-5 w-5 rounded" />
        </div>
      </div>
    </div>
  );
}
