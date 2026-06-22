"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function AdminLoginLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando inicio de sesión"
      className="flex min-h-screen items-center justify-center p-5"
    >
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-white/5 dark:bg-slate-900">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Shimmer className="h-16 w-16 rounded-full" />
          <Shimmer className="h-7 w-40" />
          <Shimmer className="h-4 w-52" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-12 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-12 w-full rounded-lg" />
          </div>
          <Shimmer className="mt-2 h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
