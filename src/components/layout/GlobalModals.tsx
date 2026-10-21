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
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);

const LoginModal = dynamic(
  () => import("@/components/cart/LoginModal").then((mod) => mod.LoginModal),
  { ssr: false }
);

export function GlobalModals() {
  const { authModalContext, hideAuthModal } = useAuth();

  return (
    <>
      <CartDrawer />
      <LoginModal
        isOpen={authModalContext !== null}
        onClose={hideAuthModal}
        context={authModalContext ?? "generic"}
      />
    </>
  );
}
