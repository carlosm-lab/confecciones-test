"use client";

/**
 * CatalogProductCard — Confecciones Liss
 * Usa DbProduct (schema de Supabase) directamente.
 * Compatible con el catálogo dinámico conectado a la BD.
 */

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import {
  getProductMainImage,
  isProductOnSale,
  getProductSector,
  type DbProduct,
} from "@/lib/catalogService";

interface CatalogProductCardProps {
  product: DbProduct;
  /** Set to true for above-the-fold images to optimize LCP. */
  priority?: boolean;
}

export function CatalogProductCard({
  product,
  priority = false,
}: CatalogProductCardProps) {
  const imagen = getProductMainImage(product);
  const onSale = isProductOnSale(product);
  const sector = getProductSector(product);
  const slug = product.slug ?? product.id;

  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;

  // Contextos reales
  const { addToCart, setIsCartOpen } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, showAuthModal } = useAuth();

  const isFavorited = isFavorite(product.id);

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      showAuthModal("favorites");
      return;
    }
    toggleFavorite(product.id);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      old_price: oldPrice,
      image_path: imagen,
      slug: `${sector}/${slug}`,
    });
    setIsCartOpen(true);
  }

  return (
    <article
      data-testid="product-card"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(20,48,103,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(20,48,103,0.12)]"
    >
      {/* Badges top-left */}
      <div className="pointer-events-none absolute top-[var(--space-sm)] left-[var(--space-sm)] z-[20] flex flex-col gap-[var(--space-xs)]">
        {onSale && (
          <span
            className="rounded-full bg-[var(--color-tertiary)] px-2.5 py-1 font-black tracking-widest text-white uppercase shadow-sm select-none"
            style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)" }}
          >
            ¡Oferta!
          </span>
        )}
        {product.badge_text && !onSale && (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 font-black tracking-widest uppercase shadow-sm select-none",
              product.badge_text === "Premium"
                ? "bg-slate-900 text-white"
                : "bg-primary text-white"
            )}
            style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)" }}
          >
            {product.badge_text}
          </span>
        )}
      </div>

      {/* Favorite button top-right */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-[var(--space-sm)] right-[var(--space-sm)] z-[20] rounded-full bg-black/20 p-1.5 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 active:scale-90"
        aria-label="Alternar Favorito"
      >
        <span
          className={cn(
            "material-symbols-outlined drop-shadow-[0_0px_3px_rgba(0,0,0,0.6)] transition-colors",
            isFavorited
              ? "text-[var(--color-tertiary)]"
              : "text-white hover:text-slate-100"
          )}
          style={{
            fontSize: "20px",
            fontVariationSettings: "'FILL' 1",
          }}
        >
          favorite
        </span>
      </button>

      {/* Image — 4:5 ratio for compact vertical layout */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-container-low)]">
        {imagen ? (
          <Image
            src={imagen}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority={priority}
            unoptimized={
              imagen.startsWith("http") && !imagen.includes("supabase.co")
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-surface-container)]">
            <span
              className="material-symbols-outlined text-4xl text-[var(--color-outline-variant)]"
              aria-hidden="true"
            >
              checkroom
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="group-hover:text-primary pointer-events-none truncate text-sm font-bold text-[var(--color-on-surface)] transition-colors">
          {product.name}
        </h3>

        {product.short_description && (
          <p className="pointer-events-none line-clamp-1 text-[11px] text-[var(--color-on-surface-variant)]">
            {product.short_description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2 select-none">
          <span className="text-primary pointer-events-none text-lg leading-tight font-extrabold">
            ${price.toFixed(2)}
            {product.price_suffix && (
              <span className="ml-0.5 text-[10px] font-normal text-[var(--color-on-surface-variant)]">
                {product.price_suffix}
              </span>
            )}
          </span>
          {onSale && oldPrice && (
            <span className="pointer-events-none text-xs text-[var(--color-outline)] line-through decoration-[var(--color-outline)]/40">
              ${oldPrice.toFixed(2)}
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="btn-gradient relative z-[20] ml-auto rounded-xl p-2 text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-90"
            aria-label="Añadir al carrito"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>

      {/* Brand accent line at bottom */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-container)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Full-card link */}
      <Link
        href={`/catalogo/${sector}/${slug}`}
        className="absolute inset-0 z-[10]"
        aria-label={`Ver detalles de ${product.name}`}
        prefetch={false}
      />
    </article>
  );
}
