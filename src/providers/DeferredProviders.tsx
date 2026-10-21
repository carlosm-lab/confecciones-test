"use client";
// ──────────────────────────────────────────────────────────────
// DEFERRED PROVIDERS
// ──────────────────────────────────────────────────────────────
// Este componente agrupa todos los providers que dependen de
// Supabase, react-hot-toast u otras dependencias pesadas.
//
// Se carga LAZY con next/dynamic({ ssr: false }) desde Providers/index.tsx,
// lo que excluye Supabase y react-hot-toast del bundle inicial de JS
// y reduce el tiempo de Script Evaluation en el critical path del FCP/LCP.
//
// SEGURIDAD DE LOS FALLBACKS:
// Todos los hooks de estos contextos tienen fallbacks null-safe:
//   - useAuth()         → AUTH_GUEST_DEFAULT (usuario anónimo)
//   - useCart()         → CART_EMPTY_DEFAULT  (carrito vacío)
//   - useFavorites()    → fallback seguro
//   - useConfirm()      → async () => false
//   - useNotifications()→ useNotificationsSafe con noop
//
// Durante la ventana de carga (<100ms post-hidratación de React),
// los componentes que usan estos hooks ven los valores por defecto.
// ──────────────────────────────────────────────────────────────
import { ReactNode, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { NotificationProvider } from "@/context/NotificationContext";

interface DeferredProvidersProps {
  children: ReactNode;
}

function LazyToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setMounted(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", handleInteraction);
      clearTimeout(timer);
    };

    window.addEventListener("click", handleInteraction, { passive: true });

    const timer = setTimeout(() => {
      setMounted(true);
      cleanup();
    }, 8000);

    return cleanup;
  }, []);

  if (!mounted) return null;

  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#f8fafc",
          fontSize: "14px",
          fontFamily: "var(--font-sans, Manrope, sans-serif)",
        },
        success: {
          iconTheme: {
            primary: "#143067",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}

export function DeferredProviders({ children }: DeferredProvidersProps) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <FavoritesProvider>
            <ConfirmProvider>
              {children}
              <LazyToaster />
            </ConfirmProvider>
          </FavoritesProvider>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
