import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import InstalacionesClient from "@/components/empresa/InstalacionesClient";

const PAGE_URL = `${siteConfig.url}/empresa/instalaciones`;
const PAGE_TITLE = "Instalaciones del Taller | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Conoce las instalaciones de nuestro taller de costura y confección en Barrio La Merced, San Miguel, El Salvador. Recorrido por nuestras áreas de trabajo.";

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

export default function InstalacionesPage() {
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
            name: "Instalaciones",
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
        {/* Instalaciones Client Tour Component */}
        <InstalacionesClient />
      </div>
    </>
  );
}
