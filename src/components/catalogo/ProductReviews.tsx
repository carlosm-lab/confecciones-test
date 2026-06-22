"use client";

/**
 * ProductReviews — Confecciones Liss
 *
 * Sección de reseñas de producto rediseñada. Diseño premium con:
 * - Header dividido: score grande + barras de distribución
 * - Cards con borde acento navy y decoración de comillas
 * - Formulario pulido con jerarquía clara
 * - Estado vacío y CTA de login refinados
 */

import { useState, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { reviewSchema } from "@/schemas/reviewSchema";
import type { DbReview } from "@/lib/reviewsService";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// ── Props ──────────────────────────────────────────────────────

interface ProductReviewsProps {
  productId: string;
  initialReviews: DbReview[];
  averageRating: number;
  totalCount: number;
}

// ── Star display ───────────────────────────────────────────────

function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClass = {
    sm: "text-[14px]",
    md: "text-[18px]",
    lg: "text-[22px]",
    xl: "text-[28px]",
  }[size];

  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn("material-symbols-outlined text-amber-400", sizeClass)}
          style={{
            fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
          }}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </span>
  );
}

// ── Star input ─────────────────────────────────────────────────

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label="Calificación"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} estrella${star !== 1 ? "s" : ""}`}
          className="cursor-pointer transition-transform hover:scale-115 active:scale-95"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <span
            className="material-symbols-outlined text-[32px] text-amber-400 transition-all duration-150"
            style={{
              fontVariationSettings:
                star <= (hovered || value) ? "'FILL' 1" : "'FILL' 0",
            }}
            aria-hidden="true"
          >
            star
          </span>
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm font-semibold text-amber-600">
          {["", "Muy malo", "Malo", "Regular", "Bueno", "Excelente"][value]}
        </span>
      )}
    </div>
  );
}

// ── Distribution bar ───────────────────────────────────────────

function RatingBar({
  stars,
  count,
  total,
}: {
  stars: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-2 shrink-0 text-right text-xs font-semibold text-slate-500">
        {stars}
      </span>
      <span
        className="material-symbols-outlined shrink-0 text-[12px] text-amber-400"
        style={{ fontVariationSettings: "'FILL' 1" }}
        aria-hidden="true"
      >
        star
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-5 shrink-0 text-right text-xs text-slate-400">
        {count}
      </span>
    </div>
  );
}

// ── Review card ────────────────────────────────────────────────

function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
  index,
}: {
  review: DbReview;
  currentUserId: string | null;
  onEdit: (review: DbReview) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  index: number;
}) {
  const isOwner = currentUserId === review.user_id;
  const date = new Date(review.created_at).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Navy left accent border */}
      <div className="bg-primary absolute inset-y-0 left-0 w-1 rounded-l-2xl opacity-70" />

      {/* Quote decoration */}
      <div
        className="pointer-events-none absolute top-3 right-4 font-serif text-7xl leading-none text-slate-100 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="py-5 pr-4 pl-5">
        {/* Top row: avatar + meta + actions */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {review.user_avatar ? (
              <Image
                src={review.user_avatar}
                alt={review.user_name}
                width={44}
                height={44}
                className="ring-primary/20 h-11 w-11 shrink-0 rounded-full object-cover ring-2"
                unoptimized
              />
            ) : (
              <div className="bg-primary/10 ring-primary/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  person
                </span>
              </div>
            )}

            {/* Name + stars + date */}
            <div>
              <p className="font-serif text-sm leading-tight font-bold text-slate-800">
                {review.user_name}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <StarDisplay rating={review.rating} size="sm" />
                <span className="text-xs text-slate-400">{date}</span>
              </div>
            </div>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onEdit(review)}
                className="hover:text-primary rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100"
                aria-label="Editar reseña"
                title="Editar"
              >
                <span className="material-symbols-outlined text-[16px]">
                  edit
                </span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(review.id)}
                disabled={isDeleting}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                aria-label="Eliminar reseña"
                title="Eliminar"
              >
                {isDeleting ? (
                  <span className="material-symbols-outlined animate-spin text-[16px]">
                    progress_activity
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[16px]">
                    delete
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Comment */}
        <p className="text-sm leading-relaxed text-slate-600">
          {review.comment}
        </p>
      </div>
    </article>
  );
}

// ── Review form ────────────────────────────────────────────────

function ReviewForm({
  productId,
  editTarget,
  onSuccess,
  onCancel,
  userInfo,
}: {
  productId: string;
  editTarget: DbReview | null;
  onSuccess: (review: DbReview) => void;
  onCancel: () => void;
  userInfo: { id: string; name: string; avatar: string | null };
}) {
  const [rating, setRating] = useState(editTarget?.rating ?? 0);
  const [comment, setComment] = useState(editTarget?.comment ?? "");
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {}
  );
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = reviewSchema.safeParse({ rating, comment });
    if (!parsed.success) {
      const fieldErrors: { rating?: string; comment?: string } = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as "rating" | "comment";
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsPending(true);
    try {
      const supabase = getSupabaseClient();

      if (editTarget) {
        const { data, error } = await supabase
          .from("product_reviews")
          .update({
            rating: parsed.data.rating,
            comment: parsed.data.comment,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editTarget.id)
          .eq("user_id", userInfo.id)
          .select()
          .single();

        if (error) {
          console.error("[ReviewForm] update error:", error);
          toast.error("No se pudo actualizar la reseña. Inténtalo de nuevo.");
          return;
        }
        toast.success("Reseña actualizada");
        onSuccess(data as DbReview);
      } else {
        const { data, error } = await supabase
          .from("product_reviews")
          .insert({
            product_id: productId,
            user_id: userInfo.id,
            rating: parsed.data.rating,
            comment: parsed.data.comment,
            user_name: userInfo.name,
            user_avatar: userInfo.avatar,
          })
          .select()
          .single();

        if (error) {
          console.error("[ReviewForm] insert error:", error);
          if (error.code === "23505") {
            toast.error("Ya tienes una reseña para este producto.");
          } else {
            toast.error("No se pudo guardar la reseña. Inténtalo de nuevo.");
          }
          return;
        }
        toast.success("¡Gracias por tu reseña!");
        onSuccess(data as DbReview);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="animate-fade-in-up border-primary/20 overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* Form header strip */}
      <div className="bg-primary px-5 py-3.5">
        <h3 className="font-serif text-sm font-bold text-white">
          {editTarget ? "Editar tu reseña" : "Comparte tu experiencia"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        {/* Star rating */}
        <div className="mb-5">
          <p className="mb-2.5 text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Calificación <span className="text-red-500">*</span>
          </p>
          <StarInput value={rating} onChange={setRating} />
          {errors.rating && (
            <p className="mt-1.5 text-xs text-red-500">{errors.rating}</p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-5">
          <label
            htmlFor="review-comment"
            className="mb-2.5 block text-xs font-semibold tracking-widest text-slate-400 uppercase"
          >
            Comentario <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Cuéntanos tu experiencia con este producto… (mínimo 10 caracteres)"
            className={cn(
              "w-full resize-none rounded-xl border bg-slate-50 p-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:bg-white focus:ring-2",
              errors.comment
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "focus:border-primary/50 focus:ring-primary/10 border-slate-200"
            )}
          />
          <div className="mt-1.5 flex items-center justify-between">
            {errors.comment ? (
              <p className="text-xs text-red-500">{errors.comment}</p>
            ) : (
              <span />
            )}
            <span
              className={cn(
                "text-xs",
                comment.length > 900 ? "text-amber-500" : "text-slate-400"
              )}
            >
              {comment.length}/1000
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">
                  progress_activity
                </span>
                Guardando…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">
                  {editTarget ? "save" : "rate_review"}
                </span>
                {editTarget ? "Guardar cambios" : "Publicar reseña"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────

export function ProductReviews({
  productId,
  initialReviews,
  averageRating,
  totalCount,
}: ProductReviewsProps) {
  const { user, showAuthModal } = useAuth();
  const [reviews, setReviews] = useState<DbReview[]>(initialReviews);
  const [aggRating, setAggRating] = useState(averageRating);
  const [aggCount, setAggCount] = useState(totalCount);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<DbReview | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const userReview = user ? reviews.find((r) => r.user_id === user.id) : null;

  // ── Aggregate helpers ────────────────────────────────────────
  const recalcAggregate = useCallback((updatedReviews: DbReview[]) => {
    const count = updatedReviews.length;
    const avg =
      count > 0
        ? Math.round(
            (updatedReviews.reduce((s, r) => s + r.rating, 0) / count) * 10
          ) / 10
        : 0;
    setAggCount(count);
    setAggRating(avg);
  }, []);

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  // ── Handlers ─────────────────────────────────────────────────
  const handleFormSuccess = useCallback(
    (newReview: DbReview) => {
      setReviews((prev) => {
        const isEdit = prev.some((r) => r.id === newReview.id);
        const updated = isEdit
          ? prev.map((r) => (r.id === newReview.id ? newReview : r))
          : [newReview, ...prev];
        recalcAggregate(updated);
        return updated;
      });
      setShowForm(false);
      setEditTarget(null);
    },
    [recalcAggregate]
  );

  const handleEdit = useCallback((review: DbReview) => {
    setEditTarget(review);
    setShowForm(true);
    setTimeout(() => {
      document
        .getElementById("review-form-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  const handleDelete = useCallback(
    async (reviewId: string) => {
      if (!user) return;
      setDeletingId(reviewId);
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("product_reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", user.id);

      if (error) {
        toast.error("No se pudo eliminar la reseña.");
        setDeletingId(null);
        return;
      }

      setReviews((prev) => {
        const updated = prev.filter((r) => r.id !== reviewId);
        recalcAggregate(updated);
        return updated;
      });
      setDeletingId(null);
      toast.success("Reseña eliminada");
    },
    [user, recalcAggregate]
  );

  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditTarget(null);
  }, []);

  // ── User info ────────────────────────────────────────────────
  const userInfo = user
    ? {
        id: user.id,
        name:
          (user.user_metadata?.full_name as string) ||
          (user.user_metadata?.name as string) ||
          user.email?.split("@")[0] ||
          "Usuario",
        avatar:
          (user.user_metadata?.avatar_url as string) ||
          (user.user_metadata?.picture as string) ||
          null,
      }
    : null;

  return (
    <section
      className="animate-fade-in-up mt-16"
      style={{ animationDelay: "350ms" }}
      aria-labelledby="reviews-heading"
    >
      {/* ── Section header ──────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2
            id="reviews-heading"
            className="font-serif text-2xl font-bold tracking-tight text-slate-900"
          >
            Reseñas
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            {aggCount === 0
              ? "Sé el primero en opinar"
              : `${aggCount} ${aggCount === 1 ? "reseña verificada" : "reseñas verificadas"}`}
          </p>
        </div>

        {/* Write review CTA */}
        {user && !userReview && !showForm && (
          <button
            type="button"
            id="add-review-btn"
            onClick={() => {
              setEditTarget(null);
              setShowForm(true);
            }}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">
              rate_review
            </span>
            Escribir reseña
          </button>
        )}
        {!user && (
          <button
            type="button"
            onClick={() => showAuthModal("reviews")}
            className="border-primary/30 bg-primary/5 text-primary hover:border-primary/50 hover:bg-primary/10 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            Inicia sesión para reseñar
          </button>
        )}
      </div>

      {/* ── Aggregate score panel (only when there are reviews) ─ */}
      {aggCount > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr]">
          {/* Score */}
          <div className="flex flex-col items-center justify-center gap-1 sm:border-r sm:border-slate-100 sm:pr-6">
            <span className="font-serif text-6xl leading-none font-bold tracking-tight text-slate-900">
              {aggRating.toFixed(1)}
            </span>
            <StarDisplay rating={Math.round(aggRating)} size="md" />
            <span className="mt-1 text-xs text-slate-400">de 5 estrellas</span>
          </div>

          {/* Distribution bars */}
          <div className="flex flex-col justify-center gap-1.5 sm:pl-2">
            {distribution.map(({ stars, count }) => (
              <RatingBar
                key={stars}
                stars={stars}
                count={count}
                total={aggCount}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Form anchor + form ──────────────────────────────── */}
      <div id="review-form-anchor" />
      {showForm && userInfo && (
        <div className="mb-6">
          <ReviewForm
            productId={productId}
            editTarget={editTarget}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
            userInfo={userInfo}
          />
        </div>
      )}

      {/* ── Reviews list ────────────────────────────────────── */}
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-3">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={user?.id ?? null}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === review.id}
              index={i}
            />
          ))}
        </div>
      ) : (
        /* ── Empty state ──────────────────────────────────── */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-14 text-center">
          <div className="bg-primary/8 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
            <span
              className="material-symbols-outlined text-primary text-[32px]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
            >
              rate_review
            </span>
          </div>
          <p className="font-serif text-base font-bold text-slate-700">
            Aún no hay reseñas
          </p>
          <p className="mt-1 max-w-xs text-sm text-slate-400">
            {user
              ? "Comparte tu experiencia con este producto y ayuda a otros clientes."
              : "Inicia sesión para ser el primero en reseñar este producto."}
          </p>
          {user && !showForm && (
            <button
              type="button"
              onClick={() => {
                setEditTarget(null);
                setShowForm(true);
              }}
              className="bg-primary hover:bg-primary/90 mt-5 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">
                rate_review
              </span>
              Ser el primero en reseñar
            </button>
          )}
          {!user && (
            <button
              type="button"
              onClick={() => showAuthModal("reviews")}
              className="border-primary/30 text-primary hover:bg-primary/5 mt-5 flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition"
            >
              <span className="material-symbols-outlined text-[14px]">
                login
              </span>
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </section>
  );
}
