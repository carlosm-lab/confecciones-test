"use client";
// ──────────────────────────────────────────────────────────────
// HOOK: useProducts — catálogo público client-side
// ──────────────────────────────────────────────────────────────
// Fetch de productos desde Supabase en el cliente.
// Soporta filtrado por sector, search y paginación.
// ──────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import type { DbProduct } from "@/lib/catalogService";

const PRODUCT_SELECT = `
  id, name, description, short_description, price, old_price,
  offer_ends_at, offer_starts_at, category, category_id, tags,
  image_path, images, is_active, slug, sector, badge_text,
  price_suffix, tallas, colores, material, caracteristicas,
  created_at, updated_at,
  categories(name, catalog)
`;

interface UseProductsOptions {
  sector?: string;
  limit?: number;
  initialData?: DbProduct[];
}

interface UseProductsResult {
  products: DbProduct[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts({
  sector,
  limit,
  initialData,
}: UseProductsOptions = {}): UseProductsResult {
  const [products, setProducts] = useState<DbProduct[]>(initialData ?? []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseClient();
      let query = supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (sector) {
        // Filter by sector field OR by category.catalog
        query = query.or(`sector.eq.${sector},categories.catalog.eq.${sector}`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProducts((data ?? []) as unknown as DbProduct[]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Error cargando productos";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [sector, limit]);

  useEffect(() => {
    if (!initialData) {
      fetchProducts();
    }
  }, [fetchProducts, initialData]);

  return { products, isLoading, error, refetch: fetchProducts };
}
