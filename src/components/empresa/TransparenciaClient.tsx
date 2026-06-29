"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Estructura de carpetas para el bloque "Lo que publicamos"
interface DocumentFolder {
  id: string;
  name: string;
  description: string;
  refCode: string;
  size: string;
}

const documentFolders: DocumentFolder[] = [
  {
    id: "equipo",
    name: "Equipo de Trabajo",
    description:
      "Expediente detallado de las 9 personas especialistas en costura, patronaje, bordado, control de calidad y tecnología en el taller.",
    refCode: "REG-EQ-2026",
    size: "2.4 MB",
  },
  {
    id: "historia",
    name: "Historia Oficial",
    description:
      "Trayectoria del oficio familiar fundado en 2005 y la constitución del taller físico en el Barrio La Merced en 2021.",
    refCode: "HIS-LISS-01",
    size: "1.8 MB",
  },
  {
    id: "proceso",
    name: "Proceso de Confección",
    description:
      "Ficha operativa detallada de las 5 estaciones físicas del taller: Corte, Confección, Bordado, Calidad y Almacén.",
    refCode: "OPS-PROC-v5",
    size: "4.2 MB",
  },
  {
    id: "calidad",
    name: "Manual de Calidad",
    description:
      "Guía técnica de tolerancias mecánicas (< 1.5mm), verificación de medidas y checklist de tolerancia cero para defectos críticos.",
    refCode: "QA-MANUAL-2026",
    size: "3.1 MB",
  },
  {
    id: "politicas",
    name: "Políticas y Garantías",
    description:
      "Términos oficiales de contratación, devoluciones por talla, garantía de ajuste anatómico y envíos nacionales a los 14 departamentos.",
    refCode: "POL-LEGAL-v2",
    size: "950 KB",
  },
  {
    id: "mediakit",
    name: "Media Kit de Marca",
    description:
      "Logotipos vectoriales oficiales, paleta de colores de marca (azul marino/rojo terracota), tipografías e imágenes de alta definición.",
    refCode: "MDK-LISS-2026",
    size: "12.5 MB",
  },
  {
    id: "instalaciones",
    name: "Visita de Instalaciones",
    description:
      "Plano arquitectónico esquemático y recorrido por la distribución de maquinaria industrial de costura en Barrio La Merced.",
    refCode: "ARC-INST-2026",
    size: "2.8 MB",
  },
  {
    id: "responsabilidad",
    name: "Responsabilidad Social",
    description:
      "Informe anual público detallando la creación de empleo local en San Miguel y el desarrollo tecnológico sin precarización.",
    refCode: "CSR-REPORT-2026",
    size: "1.5 MB",
  },
];

// Estructura de notas adhesivas (Preguntas frecuentes)
interface StickyNote {
  id: number;
  question: string;
  answer: string;
  size: string; // Tailwind class size
  rotation: string; // Inclinación
}

const stickyNotes: StickyNote[] = [
  {
    id: 1,
    question: "¿Tienen tienda física abierta al público?",
    answer:
      "No operamos como tienda de ropa casual. Nuestro local en Barrio La Merced, San Miguel es exclusivamente un taller de diseño y manufactura a medida. La toma de medidas presencial se realiza bajo agenda previa coordinada.",
    size: "col-span-1 md:col-span-6",
    rotation: "rotate-[-1.5deg]",
  },
  {
    id: 2,
    question: "¿De dónde provienen las telas?",
    answer:
      "Consumimos principalmente textiles certificados de distribuidores nacionales (como Sincatex de El Salvador). Todo el hilo es de poliéster de alta tenacidad calibre 40/2 para asegurar costuras indestructibles ante lavados frecuentes.",
    size: "col-span-1 md:col-span-6",
    rotation: "rotate-[2deg]",
  },
  {
    id: 3,
    question: "¿Qué pasa si la prenda no me queda bien?",
    answer:
      "Ofrecemos garantía de ajuste del 100%. Si un uniforme presenta cualquier desviación en el calce anatómico respecto a las cotas físicas registradas, realizamos los ajustes técnicos en el taller sin ningún costo adicional para el cliente.",
    size: "col-span-1 md:col-span-7",
    rotation: "rotate-[-1deg]",
  },
  {
    id: 4,
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí. Coordinamos entregas verificadas a los 14 departamentos de El Salvador a través de empresas logísticas asociadas o transporte directo de nuestro taller para grandes lotes corporativos.",
    size: "col-span-1 md:col-span-5",
    rotation: "rotate-[1.5deg]",
  },
];

export default function TransparenciaClient() {
  const [activeFolderId, setActiveFolderId] = useState<string>("equipo");
  const activeFolder =
    documentFolders.find((f) => f.id === activeFolderId) || documentFolders[0];

  const [auditLog, setAuditLog] = useState<string[]>([
    "23:35:43 — Build verificado exitosamente.",
    "23:33:00 — Sitemap y registro actualizados.",
    "23:26:21 — CalidadClient compilado con éxito.",
    "2026-06-27 — Centro de Transparencia inicializado.",
  ]);

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* CABECERA DOCUMENTAL (Reemplaza al Hero) */}
      {/* ──────────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-8 pb-12 md:px-8">
        <div className="rounded border border-[#143067]/20 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[#e1e2e5] pb-6 font-mono text-xs text-[#444650] md:flex-row md:items-center">
            <div className="space-y-1">
              <p className="font-semibold tracking-wider text-[#143067]">
                CONFECCIONES LISS — TRANSPARENCIA PÚBLICA
              </p>
              <p>
                CENTRO DE CONTROL:{" "}
                <span className="font-bold text-[#b43024]">PORTAL-TRS-01</span>
              </p>
            </div>
            <div className="space-y-1 text-left md:text-right">
              <p>ESTADO: ACCESO LIBRE</p>
              <p>ÚLTIMA AUDITORÍA: 27-06-2026</p>
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-6xl">
              &ldquo;La confianza no se solicita. Se construye siendo
              transparentes.&rdquo;
            </h1>

            <div className="flex flex-wrap gap-4 font-mono text-xs text-[#444650]">
              <span className="rounded border border-[#143067]/10 bg-[#143067]/5 px-3 py-1">
                EMPRESA: Confecciones Liss
              </span>
              <span className="rounded border border-[#b43024]/10 bg-[#b43024]/5 px-3 py-1 font-bold text-[#b43024]">
                ESTADO: Información Pública
              </span>
              <span className="rounded border border-[#143067]/10 bg-[#143067]/5 px-3 py-1">
                AUDITOR: René A. Méndez
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CUERPO PRINCIPAL: PANEL CENTRAL IZQUIERDO Y CONTROL DERECHO */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* ======================================================== */}
          {/* PANEL PRINCIPAL IZQUIERDO (Bloques de información) */}
          {/* ======================================================== */}
          <div className="space-y-16 md:space-y-24 lg:col-span-8">
            {/* BLOQUE 1: Quiénes somos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 01 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Quiénes somos
                </h2>
              </div>

              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Somos una empresa familiar dedicada a la confección de
                    uniformes escolares, empresariales y médicos.
                  </p>
                  <p>
                    Nuestra historia comenzó en 2005 confeccionando prendas
                    desde casa y, desde entonces, hemos construido nuestro
                    crecimiento a partir del trabajo constante, la
                    especialización y la confianza de nuestros clientes.
                  </p>
                </div>

                {/* Caja Datos Empresa */}
                <div className="space-y-3 rounded border border-[#e1e2e5] bg-white p-5 font-mono text-xs text-[#444650]">
                  <span className="block border-b border-[#e1e2e5] pb-2 font-bold tracking-wider text-[#143067] uppercase">
                    DATOS DE LA EMPRESA
                  </span>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Año de inicio del oficio
                    </span>
                    <span>2005</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Constitución del taller
                    </span>
                    <span>2021</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Ubicación
                    </span>
                    <span>Barrio La Merced, San Miguel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Actividad
                    </span>
                    <span>Confección de uniformes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Naturaleza
                    </span>
                    <span>Empresa Familiar</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BLOQUE 2: Cómo tomamos decisiones (Flujograma) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 02 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Cómo tomamos decisiones
                </h2>
              </div>

              {/* Flujo operativo vertical en móvil, conectado horizontal en desktop */}
              <div className="relative grid grid-cols-1 items-stretch gap-4 md:grid-cols-4">
                {[
                  {
                    step: "Cliente",
                    desc: "El cliente define requerimientos de uniformidad. Tomamos 12 cotas anatómicas físicas para asegurar el talle perfecto.",
                  },
                  {
                    step: "Diseño",
                    desc: "Trazado digital del patrón. Control estricto de tolerancias (< 1.5mm) y comprobación del hilo de la tela.",
                  },
                  {
                    step: "Producción",
                    desc: "Manufactura física en el taller de San Miguel con costuras reforzadas e hilo poliéster de alta tenacidad.",
                  },
                  {
                    step: "Entrega",
                    desc: "Inspección técnica visual, planchado a alta presión, empaque individual y despacho con etiqueta firmada.",
                  },
                ].map((item, index, arr) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between rounded border border-[#e1e2e5] bg-white p-5 transition-colors duration-300 hover:border-[#143067]/40"
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] font-bold text-[#b43024]">
                        PASO 0{index + 1}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#143067]">
                        {item.step}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#444650]">
                        {item.desc}
                      </p>
                    </div>
                    {/* Flecha conectora (solo visible en desktop) */}
                    {index < arr.length - 1 && (
                      <div className="pointer-events-none absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 rounded-full border border-[#e1e2e5] bg-white p-1 text-[#b43024] select-none md:block">
                        <span className="material-symbols-outlined text-xs">
                          arrow_forward
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BLOQUE 3: Nuestros compromisos públicos (Acta Legal) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 03 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Nuestros compromisos públicos
                </h2>
              </div>

              {/* Formato Acta Legal sin iconos */}
              <div className="divide-y divide-[#e1e2e5] rounded border border-[#e1e2e5] bg-white font-sans text-sm text-[#444650]">
                {[
                  {
                    num: "01",
                    text: "Nunca ofrecer información falsa sobre materiales, procedencia o resistencia de tejidos.",
                  },
                  {
                    num: "02",
                    text: "No prometer plazos imposibles con el único fin de asegurar una venta.",
                  },
                  {
                    num: "03",
                    text: "Explicar claramente cada etapa de costura y tolerancias anatómicas en cotizaciones.",
                  },
                  {
                    num: "04",
                    text: "Responder con honestidad ante reclamos post-venta, asumiendo la garantía de ajuste.",
                  },
                  {
                    num: "05",
                    text: "Corregir errores de patronaje o bordado inmediatamente sin recargo.",
                  },
                  {
                    num: "06",
                    text: "Mantener comunicación permanente y directa por canales digitales durante la fabricación.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-6 p-5">
                    <span className="shrink-0 font-mono text-xl font-bold text-[#b43024]">
                      {item.num} {"//"}
                    </span>
                    <p className="text-sm font-semibold text-[#191c1e]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BLOQUE 4: Lo que publicamos (Archivador Documental) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 04 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Lo que publicamos
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Grid de carpetas interactivas */}
                <div className="grid grid-cols-2 gap-2">
                  {documentFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => {
                        setActiveFolderId(folder.id);
                        // Añadir evento al log lateral de control
                        setAuditLog((prev) => [
                          `${new Date().toTimeString().slice(0, 8)} — Acceso a carpeta: ${folder.refCode}`,
                          ...prev.slice(0, 3),
                        ]);
                      }}
                      className={`flex items-center gap-2 rounded border p-3 text-left transition-all duration-300 ${
                        activeFolderId === folder.id
                          ? "border-[#143067] bg-[#143067] text-white"
                          : "border-[#e1e2e5] bg-white text-[#143067] hover:bg-[#f8f9fb]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        folder
                      </span>
                      <span className="truncate font-serif text-xs leading-none font-bold">
                        {folder.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Detalle de la carpeta seleccionada */}
                <div className="flex min-h-[200px] flex-col justify-between rounded border border-[#e1e2e5] bg-white p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs text-[#444650]/60">
                      <span>REF: {activeFolder.refCode}</span>
                      <span className="font-bold text-[#b43024]">
                        {activeFolder.size}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#143067]">
                      {activeFolder.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#444650]">
                      {activeFolder.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#e1e2e5] pt-4 font-mono text-[10px] text-[#143067]">
                    <span>DISPONIBLE EN EL SITIO</span>
                    <span className="material-symbols-outlined text-xs select-none">
                      verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BLOQUE 5: Preguntas que recibimos (Notas Adhesivas) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 05 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Preguntas que recibimos con frecuencia
                </h2>
              </div>

              {/* Grid asimétrico tipo notas post-it en escritorio */}
              <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-12">
                {stickyNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`space-y-3 rounded border border-[#e1e2e5] bg-white p-6 shadow-[0_4px_15px_-10px_rgba(0,0,0,0.05)] transition-transform duration-500 hover:scale-[1.01] hover:rotate-0 ${note.size} ${note.rotation}`}
                  >
                    <span className="block border-b border-[#e1e2e5] pb-2 font-mono text-[9px] font-bold tracking-wider text-[#b43024] uppercase">
                      PREGUNTA FRECUENTE
                    </span>
                    <h3 className="font-serif text-sm leading-snug font-bold text-[#143067]">
                      {note.question}
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-[#444650]">
                      {note.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BLOQUE 6: Lo que nunca ocultamos (Mural Tipográfico) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 06 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Lo que nunca ocultamos
                </h2>
              </div>

              {/* Mural tipográfico con mucho espacio en blanco */}
              <div className="relative space-y-6 overflow-hidden rounded bg-[#143067] p-8 text-white md:space-y-8 md:p-16">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage:
                      "radial-gradient(white 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                ></div>

                <h3 className="font-serif text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  Nuestra historia.
                </h3>
                <h3 className="pl-4 font-serif text-3xl leading-tight font-bold tracking-tight text-white/80 md:pl-8 md:text-5xl lg:text-6xl">
                  Nuestro equipo.
                </h3>
                <h3 className="pl-8 font-serif text-3xl leading-tight font-bold tracking-tight text-white/60 md:pl-16 md:text-5xl lg:text-6xl">
                  Nuestro taller.
                </h3>
                <h3 className="pl-12 font-serif text-3xl leading-tight font-bold tracking-tight text-white/50 md:pl-24 md:text-5xl lg:text-6xl">
                  Nuestros procesos.
                </h3>
                <h3 className="pl-16 font-serif text-3xl leading-tight font-bold tracking-tight text-[#b43024] md:pl-32 md:text-5xl lg:text-6xl">
                  Nuestros errores cuando ocurren.
                </h3>
                <h3 className="pt-4 pl-20 font-serif text-2xl font-semibold text-[#dae2ff] italic md:pl-40 md:text-4xl">
                  Y nuestro compromiso de mejorar.
                </h3>
              </div>
            </motion.div>

            {/* BLOQUE 7: Transparencia en acción (Periódico) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  BLOQUE 07 //
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Transparencia en acción
                </h2>
              </div>

              {/* Layout Periódico a 3 Columnas */}
              <div className="grid grid-cols-1 items-start gap-8 text-sm leading-relaxed text-[#444650] md:grid-cols-3">
                {/* Columna 1: Foto */}
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb]">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-G2wJz71AP5vwCDp3t359I7x2kSZWb9W7SHnNgNThWNfLM7fMGzA0y5M1GjR6pDnLljfIYHiihui8K68JiUD61l1KTSZN1A_Oo_XYoUlopyn2KmLs-ATCrchByg932AMdkhGYxkz2-QJc41OYMvs5KMFq3BuohZHD_x0PQnYgjNgxZmdeVpUJnQX1nbkXpev54ppZsOzALWst7M23heLgF9ER-lEwexccB4aD4cpnHF9CP4YW-nLRvjo2GTw9BzKMAp4XF9tpZeY"
                      alt="Operario empacando prendas de calidad"
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover object-center grayscale"
                    />
                  </div>
                  <span className="block font-mono text-[9px] text-[#444650]">
                    SECCIÓN DE ARCHIVO TÉCNICO: DESPACHO VERIFICADO.
                  </span>
                </div>

                {/* Columna 2: Cita destacada */}
                <div className="space-y-4 border-r border-l border-[#e1e2e5] px-4 md:px-6">
                  <p className="font-serif text-lg leading-relaxed text-[#143067] italic">
                    &ldquo;Creemos que publicar nuestra historia, equipo e
                    instalaciones permite que cualquier cliente conozca con
                    quién trabaja.&rdquo;
                  </p>
                  <p className="text-xs">
                    La transparencia no debe reservarse únicamente para
                    auditorías internas. Debe ser la base de la comunicación
                    comercial diaria.
                  </p>
                </div>

                {/* Columna 3: Notas editoriales */}
                <div className="space-y-4">
                  <p>
                    Confecciones Liss publica información completa sobre su
                    historia, equipo, procesos, instalaciones y forma de trabajo
                    para que cualquier cliente pueda conocer quién está detrás
                    de la empresa antes de realizar una compra de uniformes.
                  </p>
                  <p className="font-semibold text-[#143067]">
                    Sin filtros corporativos. Costura y servicio real desde San
                    Miguel.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ======================================================== */}
          {/* PANEL SECUNDARIO DERECHO (Control y Auditoría) */}
          {/* ======================================================== */}
          <div className="space-y-6 rounded border border-[#143067]/20 bg-white p-6 shadow-sm lg:sticky lg:top-8 lg:col-span-4">
            {/* Cabecera del panel de control */}
            <div className="space-y-1 border-b border-[#e1e2e5] pb-4">
              <span className="block font-mono text-[10px] font-bold tracking-wider text-[#b43024] uppercase">
                PANEL DE AUDITORÍA
              </span>
              <h3 className="font-serif text-lg font-bold text-[#143067]">
                Resumen del Expediente
              </h3>
            </div>

            {/* Placeholder de Documentación Institucional */}
            <div className="relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(#143067 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>

              <div className="flex items-center gap-3">
                <svg
                  className="h-8 w-8 shrink-0 fill-none stroke-current stroke-1 text-[#143067]/60"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M 6,2 L 14,2 L 18,6 L 18,22 L 6,22 Z" />
                  <line x1="9" y1="10" x2="15" y2="10" strokeWidth="0.8" />
                  <line x1="9" y1="14" x2="15" y2="14" strokeWidth="0.8" />
                </svg>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm leading-tight font-bold text-[#143067]">
                    Verified dossier.pdf
                  </h4>
                  <p className="font-mono text-[9px] text-[#444650]/60">
                    CON-TRS-DOC-01 // 3.4 MB
                  </p>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#e1e2e5] pt-2 font-mono text-[9px] text-[#444650]">
                <span>ESTADO: VERIFICADO</span>
                <span className="font-bold text-[#b43024]">100% OK</span>
              </div>
            </div>

            {/* Consola de logs de auditoría simulados en tiempo real */}
            <div className="space-y-2">
              <span className="block font-mono text-[9px] tracking-wider text-[#444650] uppercase">
                LOGS DE ACTIVIDAD
              </span>
              <div className="h-[120px] space-y-2 overflow-y-auto rounded-md bg-[#191c1e] p-4 font-mono text-[10px] leading-relaxed text-[#dae2ff]">
                {auditLog.map((log, i) => (
                  <p key={i} className="truncate">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Sello oficial */}
            <div className="flex items-center justify-between border-t border-[#e1e2e5] pt-4">
              <div className="font-mono text-[9px] text-[#444650]">
                <p>REGISTRO INTEGRAL</p>
                <p>SAN MIGUEL, EL SALVADOR</p>
              </div>
              <div className="pointer-events-none rotate-[-5deg] rounded-md border border-[#b43024] px-3 py-1 font-mono text-[9px] font-bold tracking-wider text-[#b43024] select-none">
                VERIFICADO LISS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CIERRE (Sin CTA) */}
      {/* ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#e1e2e5] bg-[#f8f9fb] px-5 py-20 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="font-serif text-2xl leading-snug text-[#143067] md:text-3xl">
            &ldquo;La transparencia no es una sección del sitio web. Es la forma
            en que decidimos construir Confecciones Liss.&rdquo;
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#b43024]"></div>

          <div className="pt-4 font-mono text-xs text-[#444650]">
            <p className="font-bold text-[#143067]">Confecciones Liss</p>
            <p>Desde 2005.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
