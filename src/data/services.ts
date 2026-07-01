import { ServicePage } from "./types";
import { siteConfig } from "@/config/site";

// Re-export para que otros módulos puedan importar el tipo desde este mismo archivo
export type { ServicePage } from "./types";

// ──────────────────────────────────────────────
// Datos de servicios
// ──────────────────────────────────────────────

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "bordados-personalizados",
    navLabel: "Bordados",
    navIcon: "draw",
    title: "Servicio de Bordado Computarizado",
    subtitle: "Bordados",
    seoTitle:
      "Bordado de Uniformes UNIVO, UNAB, UGB, IEPROES y más | San Miguel",
    seoDescription:
      "Bordado de logos institucionales para IEPROES, UNIVO, UNAB, UES, UGB, UMA, colegios, hospitales, clínicas y empresas en San Miguel, El Salvador. Bordado individual o incluido en tu pedido de uniformes.",
    description:
      "Personalizamos prendas con bordado computarizado de alta precisión en nuestro taller de San Miguel, El Salvador. La mayoría de nuestros bordados forman parte de un pedido de uniforme, pero también aceptamos bordado individual sobre prendas que el cliente ya tiene.",
    cardDescription:
      "Bordado computarizado de alta precisión para escudos, logotipos y nombres sobre uniformes y prendas individuales.",
    heroGradient: "bg-indigo-900 text-white",
    cardImage: "/images/servicios/bordados.png",
    heroFeatures: [
      { icon: "verified", text: "Alta precisión" },
      { icon: "design_services", text: "Digitalización gratis*" },
      { icon: "shopping_bag", text: "Sin pedido mínimo" },
    ],
    ctaBanner: {
      title: "¿Necesitas bordar tu logo?",
      description:
        "Envíanos tu diseño y te enviaremos una cotización. Al confirmar tu pedido con el anticipo correspondiente, digitalizamos tu logo sin costo adicional y te compartimos una prueba digital antes de bordar.",
      ctaText: "Solicitar cotización",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    sections: [
      {
        heading: "¿Qué es el bordado computarizado?",
        body: "Es el proceso de reproducir un diseño digital mediante hilos sobre una prenda textil, utilizando máquinas de coser industriales controladas por computadora. El hilo queda físicamente integrado a la prenda, lo que garantiza una durabilidad excepcional frente a lavados y fricción constante.",
      },
      {
        heading:
          "Bordamos para hospitales, clínicas, laboratorios, universidades, colegios y empresas",
        body: "El bordado institucional es una parte central de nuestro trabajo, no un servicio adicional. En el sector salud, bordamos escudos y logos sobre scrubs, batas y gorros quirúrgicos para hospitales, clínicas, laboratorios y consultorios de la zona oriental de El Salvador. Confeccionamos y bordamos scrubs clínicos en los colores oficiales de IEPROES (Instituto Especializado de Profesionales de la Salud), UNIVO (Universidad de Oriente), UNAB (Universidad Dr. Andrés Bello), UES (Universidad de El Salvador), UGB (Universidad Gerardo Barrios) y UMA (Universidad Modular Abierta). También bordamos el escudo institucional de colegios y escuelas en camisas, suéteres y chumpas de uniforme escolar, como en el caso del Centro Escolar Profesor Jorge Salomón Granados, bajo contrato con el Ministerio de Educación. Para empresas, bordamos logotipos corporativos en camisas, polos y gabachas.",
      },
      {
        heading: "¿Bordado, sublimación o estampado?",
        body: "El bordado computarizado es la opción más duradera para logos institucionales: el hilo queda integrado a la tela y resiste años de lavado sin perder color ni forma. Para diseños fotográficos a color completo sobre poliéster, la sublimación textil suele ser más adecuada. Si tienes dudas sobre cuál técnica conviene a tu proyecto, cuéntanos el uso que le darás a la prenda y te recomendamos la opción correcta.",
      },
      {
        heading: "Proceso de digitalización",
        body: "Antes de bordar, tu logo pasa por un proceso llamado digitalización, donde se convierte la imagen en un archivo de puntadas que la máquina entiende. Este proceso es gratuito, pero solo se realiza una vez que el pedido se confirma con el anticipo correspondiente.",
      },
      {
        heading: "Precios y pedidos",
        body: "Si el bordado forma parte de tu pedido de uniformes, el costo ya está incluido en el precio de la prenda. Si necesitas bordar una prenda individual, el costo inicia desde $5.00 y varía según el tamaño y la complejidad del diseño. No hay un mínimo de piezas, pero el precio final siempre se confirma con una cotización directa.",
      },
    ],
    processSteps: [
      {
        step: "1",
        title: "Digitalizar",
        description:
          "Convertimos tu archivo de imagen (JPG, PNG, PDF) en una matriz de bordado profesional.",
      },
      {
        step: "2",
        title: "Configurar",
        description:
          "Asignamos los colores de hilo y configuramos la tensión según el tipo de tela a bordar.",
      },
      {
        step: "3",
        title: "Bordar",
        description:
          "Nuestras máquinas ejecutan el diseño con alta velocidad y precisión.",
      },
    ],
    garmentGallery: [
      // TODO: reemplazar con fotografías reales de bordados propios del taller en cuanto estén disponibles.
      // Cada entrada debe mostrar el PROCESO (máquina bordando, hilos, texturas) — nunca logos de marcas inventadas.
      {
        image: "/images/servicios/bordados.png",
        label: "Uniformes Escolares",
      },
      {
        image: "/images/servicios/bordados.png",
        label: "Uniformes Médicos",
      },
      {
        image: "/images/servicios/bordados.png",
        label: "Uniformes Empresariales",
      },
      {
        image: "/images/servicios/bordados.png",
        label: "Gorras y Accesorios",
      },
    ],
    institutionLogos: [
      { image: "/logos/ieproes.png", label: "IEPROES" },
      { image: "/logos/univo.png", label: "UNIVO" },
      { image: "/logos/unab.png", label: "UNAB" },
      { image: "/logos/ues.png", label: "UES" },
      { image: "/logos/ugb-1.png", label: "UGB" },
      { image: "/logos/uma.png", label: "UMA" },
    ],
    pricingCards: [
      {
        icon: "inventory_2",
        label: "Pedido Mínimo",
        value: "Desde 1 prenda",
        note: "Sin volumen mínimo. El precio se confirma por cotización.",
      },
      {
        icon: "attach_money",
        label: "Bordado Individual",
        value: "Desde $5.00",
        note: "Incluido sin costo adicional cuando es parte de un uniforme.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta bordar un logo?",
        answer:
          "Si el bordado es parte de un pedido de uniformes, va incluido en el precio de la prenda. Si necesitas bordar una prenda individual, el costo inicia desde $5.00 y depende del tamaño y la cantidad de puntadas del diseño. Envíanos tu diseño para una cotización exacta.",
      },
      {
        question: "¿Se puede bordar sobre cualquier color de tela?",
        answer:
          "Sí. Al ser hilo de color, el bordado se adapta a cualquier fondo. Seleccionamos hilos que contrasten correctamente con el color de la prenda para que tu logo resalte siempre.",
      },
      {
        question: "¿El bordado se deshila con los lavados?",
        answer:
          "No. Nuestras máquinas industriales aplican una entretela de respaldo que fija las puntadas. Un bordado bien hecho dura toda la vida útil de la prenda.",
      },
      {
        question: "¿Bordan el logo de mi universidad en los scrubs?",
        answer:
          "Sí. Confeccionamos y bordamos scrubs clínicos en los colores y con el escudo oficial de IEPROES, UNIVO, UNAB, UES, UGB y UMA. Si tu universidad no está en esta lista, contáctanos: también bordamos logos institucionales bajo pedido.",
      },
      {
        question: "¿Puedo pedir bordado si no vivo en San Miguel?",
        answer:
          "Sí. Coordinamos envíos a nivel nacional en El Salvador a través de transporte de terceros, con un costo adicional según destino. Puedes ver el detalle en nuestra Política de Envíos.",
      },
    ],
  },
  {
    slug: "sublimacion-deportiva",
    navLabel: "Sublimación",
    navIcon: "palette",
    title: "Sublimación Textil Full Color",
    subtitle: "Sublimación",
    seoTitle:
      "Sublimación Textil y Deportiva en San Miguel | Confecciones Liss",
    seoDescription:
      "Impresión de telas por sublimación para uniformes deportivos, promocionales y banderas. Colores intensos que no se decoloran. San Miguel, El Salvador.",
    description:
      "Servicio de impresión textil mediante calor. La técnica ideal para prendas de poliéster deportivas donde la tinta pasa a ser parte de la fibra, asegurando que nunca se cuartee ni pierda color. Ideal para diseños complejos o fotografías.",
    cardDescription:
      "Impresión textil mediante calor para prendas deportivas. Tinta permanente de alta resolución que no se cuartea, ni perderá su color.",
    heroGradient: "bg-purple-900 text-white",
    cardImage: "/images/servicios/sublimacion.png",
    heroFeatures: [
      { icon: "brush", text: "Colores vibrantes" },
      { icon: "wash", text: "No se decolora" },
      { icon: "layers", text: "Textura invisible" },
    ],
    ctaBanner: {
      title: "¿Tienes un diseño llamativo en mente?",
      description:
        "Podemos plasmarlo en tela con 100% de precisión cromática. Envíanos tu arte.",
      ctaText: "Cotizar sublimación",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    sections: [
      {
        heading: "¿Qué es la sublimación textil?",
        body: "La sublimación es una técnica de impresión donde tintas especiales se transforman de estado sólido a gaseoso mediante calor y presión, penetrando las fibras de poliéster y fusionándose con ellas a nivel molecular. El resultado es una impresión que no se siente al tacto, no se cuartea, no se despega y mantiene colores vibrantes lavado tras lavado.",
      },
      {
        heading: "¿Para qué tipo de prendas es ideal?",
        body: "La sublimación funciona exclusivamente sobre telas de poliéster o mezclas con alto contenido de poliéster (mínimo 65%). Es la técnica por excelencia para uniformes deportivos, jerseys de fútbol, camisetas de ciclismo, banderas, banners promocionales y cualquier prenda donde necesites colores intensos y diseños de borde a borde sin limitaciones.",
      },
      {
        heading: "Ventajas sobre el estampado tradicional",
        body: "A diferencia de la serigrafía o el vinil, la sublimación permite imprimir degradados, fotografías y diseños ilimitados en color sin costo adicional por cada color. La tinta se convierte en parte de la tela, por lo que no agrega peso, no altera la textura y la prenda mantiene su transpirabilidad original — algo crítico en ropa deportiva.",
      },
      {
        heading: "Nuestro proceso de sublimación",
        body: "Recibimos tu diseño en alta resolución (mínimo 300 DPI), lo ajustamos a la plantilla de la prenda, imprimimos en papel transfer con tintas Epson originales y aplicamos calor a 200°C durante 40 segundos en nuestra prensa industrial. El resultado es un color exacto, homogéneo y permanente.",
      },
    ],
    faqs: [
      {
        question: "¿Se puede sublimar sobre algodón?",
        answer:
          "No de forma directa. La sublimación requiere fibras de poliéster. Para algodón recomendamos bordado o serigrafía.",
      },
      {
        question: "¿Se decolora con el lavado?",
        answer:
          "No. La tinta se fusiona molecularmente con la fibra, por lo que no se despega ni decolora. Recomendamos lavar al revés y sin cloro para maximizar la vida útil.",
      },
      {
        question: "¿Cuántas prendas mínimo puedo pedir?",
        answer: "Aceptamos desde una sola prenda. No hay pedido mínimo.",
      },
    ],
  },
  {
    slug: "confeccion-a-medida",
    navLabel: "A Medida",
    navIcon: "straighten",
    title: "Confección y Sastrería a la Medida",
    subtitle: "A Medida",
    seoTitle:
      "Taller de Confección a la Medida en San Miguel | Confecciones Liss",
    seoDescription:
      "¿No encuentras tu talla? En Confecciones Liss tomamos tus medidas exactas y creamos prendas perfectas para tu cuerpo. Plus size y petite. San Miguel, El Salvador.",
    description:
      "Olvídate de comprar uniformes estándar que no te favorecen. Visita nuestro taller en Barrio La Merced; tomamos más de 12 medidas anatómicas para crear una prenda que se adapta perfectamente a tus curvas, altura y complexión, brindando un entalle profesional incomparable.",
    cardDescription:
      "Confección a medida en nuestro taller. Tomamos 12 medidas anatómicas para lograr una prenda con un entalle profesional incomparable.",
    heroGradient: "bg-pink-900 text-white",
    cardImage: "/images/servicios/confeccion.png",
    heroFeatures: [
      { icon: "accessibility", text: "Tallas inclusivas" },
      { icon: "cut", text: "Entalle perfecto" },
      { icon: "face_retouching_natural", text: "Realza tu figura" },
    ],
    ctaBanner: {
      title: "Haz tu cita para toma de medidas",
      description:
        "Visítanos en nuestro taller y descubre el placer de usar ropa hecha solo para ti.",
      ctaText: "Agendar visita",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    sections: [
      {
        heading: "¿Por qué elegir confección a la medida?",
        body: "La ropa de talla estándar está diseñada para un cuerpo promedio que no existe. Cada persona tiene proporciones únicas: largo de torso, ancho de hombros, contorno de cadera. Cuando una prenda se confecciona con tus medidas exactas, se nota inmediatamente: la silueta se estiliza, la comodidad aumenta y la imagen profesional se transforma por completo.",
      },
      {
        heading: "Nuestro proceso de toma de medidas",
        body: "En nuestro taller tomamos un mínimo de 12 medidas anatómicas: contorno de pecho, cintura, cadera, largo de manga, largo de torso, ancho de espalda, contorno de cuello, largo de pantalón, entrepierna, contorno de muslo, contorno de rodilla y contorno de tobillo. Con esas medidas creamos un patrón personalizado que garantiza un entalle perfecto.",
      },
      {
        heading: "Tallas inclusivas: Plus size y petite",
        body: "No discriminamos por talla. Confeccionamos desde tallas XS hasta 5XL y más. Si eres de complexión petite y toda la ropa te queda grande, o si eres plus size y las opciones comerciales no te satisfacen, nuestro servicio a la medida es la solución. Cada prenda se adapta a tu cuerpo, no al revés.",
      },
      {
        heading: "¿Qué tipo de prendas confeccionamos a medida?",
        body: "Scrubs y batas médicas, uniformes corporativos, camisas de vestir, pantalones formales, vestidos, faldas, gabachas, batas de laboratorio y uniformes escolares. Básicamente cualquier prenda que necesites con un entalle superior al estándar comercial.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tarda la confección a medida?",
        answer:
          "Dependiendo de la complejidad, entre 5 y 10 días hábiles desde la toma de medidas. Para pedidos urgentes podemos acelerar el proceso.",
      },
      {
        question: "¿Tengo que ir al taller para las medidas?",
        answer:
          "Lo recomendamos para mayor precisión. Sin embargo, si estás fuera de San Miguel, puedes enviarnos tus medidas siguiendo nuestra guía de auto-medición que te compartimos por WhatsApp.",
      },
      {
        question: "¿Cuesta más que la ropa de talla estándar?",
        answer:
          "El costo es ligeramente mayor porque cada prenda se corta y cose individualmente. Sin embargo, la diferencia en comodidad y durabilidad justifica ampliamente la inversión.",
      },
    ],
  },
  {
    slug: "mano-de-obra",
    navLabel: "Mano de Obra",
    navIcon: "construction",
    title: "Servicio de Solo Mano de Obra",
    subtitle: "Mano de Obra",
    seoTitle: "Servicio de Costura y Mano de Obra | Confecciones Liss",
    seoDescription:
      "Tú pones la tela, nosotros ponemos el talento. Cobramos únicamente la mano de obra por la confección de tu prenda o uniforme. San Miguel, El Salvador.",
    description:
      "¿Compraste una tela espectacular pero no sabes coserla? Trae tu material a nuestro taller. Aplicamos nuestra técnica y patrones comprobados para confeccionar tu prenda, cobrando exclusivamente el valor de la mano de obra. Una opción económica y flexible.",
    cardDescription:
      "Trae tu propia tela y la confeccionamos con patrones profesionales, cobrando solo mano de obra. Una opción muy económica y flexible.",
    heroGradient: "bg-amber-900 text-white",
    cardImage: "/images/servicios/mano-obra.png",
    heroFeatures: [
      { icon: "savings", text: "Súper económico" },
      { icon: "design_services", text: "Tus propios diseños" },
      { icon: "category", text: "Aceptamos toda tela" },
    ],
    ctaBanner: {
      title: "¿Ya tienes tu tela?",
      description:
        "Dinos cuántas yardas tienes y qué prenda deseas confeccionar. Te cotizamos solo la mano de obra.",
      ctaText: "Cotizar costura",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    sections: [
      {
        heading: "¿Cómo funciona el servicio de mano de obra?",
        body: "Es simple: tú compras la tela que más te guste en cualquier tienda textil, la traes a nuestro taller, y nosotros nos encargamos de cortarla, coserla y entregarla como una prenda terminada. Solo te cobramos el valor del trabajo manual, lo que reduce significativamente el costo total de tu uniforme o prenda.",
      },
      {
        heading: "¿Qué tipo de telas aceptamos?",
        body: "Trabajamos con todo tipo de telas: algodón, poliéster, lino, gabardina, denim, seda, telas deportivas (dry-fit), popelina, oxford, twill y más. Nuestras costureras tienen experiencia con materiales delicados y con telas pesadas por igual. Si tienes dudas sobre si tu tela es apta, tráela y la evaluamos sin compromiso.",
      },
      {
        heading: "¿Para quién es ideal este servicio?",
        body: "Es perfecto para quienes compran tela al por mayor y buscan reducir costos, para diseñadores independientes que necesitan un taller de producción, para instituciones que ya tienen su proveedor de tela y solo necesitan la confección, y para cualquier persona que encontró la tela perfecta y quiere convertirla en una prenda única.",
      },
      {
        heading: "¿Qué incluye la mano de obra?",
        body: "Incluye el trazado del patrón, el corte de la tela, la costura completa con máquinas industriales (recta, overlock, collaretera según se necesite), el pegado de botones o cierres si aplica, el planchado final y el empaque. El hilo y los insumos menores están incluidos; botones especiales, cierres o etiquetas personalizadas se cotizan aparte.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánta tela necesito para una prenda?",
        answer:
          "Depende de la prenda y tu talla. Como regla general: una camisa requiere ~1.5 yardas, un pantalón ~1.5 yardas, un scrub completo ~3 yardas. Te damos la cantidad exacta una vez nos digas qué quieres confeccionar.",
      },
      {
        question: "¿Puedo traer un diseño de referencia?",
        answer:
          "¡Claro! Puedes traer una foto de Pinterest, Instagram o incluso una prenda que quieras replicar. La usamos como guía para el corte y la confección.",
      },
      {
        question: "¿Hay pedido mínimo?",
        answer:
          "No. Aceptamos desde una sola prenda. Sin embargo, el costo por unidad baja considerablemente en pedidos de 10+ piezas.",
      },
    ],
  },
  {
    slug: "ropa-general",
    navLabel: "Ropa General",
    navIcon: "checkroom",
    title: "Confección de Ropa Casual y de Vestir",
    subtitle: "Ropa en General",
    seoTitle:
      "Moda y Ropa Casual a la Medida en San Miguel | Confecciones Liss",
    seoDescription:
      "Confección de vestidos, faldas, crop tops, pantalones de vestir y blusas para damas, niños y caballeros. Taller de costura en San Miguel, El Salvador.",
    description:
      "Además de uniformes corporativos, fabricamos moda casual y de fiesta a la medida. Tráenos una foto de Pinterest o Instagram del vestido, falda, enterizo o crop top que deseas, y nosotros lo replicamos ajustado perfectamente a tu silueta.",
    cardDescription:
      "Confección de toda tu ropa casual y de fiesta a medida. Replicamos vestidos, faldas y conjuntos a partir de tus fotos de referencia.",
    heroGradient: "bg-fuchsia-900 text-white",
    cardImage: "/images/servicios/ropa-general.png",
    heroFeatures: [
      { icon: "styler", text: "Diseño libre" },
      { icon: "imagesmode", text: "Copiamos de fotos" },
      { icon: "diversity_3", text: "Toda la familia" },
    ],
    ctaBanner: {
      title: "¿Tienes un diseño en mente?",
      description:
        "Envíanos la foto de referencia por WhatsApp y te decimos cómo hacerlo realidad.",
      ctaText: "Enviar diseño",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    sections: [
      {
        heading: "Más que uniformes: moda personalizada",
        body: "Aunque somos conocidos por nuestros uniformes, nuestro taller tiene la capacidad de confeccionar cualquier tipo de prenda. Desde vestidos de graduación y blusas elegantes hasta ropa casual del día a día. Si puedes soñarlo, probablemente podemos coserlo.",
      },
      {
        heading: "¿Cómo funciona el proceso?",
        body: "Envíanos por WhatsApp la foto de la prenda que deseas (de cualquier tienda online, Pinterest o Instagram). Nuestro equipo analiza el diseño, selecciona la tela más adecuada, te cotiza el precio y, una vez aprobado, confeccionamos la prenda ajustada a tus medidas exactas. El resultado es una réplica personalizada que se adapta a tu cuerpo.",
      },
      {
        heading: "Prendas que confeccionamos",
        body: "Vestidos de noche y coctel, faldas, pantalones de vestir, blusas, crop tops, enterizos, conjuntos de dos piezas, ropa infantil, camisas de hombre, pijamas y más. Trabajamos tanto prendas individuales como colecciones completas para emprendedores de moda.",
      },
      {
        heading: "Ideal para emprendedores de moda",
        body: "Si tienes una marca de ropa en crecimiento y necesitas un taller de producción confiable, podemos ser tu aliado. Ofrecemos producción por lotes con precios competitivos, consistencia en calidad y la flexibilidad de ajustar diseños entre tandas sin los mínimos exigidos por fábricas grandes.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo pedir una sola prenda?",
        answer:
          "Sí. No hay pedido mínimo para ropa personalizada. Confeccionamos desde una pieza.",
      },
      {
        question: "¿Incluyen la tela en el precio?",
        answer:
          "Sí, generalmente cotizamos con tela incluida. Si prefieres traer tu propia tela, aplicamos tarifa de solo mano de obra, que es más económica.",
      },
      {
        question: "¿Cuánto tiempo tarda una prenda personalizada?",
        answer:
          "Entre 5 y 12 días hábiles dependiendo de la complejidad del diseño. Prendas simples como blusas pueden estar listas en 5 días; vestidos elaborados pueden tomar hasta 12.",
      },
    ],
  },
];
