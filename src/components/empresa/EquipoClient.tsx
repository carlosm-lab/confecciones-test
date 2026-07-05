"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { teamData, TeamMember } from "@/data/team";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
      <section className="relative flex min-h-[calc(100dvh-56px)] flex-col justify-between px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
        <div className="mx-auto w-full max-w-screen-2xl">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Empresa", href: "/empresa" },
              { label: "Nuestro Equipo", href: "/empresa/equipo" },
            ]}
            className="animate-fade-in-up mb-6 lg:mb-8"
          />
        </div>
        <div className="mx-auto my-auto max-w-4xl space-y-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-4"
          >
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#143067] uppercase">
              {" "}
            </span>
            <h1 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl lg:text-6xl">
              Nuestro equipo
            </h1>
            <p className="mx-auto max-w-[32ch] font-serif text-lg leading-relaxed text-[#444650] italic md:text-xl">
              Detrás de cada uniforme hay personas reales que hacen posible cada
              etapa del proceso de confección.
            </p>
            <p className="mx-auto max-w-[65ch] pt-2 font-sans text-base leading-relaxed text-[#444650]">
              Confecciones Liss está formada por un equipo especializado que
              distribuye el trabajo entre producción, calidad, logística,
              confección y estrategia digital. Cada integrante tiene una función
              definida y una responsabilidad concreta dentro del proceso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. BLOQUE PROTAGONISTA (HERO DEL EQUIPO - FUNDADORA) */}
      <section className="relative px-5 pb-24 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <motion.div
            className="border-primary/35 relative grid grid-cols-1 items-center gap-12 overflow-hidden rounded-[40px] border bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-16 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Visual Frame - Retrato Grande */}
            <div className="flex justify-center lg:col-span-5">
              <div className="group relative flex aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-[32px] bg-[#143067] shadow-xl select-none">
                {founder.image ? (
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <span className="absolute font-serif text-9xl font-bold text-white/10 select-none">
                    {founder.initials}
                  </span>
                )}
                {/* Visual Overlay Design */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#143067]/60 via-transparent to-transparent opacity-80" />
                <div className="absolute right-8 bottom-8 left-8 space-y-2 text-white">
                  <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase backdrop-blur-md">
                    {founder.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Texto Lateral */}
            <div className="space-y-6 lg:col-span-7">
              <span className="font-mono text-xs font-bold font-semibold tracking-[0.2em] text-[#143067] uppercase">
                FUNDADORA Y DIRECTORA
              </span>
              <h2 className="font-serif text-4xl font-bold text-[#143067] md:text-5xl">
                {founder.name}
              </h2>
              <p className="font-sans text-lg leading-relaxed font-bold text-[#143067] italic">
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
      <section className="relative border-y border-slate-100 bg-[#ffffff] px-5 py-24 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs font-bold font-semibold tracking-[0.2em] text-[#143067] uppercase">
              ÁREA DE PRODUCCIÓN
            </span>
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              Especialistas en confección
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#444650]">
              Las personas encargadas de la costura y el patronaje fino.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {production.map((member, idx) => (
              <motion.div
                key={member.slug}
                className={`border-primary/35 relative flex flex-col justify-between space-y-6 rounded-[32px] border bg-[#f8f9fb] p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] ${
                  idx === 1 ? "md:translate-y-8" : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#143067] font-serif text-2xl font-bold text-white shadow-sm select-none">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        member.initials
                      )}
                    </div>
                    <span className="font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                      {member.experience}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-snug font-bold text-[#143067]">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                    {member.role}
                  </p>
                  {member.quote && (
                    <p className="font-sans text-sm leading-relaxed text-[#444650] italic">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  )}
                  <p className="font-sans text-sm leading-relaxed text-[#444650]/90">
                    {member.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-4">
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-100 bg-white px-2.5 py-0.5 font-sans text-[10px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CAPA CONTROL Y CALIDAD (Horizontal Technical Strip) */}
      <section className="relative bg-[#f8f9fb] px-5 py-24 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <motion.div
            className="border-primary/35 grid grid-cols-1 items-center gap-12 rounded-[36px] border bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex flex-col items-center space-y-4 text-center lg:col-span-4 lg:items-start lg:text-left">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#143067] font-serif text-3xl font-bold text-white shadow-md select-none">
                {quality.image ? (
                  <Image
                    src={quality.image}
                    alt={quality.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  quality.initials
                )}
              </div>
              <span className="font-mono text-xs font-bold font-semibold tracking-[0.25em] text-[#143067] uppercase">
                CONTROL DE CALIDAD
              </span>
              <h3 className="font-serif text-3xl leading-none font-bold text-[#143067]">
                {quality.name}
              </h3>
              <p className="font-sans text-xs font-bold tracking-wider text-slate-500 uppercase">
                {quality.role}
              </p>
              {quality.experience && (
                <span className="mt-2 inline-block rounded-full border border-[#143067]/10 bg-[#143067]/5 px-3 py-1 font-mono text-[10px] tracking-wider text-[#143067] uppercase">
                  {quality.experience}
                </span>
              )}
            </div>

            <div className="space-y-6 lg:col-span-8 lg:border-l lg:border-slate-100 lg:pl-12">
              <p className="font-serif text-lg leading-relaxed text-[#143067] italic md:text-xl">
                &ldquo;{quality.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                {quality.bio}
              </p>
              {quality.details && (
                <p className="font-sans text-sm leading-relaxed text-[#444650]/80">
                  {quality.details}
                </p>
              )}
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CAPA LOGÍSTICA Y OPERACIÓN (Timeline Card Layout) */}
      <section className="relative border-t border-slate-100 bg-[#ffffff] px-5 py-24 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <motion.div
            className="border-primary/35 relative grid grid-cols-1 items-center gap-12 rounded-[36px] border bg-[#f8f9fb] p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="order-2 space-y-6 lg:order-1 lg:col-span-8 lg:border-r lg:border-slate-200/60 lg:pr-12">
              <span className="font-mono text-xs font-bold font-semibold tracking-[0.25em] text-[#143067] uppercase">
                LOGÍSTICA Y ENTREGA
              </span>
              <p className="font-serif text-lg leading-relaxed text-[#143067] italic md:text-xl">
                &ldquo;{logistics.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                {logistics.bio}
              </p>
              {logistics.details && (
                <p className="font-sans text-sm leading-relaxed text-[#444650]/80">
                  {logistics.details}
                </p>
              )}
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
              </div>
            </div>

            <div className="order-1 flex flex-col items-center space-y-4 text-center lg:order-2 lg:col-span-4 lg:items-end lg:text-right">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#143067] font-serif text-3xl font-bold text-white shadow-md select-none">
                {logistics.image ? (
                  <Image
                    src={logistics.image}
                    alt={logistics.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  logistics.initials
                )}
              </div>
              <h3 className="font-serif text-3xl leading-none font-bold text-[#143067]">
                {logistics.name}
              </h3>
              <p className="font-sans text-xs font-bold tracking-wider text-slate-500 uppercase">
                {logistics.role}
              </p>
              {logistics.experience && (
                <span className="mt-2 inline-block rounded-full border border-[#143067]/10 bg-[#143067]/5 px-3 py-1 font-mono text-[10px] tracking-wider text-[#143067] uppercase">
                  {logistics.experience}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CAPA ESTRATÉGICA Y DIGITAL (Brutalist Dark Tech Block) */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-[#001b4a] px-5 py-24 text-white md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

          <motion.div
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Visual Technical Panel */}
            <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
              <div className="relative flex aspect-square w-full max-w-md flex-col justify-end overflow-hidden rounded-[32px] border border-white/10 bg-[#001b4a] shadow-xl">
                {strategy.image && (
                  <Image
                    src={strategy.image}
                    alt={strategy.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                )}

                <div className="relative z-10 p-8">
                  <div className="w-fit max-w-[90%] space-y-3">
                    <div className="font-mono text-[10px] font-bold text-white drop-shadow-md">
                      SYSTEMS_INTEGRATION_LOG
                    </div>
                    <pre className="overflow-hidden rounded-xl border border-white/30 bg-white/10 p-4 font-mono text-[10.5px] leading-relaxed text-white shadow-lg backdrop-blur-md select-none">
                      {`$ npm run build:seo\n> Generating metadata...\n> Ingesting schema.org data\n> Optimized routes: 80/80\n> Estudiante: Psicología en IEPROES`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="order-1 space-y-6 lg:order-2 lg:col-span-7">
              <span className="font-mono text-xs font-bold font-semibold tracking-[0.25em] text-[#143067] uppercase">
                ÁREA DIGITAL
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold md:text-5xl">
                {strategy.name}
              </h2>
              <p className="font-sans text-xs font-bold tracking-wider text-slate-300 uppercase">
                {strategy.role}
              </p>
              {strategy.subtitle && (
                <p className="-mt-2 font-sans text-xs font-semibold text-slate-300/80">
                  {strategy.subtitle}
                </p>
              )}
              <p className="font-serif text-lg leading-relaxed text-slate-200 italic md:text-xl">
                &ldquo;{strategy.quote}&rdquo;
              </p>
              <p className="font-sans text-base leading-relaxed text-slate-300">
                {strategy.bio}
              </p>
              {strategy.details && (
                <p className="font-sans text-sm leading-relaxed text-slate-400">
                  {strategy.details}
                </p>
              )}
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
      <section className="relative bg-[#f8f9fb] px-5 py-24 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="font-mono text-xs font-bold font-semibold tracking-[0.2em] text-[#143067] uppercase">
              IMAGEN DE MARCA
            </span>
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              Nuestra presentación visual
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#444650]">
              Los modelos que aparecen en el sitio web y en las fotos de
              nuestros uniformes son colaboradores de la propia empresa, lo que
              garantiza autenticidad en cada imagen institucional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {models.map((member, idx) => (
              <motion.div
                key={member.slug}
                className={`group border-primary/35 flex flex-col justify-between rounded-[36px] border bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] ${
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
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : (
                      <>
                        <span className="absolute font-serif text-6xl font-bold text-white/10 transition-all duration-500 group-hover:text-white/20">
                          {member.initials}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#143067]/40 via-transparent to-transparent opacity-60" />
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-[#143067]">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs font-bold tracking-wider text-[#143067] uppercase">
                      {member.role}
                    </p>
                    {member.quote && (
                      <p className="font-sans text-sm leading-relaxed text-[#444650] italic">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative border-t border-slate-100 bg-[#ffffff] px-5 py-24 md:px-8">
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
              Nuestro equipo está disponible para asesorarte, tomar medidas y
              preparar tu pedido. Cuéntanos qué necesitas y te respondemos a la
              brevedad.
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
