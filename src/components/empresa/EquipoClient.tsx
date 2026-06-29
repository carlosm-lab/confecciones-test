"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { teamData, TeamMember } from "@/data/team";

export default function EquipoClient() {
  const founder = teamData.find((m) => m.slug === "lisseth-molina")!;
  const production = teamData.filter(
    (m) => m.layer === "produccion" && m.slug !== "lisseth-molina"
  );
  const quality = teamData.find((m) => m.layer === "calidad")!;
  const logistics = teamData.find((m) => m.layer === "logistica")!;
  const strategy = teamData.find((m) => m.layer === "estrategica")!;
  const models = teamData.filter((m) => m.layer === "imagen");

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  const cardHover = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#f8f9fb] text-[#191c1e] antialiased selection:bg-[#d7dffc] selection:text-[#143067]">
      {/* 1. CABECERA EDITORIAL */}
      <section className="relative px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-4"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#b43024] uppercase">
              El Corazón del Taller
            </span>
            <h1 className="font-serif text-5xl leading-tight font-bold text-[#143067] md:text-7xl">
              Nuestro equipo
            </h1>
            <p className="mx-auto max-w-[32ch] font-serif text-xl leading-relaxed text-[#444650] italic md:text-2xl">
              Detrás de cada uniforme hay personas reales que hacen posible cada
              etapa del proceso de confección.
            </p>
            <p className="mx-auto max-w-[65ch] pt-2 font-sans text-base leading-relaxed text-[#444650]">
              Confecciones Liss está formada por un equipo especializado en
              producción, control de calidad, logística, confección y estrategia
              digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. BLOQUE PROTAGONISTA (HERO DEL EQUIPO - FUNDADORA) */}
      <section className="relative px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="relative grid grid-cols-1 items-center gap-12 overflow-hidden rounded-[40px] border border-slate-100 bg-white p-8 shadow-[0_20px_50px_rgba(20,48,103,0.05)] md:p-16 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Visual Frame - Retrato Grande */}
            <div className="flex justify-center lg:col-span-5">
              <Link
                href={`/empresa/equipo/${founder.slug}`}
                className="group relative flex aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-[32px] bg-[#143067] shadow-xl transition-all select-none active:scale-[0.98]"
              >
                <span className="absolute font-serif text-9xl font-bold text-white/10 transition-all duration-500 select-none group-hover:text-white/20">
                  {founder.initials}
                </span>
                {/* Visual Overlay Design */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#143067]/60 via-transparent to-transparent opacity-80" />
                <div className="absolute right-8 bottom-8 left-8 space-y-2 text-white">
                  <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase backdrop-blur-md">
                    {founder.experience}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold">
                      Ver Perfil
                    </span>
                    <span className="material-symbols-outlined translate-x-0 text-xl transition-transform duration-300 group-hover:translate-x-2">
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Texto Lateral */}
            <div className="space-y-6 lg:col-span-7">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                Fundadora & Directora
              </span>
              <h2 className="font-serif text-4xl font-bold text-[#143067] md:text-5xl">
                {founder.name}
              </h2>
              <p className="font-sans text-lg leading-relaxed font-semibold text-[#b43024] italic">
                &ldquo;{founder.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                {founder.bio}
              </p>
              <p className="border-l-2 border-[#d7dffc] pl-4 font-sans text-sm leading-relaxed text-[#444650]/80">
                {founder.details}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#d7dffc]/40 px-3 py-1 font-sans text-xs font-semibold text-[#143067]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CAPA PRODUCCIÓN (Asymmetric 2-Column Offset) */}
      <section className="relative border-y border-slate-100 bg-[#ffffff] px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
              Capa Producción
            </span>
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              Manos maestras en el ensamble
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#444650]">
              Las especialistas encargadas de la costura y el patronaje fino.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {production.map((member, idx) => (
              <motion.div
                key={member.slug}
                className={`relative flex flex-col justify-between space-y-6 rounded-[32px] border border-slate-100 bg-[#f8f9fb] p-8 shadow-xs ${
                  idx === 1 ? "md:translate-y-8" : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#143067] font-serif text-2xl font-bold text-white shadow-sm select-none">
                      {member.initials}
                    </div>
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#b43024] uppercase">
                      {member.experience}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-snug font-bold text-[#143067]">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs font-semibold tracking-wider text-[#b43024] uppercase">
                    {member.role}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-[#444650] italic">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-[#444650]/90">
                    {member.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4">
                  <div className="flex flex-wrap gap-1">
                    {member.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-100 bg-white px-2.5 py-0.5 font-sans text-[10px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/empresa/equipo/${member.slug}`}
                    className="group flex items-center gap-1 font-mono text-xs font-bold text-[#143067] transition-all hover:text-[#b43024]"
                  >
                    <span>Ver Detalles</span>
                    <span className="material-symbols-outlined translate-x-0 text-sm transition-transform duration-200 group-hover:translate-x-1.5">
                      arrow_right_alt
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CAPA CONTROL Y CALIDAD (Horizontal Technical Strip) */}
      <section className="relative bg-[#f8f9fb] px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="grid grid-cols-1 items-center gap-12 rounded-[36px] border border-slate-100 bg-white p-8 shadow-sm md:p-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex flex-col items-center space-y-4 text-center lg:col-span-4 lg:items-start lg:text-left">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#b43024] font-serif text-3xl font-bold text-white shadow-md select-none">
                {quality.initials}
              </div>
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#b43024] uppercase">
                Control de Calidad
              </span>
              <h3 className="font-serif text-3xl leading-none font-bold text-[#143067]">
                {quality.name}
              </h3>
              <p className="font-sans text-xs font-bold tracking-wider text-slate-500 uppercase">
                {quality.role}
              </p>
            </div>

            <div className="space-y-6 lg:col-span-8 lg:border-l lg:border-slate-100 lg:pl-12">
              <p className="font-serif text-lg leading-relaxed text-[#143067] italic md:text-xl">
                &ldquo;{quality.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                {quality.bio}
              </p>
              <p className="font-sans text-sm leading-relaxed text-[#444650]/80">
                {quality.details}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {quality.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 font-sans text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/empresa/equipo/${quality.slug}`}
                  className="group flex items-center gap-1 font-mono text-xs font-bold text-[#143067] transition-all hover:text-[#b43024]"
                >
                  <span>Ver Ficha Técnica</span>
                  <span className="material-symbols-outlined translate-x-0 text-sm transition-transform duration-200 group-hover:translate-x-1.5">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CAPA LOGÍSTICA Y OPERACIÓN (Timeline Card Layout) */}
      <section className="relative border-t border-slate-100 bg-[#ffffff] px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="relative grid grid-cols-1 items-center gap-12 rounded-[36px] border border-slate-100 bg-[#f8f9fb] p-8 md:p-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="order-2 space-y-6 lg:order-1 lg:col-span-8 lg:border-r lg:border-slate-200/60 lg:pr-12">
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#b43024] uppercase">
                Cadena & Entrega
              </span>
              <p className="font-serif text-lg leading-relaxed text-[#143067] italic md:text-xl">
                &ldquo;{logistics.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                {logistics.bio}
              </p>
              <p className="font-sans text-sm leading-relaxed text-[#444650]/80">
                {logistics.details}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {logistics.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-100 bg-white px-3 py-1 font-sans text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/empresa/equipo/${logistics.slug}`}
                  className="group flex items-center gap-1 font-mono text-xs font-bold text-[#143067] transition-all hover:text-[#b43024]"
                >
                  <span>Ver Proceso de Distribución</span>
                  <span className="material-symbols-outlined translate-x-0 text-sm transition-transform duration-200 group-hover:translate-x-1.5">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            </div>

            <div className="order-1 flex flex-col items-center space-y-4 text-center lg:order-2 lg:col-span-4 lg:items-end lg:text-right">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#143067] font-serif text-3xl font-bold text-white shadow-md select-none">
                {logistics.initials}
              </div>
              <h3 className="font-serif text-3xl leading-none font-bold text-[#143067]">
                {logistics.name}
              </h3>
              <p className="font-sans text-xs font-bold tracking-wider text-slate-500 uppercase">
                {logistics.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CAPA ESTRATÉGICA Y DIGITAL (Brutalist Dark Tech Block) */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-[#001b4a] px-6 py-24 text-white md:px-12 lg:px-24">
        {/* Subtle mesh background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Visual Technical Panel */}
            <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
              <div className="relative flex aspect-square w-full max-w-md flex-col justify-between rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xs">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b43024] font-serif text-xl font-bold text-white select-none">
                    {strategy.initials}
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                    {strategy.experience}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="font-mono text-xs font-semibold text-[#b43024]">
                    SYSTEMS_INTEGRATION_LOG
                  </div>
                  <pre className="overflow-hidden font-mono text-[11px] leading-normal text-slate-300 select-none">
                    {`$ npm run build:seo\n> Generating metadata...\n> Ingesting schema.org data\n> Optimized routes: 80/80\n> CUM: 9.32 (IEPROES)`}
                  </pre>
                </div>
                <Link
                  href={`/empresa/equipo/${strategy.slug}`}
                  className="group w-full rounded-xl border border-white/10 bg-white/10 py-3 text-center font-mono text-xs font-bold text-white transition-all hover:bg-white/15"
                >
                  Access Digital Stack &rarr;
                </Link>
              </div>
            </div>

            {/* Details Panel */}
            <div className="order-1 space-y-6 lg:order-2 lg:col-span-7">
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#b43024] uppercase">
                Capa Estratégica & SEO
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold md:text-5xl">
                {strategy.name}
              </h2>
              <p className="font-sans text-xs font-bold tracking-wider text-slate-300 uppercase">
                {strategy.role}
              </p>
              <p className="font-serif text-lg leading-relaxed text-slate-200 italic md:text-xl">
                &ldquo;{strategy.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-slate-300">
                {strategy.bio}
              </p>
              <p className="font-sans text-sm leading-relaxed text-slate-400">
                {strategy.details}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {strategy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/5 bg-white/10 px-3 py-1 font-sans text-xs font-semibold text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. CAPA IMAGEN INSTITUCIONAL (Staggered Magazine Spread) */}
      <section className="relative bg-[#f8f9fb] px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
              Capa Imagen
            </span>
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              Nuestra presentación visual
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#444650]">
              Los rostros que representan el calce real y la caída de nuestros
              uniformes en campañas digitales.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {models.map((member, idx) => (
              <motion.div
                key={member.slug}
                className={`group flex flex-col justify-between rounded-[36px] border border-slate-100 bg-white p-8 shadow-sm ${
                  idx === 1 ? "md:translate-y-12" : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="space-y-6">
                  {/* Photo Frame */}
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#143067] shadow-inner select-none">
                    <span className="absolute font-serif text-6xl font-bold text-white/10 transition-all duration-500 group-hover:text-white/20">
                      {member.initials}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#143067]/40 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-[#143067]">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs font-bold tracking-wider text-[#b43024] uppercase">
                      {member.role}
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-[#444650] italic">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-[#444650]/90">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-0.5 font-sans text-[10px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/empresa/equipo/${member.slug}`}
                    className="flex items-center gap-1 font-mono text-xs font-bold text-[#143067] transition-all hover:text-[#b43024]"
                  >
                    <span>Ver Perfil</span>
                    <span className="material-symbols-outlined translate-x-0 text-sm transition-transform duration-200 group-hover:translate-x-1.5">
                      arrow_right_alt
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative border-t border-slate-100 bg-[#ffffff] px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-4xl space-y-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              ¿Listo para cotizar tus uniformes?
            </h2>
            <p className="mx-auto max-w-[58ch] font-sans text-base leading-relaxed text-[#444650]">
              Nuestro equipo está listo para asesorarte con la toma de medidas,
              el diseño de bordados personalizados y la selección de las mejores
              telas.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#143067] px-8 py-4 font-sans font-bold text-white shadow-md transition-all hover:bg-[#143067]/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                Hablar con un Especialista
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex w-full items-center justify-center rounded-xl border border-[#143067]/20 bg-white px-8 py-4 font-sans font-bold text-[#143067] shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98] sm:w-auto"
              >
                Ver Catálogo de Prendas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
