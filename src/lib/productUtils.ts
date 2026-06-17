// ──────────────────────────────────────────────────────────────
// UTILIDADES DE OFERTAS / PROMOCIONES
// ──────────────────────────────────────────────────────────────
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Tipos de oferta disponibles.
 * 'personalizada' puede tener N reglas, el resto máximo 1 por producto.
 */
export type OfferType =
  | "nuevos_clientes"
  | "clientes_frecuentes"
  | "por_talla"
  | "solo_en_linea"
  | "solo_en_taller"
  | "transferencia"
  | "personalizada";

export const OFFER_TYPE_LABELS: Record<OfferType, string> = {
  nuevos_clientes: "Solo nuevos clientes",
  clientes_frecuentes: "Solo clientes frecuentes",
  por_talla: "Por talla específica",
  solo_en_linea: "Solo compra en línea",
  solo_en_taller: "Solo compra en taller",
  transferencia: "Con pago por transferencia",
  personalizada: "Tipo personalizado",
};

/** Orden de visualización en la UI */
export const OFFER_TYPE_ORDER: OfferType[] = [
  "nuevos_clientes",
  "clientes_frecuentes",
  "por_talla",
  "solo_en_linea",
  "solo_en_taller",
  "transferencia",
  "personalizada",
];

/** Mapa la tabla `product_offer_rules` de Supabase */
export interface ProductOfferRule {
  id?: string;
  product_id?: string;
  offer_type: OfferType;
  /** Solo cuando offer_type === 'personalizada' */
  custom_label?: string | null;
  /** Precio especial de esta oferta */
  offer_price: number;
  is_active?: boolean;
  created_at?: string;
}

export interface Product {
  id?: string;
  name?: string;
  price?: number | string;
  old_price?: number | string | null;
  offer_starts_at?: string | null;
  offer_ends_at?: string | null;
  /** Tipo de oferta (campo legacy — usar offer_rules para multi-tipo). */
  offer_type?: OfferType | null;
  /** Reglas de oferta múltiples (tabla product_offer_rules) */
  offer_rules?: ProductOfferRule[];
  image_path?: string | null;
  images?: string[];
  category?: string | null;
  category_id?: string | null;
  /** Campo virtual (join con categories) — NO columna real en DB */
  catalog?: string | null;
  tags?: string[];
  description?: string | null;
  short_description?: string | null;
  is_active?: boolean;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  categories?: { name: string; catalog?: string } | null;
  // Campos del catálogo público
  sector?: string | null;
  badge_text?: string | null;
  price_suffix?: string | null;
  tallas?: string[] | null;
  colores?: { name: string; hex: string }[] | null;
  material?: string | null;
  caracteristicas?: string[] | null;
  // Precios avanzados
  /** Precio por mayoreo (null = no aplica mayoreo) */
  wholesale_price?: number | null;
  /** Cantidad mínima para precio mayoreo (mínimo 2) */
  wholesale_min_qty?: number | null;
  /** Precio solo mano de obra (cliente trae la tela) */
  labor_price?: number | null;
}

/**
 * Determina si un producto tiene una oferta activa AHORA.
 */
const isOfferActive = (product: Product): boolean => {
  if (!product) return false;
  const now = new Date();
  const hasOffer =
    product.old_price && Number(product.old_price) > Number(product.price);
  if (!hasOffer) return false;

  if (product.offer_starts_at && new Date(product.offer_starts_at) > now)
    return false;
  if (product.offer_ends_at && new Date(product.offer_ends_at) <= now)
    return false;

  return true;
};

/**
 * Detecta ofertas programadas (futuras).
 */
const isOfferScheduled = (product: Product): boolean => {
  if (!product) return false;
  const now = new Date();
  return Boolean(
    product.old_price &&
    Number(product.old_price) > Number(product.price) &&
    product.offer_starts_at &&
    new Date(product.offer_starts_at) > now
  );
};

/**
 * Aplica filtros de oferta activa a una query de Supabase.
 */

export const applyActiveOfferFilter = (query: any): any => {
  const now = new Date().toISOString();
  return query
    .not("old_price", "is", null)
    .or(`offer_starts_at.is.null,offer_starts_at.lte.${now}`)
    .or(`offer_ends_at.is.null,offer_ends_at.gt.${now}`);
};
