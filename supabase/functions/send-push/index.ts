import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Web Push (VAPID) — usando la librería de Deno ─────────────
// Implementación manual ya que web-push no está en Deno
async function generateVAPIDAuthHeader(
  audience: string,
  subject: string,
  publicKey: string,
  privateKey: string
): Promise<string> {
  const header = { typ: "JWT", alg: "ES256" };
  const payload = {
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12h
    sub: subject,
  };

  function base64UrlEncode(data: Uint8Array): string {
    const b64 = btoa(String.fromCharCode(...data));
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }

  function strToBase64Url(str: string): string {
    return base64UrlEncode(new TextEncoder().encode(str));
  }

  const headerB64 = strToBase64Url(JSON.stringify(header));
  const payloadB64 = strToBase64Url(JSON.stringify(payload));
  const toSign = `${headerB64}.${payloadB64}`;

  // Importar clave privada ECDSA P-256
  const rawKey = Uint8Array.from(
    atob(privateKey.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    rawKey,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    cryptoKey,
    new TextEncoder().encode(toSign)
  );

  const sigB64 = base64UrlEncode(new Uint8Array(signature));
  const token = `${toSign}.${sigB64}`;

  return `vapid t=${token},k=${publicKey}`;
}

async function sendPushToSubscription(
  sub: { endpoint: string; p256dh: string; auth: string },
  payload: string,
  vapidPublicKey: string,
  vapidPrivateKey: string,
  vapidSubject: string
): Promise<boolean> {
  try {
    const url = new URL(sub.endpoint);
    const audience = `${url.protocol}//${url.host}`;
    const authHeader = await generateVAPIDAuthHeader(
      audience,
      vapidSubject,
      vapidPublicKey,
      vapidPrivateKey
    );

    const response = await fetch(sub.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: authHeader,
        TTL: "86400",
      },
      body: new TextEncoder().encode(payload),
    });

    return response.ok || response.status === 201;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  try {
    const { notification_id } = (await req.json()) as {
      notification_id: string;
    };
    if (!notification_id) {
      return new Response(
        JSON.stringify({ error: "notification_id required" }),
        {
          status: 400,
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
    const vapidSubject = Deno.env.get("VAPID_SUBJECT")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obtener la notificación
    const { data: notif, error: notifErr } = await supabase
      .from("notifications")
      .select("id, title, message, image_url, target_url, type")
      .eq("id", notification_id)
      .single();

    if (notifErr || !notif) {
      return new Response(JSON.stringify({ error: "Notification not found" }), {
        status: 404,
      });
    }

    // Obtener todas las suscripciones
    const { data: subs, error: subsErr } = await supabase
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth");

    if (subsErr || !subs || subs.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0, message: "No subscribers" }),
        {
          status: 200,
        }
      );
    }

    const payload = JSON.stringify({
      title: notif.title,
      message: notif.message,
      image_url: notif.image_url,
      target_url: notif.target_url ?? "/",
      tag: `notif-${notif.id}`,
    });

    // Enviar en paralelo (máx 10 a la vez para no sobrecargar)
    const results = { sent: 0, failed: 0, expired: [] as string[] };
    const batchSize = 10;

    for (let i = 0; i < subs.length; i += batchSize) {
      const batch = subs.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (sub) => {
          const ok = await sendPushToSubscription(
            sub as { endpoint: string; p256dh: string; auth: string },
            payload,
            vapidPublicKey,
            vapidPrivateKey,
            vapidSubject
          );
          if (ok) {
            results.sent++;
          } else {
            results.failed++;
            results.expired.push(sub.endpoint);
          }
        })
      );
    }

    // Limpiar suscripciones expiradas (endpoint devolvió error)
    if (results.expired.length > 0) {
      await supabase
        .from("push_subscriptions")
        .delete()
        .in("endpoint", results.expired);
    }

    // Marcar notificación como enviada
    await supabase
      .from("notifications")
      .update({ push_sent: true })
      .eq("id", notification_id);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
});
