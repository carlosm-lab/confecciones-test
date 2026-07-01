export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  quote: string;
  details: string;
  layer: "produccion" | "calidad" | "logistica" | "estrategica" | "imagen";
  experience: string;
  avatarBg: string;
  tags: string[];
  subtitle?: string;
}

export const teamData: TeamMember[] = [
  {
    slug: "lisseth-molina",
    name: "Iris Lisseth Villacorta de Molina",
    role: "Fundadora y Directora General",
    initials: "IV",
    bio: "Técnico certificado en Corte y Confección con más de dos décadas de experiencia práctica en confección y patronaje. Inició su trayectoria en 2005 confeccionando prendas desde su hogar y fue contratada por el Ministerio de Educación entre 2009 y 2011 para la confección de uniformes escolares institucionales. Posteriormente trabajó en talleres de confección industrial en San Miguel entre 2012 y 2019, donde adquirió dominio de maquinaria industrial avanzada y procesos de producción en serie.",
    quote:
      "La costura no es solo una tela; es dar forma a la identidad de un profesional con respeto e integridad.",
    details:
      "Fundó Confecciones Liss el 20 de enero de 2021 con formación adicional en diseño de modas, confección de uniformes médicos y ropa interior técnica.",
    layer: "produccion",
    experience: "Desde 2005",
    avatarBg: "bg-[#143067]",
    tags: [
      "Corte y Confección",
      "Uniformes Médicos",
      "Patronaje",
      "Maquinaria Industrial",
    ],
  },
  {
    slug: "lilian-romero",
    name: "Lilian Romero",
    role: "Especialista en Confección de Uniformes",
    initials: "LR",
    bio: "Primera colaboradora en incorporarse al taller. Especialista en confección de uniformes escolares, médicos y empresariales. Con dominio de maquinaria industrial y altos estándares de acabado, fue determinante en la consolidación operativa del taller durante sus primeros meses.",
    quote: "",
    details: "",
    layer: "produccion",
    experience: "Desde marzo de 2021",
    avatarBg: "bg-[#b43024]",
    tags: ["Uniformes escolares", "Acabados textiles", "Producción en serie"],
  },
  {
    slug: "nubia-vazquez",
    name: "Nubia Vázquez",
    role: "Especialista en Confección de Prendas",
    initials: "NV",
    bio: "Especialista en confección y ensamblaje de prendas. Su incorporación reforzó la uniformidad del proceso productivo, garantizando consistencia en acabados y rendimiento estable en producción continua.",
    quote: "",
    details: "",
    layer: "produccion",
    experience: "Desde 2021",
    avatarBg: "bg-[#444650]",
    tags: ["Confección de prendas", "Ensamblaje", "Control de acabados"],
  },
  {
    slug: "blanca-martinez",
    name: "Blanca Martínez",
    role: "Operaria de Confección",
    initials: "BM",
    bio: "Operaria de producción especializada en costura industrial. Su incorporación amplió la capacidad del taller para responder a pedidos de mayor volumen sin comprometer plazos ni calidad de acabado.",
    quote: "",
    details: "",
    layer: "produccion",
    experience: "Desde 2023",
    avatarBg: "bg-[#d7dffc] text-[#143067]",
    tags: ["Costura industrial", "Producción", "Preparación de piezas"],
  },
  {
    slug: "rene-mendez",
    name: "René Alfonso Méndez",
    role: "Control de Calidad y Toma de Medidas",
    initials: "RM",
    bio: "Responsable de la inspección final de cada prenda antes de su entrega. Verifica costuras, pliegues y bordados, y realiza pruebas de resistencia al estiramiento, al planchado y al lavado. También ejecuta la toma de medidas personalizada para pedidos a la medida, garantizando el ajuste exacto en cada uniforme.",
    quote:
      "La calidad no se presume; se mide e inspecciona costura por costura, hilo por hilo.",
    details: "",
    layer: "calidad",
    experience: "Desde finales de 2025",
    avatarBg: "bg-[#143067]",
    tags: [
      "Auditoría de costuras",
      "Toma de medidas",
      "Pruebas de calidad",
      "Revisión final",
    ],
  },
  {
    slug: "carlos-molina",
    name: "Carlos Antonio Molina",
    role: "Encargado de Logística y Atención al Cliente",
    initials: "CM",
    bio: "Responsable de la coordinación de entregas, distribución de pedidos y atención directa al cliente. Gestiona la relación con clientes institucionales y empresariales, asegurando que cada pedido llegue completo, en el tiempo acordado y en las condiciones correctas.",
    quote:
      "El mejor uniforme del mundo no sirve de nada si no se entrega en la fecha exacta acordada.",
    details: "",
    layer: "logistica",
    experience: "",
    avatarBg: "bg-[#b43024]",
    tags: [
      "Logística",
      "Atención al cliente",
      "Distribución",
      "Entregas a domicilio",
    ],
  },
  {
    slug: "carlos-jose-molina",
    name: "Carlos José Molina Villacorta",
    role: "Director de Transformación Digital",
    initials: "CJ",
    subtitle: "Estrategia digital · SEO · Arquitectura web",
    bio: "Técnico en Computación certificado en Inteligencia y Contrainteligencia Digital y en Técnicas de Recolección y Análisis de Datos. Estudiante de Licenciatura en Psicología de la Salud en IEPROES (Regional San Miguel). Con su incorporación en enero de 2026 se diseñó la plataforma web institucional y se implementó una estrategia de posicionamiento orgánico para la región oriental de El Salvador, basada en inteligencia competitiva, análisis de comportamiento del usuario y arquitectura de contenidos bajo estándares E-E-A-T de Google.",
    quote:
      "La costura es física, pero la confianza del cliente comienza desde su primera interacción en la pantalla.",
    details: "",
    layer: "estrategica",
    experience: "",
    avatarBg: "bg-[#001b4a]",
    tags: [
      "Estrategia digital",
      "SEO orgánico",
      "Desarrollo web",
      "Análisis de datos",
    ],
  },
  {
    slug: "jackeline-molina",
    name: "Jackeline Lisseth Molina Villacorta",
    role: "Modelo institucional",
    initials: "JM",
    bio: "Representa la imagen de marca en uniformes y prendas para el sector salud y empresarial. Su participación garantiza que las fotografías institucionales reflejen con precisión el ajuste, acabado y presentación real de cada prenda confeccionada.",
    quote: "",
    details: "",
    layer: "imagen",
    experience: "",
    avatarBg: "bg-[#143067]",
    tags: [
      "Imagen institucional",
      "Uniformes médicos",
      "Representación de marca",
    ],
  },
  {
    slug: "liam-alejandro",
    name: "Liam Alejandro Molina Villacorta",
    role: "Modelo institucional",
    initials: "LA",
    bio: "Colabora en la representación visual de productos para segmentos infantiles y escolares, aportando autenticidad a la presentación fotográfica de uniformes escolares.",
    quote: "",
    details: "",
    layer: "imagen",
    experience: "",
    avatarBg: "bg-[#d7dffc] text-[#143067]",
    tags: ["Imagen institucional", "Uniformes escolares"],
  },
];
