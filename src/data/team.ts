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
}

export const teamData: TeamMember[] = [
  {
    slug: "lisseth-molina",
    name: "Iris Lisseth Villacorta de Molina",
    role: "Directora General y Fundadora",
    initials: "IV",
    bio: "Especialista en moda y técnica certificada en Corte y Confección con más de dos décadas de experiencia. Fundadora y figura central del taller.",
    quote:
      "La costura no es solo unir telas; es dar forma a la identidad de un profesional con respeto e integridad.",
    details:
      "Desde que fundó el taller en 2005 con una sola máquina de coser familiar en su hogar, Lisseth ha liderado la empresa con disciplina y rigor artesanal. Su paso por las grandes maquilas industriales de San Miguel le brindó una visión profunda de los procesos estandarizados de producción masiva, conocimientos que luego combinó con la atención cálida y personalizada de un taller a la medida. Hoy en día supervisa la dirección general, planifica el patronaje de los pedidos de gran volumen y audita personalmente la calidad técnica de cada artículo textil.",
    layer: "produccion",
    experience: "20+ años de experiencia",
    avatarBg: "bg-[#143067]",
    tags: [
      "Corte y Confección",
      "Control de Calidad",
      "Fundadora",
      "Patronaje Industrial",
    ],
  },
  {
    slug: "lilian-romero",
    name: "Lilian Romero",
    role: "Especialista en Confección de Uniformes",
    initials: "LR",
    bio: "Experta en el ensamble y costura de uniformes corporativos y médicos. Miembro fundacional del taller.",
    quote:
      "Un buen uniforme debe ser tan cómodo que olvides que lo llevas puesto, y tan resistente que dure años.",
    details:
      "Lilian se unió al taller en sus primeros meses de vida y ha sido testigo y motor principal de su crecimiento. Se especializa en la confección de piezas de alta complejidad como sacos formales, uniformes médicos (scrubs) y pantalones de vestir. Posee una habilidad extraordinaria para operar maquinaria industrial a alta velocidad sin perder un solo milímetro de precisión en las costuras rectas y sobrehilados.",
    layer: "produccion",
    experience: "18 años en el taller",
    avatarBg: "bg-[#b43024]",
    tags: [
      "Uniformes Médicos",
      "Sastrería",
      "Producción",
      "Ensamblado Técnico",
    ],
  },
  {
    slug: "nubia-vazquez",
    name: "Nubia Vázquez",
    role: "Especialista en Confección de Prendas",
    initials: "NV",
    bio: "Responsable de mantener uniformidad, precisión y consistencia en los diferentes lotes de uniformes escolares.",
    quote:
      "La constancia es la clave. Cada uniforme en un lote de cien debe lucir y calzar exactamente igual que el primero.",
    details:
      "Nubia es la especialista encargada de garantizar que la producción masiva de uniformes escolares y universitarios cumpla con los estándares geométricos requeridos. Es experta en el manejo de cuellos, puños y cierres, asegurando que cada corte textil ensamble de manera perfecta según las fichas técnicas diseñadas por Lisseth.",
    layer: "produccion",
    experience: "12 años en el taller",
    avatarBg: "bg-[#444650]",
    tags: [
      "Patronaje",
      "Uniformes Escolares",
      "Producción en Lote",
      "Costura Fina",
    ],
  },
  {
    slug: "blanca-martinez",
    name: "Blanca Martínez",
    role: "Operaria de Producción",
    initials: "BM",
    bio: "Especialista en la preparación técnica de piezas, costura de alta velocidad y ensamblado rápido de lotes.",
    quote:
      "El trabajo fluido en el taller depende de que cada pieza esté lista en el momento preciso.",
    details:
      "Blanca se encarga de las fases iniciales y de refuerzo en el flujo de confección del taller. Es sumamente veloz en el habilitado de piezas, preparación de forros y costura de elementos auxiliares (bolsillos, trabas y pretinas). Su destreza operativa permite acelerar el ritmo de entregas durante las temporadas altas de regreso a clases.",
    layer: "produccion",
    experience: "8 años de experiencia",
    avatarBg: "bg-[#d7dffc] text-[#143067]",
    tags: ["Producción Textil", "Preparación de Piezas", "Ensamblado Rápido"],
  },
  {
    slug: "rene-mendez",
    name: "René Alfonso Méndez",
    role: "Control de Calidad y Toma de Medidas",
    initials: "RM",
    bio: "Auditor técnico de acabados y encargado de la toma profesional de medidas corporativas directas en campo.",
    quote:
      "La calidad no se presume; se mide e inspecciona costura por costura, hilo por hilo.",
    details:
      "René es el filtro de calidad definitivo de Confecciones Liss. Inspecciona cada prenda bajo condiciones de luz óptimas para detectar cualquier imperfección de costura, desalineación o cabo de hilo sobrante antes del planchado y empaque. Además, viaja directamente a clínicas, colegios y empresas en San Miguel y alrededores para realizar la toma física de medidas anatómicas de los empleados, minimizando cualquier error de calce.",
    layer: "calidad",
    experience: "10 años en el taller",
    avatarBg: "bg-[#143067]",
    tags: [
      "Auditoría Textil",
      "Toma de Medidas",
      "Ajuste Anatómico",
      "Acabados",
    ],
  },
  {
    slug: "carlos-molina",
    name: "Carlos Antonio Molina",
    role: "Encargado de Logística y Atención Comercial",
    initials: "CM",
    bio: "Responsable de la cadena de suministro, adquisición de insumos premium y entrega final coordinada.",
    quote:
      "El mejor uniforme del mundo no sirve de nada si no se entrega en la fecha exacta acordada.",
    details:
      "Carlos gestiona las operaciones logísticas externas del taller. Se asegura de conseguir telas certificadas de los mejores distribuidores del país (Sincatex, Ripstop, Gabardinas de alta resistencia) y coordina las rutas de entrega directa para clientes institucionales. Asimismo, atiende de manera personal las solicitudes de presupuestos de mayoreo, ofreciendo un trato transparente y honesto.",
    layer: "logistica",
    experience: "15 años de gestión",
    avatarBg: "bg-[#b43024]",
    tags: [
      "Cadena de Suministro",
      "Logística Comercial",
      "Distribución",
      "Adquisición",
    ],
  },
  {
    slug: "carlos-jose-molina",
    name: "Carlos José Molina Villacorta",
    role: "Director de Estrategia Digital y Transformación",
    initials: "CJ",
    bio: "Técnico en Informática a cargo del desarrollo de canales web, posicionamiento orgánico y analítica de datos.",
    quote:
      "La costura es física, pero la confianza del cliente comienza desde su primera interacción en la pantalla.",
    details:
      "Carlos José lidera la transición digital de la marca familiar. Ha digitalizado el control interno de órdenes del taller, facilitando el seguimiento de los lotes y previniendo demoras. Adicionalmente, administra el posicionamiento digital, analizando el comportamiento de búsqueda y las necesidades de uniformes de profesionales en toda la zona oriental de El Salvador.",
    layer: "estrategica",
    experience: "Infraestructura Digital",
    avatarBg: "bg-[#001b4a]",
    tags: [
      "Estrategia Digital",
      "SEO Técnico",
      "Desarrollo Web",
      "Automatización",
    ],
  },
  {
    slug: "jackeline-molina",
    name: "Jackeline Lisseth Molina Villacorta",
    role: "Modelo Institucional",
    initials: "JM",
    bio: "Imagen oficial de la marca para uniformes corporativos y clínicos en medios digitales y catálogos visuales.",
    quote:
      "Modelar un uniforme es mostrar el orgullo y la dignidad que representa el trabajo de cada profesional.",
    details:
      "Jackeline es el rostro de Confecciones Liss en sus colecciones digitales de uniformes corporativos y médicos. Colabora estrechamente con el equipo de fotografía para lucir la caída real de los tejidos, la flexibilidad del calce y el nivel de detalle de los bordados computarizados, ayudando a que los clientes aprecien el acabado final en línea.",
    layer: "imagen",
    experience: "Imagen de Marca",
    avatarBg: "bg-[#143067]",
    tags: [
      "Modelo Corporativo",
      "Fotografía de Producto",
      "Presentación Visual",
    ],
  },
  {
    slug: "liam-alejandro",
    name: "Liam Alejandro",
    role: "Modelo Institucional (Línea Escolar)",
    initials: "LA",
    bio: "Imagen infantil para presentar la durabilidad y flexibilidad de la línea de uniformes escolares.",
    quote:
      "Los uniformes escolares tienen que ser resistentes para jugar y estudiar todos los días.",
    details:
      "Liam representa la línea escolar e infantil del taller. A través de las sesiones fotográficas de uso activo, demuestra la elasticidad, comodidad y resistencia a las costuras de las prendas escolares tradicionales en situaciones cotidianas de juego y estudio.",
    layer: "imagen",
    experience: "Imagen Infantil",
    avatarBg: "bg-[#d7dffc] text-[#143067]",
    tags: ["Modelo Infantil", "Línea Escolar", "Resistencia Activa"],
  },
];
