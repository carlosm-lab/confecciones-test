import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ResponsabilidadSocialClient from "@/components/empresa/ResponsabilidadSocialClient";

const PAGE_URL = `${siteConfig.url}/empresa/responsabilidad-social`;
const PAGE_TITLE = "Responsabilidad Social e Impacto | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Descubre cómo Confecciones Liss contribuye a su comunidad en San Miguel generando empleo local, capacitando continuamente a su equipo y digitalizando sus servicios.";

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

export default function ResponsabilidadSocialPage() {
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
            name: "Responsabilidad Social",
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
                  label: "Responsabilidad Social",
                  href: "/empresa/responsabilidad-social",
                },
              ]}
              className="animate-fade-in-up"
            />
          </div>
        </section>

        {/* Responsabilidad Social Client Component */}
        <ResponsabilidadSocialClient />
      </div>
    </>
  );
}
