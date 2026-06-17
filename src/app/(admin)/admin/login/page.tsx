"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { user, isAdmin, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="border-primary/20 border-t-primary h-10 w-10 animate-spin rounded-full border-4"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-sm">
        {/* Logo & Brand */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4 h-16 w-16">
            <Image
              src="/icon.png"
              alt="Confecciones Liss"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-center text-2xl font-black text-slate-900 dark:text-white">
            Confecciones Liss
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            Panel de Administración
          </p>
        </div>

        {/* Card */}
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-white/5">
          <div className="text-center">
            <h2 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
              Iniciar sesión
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Solo los administradores autorizados pueden acceder.
            </p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="hover:border-primary/30 group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-800 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            {/* FIX P1: icon extracted to /public/icons/google.svg per AGENTS.md §10.2 */}
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="shrink-0"
              aria-hidden="true"
            />
            <span>Continuar con Google</span>
          </button>

          <p className="max-w-xs text-center text-xs text-slate-400">
            Al ingresar, se verificará tu cuenta. Solo cuentas con rol{" "}
            <span className="text-primary font-bold">admin</span> podrán acceder
            al panel.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Confecciones Liss — Panel Privado
        </p>
      </div>
    </div>
  );
}
