import { z } from "zod";

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  telefono: z
    .string()
    .max(20, "El teléfono es demasiado largo")
    .optional()
    .or(z.literal("")),
  asunto: z
    .string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(200, "El asunto es demasiado largo"),
  mensaje: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede superar los 2000 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
