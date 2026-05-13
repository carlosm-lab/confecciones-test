"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { ALL_PRODUCTS } from "@/data/products";
import type { Sector } from "@/data/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

/** Ordered list of sectors for the hub grid */
const SECTOR_ORDER: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
];

function CategoryCard({
  sector,
  productCount,
}: {
  sector: Sector;
  productCount: number;
}) {
  const config = CATEGORIES[sector];

  return (
    <Link
      href={`/catalogo/${sector}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl",
        "min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      )}
      aria-label={`Ver catálogo de ${config.subtitle}: ${config.hubTagline}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={config.hubImage}
          alt={`Categoría ${config.subtitle} — ${config.hubTagline}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 p-5 sm:p-6">
        {/* Icon + Subtitle */}
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-xl text-white/80"
            aria-hidden="true"
          >
            {config.icon}
          </span>
          <span className="text-[11px] font-semibold tracking-[0.15em] text-white/70 uppercase">
            {config.subtitle}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-xl leading-tight font-bold text-white sm:text-2xl">
          {config.subtitle}
        </h2>

        {/* Tagline */}
        <p className="text-sm leading-snug text-white/80">
          {config.hubTagline}
        </p>

        {/* Product count + CTA arrow */}
        <div className="mt-1 flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {productCount} {productCount === 1 ? "producto" : "productos"}
          </span>
          <span
            className="material-symbols-outlined text-xl text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategoryHubClient() {
  // Compute product counts per sector
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const sector of SECTOR_ORDER) {
      counts[sector] = ALL_PRODUCTS.filter((p) => p.sector === sector).length;
    }
    return counts;
  }, []);

  return (
    <>
      {/* Category Grid */}
      <section className="bg-surface px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-screen-2xl">
          {/* Section header */}
          <div className="mb-8 flex flex-col items-center text-center md:mb-10">
            <h1 className="section-title">Nuestro Catálogo</h1>
            <p className="text-on-surface-variant mt-3 max-w-xl text-sm leading-relaxed md:text-base">
              Selecciona la categoría que necesitas y explora productos
              diseñados para tu profesión, institución o equipo.
            </p>
          </div>

          {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {SECTOR_ORDER.map((sector) => (
              <CategoryCard
                key={sector}
                sector={sector}
                productCount={productCounts[sector] ?? 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section
        className="bg-surface-container-low border-t border-gray-200 px-5 py-8 md:px-8"
        aria-label="Garantías del servicio"
      >
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-5 md:grid-cols-4">
          {[
            { icon: "local_shipping", text: "Envío a todo El Salvador" },
            { icon: "payments", text: "Pago al recibir" },
            { icon: "verified", text: "Confección garantizada" },
            { icon: "support_agent", text: "Atención personalizada" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <span
                className="material-symbols-outlined text-primary text-xl"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-sm text-white/70">
              Confeccionamos uniformes a la medida. Cuéntanos tu proyecto y te
              damos una cotización en minutos.
            </p>
          </div>
          <a
            href={siteConfig.links.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            Cotizar por WhatsApp
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
        </div>
      </section>
    </>
  );
}
