"use client";
// ──────────────────────────────────────────────────────────────
// GLOBAL MODALS — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Client component que renderiza los modales globales de la app:
//   - CartDrawer: estado manejado por CartContext
//   - LoginModal: estado manejado por AuthContext.authModalContext
//
// Se monta una sola vez en (public)/layout.tsx para que estén
// disponibles en TODAS las páginas sin duplicar la instancia.
// ──────────────────────────────────────────────────────────────
import { useState, lazy, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const CartDrawer = lazy(() =>
  import("@/components/cart/CartDrawer").then((mod) => ({
    default: mod.CartDrawer,
  }))
);

const LoginModal = lazy(() =>
  import("@/components/cart/LoginModal").then((mod) => ({
    default: mod.LoginModal,
  }))
);

export function GlobalModals() {
  const { authModalContext, hideAuthModal } = useAuth();
  const { isCartOpen } = useCart();
  const [hasOpenedCart, setHasOpenedCart] = useState(false);

  if (isCartOpen && !hasOpenedCart) {
    setHasOpenedCart(true);
  }

  const shouldRenderCart = isCartOpen || hasOpenedCart;

  return (
    <Suspense fallback={null}>
      {shouldRenderCart && <CartDrawer />}
      {authModalContext !== null && (
        <LoginModal
          isOpen={authModalContext !== null}
          onClose={hideAuthModal}
          context={authModalContext ?? "generic"}
        />
      )}
    </Suspense>
  );
}
