// ──────────────────────────────────────────────────────────────
// GENERADOR DE SLUGS
// ──────────────────────────────────────────────────────────────
// Se usa al crear categorías y productos en el admin.
// Normaliza: español (tildes/ñ), emojis y caracteres especiales.
// ──────────────────────────────────────────────────────────────

export const generateSlug = (text: string): string => {
  if (!text) return "";
  const slug = text
    .toString()
    .normalize("NFD") // Separa tildes: é → e + ´
    .replace(/[\u0300-\u036f]/g, "") // Elimina marcas diacríticas
    .toLowerCase()
    .replace(/[^\w\s-]/gi, " ") // Emojis y símbolos → espacios
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // Solo ASCII safe
    .replace(/\s+/g, "-") // Espacios → guiones
    .replace(/-+/g, "-") // Colapsa guiones múltiples
    .replace(/^-+|-+$/g, ""); // Quita guiones al inicio/final

  // Fallback: si el texto era puramente emojis/símbolos
  return slug || `item-${Date.now()}`;
};
