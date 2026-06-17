// ──────────────────────────────────────────────────────────────
// UTILIDADES DE SUPABASE STORAGE
// ──────────────────────────────────────────────────────────────
// Funciones auxiliares para trabajar con archivos en el bucket
// `product-images` de Supabase Storage.
// ──────────────────────────────────────────────────────────────
import { logger } from "./logger";

/**
 * Extrae el nombre de archivo de una URL de Supabase Storage.
 * Retorna null si la URL no es de Supabase o es inválida.
 */
function extractStorageFilename(
  urlStr: string | null | undefined
): string | null {
  if (!urlStr || typeof urlStr !== "string") return null;
  try {
    const parsed = new URL(urlStr);
    if (!parsed.hostname.endsWith(".supabase.co")) return null;
    const pathSegments = parsed.pathname.split("/");
    return pathSegments[pathSegments.length - 1] || null;
  } catch {
    return urlStr.split("/").pop() || null;
  }
}

interface ProductWithImages {
  image_path?: string | null;
  images?: string[];
}

/**
 * Recoge todos los filenames de storage de un producto.
 */
export function collectProductImageFiles(product: ProductWithImages): string[] {
  const files: string[] = [];
  if (product.image_path) {
    const fn = extractStorageFilename(product.image_path);
    if (fn) files.push(fn);
  }
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach((img) => {
      const fn = extractStorageFilename(img);
      if (fn) files.push(fn);
    });
  }
  return files;
}

const safeLocalStorage = {
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      logger.error(`Error saving to localStorage (Key: ${key}):`, error);
      return false;
    }
  },
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      logger.error(`Error reading from localStorage (Key: ${key}):`, error);
      return null;
    }
  },
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error(`Error removing from localStorage (Key: ${key}):`, error);
      return false;
    }
  },
};
