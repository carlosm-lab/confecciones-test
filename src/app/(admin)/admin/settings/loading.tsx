"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function SettingsSectionSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <Shimmer className="h-8 w-8 rounded-lg" />
        <Shimmer className="h-6 w-48" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-12 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Shimmer className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}

export default function AdminSettingsLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando configuración"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Shimmer className="h-8 w-44" />
        <Shimmer className="h-5 w-72" />
      </div>

      {/* Settings tabs */}
      <div className="flex gap-3 overflow-x-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-10 w-32 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* Settings sections */}
      <SettingsSectionSkeleton fields={4} />
      <SettingsSectionSkeleton fields={2} />
      <SettingsSectionSkeleton fields={6} />
    </div>
  );
}
