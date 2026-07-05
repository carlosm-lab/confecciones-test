// ──────────────────────────────────────────────
// Fuente de verdad: Tipos del sistema de catálogo
// ──────────────────────────────────────────────

/** Sectores/categorías del catálogo */
export type Sector =
  | "scrubs"
  | "universitario"
  | "escolar"
  | "corporativo"
  | "deportivo"
  | "accesorios"
  | "lenceria"
  | "sublimacion"
  | "ropa-calzado"
  | "tops"
  | "limpiapipas";

/** @deprecated Usar DbProduct de @/lib/catalogService en su lugar. */
interface ProductColor {
  name: string;
  hex: string;
}

/**
 * @deprecated Usar DbProduct de @/lib/catalogService en su lugar.
 * Este tipo corresponde al esquema hardcodeado antiguo (campos en español).
 * Mantenido únicamente para evitar errores de compilación en imports residuales.
 */
interface Product {
  /** Slug URL-safe, ej: "scrub-san-miguel" */
  id: string;
  /** Nombre visible del producto */
  nombre: string;
  /** Precio actual en USD */
  precio: number;
  /** Precio anterior (tachado) – null si no hay descuento */
  precioAnterior?: number | null;
  /** Etiqueta de subcategoría visible, ej: "Scrubs Médicos" */
  categoria: string;
  /** Clave interna para filtros, ej: "scrubs" */
  tipo: string;
  /** Sector padre al que pertenece */
  sector: Sector;
  /** URL de imagen principal – null si no hay imagen */
  imagen: string | null;
  /** Texto alternativo para la imagen */
  imageAlt?: string;
  /** Tallas disponibles */
  tallas: string[];
  /** Si se muestra badge de estado */
  showBadge?: boolean;
  /** Texto del badge: "Nuevo", "Popular", "Oferta" */
  badgeText?: string;
  /** Sufijo de precio: "/unid." */
  priceSuffix?: string;
  /** Descripción completa para la página de detalle */
  descripcion?: string;
  /** Descripción corta para meta description */
  descripcionCorta?: string;
  /** Colores disponibles */
  colores?: ProductColor[];
  /** Lista de características / bullet points */
  caracteristicas?: string[];
  /** Material / tela */
  material?: string;
  /** Sub-página a la que pertenece (opcional, para ruteo específico) */
  subPageSlug?: string;
}

/** Chip de filtro rápido (sticky bar) */
export interface CategoryChip {
  label: string;
  icon: string;
}

/** Opción individual dentro de un grupo de filtro */
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/** Grupo de filtros en el sidebar */
export interface FilterGroup {
  label: string;
  icon?: string;
  /** Campo del producto contra el que se filtra */
  filterField: "tipo" | "tallas" | "categoria" | "sector";
  options: FilterOption[];
}

/** Feature de confianza (trust strip) */
export interface TrustFeature {
  icon: string;
  text: string;
}

/** Feature del hero (badges informativas) */
export interface HeroFeature {
  icon: string;
  text: string;
}

/** Banner CTA al final de la página */
export interface CtaBanner {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

/** Configuración completa de una categoría/sector */
export interface CategoryConfig {
  sector: Sector;
  title: string;
  seoTitle?: string;
  subtitle: string;
  description: string;
  seoDescription: string;
  icon: string;
  heroGradient: string;
  heroFeatures: HeroFeature[];
  trustFeatures: TrustFeature[];
  ctaBanner: CtaBanner;
  filterGroups: FilterGroup[];
  categoryChips: CategoryChip[];
  /** Imagen representativa para la tarjeta del Category Hub */
  hubImage: string;
  /** Frase corta descriptiva para la tarjeta del Category Hub */
  hubTagline: string;
}

// ──────────────────────────────────────────────
// Tipos para Servicios (Blog informativo)
// ──────────────────────────────────────────────

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  image: string;
  label: string;
  imageAlt?: string;
}

export interface PricingCard {
  icon: string;
  label: string;
  value: string;
  note?: string;
}

export interface ServiceSection {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
}

export interface ApplicationCategory {
  icon: string;
  title: string;
  examples: string;
  /** id de anchor para navegación interna */
  anchorId?: string;
}

export interface CategoryDetail {
  id: string;
  icon: string;
  title: string;
  body: string;
  bulletPoints?: string[];
}

export interface ServicePage {
  slug: string;
  navLabel: string;
  navIcon: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  cardDescription: string;
  heroGradient: string;
  heroFeatures: { icon: string; text: string }[];
  ctaBanner: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
  };
  cardImage: string;
  sections: ServiceSection[];
  faqs: { question: string; answer: string }[];
  processSteps?: ProcessStep[];
  garmentGallery?: GalleryItem[];
  pricingCards?: PricingCard[];
  institutionLogos?: GalleryItem[];
  applicationCategories?: ApplicationCategory[];
  categoryDetails?: CategoryDetail[];
  sizeComparison?: ComparisonPoint[];
}

export interface ComparisonPoint {
  garment: string;
  standard: string;
  medida: string;
}
