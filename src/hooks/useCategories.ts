"use client";
import { useState, useCallback, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";

export interface Category {
  id: string;
  name: string;
  slug: string;
  catalog?: string | null;
  created_at?: string;
}

// Cache en memoria para evitar refetches innecesarios
let _categoryCache: Category[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export function invalidateCategoryCache() {
  _categoryCache = null;
  _cacheTimestamp = 0;
}

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    // Usar caché si es válido
    if (_categoryCache && Date.now() - _cacheTimestamp < CACHE_TTL) {
      setCategories(_categoryCache);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, catalog, created_at")
        .order("name");

      if (error) throw error;

      _categoryCache = data || [];
      _cacheTimestamp = Date.now();
      setCategories(_categoryCache as Category[]);
    } catch (error) {
      logger.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, refetch: fetchCategories };
}
