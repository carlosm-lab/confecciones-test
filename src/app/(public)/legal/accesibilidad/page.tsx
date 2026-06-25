import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import { Section, P, Ul } from "@/components/legal/LegalContent";

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Política de Accesibilidad del Sitio Web | Confecciones Liss",
  description:
    "Declaración de accesibilidad web de Confecciones Liss: nivel de conformidad WCAG 2.1 AA, medidas implementadas, limitaciones técnicas y canales de contacto.",
  alternates: {
    canonical: `${siteConfig.url}/legal/accesibilidad`,
  },
  openGraph: {
    title: "Política de Accesibilidad del Sitio Web | Confecciones Liss",
    description:
      "Conoce el nivel de accesibilidad de nuestra plataforma, las medidas activas y los límites técnicos actuales.",
    url: `${siteConfig.url}/legal/accesibilidad`,
    siteName: siteConfig.name,
    locale: "es_CO",
    type: "article",
  },
};

/* ── JSON-LD ──────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/legal/accesibilidad`,
      url: `${siteConfig.url}/legal/accesibilidad`,
      name: "Política de Accesibilidad del Sitio Web",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      inLanguage: "es-CO",
      datePublished: "2026-06-25",
      dateModified: "2026-06-25",
    },
    {
      "@type": "Article",
      "@id": `${siteConfig.url}/legal/accesibilidad#article`,
      headline: "Política de Accesibilidad del Sitio Web — Confecciones Liss",
      datePublished: "2026-06-25",
      dateModified: "2026-06-25",
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      inLanguage: "es-CO",
      isPartOf: { "@id": `${siteConfig.url}/legal/accesibilidad` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${siteConfig.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Legal",
          item: `${siteConfig.url}/legal`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Accesibilidad",
          item: `${siteConfig.url}/legal/accesibilidad`,
        },
      ],
    },
  ],
};

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function AccesibilidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LegalArticleReader
        title="Política de Accesibilidad del Sitio Web"
        subtitle="Declaración de conformidad, medidas implementadas y limitaciones técnicas de la plataforma digital de Confecciones Liss."
        date="25 Jun, 2026"
        readingTime={12}
      >
        {/* ── 1. Introducción ────────────────────────────────────────────── */}
        <Section n={1} title="Introducción y Compromiso">
          <P>
            Confecciones Liss, empresa colombiana dedicada a la fabricación y
            comercialización de uniformes, dotaciones y prendas personalizadas,
            entiende la accesibilidad web como una dimensión fundamental de la
            calidad, la ética empresarial y el respeto por la diversidad humana.
            Este documento constituye nuestra Declaración de Accesibilidad
            conforme a los estándares internacionales y a la legislación
            colombiana aplicable.
          </P>
          <P>
            Creemos firmemente que todas las personas, independientemente de sus
            capacidades físicas, sensoriales, cognitivas o tecnológicas, tienen
            el mismo derecho a acceder a la información, a los productos y a los
            servicios que ofrecemos. La accesibilidad no es un favor: es una
            obligación moral, legal y técnica que asumimos de manera consciente
            y progresiva.
          </P>
          <P>
            El presente sitio web — accesible a través del dominio oficial de
            Confecciones Liss — está diseñado con el objetivo de alcanzar y
            mantener el nivel de conformidad <strong>WCAG 2.1 nivel AA</strong>{" "}
            (Web Content Accessibility Guidelines, versión 2.1, nivel de
            adecuación AA), definido por el World Wide Web Consortium (W3C) como
            el estándar de referencia global en materia de accesibilidad web.
          </P>
          <P>
            Esta política se aplica al sitio web principal, sus subpáginas, el
            catálogo de productos, el módulo de cotización, el blog
            institucional y todos los contenidos digitales publicados bajo el
            dominio oficial de Confecciones Liss. Los canales externos — como
            redes sociales de terceros, plataformas de mensajería o marketplaces
            — se rigen por las políticas de accesibilidad de sus respectivos
            proveedores.
          </P>
        </Section>

        {/* ── 2. Público y Uso ───────────────────────────────────────────── */}
        <Section n={2} title="Público Objetivo y Naturaleza del Contenido">
          <P>
            El uso activo del sitio web — es decir, la creación de cuentas, la
            realización de pedidos, la solicitud de cotizaciones y la
            contratación de servicios — está reservado para personas mayores de
            18 años, en pleno ejercicio de su capacidad jurídica, tal como se
            establece en nuestra Política de Términos y Condiciones.
          </P>
          <P>
            Sin embargo, el contenido informativo del sitio — incluyendo el
            catálogo de productos, los artículos del blog, las guías de tallas,
            el portafolio de diseños y los materiales educativos sobre moda y
            confección — es de naturaleza completamente apta para todo público.
            Nuestro sitio no contiene:
          </P>
          <Ul
            items={[
              "Imágenes sugerentes, eróticas o de contenido sexual explícito.",
              "Lenguaje violento, discriminatorio u ofensivo.",
              "Contenido diseñado para perturbar, engañar o manipular a usuarios vulnerables.",
              "Material que pueda resultar perturbador para niños, niñas o adolescentes que visiten el sitio en compañía de un adulto.",
            ]}
          />
          <P>
            Esta distinción es importante desde el punto de vista de la
            accesibilidad: aunque ciertas funcionalidades están restringidas por
            edad, el acceso visual al contenido informativo es universal y no
            requiere registro previo.
          </P>
        </Section>

        {/* ── 3. Marco Normativo ────────────────────────────────────────── */}
        <Section n={3} title="Marco Normativo y Legal Aplicable">
          <P>
            La presente política de accesibilidad se enmarca en los siguientes
            instrumentos normativos y estándares técnicos:
          </P>
          <Ul
            items={[
              "WCAG 2.1 — W3C (2018): Pautas de Accesibilidad para el Contenido Web, versión 2.1. Son el estándar técnico internacional de referencia. Nuestra meta es cumplir el nivel AA de conformidad.",
              'Ley 1618 de 2013 — Colombia: "Por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad." Obliga a entidades y empresas a garantizar el acceso a la información en condiciones de igualdad.',
              "Ley 1341 de 2009 (Ley TIC) y su reforma Ley 1978 de 2019 — Colombia: Establece principios de neutralidad tecnológica y acceso en condiciones de igualdad a los servicios de la Sociedad de la Información.",
              "CONPES 3975 de 2019 — Colombia: Política Nacional para la Transformación Digital e Inteligencia Artificial, que contempla lineamientos de inclusión digital.",
              "Convención sobre los Derechos de las Personas con Discapacidad — ONU (2006), ratificada por Colombia mediante Ley 1346 de 2009: Obliga al Estado y a los actores privados a garantizar el acceso a la información y las comunicaciones en igualdad de condiciones.",
              "NTC 5854 — ICONTEC: Norma Técnica Colombiana sobre Requisitos de Accesibilidad para Páginas Web, adoptada como referencia de buenas prácticas en el sector privado colombiano.",
            ]}
          />
          <P>
            La adopción de estos marcos no es meramente declarativa:
            Confecciones Liss realiza evaluaciones periódicas de accesibilidad y
            toma medidas correctivas cuando se identifican brechas entre el
            estado actual del sitio y los requisitos normativos o técnicos
            mencionados.
          </P>
        </Section>

        {/* ── 4. Nivel de Conformidad ───────────────────────────────────── */}
        <Section n={4} title="Nivel de Conformidad Declarado">
          <P>
            Confecciones Liss declara su compromiso de alcanzar el nivel de
            conformidad <strong>WCAG 2.1 nivel AA</strong> en su sitio web
            oficial. Este nivel implica el cumplimiento de todos los criterios
            de éxito de nivel A (básicos) y de nivel AA (intermedios),
            estructurados en torno a los cuatro principios fundamentales de la
            accesibilidad:
          </P>
          <Ul
            items={[
              "Perceptible: La información y los componentes de la interfaz deben presentarse de manera que los usuarios puedan percibirlos, independientemente de sus capacidades sensoriales.",
              "Operable: Los componentes de la interfaz y la navegación deben ser operables, sin requerir necesariamente el uso del mouse o de un dispositivo señalador.",
              "Comprensible: La información y el funcionamiento de la interfaz deben ser comprensibles para el mayor rango posible de usuarios.",
              "Robusto: El contenido debe ser suficientemente robusto como para ser interpretado de forma fiable por una amplia variedad de agentes de usuario, incluidas las tecnologías de apoyo.",
            ]}
          />
          <P>
            Actualmente, el sitio web de Confecciones Liss se encuentra en
            proceso activo de mejora continua hacia la conformidad total con
            WCAG 2.1 AA. Algunas secciones o componentes pueden presentar
            brechas parciales que se encuentran identificadas y en proceso de
            corrección. Dichas brechas se documentan en la Sección 9 de este
            documento.
          </P>
          <P>
            No declaramos conformidad plena con el nivel AAA de WCAG 2.1, dado
            que varios de sus criterios son de aplicación especializada y pueden
            entrar en conflicto con requisitos de diseño, funcionalidad o
            recursos técnicos. Sin embargo, implementamos criterios AAA cuando
            son razonablemente alcanzables sin comprometer otros aspectos del
            sitio.
          </P>
        </Section>

        {/* ── 5. Medidas Implementadas ──────────────────────────────────── */}
        <Section n={5} title="Medidas de Accesibilidad Implementadas">
          <P>
            A continuación se describen en detalle las medidas técnicas,
            editoriales y organizativas que Confecciones Liss ha implementado
            para garantizar la accesibilidad de su sitio web:
          </P>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.1. Estructura Semántica del HTML</strong>
            </P>
            <P>
              El sitio está construido con HTML5 semántico. Se utilizan
              correctamente elementos como <code>&lt;header&gt;</code>,{" "}
              <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>,{" "}
              <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>,{" "}
              <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code> y{" "}
              <code>&lt;figure&gt;</code> para estructurar el contenido de
              manera significativa. Esta estructura permite a los lectores de
              pantalla navegar el documento con eficiencia y a los motores de
              indexación interpretar la jerarquía del contenido.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.2. Jerarquía de Encabezados</strong>
            </P>
            <P>
              Cada página contiene un único encabezado de nivel 1 (
              <code>&lt;h1&gt;</code>) que describe el propósito principal de la
              página. Los encabezados de nivel 2 (<code>&lt;h2&gt;</code>) y
              niveles inferiores se utilizan para estructurar el contenido en
              secciones lógicas, sin saltarse niveles de jerarquía. Esta
              práctica facilita la navegación para usuarios de lectores de
              pantalla y mejora la experiencia general de lectura.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.3. Texto Alternativo para Imágenes</strong>
            </P>
            <P>
              Todas las imágenes con contenido informativo incluyen un atributo{" "}
              <code>alt</code> descriptivo que comunica el propósito de la
              imagen en contexto. Las imágenes puramente decorativas incluyen el
              atributo <code>alt=&quot;&quot;</code> vacío para que los lectores
              de pantalla las ignoren. Los iconos SVG incluyen etiquetas{" "}
              <code>&lt;title&gt;</code> o atributos <code>aria-label</code>{" "}
              apropiados cuando son interactivos o informativos.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.4. Contraste de Color</strong>
            </P>
            <P>
              El sitio emplea una paleta de colores diseñada para cumplir los
              requisitos mínimos de contraste de WCAG 2.1 AA: relación de
              contraste mínima de 4.5:1 para texto normal y de 3:1 para texto
              grande (mayor de 18 puntos o 14 puntos en negrita). Los elementos
              interactivos — botones, enlaces, campos de formulario — cuentan
              con indicadores de estado visual con contraste suficiente para ser
              distinguidos tanto en estados normales como de foco, hover y
              activo.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.5. Navegación por Teclado</strong>
            </P>
            <P>
              Todos los elementos interactivos del sitio — incluyendo menús de
              navegación, botones, formularios, enlaces, controles de
              paginación, carruseles y acordeones — son completamente operables
              mediante el teclado. Se garantiza un orden de tabulación lógico y
              predecible, alineado con la estructura visual del contenido. Se
              implementan atajos de teclado para saltar al contenido principal
              (skip-to-content) y a la navegación principal, reduciendo la carga
              de navegación para usuarios que no utilizan mouse.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.6. Indicadores de Foco Visibles</strong>
            </P>
            <P>
              El indicador de foco del teclado es visible en todos los elementos
              interactivos del sitio. Nuestro sistema de diseño garantiza que el
              anillo de foco (<em>focus ring</em>) tenga contraste suficiente y
              un tamaño adecuado para ser identificado claramente por usuarios
              con baja visión o que dependen de la navegación por teclado. No
              suprimimos el indicador de foco nativo del navegador sin
              reemplazarlo por un equivalente al menos tan visible.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.7. Roles y Atributos ARIA</strong>
            </P>
            <P>
              Se utilizan atributos ARIA (Accessible Rich Internet Applications)
              de manera estratégica y conservadora para complementar la
              semántica HTML cuando es necesario. Se implementan roles ARIA
              (como <code>role=&quot;navigation&quot;</code>,{" "}
              <code>role=&quot;dialog&quot;</code>,{" "}
              <code>role=&quot;alert&quot;</code>,{" "}
              <code>role=&quot;status&quot;</code>) y propiedades como{" "}
              <code>aria-label</code>, <code>aria-labelledby</code>,{" "}
              <code>aria-describedby</code>, <code>aria-expanded</code>,{" "}
              <code>aria-controls</code>, <code>aria-live</code> y{" "}
              <code>aria-hidden</code> para enriquecer la experiencia de los
              usuarios de tecnologías de asistencia.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.8. Formularios Accesibles</strong>
            </P>
            <P>
              Todos los formularios del sitio — incluyendo el formulario de
              cotización, el formulario de contacto, el módulo de suscripción y
              el proceso de creación de cuenta — cuentan con:
            </P>
            <Ul
              items={[
                "Etiquetas visibles (<label>) o etiquetas ARIA asociadas programáticamente a cada campo de entrada.",
                "Instrucciones claras sobre el formato esperado para los datos de entrada (por ejemplo, formato de fecha, número de teléfono o límite de caracteres).",
                "Mensajes de error descriptivos que identifican el campo con error y explican cómo corregirlo, sin depender únicamente del color.",
                "Agrupación lógica de campos relacionados mediante elementos <fieldset> y <legend>.",
                "Atributos de autocompletado (autocomplete) donde corresponda, para reducir la carga cognitiva del usuario.",
              ]}
            />
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.9. Diseño Responsivo y Adaptable</strong>
            </P>
            <P>
              El sitio adopta un enfoque mobile-first: el diseño se adapta
              fluidamente a pantallas de diferentes tamaños, desde smartphones
              de 320px hasta monitores de escritorio de alta resolución. El
              contenido no requiere desplazamiento horizontal en pantallas de
              320px de ancho para orientación vertical. El zoom del navegador
              puede escalarse hasta el 200% sin pérdida de contenido ni
              funcionalidad, cumpliendo el criterio de éxito 1.4.4 de WCAG 2.1.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.10. Idioma de la Página</strong>
            </P>
            <P>
              El atributo de idioma (<code>lang=&quot;es&quot;</code>) está
              correctamente declarado en el elemento raíz{" "}
              <code>&lt;html&gt;</code> de todas las páginas del sitio. Esto
              permite a los lectores de pantalla y otros agentes de usuario
              aplicar las reglas lingüísticas correctas al procesar el
              contenido.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                5.11. Contenido Sin Parpadeo ni Destello Peligroso
              </strong>
            </P>
            <P>
              El sitio no contiene animaciones, videos ni elementos que
              parpadeen más de tres veces por segundo, siguiendo el criterio de
              éxito 2.3.1 de WCAG 2.1 para prevenir el riesgo de crisis
              convulsivas fotosensibles. Las animaciones decorativas que se
              utilizan en la interfaz son suaves, de baja frecuencia y están
              diseñadas para no representar un riesgo para usuarios con
              fotosensibilidad.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.12. Preferencia de Movimiento Reducido</strong>
            </P>
            <P>
              El sitio respeta la preferencia del sistema operativo del usuario
              mediante la media query <code>prefers-reduced-motion</code>.
              Cuando el usuario ha indicado en su sistema que prefiere
              movimiento reducido, las animaciones decorativas, transiciones y
              efectos cinéticos del sitio se reducen o eliminan automáticamente,
              sin necesidad de configuración adicional por parte del usuario.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.13. Preferencia de Esquema de Color</strong>
            </P>
            <P>
              El sitio detecta y respeta la preferencia de esquema de color del
              sistema operativo del usuario (modo claro / modo oscuro) a través
              de la media query <code>prefers-color-scheme</code>. Aunque el
              diseño principal del sitio utiliza un esquema de color oscuro, se
              garantiza que el contraste y la legibilidad se mantienen en todos
              los modos disponibles.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.14. Descripciones de Vínculos y Botones</strong>
            </P>
            <P>
              Todos los enlaces y botones del sitio tienen un propósito claro y
              descriptivo que puede determinarse a partir del texto del enlace o
              del contexto inmediato. Se evitan textos genéricos como &quot;Haz
              clic aquí&quot;, &quot;Leer más&quot; o &quot;Ver&quot; sin
              contexto adicional. Cuando se utilizan iconos como únicos
              elementos visuales de un botón, se garantiza que el nombre
              accesible del elemento sea descriptivo mediante{" "}
              <code>aria-label</code> o texto oculto visualmente pero accesible
              para lectores de pantalla.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.15. Tablas de Datos Accesibles</strong>
            </P>
            <P>
              Las tablas de datos (como comparativos de productos, guías de
              tallas o tarifas de envío) incluyen encabezados de fila y columna
              correctamente marcados con el elemento <code>&lt;th&gt;</code> y
              el atributo <code>scope</code> correspondiente. Las tablas
              complejas incluyen un elemento <code>&lt;caption&gt;</code> que
              describe el propósito de la tabla.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.16. Contenido Multimedia</strong>
            </P>
            <P>
              Los videos publicados en el sitio (como tutoriales de cuidado de
              prendas o presentaciones de productos) incluyen subtítulos
              sincronizados para usuarios con discapacidad auditiva. Las
              presentaciones de solo audio incluyen transcripciones textuales.
              Para el contenido puramente decorativo de video o audio, se
              garantiza que no transmita información indispensable que no esté
              disponible en otra forma.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.17. Gestión de Errores y Recuperación</strong>
            </P>
            <P>
              Los procesos críticos del sitio — como el envío de formularios, el
              proceso de cotización y la creación de cuenta — incluyen
              mecanismos de confirmación, revisión y corrección antes de que las
              acciones sean definitivas. Los errores se notifican de forma
              clara, descriptiva y accesible, sin depender exclusivamente del
              color para comunicar el estado de error.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.18. Tiempo Suficiente para Completar Tareas</strong>
            </P>
            <P>
              El sitio no impone límites de tiempo estrictos para completar
              formularios o procesos. Si en el futuro se implementan sesiones
              con tiempo límite (por ejemplo, por razones de seguridad), se
              notificará al usuario con suficiente antelación y se le ofrecerá
              la posibilidad de extender el tiempo o guardar el progreso.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.19. Navegación Consistente</strong>
            </P>
            <P>
              Los componentes de navegación — menú principal, menú de pie de
              página, migas de pan (breadcrumbs), botones de acción — se
              presentan en el mismo orden y con la misma apariencia en todas las
              páginas del sitio. Este patrón consistente reduce la carga
              cognitiva y permite que los usuarios con discapacidades
              cognitivas, aprendizaje o memoria construyan un modelo mental
              predecible del sitio.
            </P>
          </div>
        </Section>

        {/* ── 6. Tecnologías de Apoyo Compatibles ──────────────────────── */}
        <Section n={6} title="Tecnologías de Apoyo Compatibles">
          <P>
            El sitio web de Confecciones Liss ha sido probado y optimizado para
            funcionar correctamente con las siguientes tecnologías de apoyo y
            configuraciones de usuario:
          </P>
          <Ul
            items={[
              "Lectores de pantalla: NVDA (NonVisual Desktop Access) con navegadores Firefox y Chrome en Windows; JAWS (Job Access With Speech) con Internet Explorer y Chrome en Windows; VoiceOver con Safari en macOS e iOS; TalkBack en Android con Chrome.",
              "Navegación por teclado: Compatible con la navegación completa mediante teclado estándar (Tab, Shift+Tab, Enter, Espacio, flechas de dirección) en todos los navegadores principales.",
              "Zoom del navegador: El sitio soporta zoom de hasta el 400% sin pérdida de contenido (orientación vertical en pantalla de 1280px de ancho) y sin superposición de elementos.",
              "Contraste alto: El sitio es compatible con el modo de alto contraste de Windows y con extensiones de navegador que ajustan el contraste de color.",
              "Tamaño de texto del sistema: El sitio respeta las configuraciones de tamaño de fuente del sistema operativo y del navegador, utilizando unidades relativas (rem, em, %) en lugar de unidades absolutas (px) para los tamaños de fuente.",
              "Dispositivos apuntadores alternativos: El sitio es operable con ratones especializados, joysticks, trackpads y otros dispositivos señaladores alternativos que emulan la funcionalidad del mouse.",
              "Control por voz: El sitio es compatible con Dragon NaturallySpeaking y con la funcionalidad de control por voz integrada en sistemas operativos modernos (Voice Control en macOS/iOS, Voice Access en Android).",
            ]}
          />
          <P>
            Las pruebas de compatibilidad con tecnologías de apoyo se realizan
            periódicamente como parte de nuestro proceso de aseguramiento de
            calidad. Reconocemos que la compatibilidad perfecta con todas las
            versiones y configuraciones posibles de tecnologías de apoyo está
            fuera de nuestro alcance, pero nos comprometemos a atender los
            reportes de incompatibilidad de manera prioritaria.
          </P>
        </Section>

        {/* ── 7. Evaluación y Auditoría ─────────────────────────────────── */}
        <Section n={7} title="Proceso de Evaluación y Auditoría">
          <P>
            Confecciones Liss adopta un enfoque estructurado para la evaluación
            continua de la accesibilidad de su sitio web. Nuestro proceso de
            evaluación incluye las siguientes actividades:
          </P>
          <Ul
            items={[
              "Autoevaluación continua: El equipo de desarrollo realiza revisiones de accesibilidad como parte del proceso de desarrollo de nuevas funcionalidades, utilizando herramientas automatizadas como axe-core, Lighthouse, WAVE y Accessibility Insights.",
              "Pruebas manuales periódicas: Adicionalmente a las herramientas automatizadas, se realizan pruebas manuales con tecnologías de apoyo reales (lectores de pantalla, navegación por teclado) para identificar problemas que no son detectados por herramientas automatizadas.",
              "Auditorías formales: Se planifican auditorías de accesibilidad formales con evaluadores especializados, con una periodicidad mínima anual o cuando se realicen cambios significativos en la arquitectura o el diseño del sitio.",
              "Evaluación participativa: Se promueve la participación de usuarios con diferentes capacidades en las pruebas de usabilidad, cuando sea posible, para obtener retroalimentación directa desde la perspectiva de los usuarios afectados.",
              "Monitoreo de retroalimentación: Se revisan periódicamente los reportes de accesibilidad recibidos por los canales de contacto habilitados, y se priorizan las correcciones en función del impacto sobre el usuario.",
            ]}
          />
          <P>
            Los resultados de las auditorías y evaluaciones son documentados
            internamente y utilizados para planificar las mejoras de
            accesibilidad en las iteraciones sucesivas del sitio.
          </P>
        </Section>

        {/* ── 8. Responsabilidad Organizacional ───────────────────────── */}
        <Section n={8} title="Responsabilidad Organizacional">
          <P>
            La accesibilidad web no es responsabilidad exclusiva del equipo
            técnico: es una responsabilidad compartida que involucra a todos los
            colaboradores que participan en la creación y gestión del contenido
            digital de Confecciones Liss.
          </P>
          <Ul
            items={[
              "Dirección General: Aprueba y respalda la política de accesibilidad y asigna los recursos necesarios para su implementación y mantenimiento.",
              "Equipo de Desarrollo y Tecnología: Responsable de implementar las medidas técnicas de accesibilidad, realizar pruebas automatizadas y manuales, y mantener el código conforme a los estándares WCAG 2.1 AA.",
              "Equipo de Diseño: Responsable de garantizar que los diseños visuales cumplan los requisitos de contraste, tamaño de fuente, espaciado y jerarquía visual que sustentan la accesibilidad del sitio.",
              "Equipo de Contenido y Marketing: Responsable de crear y publicar contenido accesible: textos claros, imágenes con texto alternativo adecuado, videos con subtítulos y documentos en formatos accesibles.",
              "Servicio al Cliente: Responsable de recibir, registrar y escalar los reportes de accesibilidad recibidos de los usuarios, y de garantizar que existan canales alternativos de atención para usuarios que no puedan utilizar el sitio web.",
            ]}
          />
        </Section>

        {/* ── 9. Limitaciones Conocidas ─────────────────────────────────── */}
        <Section n={9} title="Limitaciones Técnicas Conocidas">
          <P>
            Confecciones Liss opera bajo el principio de transparencia. A
            continuación, documentamos las limitaciones de accesibilidad
            actualmente identificadas en nuestro sitio web, junto con el estado
            de las acciones correctivas:
          </P>
          <Ul
            items={[
              "Contenido generado por usuarios (reseñas y comentarios): Los comentarios y reseñas publicados por clientes pueden no siempre incluir texto alternativo en imágenes adjuntas. Estamos desarrollando guías de moderación y herramientas de apoyo para facilitar la creación de contenido accesible por parte de los usuarios.",
              "Documentos PDF: Algunos documentos en formato PDF (fichas técnicas, fichas de producto, catálogos descargables) pueden no cumplir plenamente los requisitos de accesibilidad para documentos PDF (PDF/UA). Estamos trabajando en la conversión y corrección progresiva de estos documentos.",
              "Contenido de terceros integrado: El sitio puede integrar contenido de terceros (como mapas, widgets de redes sociales, herramientas de chat de atención al cliente) cuya accesibilidad depende de los proveedores externos correspondientes y está fuera de nuestro control directo. Evaluamos la accesibilidad de estos proveedores antes de integrar sus herramientas y optamos por alternativas accesibles cuando es posible.",
              "Componentes de interfaz complejos: Algunos componentes de interfaz avanzados (como el configurador de productos personalizados) pueden presentar experiencias subóptimas con determinadas configuraciones de tecnologías de apoyo. Si bien cumplen los criterios básicos de accesibilidad, reconocemos que la experiencia puede no ser equivalente a la de los usuarios sin discapacidad. Estamos trabajando en mejoras específicas para estos componentes.",
              "Videos heredados: Algunos videos publicados en fechas anteriores a la implementación de esta política pueden no contar con subtítulos o transcripciones. Estamos realizando una revisión y actualización progresiva de este contenido.",
            ]}
          />
          <P>
            Si identifica una barrera de accesibilidad que no esté documentada
            en esta sección, le invitamos a reportarla a través de nuestros
            canales de contacto (véase Sección 11). Su retroalimentación es
            fundamental para mejorar continuamente la experiencia de todos los
            usuarios.
          </P>
        </Section>

        {/* ── 10. Alternativas de Acceso ────────────────────────────────── */}
        <Section n={10} title="Alternativas de Acceso y Asistencia">
          <P>
            Confecciones Liss reconoce que, a pesar de sus esfuerzos, el sitio
            web puede no ser completamente accesible para todos los usuarios en
            todas las situaciones. Por esta razón, garantizamos la
            disponibilidad de canales alternativos de acceso a la información y
            los servicios:
          </P>
          <Ul
            items={[
              "Atención telefónica: El equipo de servicio al cliente puede proporcionar asistencia verbal completa para usuarios que no puedan acceder al sitio web o utilizar sus funcionalidades. Este canal está disponible durante los horarios de atención publicados en el sitio.",
              "Atención por WhatsApp: Disponemos de canal de atención por WhatsApp para usuarios que prefieran comunicarse por mensajería de texto. Las funciones de accesibilidad integradas en la aplicación WhatsApp (como los mensajes de voz, la lectura de texto o el ajuste de tamaño de fuente) pueden complementar la experiencia del usuario.",
              "Atención por correo electrónico: Los usuarios pueden solicitar información sobre productos, cotizaciones y servicios directamente por correo electrónico, sin necesidad de utilizar el sitio web.",
              "Atención presencial: Para usuarios que prefieran o requieran atención presencial, nuestras instalaciones físicas están disponibles durante los horarios de atención publicados. Informamos oportunamente sobre las condiciones de accesibilidad física de nuestras instalaciones.",
              "Formatos alternativos: A solicitud del usuario, podemos proporcionar información específica (catálogos, fichas técnicas, presupuestos) en formatos alternativos más accesibles, como texto plano, Word accesible o audio.",
            ]}
          />
        </Section>

        {/* ── 11. Contacto ─────────────────────────────────────────────── */}
        <Section n={11} title="Canal de Contacto para Accesibilidad">
          <P>
            Si experimenta dificultades para acceder a cualquier parte de
            nuestro sitio web, si desea reportar un problema de accesibilidad, o
            si necesita obtener información en un formato alternativo, puede
            contactarnos a través de los siguientes canales:
          </P>
          <Ul
            items={[
              'Correo electrónico: Puede escribirnos a nuestra dirección de correo electrónico oficial, indicando en el asunto "Reporte de Accesibilidad" o "Solicitud de Formato Alternativo". Nos comprometemos a responder en un plazo máximo de cinco (5) días hábiles.',
              "WhatsApp: Puede comunicarse con nuestro equipo de servicio al cliente a través del número de WhatsApp oficial de Confecciones Liss, disponible en el pie de página de este sitio.",
              "Formulario de contacto: Puede utilizar el formulario de contacto disponible en la sección de Contacto del sitio web, indicando que su mensaje está relacionado con accesibilidad.",
            ]}
          />
          <P>
            Al recibir un reporte de accesibilidad, seguimos el siguiente
            procedimiento:
          </P>
          <Ul
            items={[
              "Confirmamos la recepción del reporte en un plazo de dos (2) días hábiles.",
              "Evaluamos el problema reportado y determinamos si constituye una barrera de accesibilidad WCAG 2.1 AA en un plazo de cinco (5) días hábiles.",
              "Si se confirma la barrera, planificamos la corrección e informamos al usuario del plazo estimado de resolución.",
              "Ofrecemos, cuando sea posible, una solución alternativa inmediata mientras se trabaja en la corrección definitiva.",
              "Notificamos al usuario cuando la corrección ha sido implementada.",
            ]}
          />
        </Section>

        {/* ── 12. Mejora Continua ───────────────────────────────────────── */}
        <Section n={12} title="Compromiso de Mejora Continua">
          <P>
            La accesibilidad web es un proceso continuo, no un destino final.
            Confecciones Liss se compromete a mantener y mejorar progresivamente
            la accesibilidad de su sitio web a través de las siguientes
            acciones:
          </P>
          <Ul
            items={[
              "Integrar la accesibilidad como criterio de aceptación en todos los ciclos de desarrollo y actualización del sitio.",
              "Capacitar al equipo de desarrollo, diseño y contenido en buenas prácticas de accesibilidad web, con actualizaciones periódicas conforme evolucionan los estándares.",
              "Mantenernos al día con las actualizaciones de las WCAG (incluyendo WCAG 2.2 y las futuras WCAG 3.0) y evaluar su implementación en nuestro sitio.",
              "Revisar y actualizar esta declaración de accesibilidad al menos una vez al año, o cada vez que se realicen cambios significativos en el sitio.",
              "Considerar la retroalimentación de usuarios con discapacidad como una fuente privilegiada de información para priorizar mejoras.",
              "Evaluar proactivamente nuevas tecnologías y herramientas que puedan mejorar la experiencia de accesibilidad de nuestros usuarios.",
            ]}
          />
        </Section>

        {/* ── 13. Exclusiones y Límites ─────────────────────────────────── */}
        <Section n={13} title="Exclusiones y Alcance de la Declaración">
          <P>
            La presente declaración de accesibilidad cubre exclusivamente el
            sitio web oficial de Confecciones Liss accesible bajo el dominio
            principal. Las siguientes áreas quedan excluidas de esta
            declaración, aunque nos esforzamos por promover la accesibilidad
            también en estos contextos:
          </P>
          <Ul
            items={[
              "Perfiles en redes sociales: Las páginas de Confecciones Liss en plataformas como Instagram, Facebook, Pinterest o TikTok se rigen por las políticas y capacidades de accesibilidad de sus respectivas plataformas. Adoptamos buenas prácticas de accesibilidad en la publicación de contenido (texto alternativo en imágenes, subtítulos en videos) en la medida en que cada plataforma lo permite.",
              "Aplicaciones de terceros integradas: Herramientas como plataformas de pago, sistemas de envío o widgets externos de terceros tienen su propia declaración de accesibilidad y están bajo la responsabilidad de sus respectivos proveedores.",
              "Contenido archivado: El contenido histórico archivado (publicaciones de blog muy antiguas, catálogos de temporadas anteriores) puede no cumplir todos los criterios WCAG 2.1 AA, dado que fue creado antes de la implementación de esta política. Este contenido se revisa y actualiza progresivamente según las capacidades del equipo.",
              "Comunicaciones directas personalizadas: Los documentos generados de manera personalizada para cada cliente (cotizaciones, facturas, propuestas comerciales) pueden no cumplir todos los criterios de accesibilidad de documentos. En caso de que un cliente requiera estos documentos en un formato accesible específico, puede solicitarlo a través de nuestros canales de contacto.",
            ]}
          />
        </Section>

        {/* ── 14. Versión y Vigencia ─────────────────────────────────── */}
        <Section n={14} title="Versión y Vigencia de la Declaración">
          <P>
            Esta declaración de accesibilidad corresponde a la{" "}
            <strong>versión 1.0</strong>, publicada el{" "}
            <strong>25 de junio de 2026</strong>. Será revisada y actualizada en
            las siguientes circunstancias:
          </P>
          <Ul
            items={[
              "Anualmente, como mínimo, para verificar que refleja el estado actual del sitio.",
              "Cuando se realicen cambios significativos en la arquitectura, el diseño o las funcionalidades del sitio.",
              "Cuando se completen correcciones de las limitaciones documentadas en la Sección 9.",
              "Cuando entren en vigor nuevos estándares o normativas de accesibilidad aplicables.",
            ]}
          />
          <P>
            La versión vigente de esta declaración estará siempre disponible en
            la ruta <code>/legal/accesibilidad</code> del sitio web oficial de
            Confecciones Liss. Las versiones anteriores podrán estar disponibles
            a solicitud.
          </P>
        </Section>

        {/* ── 15. Disposición Final ─────────────────────────────────────── */}
        <Section n={15} title="Disposición Final">
          <P>
            En Confecciones Liss creemos que un negocio verdaderamente
            responsable es uno que se asegura de que todas las personas puedan
            acceder a sus productos y servicios en condiciones de igualdad y
            dignidad. La accesibilidad web es una dimensión concreta y medible
            de esa responsabilidad.
          </P>
          <P>
            Reconocemos que el camino hacia una accesibilidad plena es continuo
            y que siempre habrá espacio para mejorar. Agradecemos profundamente
            la paciencia, la comprensión y, sobre todo, la retroalimentación de
            todos los usuarios que encuentren barreras en nuestro sitio. Cada
            reporte que recibimos es una oportunidad de mejorar la experiencia
            de todos.
          </P>
          <P>
            Esta Política de Accesibilidad del Sitio Web es un documento vivo
            que evoluciona con la empresa, con la tecnología y con los
            estándares de la industria. Su existencia y publicación reflejan el
            compromiso genuino de Confecciones Liss con la inclusión digital, la
            diversidad y la igualdad de oportunidades.
          </P>
          <P>
            <em>
              Confecciones Liss — Porque vestir bien es un derecho de todos.
            </em>
          </P>
        </Section>
      </LegalArticleReader>
    </>
  );
}
