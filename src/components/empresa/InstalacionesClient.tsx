"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface TechSpec {
  label: string;
  value: string;
}

interface Station {
  id: string;
  number: string;
  area: string;
  title: string;
  tagline: string;
  narrative: string;
  image: string;
  accentWord: string;
  technicalSpecs: TechSpec[];
  feeling: string;
}

const stations: Station[] = [
  {
    id: "corte",
    number: "01",
    area: "Area de Corte",
    title: "El Lienzo y la Geometria",
    tagline:
      "Donde la tela se convierte en piezas numeradas con precision quirurgica.",
    accentWord: "Precision",
    narrative:
      "En mesas de 5.2 metros se extienden rollos de Sincatex, Ripstop y Gabardina premium. Cortadoras verticales industriales trazan moldes con tolerancia menor a 1.5mm. Cada pieza se clasifica y numera para mantener uniformidad de tonalidad en el ensamble final.",
    image: "/images/servicios/ropa-general.png",
    technicalSpecs: [
      { label: "Mesa de corte", value: "5.2 m longitud" },
      { label: "Telas base", value: "Sincatex / Ripstop / Dacron" },
      { label: "Tolerancia", value: "< 1.5 mm" },
      { label: "Sistema", value: "Patronaje anatomico" },
    ],
    feeling: "Tecnico y ordenado",
  },
  {
    id: "confeccion",
    number: "02",
    area: "Area de Confeccion",
    title: "El Motor del Taller",
    tagline: "Maquinas industriales, manos expertas, ritmo constante.",
    accentWord: "Ritmo",
    narrative:
      "El corazon del taller. Maquinas planas de alta velocidad y remalladoras automaticas en linea modular. Costureras con decadas de experiencia ensamblan cada panel. Costuras de doble aguja en zonas criticas garantizan resistencia para la jornada laboral diaria.",
    image: "/images/servicios/confeccion.png",
    technicalSpecs: [
      { label: "Maquinaria", value: "Planas & Overlocks" },
      { label: "Hilo", value: "Poliester alta tenacidad 40/2" },
      { label: "Refuerzo", value: "Doble aguja en zonas criticas" },
      { label: "Modelo", value: "Produccion modular" },
    ],
    feeling: "Dinamica y viva",
  },
  {
    id: "bordado",
    number: "03",
    area: "Area de Bordado",
    title: "Identidad en Alta Definicion",
    tagline:
      "El escudo de tu institucion reproducido con fidelidad micrometrica.",
    accentWord: "Detalle",
    narrative:
      "Bordadoras computarizadas multi-cabezal digitalizan logotipos institucionales con exactitud milimetrica. Hilos de sedalina brillante resistentes al cloro y lavado industrial. Cada escudo se limpia a mano tras el bordado para una definicion impecable.",
    image: "/images/servicios/bordados.png",
    technicalSpecs: [
      { label: "Sistema", value: "Multi-cabezal computarizado" },
      { label: "Hilos", value: "Sedalina resistente a cloro" },
      { label: "Precision", value: "Matriz digital automatizada" },
      { label: "Acabado", value: "Limpieza manual post-bordado" },
    ],
    feeling: "Preciso y especializado",
  },
  {
    id: "calidad",
    number: "04",
    area: "Control de Calidad",
    title: "El Filtro de Seguridad",
    tagline: "Ninguna prenda sale sin superar esta compuerta de inspeccion.",
    accentWord: "Rigor",
    narrative:
      "Inspeccion individual bajo iluminacion de contraste focalizado. Se auditan costuras internas, se eliminan hilos sueltos y se validan las dimensiones del uniforme terminado contra la ficha de medidas original. Solo prendas aprobadas reciben el sello de calidad interno.",
    image: "/images/servicios/mano-obra.png",
    technicalSpecs: [
      { label: "Inspeccion", value: "Luz de contraste focalizada" },
      { label: "Calce", value: "Vs. ficha de medidas" },
      { label: "Auditoria", value: "Costuras internas y botones" },
      { label: "Sello", value: "Certificacion interna Liss" },
    ],
    feeling: "Riguroso y confiable",
  },
  {
    id: "almacen",
    number: "05",
    area: "Almacen y Distribucion",
    title: "El Ultimo Toque y la Ruta de Salida",
    tagline: "Planchado al vapor, empaque individual y entrega directa.",
    accentWord: "Orden",
    narrative:
      "Cada uniforme se plancha al vapor para eliminar pliegues y asentar costuras. Empaque individual en bolsas protectoras, agrupado por tallas e instituciones. Carlos Molina coordina personalmente rutas de entrega directa a toda la zona oriental de El Salvador.",
    image: "/images/servicios/sublimacion.png",
    technicalSpecs: [
      { label: "Planchado", value: "Vapor industrial" },
      { label: "Empaque", value: "Individual transparente" },
      { label: "Cobertura", value: "Zona oriental + nacional" },
      { label: "Garantia", value: "Ajuste incluido" },
    ],
    feeling: "Ordenado y logistico",
  },
];

/* --- STATION 01: Dark navy full-bleed, number watermark, parallax split --- */
function StationCorte({ station }: { station: Station }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  return (
    <div
      ref={ref}
      className="relative min-h-[85vh] overflow-hidden bg-[#143067]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 font-serif leading-none font-black text-white/[0.04] select-none"
        style={{
          fontSize: "clamp(200px,28vw,400px)",
          letterSpacing: "-0.05em",
        }}
      >
        {station.number}
      </span>
      <div className="relative z-10 grid min-h-[85vh] grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8 p-8 md:p-16 lg:p-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="block h-[2px] w-8 bg-white" />
              <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-white uppercase">
                {station.area}
              </span>
            </div>
            <h2
              className="font-serif leading-[1.05] font-bold text-white"
              style={{ fontSize: "clamp(2rem,5vw,3.75rem)" }}
            >
              {station.title}
            </h2>
            <p className="max-w-[40ch] font-serif text-lg leading-relaxed text-white/60 italic">
              &ldquo;{station.tagline}&rdquo;
            </p>
            <p className="max-w-[50ch] font-sans text-sm leading-relaxed text-white/50">
              {station.narrative}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4"
          >
            {station.technicalSpecs.map((spec) => (
              <div key={spec.label} className="space-y-1">
                <span className="block font-mono text-[9px] font-bold tracking-widest text-white uppercase">
                  {spec.label}
                </span>
                <span className="block font-sans text-xs font-bold text-white/80">
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
              {station.feeling}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center px-5 py-10 md:p-12 lg:p-16">
          <motion.div
            className="border-primary/35 relative aspect-[4/3] w-full max-w-[75%] overflow-hidden rounded-[24px] border bg-white/5 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={station.image}
              alt={station.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-[#143067]/10" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span
                className="font-serif leading-none font-black text-white/10 select-none"
                style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
              >
                {station.accentWord}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* --- STATION 02: Film-strip 3-panel layout, left red border accent --- */
function StationConfeccion({ station }: { station: Station }) {
  return (
    <div className="relative overflow-hidden bg-[#f8f9fb]">
      <div className="px-5 py-12 md:px-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 py-12 md:py-16"
        >
          <div className="flex items-baseline gap-6">
            <span
              className="font-serif leading-none font-black text-[#143067]/[0.08] select-none"
              style={{ fontSize: "clamp(5rem,12vw,10rem)" }}
              aria-hidden
            >
              {station.number}
            </span>
            <div className="space-y-2">
              <span className="block font-mono text-[10px] font-bold tracking-[0.3em] text-[#143067] uppercase">
                {station.area}
              </span>
              <h2
                className="font-serif leading-tight font-bold text-[#143067]"
                style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}
              >
                {station.title}
              </h2>
            </div>
          </div>
          <p className="max-w-[60ch] font-serif text-lg text-[#444650] italic">
            &ldquo;{station.tagline}&rdquo;
          </p>
        </motion.div>

        <motion.div
          className="flex gap-2 overflow-hidden pr-8 pb-1 md:gap-3 md:pr-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative flex-shrink-0 overflow-hidden rounded-lg"
            style={{ width: "30%", aspectRatio: "3/4" }}
          >
            <Image
              src={station.image}
              alt={station.title}
              fill
              className="object-cover"
              sizes="30vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#143067]/60 to-transparent" />
          </div>
          <div
            className="relative mt-8 flex-1 self-start overflow-hidden rounded-lg"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={station.image}
              alt={station.title}
              fill
              className="object-cover object-center"
              sizes="40vw"
            />
            <div className="absolute bottom-4 left-4">
              <span className="font-mono text-xs tracking-widest text-white/60 uppercase">
                Produccion Activa
              </span>
            </div>
          </div>
          <div
            className="relative mb-4 flex-shrink-0 self-end overflow-hidden rounded-lg"
            style={{ width: "20%", aspectRatio: "1/1" }}
          >
            <Image
              src={station.image}
              alt={station.title}
              fill
              className="object-cover object-top"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-[#b43024]/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 py-12 pr-8 md:grid-cols-2 md:py-16 md:pr-12">
          <motion.p
            className="font-sans text-sm leading-relaxed text-[#444650]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {station.narrative}
          </motion.p>
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {station.technicalSpecs.map((spec) => (
              <div
                key={spec.label}
                className="space-y-0.5 border-l-2 border-[#143067]/30 pl-3"
              >
                <span className="block font-mono text-[9px] font-bold tracking-widest text-[#143067] uppercase">
                  {spec.label}
                </span>
                <span className="block font-sans text-xs font-bold text-[#143067]">
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* --- STATION 03: Centered editorial, full-bleed parallax, dark specs bar --- */
function StationBordado({ station }: { station: Station }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  return (
    <div ref={ref} className="relative overflow-hidden bg-white">
      <motion.div
        className="space-y-4 px-6 py-16 text-center md:py-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-16 bg-[#143067]" />
          <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-[#143067] uppercase">
            {station.area}
          </span>
          <div className="h-[1px] w-16 bg-[#143067]" />
        </div>
        <h2
          className="mx-auto max-w-[16ch] font-serif leading-tight font-bold text-[#143067]"
          style={{ fontSize: "clamp(2rem,6vw,3.75rem)" }}
        >
          {station.title}
        </h2>
        <p className="mx-auto max-w-[45ch] font-serif text-xl text-[#444650] italic">
          &ldquo;{station.tagline}&rdquo;
        </p>
      </motion.div>

      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(320px,60vh,700px)" }}
      >
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <Image
            src={station.image}
            alt={station.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-[#143067]/40 to-[#143067]/80" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif leading-none font-black tracking-tighter text-white/10 select-none"
            style={{ fontSize: "clamp(80px,18vw,200px)" }}
            aria-hidden
          >
            {station.accentWord}
          </span>
        </div>
        <div className="absolute right-6 bottom-10 left-6 text-white md:right-16 md:left-16">
          <p className="max-w-[70ch] font-sans text-sm leading-relaxed md:text-base">
            {station.narrative}
          </p>
        </div>
      </div>

      <motion.div
        className="bg-[#143067] px-6 py-8 md:px-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {station.technicalSpecs.map((spec) => (
            <div
              key={spec.label}
              className="min-w-[140px] flex-1 space-y-1 md:px-8"
            >
              <span className="block font-mono text-[9px] font-bold tracking-widest text-white uppercase">
                {spec.label}
              </span>
              <span className="block font-sans text-xs font-bold text-white">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* --- STATION 04: Asymmetric split — blue-tinted left panel + right image fill --- */
function StationCalidad({ station }: { station: Station }) {
  return (
    <div className="relative overflow-hidden bg-[#f8f9fb]">
      <div className="grid min-h-[75vh] grid-cols-1 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          className="relative flex flex-col justify-between overflow-hidden bg-[#d7dffc]/30 p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="pointer-events-none absolute bottom-0 left-0 font-serif leading-none font-black text-[#143067]/[0.06] select-none"
            style={{ fontSize: "clamp(120px,20vw,240px)" }}
            aria-hidden
          >
            {station.number}
          </span>
          <div className="relative space-y-4">
            <span className="block font-mono text-[10px] font-bold tracking-[0.35em] text-[#143067] uppercase">
              {station.area}
            </span>
            <h2
              className="font-serif leading-tight font-bold text-[#143067]"
              style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}
            >
              {station.title}
            </h2>
            <p className="font-serif text-lg text-[#444650] italic">
              &ldquo;{station.tagline}&rdquo;
            </p>
            <p className="max-w-[48ch] font-sans text-sm leading-relaxed text-[#444650]">
              {station.narrative}
            </p>
          </div>
          <div className="relative mt-8 space-y-3 border-t border-[#143067]/10 pt-6">
            {station.technicalSpecs.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="flex items-start justify-between gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="mt-0.5 flex-shrink-0 font-mono text-[9px] font-bold tracking-widest text-[#143067] uppercase">
                  {spec.label}
                </span>
                <span className="text-right font-sans text-xs font-bold text-[#143067]">
                  {spec.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[50vh] overflow-hidden lg:min-h-full"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={station.image}
            alt={station.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#d7dffc]/20" />
          <div className="absolute top-6 right-6 rounded-full bg-white/90 px-4 py-2 backdrop-blur-sm">
            <span className="font-mono text-[9px] tracking-widest text-[#143067] uppercase">
              {station.feeling}
            </span>
          </div>
          <div className="absolute right-6 bottom-6">
            <span
              className="font-serif leading-none font-black text-white/10 select-none"
              style={{ fontSize: "80px" }}
              aria-hidden
            >
              {station.number}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* --- STATION 05: Dark full-bleed image hero + horizontal timeline process --- */
function StationAlmacen({ station }: { station: Station }) {
  const steps = [
    {
      icon: "dry_cleaning",
      label: "Planchado al vapor",
      desc: "Eliminacion de pliegues y fijado de costuras",
    },
    {
      icon: "inventory_2",
      label: "Empaque individual",
      desc: "Bolsa protectora transparente por prenda",
    },
    {
      icon: "sell",
      label: "Etiquetado",
      desc: "Talla, codigo de institucion y cliente",
    },
    {
      icon: "local_shipping",
      label: "Distribucion",
      desc: "Entrega directa a toda la zona oriental",
    },
  ];
  return (
    <div className="relative overflow-hidden bg-[#191c1e]">
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(320px,60vh,700px)" }}
      >
        <Image
          src={station.image}
          alt={station.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#191c1e]/30 via-[#191c1e]/50 to-[#191c1e]" />
        <motion.div
          className="absolute inset-0 flex items-center px-5 md:px-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-[55ch] space-y-4">
            <div className="flex items-center gap-4">
              <span className="block h-[1px] w-6 bg-white" />
              <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-white uppercase">
                {station.area}
              </span>
            </div>
            <h2
              className="font-serif leading-tight font-bold text-white"
              style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
            >
              {station.title}
            </h2>
            <p className="font-serif text-lg text-white/60 italic">
              &ldquo;{station.tagline}&rdquo;
            </p>
            <p className="font-sans text-sm leading-relaxed text-white/50">
              {station.narrative}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 py-12 md:px-8 md:py-16">
        <motion.div
          className="flex flex-col gap-0 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="relative flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {i < steps.length - 1 && (
                <div className="absolute top-5 left-full z-10 hidden h-[1px] w-full bg-white/20 md:block" />
              )}
              <div className="space-y-3 border-b border-white/5 pr-0 pb-8 last:border-0 md:border-b-0 md:pr-8 md:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/40">
                    <span className="material-symbols-outlined text-lg text-white">
                      {step.icon}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] font-bold tracking-widest text-white uppercase">
                    Paso {i + 1}
                  </span>
                </div>
                <h3 className="font-sans text-sm font-bold text-white">
                  {step.label}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/5 pt-8 md:grid-cols-4">
          {station.technicalSpecs.map((spec) => (
            <div key={spec.label} className="space-y-1">
              <span className="block font-mono text-[9px] font-bold tracking-widest text-white uppercase">
                {spec.label}
              </span>
              <span className="block font-sans text-xs font-bold text-white/70">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Floating side progress nav --- */
function TourProgressNav({
  activeStation,
  onNavigate,
}: {
  activeStation: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Mapa de estaciones"
      className="fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-3 md:right-6"
    >
      {stations.map((st) => (
        <button
          key={st.id}
          onClick={() => onNavigate(st.id)}
          title={st.area}
          className="group relative flex cursor-pointer items-center justify-end gap-2 transition-all duration-300"
        >
          <span
            className={`absolute right-full mr-3 font-mono text-[9px] tracking-widest whitespace-nowrap uppercase transition-all duration-200 ${
              activeStation === st.id
                ? "text-[#143067] opacity-100"
                : "text-[#444650] opacity-0 group-hover:opacity-60"
            }`}
          >
            {st.area}
          </span>
          <div
            className={`rounded-full border transition-all duration-300 ${
              activeStation === st.id
                ? "h-3 w-3 border-[#b43024] bg-[#b43024] shadow-[0_0_8px_rgba(180,48,36,0.5)]"
                : "h-2 w-2 border-[#143067]/30 bg-white hover:border-[#143067] hover:bg-[#143067]/10"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function InstalacionesClient() {
  const [activeStation, setActiveStation] = useState<string>(stations[0].id);
  const stationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      for (const station of stations) {
        const el = stationRefs.current[station.id];
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (mid >= offsetTop && mid < offsetTop + offsetHeight) {
            setActiveStation(station.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStation = useCallback((id: string) => {
    const el = stationRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
      setActiveStation(id);
    }
  }, []);

  return (
    <div className="relative bg-[#f8f9fb] text-[#191c1e] antialiased selection:bg-[#d7dffc] selection:text-[#143067]">
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden bg-[#143067]"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-[25%] h-full w-[1px] bg-white/10" />
        <div className="absolute top-0 right-[50%] h-full w-[1px] bg-white/5" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black tracking-tighter text-white/[0.03] select-none"
          style={{ fontSize: "clamp(100px,22vw,280px)" }}
        >
          TALLER
        </span>

        {/* Breadcrumbs inside Hero */}
        <div className="relative z-20 w-full max-w-screen-2xl px-5 pt-6 pb-0 md:px-8 md:pt-8 md:pb-0">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Empresa", href: "/empresa" },
              { label: "Instalaciones", href: "/empresa/instalaciones" },
            ]}
            variant="light"
            className="animate-fade-in-up"
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-5 pt-4 pb-20 md:px-8 md:pt-6 md:pb-20 lg:grid-cols-2">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Hero red sub-label removed */}
            <motion.h1
              variants={fadeIn}
              className="font-serif leading-[0.95] font-bold tracking-tighter text-white"
              style={{ fontSize: "clamp(3rem,8vw,6rem)" }}
            >
              Nuestras
              <br />
              <em className="text-white not-italic">Insta</em>
              <span className="text-white">laciones</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="max-w-[42ch] font-serif text-xl text-white/60 italic"
            >
              Confecciones Liss opera como un taller de confeccion especializado
              en uniformes escolares, empresariales y medicos, donde cada
              proceso se realiza con precision y control de calidad.
            </motion.p>
            <motion.p
              variants={fadeIn}
              className="max-w-[55ch] font-sans text-sm leading-relaxed text-white/40"
            >
              Te invitamos a recorrer las cinco estaciones de trabajo donde se
              construye cada prenda, desde el rollo de tela hasta la entrega
              final al cliente.
            </motion.p>
            {/* Visita guiada button removed */}
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              viewBox="0 0 480 440"
              className="mx-auto w-full max-w-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="8"
                width="464"
                height="424"
                rx="4"
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="1.5"
              />
              <rect
                x="20"
                y="20"
                width="210"
                height="160"
                rx="2"
                fill="white"
                fillOpacity="0.04"
                stroke="white"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
              <text
                x="125"
                y="95"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fill="white"
                fillOpacity="0.4"
                letterSpacing="2"
              >
                01 CORTE
              </text>
              <line
                x1="20"
                y1="80"
                x2="230"
                y2="80"
                stroke="white"
                strokeOpacity="0.06"
                strokeWidth="0.5"
              />
              <rect
                x="20"
                y="192"
                width="210"
                height="220"
                rx="2"
                fill="white"
                fillOpacity="0.04"
                stroke="white"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
              <text
                x="125"
                y="302"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fill="white"
                fillOpacity="0.4"
                letterSpacing="2"
              >
                02 CONFECCION
              </text>
              <rect
                x="242"
                y="20"
                width="210"
                height="130"
                rx="2"
                fill="white"
                fillOpacity="0.04"
                stroke="white"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
              <text
                x="347"
                y="82"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fill="white"
                fillOpacity="0.4"
                letterSpacing="2"
              >
                03 BORDADO
              </text>
              <rect
                x="242"
                y="162"
                width="210"
                height="120"
                rx="2"
                fill="white"
                fillOpacity="0.04"
                stroke="white"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
              <text
                x="347"
                y="222"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fill="white"
                fillOpacity="0.4"
                letterSpacing="2"
              >
                04 CALIDAD
              </text>
              <rect
                x="242"
                y="294"
                width="210"
                height="118"
                rx="2"
                fill="white"
                fillOpacity="0.04"
                stroke="white"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
              <text
                x="347"
                y="354"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fill="white"
                fillOpacity="0.4"
                letterSpacing="2"
              >
                05 ALMACEN
              </text>
              <circle
                cx="125"
                cy="100"
                r="4"
                fill="#ffffff"
                fillOpacity="0.8"
              />
              <circle cx="125" cy="100" r="8" fill="#ffffff" fillOpacity="0.2">
                <animate
                  attributeName="r"
                  values="8;14;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.2;0;0.2"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x="454"
                y="424"
                textAnchor="end"
                fontFamily="monospace"
                fontSize="7"
                fill="white"
                fillOpacity="0.2"
              >
                N
              </text>
              <line
                x1="20"
                y1="424"
                x2="90"
                y2="424"
                stroke="white"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              <text
                x="55"
                y="435"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="6"
                fill="white"
                fillOpacity="0.15"
              >
                10 m
              </text>
            </svg>
            <p className="mt-4 text-center font-mono text-[9px] tracking-widest text-white/20 uppercase">
              Plano esquematico del taller &middot; Barrio La Merced
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator removed */}
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#b43024]/40 to-transparent" />

      {/* STATIONS */}
      <div className="space-y-1">
        <div
          ref={(el) => {
            stationRefs.current["corte"] = el;
          }}
          className="scroll-mt-16"
        >
          <StationCorte station={stations[0]} />
        </div>
        <div className="h-px bg-gradient-to-r from-[#143067]/10 via-[#143067]/15 to-[#143067]/10" />
        <div
          ref={(el) => {
            stationRefs.current["confeccion"] = el;
          }}
          className="scroll-mt-16"
        >
          <StationConfeccion station={stations[1]} />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#143067]/15 to-transparent" />
        <div
          ref={(el) => {
            stationRefs.current["bordado"] = el;
          }}
          className="scroll-mt-16"
        >
          <StationBordado station={stations[2]} />
        </div>
        <div className="h-px bg-gradient-to-r from-[#143067]/10 via-[#143067]/15 to-[#143067]/10" />
        <div
          ref={(el) => {
            stationRefs.current["calidad"] = el;
          }}
          className="scroll-mt-16"
        >
          <StationCalidad station={stations[3]} />
        </div>
        <div className="h-px bg-[#191c1e]" />
        <div
          ref={(el) => {
            stationRefs.current["almacen"] = el;
          }}
          className="scroll-mt-16"
        >
          <StationAlmacen station={stations[4]} />
        </div>
      </div>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 md:py-32">
        <div className="absolute top-0 right-0 left-0 h-1 bg-[#143067]" />
        <motion.div
          className="mx-auto max-w-4xl space-y-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] max-w-[80px] flex-1 bg-[#143067]/20" />
            <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-[#143067] uppercase">
              Fin del Recorrido
            </span>
            <div className="h-[1px] max-w-[80px] flex-1 bg-[#143067]/20" />
          </div>
          <h2
            className="font-serif leading-tight font-bold text-[#143067]"
            style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
          >
            Visitanos en el{" "}
            <em className="font-bold text-[#143067] not-italic">
              Barrio La Merced
            </em>
          </h2>
          <p className="mx-auto max-w-[60ch] font-sans text-base leading-relaxed text-[#444650]">
            Nuestras puertas estan abiertas para que compruebes en persona la
            calidad de cada costura y selecciones los materiales ideales para
            los uniformes de tu institucion.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
            >
              <span className="material-symbols-outlined text-lg">
                calendar_month
              </span>
              Programar una Visita
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#143067] bg-transparent px-6 py-3.5 font-sans text-[14px] font-semibold text-[#143067] shadow-sm transition-all hover:bg-[#dae2ff]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
            >
              <span className="material-symbols-outlined text-lg">
                menu_book
              </span>
              Ver Catálogo
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
