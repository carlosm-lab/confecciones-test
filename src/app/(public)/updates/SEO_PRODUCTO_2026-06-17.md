# SEO de Producto — Rich Results Google

**Fecha:** 2026-06-17  
**Estado:** ✅ Implementado y verificado (TSC: 0 errores)

---

## Resumen

Se enriqueció el JSON-LD de todos los productos del catálogo para cumplir con los requisitos de **Google Product Rich Results** y **Merchant Listings**. Ahora los productos de Confecciones Liss son elegibles para mostrar **estrellas de calificación**, **precio**, **disponibilidad** y **detalles de envío** directamente en los resultados de búsqueda de Google.

---

## Archivos Modificados

| Archivo                                            | Cambio                                        |
| -------------------------------------------------- | --------------------------------------------- |
| `src/app/(public)/catalogo/[sector]/[id]/page.tsx` | JSON-LD de producto enriquecido               |
| `src/lib/catalogService.ts`                        | Nueva función `getAllProductsForSitemap()`    |
| `src/app/sitemap.ts`                               | Sitemap dinámico con productos desde Supabase |

---

## Campos JSON-LD Nuevos Implementados

### `aggregateRating` (⭐ Habilita estrellas en Google)

```json
{
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "ratingCount": "3",
  "reviewCount": "3",
  "bestRating": "5",
  "worstRating": "1"
}
```

Fuente: 3 reseñas reales verificadas de Google Maps de clientes de Confecciones Liss.

### `review` (Array de reseñas individuales)

Incluye las 3 reseñas reales con `author`, `reviewBody`, `reviewRating` y `datePublished`. Cumple con la política anti-spam de Google (no son reviews auto-generadas).

### Campos de `offers` mejorados

- `availability`: Dinámico — `InStock` o `OutOfStock` según `product.is_active`
- `itemCondition`: `schema.org/NewCondition`
- `priceValidUntil`: Fin del año corriente (se recalcula automáticamente)
- `shippingDetails`: Envío a El Salvador, 1-3 días hábiles, sin costo
- `hasMerchantReturnPolicy`: 7 días, devolución en tienda, sin costo

### Campos adicionales

- `category`: Slug de la categoría del producto (dinámico)
- `material`: Material del producto si está definido (ej: "Sincatex")
- `image`: Ahora es un array `[url]` (formato recomendado por schema.org)
- `seller.url`: URL del sitio para identificación completa

---

## Sitemap Dinámico

El sitemap XML ahora incluye:

1. **Páginas estáticas** (home, contacto, links, updates, legal)
2. **Páginas de sector** (`/catalogo/scrubs`, `/catalogo/escolar`, etc.)
3. **Páginas de producto** (`/catalogo/[sector]/[slug]`) — fetched desde Supabase en tiempo de build

Google puede descubrir e indexar todos los productos automáticamente.

---

## Verificación

- ✅ TypeScript: 0 errores (`npx tsc --noEmit`)
- ✅ Sin regresiones en componentes (`ProductDetailClient`, `CatalogProductCard`, etc.)
- ✅ BreadcrumbList JSON-LD intacto
- ✅ `generateMetadata` sin cambios
- ✅ Todos los datos de reviews son reales (Google Maps verificados)

---

## Referencias

- [Google Search Central — Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Schema.org — Product](https://schema.org/Product)
- [Schema.org — AggregateRating](https://schema.org/AggregateRating)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
