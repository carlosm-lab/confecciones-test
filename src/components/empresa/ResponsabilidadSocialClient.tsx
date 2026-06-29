"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ResponsabilidadSocialClient() {
  // Variantes de animación con "as const" en el ease para evitar problemas de tipos en Next.js/Framer Motion
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
      {/* PORTADA (Hero Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-4 pb-16 md:px-8 md:pt-6 md:pb-24">
        <div className="rounded border border-[#143067]/20 bg-white p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] md:p-12">
          {/* Metadata superior del informe */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-[#e1e2e5] pb-6 font-mono text-xs text-[#444650] md:flex-row md:items-center">
            <div className="space-y-1">
              <p className="font-semibold tracking-wider text-[#143067]">
                CONFECCIONES LISS — MEMORIA DE IMPACTO
              </p>
              <p>
                INFORME DE GESTIÓN SOCIAL:{" "}
                <span className="font-bold text-[#b43024]">
                  INFORME-RS-2026
                </span>
              </p>
            </div>
            <div className="space-y-1 text-left md:text-right">
              <p>CLASIFICACIÓN: ARCHIVO PÚBLICO</p>
              <p>ORIGEN: SAN MIGUEL, EL SALVADOR</p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Título de la Portada */}
            <div className="space-y-6 lg:col-span-6">
              <span className="font-mono text-xs font-bold tracking-widest text-[#b43024] uppercase">
                Compromiso Comunitario
              </span>
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-7xl">
                Responsabilidad Social
              </h1>
              <p className="border-l-2 border-[#b43024] pl-4 font-serif text-lg leading-relaxed text-[#444650] md:text-2xl">
                Crecer como empresa también significa generar oportunidades,
                compartir conocimiento y aportar al desarrollo de nuestra
                comunidad.
              </p>
            </div>

            {/* Texto introductorio */}
            <div className="space-y-6 text-base leading-relaxed text-[#444650] lg:col-span-6 lg:pt-14">
              <p>
                Desde nuestros inicios, Confecciones Liss ha sido una empresa
                familiar profundamente vinculada con las personas que la rodean.
                Nuestro compromiso social no nace de campañas publicitarias ni
                de proyectos temporales; nace de la manera en que trabajamos, de
                cómo construimos relaciones de confianza y de las oportunidades
                que generamos para quienes forman parte de nuestra historia.
              </p>
              <p className="font-serif text-lg text-[#143067] italic">
                &ldquo;Nuestro impacto comienza dentro del taller y se extiende
                hacia nuestros clientes, colaboradores y comunidad.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CAPÍTULO 1: UNA EMPRESA QUE NACIÓ EN LA COMUNIDAD */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Imagen Grayscale */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDql6RAV4sbPJQGYiXijV7KHGzjJUep7ygJh0aamJxp9_KY2wPDDgZuqgHyZ2hSX5FHdJ0_zeDOOcmveyy3URfYQuwBDOHHaeKJnJtwfHT8R4APNmQ4dC5IeR89-M-GRnMhKL3Mrmz4RIrW6UfXKZPfojqoPElzWRv7xPnZzlzYWzxpMNKA05CvKHF38tVCtOs7SaFpaAbA0baMp_63_ivw10zgiOvHS0bReDbkD2_GAibQocZlAk9zBix5wNco3k5Ph_kMGvT35cY"
                alt="Taller tradicional de costura y confección"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
            <span className="mt-2 block text-left font-mono text-[10px] text-[#444650]">
              FOTOGRAFÍA DOCUMENTAL: MESA DE TRABAJO E HILOS DE COSTURA
              INDUSTRIAL.
            </span>
          </div>

          {/* Texto del capítulo */}
          <div className="space-y-6 lg:col-span-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#b43024]">
                CAPÍTULO 01 //
              </span>
              <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                Una empresa que nació en la comunidad
              </h2>
            </div>
            <div className="h-1 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 text-base leading-relaxed text-[#444650]">
              <p>
                Nuestra historia comenzó en 2005 dentro de un hogar,
                confeccionando y reparando prendas para familiares. Poco a poco,
                vecinos del cantón comenzaron a confiar en nuestro trabajo y esa
                confianza permitió que el oficio creciera de forma completamente
                orgánica.
              </p>
              <p className="font-semibold text-[#143067]">
                Antes de existir como empresa ya existía un compromiso con las
                personas. Cada prenda entregada representaba una responsabilidad
                y una oportunidad para demostrar que el trabajo bien hecho
                genera relaciones duraderas.
              </p>
              <p>
                Ese vínculo con la comunidad continúa siendo parte fundamental
                de nuestra identidad actual en Barrio La Merced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CAPÍTULO 2: GENERANDO EMPLEO LOCAL (Línea de Tiempo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Header del capítulo */}
            <div className="sticky top-8 space-y-4 lg:col-span-4">
              <span className="font-mono text-xs font-bold text-[#b43024]">
                CAPÍTULO 02 //
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067]">
                Generando empleo local
              </h2>
              <h3 className="font-serif text-lg text-[#b43024] italic">
                Crecer significa crear oportunidades.
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-[#444650]">
                <p>
                  A medida que Confecciones Liss fue creciendo también surgió la
                  necesidad de incorporar nuevas personas al equipo.
                </p>
                <p>
                  Cada contratación respondió al aumento real de la demanda y
                  permitió fortalecer diferentes áreas del taller.
                </p>
                <p>
                  Nuestro crecimiento ha significado nuevas oportunidades
                  laborales para personas de San Miguel, fortaleciendo una
                  empresa construida con talento local.
                </p>
              </div>
            </div>

            {/* Timeline de Empleo */}
            <div className="ml-4 space-y-12 border-l border-[#143067]/20 pl-6 md:pl-12 lg:col-span-8">
              {/* Hito 2005 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  2005
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Una sola persona
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Nuestra fundadora operaba de manera individual desde casa,
                  realizando trabajos artesanales de costura a medida y
                  remiendos locales.
                </p>
              </div>

              {/* Hito 2021 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#b43024] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#b43024]">
                  2021
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Nacimiento oficial del taller
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Establecimiento formal de la empresa. Se realizan las primeras
                  contrataciones fijas para cubrir la confección de uniformes de
                  centros escolares cercanos. Incorporación progresiva de
                  modistas y costureras del sector.
                </p>
              </div>

              {/* Hito 2026 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  2026
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Equipo multidisciplinario integrado
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Consolidación de un equipo estructurado de especialistas en
                  confección, producción, control de calidad, logística,
                  estrategia digital e imagen institucional. Cero
                  subcontratación precarizada: todo el valor se genera
                  localmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CAPÍTULO 3: APOSTAMOS POR EL CONOCIMIENTO (Cuaderno Trabajo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="relative overflow-hidden rounded border border-[#e1e2e5] bg-white p-6 md:p-12">
          {/* Grid lines background style (Cuaderno de trabajo) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(#143067 1px, transparent 1px), linear-gradient(90deg, #143067 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Izquierda: Título y texto */}
            <div className="space-y-6 lg:col-span-5">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  CAPÍTULO 03 //
                </span>
                <h2 className="font-serif text-3xl leading-tight text-[#143067]">
                  Apostamos por el conocimiento
                </h2>
              </div>
              <div className="h-1 w-12 rounded-full bg-[#143067]"></div>

              <div className="space-y-4 text-sm leading-relaxed text-[#444650]">
                <p>Creemos que el aprendizaje nunca termina.</p>
                <p>
                  Nuestra evolución ha sido posible gracias a la experiencia
                  acumulada durante años de trabajo, al perfeccionamiento
                  constante de técnicas de confección y a la incorporación de
                  nuevos conocimientos en áreas como control de calidad, gestión
                  empresarial, análisis de mercado y transformación digital.
                </p>
                <p className="font-semibold text-[#143067]">
                  Cada nueva habilidad adquirida representa una mejora directa
                  para nuestros clientes y un crecimiento para nuestro personal.
                </p>
              </div>
            </div>

            {/* Derecha: Simulación de Cuaderno de Notas Técnicas */}
            <div className="space-y-6 rounded border border-[#e1e2e5] bg-[#f8f9fb] p-6 font-mono text-xs text-[#444650] lg:col-span-7">
              <div className="flex items-center justify-between border-b border-[#e1e2e5] pb-3">
                <span className="font-bold text-[#143067]">
                  HOJA DE REGISTRO TÉCNICO // CAPACITACIÓN
                </span>
                <span className="text-[#b43024]">REV-03</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-bold text-[#b43024]">
                    01 / CAPACITACIÓN EN MAQUINARIA INDUSTRIAL
                  </span>
                  <p className="pl-4 font-sans text-xs text-[#191c1e]">
                    Instrucción periódica sobre ajuste de tensiones de puntada y
                    enhebrado de máquinas overlock de alta velocidad para evitar
                    fruncido en costuras de gabardinas.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-[#b43024]">
                    02 / PROTOCOLOS DE TRAZABILIDAD DE LOTES
                  </span>
                  <p className="pl-4 font-sans text-xs text-[#191c1e]">
                    Estandarización de fichas de corte y códigos de control de
                    calidad asignados a cada lote de producción para identificar
                    operarios y materiales.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-[#b43024]">
                    03 / HIGIENE Y ERGONOMÍA EN EL TALLER
                  </span>
                  <p className="pl-4 font-sans text-xs text-[#191c1e]">
                    Adaptación ergonómica de mesas de corte e implementación de
                    descansos activos para el cuidado físico del personal de
                    costura.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#e1e2e5] pt-4 text-[10px]">
                <span>TALLER CONFECCIONES LISS</span>
                <span className="font-bold text-[#143067]">
                  DOCUMENTACIÓN ACTIVA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CAPÍTULO 4: DIGITALIZAR TAMBIÉN ES SERVIR (Plano Digital) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Mockup de plano digital (SVG) */}
            <div className="order-2 flex justify-center lg:order-1 lg:col-span-6">
              <div className="relative flex aspect-square w-full max-w-md flex-col justify-between overflow-hidden rounded bg-[#143067] p-6">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                ></div>

                <div className="mb-2 flex justify-between font-mono text-[9px] tracking-wider text-[#dae2ff] uppercase">
                  <span>Esquema de Interfaz</span>
                  <span className="font-bold text-[#b43024]">
                    ONLINE ECOSYSTEM
                  </span>
                </div>

                {/* SVG Blueprint de interfaz */}
                <svg
                  className="my-4 h-auto w-full fill-none stroke-current stroke-[0.8] text-[#dae2ff]/40"
                  viewBox="0 0 100 60"
                  aria-hidden="true"
                >
                  {/* Browser frame */}
                  <rect x="5" y="5" width="90" height="50" rx="2" />
                  <line x1="5" y1="12" x2="95" y2="12" />

                  {/* Dots representing browser buttons */}
                  <circle cx="9" cy="8" r="1.2" />
                  <circle cx="13" cy="8" r="1.2" />
                  <circle cx="17" cy="8" r="1.2" />

                  {/* Layout grid lines */}
                  <rect x="10" y="16" width="30" height="32" />
                  <rect x="45" y="16" width="45" height="14" />
                  <rect x="45" y="34" width="45" height="14" />

                  {/* Micro lines (representing text) */}
                  <line x1="49" y1="20" x2="81" y2="20" strokeWidth="0.5" />
                  <line x1="49" y1="24" x2="73" y2="24" strokeWidth="0.5" />

                  <line x1="49" y1="38" x2="81" y2="38" strokeWidth="0.5" />
                  <line x1="49" y1="42" x2="65" y2="42" strokeWidth="0.5" />
                </svg>

                <div className="z-10 flex items-end justify-between border-t border-white/20 pt-4 font-mono text-[9px] text-[#dae2ff]">
                  <span>SISTEMA WEB LISS v1.4</span>
                  <span className="font-bold text-white">100% RESPONSIVE</span>
                </div>
              </div>
            </div>

            {/* Texto descriptivo */}
            <div className="order-1 space-y-6 lg:order-2 lg:col-span-6">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#b43024]">
                  CAPÍTULO 04 //
                </span>
                <h2 className="font-serif text-3xl leading-tight text-[#143067]">
                  Digitalizar también es servir
                </h2>
              </div>
              <div className="h-1 w-12 rounded-full bg-[#143067]"></div>

              <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                <p>
                  La incorporación del área digital en 2026 permitió que más
                  personas pudieran conocer nuestro trabajo sin importar dónde
                  se encontraran.
                </p>
                <p>
                  La creación del sitio web, la organización del ecosistema
                  digital y el desarrollo de nuevas estrategias de comunicación
                  facilitaron el acceso a información clara, cotizaciones,
                  productos y canales de contacto directo.
                </p>
                <p className="font-semibold text-[#143067]">
                  Entendemos la transformación digital como una herramienta de
                  responsabilidad social para brindar un mejor servicio, mayor
                  transparencia en costos y facilitar la comunicación directa
                  con nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CAPÍTULO 5: NUESTRO COMPROMISO DIARIO (Doble Página Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="rounded border border-[#e1e2e5] bg-white p-6 shadow-sm md:p-12">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Página Izquierda (Título y Manifiesto) */}
            <div className="space-y-6 lg:col-span-5 lg:border-r lg:border-[#e1e2e5] lg:pr-12">
              <span className="font-mono text-xs font-bold text-[#b43024]">
                CAPÍTULO 05 //
              </span>
              <h2 className="font-serif text-4xl leading-tight text-[#143067]">
                Nuestro compromiso diario
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#143067]"></div>
              <p className="text-base leading-relaxed text-[#444650]">
                Nuestra responsabilidad social no es un proyecto independiente
                ni una campaña de mercadeo. Es la forma en que decidimos
                trabajar todos los días en el taller de San Miguel.
              </p>
              <div className="border-t border-[#e1e2e5] pt-6 font-mono text-xs text-[#444650]">
                <span>REV-05 / COMPROMISOS</span>
              </div>
            </div>

            {/* Página Derecha (Compromisos listados con aire) */}
            <div className="space-y-8 font-sans text-sm text-[#444650] lg:col-span-7 lg:pl-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    01 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Trabajar con honestidad
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Precios justos, cotizaciones transparentes y comunicación
                    sincera sobre plazos.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    02 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Cumplir los compromisos
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Respeto absoluto a los contratos y especificaciones
                    acordadas en cada pedido.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    03 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Respetar el tiempo
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Planificación rigurosa de la producción para garantizar
                    entregas puntuales.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    04 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Generar confianza
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Firmeza en la calidad que permita relaciones comerciales
                    duraderas a largo plazo.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    05 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Ambiente de respeto
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Entorno seguro, limpio y digno para el desarrollo físico y
                    profesional del taller.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    06 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Mejora continua
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Adopción constante de mejores técnicas para perfeccionar la
                    durabilidad textil.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    07 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Valorar el trabajo artesanal
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Honrar la tradición sastrera y el cuidado del detalle frente
                    al descarte masivo.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#b43024]">
                    08 //
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Representar a San Miguel
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Confeccionar uniformes que representen con orgullo a la
                    comunidad en todo el país.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CAPÍTULO 6: IMPACTO QUE BUSCAMOS DEJAR (Navy Contraste) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="bg-[#143067] px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <span className="block font-mono text-xs font-bold text-[#b43024]">
              CAPÍTULO 06 //
            </span>
            <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl">
              Impacto que buscamos dejar
            </h2>
            <div className="h-1 w-12 rounded-full bg-white/40"></div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-[#dae2ff] lg:col-span-7">
            <p>
              Nuestro objetivo nunca ha sido ser únicamente un taller de
              confección. Queremos construir una empresa que permanezca en el
              tiempo, que genere empleo digno, que impulse el desarrollo
              profesional de quienes forman parte del equipo y que represente
              con orgullo el trabajo realizado en San Miguel.
            </p>
            <p className="font-serif text-xl leading-relaxed text-white italic">
              &ldquo;Cada uniforme confeccionado lleva consigo la experiencia de
              muchas manos, pero también el compromiso de una empresa que
              entiende que crecer implica asumir mayores responsabilidades con
              las personas.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CIERRE */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#e1e2e5] bg-[#f8f9fb] px-5 py-20 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl space-y-8">
          <span className="font-mono text-xs font-bold tracking-widest text-[#b43024] uppercase">
            Compromiso a Futuro
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-[#143067] md:text-5xl">
            El éxito también se mide por el impacto que dejamos.
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#b43024]"></div>

          <div className="space-y-6 font-sans text-base leading-relaxed text-[#444650]">
            <p>
              Seguiremos creciendo sin perder aquello que dio origen a
              Confecciones Liss: el trabajo honesto, la confianza de nuestros
              clientes y el compromiso de construir oportunidades a través de la
              confección.
            </p>
            <p className="font-serif text-lg font-semibold text-[#143067] italic">
              Nuestra responsabilidad social no es un proyecto independiente. Es
              la forma en que decidimos trabajar todos los días.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/contacto"
              className="inline-block rounded bg-[#b43024] px-8 py-3 font-mono text-xs tracking-wider text-white uppercase shadow-lg shadow-black/10 transition-colors hover:bg-[#b43024]/90"
            >
              Contactar al Taller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
