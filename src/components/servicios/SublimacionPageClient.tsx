"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brush,
  Layers,
  Sparkles,
  Flame,
  Wind,
  Check,
  X,
  ChevronDown,
  Printer,
  Shirt,
  MessageSquare,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Definición de tipos
interface ServiceSection {
  heading: string;
  body: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceCard {
  slug: string;
  title: string;
  navLabel: string;
  navIcon: string;
}

interface SublimacionPageClientProps {
  otherServices: ServiceCard[];
}

export default function SublimacionPageClient({
  otherServices,
}: SublimacionPageClientProps) {
  // Estado para el acordeón de FAQs
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Estado para la sección del proceso interactivo
  const [activeStep, setActiveStep] = useState<number>(0);

  // Estado para interactuar con el simulador de camiseta en el Hero
  const [activeJerseyPart, setActiveJerseyPart] = useState<string>("front");

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  const steps = [
    {
      title: "Diseño en Alta Resolución",
      icon: <Brush className="h-6 w-6" />,
      description:
        "Recibimos tu diseño en alta resolución (mínimo 300 DPI) y lo ajustamos milimétricamente a la plantilla exacta de la prenda antes del corte.",
      technical: "Formatos aceptados: .AI, .PSD, .PDF o PNG de alta fidelidad.",
    },
    {
      title: "Impresión Epson Original",
      icon: <Printer className="h-6 w-6" />,
      description:
        "Imprimimos el arte en papel transfer de alta densidad usando tintas Epson originales, garantizando que el perfil cromático sea idéntico al solicitado.",
      technical: "Precisión de inyección microscópica para detalles finos.",
    },
    {
      title: "Calor & Prensa Industrial",
      icon: <Flame className="h-6 w-6" />,
      description:
        "Sometemos la tela y el papel transfer a una temperatura controlada de 200°C durante exactamente 40 segundos en nuestra prensa industrial.",
      technical: "Presión homogénea neumática para evitar imperfecciones.",
    },
    {
      title: "Fusión Molecular",
      icon: <Layers className="h-6 w-6" />,
      description:
        "Debido al calor, la tinta pasa de sólido a gaseoso, penetrando los poros de la fibra de poliéster y solidificándose dentro de ella de manera permanente.",
      technical: "Textura invisible al tacto y retención de color ilimitada.",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "¿Se puede sublimar sobre algodón?",
      answer:
        "No de forma directa. La sublimación requiere fibras de poliéster para que la tinta se fusione molecularmente. Para prendas que contengan algodón, recomendamos nuestro servicio de bordado computarizado o serigrafía tradicional.",
    },
    {
      question: "¿Se decolora con el lavado?",
      answer:
        "No. Al ser una fusión molecular directa con la fibra de poliéster, la tinta no se desprende, no se cuartea ni pierde intensidad cromática. Recomendamos lavar las prendas al revés y evitar el uso de cloro para maximizar la vida útil del tejido.",
    },
    {
      question: "¿Cuántas prendas mínimo puedo pedir?",
      answer:
        "Aceptamos pedidos desde una sola prenda. No exigimos un volumen mínimo, lo que nos permite atender desde deportistas individuales y maratonistas hasta clubes e instituciones completas.",
    },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* ────────────────────────────────────────────────────────
          HERO SECTION (Fondo Azul Marino Corporativo Estricto)
          ──────────────────────────────────────────────────────── */}
      <section className="bg-primary relative flex min-h-[calc(100dvh-56px)] flex-col justify-center overflow-x-hidden px-5 pt-4 pb-10 text-white md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:overflow-hidden lg:pb-4">
        {/* Patrón de líneas sutiles de fondo (estilo cancha deportiva) */}
        <div className="pointer-events-none absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle
              cx="50%"
              cy="50%"
              r="250"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-2xl flex-grow flex-col justify-between py-4 lg:py-6">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Servicios", href: "/servicios" },
              { label: "Sublimación" },
            ]}
            variant="light"
            className="animate-fade-in-up mb-6"
          />

          <div className="grid flex-grow grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Contenido Izquierdo */}
            <div className="flex flex-col lg:col-span-7">
              <div className="border-tertiary/60 bg-tertiary/10 mb-6 inline-flex items-center gap-2 self-start rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase lg:mb-3 xl:mb-6">
                <Sparkles className="text-tertiary h-3.5 w-3.5" />
                Sublimación Textil
              </div>

              <h1 className="font-serif text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                Sublimación Textil <br />
                <span className="text-tertiary">Full Color</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:mt-3 lg:text-sm xl:mt-4 xl:text-base">
                Servicio de impresión textil mediante calor. La técnica ideal
                para prendas de poliéster deportivas donde la tinta pasa a ser
                parte de la fibra, asegurando que nunca se cuartee ni pierda
                color. Ideal para diseños complejos o fotografías.
              </p>

              {/* Grid de features */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-4 lg:gap-3 xl:mt-6 xl:gap-4">
                {[
                  {
                    icon: <Brush className="text-tertiary h-5 w-5" />,
                    title: "Colores vibrantes",
                    desc: "Precisión cromática del 100%",
                  },
                  {
                    icon: <Wind className="text-tertiary h-5 w-5" />,
                    title: "Textura invisible",
                    desc: "El tejido mantiene su peso",
                  },
                  {
                    icon: <Layers className="text-tertiary h-5 w-5" />,
                    title: "No se decolora",
                    desc: "Soporta lavados industriales",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 lg:flex-row lg:items-center lg:p-2.5 xl:flex-col xl:items-start xl:p-4"
                  >
                    <div className="shrink-0 self-start rounded-lg bg-white/10 p-2 lg:p-1.5 xl:p-2">
                      {item.icon}
                    </div>
                    <div className="lg:flex lg:flex-col">
                      <h3 className="text-sm font-semibold text-white lg:text-xs xl:text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/60 lg:hidden xl:block">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex flex-wrap gap-4 lg:mt-4 lg:gap-3 xl:mt-6 xl:gap-4">
                <a
                  href={siteConfig.links.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-tertiary hover:bg-tertiary/90 shadow-tertiary/20 flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] lg:px-5 lg:py-3 lg:text-sm xl:px-8 xl:py-4 xl:text-base"
                >
                  <MessageSquare className="h-5 w-5" />
                  Cotizar sublimación
                </a>
                <a
                  href="#proceso-sublimacion"
                  className="flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 lg:px-5 lg:py-3 lg:text-sm xl:px-8 xl:py-4 xl:text-base"
                >
                  Ver nuestro proceso
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Simulador Interactivo Derecho */}
            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:max-w-xs lg:p-4 xl:max-w-sm xl:p-6">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="bg-tertiary h-2.5 w-2.5 animate-pulse rounded-full" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                </div>
                <div className="mb-6 text-center lg:mb-2 xl:mb-6">
                  <h3 className="text-xs font-semibold tracking-wider text-white/60 uppercase">
                    Interactúa con el Mockup
                  </h3>
                  <p className="text-[10px] text-white/40 lg:hidden xl:block">
                    Selecciona una parte de la prenda para ver detalles
                  </p>
                </div>

                {/* Camiseta SVG */}
                <div className="relative flex h-64 w-full items-center justify-center lg:h-36 xl:h-56 2xl:h-64">
                  <svg
                    viewBox="0 0 100 100"
                    className="h-full max-h-56 w-full transition-transform duration-300 hover:scale-105 lg:max-h-32 xl:max-h-48 2xl:max-h-56"
                  >
                    {/* Manga Izquierda */}
                    <path
                      d="M 18 25 L 30 18 L 36 28 L 22 38 Z"
                      fill={
                        activeJerseyPart === "sleeves" ? "#b43024" : "#143067"
                      }
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => setActiveJerseyPart("sleeves")}
                    />
                    {/* Manga Derecha */}
                    <path
                      d="M 82 25 L 70 18 L 64 28 L 78 38 Z"
                      fill={
                        activeJerseyPart === "sleeves" ? "#b43024" : "#143067"
                      }
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => setActiveJerseyPart("sleeves")}
                    />
                    {/* Cuerpo (Frente) */}
                    <path
                      d="M 30 18 L 70 18 L 72 75 L 28 75 Z"
                      fill={
                        activeJerseyPart === "front" ? "#143067" : "#1e3b7a"
                      }
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => setActiveJerseyPart("front")}
                    />
                    {/* Cuello */}
                    <path
                      d="M 42 18 C 42 24, 58 24, 58 18 Z"
                      fill={
                        activeJerseyPart === "collar" ? "#b43024" : "#f8f9fb"
                      }
                      stroke="#ffffff"
                      strokeWidth="1"
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => setActiveJerseyPart("collar")}
                    />
                    {/* Patrón deportivo sublimado sobre el frente */}
                    {activeJerseyPart === "front" && (
                      <g className="pointer-events-none opacity-40">
                        {/* Rayas abstractas deportivas */}
                        <path
                          d="M 32 30 L 48 65 L 50 65 L 34 30 Z"
                          fill="#b43024"
                        />
                        <path
                          d="M 38 25 L 56 68 L 58 68 L 40 25 Z"
                          fill="#b43024"
                        />
                        <path
                          d="M 50 20 L 64 55 L 66 55 L 52 20 Z"
                          fill="#b43024"
                        />
                        <circle cx="62" cy="35" r="4" fill="#b43024" />
                      </g>
                    )}
                    {/* Patrón deportivo sobre mangas */}
                    {activeJerseyPart === "sleeves" && (
                      <g className="pointer-events-none opacity-40">
                        <line
                          x1="22"
                          y1="22"
                          x2="28"
                          y2="34"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <line
                          x1="78"
                          y1="22"
                          x2="72"
                          y2="34"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      </g>
                    )}
                  </svg>
                </div>

                {/* Explicación de la parte activa */}
                <div className="mt-6 rounded-xl border border-white/5 bg-white/5 p-3 text-center lg:mt-3 lg:p-2 xl:mt-6 xl:p-3">
                  {activeJerseyPart === "front" && (
                    <>
                      <h4 className="text-xs font-semibold text-white">
                        Cuerpo y Arte Principal
                      </h4>
                      <p className="mt-1 text-[11px] text-white/70">
                        Estampados infinitos de borde a borde. La tinta se une a
                        la fibra sin añadir peso.
                      </p>
                    </>
                  )}
                  {activeJerseyPart === "sleeves" && (
                    <>
                      <h4 className="text-xs font-semibold text-white">
                        Mangas y Detalles
                      </h4>
                      <p className="mt-1 text-[11px] text-white/70">
                        Sublimación completa en mangas con rayas, logos y
                        colores idénticos al resto de la prenda.
                      </p>
                    </>
                  )}
                  {activeJerseyPart === "collar" && (
                    <>
                      <h4 className="text-xs font-semibold text-white">
                        Cuello Terminado
                      </h4>
                      <p className="mt-1 text-[11px] text-white/70">
                        Confección y unión perfecta de piezas sublimadas con
                        costura reforzada deportiva.
                      </p>
                    </>
                  )}
                </div>

                {/* Selector manual en mobile/desktop */}
                <div className="mt-4 flex justify-center gap-2 lg:mt-3 xl:mt-4">
                  {["front", "sleeves", "collar"].map((part) => (
                    <button
                      key={part}
                      onClick={() => setActiveJerseyPart(part)}
                      className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-all ${
                        activeJerseyPart === part
                          ? "bg-tertiary text-white"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                    >
                      {part === "front"
                        ? "Cuerpo"
                        : part === "sleeves"
                          ? "Mangas"
                          : "Cuello"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          COMPARATIVE SECTION (Sublimación vs Estampado Tradicional)
          ──────────────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest px-5 py-20 md:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-primary font-serif text-3xl font-bold md:text-4xl">
              Sublimación vs. Estampado Tradicional
            </h2>
            <p className="text-on-surface-variant mt-4 text-sm sm:text-base">
              Comprende por qué la sublimación es la técnica por excelencia para
              prendas deportivas frente a la serigrafía o vinil.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {/* Sublimación */}
            <div className="border-primary/20 relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="bg-primary absolute top-0 right-0 left-0 h-1.5" />
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary-container rounded-xl p-3">
                  <Shirt className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-primary font-serif text-xl font-bold">
                    Sublimación Textil
                  </h3>
                  <p className="text-primary/75 text-xs font-medium">
                    Fusión Molecular Permanente
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Fusión molecular permanente: la tinta penetra y pasa a ser parte integral de la fibra de poliéster.",
                  "Textura invisible al tacto: no añade rigidez, peso ni interrumpe la caída natural de la tela.",
                  "Transpirabilidad del 100%: los poros del tejido no se bloquean, manteniendo el rendimiento deportivo.",
                  "Diseños sin límites cromáticos: degradados, fotografías y detalles milimétricos al mismo costo.",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="text-on-surface-variant flex items-start gap-3 text-sm"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Estampado Tradicional */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-slate-300" />
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3">
                  <X className="h-6 w-6 text-slate-500" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-700">
                    Estampado Tradicional
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    Serigrafía y Vinilo Térmico
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Capa superficial plástica: la tinta o el vinilo se asientan gruesos encima de la tela.",
                  "Desgaste físico: el estampado tiende a cuartearse, agrietarse o pelarse tras ciclos de lavado.",
                  "Bloqueo de la transpiración: la capa impermeable retiene el sudor en actividades de alta intensidad.",
                  "Limitación por colores: cada color requiere una pantalla o corte diferente, encareciendo el diseño.",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="text-on-surface-variant flex items-start gap-3 text-sm"
                  >
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          INTERACTIVE TIMELINE SECTION (Nuestro Proceso)
          ──────────────────────────────────────────────────────── */}
      <section
        id="proceso-sublimacion"
        className="bg-surface-container-low px-5 py-20 md:px-8"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-primary font-serif text-3xl font-bold md:text-4xl">
              Nuestro Proceso de Sublimación
            </h2>
            <p className="text-on-surface-variant mt-4 text-sm sm:text-base">
              Garantizamos la máxima precisión y durabilidad a través de una
              metodología técnica de 4 etapas en nuestro taller.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Selector de pasos (Izquierda) */}
            <div className="flex flex-col justify-between gap-3 lg:col-span-5">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                    activeStep === idx
                      ? "bg-primary border-primary text-white shadow-md"
                      : "text-on-surface border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`shrink-0 rounded-lg p-3 ${
                      activeStep === idx
                        ? "bg-white/10 text-white"
                        : "bg-primary-container text-primary"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${
                        activeStep === idx ? "text-white/60" : "text-primary/70"
                      }`}
                    >
                      Paso {idx + 1}
                    </span>
                    <h3 className="font-serif text-base leading-tight font-bold">
                      {step.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Panel de detalles (Derecha) */}
            <div className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                    Detalle Técnico
                  </span>
                  <span className="text-tertiary bg-tertiary/10 rounded-md px-2.5 py-1 text-xs font-bold">
                    Etapa {activeStep + 1} / 4
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-primary font-serif text-2xl font-bold">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed sm:text-base">
                      {steps[activeStep].description}
                    </p>

                    <div className="border-tertiary mt-6 rounded-r-lg border-l-4 bg-slate-50 p-4">
                      <h4 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                        Especificación técnica del taller
                      </h4>
                      <p className="text-on-surface-variant mt-1 text-xs font-medium">
                        {steps[activeStep].technical}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Simulador visual del paso */}
              <div className="border-slate-150 relative mt-8 flex h-36 items-center justify-center overflow-hidden rounded-xl border bg-slate-50 p-4">
                {activeStep === 0 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <div className="border-primary/40 text-primary/40 flex h-10 w-10 items-center justify-center rounded border-2 border-dashed font-mono text-xs">
                        SVG
                      </div>
                      <ArrowRight className="text-primary/40 h-4 w-4 self-center" />
                      <div className="border-primary/80 bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded border-2 font-mono text-xs font-bold">
                        300DPI
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">
                      Alineación automática de capas y sangrados
                    </span>
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="flex w-full max-w-xs flex-col items-center gap-2">
                    <div className="h-2 w-full overflow-hidden rounded bg-slate-200">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                        }}
                        className="bg-primary h-full"
                      />
                    </div>
                    <div className="flex gap-4 font-mono text-xs font-bold text-slate-500">
                      <span>C: 100%</span>
                      <span>M: 100%</span>
                      <span>Y: 100%</span>
                      <span>K: 100%</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">
                      Capa densa de tinta Epson sobre papel transfer
                    </span>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-1.5">
                    {/* Prensa con animación de calor */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                        className="border-tertiary flex h-4 w-16 items-center justify-center rounded-t border-b-2 bg-slate-700 text-[8px] font-bold text-white"
                      >
                        PRENSA
                      </motion.div>
                      <div className="bg-tertiary h-1 w-20 animate-pulse" />
                      <div className="h-4 w-16 rounded-b bg-slate-200" />
                    </div>
                    <span className="text-tertiary animate-pulse text-[10px] font-bold">
                      ▲ 200°C | ⏳ 40s
                    </span>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="bg-primary h-2.5 w-2.5 rounded-full" />
                      <div className="bg-tertiary/40 h-4 w-1 rounded-full" />
                      <div className="bg-tertiary h-2.5 w-2.5 rounded-full" />
                    </div>
                    <span className="text-primary text-xs font-bold">
                      Tinta integrada en la molécula del Poliéster
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Resistencia permanente y tacto cero
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          FAQ SECTION (Acordeones interactivos)
          ──────────────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest border-t border-slate-100 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-screen-md">
          <div className="mb-12 text-center">
            <h2 className="text-primary font-serif text-3xl font-bold">
              Preguntas Frecuentes
            </h2>
            <p className="text-on-surface-variant mt-3 text-sm">
              Resolvemos tus dudas sobre el servicio de sublimación.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="text-primary pr-4 text-sm font-semibold sm:text-base">
                      {faq.question}
                    </span>
                    <div className="bg-primary-container text-primary shrink-0 rounded-full p-1">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="text-on-surface-variant border-t border-slate-100 p-5 pt-0 text-xs leading-relaxed sm:text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CTA SECTION (Diseño Limpio, Azul y Rojo Corporativo)
          ──────────────────────────────────────────────────────── */}
      <section className="bg-surface-container-low border-t border-slate-200 px-5 py-12 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <div className="from-primary to-primary/90 border-primary/20 relative overflow-hidden rounded-3xl border bg-gradient-to-r p-8 text-white shadow-lg md:p-12">
            {/* Detalle decorativo rojo en esquina */}
            <div className="bg-tertiary pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-bl-full opacity-85" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="max-w-2xl space-y-3 text-center lg:text-left">
                <h2 className="font-serif text-2xl leading-tight font-bold md:text-3xl">
                  ¿Tienes un diseño llamativo en mente?
                </h2>
                <p className="text-sm text-white/75 sm:text-base">
                  Podemos plasmarlo en tela con 100% de precisión cromática.
                  Envíanos tu arte por WhatsApp.
                </p>
              </div>

              <a
                href={siteConfig.links.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary flex shrink-0 items-center gap-2 self-center rounded-xl bg-white px-8 py-4 text-sm font-bold shadow-md transition-all hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98] sm:text-base"
              >
                <MessageSquare className="text-tertiary h-5 w-5" />
                Cotizar sublimación
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          OTROS SERVICIOS
          ──────────────────────────────────────────────────────── */}
      <section className="bg-surface px-5 py-16 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="text-primary mb-8 text-center font-serif text-xl font-bold sm:text-2xl">
            Otros servicios que ofrecemos en nuestro taller
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {otherServices.map((page) => (
              <Link
                key={page.slug}
                href={`/servicios/${page.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.97]"
              >
                <span className="material-symbols-outlined text-primary text-3xl transition-transform duration-300 group-hover:scale-110">
                  {page.navIcon}
                </span>
                <span className="text-on-surface text-xs leading-snug font-bold">
                  {page.navLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
