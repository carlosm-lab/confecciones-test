/**
 * Fuente única de verdad para los catálogos de Confecciones Liss.
 *
 * ARQUITECTURA DE RUTAS:
 * - Catálogos normales (profundidad 3): /catalogo/[sector]/[producto]
 * - Catálogos universitarios (profundidad 4): /catalogo/universidades/[universidad]/[producto]
 *   Cada universidad es su propio catálogo con su propio `catalog` value en la DB.
 *
 * NOTA: "universitario" NO es un catálogo — es el hub /catalogo/universidades
 * que solo lista las universidades disponibles. Las categorías se crean con
 * el slug de la universidad como catalog (ej: catalog = "univo").
 */

// ── Catálogos normales (profundidad 3) ────────────────────────────────────────
export const CATALOGS_GENERAL = [
  { value: "scrubs", label: "🩺 Scrubs Médicos", icon: "health_and_safety" },
  { value: "escolar", label: "🏫 Uniformes Escolares", icon: "domain" },
  {
    value: "corporativo",
    label: "💼 Uniformes Corporativos",
    icon: "business_center",
  },
  { value: "deportivo", label: "⚽ Ropa Deportiva", icon: "sports" },
  { value: "accesorios", label: "🧵 Accesorios", icon: "medical_services" },
  { value: "lenceria", label: "🌸 Lencería", icon: "favorite" },
  { value: "sublimacion", label: "🖨️ Sublimados", icon: "print" },
  { value: "ropa-calzado", label: "👗 Ropa y Calzado", icon: "checkroom" },
  { value: "tops", label: "👚 Tops y Crop Tops", icon: "dry_cleaning" },
  { value: "limpiapipas", label: "🌸 Limpiapipas / Artesanías", icon: "eco" },
] as const;

// ── Catálogos universitarios (profundidad 4) ──────────────────────────────────
// Cada universidad es su propio catálogo. El campo `catalog` en la tabla
// `categories` debe ser el slug de la universidad (ej: "univo", "ugb").
export const CATALOGS_UNIVERSITY = [
  {
    value: "univo",
    label: "🎓 UNIVO — Universidad de Oriente",
    icon: "school",
    nombre: "Universidad de Oriente",
  },
  {
    value: "ieproes",
    label: "🎓 IEPROES — Inst. Especializado de la Salud",
    icon: "school",
    nombre: "Instituto Especializado de Profesionales de la Salud",
  },
  {
    value: "ugb",
    label: "🎓 UGB — Universidad Gerardo Barrios",
    icon: "school",
    nombre: "Universidad Gerardo Barrios",
  },
  {
    value: "unab",
    label: "🎓 UNAB — Universidad Andrés Bello",
    icon: "school",
    nombre: "Universidad Andrés Bello",
  },
  {
    value: "ues",
    label: "🎓 UES — Universidad de El Salvador",
    icon: "school",
    nombre: "Universidad de El Salvador",
  },
  {
    value: "uma",
    label: "🎓 UMA — Universidad Modular Abierta",
    icon: "school",
    nombre: "Universidad Modular Abierta",
  },
] as const;

// ── Array unificado para el admin (todos los catálogos donde se pueden crear categorías) ──
export const CATALOGS = [...CATALOGS_GENERAL, ...CATALOGS_UNIVERSITY] as const;
