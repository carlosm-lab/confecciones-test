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
import { ReactNode, useState, useEffect, lazy, Suspense } from "react";

const Toaster = lazy(() =>
  import("react-hot-toast").then((mod) => ({ default: mod.Toaster }))
);
const AuthProvider = lazy(() =>
  import("@/context/AuthContext").then((mod) => ({ default: mod.AuthProvider }))
);
const CartProvider = lazy(() =>
  import("@/context/CartProvider").then((mod) => ({
    default: mod.CartProvider,
  }))
);
const FavoritesProvider = lazy(() =>
  import("@/context/FavoritesProvider").then((mod) => ({
    default: mod.FavoritesProvider,
  }))
);
const ConfirmProvider = lazy(() =>
  import("@/context/ConfirmContext").then((mod) => ({
    default: mod.ConfirmProvider,
  }))
);
const NotificationProvider = lazy(() =>
  import("@/context/NotificationContext").then((mod) => ({
    default: mod.NotificationProvider,
  }))
);

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
    }, 20000);

    return cleanup;
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

export function DeferredProviders({ children }: DeferredProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    const activate = () => {
      setMounted(true);
      cleanup();
    };

    const cleanup = () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("touchstart", activate);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("keydown", activate);
    };

    window.addEventListener("pointerdown", activate, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchstart", activate, {
      passive: true,
      once: true,
    });
    window.addEventListener("scroll", activate, { passive: true, once: true });
    window.addEventListener("keydown", activate, { passive: true, once: true });

    // Activación en segundo plano tras 60s si no hubo interacción previa del usuario
    timerId = setTimeout(activate, 60000);

    return cleanup;
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={children}>
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
    </Suspense>
  );
}
