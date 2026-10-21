"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useNotificationsSafe } from "@/context/NotificationContext";
import { logger } from "@/lib/logger";
import { STORAGE_FAVORITES_KEY } from "@/lib/constants";
import {
  FavoritesContext,
  type FavoritesContextValue,
} from "./FavoritesContext";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const notificationsCtx = useNotificationsSafe();
  const addLocalNotification = notificationsCtx?.addLocalNotification;
  const [favorites, setFavorites] = useState<string[]>([]);
  const favoritesRef = useRef<string[]>([]);

  useEffect(() => {
    favoritesRef.current = favorites;
  }, [favorites]);

  // ── Carga inicial desde localStorage ──────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown[];
        // Filtrar IDs que no sean UUIDs válidos (corrupción o manipulación)
        const valid = parsed.filter(
          (id): id is string =>
            typeof id === "string" && id.length > 0 && UUID_REGEX.test(id)
        );
        setFavorites(valid);
        // Si se limpiaron IDs inválidos, actualizar localStorage
        if (valid.length !== parsed.length) {
          localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(valid));
        }
      }
    } catch (e) {
      logger.error("Error parsing favorites from localStorage:", e);
      setFavorites([]);
    }
  }, []);

  // ── Sincronización con Supabase al login ──────────────────────
  useEffect(() => {
    if (!user) return;
    let mounted = true;

    const syncFavorites = async () => {
      try {
        const { getSupabaseClient } = await import("@/lib/supabaseClient");
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("user_favorites")
          .select("product_id")
          .eq("user_id", user.id);

        if (error) {
          if (error.code === "PGRST116") {
            logger.warn(
              "Tabla favorites no existe aún. Necesitas crearla en Supabase."
            );
          } else {
            throw error;
          }
          return;
        }

        const dbFavorites = (data as { product_id: string }[]).map(
          (f) => f.product_id
        );
        let localFavorites: string[] = [];
        try {
          localFavorites = JSON.parse(
            localStorage.getItem(STORAGE_FAVORITES_KEY) || "[]"
          ) as string[];
        } catch (e) {
          logger.error(
            "Error parsing favorites from localStorage during sync:",
            e
          );
        }

        const validSyntaxLocalFavorites = localFavorites.filter(
          (id) => typeof id === "string" && id.length > 0 && UUID_REGEX.test(id)
        );

        const candidateToInsert = validSyntaxLocalFavorites.filter(
          (id) => !dbFavorites.includes(id)
        );

        let validToInsert: string[] = [];
        if (candidateToInsert.length > 0) {
          const { data: existingProducts } = await supabase
            .from("products")
            .select("id")
            .in("id", candidateToInsert);

          const dbProductIds = new Set(
            (existingProducts as { id: string }[] | null)?.map((p) => p.id) ||
              []
          );
          validToInsert = candidateToInsert.filter((id) =>
            dbProductIds.has(id)
          );
        }

        if (validToInsert.length > 0) {
          const newRecords = validToInsert.map((product_id) => ({
            user_id: user.id,
            product_id,
          }));
          const { error: insertError } = await supabase
            .from("user_favorites")
            .upsert(newRecords, { onConflict: "user_id,product_id" });

          if (insertError) {
            logger.error(
              "Error inserting missing local favorites:",
              insertError.message || insertError.details || insertError
            );
          }
        }

        if (mounted) {
          const validLocalFavorites = validSyntaxLocalFavorites.filter(
            (id) => dbFavorites.includes(id) || validToInsert.includes(id)
          );
          const updatedFavorites = [
            ...new Set([...dbFavorites, ...validLocalFavorites]),
          ];
          setFavorites(updatedFavorites);
          localStorage.setItem(
            STORAGE_FAVORITES_KEY,
            JSON.stringify(updatedFavorites)
          );
        }
      } catch (err) {
        logger.error("Error sincronizando favoritos:", err);
      }
    };

    syncFavorites();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Mantener localStorage sincronizado con el estado React
  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // ── Toggle con update optimista ───────────────────────────────
  const toggleFavorite = useCallback(
    async (productId: string) => {
      const isFav = favoritesRef.current.includes(productId);

      if (!user) {
        setFavorites((prev) =>
          isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
        if (!isFav) {
          addLocalNotification?.({
            type: "favorites_hint",
            title: "Favoritos guardados",
            message:
              "Inicia sesión para sincronizarlos en todos tus dispositivos.",
            target_url: null,
          });
          const { default: toast } = await import("react-hot-toast");
          toast(
            "¡Guardado! Inicia sesión para sincronizarlo en otros dispositivos",
            {
              icon: "🔔",
              duration: 4000,
            }
          );
        }
        return;
      }

      setFavorites((prev) =>
        isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
      );

      try {
        const { getSupabaseClient } = await import("@/lib/supabaseClient");
        const supabase = getSupabaseClient();
        if (isFav) {
          const { error } = await supabase
            .from("user_favorites")
            .delete()
            .match({ user_id: user.id, product_id: String(productId) });
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("user_favorites")
            .insert([{ user_id: user.id, product_id: String(productId) }]);
          if (error) throw error;
        }
      } catch (err) {
        logger.error("Error DB favoritos:", err);
        setFavorites((prev) =>
          isFav ? [...prev, productId] : prev.filter((id) => id !== productId)
        );
      }
    },
    [user, addLocalNotification]
  );

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const isFavorite = useCallback(
    (productId: string) => favoritesSet.has(productId),
    [favoritesSet]
  );

  const value: FavoritesContextValue = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
