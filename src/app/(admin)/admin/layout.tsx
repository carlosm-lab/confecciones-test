"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminFooterBar from "@/components/admin/AdminFooterBar";

// Spinner reutilizable
function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary/20 border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Verificando acceso...
        </p>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Evita hydration mismatch: servidor y cliente renderizan lo mismo
  // hasta que el componente monta en el browser.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration guard
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isLoginPage) return;
    if (!loading) {
      if (!user) {
        router.replace("/admin/login");
      } else if (!isAdmin) {
        router.replace("/");
      }
    }
  }, [mounted, user, isAdmin, loading, router, isLoginPage]);

  // Login page renders without shell
  if (isLoginPage) return <>{children}</>;

  // Antes de montar en el cliente → siempre spinner (igual en server y client)
  if (!mounted || loading) return <LoadingScreen />;

  // No autenticado o sin rol admin → spinner mientras redirige
  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="border-primary/20 border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      {/* Sidebar Desktop */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <AdminFooterBar />
    </div>
  );
}
