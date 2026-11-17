"use server";

import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "@/schemas/contactSchema";
import type { ContactFormData } from "@/schemas/contactSchema";
import { env } from "@/env";

// Rate limiting en memoria (por IP + email) - SEC-05
const messageSubmissions = new Map<
  string,
  { count: number; resetAt: number }
>();
const RATE_LIMIT_MAX = 5; // Máximo 5 mensajes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos

type ActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
    };

export async function sendContactMessage(
  data: ContactFormData & { turnstileToken?: string }
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

  // Rate limit check por IP + email (SEC-05)
  const headerStore = await headers();
  const clientIp =
    headerStore.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown-client";

  const emailKey = parsed.data.email.toLowerCase().trim();
  const rateKey = `${clientIp}:${emailKey}`;
  const now = Date.now();
  const rateRecord = messageSubmissions.get(rateKey);

  // SEC-05: Usar estrictamente la clave anónima pública para respetar las directivas RLS
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: { persistSession: false },
    }
  );

  if (rateRecord) {
    if (now < rateRecord.resetAt) {
      if (rateRecord.count >= RATE_LIMIT_MAX) {
        // Auditoría OWASP A09: Registrar violación de rate limit en contacto (SEC-09)
        try {
          await supabase.from("security_events").insert({
            event_type: "contact_rate_limit_exceeded",
            payload: { email: emailKey, ip: clientIp, count: rateRecord.count },
            url: "/contacto",
          });
        } catch {}

        return {
          success: false,
          error:
            "Has enviado varios mensajes recientemente. Por favor espera 10 minutos antes de intentar de nuevo.",
        };
      }
      rateRecord.count++;
    } else {
      messageSubmissions.set(rateKey, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }
  } else {
    messageSubmissions.set(rateKey, {
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

  // Registrar auditoría de mensaje enviado exitosamente (SEC-09)
  try {
    await supabase.from("security_events").insert({
      event_type: "contact_message_sent",
      payload: { email: emailKey, subject: parsed.data.asunto, ip: clientIp },
      url: "/contacto",
    });
  } catch {}

  return { success: true };
}
