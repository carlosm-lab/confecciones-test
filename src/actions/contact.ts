"use server";

import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "@/schemas/contactSchema";
import type { ContactFormData } from "@/schemas/contactSchema";

// Rate limiting simple en memoria (por email / identificador)
const messageSubmissions = new Map<
  string,
  { count: number; resetAt: number }
>();
const RATE_LIMIT_MAX = 3; // Máximo 3 mensajes
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutos

type ActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
    };

export async function sendContactMessage(
  data: ContactFormData
): Promise<ActionResult> {
  // Validate with Zod
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    for (const [key, issues] of Object.entries(
      parsed.error.flatten().fieldErrors
    )) {
      const k = key as keyof ContactFormData;
      fieldErrors[k] = issues?.[0];
    }
    return { success: false, error: "Datos inválidos", fieldErrors };
  }

  // Rate limit check por email
  const now = Date.now();
  const emailKey = parsed.data.email.toLowerCase().trim();
  const rateRecord = messageSubmissions.get(emailKey);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKey = serviceKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, apiKey, {
    auth: { persistSession: false },
  });

  if (rateRecord) {
    if (now < rateRecord.resetAt) {
      if (rateRecord.count >= RATE_LIMIT_MAX) {
        // Auditoría OWASP A09: Registrar violación de rate limit en contacto
        try {
          await supabase.from("security_events").insert({
            event_type: "contact_rate_limit_exceeded",
            payload: { email: emailKey, count: rateRecord.count },
            url: "/contacto",
          });
        } catch {}

        return {
          success: false,
          error:
            "Has enviado varios mensajes recientemente. Por favor espera unos minutos antes de intentar de nuevo.",
        };
      }
      rateRecord.count++;
    } else {
      messageSubmissions.set(emailKey, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }
  } else {
    messageSubmissions.set(emailKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  }

  // Limpieza periódica de mapa de rate limiting
  if (messageSubmissions.size > 500) {
    for (const [k, v] of messageSubmissions.entries()) {
      if (now > v.resetAt) messageSubmissions.delete(k);
    }
  }

  const { error } = await supabase.from("messages").insert([
    {
      name: parsed.data.nombre,
      email: parsed.data.email,
      phone: parsed.data.telefono || null,
      subject: parsed.data.asunto,
      message: parsed.data.mensaje,
    },
  ]);

  if (error) {
    console.error("[sendContactMessage] Supabase error:", error.message);
    return {
      success: false,
      error: "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
    };
  }

  // Registrar auditoría de mensaje enviado exitosamente
  try {
    await supabase.from("security_events").insert({
      event_type: "contact_message_sent",
      payload: { email: emailKey, subject: parsed.data.asunto },
      url: "/contacto",
    });
  } catch {}

  return { success: true };
}
