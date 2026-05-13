import type { Metadata } from "next";
import { ALL_PRODUCTS } from "@/data/products";
import { UnifiedCatalogClient } from "@/components/catalogo/UnifiedCatalogClient";
import { siteConfig } from "@/config/site";

import { CATALOG_PAGES } from "@/data/catalog-pages";

export const metadata: Metadata = {
  title: "Catálogo completo de uniformes y scrubs",
  description:
    "Explora nuestro catálogo completo: scrubs médicos Sincatex, uniformes universitarios UNIVO, UNAB, UGB, escolares y corporativos. Confección a la medida en San Miguel, El Salvador. Desde $35.",
  openGraph: {
    title: "Catálogo de Uniformes | Confecciones Liss",
    description:
      "Encuentra uniformes y scrubs médicos a la medida para el sector salud, universidades, colegios y empresas. Bordado, sublimación y precios por volumen.",
    url: `${siteConfig.url}/catalogo`,
  },
  alternates: {
    canonical: `${siteConfig.url}/catalogo`,
  },
};

export default function CatalogoPage() {
  const collectionParts = CATALOG_PAGES.map((page) => ({
    "@type": "CollectionPage",
    name: page.title,
    url: `${siteConfig.url}/catalogo/${page.slug}`,
  }));

  return (
    <>
      <UnifiedCatalogClient products={ALL_PRODUCTS} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Catálogo completo de uniformes y scrubs — Confecciones Liss",
            description:
              "Catálogo completo de uniformes médicos, universitarios, escolares y corporativos en San Miguel, El Salvador.",
            url: `${siteConfig.url}/catalogo`,
            numberOfItems: ALL_PRODUCTS.length,
            provider: {
              "@type": "LocalBusiness",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            hasPart: collectionParts,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
