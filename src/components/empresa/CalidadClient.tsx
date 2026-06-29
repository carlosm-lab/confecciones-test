"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Estructura de datos para el flujo interactivo de trabajo en equipo
interface TeamRole {
  id: string;
  name: string;
  responsible: string;
  focus: string;
  description: string;
  spec: string;
}

const teamRoles: TeamRole[] = [
  {
    id: "medidas",
    name: "Toma de Medidas",
    responsible: "Control de Calidad",
    focus: "Tolerancia anatómica",
    description:
      "Registro de 12 cotas anatómicas por cliente en nuestra base de datos para confección personalizada.",
    spec: "Precisión de ±0.5cm sobre contornos anatómicos básicos.",
  },
  {
    id: "corte",
    name: "Mesa de Corte",
    responsible: "Patronista / Cortador",
    focus: "Geometría del patrón",
    description:
      "Inspección de las piezas cortadas contra el molde digital y orientación del hilo de la tela.",
    spec: "Tolerancia máxima de desalineación en mesa de 1.5mm.",
  },
  {
    id: "confeccion",
    name: "Línea de Confección",
    responsible: "Especialista de Costura",
    focus: "Resistencia e integridad",
    description:
      "Costuras de sobrehilado y uniones estructurales con tensión regulada de hilo poliéster.",
    spec: "Puntada de seguridad de doble aguja en áreas críticas.",
  },
  {
    id: "bordado",
    name: "Área de Bordado",
    responsible: "Operario Computarizado",
    focus: "Densidad y posición",
    description:
      "Inspección del soporte de entretela y centrado preciso de la aguja con calibración digital.",
    spec: "Desviación angular máxima de ±1.0° respecto al eje vertical.",
  },
  {
    id: "calidad",
    name: "Revisión Técnica",
    responsible: "Auditor de Calidad",
    focus: "Cumplimiento del estándar",
    description:
      "Inspección visual exhaustiva bajo luz natural y artificial para descartar fallos de costura o cabos sueltos.",
    spec: "Auditoría del 100% de las prendas antes del planchado.",
  },
  {
    id: "almacen",
    name: "Preparación y Empaque",
    responsible: "Logística y Entrega",
    focus: "Presentación final",
    description:
      "Doblado industrial, vaporizado a temperatura controlada y empaque en fundas de alta densidad.",
    spec: "Empacado individual con etiqueta de trazabilidad de lote.",
  },
];

export default function CalidadClient() {
  const [activeRoleId, setActiveRoleId] = useState<string>("calidad");
  const activeRole =
    teamRoles.find((r) => r.id === activeRoleId) || teamRoles[4];

  // Variantes de animación
  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="overflow-x-hidden bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. HERO: MANUAL DE CONTROL DE CALIDAD (Ficha Técnica) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-8 pb-16 md:px-8 md:pt-12 md:pb-24">
        <div className="rounded border border-[#143067]/20 bg-white p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] md:p-12">
          {/* Header técnico del documento */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-[#e1e2e5] pb-6 font-mono text-xs text-[#444650] md:flex-row md:items-center">
            <div className="space-y-1">
              <p className="font-semibold tracking-wider text-[#143067]">
                CONFECCIONES LISS — DEPARTAMENTO TÉCNICO
              </p>
              <p>
                DOCUMENTO DE ESPECIFICACIÓN:{" "}
                <span className="font-bold text-[#b43024]">QA-MANUAL-2026</span>
              </p>
            </div>
            <div className="space-y-1 text-left md:text-right">
              <p>REVISIÓN: REV-05 / PÚBLICO</p>
              <p>FECHA DE EMISIÓN: 27.06.2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Texto del Hero */}
            <div className="space-y-6 lg:col-span-7">
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-6xl">
                Control de Calidad
              </h1>
              <p className="border-l-2 border-[#b43024] pl-4 font-serif text-lg leading-relaxed text-[#444650] md:text-xl">
                La calidad no aparece al finalizar una prenda. Está presente
                desde el primer corte de tela hasta el momento en que un
                uniforme llega a las manos del cliente.
              </p>
              <div className="max-w-xl space-y-4 text-base leading-relaxed text-[#444650]">
                <p>
                  En Confecciones Liss entendemos que un uniforme representa la
                  imagen de una institución, una empresa o un profesional. Por
                  esa razón, cada prenda pasa por un proceso de revisión donde
                  verificamos medidas, costuras, acabados, materiales y
                  presentación antes de autorizar su entrega.
                </p>
                <p className="font-semibold text-[#143067]">
                  No creemos en inspeccionar únicamente el resultado final.
                  Creemos en controlar la calidad durante todo el proceso de
                  confección.
                </p>
              </div>
            </div>

            {/* Ilustración técnica (SVG Esquema de Sastrería/Cotas) */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative flex aspect-square w-full max-w-md flex-col justify-between overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb] p-6">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#143067 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                ></div>

                {/* SVG Blueprint */}
                <svg
                  className="h-auto w-full fill-none stroke-current stroke-1 text-[#143067]/40"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  {/* Grid Lines */}
                  <line x1="10" y1="10" x2="90" y2="10" strokeDasharray="2,2" />
                  <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2,2" />
                  <line x1="10" y1="90" x2="90" y2="90" strokeDasharray="2,2" />
                  <line x1="10" y1="10" x2="10" y2="90" strokeDasharray="2,2" />
                  <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2,2" />
                  <line x1="90" y1="10" x2="90" y2="90" strokeDasharray="2,2" />

                  {/* Garment Shape representation (Scrub top outline) */}
                  <path d="M 30,20 L 70,20 L 70,26 L 80,34 L 74,40 L 68,36 L 68,80 L 32,80 L 32,36 L 26,40 L 20,34 L 30,26 Z" />
                  <path d="M 44,20 C 44,26 56,26 56,20" />

                  {/* Dimension markers */}
                  <line
                    x1="16"
                    y1="34"
                    x2="16"
                    y2="80"
                    stroke="#b43024"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="14"
                    y1="34"
                    x2="18"
                    y2="34"
                    stroke="#b43024"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="14"
                    y1="80"
                    x2="18"
                    y2="80"
                    stroke="#b43024"
                    strokeWidth="0.5"
                  />

                  {/* Angle indicator */}
                  <path
                    d="M 70,26 L 66,32"
                    stroke="#b43024"
                    strokeWidth="0.5"
                    strokeDasharray="1,1"
                  />
                  <path
                    d="M 69,33 A 6 6 0 0 1 73,31"
                    stroke="#b43024"
                    strokeWidth="0.5"
                  />

                  {/* Micro text representation */}
                  <text
                    x="12"
                    y="58"
                    className="fill-[#b43024] stroke-none font-mono text-[3px]"
                  >
                    L_TOT
                  </text>
                  <text
                    x="73"
                    y="36"
                    className="fill-[#b43024] stroke-none font-mono text-[3px]"
                  >
                    45.0°
                  </text>
                  <text
                    x="50"
                    y="85"
                    className="text-anchor-middle fill-[#143067] stroke-none font-mono text-[3px]"
                    textAnchor="middle"
                  >
                    ANCHO BASAL: 58.0cm
                  </text>
                </svg>

                <div className="z-10 flex items-end justify-between border-t border-[#e1e2e5] pt-4 font-mono text-[10px] text-[#444650]">
                  <span>DIAGRAMA QA-01 // COTAS DE PATRÓN</span>
                  <span className="font-bold text-[#b43024]">100% OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. FILOSOFÍA: NUESTRA FILOSOFÍA DE CALIDAD (Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Eyebrow and Title */}
          <div className="space-y-4 lg:col-span-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#b43024] uppercase">
              Valores de Manufactura
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
              Nuestra filosofía de calidad
            </h2>
            <div className="h-1 w-12 rounded-full bg-[#143067]"></div>
          </div>

          {/* Large Quote and descriptive text */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-8">
            <div className="space-y-4 border-l-2 border-[#143067] pl-6">
              <p className="font-serif text-2xl leading-snug text-[#143067]">
                &ldquo;Nuestra prioridad no es producir más rápido. Nuestra
                prioridad es producir correctamente.&rdquo;
              </p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#444650]">
              <p>
                La calidad no depende de una sola persona. Es el resultado del
                compromiso de todo el equipo.
              </p>
              <p>
                Cada integrante del taller es responsable de revisar
                cuidadosamente su trabajo antes de entregar la prenda a la
                siguiente etapa del proceso.
              </p>
              <p>
                Esto permite detectar cualquier detalle oportunamente y mantener
                un estándar uniforme durante toda la producción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. LOS SEIS CONTROLES DE CALIDAD (Recorrido Asimétrico) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto mb-16 max-w-xl space-y-4 text-center md:mb-24">
            <span className="font-mono text-xs font-bold tracking-widest text-[#b43024] uppercase">
              Trazabilidad Técnica
            </span>
            <h2 className="font-serif text-3xl text-[#143067] md:text-4xl lg:text-5xl">
              Los seis controles que realiza cada uniforme
            </h2>
            <p className="font-sans text-sm leading-relaxed text-[#444650]">
              Cada uniforme que confeccionamos en nuestro taller físico del
              Barrio La Merced es sometido a un riguroso examen técnico dividido
              en seis etapas de tolerancia reducida.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {/* CONTROL 1: VERIFICACIÓN DE MEDIDAS (Split 50/50, Texto-Tabla / Foto) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#b43024] md:text-6xl">
                    01.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Verificación de medidas
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Antes de iniciar la confección verificamos las medidas
                    registradas para asegurar que cada pieza corresponda
                    exactamente a la talla solicitada.
                  </p>
                  <p>
                    Cada corte debe respetar las dimensiones establecidas para
                    evitar diferencias durante el ensamblaje.
                  </p>
                </div>

                {/* Tabla de cotas de muestra */}
                <div className="overflow-hidden rounded border border-[#e1e2e5]">
                  <table className="w-full text-left font-mono text-xs text-[#444650]">
                    <thead>
                      <tr className="border-b border-[#e1e2e5] bg-[#f8f9fb]">
                        <th className="p-3 font-bold text-[#143067]">
                          PUNTO DE MEDIDA
                        </th>
                        <th className="p-3 font-bold text-[#143067]">
                          TALLA M (std)
                        </th>
                        <th className="p-3 font-bold text-[#143067]">
                          TOLERANCIA
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e1e2e5]">
                      <tr>
                        <td className="p-3">01 // Ancho de hombros</td>
                        <td className="p-3">44.5 cm</td>
                        <td className="p-3 text-[#b43024]">± 0.2 cm</td>
                      </tr>
                      <tr>
                        <td className="p-3">02 // Contorno de pecho</td>
                        <td className="p-3">102.0 cm</td>
                        <td className="p-3 text-[#b43024]">± 0.5 cm</td>
                      </tr>
                      <tr>
                        <td className="p-3">03 // Largo total superior</td>
                        <td className="p-3">72.0 cm</td>
                        <td className="p-3 text-[#b43024]">± 0.4 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDql6RAV4sbPJQGYiXijV7KHGzjJUep7ygJh0aamJxp9_KY2wPDDgZuqgHyZ2hSX5FHdJ0_zeDOOcmveyy3URfYQuwBDOHHaeKJnJtwfHT8R4APNmQ4dC5IeR89-M-GRnMhKL3Mrmz4RIrW6UfXKZPfojqoPElzWRv7xPnZzlzYWzxpMNKA05CvKHF38tVCtOs7SaFpaAbA0baMp_63_ivw10zgiOvHS0bReDbkD2_GAibQocZlAk9zBix5wNco3k5Ph_kMGvT35cY"
                  alt="Verificación de medidas de patrones"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
            </motion.div>

            {/* CONTROL 2: INSPECCIÓN DEL CORTE (Split 40/60, Foto / Tolerancias Técnicas) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className="order-2 lg:order-1 lg:col-span-5">
                <div className="relative aspect-square w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb]">
                  <Image
                    src="/images/servicios/ropa-general.png"
                    alt="Inspección detallada del corte textil"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                  />
                </div>
              </div>

              <div className="order-1 space-y-6 lg:order-2 lg:col-span-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#b43024] md:text-6xl">
                    02.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Inspección del corte
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Cada pieza cortada es revisada para comprobar alineación,
                    orientación de la tela y precisión del patrón.
                  </p>
                  <p>
                    Un corte correcto garantiza que todas las piezas encajen
                    perfectamente durante la confección, evitando torsiones o
                    deformaciones tras los lavados.
                  </p>
                </div>

                {/* Lista técnica */}
                <div className="grid grid-cols-1 gap-4 border-t border-[#e1e2e5] pt-4 sm:grid-cols-2">
                  <div className="rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4">
                    <span className="mb-1 block font-mono text-[10px] font-bold tracking-wider text-[#b43024] uppercase">
                      MÉTODO
                    </span>
                    <h4 className="mb-1 font-serif text-sm font-bold text-[#143067]">
                      Alineación al Hilo
                    </h4>
                    <p className="text-xs text-[#444650]">
                      Verificación visual del sentido de la urdimbre de tela
                      Sincatex.
                    </p>
                  </div>
                  <div className="rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4">
                    <span className="mb-1 block font-mono text-[10px] font-bold tracking-wider text-[#b43024] uppercase">
                      DESVIACIÓN
                    </span>
                    <h4 className="mb-1 font-serif text-sm font-bold text-[#143067]">
                      Tolerancia Cero
                    </h4>
                    <p className="text-xs text-[#444650]">
                      Desviación máxima admisible menor a 1.5mm respecto al
                      patrón original.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CONTROL 3: REVISIÓN DE COSTURAS (Horizontal Bloque Oscuro - Diagrama Técnico) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 rounded bg-[#143067] p-8 text-white md:p-12 lg:grid-cols-12 lg:gap-12"
            >
              <div className="space-y-6 lg:col-span-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#b43024] md:text-6xl">
                    03.
                  </span>
                  <h3 className="font-serif text-2xl text-white md:text-3xl">
                    Revisión de costuras
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#dae2ff]">
                  <p>
                    Las costuras son inspeccionadas para comprobar resistencia,
                    continuidad, alineación y acabado.
                  </p>
                  <p>
                    También verificamos que no existan hilos sueltos, uniones
                    débiles o diferencias visibles entre piezas. Usamos hilo de
                    poliéster de alta tenacidad calibre 40/2 para resistir el
                    uso diario severo de médicos y estudiantes.
                  </p>
                </div>
              </div>

              {/* Diagrama SVG técnico de costura */}
              <div className="flex flex-col justify-between rounded border border-white/20 bg-white/5 p-6 lg:col-span-5">
                <div className="mb-4 flex justify-between font-mono text-[10px] tracking-wider text-[#dae2ff] uppercase">
                  <span>Esquema Técnico</span>
                  <span className="font-bold text-[#b43024]">
                    LOCKSTITCH 301
                  </span>
                </div>

                {/* SVG Seam Diagram */}
                <svg
                  className="my-2 h-auto w-full fill-none stroke-current stroke-1 text-white"
                  viewBox="0 0 100 40"
                  aria-hidden="true"
                >
                  {/* Fabric layer 1 */}
                  <path
                    d="M 10,15 L 90,15"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="4"
                  />
                  {/* Fabric layer 2 */}
                  <path
                    d="M 10,21 L 90,21"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="4"
                  />

                  {/* Needle thread (upper loop) */}
                  <path
                    d="M 15,10 C 15,15 20,23 25,18 C 30,13 35,15 35,10 C 35,15 40,23 45,18 C 50,13 55,15 55,10 C 55,15 60,23 65,18 C 70,13 75,15 75,10 C 75,15 80,23 85,18"
                    stroke="#b43024"
                    strokeWidth="1.5"
                  />

                  {/* Bobbin thread (lower loop interlocking) */}
                  <path
                    d="M 15,26 C 15,22 20,13 25,18 C 30,23 35,22 35,26 C 35,22 40,13 45,18 C 50,23 55,22 55,26 C 55,22 60,13 65,18 C 70,23 75,22 75,26 C 75,22 80,13 85,18"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />

                  {/* Interlock circles */}
                  <circle
                    cx="25"
                    cy="18"
                    r="1.5"
                    fill="#b43024"
                    stroke="none"
                  />
                  <circle
                    cx="45"
                    cy="18"
                    r="1.5"
                    fill="#b43024"
                    stroke="none"
                  />
                  <circle
                    cx="65"
                    cy="18"
                    r="1.5"
                    fill="#b43024"
                    stroke="none"
                  />
                  <circle
                    cx="85"
                    cy="18"
                    r="1.5"
                    fill="#b43024"
                    stroke="none"
                  />
                </svg>

                <p className="mt-4 font-mono text-[9px] leading-normal text-[#dae2ff]">
                  Puntadas por pulgada (SPI): 10-12 mínimo. Entrelazamiento
                  central perfecto sin fruncido.
                </p>
              </div>
            </motion.div>

            {/* CONTROL 4: CONTROL DEL BORDADO (Split 50/50, Blueprint / Foto) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className="space-y-6 lg:order-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#b43024] md:text-6xl">
                    04.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Control del bordado
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Cuando el uniforme incorpora logotipos o bordados
                    institucionales, revisamos cuidadosamente su posición,
                    tamaño, alineación y acabado para asegurar una presentación
                    profesional.
                  </p>
                  <p>
                    Se verifica el remate interno del hilo y la aplicación de
                    entretela fusible de soporte para evitar distorsiones en el
                    tejido durante los ciclos de lavado frecuentes.
                  </p>
                </div>

                {/* Especificación de posicionamiento */}
                <div className="space-y-2 rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4 font-mono text-xs text-[#444650]">
                  <p className="border-b border-[#e1e2e5] pb-2 font-bold tracking-wider text-[#143067] uppercase">
                    PARÁMETROS DE BORDADO
                  </p>
                  <p>· Centro: Alineado con el eje del bolsillo superior.</p>
                  <p>
                    · Altura: 7.5 cm ± 0.5 cm por debajo de la costura de
                    hombro.
                  </p>
                  <p>
                    · Tensión: Regulada para hilos de poliéster 120D/2
                    satinados.
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb] lg:order-1">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD6YmAqb_zdTS9DKq81gxmcNQo1DbwvhW0Hzx0Ug6Bpw2z5h0oX6HOvVncd_AyuAPhlSGNRjspP5eKzd0YrjawC1Zw5EZGdXCK4CzUAaXl_SCI3Xl0OLUWMFb1dIjHXKfAbr6dLdFCvviIwVei4lHZFkRHWv0Jpe2Wh0nnlPPfVR8fnMD7MFGLRWE_PcG0XUYqm9Ug69qoEd5pWrq5gn_wCbwu1Qnmq6T6ngDTkGFN-TerIsO0BbuTebPXct0Je4DKVjzFErMGvQ0"
                  alt="Control de calidad del bordado computarizado"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
            </motion.div>

            {/* CONTROL 5: ACABADOS FINALES (Clipboard Notepad) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className="space-y-6 lg:col-span-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#b43024] md:text-6xl">
                    05.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Acabados finales
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Antes de considerar terminada una prenda revisamos
                    nuevamente todos los detalles visibles.
                  </p>
                  <p>
                    Cada elemento contribuye a la percepción final de calidad.
                    Un uniforme no solo debe ser fuerte estructuralmente, sino
                    verse limpio, simétrico y profesional.
                  </p>
                </div>
              </div>

              {/* Clipboard QA Checklist */}
              <div className="relative rounded border border-[#e1e2e5] bg-white p-6 shadow-sm lg:col-span-7">
                {/* Clipboard Clip style decoration */}
                <div className="mx-auto -mt-8 mb-6 h-4 w-24 rounded-full border border-[#143067]/30 bg-[#143067]/20"></div>

                <h4 className="mb-4 border-b border-[#e1e2e5] pb-3 font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                  CHECKLIST DE INSPECCIÓN INTERNA
                </h4>

                <div className="space-y-4 font-sans text-sm text-[#444650]">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#b43024] select-none">
                      check_box
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Costuras estructurales
                      </strong>
                      <span>
                        Ausencia de hilos saltados, costura recta y overlock
                        parejo sin deformaciones.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#b43024] select-none">
                      check_box
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Terminaciones
                      </strong>
                      <span>
                        Remate limpio en puntas de cuello, mangas, bastillas y
                        ojales sin deshilachado.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#b43024] select-none">
                      check_box
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Limpieza del tejido
                      </strong>
                      <span>
                        Remoción completa de tiza de sastre, pelusas y cabos de
                        hilo sobrantes.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#b43024] select-none">
                      check_box
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Planchado y vaporizado
                      </strong>
                      <span>
                        Alineación perfecta de pliegues estructurales a alta
                        presión térmica.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#b43024] select-none">
                      check_box
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Presentación e insumos
                      </strong>
                      <span>
                        Botones cosidos firmemente, cierres YKK lubricados y
                        alineados correctamente.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#e1e2e5] pt-4 font-mono text-xs text-[#444650]">
                  <span>RESPONSABLE: René A. Méndez</span>
                  <span className="border-b border-[#e1e2e5] px-4 pb-1 italic">
                    R.Méndez
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CONTROL 6: PREPARACIÓN PARA ENTREGA (Split 60/40, Foto / Box) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className="relative order-2 aspect-[16/10] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb] lg:order-1 lg:col-span-7">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-G2wJz71AP5vwCDp3t359I7x2kSZWb9W7SHnNgNThWNfLM7fMGzA0y5M1GjR6pDnLljfIYHiihui8K68JiUD61l1KTSZN1A_Oo_XYoUlopyn2KmLs-ATCrchByg932AMdkhGYxkz2-QJc41OYMvs5KMFq3BuohZHD_x0PQnYgjNgxZmdeVpUJnQX1nbkXpev54ppZsOzALWst7M23heLgF9ER-lEwexccB4aD4cpnHF9CP4YW-nLRvjo2GTw9BzKMAp4XF9tpZeY"
                  alt="Preparación final y empaque de uniformes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>

              <div className="order-1 space-y-6 lg:order-2 lg:col-span-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#b43024] md:text-6xl">
                    06.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Preparación para entrega
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Antes de salir del taller cada uniforme recibe una revisión
                    final.
                  </p>
                  <p>
                    Posteriormente es organizado, preparado y empacado
                    individualmente para garantizar que llegue al cliente en las
                    mejores condiciones posibles, libre de polvo o arrugas del
                    transporte.
                  </p>
                </div>
                <div className="rounded-r border-l-4 border-[#b43024] bg-[#f8f9fb] p-4">
                  <p className="text-xs leading-relaxed text-[#444650]">
                    * Todos nuestros paquetes incluyen la etiqueta de inspección
                    firmada por el operario encargado del control de calidad.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 4. LO QUE NUNCA PERMITIMOS (Checklist Industrial Red) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="relative overflow-hidden rounded border-2 border-[#b43024] bg-white p-6 md:p-12">
          {/* Warning stamp decoration */}
          <div className="pointer-events-none absolute -top-8 -right-8 flex h-32 w-32 rotate-12 items-center justify-center rounded-full border-4 border-[#b43024]/10 select-none">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#b43024]/30 uppercase">
              TOLERANCIA CERO
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Title & Badge */}
            <div className="space-y-4 lg:col-span-4">
              <span className="inline-block rounded bg-[#b43024]/10 px-3 py-1 font-mono text-xs font-bold text-[#b43024] uppercase">
                Inspección Crítica
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
                Lo que nunca permitimos
              </h2>
              <p className="text-sm leading-relaxed text-[#444650]">
                Nuestros auditores tienen la instrucción obligatoria de
                descartar y retornar a costura cualquier prenda que presente al
                menos una de las siguientes fallas críticas.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">
              {[
                {
                  title: "Una costura abierta",
                  desc: "Cualquier salto de aguja en overlock o costura plana invalida el uniforme.",
                },
                {
                  title: "Un bordado desalineado",
                  desc: "El logotipo debe ubicarse exactamente sobre los márgenes rectos de la prenda.",
                },
                {
                  title: "Una talla incorrecta",
                  desc: "Se compara la prenda física contra la ficha anatómica del cliente.",
                },
                {
                  title: "Una prenda sin revisar",
                  desc: "Ningún uniforme sale del taller sin la firma física del inspector.",
                },
                {
                  title: "Una terminación descuidada",
                  desc: "Ojales fruncidos o botones flojos son causal directa de rechazo.",
                },
                {
                  title: "Una entrega sin inspección final",
                  desc: "El paquete completo se re-audita antes de asignarse a logística de envío.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4 transition-colors duration-300 hover:border-[#b43024]/40"
                >
                  <span className="material-symbols-outlined shrink-0 text-[#b43024] select-none">
                    cancel
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-[#143067]">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#444650]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 5. TRABAJO EN EQUIPO (Diagrama de Sinergia Interactivo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Story */}
            <div className="space-y-6 lg:col-span-5">
              <span className="font-mono text-xs font-bold tracking-widest text-[#b43024] uppercase">
                Flujo del Proceso
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
                La calidad es un trabajo en equipo
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#143067]"></div>
              <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                <p>
                  Cada integrante del taller participa en el control de calidad.
                  La confección, el bordado, la revisión, la toma de medidas y
                  la preparación de pedidos forman parte de un mismo proceso.
                </p>
                <p className="font-semibold text-[#143067]">
                  La calidad no depende únicamente de quien confecciona una
                  prenda. Es el resultado del trabajo coordinado de todas las
                  personas involucradas.
                </p>
              </div>
            </div>

            {/* Interactive Flow Chart Diagram */}
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4">
                <p className="mb-4 font-mono text-[10px] tracking-wider text-[#444650] uppercase">
                  HAGA CLIC EN CUALQUIER ESTACIÓN PARA VER DETALLE
                </p>

                {/* SVG Flow diagram */}
                <div className="flex flex-wrap gap-2 md:grid md:grid-cols-3 md:gap-3">
                  {teamRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setActiveRoleId(role.id)}
                      className={`rounded border p-3 text-left transition-all duration-300 ${
                        activeRoleId === role.id
                          ? "border-[#143067] bg-[#143067] text-white"
                          : "border-[#e1e2e5] bg-white text-[#143067] hover:bg-[#f8f9fb]"
                      }`}
                    >
                      <div className="mb-1 font-mono text-[9px] tracking-wider uppercase opacity-75">
                        {role.focus}
                      </div>
                      <div className="truncate font-serif text-sm font-bold">
                        {role.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic technical card based on selection */}
              <div className="relative min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 rounded border border-[#143067]/10 bg-[#143067]/5 p-6"
                  >
                    <div className="flex items-baseline justify-between gap-2 border-b border-[#143067]/10 pb-2">
                      <span className="font-mono text-xs font-bold tracking-wider text-[#b43024] uppercase">
                        ESTACIÓN: {activeRole.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#444650]">
                        RESPONSABLE: {activeRole.responsible}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#191c1e]">
                      {activeRole.description}
                    </p>
                    <div className="rounded border border-[#e1e2e5] bg-white p-2 font-mono text-[11px] text-[#143067]">
                      <strong>ESTÁNDAR TÉCNICO:</strong> {activeRole.spec}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 6. NUESTRO COMPROMISO (Declaración Firmada) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl rounded border border-[#e1e2e5] bg-white p-6 shadow-sm md:p-12">
          <div className="mb-8 space-y-2 border-b border-[#e1e2e5] pb-6 text-center">
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#b43024] uppercase">
              Compromiso Corporativo
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Lo que prometemos a cada cliente
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {[
              {
                num: "01",
                title: "Materiales Seleccionados",
                text: "Trabajar con materiales e hilos de alta tenacidad seleccionados rigurosamente para cada proyecto.",
              },
              {
                num: "02",
                title: "Respeto a Especificaciones",
                text: "Respetar minuciosamente los moldes, logos y colores institucionales acordados en la orden de compra.",
              },
              {
                num: "03",
                title: "Proceso Ordenado",
                text: "Mantener un taller limpio, estructurado y bajo un flujo de producción modular y supervisado.",
              },
              {
                num: "04",
                title: "Revisión Individual",
                text: "Revisar uno por uno cada uniforme antes de colocarlo en su empaque y autorizar el despacho.",
              },
              {
                num: "05",
                title: "Escucha Activa",
                text: "Escuchar al cliente en todo momento y realizar correcciones de entalle cuando sea técnicamente necesario.",
              },
              {
                num: "06",
                title: "Mejora Continua",
                text: "Implementar optimizaciones técnicas de costura y actualizar nuestras guías tras cada lote terminado.",
              },
            ].map((promise, index) => (
              <div key={index} className="flex gap-4">
                <span className="pt-1 font-mono text-xs font-bold text-[#b43024]">
                  {promise.num} {"//"}
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    {promise.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    {promise.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sello de Garantía y Firma */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#e1e2e5] pt-8 text-center sm:flex-row sm:text-left">
            <div className="space-y-1 font-mono text-xs text-[#444650]">
              <p className="font-bold text-[#143067]">
                TALLER CONFECCIONES LISS
              </p>
              <p>Barrio La Merced, San Miguel, El Salvador</p>
            </div>

            {/* Signature and Stamp */}
            <div className="flex items-center gap-4">
              <div className="pointer-events-none rotate-[-3deg] rounded border border-[#b43024] px-3 py-2 text-center font-mono text-[9px] tracking-wider text-[#b43024] select-none">
                <p className="mb-1 border-b border-[#b43024] pb-1 font-bold">
                  GARANTÍA DE AJUSTE
                </p>
                <p>100% ARTESANAL</p>
              </div>
              <div className="text-right font-mono text-xs">
                <p className="border-b border-[#e1e2e5] px-4 pb-1 italic">
                  Lisseth Molina
                </p>
                <p className="mt-1 text-[10px] text-[#444650]">
                  Dirección General
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 7. CIERRE (Conclusión del Estándar en Navy Full Bleed) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#143067] px-5 py-20 text-center text-white md:px-8 md:py-32">
        {/* Accent diagonal stripes representation (subtle background accent) */}
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl filter"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#b43024]/[0.05] blur-2xl filter"></div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <span className="font-mono text-xs font-bold tracking-widest text-[#b43024] uppercase">
            Inspección de Calidad
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-white md:text-5xl">
            La confianza también se confecciona.
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#b43024]"></div>

          <div className="space-y-6 font-serif text-lg leading-relaxed text-[#dae2ff]">
            <p>
              Cada uniforme que sale de nuestro taller representa el trabajo, la
              experiencia y el compromiso de todo un equipo.
            </p>
            <p>
              Por eso nuestro proceso de calidad no termina cuando una prenda
              está cosida. Termina únicamente cuando estamos convencidos de que
              cumple con el estándar que nosotros mismos esperamos entregar.
            </p>
            <p className="pt-4 font-sans text-sm font-bold tracking-wider text-white uppercase">
              Porque para Confecciones Liss la calidad no es una etapa del
              proceso. Es el proceso completo.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/contacto"
              className="inline-block rounded bg-[#b43024] px-8 py-3 font-mono text-xs tracking-wider text-white uppercase shadow-lg shadow-black/10 transition-colors hover:bg-[#b43024]/90"
            >
              Agendar toma de medidas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
