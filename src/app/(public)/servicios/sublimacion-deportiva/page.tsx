import type { Metadata } from "next";
import { SERVICE_PAGES } from "@/data/services";
import { siteConfig } from "@/config/site";
import SublimacionPageClient from "@/components/servicios/SublimacionPageClient";

export const metadata: Metadata = {
  title: "Sublimación Textil y Deportiva en San Miguel | Confecciones Liss",
  description:
    "Impresión de telas por sublimación para uniformes deportivos, promocionales y banderas. Colores intensos que no se decoloran. San Miguel, El Salvador.",
  alternates: {
    canonical: `${siteConfig.url}/servicios/sublimacion-deportiva`,
  },
  openGraph: {
    title: "Sublimación Textil y Deportiva en San Miguel | Confecciones Liss",
    description:
      "Impresión de telas por sublimación para uniformes deportivos, promocionales y banderas. Colores intensos que no se decoloran. San Miguel, El Salvador.",
    url: `${siteConfig.url}/servicios/sublimacion-deportiva`,
    type: "article",
    siteName: siteConfig.name,
  },
};

export default function SublimacionPage() {
  // Filtrar los otros servicios para pasarlos al componente cliente
  const otherServices = SERVICE_PAGES.filter(
    (p) => p.slug !== "sublimacion-deportiva"
  ).map((p) => ({
    slug: p.slug,
    title: p.title,
    navLabel: p.navLabel,
    navIcon: p.navIcon,
  }));

  // Schemas para SEO
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
        name: "Servicios",
        item: `${siteConfig.url}/servicios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sublimación",
        item: `${siteConfig.url}/servicios/sublimacion-deportiva`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sublimación Textil Full Color",
    description:
      "Servicio de impresión textil mediante calor. La técnica ideal para prendas de poliéster deportivas donde la tinta pasa a ser parte de la fibra, asegurando que nunca se cuartee ni pierda color.",
    provider: {
      "@type": "LocalBusiness",
      name: "Confecciones Liss",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur",
        addressLocality: "San Miguel",
        addressRegion: "San Miguel",
        addressCountry: "SV",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Se puede sublimar sobre algodón?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No de forma directa. La sublimación requiere fibras de poliéster. Para algodón recomendamos bordado o serigrafía.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se decolora con el lavado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. La tinta se fusiona molecularmente con la fibra, por lo que no se despega ni decolora. Recomendamos lavar al revés y sin cloro para maximizar la vida útil.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántas prendas mínimo puedo pedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aceptamos desde una sola prenda. No hay pedido mínimo.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SublimacionPageClient otherServices={otherServices} />
    </>
  );
}
