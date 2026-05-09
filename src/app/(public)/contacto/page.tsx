import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto | Confecciones Liss",
  description:
    "Contáctanos en San Miguel, El Salvador. WhatsApp +503 7331-7181, correo confeccionesliss.contacto@gmail.com. Lun–Sáb 8:00 AM – 5:00 PM. Barrio La Merced.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Confecciones Liss",
    description:
      "Ubícanos en Barrio La Merced, San Miguel. WhatsApp, correo y redes sociales. Atendemos pedidos individuales, grupales e institucionales.",
    url: `${siteConfig.url}/contacto`,
  },
};

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: "photo_camera",
    href: siteConfig.links.instagram,
    handle: "@confeccionliss",
  },
  {
    name: "Facebook",
    icon: "thumb_up",
    href: siteConfig.links.facebook,
    handle: "confeccionliss",
  },
  {
    name: "TikTok",
    icon: "play_circle",
    href: siteConfig.links.tiktok,
    handle: "@confeccionessliss",
  },
  {
    name: "YouTube",
    icon: "smart_display",
    href: siteConfig.links.youtube,
    handle: "@confeccionliss",
  },
  {
    name: "Threads",
    icon: "tag",
    href: siteConfig.links.threads,
    handle: "@confeccioness.liss",
  },
  {
    name: "X / Twitter",
    icon: "alternate_email",
    href: siteConfig.links.twitter,
    handle: "@confeccion_liss",
  },
];

const CONTACT_CHANNELS = [
  {
    icon: "call",
    label: "WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.links.whatsappDirect,
    description: "Respuesta inmediata",
  },
  {
    icon: "mail",
    label: "Correo electrónico",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Cotizaciones formales",
  },
  {
    icon: "location_on",
    label: "Dirección",
    value: siteConfig.address.full,
    href: siteConfig.links.googleMaps,
    description: siteConfig.address.reference,
  },
  {
    icon: "schedule",
    label: "Horario",
    value: siteConfig.schedule,
    href: undefined,
    description: "Atención presencial y por WhatsApp",
  },
];

export default function ContactoPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: "SV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHours: "Mo-Sa 08:00-17:00",
    priceRange: "$$",
    image: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.youtube,
      siteConfig.links.threads,
      siteConfig.links.twitter,
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contacto",
        item: `${siteConfig.url}/contacto`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="bg-primary px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/90">
                Contacto
              </li>
            </ol>
          </nav>
          <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            Contáctanos
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/80">
            Estamos listos para ayudarte con tu pedido. Escríbenos, llámanos o
            visítanos en nuestro taller en San Miguel.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-primary mb-8 font-serif text-2xl font-bold">
              Información de contacto
            </h2>

            {/* Contact channels */}
            <div className="space-y-6">
              {CONTACT_CHANNELS.map((ch) => (
                <div key={ch.label} className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      {ch.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {ch.label}
                    </h3>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-700">
                        {ch.value}
                      </p>
                    )}
                    {ch.description && (
                      <p className="mt-0.5 text-xs text-gray-500">
                        {ch.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-10">
              <h2 className="text-primary mb-4 font-serif text-lg font-bold">
                Síguenos en redes
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary/30 hover:bg-primary/5 flex items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-gray-900">
                        {s.name}
                      </span>
                      <span className="block truncate text-[11px] text-gray-500">
                        {s.handle}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map + CTA */}
          <div className="lg:col-span-3">
            {/* Google Maps embed */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <iframe
                title="Ubicación de Confecciones Liss en Google Maps"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d861!2d${siteConfig.geo.lng}!3d${siteConfig.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7b2bcd05889217%3A0x9e418141663f87ef!2sConfecciones%20Liss!5e0!3m2!1ses!2ssv!4v1`}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            {/* CTA Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`${siteConfig.links.whatsappDirect}?text=${encodeURIComponent("¡Hola! Me gustaría recibir información sobre uniformes.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-primary flex items-center gap-4 rounded-xl p-6 text-white shadow-md transition-opacity hover:opacity-95"
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  aria-hidden="true"
                >
                  chat
                </span>
                <div>
                  <span className="block font-semibold">
                    Escríbenos por WhatsApp
                  </span>
                  <span className="block text-sm text-white/70">
                    Respuesta rápida y directa
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Consulta sobre uniformes")}`}
                className="group hover:border-primary/30 flex items-center gap-4 rounded-xl border border-gray-200 p-6 transition-colors hover:bg-gray-50"
              >
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  aria-hidden="true"
                >
                  mail
                </span>
                <div>
                  <span className="block font-semibold text-gray-900">
                    Enviar correo
                  </span>
                  <span className="block text-sm text-gray-500">
                    Para cotizaciones formales
                  </span>
                </div>
              </a>
            </div>

            {/* Info box */}
            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/50 p-6">
              <h3 className="text-primary mb-2 font-semibold">¿Cómo llegar?</h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Estamos ubicados en{" "}
                <strong>{siteConfig.address.neighborhood}</strong>,{" "}
                {siteConfig.address.street}, San Miguel.{" "}
                {siteConfig.address.reference}, aproximadamente a 50 metros.
              </p>
              <a
                href={siteConfig.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                <span
                  className="material-symbols-outlined text-base"
                  aria-hidden="true"
                >
                  directions
                </span>
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
