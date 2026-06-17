/**
 * Fuente única de verdad para los catálogos de Confecciones Liss.
 * Importar desde aquí en lugar de duplicar en cada archivo.
 */
export const CATALOGS = [
  { value: "scrubs", label: "🩺 Scrubs Médicos", icon: "health_and_safety" },
  {
    value: "universitario",
    label: "🎓 Uniformes Universitarios",
    icon: "school",
  },
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
