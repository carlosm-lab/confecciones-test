/**
 * homeProducts.ts — Módulo server-only para los productos del home.
 *
 * ARQUITECTURA:
 * Este archivo está SEPARADO de catalogService.ts deliberadamente.
 * Razón: catalogService.ts es importado por Client Components (CartDrawer,
 * Navbar, FavoritesModal) para utilidades como resolveImageUrl, getProductMainImage, etc.
 * Las APIs "cacheTag" y "cacheLife" son server-only y no pueden estar
 * en un archivo que también se importa en bundles de cliente.
 *
 * REGLA: Solo importar este archivo desde Server Components o Server Actions.
 *
 * Al llamar updateTag(HOMEPAGE_PRODUCTS_TAG) en un Server Action,
 * esta entrada de caché expira INMEDIATAMENTE (read-your-own-writes semantics).
 */
import { cacheTag, cacheLife } from "next/cache";
import { HOMEPAGE_PRODUCTS_TAG } from "@/lib/constants";
import {
  fetchRecentProductsFromDb,
  type DbProduct,
} from "@/lib/catalogService";

/**
 * Obtener productos para la sección Novedades del home.
 *
 * Cached con "use cache" (Next.js 16 Cache Components model):
 * - revalidate: 86400s (24h) — se revalida en background tras 24h de inactividad
 * - expire: 604800s (7d)    — expira definitivamente tras 7 días
 * - cacheTag: HOMEPAGE_PRODUCTS_TAG — invalidación instantánea al llamar
 *   updateTag(HOMEPAGE_PRODUCTS_TAG) desde un Server Action de admin.
 */
export async function getHomepageProducts(limit = 10): Promise<DbProduct[]> {
  "use cache";
  cacheLife({ revalidate: 86400, expire: 604800 });
  cacheTag(HOMEPAGE_PRODUCTS_TAG);
  return fetchRecentProductsFromDb(limit);
}
