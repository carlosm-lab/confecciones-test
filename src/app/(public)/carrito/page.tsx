import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Carrito de compras",
  description:
    "Revisa tus productos seleccionados. Contáctanos por WhatsApp para finalizar tu pedido de uniformes y scrubs médicos.",
  robots: { index: false, follow: false },
};

export default function CarritoPage() {
  return (
    <section className="px-5 pt-16 pb-20 md:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-screen-2xl flex-col items-center justify-center text-center">
        {/* Icon */}
        <div
          className="animate-fade-in-up bg-primary/10 mb-8 flex h-24 w-24 items-center justify-center rounded-full"
          style={{ animationDelay: "100ms" }}
        >
          <span
            className="material-symbols-outlined text-primary text-5xl"
            style={{ fontVariationSettings: "'FILL' 0" }}
            aria-hidden="true"
          >
            shopping_cart
          </span>
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-in-up text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl"
          style={{ animationDelay: "200ms" }}
        >
          Tu carrito está vacío
        </h1>
        <p
          className="animate-fade-in-up text-on-surface-variant mb-3 max-w-md text-lg leading-relaxed"
          style={{ animationDelay: "250ms" }}
        >
          La tienda en línea con carrito de compras estará disponible muy
          pronto.
        </p>
        <p
          className="animate-fade-in-up text-on-surface-variant mb-10 max-w-md text-base leading-relaxed"
          style={{ animationDelay: "300ms" }}
        >
          Por ahora, puedes hacer tu pedido directamente por WhatsApp y te
          atendemos de inmediato.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up flex w-full max-w-xs flex-col gap-4 sm:max-w-sm"
          style={{ animationDelay: "350ms" }}
        >
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="from-primary to-primary-container text-on-primary flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br px-8 py-4 text-base font-semibold shadow-md transition hover:opacity-90 active:scale-[0.97]"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              aria-hidden="true"
            >
              chat
            </span>
            Pedir por WhatsApp
          </a>

          <Link
            href="/catalogo"
            className="border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-semibold transition active:scale-[0.97]"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              aria-hidden="true"
            >
              storefront
            </span>
            Ver catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
