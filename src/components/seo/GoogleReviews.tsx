"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import type { GoogleReview } from "@/lib/googleReviewsService";

interface GoogleReviewsProps {
  reviews: GoogleReview[];
}

export function GoogleReviews({ reviews }: GoogleReviewsProps) {
  // Enlaces de cada reseña compartidos por el usuario, mapeados por nombre para consistencia
  const reviewLinksByName: Record<string, string> = {
    "Iris M.": "https://maps.app.goo.gl/duFjMseLjYQHTERh6",
    "RUTH MEJIA": "https://maps.app.goo.gl/NnM5yP4f2Kd8UPxY7",
    "Erick Salvador": "https://maps.app.goo.gl/GgEdxryKJ2Qtpu7E8",
  };

  return (
    <section
      className="bg-surface px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="google-reviews-title"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span className="font-sans text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Opiniones en Google Maps
            </span>
          </div>
          <h2
            id="google-reviews-title"
            className="text-primary font-serif text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Opiniones Reales de Clientes
          </h2>
          <div className="bg-tertiary mt-4 h-1 w-16 rounded-full" />

          <div className="mt-4 flex items-center gap-2">
            <span className="text-xl font-bold text-slate-800">5.0</span>
            <div className="flex text-amber-400" aria-label="5 de 5 estrellas">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="material-symbols-outlined font-fill-1 text-lg leading-none"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="text-sm text-slate-500">
              (Valoración excelente)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((r, index) => {
            // Asignar el enlace correspondiente si es una de las conocidas, o por defecto el perfil de G Maps
            const href =
              reviewLinksByName[r.author_name] || siteConfig.links.googleMaps;

            return (
              <a
                key={r.id || index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-primary/10 hover:border-primary/30 focus-visible:ring-primary flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_4px_20px_rgba(20,48,103,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(20,48,103,0.1)] focus-visible:ring-2 focus-visible:outline-none"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex text-amber-400"
                      aria-label={`${r.rating} estrellas`}
                    >
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="group-hover:text-primary text-slate-300 transition-colors">
                      <Image
                        src="/icons/google.svg"
                        alt="Google"
                        width={16}
                        height={16}
                        className="h-4 w-auto opacity-60 group-hover:opacity-100"
                      />
                    </span>
                  </div>

                  <blockquote className="text-on-surface-variant font-sans text-sm leading-relaxed italic">
                    &quot;
                    {r.comment ||
                      "Excelente servicio y confección de primer nivel. Muy recomendados."}
                    &quot;
                  </blockquote>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="bg-primary/5 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold uppercase">
                    {r.author_name.charAt(0)}
                  </div>
                  <div>
                    <cite className="text-on-surface block font-sans text-sm font-semibold not-italic">
                      {r.author_name}
                    </cite>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      Cliente verificado
                      <span className="material-symbols-outlined text-[12px] font-bold text-emerald-500">
                        verified
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={siteConfig.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary text-primary hover:bg-primary/5 focus-visible:ring-primary inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-sans text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span>Ver más opiniones en Google Maps</span>
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
