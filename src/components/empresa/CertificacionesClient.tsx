"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CertificacionesClient() {
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
      {/* 1. HERO: CENTRO DE CREDENCIALES (Ficha de Expediente) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-4 pb-16 md:px-8 md:pt-6 md:pb-24">
        <div className="border-primary/35 rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          {/* Metadata superior del expediente */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-[#e1e2e5] pb-6 font-mono text-xs text-[#444650] md:flex-row md:items-center">
            <div className="space-y-1">
              <p className="font-semibold tracking-wider text-[#143067]">
                CONFECCIONES LISS — EXPEDIENTE DE MARCA
              </p>
              <p>
                ID ARCHIVO:{" "}
                <span className="font-bold text-[#143067]">
                  DOC-REF-CERT-2026
                </span>
              </p>
            </div>
            <div className="space-y-1 text-left md:text-right">
              <p>ESTADO: ACTUALIZADO / VIGENTE</p>
              <p>PÁGINAS: 04 SECCIONES CLAVE</p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Texto del Hero */}
            <div className="space-y-6 lg:col-span-7">
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-6xl">
                Credenciales y Certificaciones
              </h1>
              <p className="border-l-2 border-[#143067] pl-4 font-serif text-lg leading-relaxed text-[#444650] md:text-xl">
                La confianza se construye con hechos, experiencia y formación
                comprobable.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-[#444650]">
                En Confecciones Liss creemos que la calidad comienza con el
                conocimiento. Nuestra experiencia se ha construido durante más
                de dos décadas de trabajo continuo, capacitación permanente y
                especialización en confección de uniformes. Esta página reúne
                las principales credenciales que respaldan nuestro trabajo y
                reflejan el compromiso de mejorar continuamente.
              </p>
            </div>

            {/* Ilustración de Archivador Técnico (SVG Blueprint) */}
            <div className="flex justify-center lg:col-span-5">
              <div className="border-primary/35 relative flex aspect-[4/3] w-full max-w-md flex-col justify-between overflow-hidden rounded border bg-[#f8f9fb] p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#143067 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                ></div>

                {/* SVG Folder representational */}
                <svg
                  className="h-auto w-full fill-none stroke-current stroke-1 text-[#143067]/30"
                  viewBox="0 0 100 70"
                  aria-hidden="true"
                >
                  {/* Folder Back Tab */}
                  <path d="M 10,15 L 40,15 L 45,20 L 90,20 L 90,60 L 10,60 Z" />

                  {/* Document Sheets slipping out */}
                  <rect
                    x="18"
                    y="8"
                    width="64"
                    height="42"
                    rx="1"
                    className="fill-white text-[#143067]/10"
                  />
                  <rect
                    x="22"
                    y="11"
                    width="60"
                    height="38"
                    rx="1"
                    className="fill-white text-[#143067]/15"
                  />

                  {/* Lines representing certificate text */}
                  <line
                    x1="28"
                    y1="18"
                    x2="76"
                    y2="18"
                    strokeDasharray="1,1"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="28"
                    y1="24"
                    x2="76"
                    y2="24"
                    strokeDasharray="1,1"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="28"
                    y1="30"
                    x2="60"
                    y2="30"
                    strokeDasharray="1,1"
                    strokeWidth="0.5"
                  />

                  {/* Seal circle on certificate */}
                  <circle
                    cx="70"
                    cy="38"
                    r="5"
                    className="text-[#143067]/40"
                    strokeWidth="0.5"
                  />

                  {/* Folder Front Tab */}
                  <path
                    d="M 10,23 L 38,23 L 42,28 L 90,28 L 90,62 L 10,62 Z"
                    className="fill-white/80"
                  />
                </svg>

                <div className="z-10 flex items-end justify-between border-t border-[#e1e2e5] pt-4 font-mono text-[9px] text-[#444650]">
                  <span>EXPEDIENTE CL-2026 // ACREDITACIONES</span>
                  <span className="font-bold text-[#143067]">VERIFICADO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. NUESTRA MAYOR CERTIFICACIÓN ES LA EXPERIENCIA */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Números Grandes */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            <div className="border-primary/35 flex flex-col justify-between rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-serif text-5xl font-bold text-[#143067]">
                20+ Años
              </span>
              <span className="mt-2 block font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                Oficio Acumulado
              </span>
              <p className="mt-1 text-xs text-[#444650]">
                Trayectoria de costura fina y patronaje.
              </p>
            </div>
            <div className="border-primary/35 flex flex-col justify-between rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-serif text-5xl font-bold text-[#143067]">
                2021
              </span>
              <span className="mt-2 block font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                Fundación Oficial
              </span>
              <p className="mt-1 text-xs text-[#444650]">
                Apertura del taller en Barrio La Merced.
              </p>
            </div>
            <div className="border-primary/35 flex flex-col justify-between rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-serif text-5xl font-bold text-[#143067]">
                3 Áreas
              </span>
              <span className="mt-2 block font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                Especialización
              </span>
              <p className="mt-1 text-xs text-[#444650]">
                Uniformes médicos, escolares y de gala.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Editorial */}
          <div className="space-y-6 lg:col-span-7">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Respaldo Real
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
              Nuestra mayor certificación es la experiencia
            </h2>
            <div className="h-1 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 text-base leading-relaxed text-[#444650]">
              <p className="font-serif text-xl leading-relaxed text-[#143067] italic">
                &ldquo;Antes de hablar de diplomas o constancias, hablamos de
                trayectoria.&rdquo;
              </p>
              <p>
                Nuestra experiencia comenzó en 2005 confeccionando prendas desde
                casa y, desde entonces, cada proyecto ha representado una
                oportunidad para perfeccionar técnicas, conocer nuevos procesos
                y elevar nuestros estándares.
              </p>
              <p>
                Hoy esa experiencia acumulada forma parte de cada uniforme que
                fabricamos en la zona oriental de El Salvador.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. FORMACIÓN TÉCNICA DE LA FUNDADORA (Ficha Profesional) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-12 md:mb-16">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Liderazgo Técnico
            </span>
            <h2 className="mt-2 font-serif text-3xl text-[#143067] md:text-4xl">
              Formación técnica de la fundadora
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-[#143067]"></div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Foto Placeholder (Ficha Identidad) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb] p-8 text-center lg:col-span-4">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "radial-gradient(#143067 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>

              <div className="relative z-10 space-y-4">
                {/* Monograma de alta costura */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#143067] font-serif text-3xl font-bold text-white shadow-md">
                  LM
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#143067]">
                    Lisseth Molina
                  </h3>
                  <p className="font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                    Directora General y Fundadora
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-8 space-y-1 border-t border-[#e1e2e5] pt-8 text-left font-mono text-xs text-[#444650]">
                <p>REGISTRO: CON-LISS-01</p>
                <p>CARGO: DIRECTORA TÉCNICA DE CORTE</p>
                <p>SINDICATO: EL SALVADOR TEXTIL</p>
              </div>
            </div>

            {/* Listado de Acreditaciones Técnicas */}
            <div className="flex flex-col justify-between rounded border border-[#e1e2e5] p-6 md:p-8 lg:col-span-8">
              <div className="space-y-6">
                <h4 className="border-b border-[#e1e2e5] pb-3 font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                  ACREDITACIONES Y COMPETENCIAS COMPROBADAS
                </h4>

                <div className="space-y-4 font-sans text-sm text-[#444650]">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Técnico Certificado en Corte y Confección
                      </strong>
                      <span>
                        Acreditación en sistemas de patronaje industrial,
                        escalado de tallas y corte.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Especialista en Confección de Uniformes
                      </strong>
                      <span>
                        Experiencia comprobada en costura lineal y estructurada
                        de uniformes institucionales y escolares.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Manejo de Maquinaria Industrial
                      </strong>
                      <span>
                        Operación de máquinas planas de alta velocidad,
                        overlocks de 5 hilos y bordadoras automáticas.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Confección de Indumentaria Médica
                      </strong>
                      <span>
                        Patronaje anatómico para scrubs médicos, batas de
                        laboratorio clínico y gorros quirúrgicos.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Producción Institucional de Gran Volumen
                      </strong>
                      <span>
                        Planificación y balance de líneas de producción modular
                        para pedidos masivos de centros educativos.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e1e2e5] pt-4 font-mono text-[10px] text-[#444650]">
                <span>
                  * CERTIFICADOS ESCANEADOS DISPONIBLES BAJO SOLICITUD COMERCIAL
                </span>
                <span className="font-bold tracking-wider text-[#143067] uppercase">
                  Acreditaciones Vigentes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 4. ESPECIALIZACIÓN DEL EQUIPO (Organigrama Técnico) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto mb-12 max-w-xl space-y-4 text-center md:mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Estructura Operativa
          </span>
          <h2 className="font-serif text-3xl text-[#143067] md:text-4xl">
            Especialización del equipo
          </h2>
          <p className="text-sm leading-relaxed text-[#444650]">
            Cada integrante del equipo aporta conocimientos específicos dentro
            del proceso de producción. No operamos como una maquila masiva
            indiferenciada, sino como un taller de artesanos especializados.
          </p>
        </div>

        {/* Organigrama Técnico Asimétrico */}
        <div className="space-y-8">
          {/* Nivel 1: Dirección */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded border-2 border-[#143067] bg-white p-6 text-center">
              <span className="mb-1 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                DIRECCIÓN GENERAL / CALIDAD
              </span>
              <h3 className="font-serif text-lg font-bold text-[#143067]">
                Lisseth Molina
              </h3>
              <p className="mt-1 font-sans text-xs text-[#444650]">
                Patronaje, corte general y auditoría final de uniformes.
              </p>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="mx-auto hidden h-8 w-px bg-[#143067]/30 md:block"></div>

          {/* Nivel 2: Producción & Operaciones */}
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {/* Rama A: Confección Especializada */}
            <div className="border-primary/35 hover:border-primary/55 flex flex-col justify-between rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-colors duration-300">
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                  CONFECCIÓN Y ENSAMBLADO
                </span>
                <h3 className="mb-2 font-serif text-base font-bold text-[#143067]">
                  Lilian Romero / Nubia Vázquez / Blanca Martínez
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Operación de remalladoras y costura de precisión para prendas
                  médicas, escolares e institucionales.
                </p>
              </div>
              <div className="mt-4 border-t border-[#e1e2e5] pt-4 font-mono text-[9px] text-[#444650]">
                Especialidad: Confección en serie con costura de seguridad.
              </div>
            </div>

            {/* Rama B: Calidad & Logística */}
            <div className="border-primary/35 hover:border-primary/55 flex flex-col justify-between rounded border bg-[#143067]/5 p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-colors duration-300">
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                  CALIDAD, MEDIDAS Y LOGÍSTICA
                </span>
                <h3 className="mb-2 font-serif text-base font-bold text-[#143067]">
                  René Alfonso Méndez / Carlos Antonio Molina
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Toma física de 12 cotas anatómicas, inspección de costura bajo
                  lupa y coordinación de envíos nacionales.
                </p>
              </div>
              <div className="mt-4 border-t border-[#e1e2e5] pt-4 font-mono text-[9px] text-[#143067]">
                Especialidad: Ajuste perfecto anatómico e inspección
                post-lavado.
              </div>
            </div>

            {/* Rama C: Estrategia & Imagen */}
            <div className="border-primary/35 hover:border-primary/55 flex flex-col justify-between rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-colors duration-300">
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                  TECNOLOGÍA E IMAGEN
                </span>
                <h3 className="mb-2 font-serif text-base font-bold text-[#143067]">
                  Carlos José Molina / Jackeline / Liam
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Dirección de sistemas informáticos, SEO, automatización de
                  base de datos e imagen institucional en catálogos.
                </p>
              </div>
              <div className="mt-4 border-t border-[#e1e2e5] pt-4 font-mono text-[9px] text-[#444650]">
                Especialidad: Desarrollo web, catalogación y control digital de
                lotes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 5. CAPACITACIÓN CONTINUA (Biblioteca / Archivador) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Texto descriptivo */}
            <div className="space-y-6 lg:col-span-5">
              <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                Evolución Profesional
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
                Capacitación continua
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#143067]"></div>
              <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                <p>
                  La industria textil evoluciona constantemente y nuestro
                  compromiso es seguir aprendiendo.
                </p>
                <p>
                  Por ello mantenemos una filosofía de mejora continua mediante
                  capacitación, investigación de nuevos materiales,
                  actualización de procesos y adopción de mejores prácticas en
                  confección y control de calidad.
                </p>
              </div>
            </div>

            {/* Archivador de carpetas / diplomas */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              <div className="space-y-3 rounded border border-[#e1e2e5] bg-[#f8f9fb] p-6">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-[#143067] uppercase">
                    MÓDULO COMPLETADO
                  </span>
                  <span className="material-symbols-outlined text-[#143067]">
                    folder_open
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#143067]">
                  Fibras Técnicas y Repelencia
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Investigación aplicada a textiles antifluidos de tecnología
                  Sincatex y poliéster microfibra.
                </p>
                <div className="flex justify-between border-t border-[#e1e2e5] pt-2 font-mono text-[10px] text-[#444650]">
                  <span>Vigencia: Permanente</span>
                  <span>Lote: TX-2025</span>
                </div>
              </div>

              <div className="space-y-3 rounded border border-[#e1e2e5] bg-[#f8f9fb] p-6">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-[#143067] uppercase">
                    MÓDULO COMPLETADO
                  </span>
                  <span className="material-symbols-outlined text-[#143067]">
                    folder_open
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#143067]">
                  Ergonomía Médica Textil
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Adaptación de holguras anatómicas para prendas que requieren
                  movilidad de 12 horas.
                </p>
                <div className="flex justify-between border-t border-[#e1e2e5] pt-2 font-mono text-[10px] text-[#444650]">
                  <span>Vigencia: Permanente</span>
                  <span>Lote: ER-2026</span>
                </div>
              </div>

              {/* Slot disponible / Futuras constancias */}
              <div className="flex min-h-[140px] flex-col justify-between space-y-3 rounded border border-dashed border-[#e1e2e5] bg-white p-6">
                <div className="flex items-start justify-between text-[#444650]/40">
                  <span className="font-mono text-[9px] tracking-wider uppercase">
                    SLOT RESERVADO
                  </span>
                  <span className="material-symbols-outlined text-xs">add</span>
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#444650]/60">
                    [ Slot disponible para futura constancia ]
                  </h3>
                  <p className="mt-1 text-[11px] text-[#444650]/40">
                    Capacitación programada para el segundo semestre de 2026.
                  </p>
                </div>
              </div>

              {/* Slot disponible / Futuras constancias 2 */}
              <div className="flex min-h-[140px] flex-col justify-between space-y-3 rounded border border-dashed border-[#e1e2e5] bg-white p-6">
                <div className="flex items-start justify-between text-[#444650]/40">
                  <span className="font-mono text-[9px] tracking-wider uppercase">
                    SLOT RESERVADO
                  </span>
                  <span className="material-symbols-outlined text-xs">add</span>
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#444650]/60">
                    [ Acreditación en curso ]
                  </h3>
                  <p className="mt-1 text-[11px] text-[#444650]/40">
                    Estudios de resistencia textil ante lavado industrial
                    severo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 6. EXPERIENCIA COMPROBABLE (Línea de Tiempo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto mb-16 max-w-xl space-y-4 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Línea Histórica
          </span>
          <h2 className="font-serif text-3xl text-[#143067] md:text-4xl">
            Experiencia comprobable
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#143067]"></div>
        </div>

        {/* Timeline Vertical */}
        <div className="relative ml-4 space-y-12 border-l-2 border-[#143067]/20 md:ml-32">
          {/* Hito 1: 2005 */}
          <div className="relative pl-8 md:pl-12">
            {/* Dot indicator */}
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            {/* Year Label left (visible only on desktop) */}
            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2005
            </div>

            <div className="space-y-2 rounded border border-[#e1e2e5] bg-white p-6">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2005 — Inicio del oficio
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Inicio del oficio de confección
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                Nuestra fundadora inicia un pequeño taller familiar desde el
                hogar. Desarrollo de habilidades iniciales de costura, remiendos
                y corte anatómico a baja escala en San Miguel.
              </p>
              <ul className="list-inside list-disc font-mono text-xs font-bold text-[#143067]">
                <li>Proyecto de confección familiar</li>
                <li>Crecimiento de clientela por recomendación boca a boca</li>
              </ul>
            </div>
          </div>

          {/* Hito 2: 2012 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2012
            </div>

            <div className="space-y-2 rounded border border-[#e1e2e5] bg-white p-6">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2012 — Costura Industrial
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Confección institucional y experiencia en maquilas
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                El taller se encarga de confeccionar uniformes escolares a gran
                volumen (Centro Escolar Profesor Jorge Salomón Granados).
                Colaboraciones técnicas con maquilas industriales locales
                permiten estandarizar procesos y capacitar personal.
              </p>
            </div>
          </div>

          {/* Hito 3: 2021 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2021
            </div>

            <div className="space-y-2 rounded border border-[#143067]/40 bg-white p-6">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2021 — Fundación Oficial
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Nacimiento oficial de Confecciones Liss
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                Apertura formal de nuestras instalaciones físicas en Barrio La
                Merced, San Miguel. Adquisición de maquinaria industrial plana,
                overlock e inversión inicial de $2,000 en insumos base.
                Contratación de operarias especializadas.
              </p>
            </div>
          </div>

          {/* Hito 4: 2026 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2026
            </div>

            <div className="space-y-2 rounded border border-[#e1e2e5] bg-white p-6">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2026 — Transformación Digital
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Ecosistema Digital y Expansión Online
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                Implementación de la infraestructura digital del taller.
                Integración de bases de datos anatómicas de clientes, SEO
                técnico avanzado y lanzamiento del catálogo interactivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 7. DOCUMENTACIÓN INSTITUCIONAL (Expedientes con Frame) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-12 md:mb-16">
            <span className="font-mono text-xs font-bold font-semibold tracking-widest text-[#143067] uppercase">
              Archivo Documental
            </span>
            <h2 className="mt-2 font-serif text-3xl text-[#143067] md:text-4xl">
              Documentación institucional
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-[#143067]"></div>
          </div>

          {/* Rejilla de Documentos placeholder elegantes */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "01",
                name: "Constancia de Registro Comercial",
                format: "PDF / 1.4 MB",
                desc: "Inscripción fiscal oficial de Confecciones Liss ante las autoridades salvadoreñas.",
              },
              {
                id: "02",
                name: "Diplomas Técnicos de Sastrería",
                format: "PNG / 3.8 MB",
                desc: "Acreditaciones técnicas de patronaje y corte de la Directora General.",
              },
              {
                id: "03",
                name: "Reconocimientos de Centros Escolares",
                format: "PDF / 2.1 MB",
                desc: "Notas de satisfacción y cumplimiento emitidas por directores educativos.",
              },
              {
                id: "04",
                name: "Certificados de Proveedores de Hilos",
                format: "PDF / 850 KB",
                desc: "Fichas técnicas que certifican la tenacidad y solidez del hilo calibre 40/2.",
              },
              {
                id: "05",
                name: "Fotografías de Estaciones de Taller",
                format: "ZIP / 45 MB",
                desc: "Archivo fotográfico oficial de las mesas de corte y bordadoras computarizadas.",
              },
              {
                id: "06",
                name: "Garantías y Políticas Vigentes",
                format: "PDF / 920 KB",
                desc: "Documentación oficial de los términos de confección por talla y a la medida.",
              },
            ].map((doc) => (
              <div
                key={doc.id}
                className="flex min-h-[200px] flex-col justify-between rounded border border-[#e1e2e5] bg-[#f8f9fb] p-6 transition-all duration-300 hover:border-[#143067]/40"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-[#444650]/60">
                    <span>REF: REG-DOC-{doc.id}</span>
                    <span className="font-bold text-[#143067]">
                      {doc.format}
                    </span>
                  </div>

                  {/* SVG Document Icon */}
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
                    <h3 className="font-serif text-base leading-tight font-bold text-[#143067]">
                      {doc.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    {doc.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#e1e2e5] pt-4 font-mono text-[10px] text-[#143067]">
                  <span>DISPONIBLE PRÓXIMAMENTE</span>
                  <span className="material-symbols-outlined text-xs select-none">
                    lock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 8. NUESTRO COMPROMISO CON LA MEJORA CONTINUA (Manifiesto) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-t border-b border-[#143067]/20 py-8 text-center">
          <p className="mb-4 font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Filosofía de Acreditación
          </p>
          <div className="mx-auto max-w-3xl space-y-4">
            <h3 className="font-serif text-2xl leading-snug text-[#143067] md:text-3xl">
              &ldquo;Las certificaciones representan un momento específico. La
              mejora continua representa una decisión permanente.&rdquo;
            </h3>
            <p className="text-sm leading-relaxed text-[#444650]">
              Nuestro objetivo no es acumular diplomas, sino transformar cada
              nuevo conocimiento en mejores procesos, mejores acabados y una
              mejor experiencia para nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 9. CIERRE: LA CONFIANZA TAMBIÉN SE DOCUMENTA */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#143067] px-5 py-20 text-center text-white md:px-8 md:py-32">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl filter"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#143067]/[0.05] blur-2xl filter"></div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Respaldo Técnico
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-white md:text-5xl">
            La confianza también se documenta.
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#143067]"></div>

          <div className="space-y-6 font-serif text-lg leading-relaxed text-[#dae2ff]">
            <p>
              Cada proyecto realizado, cada capacitación recibida y cada nueva
              habilidad incorporada fortalecen el compromiso que asumimos con
              nuestros clientes.
            </p>
            <p className="font-sans text-sm font-bold tracking-wider text-white uppercase">
              Seguiremos aprendiendo, perfeccionando procesos y ampliando
              nuestras capacidades para ofrecer uniformes que representen con
              orgullo a quienes los utilizan.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
            >
              Contactar con el Taller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
