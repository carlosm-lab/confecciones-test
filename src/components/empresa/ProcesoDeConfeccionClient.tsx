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
    name: "Iris Lisseth Villacorta de Molina",
    role: "Fundadora y Directora General",
    desc: "Dirige la operación general del taller y supervisa cada etapa del proceso de confección.",
    stages: ["analisis", "corte", "calidad"],
  },
  {
    name: "Lilian Romero",
    role: "Especialista en confección",
    desc: "Encargada del ensamble de prendas del taller con experiencia en uniformes formales y médicos.",
    stages: ["confeccion"],
  },
  {
    name: "Nubia Vázquez",
    role: "Especialista en confección de prendas",
    desc: "Garantiza uniformidad y calidad de costura en lotes escolares y empresariales.",
    stages: ["confeccion"],
  },
  {
    name: "Blanca Martínez",
    role: "Operaria de producción",
    desc: "Apoya en la preparación de materiales, habilitado y forros antes de la confección.",
    stages: ["materiales", "corte"],
  },
  {
    name: "René Alfonso Méndez",
    role: "Control de calidad y toma de medidas",
    desc: "Realiza la toma de medidas con el cliente y la revisión final de calidad de cada prenda.",
    stages: ["medidas", "calidad"],
  },
  {
    name: "Carlos Antonio Molina",
    role: "Logística y atención al cliente",
    desc: "Gestiona la adquisición de insumos, el empaque y la coordinación de entregas con el cliente.",
    stages: ["materiales", "empaque", "entrega"],
  },
  {
    name: "Carlos José Molina Villacorta",
    role: "Estrategia digital",
    desc: "Gestiona la comunicación digital y la atención al cliente por canales en línea.",
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
      <section className="relative border-b border-[#e4e6ea] bg-[#f8f9fb] px-5 pt-4 pb-12 md:px-8 md:pt-6 md:pb-20">
        <div className="mx-auto w-full max-w-screen-2xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Lado Izquierdo: Textos */}
            <div className="space-y-6 lg:col-span-7">
              <span className="block font-sans text-xs font-bold tracking-[0.12em] text-[#143067] uppercase">
                Nuestro Proceso
              </span>
              <h1 className="font-serif text-[40px] leading-tight font-bold tracking-[-0.02em] text-[#191c1e] md:text-[56px]">
                Del primer contacto a la entrega final.
              </h1>
              <p className="max-w-2xl font-sans text-[16px] leading-[26px] text-[#444650] md:text-[18px] md:leading-[28px]">
                Cada uniforme que confeccionamos sigue un proceso definido,
                construido a partir de más de veinte años de experiencia
                práctica. Desde el primer contacto con el cliente hasta la
                entrega final, cada etapa tiene un propósito y cada integrante
                del equipo cumple una función específica para garantizar la
                calidad de la prenda.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
                <button
                  onClick={() => handleScrollTo("primer-contacto")}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
                >
                  Ver el Proceso Completo
                </button>
                <Link
                  href="/empresa/equipo"
                  className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-[#143067] bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-[#143067] transition-all hover:bg-[#edf1f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
                >
                  Conocer Nuestro Equipo
                </Link>
              </div>
            </div>

            {/* Lado Derecho: Imagen de Costura */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="border-primary/35 relative flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    fill
                    src="/images/servicios/mano-obra.png"
                    alt="Proceso de Confección - Confecciones Liss"
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* LAS 10 ETAPAS DEL PROCESO */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="space-y-16 py-16 md:space-y-24 md:py-24">
        {/* ETAPA 1: Primer contacto */}
        <section
          id="primer-contacto"
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
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
                <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                  01
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
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
                  Durante esta primera etapa escuchamos las necesidades del
                  cliente, resolvemos dudas y recopilamos la información
                  necesaria para comprender el proyecto: tipo de uniforme,
                  cantidad y si se requiere personalización.
                </p>
                <p className="font-medium text-[#143067]">
                  Si el pedido es por tallas estándar, se recibe el adelanto
                  correspondiente y el proyecto pasa directamente a registro. Si
                  es un pedido a la medida, se coordina la visita del cliente al
                  taller para la toma de medidas.
                </p>
              </div>
            </div>
            <div className="flex justify-center md:col-span-6">
              <div className="border-primary/35 relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border bg-white p-2 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
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
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="flex items-baseline gap-4 border-b border-[#e4e6ea] pb-4">
              <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                02
              </span>
              <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                Análisis del proyecto
              </span>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
              {/* Bloque Principal */}
              <div className="flex flex-col justify-between rounded-[16px] border border-[#e4e6ea] bg-white p-8 md:col-span-4">
                <div className="space-y-4">
                  <h3 className="font-serif text-[24px] font-bold text-[#191c1e]">
                    Estudio de viabilidad del pedido
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                    Cada solicitud es diferente. Antes de comenzar la
                    producción, analizamos el tipo de uniforme, la cantidad
                    requerida, las personalizaciones solicitadas y los
                    materiales necesarios.
                  </p>
                </div>
                <div className="mt-6 font-mono text-[10px] font-bold tracking-wider text-[#143067] uppercase">
                  &nbsp;
                </div>
              </div>

              {/* Bloque 1: Tipo de uniforme */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Tipo de uniforme
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Definimos el diseño y el patrón adecuado para uso escolar,
                    médico o empresarial.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  &nbsp;
                </span>
              </div>

              {/* Bloque 2: Cantidad */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Volumen y lotes
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Organizamos la producción según la cantidad de prendas
                    requeridas por el pedido.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  &nbsp;
                </span>
              </div>

              {/* Bloque 3: Personalización */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Detalles y bordados
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Especificamos logotipos, técnicas de bordado y acabados
                    especiales para fortalecer tu identidad institucional.
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#888b96] uppercase">
                  &nbsp;
                </span>
              </div>

              {/* Bloque 4: Materiales & Tallas */}
              <div className="flex flex-col justify-between space-y-2 rounded-[16px] border border-[#e4e6ea] bg-white p-6 md:col-span-2">
                <div>
                  <h4 className="font-sans text-[15px] font-bold text-[#143067]">
                    Insumos & Tallas
                  </h4>
                  <p className="mt-1 font-sans text-xs text-[#444650]">
                    Confirmamos la curva de tallas y la disponibilidad de telas
                    base para el proyecto.
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
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
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
              <div className="border-primary/35 relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border bg-white p-2 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
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
                <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                  03
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                  Toma de medidas
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Ajuste real para cada cliente
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Cuando el proyecto lo requiere, realizamos la toma de medidas
                  para garantizar un ajuste adecuado. Esta etapa se realiza con
                  la asistencia presencial del cliente en el taller, donde se
                  registran las medidas necesarias para elaborar una prenda
                  acorde a sus características físicas.
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
          <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-5 lg:px-6">
            <motion.div
              variants={animationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                  04
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                  Materiales
                </span>
              </div>

              {/* 5 bloques grandes */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {[
                  {
                    title: "Tela",
                    desc: "Seleccionada según el uso del uniforme: escolar, médico o empresarial.",
                  },
                  {
                    title: "Hilo",
                    desc: "Resistente, adecuado para costuras de uso diario.",
                  },
                  {
                    title: "Accesorios",
                    desc: "Botones, cierres y elementos complementarios según el diseño.",
                  },
                  {
                    title: "Colores",
                    desc: "Definidos según la identidad institucional o preferencia del cliente.",
                  },
                  {
                    title: "Insumos",
                    desc: "Entretelas y forros que aportan estructura y durabilidad a la prenda.",
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
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
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
                <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                  05
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                  Corte
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Modelado y corte de cada pieza
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Con las medidas y materiales preparados, el proyecto pasa al
                  área de modelado y corte. Cada pieza se traza y se corta
                  cuidadosamente siguiendo el patrón correspondiente,
                  manteniendo la uniformidad necesaria antes de pasar al área de
                  confección.
                </p>
              </div>
            </div>
            {/* Foto derecha */}
            <div className="flex justify-center">
              <div className="border-primary/35 relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border bg-white p-2 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
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
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                06
              </span>
              <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                Confección
              </span>
            </div>

            <div className="border-primary/35 relative overflow-hidden rounded-[24px] border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
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
                    desc: "Ensamblaje de cada pieza siguiendo el patrón de la prenda.",
                  },
                  {
                    title: "Ensamblaje",
                    desc: "Unión progresiva de las piezas hasta formar el uniforme completo.",
                  },
                  {
                    title: "Acabados",
                    desc: "Bastillas, ojales y refuerzos en zonas de mayor uso.",
                  },
                  {
                    title: "Revisión continua",
                    desc: "Verificación de costuras durante el proceso, antes de avanzar a la siguiente etapa.",
                  },
                ].map((panel, idx) => (
                  <div
                    key={idx}
                    className="border-primary/35 rounded-xl border bg-white/95 p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] backdrop-blur-sm"
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
              Las piezas cortadas pasan al área de confección, donde el equipo
              especializado realiza el ensamblaje utilizando maquinaria
              industrial y la experiencia acumulada durante años de trabajo.
            </p>
          </motion.div>
        </section>

        {/* ETAPA 7: Personalización (Tarjetas suspendidas) */}
        <section
          id="personalizacion"
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
        >
          <motion.div
            variants={animationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                07
              </span>
              <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                Personalización
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                  Bordados y detalles institucionales
                </h2>
                <p className="font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                  Cuando el proyecto lo requiere, incorporamos bordados,
                  identificaciones u otros elementos personalizados, respetando
                  las especificaciones gráficas de la institución o empresa.
                </p>
              </div>

              {/* Grid de Tarjetas Suspendidas */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Bordado",
                    desc: "Escudos y logotipos institucionales reproducidos con fidelidad.",
                  },
                  {
                    title: "Logotipos",
                    desc: "Aplicación de marcas o insignias según el diseño solicitado.",
                  },
                  {
                    title: "Identificaciones",
                    desc: "Etiquetas y elementos de identificación personal cuando se requieren.",
                  },
                  {
                    title: "Detalles",
                    desc: "Acabados finales como botones reforzados u ojales.",
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="border-primary/35 rounded-xl border bg-white p-5 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
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
          <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-5 lg:px-6">
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
                  Revisión antes de cada entrega
                </h2>
                <p className="font-sans text-sm leading-relaxed text-white/80 md:text-base">
                  Antes de considerar terminada una prenda, René Alfonso Méndez
                  revisa todas las costuras, pliegues y bordados para confirmar
                  que estén en orden. Se verifica que las costuras soporten
                  estiramiento y temperatura, y que los bordados no se
                  deshilachen con el roce o el uso. Además se realizan pruebas
                  de desgarre, planchado y lavado para asegurar la calidad final
                  del uniforme.
                </p>
              </div>

              {/* Grid con líneas finas (sin iconos) */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:col-span-7">
                <h3 className="mb-6 font-sans text-[11px] font-bold tracking-widest text-white/50 uppercase">
                  Puntos de inspección técnica:
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 divide-y divide-white/10 md:grid-cols-3 md:divide-y-0">
                  {[
                    {
                      label: "Costuras",
                      desc: "Resistencia y ausencia de hilos sueltos.",
                    },
                    {
                      label: "Acabados",
                      desc: "Revisión de sobrehilos y bastillas.",
                    },
                    {
                      label: "Presentación",
                      desc: "Limpieza textil y planchado correcto.",
                    },
                    {
                      label: "Medidas",
                      desc: "Verificación contra las medidas registradas del pedido.",
                    },
                    {
                      label: "Detalles",
                      desc: "Refuerzo en botones y ojales.",
                    },
                    {
                      label: "Estado general",
                      desc: "Revisión final de uniformidad y acabado de la prenda.",
                    },
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
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
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
              <div className="border-primary/35 relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border bg-white p-2 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
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
                <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                  09
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                  Empaque
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Preparación final y empaque
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  Una vez aprobadas en control de calidad, las prendas pasan al
                  área de planchado manual para mejorar su presentación. Después
                  se empacan y se notifica al cliente para coordinar el retiro o
                  el envío a domicilio.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ETAPA 10: Entrega (Cierre visual potente) */}
        <section
          id="entrega"
          className="mx-auto w-full max-w-screen-2xl scroll-mt-28 px-4 sm:px-5 lg:px-6"
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
                <span className="font-serif text-[48px] leading-none font-bold text-[#143067]/20 md:text-[64px]">
                  10
                </span>
                <span className="font-sans text-xs font-bold tracking-[0.1em] text-[#143067] uppercase">
                  Entrega
                </span>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#191c1e] md:text-[36px]">
                Un uniforme listo para el trabajo diario
              </h2>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                <p>
                  El proceso concluye cuando el cliente recibe el uniforme
                  confeccionado con dedicación y atención al detalle. La entrega
                  puede realizarse directamente en nuestro taller de Barrio La
                  Merced, o mediante envío a domicilio, con el saldo pendiente
                  pagadero contra entrega.
                </p>
              </div>
            </div>
            {/* Foto derecha */}
            <div className="flex justify-center">
              <div className="border-primary/35 relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-[16px] border bg-white p-2 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
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
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-5 lg:px-6">
          <div className="text-center">
            <span className="block font-sans text-xs font-bold tracking-[0.12em] text-[#143067] uppercase">
              Nuestro Equipo en Acción
            </span>
            <h2 className="mt-3 font-serif text-[28px] font-bold tracking-[-0.015em] text-[#191c1e] md:text-[36px]">
              Quién participa en cada etapa
            </h2>
            <p className="mx-auto mt-2 max-w-[500px] font-sans text-[15px] text-[#444650]">
              Cada etapa del proceso de confección está a cargo de un integrante
              del equipo con una función específica.
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
                      <span className="font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
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
                            isConnected ? "text-white/60" : "text-[#143067]/40"
                          }`}
                        >
                          {st.num}
                        </span>
                        {isConnected && (
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[#143067]" />
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
                    : "Selecciona a un integrante del equipo para ver en qué etapas participa."}
                </span>
                <span className="font-mono text-[9px] uppercase">&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* DIFERENCIALES (Sección editorial en filas) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-5 md:py-24 lg:px-6">
        <div className="max-w-3xl">
          <span className="block font-sans text-xs font-bold tracking-[0.12em] text-[#143067] uppercase">
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
              desc: "Nuestra trayectoria, iniciada en 2005, nos ha permitido perfeccionar técnicas de costura y patronaje a lo largo de los años.",
            },
            {
              title: "Empresa familiar con trato directo",
              desc: "Somos una empresa familiar. El trato con cada cliente es directo, sin intermediarios.",
            },
            {
              title: "Equipo especializado con roles definidos",
              desc: "Cada integrante del equipo cumple una función específica dentro del proceso de confección, lo que permite mantener un estándar de calidad en cada etapa.",
            },
            {
              title: "Proceso organizado y transparente",
              desc: "Desde el primer contacto hasta la entrega final, cada pedido sigue un flujo de trabajo definido.",
            },
            {
              title: "Revisión de calidad en cada prenda",
              desc: "Cada uniforme pasa por una revisión de costuras, acabados y presentación antes de ser entregado.",
            },
            {
              title: "Atención personalizada en pedidos a la medida",
              desc: "Para pedidos a la medida, coordinamos la toma de medidas directamente con el cliente en nuestro taller.",
            },
            {
              title: "Cultura de mejora continua",
              desc: "Buscamos constantemente formas de mejorar nuestros procesos y la calidad de nuestro trabajo.",
            },
            {
              title: "Transformación digital desarrollada internamente",
              desc: "Desde 2026 contamos con una estrategia digital propia que facilita la comunicación y el acceso a información sobre nuestros servicios.",
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
              durante el proceso de confección. Por eso trabajamos con
              organización, experiencia y atención a los detalles desde el
              primer contacto hasta la entrega de cada prenda.
            </p>
            <div className="pt-4">
              <Link
                href="/empresa/calidad"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
              >
                Conocer Nuestro Control de Calidad
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
