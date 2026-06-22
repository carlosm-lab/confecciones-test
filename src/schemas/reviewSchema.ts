import { z } from "zod";

// ── Schema de validación para formulario de reseña ────────────
export const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "La calificación mínima es 1 estrella")
    .max(5, "La calificación máxima es 5 estrellas"),
  comment: z
    .string()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(1000, "El comentario no puede superar los 1000 caracteres"),
});
