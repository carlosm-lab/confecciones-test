import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

export interface GoogleReview {
  id: string;
  author_name: string;
  comment: string | null;
  rating: number;
  author_avatar: string | null;
  created_at: string;
}

// Fallbacks de reseñas reales de Google Maps compartidas por el usuario
const REAL_GOOGLE_REVIEWS_FALLBACK: GoogleReview[] = [
  {
    id: "f8b056e3-5dc2-482a-bb34-8c8872e411b0",
    author_name: "Iris M.",
    comment: "Uniformes confeccionados a la perfección",
    rating: 5,
    author_avatar: null,
    created_at: "2026-05-15T16:00:00.000Z",
  },
  {
    id: "e6f7df2b-c8c3-4d4b-a19c-9c7d8e2d4e60",
    author_name: "RUTH MEJIA",
    comment:
      "Excelente calidad, me encanta su trabajo y sobre todo la responsabilisad",
    rating: 5,
    author_avatar: null,
    created_at: "2026-06-10T20:30:00.000Z",
  },
  {
    id: "d9e8f7a6-b5c4-4a3b-9a2c-8d1e0f9a8b7c",
    author_name: "Erick Salvador",
    comment: "Excelente atención y calidad en la confección de uniformes.",
    rating: 5,
    author_avatar: null,
    created_at: "2026-06-20T15:15:00.000Z",
  },
];

function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env variables");
  return createClient(url, key);
}

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("google_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.warn(
        "[googleReviewsService] Error querying table, using fallback:",
        error.message
      );
      return REAL_GOOGLE_REVIEWS_FALLBACK;
    }

    if (!data || data.length === 0) {
      logger.info(
        "[googleReviewsService] google_reviews table is empty, using fallback"
      );
      return REAL_GOOGLE_REVIEWS_FALLBACK;
    }

    return data as GoogleReview[];
  } catch (err: any) {
    logger.warn(
      "[googleReviewsService] Supabase offline/error, using fallback:",
      err.message || err
    );
    return REAL_GOOGLE_REVIEWS_FALLBACK;
  }
}
