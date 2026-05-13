import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { CATALOG_PAGES } from "@/data/catalog-pages";
import type { CatalogSubPage } from "@/data/types";
import { siteConfig } from "@/config/site";
import { CatalogSubPageClient } from "@/components/catalogo/CatalogSubPageClient";

export function generateStaticParams() {
  return CATALOG_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = CATALOG_PAGES.find((p) => p.slug === slug);

  if (!config) {
    return {
      title: "Página no encontrada",
    };
  }

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: {
      canonical: `${siteConfig.url}/catalogo/${slug}`,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: `${siteConfig.url}/catalogo/${slug}`,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function CatalogSubPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = CATALOG_PAGES.find((p) => p.slug === slug);

  if (!config) notFound();

  const products = config.filterFn(ALL_PRODUCTS);

  // BreadcrumbList JSON-LD
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Catálogo",
      item: `${siteConfig.url}/catalogo`,
    },
  ];

  let currentPos = 3;

  if (config.parentSector && config.slug !== config.parentSector) {
    const parentConfig = CATALOG_PAGES.find(
      (p) => p.slug === config.parentSector
    );
    breadcrumbItems.push({
      "@type": "ListItem",
      position: currentPos++,
      name: parentConfig?.navLabel || config.parentSector,
      item: `${siteConfig.url}/catalogo/${config.parentSector}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: currentPos,
    name: config.navLabel,
    item: `${siteConfig.url}/catalogo/${config.slug}`,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // Specific Entity Schema
  let entitySchema: Record<string, unknown> = {};

  if (config.jsonLdType === "Service") {
    entitySchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: config.title,
      description: config.seoDescription,
      provider: {
        "@type": "LocalBusiness",
        name: "Confecciones Liss",
        address:
          "Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, San Miguel",
      },
    };
  } else {
    // CollectionPage
    entitySchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: config.title,
      description: config.seoDescription,
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/catalogo/${config.slug}/${p.id}`,
        name: p.nombre,
      })),
    };
  }

  const { filterFn, ...serializableConfig } = config;

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
          __html: JSON.stringify(entitySchema).replace(/</g, "\\u003c"),
        }}
      />
      <CatalogSubPageClient
        products={products}
        config={serializableConfig as Omit<CatalogSubPage, "filterFn">}
      />
    </>
  );
}
