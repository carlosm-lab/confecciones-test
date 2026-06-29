import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import EquipoClient from "@/components/empresa/EquipoClient";
import { teamData } from "@/data/team";

const PAGE_URL = `${siteConfig.url}/empresa/equipo`;
const PAGE_TITLE = "Nuestro Equipo | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Conoce a las costureras, especialistas en control de calidad, logística e infraestructura digital de Confecciones Liss en San Miguel.";

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

export default function EquipoPage() {
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
        "@type": "ItemList",
        name: "Equipo de Confecciones Liss",
        itemListElement: teamData.map((member, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: member.name,
            jobTitle: member.role,
            worksFor: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          },
        })),
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
            name: "Nuestro Equipo",
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
                { label: "Nuestro Equipo", href: "/empresa/equipo" },
              ]}
              className="animate-fade-in-up"
            />
          </div>
        </section>

        {/* Equipo Client Page */}
        <EquipoClient />
      </div>
    </>
  );
}
