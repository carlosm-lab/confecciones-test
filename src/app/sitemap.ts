import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { env } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // If in Home-Only mode (production initial deploy), the sitemap must ONLY contain the home page URL.
  if (env.NEXT_PUBLIC_HOME_ONLY === "true") {
    return [
      {
        url: siteConfig.url,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }

  // Páginas públicas activas (excluyendo catalogo y servicios que están bloqueadas)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/links`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/updates`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return staticPages;
}
