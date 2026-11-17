// ──────────────────────────────────────────────────────────────
// SANITIZACIÓN DE INPUTS Y URLS
// ──────────────────────────────────────────────────────────────
// Primera línea de defensa contra XSS en el frontend.
// Bloquea protocolos peligrosos (javascript:, data:, vbscript:).
// ──────────────────────────────────────────────────────────────

/**
 * SEC-13: Valida que una URL relativa comience con una única barra '/'
 * y no contenga secuencias de escape como '//', '/\' o caracteres backslash '\'
 * que puedan causar redirecciones abiertas en navegadores Chromium/WebKit.
 */
export function isValidRelativeUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return (
    trimmed.startsWith("/") &&
    !trimmed.startsWith("//") &&
    !trimmed.startsWith("/\\") &&
    !trimmed.includes("\\")
  );
}

/**
 * Sanitiza una URL. Bloquea protocolos peligrosos.
 * Retorna string vacío si la URL es sospechosa.
 */
export const sanitizeUrl = (url: unknown): string => {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();

  // Permite rutas relativas seguras (SEC-13)
  if (trimmed.startsWith("/")) {
    return isValidRelativeUrl(trimmed) ? trimmed : "";
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }

    const host = parsed.hostname.toLowerCase();
    const isWhitelisted =
      host === "lh3.googleusercontent.com" ||
      host.endsWith(".googleusercontent.com") ||
      host === "confeccionesliss.com" ||
      host.endsWith(".confeccionesliss.com") ||
      host.endsWith(".supabase.co") ||
      host === "localhost" ||
      host === "127.0.0.1";

    if (isWhitelisted) {
      return trimmed;
    }
  } catch {
    // URL malformada
  }

  return "";
};
