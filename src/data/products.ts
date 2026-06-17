/**
 * ARCHIVO VACIADO INTENCIONALMENTE
 *
 * Los productos ya NO se gestionan desde este archivo estático.
 * Toda la data de productos se carga dinámicamente desde Supabase.
 *
 * - Para el catálogo público → usar @/lib/catalogService.ts
 * - Para el panel de admin  → usar @/lib/productUtils.ts + @/lib/supabaseClient.ts
 * - Para el hook del cliente → usar @/hooks/useProducts.ts
 *
 * @deprecated Este archivo solo existe para no romper imports residuales.
 *             Elimínalo cuando no quede ninguna referencia.
 */

// Export vacío para compatibilidad con cualquier import residual
export const ALL_PRODUCTS: never[] = [];
