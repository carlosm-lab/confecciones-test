import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { ProductDetailClient } from "@/components/catalogo/ProductDetailClient";
import { siteConfig } from "@/config/site";
import type { Sector } from "@/data/types";
import {
  getProductBySlug,
  getRelatedProducts,
  getProductSector,
  getProductMainImage,
} from "@/lib/catalogService";
import { testimonials } from "@/lib/seo-data";

// ── Constantes de Schema para Google Rich Results ─────────────────────────────
// Fuente: testimonios reales de Google Maps verificados (src/lib/seo-data.ts)
const PRODUCT_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  ratingCount: "3",
  reviewCount: "3",
  bestRating: "5",
  worstRating: "1",
} as const;

const PRODUCT_REVIEWS = testimonials.map((t) => ({
  "@type": "Review",
  author: {
    "@type": "Person",
    name: t.nombre,
  },
  reviewBody: t.texto,
  reviewRating: {
    "@type": "Rating",
    ratingValue: String(t.stars),
    bestRating: "5",
    worstRating: "1",
  },
  datePublished: "2025-06-01",
}));

// Política de envío para El Salvador (OfferShippingDetails)
const SHIPPING_DETAILS_SV = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "SV",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 3,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 3,
      unitCode: "DAY",
    },
  },
} as const;

// Política de devoluciones
const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "SV",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 7,
  returnMethod: "https://schema.org/ReturnInStore",
  returnFees: "https://schema.org/FreeReturn",
} as const;

// ── Dynamic metadata per product ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}): Promise<Metadata> {
  const { sector, id } = await params;
  const product = await getProductBySlug(id);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const config = CATEGORIES[sector as Sector];
  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}/${id}`;
  const description =
    product.short_description ?? product.description ?? product.name;
  const imageUrl = getProductMainImage(product);
  const absoluteImage = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`
    : undefined;

  return {
    title: `${product.name} | ${config?.subtitle ?? "Catálogo"}`,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `${product.name} | Confecciones Liss`,
      description: description ?? undefined,
      url: PAGE_URL,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "website",
      ...(absoluteImage && {
        images: [
          { url: absoluteImage, width: 800, height: 800, alt: product.name },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: description ?? undefined,
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}) {
  const { sector, id } = await params;
  const config = CATEGORIES[sector as Sector];

  // Fetch product from Supabase by slug
  const product = await getProductBySlug(id);

  if (!config || !product) {
    notFound();
  }

  // Related products: same sector, up to 5
  const productSector = getProductSector(product);
  const relatedProducts = await getRelatedProducts(productSector, id, 5);

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}/${id}`;
  const description =
    product.short_description ?? product.description ?? product.name;
  const imageUrl = getProductMainImage(product);
  const productImageAbsolute = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`
    : undefined;

  return (
    <>
      <ProductDetailClient
        product={product}
        config={config}
        relatedProducts={relatedProducts}
      />

      {/* JSON-LD: Product — Rich Results (aggregateRating + review + Offer completo) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description,
            image: productImageAbsolute ? [productImageAbsolute] : undefined,
            url: PAGE_URL,
            sku: product.slug ?? product.id,
            // Identificadores de categoría
            ...(product.category && { category: product.category }),
            // Material del producto (si está disponible)
            ...(product.material && { material: product.material }),
            // Marca
            brand: {
              "@type": "Brand",
              name: siteConfig.name,
            },
            // Oferta — Merchant Listing completo
            offers: {
              "@type": "Offer",
              price: Number(product.price).toFixed(2),
              priceCurrency: "USD",
              availability:
                product.is_active !== false
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
              url: PAGE_URL,
              // Precio válido hasta fin del año corriente
              priceValidUntil: `${new Date().getFullYear()}-12-31`,
              seller: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
              // Envío a El Salvador
              shippingDetails: SHIPPING_DETAILS_SV,
              // Política de devoluciones
              hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
            },
            // ⭐ Calificación agregada (reseñas reales de Google Maps)
            aggregateRating: PRODUCT_AGGREGATE_RATING,
            // ⭐ Reseñas individuales verificadas
            review: PRODUCT_REVIEWS,
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Catálogo",
                item: `${siteConfig.url}/catalogo`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: config.subtitle,
                item: `${siteConfig.url}/catalogo/${sector}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: product.name,
                item: PAGE_URL,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
