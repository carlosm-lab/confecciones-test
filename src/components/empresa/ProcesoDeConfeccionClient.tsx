"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Scissors,
  ArrowRight,
  Compass,
  Layers,
  Settings,
  TrendingUp,
  MapPin,
  Mail,
  ChevronRight,
  Phone,
  Share2,
} from "lucide-react";

// List of the 10 stages
const STAGES = [
  { id: "primer-contacto", label: "Primer contacto", num: "01" },
  { id: "analisis", label: "Análisis", num: "02" },
  { id: "medidas", label: "Medidas", num: "03" },
  { id: "materiales", label: "Materiales", num: "04" },
  { id: "corte", label: "Corte", num: "05" },
  { id: "confeccion", label: "Confección", num: "06" },
  { id: "personalizacion", label: "Personalización", num: "07" },
  { id: "calidad", label: "Calidad", num: "08" },
  { id: "empaque", label: "Empaque", num: "09" },
  { id: "entrega", label: "Entrega", num: "10" },
];

// Team connections data for the "Mesa de Trabajo"
interface TeamConnection {
  name: string;
  role: string;
  desc: string;
  stages: string[]; // Connected stages from STAGES
}

const TEAM_CONNECTIONS: TeamConnection[] = [
  {
    name: "Lisseth Molina",
    role: "Supervisión general y fundadora",
    desc: "Supervisa la calidad y define el patronaje industrial del taller.",
    stages: ["analisis", "corte", "calidad"],
  },
  {
    name: "Lilian Romero",
    role: "Especialista en confección",
    desc: "Encargada del ensamble de prendas formales e indumentaria médica.",
    stages: ["confeccion"],
  },
  {
    name: "Nubia Vázquez",
    role: "Especialista en confección",
    desc: "Garantiza uniformidad geométrica en lotes escolares y universitarios.",
    stages: ["confeccion"],
  },
  {
    name: "Blanca Martínez",
    role: "Operaria de producción",
    desc: "Preparación técnica, habilitado rápido y habilitación de forros.",
    stages: ["materiales", "corte"],
  },
  {
    name: "René Alfonso Méndez",
    role: "Calidad y toma de medidas",
    desc: "Toma de medidas anatómicas en campo y auditoría final prenda a prenda.",
    stages: ["medidas", "calidad"],
  },
  {
    name: "Carlos Antonio Molina",
    role: "Logística y cadena de suministro",
    desc: "Gestión de inventarios, compras de insumos y envíos nacionales.",
    stages: ["materiales", "empaque", "entrega"],
  },
  {
    name: "Carlos José Molina Villacorta",
    role: "Ecosistema digital y comunicación",
    desc: "Atención comercial por canales digitales y soporte técnico del taller.",
    stages: ["primer-contacto"],
  },
];

export default function ProcesoDeConfeccionClient() {
  const [activeStage, setActiveStage] = useState("primer-contacto");
  const [hoveredCrew, setHoveredCrew] = useState<string | null>(null);

  // IntersectionObserver to detect which stage is active on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStage(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    STAGES.forEach((stage) => {
      const el = document.getElementById(stage.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const animationVariants: Variants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative bg-[#f8f9fb] font-sans text-[#191c1e] antialiased">
      {/* ──────────────────────────────────────────────────────── */}
      {/* CABECERA (60/40 con ilustración abstracta) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative border-b border-[#e4e6ea] bg-[#f8f9fb] px-5 py-12 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Lado Izquierdo: Textos */}
            <div className="space-y-6 lg:col-span-7">
              <span className="block font-sans text-xs font-bold tracking-[0.12em] text-[#b43024] uppercase">
                Trayectoria Textil
              </span>
              <h1 className="font-serif text-[40px] leading-tight font-bold tracking-[-0.02em] text-[#191c1e] md:text-[56px]">
                Del hilo a la excelencia.
              </h1>
              <p className="max-w-2xl font-sans text-[16px] leading-[26px] text-[#444650] md:text-[18px] md:leading-[28px]">
                Cada uniforme que confeccionamos es el resultado de un proceso
                construido durante más de veinte años de experiencia. Desde el
                primer contacto con el cliente hasta la entrega final, cada
                etapa tiene un propósito y cada integrante del equipo desempeña
                un papel fundamental para garantizar la calidad de cada prenda.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
                <button
                  onClick={() => handleScrollTo("primer-contacto")}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
                >
                  Ver el proceso completo
                </button>
                <Link
                  href="/empresa/equipo"
                  className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-[#143067] bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-[#143067] transition-all hover:bg-[#edf1f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
                >
                  Conocer nuestro equipo
                </Link>
              </div>
            </div>

            {/* Lado Derecho: Ilustración Abstracta de Costura */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-2xl border border-[#e4e6ea] bg-white p-6 shadow-sm">
                {/* SVG Abstracto */}
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full text-[#143067]"
                >
                  {/* Cuadrícula de base */}
                  <g className="opacity-10">
                    <line
                      x1="40"
                      y1="0"
                      x2="40"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="120"
                      y1="0"
                      x2="120"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="200"
                      y1="0"
                      x2="200"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="280"
                      y1="0"
                      x2="280"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="360"
                      y1="0"
                      x2="360"
                      y2="400"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="80"
                      x2="400"
                      y2="80"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="160"
                      x2="400"
                      y2="160"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="240"
                      x2="400"
                      y2="240"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="320"
                      x2="400"
                      y2="320"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Curvas de patrones de sastre */}
                  <path
                    d="M 60,340 C 60,180 200,60 340,60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="opacity-40"
                  />
                  <path
                    d="M 60,340 H 340 V 60"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-30"
                  />

                  {/* Curva de manga/talle en acento rojo */}
                  <path
                    d="M 120,340 C 120,240 220,180 340,180"
                    stroke="#b43024"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="opacity-75"
                  />

                  {/* Rectángulo de molde (Lienzo geométrico) */}
                  <rect
                    x="80"
                    y="100"
                    width="140"
                    height="180"
                    rx="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-25"
                  />

                  {/* Formas geométricas / Moldes de corte */}
                  <polygon
                    points="220,100 300,100 300,180"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-25"
                  />

                  {/* Línea de costura hilvanada (Stitch) */}
                  <path
                    d="M 40,200 Q 200,380 360,200"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    className="opacity-60"
                  />

                  {/* Detalles técnicos (Puntos flotantes, coordenadas) */}
                  <circle cx="60" cy="340" r="4" fill="currentColor" />
                  <circle cx="340" cy="60" r="4" fill="currentColor" />
                  <circle cx="340" cy="180" r="4" fill="#b43024" />
                  <circle cx="120" cy="340" r="3" fill="#b43024" />

                  {/* Elemento decorativo flotante estilo transportador */}
                  <path
                    d="M 280,240 A 40,40 0 0 1 200,240"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="opacity-30"
                  />
                  <line
                    x1="240"
                    y1="240"
                    x2="240"
                    y2="210"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="opacity-30"
                  />
                </svg>

                {/* Sello o etiqueta flotante de la ilustración */}
                <div className="absolute right-4 bottom-4 rounded bg-[#edf1f7] px-2 py-1 font-mono text-[9px] font-semibold text-[#143067] uppercase">
                  MOLD_COORD_A1
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* INDICADOR DE RECORRIDO (Barra horizontal sticky) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="sticky top-[58px] z-40 w-full border-b border-[#e4e6ea] bg-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-md">
        <div className="scrollbar-none mx-auto max-w-7xl overflow-x-auto px-4">
          <nav className="flex min-w-[900px] items-center justify-between gap-1.5 py-3 md:gap-3 md:py-4">
            {STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleScrollTo(stage.id)}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 font-sans text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#143067] text-white shadow-sm"
                      : "text-[#444650] hover:bg-[#edf1f7]/50 hover:text-[#143067]"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-white text-[#143067]"
                        : "bg-[#edf1f7] text-[#444650]"
                    }`}
                  >
                    {stage.num}
                  </span>
                  <span>{stage.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* LAS 10 ETAPAS DEL PROCESO */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="space-y-16 py-16 md:space-y-24 md:py-24">
        {/* ETAPA 1: Primer contacto */}
        <section
          id="primer-contacto"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-12"
          >
            <div className="space-y-4 md:col-span-6">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                  01
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                  Primer contacto
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Escuchar tus necesidades es el inicio de todo
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Todo comienza cuando el cliente se comunica con nosotros para
                  solicitar información sobre un uniforme o un proyecto de
                  confección.
                </p>
                <p>
                  Durante esta primera etapa escuchamos sus necesidades,
                  resolvemos dudas y recopilamos la información necesaria para
                  comprender el proyecto.
                </p>
                <p className="font-medium text-[#143067]">
                  Si el trabajo requiere una atención personalizada, coordinamos
                  los siguientes pasos para continuar con el proceso.
                </p>
              </div>
            </div>
            <div className="flex justify-center md:col-span-6">
              <div className="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border border-[#e4e6ea] bg-white p-2 shadow-sm">
                <Image
                  src="/images/servicios/mano-obra.png"
                  alt="Cliente siendo atendido en Confecciones Liss"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="rounded-[12px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 2: Análisis del proyecto (Bento UI) */}
        <section
          id="analisis"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="flex items-baseline gap-4 border-b border-[#e4e6ea] pb-4">
              <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                02
              </span>
              <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                Análisis del proyecto
              </span>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              {/* Bloque Principal */}
              <div className="flex flex-col justify-between rounded-[16px] border border-[#e4e6ea] bg-white p-8 md:col-span-4">
                <div className="space-y-4">
                  <h3 className="font-serif text-[24px] font-bold text-[#191c1e]">
                    Estudio técnico de viabilidad
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                    Cada solicitud es diferente. Antes de comenzar la producción
                    analizamos el tipo de uniforme, la cantidad requerida, las
                    necesidades específicas, las personalizaciones solicitadas y
                    los materiales que serán necesarios.
                  </p>
                </div>
                <div className="mt-6 font-mono text-[10px] tracking-wider text-[#b43024] uppercase">
                  PLANIFICACIÓN DE REQUISITOS // LISSETH MOLINA
                </div>
              </div>

              {/* Bloque 1: Tipo de uniforme */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Tipo de uniforme
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Evaluamos el diseño de patrón y ergonomía de la pieza
                    corporativa o escolar.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  MODULO_01
                </span>
              </div>

              {/* Bloque 2: Cantidad */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Volumen y Lotes
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Definición de escala y organización modular de costura.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  MODULO_02
                </span>
              </div>

              {/* Bloque 3: Personalización */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Detalles y Bordados
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Especificación de parches, estampados y logos
                    institucionales.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  MODULO_03
                </span>
              </div>

              {/* Bloque 4: Materiales & Tallas */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Insumos & Tallas
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Curva de tallas, tejidos específicos y stock disponible de
                    telas base.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  MODULO_04
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 3: Toma de medidas (Dos columnas) */}
        <section
          id="medidas"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          >
            {/* Foto izquierda */}
            <div className="order-2 flex justify-center md:order-1">
              <div className="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border border-[#e4e6ea] bg-white p-2 shadow-sm">
                <Image
                  src="/images/servicios/ropa-general.png"
                  alt="Toma de medidas anatómicas en Confecciones Liss"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="rounded-[12px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
            {/* Texto derecha */}
            <div className="order-1 space-y-4 md:order-2">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                  03
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                  Toma de medidas
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Ajuste milimétrico y ergonomía real
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Cuando el proyecto lo requiere realizamos la toma de medidas
                  para garantizar un ajuste adecuado.
                </p>
                <p>
                  Durante esta etapa verificamos las medidas necesarias para
                  elaborar prendas acordes a las características físicas de cada
                  cliente o empleado.
                </p>
                <p className="font-semibold text-[#143067]">
                  La precisión en esta fase resulta fundamental para obtener un
                  producto final cómodo y duradero que aguante la jornada
                  diaria.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 4: Materiales (Banda horizontal sin columnas) */}
        <section
          id="materiales"
          className="scroll-mt-28 border-y border-[#e4e6ea] bg-white py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
            <motion.div
              variants={animationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                  04
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                  Materiales
                </span>
              </div>

              {/* 5 bloques grandes */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {[
                  {
                    title: "Tela",
                    desc: "Sincatex, Ripstop, Gabardina premium.",
                  },
                  {
                    title: "Hilo",
                    desc: "Poliéster de alta tenacidad calibre 40/2.",
                  },
                  {
                    title: "Accesorios",
                    desc: "Botones de resina y cierres reforzados.",
                  },
                  { title: "Colores", desc: "Tonos institucionales estables." },
                  {
                    title: "Insumos",
                    desc: "Entretelas y forros protectores.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-[#e4e6ea] bg-[#f8f9fb] p-5 transition-colors hover:border-[#143067]/30"
                  >
                    <h4 className="font-serif text-lg font-bold text-[#143067]">
                      {item.title}
                    </h4>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-[#444650]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mx-auto max-w-3xl pt-2 text-center font-sans text-sm leading-relaxed font-medium text-[#444650] md:text-base">
                Una correcta selección de materiales permite que cada uniforme
                cumpla con los requisitos de resistencia, comodidad y
                durabilidad esperados por el cliente.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ETAPA 5: Corte (Editorial de dos columnas) */}
        <section
          id="corte"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          >
            {/* Texto izquierda */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                  05
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                  Corte
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Geometría y simetría en la mesa de corte
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Con las medidas y materiales preparados comienza el proceso de
                  corte físico en nuestras mesas industriales de más de 5 metros
                  de longitud.
                </p>
                <p>
                  Cada pieza es preparada y trazada cuidadosamente con
                  tolerancias menores a 1.5mm para mantener la uniformidad
                  absoluta y precisión geométrica antes de pasar al área de
                  confección.
                </p>
              </div>
            </div>
            {/* Foto derecha */}
            <div className="flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border border-[#e4e6ea] bg-white p-2 shadow-sm">
                <Image
                  src="/images/servicios/confeccion.png"
                  alt="Área de corte de Confecciones Liss"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="rounded-[12px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 6: Confección (Taller layout, foto grande central + paneles flotantes) */}
        <section
          id="confeccion"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                06
              </span>
              <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                Confección
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-[#e4e6ea] bg-white p-4 shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#edf1f7]">
                <Image
                  src="/images/servicios/confeccion.png"
                  alt="Taller de confección industrial de Confecciones Liss"
                  fill
                  sizes="(max-width: 1200px) 100vw, 80vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Paneles Flotantes (En desktop) */}
              <div className="mt-6 grid grid-cols-2 gap-4 md:absolute md:inset-x-8 md:bottom-8 md:mt-0 md:grid-cols-4">
                {[
                  {
                    title: "Costura",
                    desc: "Líneas de costura rectas a alta velocidad.",
                  },
                  {
                    title: "Ensamblaje",
                    desc: "Modular y progresivo para uniformidad.",
                  },
                  {
                    title: "Acabados",
                    desc: "Sobrehilado interior y costuras dobles.",
                  },
                  {
                    title: "Revisión continua",
                    desc: "Inspección al vuelo del operador.",
                  },
                ].map((panel, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#e4e6ea] bg-white/95 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <h5 className="font-sans text-[14px] font-bold text-[#143067]">
                      {panel.title}
                    </h5>
                    <p className="mt-1 font-sans text-xs text-[#444650]">
                      {panel.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mx-auto max-w-3xl text-center font-sans text-sm leading-relaxed font-medium text-[#444650] md:text-base">
              Las piezas pasan al área de confección donde nuestro equipo
              especializado realiza el ensamblaje utilizando maquinaria
              industrial y técnicas desarrolladas a partir de años de
              experiencia.
            </p>
          </motion.div>
        </section>

        {/* ETAPA 7: Personalización (Tarjetas suspendidas) */}
        <section
          id="personalizacion"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                07
              </span>
              <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                Personalización
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                  Bordados y detalles corporativos
                </h2>
                <p className="font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                  Cuando el proyecto lo requiere, incorporamos bordados
                  computarizados, identificaciones y otros elementos
                  personalizados respetando estrictamente las especificaciones
                  gráficas de la institución.
                </p>
              </div>

              {/* Grid de Tarjetas Suspendidas */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Bordado",
                    desc: "Escudos con alta densidad de puntadas.",
                  },
                  {
                    title: "Logotipos",
                    desc: "Estampados y sublimaciones nítidas.",
                  },
                  {
                    title: "Identificaciones",
                    desc: "Badges y cintas personalizadas.",
                  },
                  {
                    title: "Detalles",
                    desc: "Botones cosidos con refuerzo de cruz.",
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#e4e6ea] bg-white p-5 shadow-[0_4px_16px_rgba(20,48,103,0.04)] transition-all hover:shadow-[0_8px_32px_rgba(20,48,103,0.08)]"
                  >
                    <h4 className="font-serif text-[16px] font-bold text-[#143067]">
                      {card.title}
                    </h4>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-[#444650]">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 8: Control de calidad (Fondo azul, texto blanco, sin iconos) */}
        <section
          id="calidad"
          className="scroll-mt-28 bg-[#143067] py-16 text-white md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
            <motion.div
              variants={animationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
            >
              {/* Textos */}
              <div className="space-y-6 lg:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[48px] leading-none font-bold text-white/20 md:text-[64px]">
                    08
                  </span>
                  <span className="font-sans text-xs font-bold tracking-[0.1em] text-white/60 uppercase">
                    Control de calidad
                  </span>
                </div>
                <h2 className="font-serif text-[32px] leading-tight font-bold text-white md:text-[40px]">
                  Rigor absoluto prenda a prenda
                </h2>
                <p className="font-sans text-sm leading-relaxed text-white/80 md:text-base">
                  Antes de considerar terminada una prenda realizamos un proceso
                  de revisión donde verificamos costuras, acabados,
                  presentación, uniformidad y condiciones generales del
                  uniforme.
                </p>
              </div>

              {/* Grid con líneas finas (sin iconos) */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:col-span-7">
                <h3 className="mb-6 font-sans text-[11px] font-bold tracking-widest text-white/50 uppercase">
                  Puntos de inspección técnica:
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 divide-y divide-white/10 md:grid-cols-3 md:divide-y-0">
                  {[
                    { label: "Costuras", desc: "Resistencia e hilos libres." },
                    { label: "Acabados", desc: "Sobrehilos y bastillas." },
                    {
                      label: "Presentación",
                      desc: "Limpieza textil y planchado.",
                    },
                    { label: "Medidas", desc: "Tolerancia menor a 1.5mm." },
                    {
                      label: "Detalles",
                      desc: "Refuerzo en botones y ojales.",
                    },
                    { label: "Estado general", desc: "Uniformidad cromática." },
                  ].map((pt, idx) => (
                    <div
                      key={idx}
                      className={`pt-6 first:pt-0 md:pt-0 ${
                        idx >= 3 ? "md:border-t md:border-white/10 md:pt-6" : ""
                      }`}
                    >
                      <h4 className="font-serif text-[16px] font-bold text-white">
                        {pt.label}
                      </h4>
                      <p className="mt-1 font-sans text-xs text-white/70">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ETAPA 9: Preparación para entrega */}
        <section
          id="empaque"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          >
            {/* Foto izquierda */}
            <div className="flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border border-[#e4e6ea] bg-white p-2 shadow-sm">
                <Image
                  src="/images/servicios/sublimacion.png"
                  alt="Preparación y empaque de uniformes en Confecciones Liss"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="rounded-[12px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
            {/* Texto derecha */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                  09
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                  Empaque
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Preparación final y empaque ordenado
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Una vez aprobadas las prendas por control de calidad, entran
                  al área de preparación para entrega.
                </p>
                <p>
                  Cada uniforme se limpia a mano para eliminar hilos residuales,
                  se plancha con vapor a presión y se embolsa individualmente
                  etiquetando su talla y nombre si es un pedido corporativo.
                </p>
                <p className="font-medium text-[#143067]">
                  La presentación final de cada paquete es la carta de
                  presentación de nuestro taller.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 10: Entrega (Cierre visual potente) */}
        <section
          id="entrega"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          >
            {/* Texto izquierda */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#b43024]/20 md:text-[64px]">
                  10
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#b43024] uppercase">
                  Entrega
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Un uniforme listo para el trabajo diario
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  El proceso concluye cuando el cliente recibe un uniforme
                  confeccionado con dedicación, experiencia y un compromiso
                  permanente con la calidad.
                </p>
                <p>
                  Ya sea mediante entrega directa en nuestro taller de Barrio La
                  Merced o con envíos seguros a nivel nacional, nos aseguramos
                  de que el pedido llegue en la fecha acordada.
                </p>
              </div>
            </div>
            {/* Foto derecha */}
            <div className="flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border border-[#e4e6ea] bg-white p-2 shadow-sm">
                <Image
                  src="/images/servicios/mano-obra.png"
                  alt="Cliente de Confecciones Liss recibiendo sus uniformes"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="rounded-[12px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* PARTICIPACIÓN DEL EQUIPO (Mesa de trabajo interactiva) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-y border-[#e4e6ea] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
          <div className="text-center">
            <span className="block font-sans text-xs font-bold tracking-[0.12em] text-[#b43024] uppercase">
              Sinergia y Personas
            </span>
            <h2 className="mt-3 font-serif text-[28px] font-bold tracking-[-0.015em] text-[#191c1e] md:text-[36px]">
              Mesa de Trabajo Técnica
            </h2>
            <p className="mx-auto mt-2 max-w-[500px] font-sans text-[15px] text-[#444650]">
              Pasa el cursor o selecciona a un integrante para ver su
              participación directa en las diferentes etapas del proceso de
              manufactura.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Lista de integrantes */}
            <div className="space-y-3 lg:col-span-5">
              {TEAM_CONNECTIONS.map((crew) => {
                const isSelected = hoveredCrew === crew.name;
                return (
                  <button
                    key={crew.name}
                    onMouseEnter={() => setHoveredCrew(crew.name)}
                    onMouseLeave={() => setHoveredCrew(null)}
                    onClick={() =>
                      setHoveredCrew(
                        hoveredCrew === crew.name ? null : crew.name
                      )
                    }
                    className={`w-full cursor-pointer rounded-xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-[#143067] bg-[#143067]/5 shadow-sm"
                        : "border-[#e4e6ea] bg-white hover:border-[#143067]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans text-[15px] font-bold text-[#191c1e]">
                        {crew.name}
                      </h4>
                      <span className="font-mono text-[9px] font-bold tracking-wider text-[#b43024] uppercase">
                        {crew.stages.length}{" "}
                        {crew.stages.length === 1 ? "Etapa" : "Etapas"}
                      </span>
                    </div>
                    <p className="mt-0.5 font-sans text-xs font-semibold text-[#143067]">
                      {crew.role}
                    </p>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-[#444650]">
                      {crew.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Visualización del Tablero de Proceso */}
            <div className="relative flex min-h-[460px] flex-col justify-between rounded-2xl border border-[#e4e6ea] bg-[#f8f9fb] p-6 lg:col-span-7 lg:p-8">
              <h4 className="mb-4 font-sans text-[11px] font-bold tracking-widest text-[#888b96] uppercase">
                Etapas operativas del taller:
              </h4>

              {/* Grid de etapas en el tablero */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {STAGES.map((st) => {
                  // Check if this stage is connected to the selected crew member
                  const isConnected = hoveredCrew
                    ? TEAM_CONNECTIONS.find(
                        (c) => c.name === hoveredCrew
                      )?.stages.includes(st.id)
                    : false;

                  return (
                    <div
                      key={st.id}
                      className={`rounded-xl border p-4 transition-all duration-300 ${
                        isConnected
                          ? "-translate-y-0.5 border-[#143067] bg-[#143067] text-white shadow-md"
                          : hoveredCrew
                            ? "border-[#e4e6ea] bg-white opacity-40"
                            : "border-[#e4e6ea] bg-white text-[#191c1e]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] font-bold ${
                            isConnected ? "text-white/60" : "text-[#b43024]/40"
                          }`}
                        >
                          {st.num}
                        </span>
                        {isConnected && (
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[#b43024]" />
                        )}
                      </div>
                      <div className="mt-3 font-serif text-[14px] font-bold">
                        {st.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info panel */}
              <div className="mt-6 flex items-center justify-between border-t border-[#e4e6ea] pt-4 font-sans text-xs text-[#888b96]">
                <span>
                  {hoveredCrew
                    ? `Mostrando conexiones para: ${hoveredCrew}`
                    : "Pase el cursor sobre un miembro para visualizar flujos"}
                </span>
                <span className="font-mono text-[9px] uppercase">
                  SYS_WORKBOARD_v1
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* DIFERENCIALES (Sección editorial en filas) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-24 lg:px-6">
        <div className="max-w-3xl">
          <span className="block font-sans text-xs font-bold tracking-[0.12em] text-[#b43024] uppercase">
            Diferenciales
          </span>
          <h2 className="mt-3 font-serif text-[32px] font-bold tracking-[-0.015em] text-[#191c1e] md:text-[44px]">
            ¿Por qué nuestro proceso
            <br />
            es diferente?
          </h2>
        </div>

        {/* Lista en filas horizontales sin tarjetas */}
        <div className="mt-14 divide-y divide-[#e4e6ea] border-t border-[#e4e6ea]">
          {[
            {
              title: "Más de veinte años de experiencia acumulada",
              desc: "Nuestra trayectoria nos ha permitido optimizar cada técnica de costura y patronaje, reduciendo errores y garantizando un calce anatómico duradero.",
            },
            {
              title: "Empresa familiar con compromiso real",
              desc: "No respondemos a accionistas anónimos. Respondemos al orgullo de nuestro propio apellido, brindando honestidad y un trato directo en cada uniforme.",
            },
            {
              title: "Equipo especializado con roles definidos",
              desc: "Costureras, patronistas y auditores dedicados exclusivamente a su especialidad para mantener los máximos estándares en cada puntada.",
            },
            {
              title: "Procesos organizados y transparentes",
              desc: "Desde la planificación inicial hasta el control de calidad final, cada lote de prendas sigue un flujo operativo rigurosamente documentado.",
            },
            {
              title: "Control de calidad absoluto prenda a prenda",
              desc: "No auditamos muestras al azar. Revisamos de forma individual el 100% de las costuras y acabados de cada uniforme antes de entregarlo.",
            },
            {
              title: "Atención y personalización en campo",
              desc: "Viajamos directamente a las instalaciones de las empresas para la toma de medidas corporativas individuales, garantizando la comodidad ergonómica.",
            },
            {
              title: "Cultura de mejora continua",
              desc: "Actualizamos periódicamente nuestras metodologías de producción a partir de las valoraciones y feedback recibido por nuestros clientes.",
            },
            {
              title: "Transformación digital desarrollada internamente",
              desc: "Digitalizamos el seguimiento interno del taller para prever cuellos de botella y asegurar entregas a tiempo sin precarizar el oficio artesano.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 items-baseline gap-4 py-6 transition-colors hover:bg-[#edf1f7]/30 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <h3 className="font-serif text-[18px] font-bold text-[#143067] md:text-[20px]">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="font-sans text-[14px] leading-relaxed text-[#444650] md:text-[15px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CIERRE (Bloque elegante claro 300px) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#e4e6ea] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-5">
          <div className="space-y-6">
            <h3 className="font-serif text-[24px] font-bold text-[#191c1e] md:text-[32px]">
              Cada uniforme cuenta una historia antes de ser utilizado.
            </h3>
            <p className="mx-auto max-w-[680px] font-sans text-sm leading-relaxed text-[#444650] md:text-base">
              En Confecciones Liss entendemos que la confianza no se construye
              únicamente con el resultado final, sino con cada decisión tomada
              durante el proceso de confección. Por ello trabajamos con
              organización, experiencia y atención a los detalles desde el
              primer contacto hasta la entrega de cada prenda.
            </p>
            <div className="pt-4">
              <Link
                href="/empresa/calidad"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
              >
                Conocer nuestro compromiso con la calidad
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
