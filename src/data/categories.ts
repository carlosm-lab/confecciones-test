import type { CategoryConfig, Sector } from "./types";

export const SECTOR_SLUGS: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
];

export const CATEGORIES: Record<Sector, CategoryConfig> = {
  scrubs: {
    sector: "scrubs",
    title: "Uniformes Médicos de Alta Calidad",
    subtitle: "Scrubs",
    description:
      "Scrubs, batas, gorros quirúrgicos y chaquetas clínicas confeccionados con tela antimicrobiana Sincatex.",
    seoDescription:
      "Scrubs médicos, batas, gorros quirúrgicos y chaquetas clínicas confeccionados con tela antimicrobiana Sincatex. Bordado personalizado. Desde $35 en San Miguel, El Salvador.",
    icon: "health_and_safety",
    heroGradient: "bg-primary text-white",
    heroFeatures: [
      { icon: "verified", text: "Tela Sincatex" },
      { icon: "dry_cleaning", text: "Anti-fluidos" },
      { icon: "palette", text: "Bordado incluido" },
    ],
    trustFeatures: [
      { icon: "verified", text: "Tela Sincatex antimicrobiana" },
      { icon: "palette", text: "Bordado personalizado incluido" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Pago al recibir" },
    ],
    ctaBanner: {
      title: "¿Necesitas uniformes para tu equipo médico?",
      description:
        "Ofrecemos precios especiales para hospitales, clínicas y grupos de estudiantes. Bordado de logo institucional incluido.",
      ctaText: "Solicitar Cotización Grupal",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "scrubs", label: "Scrubs" },
          { value: "gorros", label: "Gorros Quirúrgicos" },
          { value: "batas", label: "Batas" },
          { value: "chaquetas", label: "Chaquetas Clínicas" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "XS", label: "XS" },
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Scrubs", icon: "medical_services" },
      { label: "Gorros", icon: "checkroom" },
      { label: "Batas", icon: "dry_cleaning" },
      { label: "Chaquetas", icon: "styler" },
    ],
  },
  universitario: {
    sector: "universitario",
    title: "Uniformes Universitarios — Zona Oriental",
    subtitle: "Universitario",
    description:
      "Scrubs clínicos con colores oficiales para UNIVO, UNAB, UGB, UMA, IEPROES, UES y más universidades de la zona oriental.",
    seoDescription:
      "Scrubs clínicos universitarios con colores oficiales para UNIVO, UNAB, UGB, UMA, IEPROES. Confeccionados a la medida en San Miguel, El Salvador. Desde $39.50.",
    icon: "school",
    heroGradient:
      "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white",
    heroFeatures: [
      { icon: "school", text: "Colores oficiales" },
      { icon: "verified", text: "Tela Sincatex" },
      { icon: "draw", text: "Bordado de carrera" },
    ],
    trustFeatures: [
      { icon: "school", text: "Colores oficiales por universidad" },
      { icon: "draw", text: "Bordado de carrera incluido" },
      { icon: "local_shipping", text: "Envío nacional" },
      { icon: "groups", text: "Precios grupales" },
    ],
    ctaBanner: {
      title: "¿Eres delegado de carrera?",
      description:
        "Ofrecemos precios especiales para grupos de más de 10 unidades. Incluye bordado de carrera.",
      ctaText: "Cotizar para mi grupo",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Universidad",
        icon: "school",
        filterField: "tipo",
        options: [
          { value: "UNIVO", label: "UNIVO" },
          { value: "UNAB", label: "UNAB" },
          { value: "UGB", label: "UGB" },
          { value: "UMA", label: "UMA" },
          { value: "IEPROES", label: "IEPROES" },
          { value: "UES", label: "UES" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "UNIVO", icon: "school" },
      { label: "UNAB", icon: "school" },
      { label: "UGB", icon: "school" },
      { label: "UMA", icon: "school" },
      { label: "IEPROES", icon: "school" },
      { label: "UES", icon: "school" },
    ],
  },
  escolar: {
    sector: "escolar",
    title: "Uniformes Escolares a la Medida",
    subtitle: "Escolar",
    description:
      "Camisas, faldas, pantalones y suéteres escolares para colegios de San Miguel y zona oriental.",
    seoDescription:
      "Uniformes escolares para colegios y escuelas de San Miguel, El Salvador. Camisas, faldas, pantalones con colores institucionales. Desde $12.",
    icon: "domain",
    heroGradient: "bg-emerald-900 text-white",
    heroFeatures: [
      { icon: "checkroom", text: "Tela durable" },
      { icon: "palette", text: "Colores institucionales" },
      { icon: "straighten", text: "A la medida" },
    ],
    trustFeatures: [
      { icon: "checkroom", text: "Tela resistente al uso diario" },
      { icon: "palette", text: "Colores institucionales exactos" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Precios desde $8" },
    ],
    ctaBanner: {
      title: "¿Uniformes para tu colegio?",
      description:
        "Producimos uniformes en volumen para instituciones educativas con precios especiales y bordado incluido.",
      ctaText: "Solicitar cotización institucional",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "camisas", label: "Camisas" },
          { value: "faldas", label: "Faldas" },
          { value: "pantalones", label: "Pantalones" },
          { value: "sueteres", label: "Suéteres" },
          { value: "corbatas", label: "Corbatas" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "4", label: "4" },
          { value: "6", label: "6" },
          { value: "8", label: "8" },
          { value: "10", label: "10" },
          { value: "12", label: "12" },
          { value: "14", label: "14" },
          { value: "16", label: "16" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Camisas", icon: "checkroom" },
      { label: "Faldas", icon: "dry_cleaning" },
      { label: "Pantalones", icon: "styler" },
      { label: "Suéteres", icon: "warm" },
    ],
  },
  corporativo: {
    sector: "corporativo",
    title: "Uniformes Corporativos Profesionales",
    subtitle: "Corporativo",
    description:
      "Camisas, polos, gabachas y chalecos con bordado de logo y colores institucionales para empresas.",
    seoDescription:
      "Camisas, polos, gabachas y chalecos corporativos con bordado de logo y colores institucionales. Precios por volumen desde 10 unidades. San Miguel, El Salvador.",
    icon: "business_center",
    heroGradient: "relative bg-[#1a1a2e] text-white",
    heroFeatures: [
      { icon: "business_center", text: "Imagen empresarial" },
      { icon: "draw", text: "Bordado de logo" },
      { icon: "groups", text: "Desde 10 unidades" },
    ],
    trustFeatures: [
      { icon: "verified", text: "Telas premium de larga duración" },
      { icon: "draw", text: "Bordado de logo incluido" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "groups", text: "Precios por volumen" },
    ],
    ctaBanner: {
      title: "¿Uniformes para tu empresa?",
      description:
        "Cotiza uniformes con tu logo bordado. Precios especiales desde 10 unidades.",
      ctaText: "Solicitar cotización corporativa",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "camisas", label: "Camisas" },
          { value: "polos", label: "Polos" },
          { value: "gabachas", label: "Gabachas" },
          { value: "chalecos", label: "Chalecos" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Camisas", icon: "checkroom" },
      { label: "Polos", icon: "dry_cleaning" },
      { label: "Gabachas", icon: "styler" },
      { label: "Chalecos", icon: "warm" },
    ],
  },
  deportivo: {
    sector: "deportivo",
    title: "Ropa Deportiva Personalizada",
    subtitle: "Deportivo",
    description:
      "Uniformes deportivos con sublimación completa para equipos, academias y ligas locales.",
    seoDescription:
      "Ropa deportiva personalizada con sublimación. Uniformes para equipos de fútbol, basketball y más. San Miguel, El Salvador.",
    icon: "sports",
    heroGradient:
      "bg-gradient-to-br from-orange-800 via-amber-900 to-red-900 text-white",
    heroFeatures: [
      { icon: "palette", text: "Sublimación total" },
      { icon: "sports", text: "Todas las disciplinas" },
      { icon: "groups", text: "Equipos completos" },
    ],
    trustFeatures: [
      { icon: "palette", text: "Diseño sublimado a full color" },
      { icon: "sports", text: "Corte deportivo ergonómico" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "groups", text: "Precios por equipo" },
    ],
    ctaBanner: {
      title: "¿Uniformes para tu equipo?",
      description:
        "Sublimación completa con diseño personalizado. Cotiza para tu liga o academia.",
      ctaText: "Cotizar uniformes deportivos",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "camisetas", label: "Camisetas" },
          { value: "shorts", label: "Shorts" },
          { value: "conjuntos", label: "Conjuntos" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Camisetas", icon: "sports" },
      { label: "Shorts", icon: "checkroom" },
      { label: "Conjuntos", icon: "dry_cleaning" },
    ],
  },
  accesorios: {
    sector: "accesorios",
    title: "Accesorios y Complementos",
    subtitle: "Accesorios",
    description:
      "Gorros quirúrgicos, corbatas, llaveros, pines, artículos de enfermería y complementos para uniformes.",
    seoDescription:
      "Accesorios para uniformes: gorros quirúrgicos, corbatas, llaveros, pines y detalles de enfermería. Confecciones Liss, San Miguel.",
    icon: "medical_services",
    heroGradient:
      "bg-gradient-to-br from-teal-800 via-teal-900 to-cyan-900 text-white",
    heroFeatures: [
      { icon: "checkroom", text: "Complementos" },
      { icon: "palette", text: "Personalización" },
      { icon: "draw", text: "Bordado disponible" },
    ],
    trustFeatures: [
      { icon: "checkroom", text: "Complementos profesionales" },
      { icon: "palette", text: "Personalización incluida" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Precios accesibles" },
    ],
    ctaBanner: {
      title: "¿Necesitas complementos?",
      description:
        "Todos los accesorios para completar tu uniforme profesional o institucional.",
      ctaText: "Ver accesorios disponibles",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Artículo",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "gorros", label: "Gorros" },
          { value: "llaveros", label: "Llaveros" },
          { value: "pines", label: "Pines" },
          { value: "detalles", label: "Detalles de Enfermería" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Gorros", icon: "checkroom" },
      { label: "Llaveros", icon: "key" },
      { label: "Pines", icon: "push_pin" },
    ],
  },
};
