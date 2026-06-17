"use client";

/**
 * ProductDetailClient — Confecciones Liss
 * Vista de detalle usando DbProduct (schema de Supabase).
 * Compatible con el catálogo dinámico.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogProductCard } from "./CatalogProductCard";
import { siteConfig } from "@/config/site";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { logger } from "@/lib/logger";
import type { CategoryConfig } from "@/data/types";
import {
  getProductMainImage,
  isProductOnSale,
  getProductSector,
  type DbProduct,
} from "@/lib/catalogService";

interface ProductDetailClientProps {
  product: DbProduct;
  config: CategoryConfig;
  relatedProducts: DbProduct[];
}

export function ProductDetailClient({
  product,
  config,
  relatedProducts,
}: ProductDetailClientProps) {
  const allImages: string[] = [
    ...(product.images && product.images.length > 0
      ? product.images
      : product.image_path
        ? [product.image_path]
        : []),
  ].filter(Boolean);

  const mainImageFallback = getProductMainImage(product);
  const [mainImg, setMainImg] = useState<string>(
    allImages[0] ?? mainImageFallback ?? ""
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [showToast, setShowToast] = useState(false);

  const onSale = isProductOnSale(product);
  const sector = getProductSector(product);
  const slug = product.slug ?? product.id;
  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;

  // Contexts
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, showAuthModal } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const isFavorited = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (!user) {
      showAuthModal("favorites");
      return;
    }
    toggleFavorite(product.id);
  };

  function handleAddToCart() {
    const noteText = customNote ? `\nNota: ${customNote}` : "";
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: price,
        old_price: oldPrice,
        image_path: getProductMainImage(product),
        slug: `${sector}/${slug}`,
      },
      1,
      null,
      noteText
    );
    setIsCartOpen(true);
  }

  const handleCopy = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        return;
      } catch (err) {
        logger.error("Failed to copy link via clipboard API:", err);
      }
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      }
    } catch (fallbackErr) {
      logger.error("Fallback copy failed:", fallbackErr);
    }
  };

  const placeholderCount = Math.max(0, 4 - allImages.length);

  // Parse tallas y colores desde los campos de DB
  const tallas: string[] = Array.isArray(product.tallas) ? product.tallas : [];
  const colores: { name: string; hex: string }[] = Array.isArray(
    product.colores
  )
    ? product.colores
    : [];
  const caracteristicas: string[] = Array.isArray(product.caracteristicas)
    ? product.caracteristicas
    : [];

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-screen-2xl flex-1 flex-col px-5 py-[var(--space-lg)] md:px-8">
      {/* Main product grid */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[45%_1fr] lg:gap-12">
        {/* Left column: Sticky image gallery */}
        <div
          className="animate-fade-in-up flex w-full min-w-0 flex-col-reverse items-start gap-5 md:grid md:grid-cols-[calc(20%-12.16px)_calc(80%-19.84px)] md:gap-8 lg:sticky lg:top-24 lg:grid-cols-[calc(20%-17.16px)_1px_calc(80%-39.84px)] lg:gap-7"
          style={{ animationDelay: "100ms" }}
        >
          {/* Thumbnail strip */}
          <div className="no-scrollbar flex w-full min-w-0 shrink-0 flex-row gap-4 overflow-x-auto pb-2 md:w-full md:flex-col md:gap-3 md:pb-0">
            {allImages.map((img, i) => (
              <button
                key={`img-${i}`}
                type="button"
                onClick={() => setMainImg(img)}
                className="aspect-[4/5] w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-white transition-all duration-300 active:scale-[0.96] md:w-full"
                style={
                  mainImg === img
                    ? { border: "2px solid #143067", opacity: 1 }
                    : { border: "2px dashed #cbd5e1", opacity: 0.7 }
                }
              >
                <Image
                  src={img}
                  alt={`${product.name} miniatura ${i + 1}`}
                  width={96}
                  height={120}
                  className="h-full w-full object-cover object-center"
                  unoptimized={
                    img.startsWith("http") && !img.includes("supabase.co")
                  }
                />
              </button>
            ))}

            {Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-[4/5] w-20 shrink-0 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 md:w-full"
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Divider line (desktop only) */}
          <div className="mt-2 mb-2 hidden w-px shrink-0 self-stretch rounded-full bg-slate-200 lg:block" />

          {/* Main image */}
          <div
            className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-xl bg-white transition-all duration-300 md:w-full"
            style={{
              border: "1px solid rgba(20,48,103,0.2)",
              boxShadow:
                "0 0 25px 6px rgba(20,48,103,0.15), 0 0 10px 2px rgba(20,48,103,0.1)",
            }}
          >
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="group relative flex h-full w-full cursor-zoom-in items-center justify-center"
            >
              {mainImg ? (
                <Image
                  src={mainImg}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="rounded-xl object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  unoptimized={
                    mainImg.startsWith("http") &&
                    !mainImg.includes("supabase.co")
                  }
                />
              ) : (
                <span
                  className="material-symbols-outlined text-6xl text-slate-300"
                  aria-hidden="true"
                >
                  checkroom
                </span>
              )}
              {mainImg && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/5 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-5xl text-white drop-shadow-md">
                    zoom_in
                  </span>
                </div>
              )}
            </button>

            {/* Favorite button */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
              aria-label={
                isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"
              }
            >
              <span
                className={`material-symbols-outlined ${isFavorited ? "text-primary" : "text-slate-400"}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* Right column: Product info */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* Breadcrumbs */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Catálogo", href: "/catalogo" },
                {
                  label: config.subtitle,
                  href: `/catalogo/${sector}`,
                },
              ]}
            />
          </div>

          {/* Title + description */}
          <div
            className="animate-fade-in-up flex min-w-0 flex-col gap-4"
            style={{ animationDelay: "200ms" }}
          >
            <h1 className="min-w-0 text-xl font-extrabold tracking-tight break-words text-gray-900 md:text-2xl">
              {product.name}
            </h1>

            <div className="w-full min-w-0 overflow-hidden">
              {product.description ? (
                <p className="text-base whitespace-pre-wrap text-slate-600">
                  {product.description}
                </p>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Sin descripción detallada.
                </p>
              )}
            </div>

            {/* Available sizes */}
            {tallas.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Tallas disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {tallas.map((talla) => (
                    <span
                      key={talla}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available colors */}
            {colores.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Colores disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {colores.map((color) => (
                    <div
                      key={color.hex}
                      className="group flex items-center gap-1.5"
                      title={color.name}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-slate-200 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs text-slate-500">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Characteristics */}
            {caracteristicas.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {caracteristicas.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span
                      className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                      style={{ fontSize: "1rem" }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buy Box */}
          <div
            className="animate-fade-in-up flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 shadow-sm"
            style={{ animationDelay: "250ms" }}
          >
            {/* Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-3">
                <p className="text-2xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                  {product.price_suffix && (
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      {product.price_suffix}
                    </span>
                  )}
                </p>
                {onSale && oldPrice && (
                  <p className="text-lg font-medium text-slate-400 line-through">
                    ${oldPrice.toFixed(2)}
                  </p>
                )}
              </div>
              {product.material && (
                <p className="text-xs text-slate-500">
                  Material:{" "}
                  <span className="font-medium">{product.material}</span>
                </p>
              )}
            </div>

            {/* Personalization accordion */}
            <details className="group cursor-pointer">
              <summary className="hover:text-primary flex list-none items-center justify-between text-sm font-semibold text-slate-700 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[1.125rem]">
                    edit_note
                  </span>
                  <span>¿Necesitas personalizar tu pedido?</span>
                </div>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pt-3">
                <textarea
                  id="custom-note"
                  className="focus:border-primary focus:ring-primary w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:ring-1"
                  placeholder="Ej. Talla exacta, color preferido, bordado personalizado, nombre a bordar... (Máx. 500 caracteres)"
                  rows={2}
                  maxLength={500}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              </div>
            </details>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-md transition hover:shadow-lg active:scale-[0.97]"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Agregar al Carrito
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-[0.95] dark:bg-transparent dark:text-slate-300 dark:hover:bg-white/10"
                title="Compartir"
                aria-label="Compartir este producto"
              >
                <span className="material-symbols-outlined text-primary">
                  share
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section
          className="animate-fade-in-up mt-16"
          style={{ animationDelay: "300ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              También Te Puede Gustar
            </h2>
            <Link
              href={`/catalogo/${sector}`}
              className="text-primary text-sm font-bold hover:underline"
            >
              Ver Todo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {relatedProducts.map((p, index) => (
              <div
                key={p.id}
                className="animate-fade-in-up h-full w-full"
                style={{ animationDelay: `${index * 40 + 350}ms` }}
              >
                <CatalogProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox modal */}
      {isImageModalOpen && mainImg && (
        <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center duration-200">
          <button
            type="button"
            className="absolute inset-0 w-full cursor-default bg-black/90 backdrop-blur-sm"
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Cerrar vista de imagen"
          />
          <button
            type="button"
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white/60 transition-all hover:bg-black/40 hover:text-white sm:top-6 sm:right-6"
            aria-label="Cerrar imagen"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <div className="relative z-10 max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-6rem)] sm:max-w-[calc(100vw-6rem)]">
            <Image
              src={mainImg}
              alt={product.name}
              width={1200}
              height={1200}
              className="h-auto max-h-[calc(100vh-4rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              unoptimized={
                mainImg.startsWith("http") && !mainImg.includes("supabase.co")
              }
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#1e1e24",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            fontSize: "0.875rem",
            fontWeight: 600,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            whiteSpace: "nowrap",
            animation:
              "toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: "#10b981",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            check_circle
          </span>
          <span>Enlace copiado</span>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes toastFadeIn {
              from { opacity: 0; transform: translate(-50%, 16px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `,
        }}
      />
    </div>
  );
}
