import type { CatalogSubPage, Product } from "./types";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "./categories";

// Reutilizamos algunas features comunes
const trustFeaturesStandard = [
  { icon: "local_shipping", text: "Envío a todo El Salvador" },
  { icon: "payments", text: "Pago al recibir" },
  { icon: "verified", text: "Confección garantizada" },
  { icon: "support_agent", text: "Atención personalizada" },
];

export const CATALOG_PAGES: CatalogSubPage[] = [
  // ==========================================
  // SECTOR: SCRUBS
  // ==========================================
  {
    slug: "scrubs",
    parentSector: "scrubs",
    navLabel: "Scrubs",
    navIcon: "health_and_safety",
    title: CATEGORIES.scrubs.title,
    subtitle: "Catálogo de Scrubs",
    seoTitle: "Scrubs Médicos en El Salvador | Confecciones Liss",
    seoDescription: CATEGORIES.scrubs.seoDescription,
    description: CATEGORIES.scrubs.description,
    heroGradient: CATEGORIES.scrubs.heroGradient,
    heroFeatures: CATEGORIES.scrubs.heroFeatures,
    trustFeatures: CATEGORIES.scrubs.trustFeatures,
    ctaBanner: CATEGORIES.scrubs.ctaBanner,
    filterFn: (products) => products.filter((p) => p.sector === "scrubs"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "scrubs-medicos-sincatex",
    parentSector: "scrubs",
    navLabel: "Scrubs Sincatex",
    navIcon: "verified_user",
    title: "Scrubs Médicos en Tela Sincatex",
    subtitle: "Scrubs Anti-fluidos",
    seoTitle: "Scrubs Médicos Tela Sincatex Anti-fluidos | Confecciones Liss",
    seoDescription:
      "Scrubs médicos confeccionados en tela Sincatex anti-fluidos. Alta durabilidad, protección antimicrobiana y colores firmes. A la medida en San Miguel.",
    description:
      "Nuestros scrubs premium están confeccionados con tela Sincatex original, garantizando propiedades anti-fluidos, protección antimicrobiana y máxima comodidad para largas jornadas laborales.",
    heroGradient:
      "bg-gradient-to-br from-[#143067] via-[#1a3d7c] to-[#0d2147] text-white",
    heroFeatures: [
      { icon: "verified", text: "100% Sincatex Original" },
      { icon: "water_drop", text: "Repelente a fluidos" },
      { icon: "shield", text: "Antimicrobiano" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.scrubs.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "scrubs" && p.tipo === "scrubs"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "gorros-quirurgicos",
    parentSector: "scrubs",
    navLabel: "Gorros",
    navIcon: "face",
    title: "Gorros Quirúrgicos Personalizados",
    subtitle: "Gorros Médicos",
    seoTitle: "Gorros Quirúrgicos Personalizados | Confecciones Liss",
    seoDescription:
      "Gorros quirúrgicos de tela para médicos y enfermeras. Variedad de colores, ajustables y opción de bordado personalizado. Envíos a todo El Salvador.",
    description:
      "Gorros quirúrgicos confeccionados a la medida con amarre trasero o banda elástica. Disponibles en colores sólidos para combinar con tu scrub o estampados médicos.",
    heroGradient: "bg-teal-900 text-white",
    heroFeatures: [
      { icon: "draw", text: "Bordado de nombre" },
      { icon: "tune", text: "Ajuste perfecto" },
      { icon: "palette", text: "Múltiples colores" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.scrubs.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "scrubs" && p.tipo === "gorros"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "batas-medicas",
    parentSector: "scrubs",
    navLabel: "Batas",
    navIcon: "dry_cleaning",
    title: "Batas Médicas y de Laboratorio",
    subtitle: "Batas Clínicas",
    seoTitle: "Batas Médicas Profesionales | Confecciones Liss San Miguel",
    seoDescription:
      "Batas médicas, de laboratorio y gabachas clínicas con bordado de especialidad. Corte profesional, tela resistente. Confección en San Miguel.",
    description:
      "Batas clínicas de manga larga, manga corta y tres cuartos. Confeccionadas con gabardina médica de alta resistencia. Incluyen bordado de logo institucional y nombre del profesional.",
    heroGradient: "bg-slate-800 text-white",
    heroFeatures: [
      { icon: "draw", text: "Bordado incluido" },
      { icon: "straighten", text: "Corte profesional" },
      { icon: "iron", text: "Fácil planchado" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.scrubs.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "scrubs" && p.tipo === "batas"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "chaquetas-clinicas",
    parentSector: "scrubs",
    navLabel: "Chaquetas",
    navIcon: "styler",
    title: "Chaquetas Clínicas",
    subtitle: "Ropa Clínica Térmica",
    seoTitle: "Chaquetas Clínicas Profesionales | Confecciones Liss",
    seoDescription:
      "Chaquetas clínicas cálidas y profesionales para ambientes con aire acondicionado. Bordado de logo incluido. Confecciones Liss El Salvador.",
    description:
      "Mantén una imagen profesional en áreas climatizadas. Nuestras chaquetas clínicas combinan diseño elegante con materiales térmicos ligeros ideales para hospitales y clínicas.",
    heroGradient: "bg-blue-900 text-white",
    heroFeatures: [
      { icon: "thermostat", text: "Confort térmico" },
      { icon: "draw", text: "Personalizables" },
      { icon: "business", text: "Diseño elegante" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.scrubs.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "scrubs" && p.tipo === "chaquetas"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-enfermeria",
    parentSector: "scrubs",
    navLabel: "Enfermería",
    navIcon: "medical_services",
    title: "Uniformes Clínicos para Enfermería",
    subtitle: "Enfermería",
    seoTitle: "Uniformes de Enfermería a la Medida | Confecciones Liss",
    seoDescription:
      "Uniformes blancos clásicos y scrubs de colores para enfermeras y enfermeros. Confección a la medida garantizando comodidad y movilidad.",
    description:
      "Comprendemos la exigencia de los turnos de enfermería. Nuestros uniformes combinan cortes ergonómicos, telas stretch repelentes a fluidos y bolsillos estratégicos para máxima funcionalidad.",
    heroGradient: "bg-sky-800 text-white",
    heroFeatures: [
      { icon: "accessibility", text: "Libertad de movimiento" },
      { icon: "water_drop", text: "Fácil limpieza" },
      { icon: "work", text: "Bolsillos reforzados" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.scrubs.ctaBanner,
    filterFn: (products) => products.filter((p) => p.sector === "scrubs"),
    jsonLdType: "CollectionPage",
  },

  // ==========================================
  // SECTOR: UNIVERSITARIO
  // ==========================================
  {
    slug: "universitario",
    parentSector: "universitario",
    navLabel: "Universitario",
    navIcon: "school",
    title: CATEGORIES.universitario.title,
    subtitle: "Catálogo Universitario",
    seoTitle: "Uniformes Universitarios en San Miguel | Confecciones Liss",
    seoDescription: CATEGORIES.universitario.seoDescription,
    description: CATEGORIES.universitario.description,
    heroGradient: CATEGORIES.universitario.heroGradient,
    heroFeatures: CATEGORIES.universitario.heroFeatures,
    trustFeatures: CATEGORIES.universitario.trustFeatures,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "universitario"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-univo",
    parentSector: "universitario",
    navLabel: "UNIVO",
    navIcon: "local_library",
    title: "Uniformes Universidad de Oriente (UNIVO)",
    subtitle: "Scrubs UNIVO",
    seoTitle: "Uniformes UNIVO San Miguel | Medicina y Enfermería",
    seoDescription:
      "Uniformes oficiales de la UNIVO. Scrubs clínicos para estudiantes de medicina, enfermería y carreras de la salud con bordado oficial.",
    description:
      "Confeccionamos el uniforme clínico oficial de la Universidad de Oriente (UNIVO) con los códigos de color exactos y los bordados institucionales aprobados por la facultad de ciencias de la salud.",
    heroGradient: "bg-[#7c1d35] text-white", // Color representativo UNIVO (ejemplo)
    heroFeatures: [
      { icon: "palette", text: "Color oficial UNIVO" },
      { icon: "draw", text: "Bordado institucional" },
      { icon: "groups", text: "Precios de sección" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) => products.filter((p) => p.tipo === "UNIVO"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-unab",
    parentSector: "universitario",
    navLabel: "UNAB",
    navIcon: "local_library",
    title: "Uniformes Universidad Dr. Andrés Bello (UNAB)",
    subtitle: "Scrubs UNAB",
    seoTitle: "Uniformes UNAB San Miguel | Enfermería y Salud",
    seoDescription:
      "Uniformes oficiales de la UNAB. Especialistas en enfermería, laboratorio clínico y fisioterapia. Precios especiales para grupos.",
    description:
      "Ubicados a 50 metros del anexo UNAB, somos tu mejor opción para el uniforme clínico oficial. Trabajamos con las telas recomendadas y garantizamos el cumplimiento del reglamento institucional.",
    heroGradient: "bg-[#0b3c5d] text-white", // Color representativo UNAB
    heroFeatures: [
      { icon: "location_on", text: "A 50m del campus" },
      { icon: "palette", text: "Colores exactos" },
      { icon: "verified", text: "Aprobados por facultad" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) => products.filter((p) => p.tipo === "UNAB"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-ugb",
    parentSector: "universitario",
    navLabel: "UGB",
    navIcon: "local_library",
    title: "Uniformes Universidad Gerardo Barrios (UGB)",
    subtitle: "Scrubs UGB",
    seoTitle: "Uniformes UGB San Miguel | Confecciones Liss",
    seoDescription:
      "Uniformes clínicos oficiales de la UGB. Confección a la medida con bordado institucional para todas las carreras de la facultad de salud.",
    description:
      "Adquiere tu scrub oficial de la Universidad Gerardo Barrios (UGB). Realizamos confección sobre medida para asegurar tu confort durante prácticas hospitalarias y laboratorios.",
    heroGradient: "bg-[#005a32] text-white", // Verde UGB
    heroFeatures: [
      { icon: "straighten", text: "Confección a medida" },
      { icon: "draw", text: "Logo UGB bordado" },
      { icon: "payments", text: "Descuento a grupos" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) => products.filter((p) => p.tipo === "UGB"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-uma",
    parentSector: "universitario",
    navLabel: "UMA",
    navIcon: "local_library",
    title: "Uniformes Universidad Modular Abierta (UMA)",
    subtitle: "Uniformes UMA",
    seoTitle: "Uniformes UMA San Miguel | Confecciones Liss",
    seoDescription:
      "Scrubs y uniformes oficiales para estudiantes de la UMA. Diseños cómodos, tela resistente y bordados de alta calidad.",
    description:
      "Producimos uniformes que cumplen con todos los requerimientos de la Universidad Modular Abierta (UMA). Calidad garantizada que resiste el lavado constante durante toda tu carrera.",
    heroGradient: "bg-[#1d4ed8] text-white", // Azul UMA
    heroFeatures: [
      { icon: "check_circle", text: "Normativa UMA" },
      { icon: "wash", text: "Tela resistente al lavado" },
      { icon: "thumb_up", text: "Alta durabilidad" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) => products.filter((p) => p.tipo === "UMA"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-ieproes",
    parentSector: "universitario",
    navLabel: "IEPROES",
    navIcon: "local_library",
    title: "Uniformes IEPROES",
    subtitle: "Scrubs IEPROES",
    seoTitle: "Uniformes IEPROES San Miguel | Confecciones Liss",
    seoDescription:
      "Uniformes clínicos oficiales para estudiantes del IEPROES. Enfermería y salud ambiental. A la medida y con colores institucionales.",
    description:
      "Especialistas en la confección de uniformes para el Instituto Especializado de Profesionales de la Salud (IEPROES). Diseñados para brindar presentación impecable en tus pasantías hospitalarias.",
    heroGradient: "bg-[#0f766e] text-white",
    heroFeatures: [
      { icon: "school", text: "Especialidad en salud" },
      { icon: "stars", text: "Presentación impecable" },
      { icon: "draw", text: "Personalizados" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) => products.filter((p) => p.tipo === "IEPROES"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-ues",
    parentSector: "universitario",
    navLabel: "UES",
    navIcon: "local_library",
    title: "Uniformes Universidad de El Salvador (UES)",
    subtitle: "Scrubs UES",
    seoTitle: "Uniformes UES Facultad Multidisciplinaria Oriental | San Miguel",
    seoDescription:
      "Scrubs y batas médicas oficiales de la UES FMO. Medicina y laboratorios con bordado institucional. A la medida.",
    description:
      "Orgullosamente confeccionamos batas clínicas y scrubs para estudiantes de medicina y carreras afines de la Universidad de El Salvador (UES) Facultad Multidisciplinaria Oriental.",
    heroGradient: "bg-[#b91c1c] text-white", // Rojo UES
    heroFeatures: [
      { icon: "account_balance", text: "Estándar FMO" },
      { icon: "draw", text: "Logo UES oficial" },
      { icon: "sell", text: "Precios accesibles" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.universitario.ctaBanner,
    filterFn: (products) => products.filter((p) => p.tipo === "UES"),
    jsonLdType: "CollectionPage",
  },

  // ==========================================
  // SECTOR: ESCOLAR
  // ==========================================
  {
    slug: "escolar",
    parentSector: "escolar",
    navLabel: "Escolar",
    navIcon: "domain",
    title: CATEGORIES.escolar.title,
    subtitle: "Catálogo Escolar",
    seoTitle: "Uniformes Escolares a la Medida | Confecciones Liss",
    seoDescription: CATEGORIES.escolar.seoDescription,
    description: CATEGORIES.escolar.description,
    heroGradient: CATEGORIES.escolar.heroGradient,
    heroFeatures: CATEGORIES.escolar.heroFeatures,
    trustFeatures: CATEGORIES.escolar.trustFeatures,
    ctaBanner: CATEGORIES.escolar.ctaBanner,
    filterFn: (products) => products.filter((p) => p.sector === "escolar"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "camisas-escolares",
    parentSector: "escolar",
    navLabel: "Camisas",
    navIcon: "checkroom",
    title: "Camisas y Polos Escolares",
    subtitle: "Prendas Superiores",
    seoTitle: "Camisas Escolares con Insignia | Confecciones Liss",
    seoDescription:
      "Camisas escolares blancas y de colores, mangas largas y cortas, blusas para niñas. Bordado de insignia del colegio incluido.",
    description:
      "Confeccionamos camisas formales, blusas tipo princesa y camisas polo (Piqué) para colegios. Usamos telas como Dacron y Oxford que mantienen su frescura y facilitan el planchado diario.",
    heroGradient: "bg-emerald-800 text-white",
    heroFeatures: [
      { icon: "iron", text: "Planchado fácil" },
      { icon: "air", text: "Telas frescas" },
      { icon: "draw", text: "Insignia bordada" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.escolar.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "escolar" && p.tipo === "camisas"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "faldas-escolares",
    parentSector: "escolar",
    navLabel: "Faldas",
    navIcon: "styler",
    title: "Faldas Escolares a la Medida",
    subtitle: "Faldas Estudiantiles",
    seoTitle: "Faldas Escolares Plisadas y Formales | Confecciones Liss",
    seoDescription:
      "Faldas escolares plisadas, paletonadas, rectas y jumpers. Confeccionadas a la medida exacta con telas gabardinas y cuadros sintéticos.",
    description:
      "Faldas que cumplen el reglamento de tu institución con el largo y estilo adecuado (plisadas, con paletones, o rectas). Confeccionadas individualmente para garantizar el talle correcto de cada alumna.",
    heroGradient: "bg-teal-700 text-white",
    heroFeatures: [
      { icon: "straighten", text: "Largo reglamentario" },
      { icon: "check_circle", text: "Plisados duraderos" },
      { icon: "style", text: "Diseño exacto" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.escolar.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "escolar" && p.tipo === "faldas"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "pantalones-escolares",
    parentSector: "escolar",
    navLabel: "Pantalones",
    navIcon: "straighten",
    title: "Pantalones Escolares",
    subtitle: "Pantalones de Uniforme",
    seoTitle: "Pantalones Escolares para Jóvenes y Niños | Confecciones Liss",
    seoDescription:
      "Pantalones de uniforme escolar en color azul, gris, caqui y negro. Tela gabardina de uso rudo. Tallas completas o confección sobre medida.",
    description:
      "Pantalones de uniforme con cortes modernos o clásicos según el colegio. Usamos gabardinas de alto gramaje para resistir el uso continuo y el desgaste natural de la actividad escolar.",
    heroGradient: "bg-slate-700 text-white",
    heroFeatures: [
      { icon: "shield", text: "Tela de alto tráfico" },
      { icon: "straighten", text: "Basta a la medida" },
      { icon: "construction", text: "Costuras reforzadas" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.escolar.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "escolar" && p.tipo === "pantalones"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "sueteres-escolares",
    parentSector: "escolar",
    navLabel: "Suéteres",
    navIcon: "cloud",
    title: "Suéteres y Chumpas Escolares",
    subtitle: "Ropa de Invierno Escolar",
    seoTitle: "Suéteres Escolares y Sudaderas | Confecciones Liss",
    seoDescription:
      "Suéteres tejidos, sudaderas (hoodies) y chumpas deportivas para uniforme escolar con bordado de escudo de la institución.",
    description:
      "Prendas de abrigo oficiales para complementar el uniforme. Fabricamos suéteres abiertos y cerrados, sudaderas de algodón y chumpas impermeables en los colores del centro educativo.",
    heroGradient: "bg-cyan-900 text-white",
    heroFeatures: [
      { icon: "thermostat", text: "Abrigo ideal" },
      { icon: "draw", text: "Escudo incluido" },
      { icon: "groups", text: "Promociones (Promo)" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.escolar.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "escolar" && p.tipo === "sueteres"),
    jsonLdType: "CollectionPage",
  },

  // ==========================================
  // SECTOR: CORPORATIVO
  // ==========================================
  {
    slug: "corporativo",
    parentSector: "corporativo",
    navLabel: "Corporativo",
    navIcon: "business_center",
    title: CATEGORIES.corporativo.title,
    subtitle: "Catálogo Corporativo",
    seoTitle: "Uniformes Corporativos Empresariales | Confecciones Liss",
    seoDescription: CATEGORIES.corporativo.seoDescription,
    description: CATEGORIES.corporativo.description,
    heroGradient: CATEGORIES.corporativo.heroGradient,
    heroFeatures: CATEGORIES.corporativo.heroFeatures,
    trustFeatures: CATEGORIES.corporativo.trustFeatures,
    ctaBanner: CATEGORIES.corporativo.ctaBanner,
    filterFn: (products) => products.filter((p) => p.sector === "corporativo"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "camisas-corporativas",
    parentSector: "corporativo",
    navLabel: "Camisas",
    navIcon: "checkroom",
    title: "Camisas Ejecutivas Corporativas",
    subtitle: "Uniformes de Oficina",
    seoTitle:
      "Camisas Ejecutivas Corporativas con Logo Bordado | Confecciones Liss",
    seoDescription:
      "Camisas Oxford y manga corta para oficina y ejecutivos. Bordado de logo empresarial de alta precisión. Presencia profesional garantizada.",
    description:
      "Proyecta confianza y profesionalismo. Nuestras camisas ejecutivas combinan cortes elegantes con telas resistentes a las arrugas, ideales para representantes de ventas, gerentes y personal administrativo.",
    heroGradient: "bg-[#1f2937] text-white",
    heroFeatures: [
      { icon: "business", text: "Imagen profesional" },
      { icon: "iron", text: "Anti-arrugas" },
      { icon: "draw", text: "Bordado corporativo" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.corporativo.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "corporativo" && p.tipo === "camisas"
      ),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "polos-empresariales",
    parentSector: "corporativo",
    navLabel: "Polos",
    navIcon: "dry_cleaning",
    title: "Camisas Polo Empresariales",
    subtitle: "Uniformes Casuales",
    seoTitle: "Camisas Polo Empresariales Personalizadas | Confecciones Liss",
    seoDescription:
      "Camisas polo tipo piqué y Dri-Fit para uniformes de campo, eventos y negocios casuales. Bordado de marca incluido.",
    description:
      "El equilibrio perfecto entre comodidad y presentación. Ofrecemos camisas polo en algodón transpirable (Piqué) y poliéster (Dri-Fit) para personal operativo, técnico o eventos corporativos.",
    heroGradient: "bg-[#334155] text-white",
    heroFeatures: [
      { icon: "air", text: "Telas transpirables" },
      { icon: "palette", text: "Todos los colores" },
      { icon: "event", text: "Ideal para eventos" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.corporativo.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "corporativo" && p.tipo === "polos"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "gabachas-industriales",
    parentSector: "corporativo",
    navLabel: "Gabachas",
    navIcon: "styler",
    title: "Gabachas Industriales y Operativas",
    subtitle: "Ropa de Trabajo",
    seoTitle: "Gabachas Industriales y Comerciales | Confecciones Liss",
    seoDescription:
      "Gabachas para personal de limpieza, mantenimiento, supermercados y farmacias. Diseños funcionales con múltiples bolsillos.",
    description:
      "Ropa de trabajo operativa diseñada para la acción. Gabachas resistentes, chalecos estilo safari y overoles que protegen al empleado manteniendo una identidad visual corporativa unificada.",
    heroGradient: "bg-[#0f172a] text-white",
    heroFeatures: [
      { icon: "construction", text: "Alta resistencia" },
      { icon: "work", text: "Bolsillos utilitarios" },
      { icon: "cleaning_services", text: "Personal operativo" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.corporativo.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "corporativo" && p.tipo === "gabachas"
      ),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "chalecos-corporativos",
    parentSector: "corporativo",
    navLabel: "Chalecos",
    navIcon: "safety_divider",
    title: "Chalecos Corporativos y de Seguridad",
    subtitle: "Chalecos Utilitarios",
    seoTitle:
      "Chalecos Corporativos, Industriales y Seguridad | Confecciones Liss",
    seoDescription:
      "Chalecos multibolsillos, de seguridad reflectivos y ejecutivos. Personalización con logo empresarial para identificación en campo.",
    description:
      "Soluciones de identificación en campo. Chalecos estilo periodista, de seguridad con cinta reflectiva (norma ANSI), y chalecos ejecutivos de vestir para completar el uniforme corporativo.",
    heroGradient: "bg-[#1e293b] text-white",
    heroFeatures: [
      { icon: "verified_user", text: "Visibilidad en campo" },
      { icon: "badge", text: "Identificación clara" },
      { icon: "security", text: "Cintas reflectivas" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.corporativo.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "corporativo" && p.tipo === "chalecos"
      ),
    jsonLdType: "CollectionPage",
  },

  // ==========================================
  // SECTOR: DEPORTIVO
  // ==========================================
  {
    slug: "deportivo",
    parentSector: "deportivo",
    navLabel: "Deportivo",
    navIcon: "sports",
    title: CATEGORIES.deportivo.title,
    subtitle: "Uniformes Deportivos",
    seoTitle:
      "Ropa Deportiva Personalizada por Sublimación | Confecciones Liss",
    seoDescription: CATEGORIES.deportivo.seoDescription,
    description: CATEGORIES.deportivo.description,
    heroGradient: CATEGORIES.deportivo.heroGradient,
    heroFeatures: CATEGORIES.deportivo.heroFeatures,
    trustFeatures: CATEGORIES.deportivo.trustFeatures,
    ctaBanner: CATEGORIES.deportivo.ctaBanner,
    filterFn: (products) => products.filter((p) => p.sector === "deportivo"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "camisetas-deportivas",
    parentSector: "deportivo",
    navLabel: "Camisetas",
    navIcon: "apparel",
    title: "Camisetas Deportivas Sublimadas",
    subtitle: "Camisetas Dri-Fit",
    seoTitle: "Camisetas Deportivas Sublimadas | Diseño Libre",
    seoDescription:
      "Camisetas para fútbol, running y gimnasio. Sublimación total full color, nombres, números y patrocinadores sin costo adicional por arte.",
    description:
      "Tecnología de sublimación digital que imprime la tinta directamente en la tela (no se pela, no destiñe). Logos, escudos, patrocinadores, números y nombres integrados en un solo diseño espectacular.",
    heroGradient: "bg-orange-800 text-white",
    heroFeatures: [
      { icon: "palette", text: "Color infinito" },
      { icon: "looks_one", text: "Nombres y números" },
      { icon: "water_drop", text: "Secado rápido" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.deportivo.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "deportivo" && p.tipo === "camisetas"
      ),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "shorts-deportivos",
    parentSector: "deportivo",
    navLabel: "Shorts",
    navIcon: "checkroom",
    title: "Shorts Deportivos de Alto Rendimiento",
    subtitle: "Pantalones Cortos",
    seoTitle: "Shorts Deportivos para Fútbol y Entreno | Confecciones Liss",
    seoDescription:
      "Shorts deportivos sublimados, ligeros y ergonómicos para maximizar el rendimiento. Equipos de fútbol, baloncesto y atletismo.",
    description:
      "Complemento perfecto para tu equipación. Shorts fabricados con tela microfibra ligera que permite amplitud de zancada y evaporación inmediata de humedad.",
    heroGradient: "bg-amber-800 text-white",
    heroFeatures: [
      { icon: "speed", text: "Extra ligeros" },
      { icon: "fitness_center", text: "Rendimiento" },
      { icon: "style", text: "Combinación de equipo" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.deportivo.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "deportivo" && p.tipo === "shorts"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "uniformes-deportivos-completos",
    parentSector: "deportivo",
    navLabel: "Conjuntos",
    navIcon: "groups",
    title: "Conjuntos Deportivos para Equipos",
    subtitle: "Uniformes Completos",
    seoTitle: "Uniformes de Fútbol Completos Sublimados | Confecciones Liss",
    seoDescription:
      "Packs de uniformes de fútbol: camiseta + short + medias. Precios de descuento para equipos y ligas completas.",
    description:
      "Viste a todo tu equipo. Ofrecemos paquetes completos que incluyen camiseta sublimada, short deportivo coordinado y medias. Descuentos significativos a partir de 10 unidades para ligas y academias.",
    heroGradient: "bg-red-900 text-white",
    heroFeatures: [
      { icon: "inventory_2", text: "Pack completo" },
      { icon: "sports_soccer", text: "Equipos de fútbol" },
      { icon: "sell", text: "Descuento por volumen" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.deportivo.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "deportivo" && p.tipo === "conjuntos"
      ),
    jsonLdType: "CollectionPage",
  },

  // ==========================================
  // SECTOR: ACCESORIOS
  // ==========================================
  {
    slug: "accesorios",
    parentSector: "accesorios",
    navLabel: "Accesorios",
    navIcon: "checkroom",
    title: CATEGORIES.accesorios.title,
    subtitle: "Catálogo de Accesorios",
    seoTitle:
      "Accesorios para Uniformes Médicos y Clínicos | Confecciones Liss",
    seoDescription: CATEGORIES.accesorios.seoDescription,
    description: CATEGORIES.accesorios.description,
    heroGradient: CATEGORIES.accesorios.heroGradient,
    heroFeatures: CATEGORIES.accesorios.heroFeatures,
    trustFeatures: CATEGORIES.accesorios.trustFeatures,
    ctaBanner: CATEGORIES.accesorios.ctaBanner,
    filterFn: (products) => products.filter((p) => p.sector === "accesorios"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "llaveros-personalizados",
    parentSector: "accesorios",
    navLabel: "Llaveros",
    navIcon: "key",
    title: "Llaveros Médicos y Personalizados",
    subtitle: "Llaveros Temáticos",
    seoTitle:
      "Llaveros de Enfermería y Especialidades Médicas | Confecciones Liss",
    seoDescription:
      "Llaveros temáticos de salud, enfermería y profesiones médicas. Detalles únicos para regalar a estudiantes y doctores.",
    description:
      "Un detalle especial para ti o tus colegas. Llaveros en forma de órganos, accesorios médicos, jeringas y más motivos de la salud.",
    heroGradient: "bg-teal-800 text-white",
    heroFeatures: [
      { icon: "card_giftcard", text: "Regalo perfecto" },
      { icon: "health_and_safety", text: "Motivos de salud" },
      { icon: "shopping_bag", text: "Venta al detalle" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.accesorios.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "accesorios" && p.tipo === "llaveros"
      ),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "pines-personalizados",
    parentSector: "accesorios",
    navLabel: "Pines",
    navIcon: "push_pin",
    title: "Pines Metálicos Clínicos",
    subtitle: "Pines Decorativos",
    seoTitle: "Pines Metálicos Decorativos para Scrubs | Confecciones Liss",
    seoDescription:
      "Pines metálicos de alta calidad para decorar tu scrub clínico, gabacha o mochila. Motivos de enfermería y medicina.",
    description:
      "Añade personalidad a tu uniforme con nuestra colección de pines metálicos esmaltados. Diseños creativos de anatomía, instrumental médico y frases de motivación clínica.",
    heroGradient: "bg-cyan-900 text-white",
    heroFeatures: [
      { icon: "stars", text: "Esmaltado brillante" },
      { icon: "style", text: "Decora tu scrub" },
      { icon: "new_releases", text: "Nuevos diseños" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.accesorios.ctaBanner,
    filterFn: (products) =>
      products.filter((p) => p.sector === "accesorios" && p.tipo === "pines"),
    jsonLdType: "CollectionPage",
  },
  {
    slug: "detalles-enfermeria",
    parentSector: "accesorios",
    navLabel: "Detalles",
    navIcon: "favorite",
    title: "Detalles Únicos de Enfermería",
    subtitle: "Artículos para Enfermería",
    seoTitle:
      "Detalles y Artículos de Regalo para Enfermería | Confecciones Liss",
    seoDescription:
      "El regalo perfecto para la enfermera o enfermero en su día o graduación. Artículos temáticos, lapiceros, organizadores de bolsillo.",
    description:
      "Organiza tus implementos en el turno. Ofrecemos organizadores de bolsillo para batas, lapiceros en forma de hueso o jeringa, porta-carnets retráctiles (yoyos) y bolsos temáticos.",
    heroGradient: "bg-[#0c4a6e] text-white",
    heroFeatures: [
      { icon: "school", text: "Ideal graduación" },
      { icon: "badge", text: "Porta-carnets" },
      { icon: "edit", text: "Lapiceros médicos" },
    ],
    trustFeatures: trustFeaturesStandard,
    ctaBanner: CATEGORIES.accesorios.ctaBanner,
    filterFn: (products) =>
      products.filter(
        (p) => p.sector === "accesorios" && p.tipo === "detalles"
      ),
    jsonLdType: "CollectionPage",
  },
];
