import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CATALOG_PAGES } from "@/data/catalog-pages";
import { SERVICE_PAGES } from "@/data/services";
import { ALL_PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalogo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/servicios`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Páginas de categoría del catálogo
  const categoryPages: MetadataRoute.Sitemap = CATALOG_PAGES.map((page) => {
    const priority = page.slug === page.parentSector ? 0.85 : 0.7;
    return {
      url: `${siteConfig.url}/catalogo/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    };
  });

  // Artículos de servicios (blog)
  const servicePages: MetadataRoute.Sitemap = SERVICE_PAGES.map((page) => ({
    url: `${siteConfig.url}/servicios/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Páginas de producto bajo catálogo
  const productPages: MetadataRoute.Sitemap = [];

  CATALOG_PAGES.forEach((page) => {
    const products = page.filterFn(ALL_PRODUCTS);
    products.forEach((product) => {
      const url = `${siteConfig.url}/catalogo/${page.slug}/${product.id}`;
      if (!productPages.some((p) => p.url === url)) {
        productPages.push({
          url,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    });
  });

  return [...staticPages, ...categoryPages, ...servicePages, ...productPages];
}
