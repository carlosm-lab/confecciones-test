import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ProcesoDeConfeccionClient from "@/components/empresa/ProcesoDeConfeccionClient";

const PAGE_URL = `${siteConfig.url}/empresa/proceso-de-confeccion`;
const PAGE_TITLE =
  "Proceso de Confección Textil | Confecciones Liss San Miguel";
const PAGE_DESCRIPTION =
  "Conoce el proceso de confección de Confecciones Liss: del primer contacto a la entrega, pasando por corte, costura y control de calidad final.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    creator: siteConfig.twitterHandle,
  },
  robots: { index: true, follow: true },
};

export default function ProcesoConfeccionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.url}#website`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: "Confecciones Liss",
        image: `${siteConfig.url}/images/servicios/confeccion.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur",
          addressLocality: "San Miguel",
          addressRegion: "San Miguel",
          addressCountry: "SV",
        },
        url: siteConfig.url,
      },
      {
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
            name: "Empresa",
            item: `${siteConfig.url}/empresa`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Proceso de Confección",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-[#f8f9fb]">
        {/* Breadcrumb section */}
        <section className="bg-[#f8f9fb] px-5 pt-4 pb-0 md:px-8 md:pt-6 md:pb-0">
          <div className="mx-auto max-w-screen-2xl">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Empresa", href: "/empresa" },
                {
                  label: "Proceso de Confección",
                  href: "/empresa/proceso-de-confeccion",
                },
              ]}
              className="animate-fade-in-up"
            />
          </div>
        </section>

        {/* Process Page Client Component */}
        <ProcesoDeConfeccionClient />
      </div>
    </>
  );
}
