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
    <div className="bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* PORTADA (Hero Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-4 pb-16 md:px-8 md:pt-6 md:pb-24">
        <div className="border-primary/35 rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Título de la Portada */}
            <div className="space-y-6 lg:col-span-6">
              <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                Responsabilidad Social
              </span>
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-7xl">
                Responsabilidad Social
              </h1>
              <p className="border-l-2 border-[#143067] pl-4 font-serif text-lg leading-relaxed font-bold text-[#444650] md:text-2xl">
                Crecer como empresa también significa generar oportunidades,
                compartir conocimiento y contribuir al desarrollo de nuestra
                comunidad en San Miguel.
              </p>
            </div>

            {/* Texto introductorio */}
            <div className="space-y-6 text-base leading-relaxed text-[#444650] lg:col-span-6 lg:pt-14">
              <p>
                Desde sus inicios, Confecciones Liss ha sido una empresa
                familiar vinculada con las personas que la rodean. Aunque somos
                una empresa de tamaño familiar, nuestro crecimiento ha generado
                empleo directo para nuestro equipo y ha impulsado el uso de
                servicios profesionales externos en la región.
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
      {/* SECCIÓN 1: UNA EMPRESA QUE NACIÓ EN LA COMUNIDAD */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="border-primary/35 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <Image
                src="/images/responsabilidad/nuestro-origen.jpg"
                alt="Taller tradicional de costura y confección"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Texto del capítulo */}
          <div className="space-y-6 lg:col-span-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-bold text-[#143067]">
                Nuestro origen
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
                vecinos del cantón comenzaron a confiar en el trabajo, y esa
                confianza permitió que el oficio creciera de forma orgánica, sin
                publicidad ni inversión externa.
              </p>
              <p className="font-semibold text-[#143067]">
                Antes de existir como empresa formal, ya existía un compromiso
                con las personas: cada prenda entregada representaba una
                oportunidad para demostrar que el trabajo bien hecho genera
                relaciones duraderas.
              </p>
              <p>
                Ese vínculo con la comunidad sigue siendo parte de nuestra
                identidad actual en el Barrio La Merced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECCIÓN 2: GENERANDO EMPLEO LOCAL (Línea de Tiempo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-10 lg:gap-16">
            {/* Header del capítulo */}
            <div className="space-y-4 lg:sticky lg:top-32 lg:col-span-6">
              <span className="font-mono text-xs font-bold text-[#143067]">
                Nuestro equipo
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067]">
                Generando empleo local
              </h2>
              <h3 className="font-serif text-lg font-bold text-[#143067] italic">
                Crecer significa crear oportunidades.
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-[#444650]">
                <p>
                  A medida que Confecciones Liss fue creciendo, también surgió
                  la necesidad de incorporar nuevas personas al equipo.
                </p>
                <p>
                  Cada incorporación respondió al aumento real de la demanda y
                  permitió fortalecer distintas áreas del taller: confección,
                  control de calidad, logística y estrategia digital.
                </p>
                <p>
                  El crecimiento del equipo ha significado nuevas oportunidades
                  laborales para personas de San Miguel, fortaleciendo un taller
                  construido con talento local.
                </p>
              </div>
            </div>

            {/* Timeline de Empleo */}
            <div className="ml-4 space-y-12 border-l border-[#143067]/20 pl-6 md:pl-12 lg:col-span-4">
              {/* Hito 2005 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  2005
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Un taller de una sola persona
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  La fundadora trabaja de manera individual desde casa,
                  realizando trabajos de costura a medida y remiendos para la
                  comunidad.
                </p>
              </div>

              {/* Hito Marzo 2021 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  Marzo 2021
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Primera colaboradora del taller
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Lilian Romero se incorpora como primera colaboradora, poco
                  después de la fundación oficial de Confecciones Liss.
                </p>
              </div>

              {/* Hito Agosto 2021 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  Agosto 2021
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Refuerzo del área de confección
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Nubia Vázquez se incorpora al equipo, fortaleciendo la
                  consistencia del proceso productivo.
                </p>
              </div>

              {/* Hito 2022 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  2022
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Incorporación de logística
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Carlos Antonio Molina se integra al equipo para coordinar
                  entregas y atención al cliente.
                </p>
              </div>

              {/* Hito 2023 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  2023
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Refuerzo de producción
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Blanca Martínez se incorpora como operaria de confección,
                  ampliando la capacidad productiva del taller.
                </p>
              </div>

              {/* Hito Enero 2023 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  Enero 2023
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Inicio del área digital
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  Carlos José Molina Villacorta se incorpora al equipo para
                  iniciar el desarrollo de la comunicación digital del taller.
                </p>
              </div>

              {/* Hito Finales de 2025 */}
              <div className="relative space-y-2">
                <div className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-[#143067] bg-white md:-left-[55px]"></div>
                <div className="font-serif text-2xl font-bold text-[#143067]">
                  Finales de 2025
                </div>
                <h4 className="font-serif text-base font-bold text-[#143067]">
                  Incorporación de control de calidad
                </h4>
                <p className="max-w-lg text-xs leading-relaxed text-[#444650]">
                  René Alfonso Méndez se incorpora como responsable de control
                  de calidad y toma de medidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECCIÓN 3: APOSTAMOS POR EL CONOCIMIENTO */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-primary/35 relative overflow-hidden rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          {/* Grid lines background style */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(#143067 1px, transparent 1px), linear-gradient(90deg, #143067 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative z-10">
            {/* Izquierda: Título y texto */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Aprendizaje constante
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
                  nuevos conocimientos en áreas como control de calidad y
                  estrategia digital.
                </p>
                <p className="font-[#143067] font-bold">
                  Cada nueva habilidad incorporada representa una mejora directa
                  para nuestros clientes y un crecimiento para nuestro equipo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECCIÓN 4: DIGITALIZAR TAMBIÉN ES SERVIR */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-10 lg:gap-16">
            {/* Imagen del sitio web */}
            <div className="order-2 flex w-full justify-center lg:order-1 lg:col-span-7">
              <div className="border-primary/35 relative w-full overflow-hidden rounded-lg border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <Image
                  src="/images/responsabilidad/transformacion-digital.png"
                  alt="Plataforma web institucional"
                  width={1920}
                  height={1080}
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* Texto descriptivo */}
            <div className="order-1 space-y-6 lg:order-2 lg:col-span-3">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Transformación digital
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
                  La creación del sitio web y el desarrollo de nuevos canales de
                  comunicación facilitaron el acceso a información clara,
                  cotizaciones, productos y contacto directo con el taller.
                </p>
                <p className="font-bold text-[#143067]">
                  Entendemos la transformación digital como una herramienta para
                  brindar un mejor servicio, mayor transparencia y comunicación
                  más directa con nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECCIÓN 5: NUESTRO COMPROMISO DIARIO (Doble Página Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-primary/35 rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Página Izquierda (Título y Manifiesto) */}
            <div className="space-y-6 lg:col-span-5 lg:border-r lg:border-[#e1e2e5] lg:pr-12">
              <span className="font-mono text-xs font-bold text-[#143067]">
                Compromiso diario
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
            </div>

            {/* Página Derecha (Compromisos listados con aire) */}
            <div className="space-y-8 font-sans text-sm text-[#444650] lg:col-span-7 lg:pl-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Trabajar con honestidad
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Precios claros, cotizaciones transparentes y comunicación
                    sincera sobre los plazos de entrega.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Cumplir los compromisos
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Respeto a los acuerdos y especificaciones definidas en cada
                    pedido.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Respetar el tiempo
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Planificación de la producción para cumplir con las fechas
                    de entrega acordadas.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Generar confianza
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Consistencia en la calidad que permita relaciones
                    comerciales duraderas.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Ambiente de respeto
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Un entorno de trabajo seguro y digno para todo el equipo del
                    taller.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Mejora continua
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Adopción constante de mejores técnicas para perfeccionar
                    nuestro trabajo.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Valorar el trabajo bien hecho
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Cuidado del detalle en cada prenda, frente a la producción
                    masiva sin control de calidad.
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    Representar a San Miguel
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    Confeccionar uniformes que representen con orgullo el
                    trabajo realizado en nuestra región.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* IMPACTO QUE BUSCAMOS DEJAR (Navy Contraste) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="bg-[#143067] px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl">
              Impacto que buscamos dejar
            </h2>
            <div className="h-1 w-12 rounded-full bg-white/40"></div>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-[#dae2ff] lg:col-span-7">
            <p>
              Nuestro objetivo nunca ha sido ser únicamente un taller de
              confección. Queremos ser una empresa que permanezca en el tiempo,
              que genere empleo estable, que impulse el desarrollo de quienes
              forman parte del equipo y que represente con orgullo el trabajo
              realizado en San Miguel.
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
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Mirando hacia adelante
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-[#143067] md:text-5xl">
            El éxito también se mide por el impacto que dejamos.
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#143067]"></div>

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
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
            >
              Contactar al Taller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
