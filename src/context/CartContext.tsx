"use client";
// ──────────────────────────────────────────────────────────────
// CONTEXTO DEL CARRITO — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// El corazón de la lógica de ventas. Maneja:
//   - Persistencia en localStorage (guest-first, sin tabla de carritos)
//   - Sincronización con Supabase (user_carts) cuando hay usuario logueado
//   - Revalidación de precios cada 60 segundos
//   - Sync multi-pestaña via StorageEvent
//   - Expiración automática del carrito (7 días de inactividad)
//
// ESTRATEGIA "GUEST-FIRST":
// El carrito vive en localStorage siempre. Si el usuario se loguea:
//   - Carrito local vacío → se hidrata desde DB
//   - Carrito local CON items → SOBREESCRIBE la DB
// Esto prioriza la experiencia del guest que agrega productos
// antes de loguearse (el caso más común en este tipo de tienda).
//
// REVALIDACIÓN DE PRECIOS:
// Cada 60 segundos (si el carrito tiene items y la pestaña es visible),
// se consulta Supabase para verificar que los precios sean correctos
// y que los productos sigan activos. Si un producto fue desactivado
// por el admin, se elimina del carrito con una notificación.
// ──────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { logger } from "@/lib/logger";
import { useDebounce } from "@/hooks/useDebounce";
import {
  CART_SELECT_COLUMNS,
  MAX_CART_QUANTITY,
  MAX_TOTAL_ITEMS,
  STORAGE_CART_KEY,
  STORAGE_CART_TIMESTAMP_KEY,
  STORAGE_CART_EXPIRED_KEY,
} from "@/lib/constants";
import type { ShippingInfo } from "@/lib/shipping";
import { useNotifications } from "@/context/NotificationContext";

// ── Tipos ─────────────────────────────────────────────────────

interface CartProduct {
  id: string;
  name: string;
  price: number;
  old_price?: number | null;
  image_path?: string | null;
  images?: string[] | null;
  slug?: string | null;
  offer_ends_at?: string | null;
  offer_starts_at?: string | null;
  is_active?: boolean;
  sector?: string | null;
  category?: string | null;
  categories?: { name: string; catalog: string } | null;
  /** Talla seleccionada por el usuario */
  selectedSize?: string | null;
  /** Modo de precio: 'normal' | 'wholesale' | 'labor' */
  priceMode?: "normal" | "wholesale" | "labor";
}

interface CartItem {
  id: string; // UUID local de la línea del carrito
  product: CartProduct;
  quantity: number;
  color: string | null;
  note: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (
    product: CartProduct,
    quantity?: number,
    color?: string | null,
    note?: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  refreshCartPrices: () => Promise<void>;
  isRefreshingPrices: boolean;
  arePricesStale: boolean;
  consecutiveRefreshFailures: number;
  /** Información de envío seleccionada por el usuario */
  shippingInfo: ShippingInfo | null;
  setShippingInfo: (info: ShippingInfo | null) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Estado por defecto — carrito vacío para cuando CartProvider aún no se ha montado
const CART_EMPTY_DEFAULT: CartContextValue = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  refreshCartPrices: async () => {},
  isRefreshingPrices: false,
  arePricesStale: false,
  consecutiveRefreshFailures: 0,
  shippingInfo: null,
  setShippingInfo: () => {},
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  // Null-safe: devuelve carrito vacío cuando CartProvider aún no se ha montado
  return ctx ?? CART_EMPTY_DEFAULT;
};
// Export types
export type { CartProduct, CartItem, CartContextValue };
export { CartContext };
