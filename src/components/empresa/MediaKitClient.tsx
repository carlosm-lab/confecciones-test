"use client";

import Image from "next/image";
import Link from "next/link";

export default function MediaKitClient() {
  return (
    <div className="overflow-x-hidden bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* CABECERA (Max-height 380px, Split 60/40) */}
      {/* ──────────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 pt-4 pb-10 md:px-8 md:pt-6">
        <div className="border-primary/35 flex flex-col items-center justify-between gap-6 overflow-hidden rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:max-h-[380px] md:flex-row md:p-8">
          {/* Columna Izquierda: Textos */}
          <div className="space-y-4 md:w-3/5">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              RECURSOS DE MARCA
            </span>
            <h1 className="font-serif text-3xl leading-tight font-bold text-[#143067] md:text-5xl">
              Media Kit
            </h1>
            <p className="font-serif text-sm leading-relaxed text-[#444650] md:text-base">
              Recursos oficiales para medios de comunicación, periodistas,
              creadores de contenido, instituciones y colaboradores.
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-[#444650]">
              Esta página reúne los recursos oficiales de Confecciones Liss para
              facilitar la correcta utilización de la marca en publicaciones,
              notas de prensa, colaboraciones y proyectos institucionales.
            </p>

            {/* Botones Horizontales */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                disabled
                className="cursor-not-allowed rounded bg-[#143067] px-4 py-2 font-mono text-[10px] tracking-wider text-white uppercase opacity-50"
              >
                Descargar Logos
              </button>
              <button
                disabled
                className="cursor-not-allowed rounded border border-[#e1e2e5] bg-white px-4 py-2 font-mono text-[10px] tracking-wider text-[#143067] uppercase opacity-50"
              >
                Descargar Manual
              </button>
              <button
                disabled
                className="cursor-not-allowed rounded border border-[#e1e2e5] bg-white px-4 py-2 font-mono text-[10px] tracking-wider text-[#143067] uppercase opacity-50"
              >
                Descargar Fotos
              </button>
            </div>
          </div>

          {/* Columna Derecha: Mockup Logotipo */}
          <div className="flex aspect-[4/3] h-full max-h-[220px] items-center justify-center rounded border border-[#e1e2e5] bg-[#f8f9fb] p-6 md:w-2/5">
            <svg
              className="h-auto w-full max-w-[180px] fill-current text-[#143067]"
              viewBox="0 0 100 40"
              aria-hidden="true"
            >
              <rect
                x="5"
                y="5"
                width="20"
                height="30"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M 10,12 H 20 M 10,18 H 20 M 10,24 H 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="32"
                y="26"
                className="font-serif text-base font-bold tracking-tight"
              >
                Liss
              </text>
            </svg>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 1: IDENTIDAD VISUAL (~500px, Split 30/70) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto min-h-[500px] max-w-[1600px] border-b border-[#e1e2e5] px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Columna Izquierda (30%) */}
          <div className="space-y-4 lg:col-span-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Especificaciones
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Identidad Visual
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
            <p className="max-w-sm text-xs leading-relaxed text-[#444650]">
              Nuestra identidad visual representa precisión, orden y
              profesionalidad. A continuación se presentan las variaciones de
              logotipo autorizadas y los colores del taller.
            </p>
          </div>

          {/* Columna Derecha (70% - Tablero con 8 módulos asimétricos) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {/* Módulo 1: Logo Principal */}
            <div className="flex aspect-square flex-col justify-between rounded border border-[#e1e2e5] bg-white p-4">
              <span className="font-mono text-[9px] text-[#444650]/60">
                01 // LOGO PRINCIPAL
              </span>
              <div className="flex items-center justify-center py-4 text-[#143067]">
                <svg
                  className="h-auto w-24 fill-current"
                  viewBox="0 0 100 30"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="16"
                    height="26"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="8"
                    x2="14"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="13"
                    x2="14"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text x="24" y="20" className="font-serif text-sm font-bold">
                    Liss
                  </text>
                </svg>
              </div>
              <span className="text-center font-mono text-[9px] font-bold text-[#143067]">
                USO ESTÁNDAR
              </span>
            </div>

            {/* Módulo 2: Logo Monocromático */}
            <div className="flex aspect-square flex-col justify-between rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4">
              <span className="font-mono text-[9px] text-[#444650]/60">
                02 // MONOCROMÁTICO
              </span>
              <div className="flex items-center justify-center py-4 text-[#444650]">
                <svg
                  className="h-auto w-24 fill-current"
                  viewBox="0 0 100 30"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="16"
                    height="26"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="8"
                    x2="14"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="13"
                    x2="14"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text x="24" y="20" className="font-serif text-sm font-bold">
                    Liss
                  </text>
                </svg>
              </div>
              <span className="text-center font-mono text-[9px] text-[#444650]">
                GRIS ALTA RESOLUCIÓN
              </span>
            </div>

            {/* Módulo 3: Logo Negativo */}
            <div className="flex aspect-square flex-col justify-between rounded border border-[#143067] bg-[#143067] p-4 text-white">
              <span className="font-mono text-[9px] text-white/60">
                03 // NEGATIVO
              </span>
              <div className="flex items-center justify-center py-4 text-white">
                <svg
                  className="h-auto w-24 fill-current"
                  viewBox="0 0 100 30"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="16"
                    height="26"
                    rx="1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="8"
                    x2="14"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="6"
                    y1="13"
                    x2="14"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text x="24" y="20" className="font-serif text-sm font-bold">
                    Liss
                  </text>
                </svg>
              </div>
              <span className="text-center font-mono text-[9px] text-white/80">
                FONDO OSCURO
              </span>
            </div>

            {/* Módulo 4: Color Primario */}
            <div className="flex aspect-square flex-col justify-between rounded bg-[#143067] p-4 text-white">
              <span className="font-mono text-[9px] text-white/60">
                04 // COLOR PRIMARIO
              </span>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold">Azul Marino</p>
                <p className="font-mono text-[9px] text-white/80">
                  HEX: #143067
                </p>
                <p className="font-mono text-[9px] text-white/80">
                  RGB: 20, 48, 103
                </p>
              </div>
              <span className="font-mono text-[9px] text-white/80">
                PRIMARIO INSTITUCIONAL
              </span>
            </div>

            {/* Módulo 5: Color Secundario */}
            <div className="flex aspect-square flex-col justify-between rounded bg-[#143067] p-4 text-white">
              <span className="font-mono text-[9px] text-white/60">
                05 // COLOR ACENTO
              </span>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold">Rojo Terracota</p>
                <p className="font-mono text-[9px] text-white/80">
                  HEX: #b43024
                </p>
                <p className="font-mono text-[9px] text-white/80">
                  RGB: 180, 48, 36
                </p>
              </div>
              <span className="font-mono text-[9px] text-white/80">
                ACENTO Y CONTRASTE
              </span>
            </div>

            {/* Módulo 6: Tipografía Noto Serif */}
            <div className="flex aspect-square flex-col justify-between rounded border border-[#e1e2e5] bg-white p-4">
              <span className="font-mono text-[9px] text-[#444650]/60">
                06 // TIPOGRAFÍA SERIF
              </span>
              <div className="py-2">
                <p className="font-serif text-2xl font-bold text-[#143067]">
                  Noto Serif
                </p>
                <p className="mt-1 font-serif text-xs text-[#444650]">
                  Abc 123
                </p>
              </div>
              <span className="font-mono text-[9px] leading-none text-[#444650]">
                USO EXCLUSIVO EN TÍTULOS
              </span>
            </div>

            {/* Módulo 7: Tipografía Manrope */}
            <div className="flex aspect-square flex-col justify-between rounded border border-[#e1e2e5] bg-white p-4">
              <span className="font-mono text-[9px] text-[#444650]/60">
                07 // TIPOGRAFÍA SANS
              </span>
              <div className="py-2 font-sans">
                <p className="text-xl font-bold text-[#143067]">Manrope</p>
                <p className="mt-1 text-xs text-[#444650]">Abc 123</p>
              </div>
              <span className="font-mono text-[9px] leading-none text-[#444650]">
                USO EN CUERPO DE TEXTO
              </span>
            </div>

            {/* Módulo 8: Zona de Protección */}
            <div className="flex aspect-square flex-col justify-between rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4 font-mono text-[9px] text-[#444650]">
              <span className="text-[#444650]/60">08 // REGLA DE MARGEN</span>
              <div className="my-auto border border-dashed border-[#143067] p-3 text-center">
                <p className="font-bold text-[#143067]">MARGEN X</p>
                <p className="mt-1 text-[8px] text-[#444650]">
                  Espacio libre obligatorio de 20px alrededor.
                </p>
              </div>
              <span>PROTECCIÓN DE MARCA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 2: DESCRIPCIÓN OFICIAL (Dos columnas) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Textos */}
          <div className="space-y-6 lg:col-span-6">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Biografía Oficial
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Descripción oficial de la marca
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 text-sm leading-relaxed text-[#444650]">
              <p>
                Confecciones Liss es una empresa familiar especializada en la
                confección de uniformes escolares, empresariales y médicos.
                Desde nuestros inicios hemos combinado experiencia artesanal,
                especialización técnica y transformación digital para ofrecer
                prendas de alta calidad adaptadas a las necesidades de cada
                cliente.
              </p>
              <p>
                Nuestra historia comenzó en 2005 y desde entonces hemos
                evolucionado hasta convertirnos en un taller especializado con
                presencia digital y un equipo multidisciplinario comprometido
                con la excelencia.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Cita + Foto */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded bg-[#143067] p-6 text-white">
              <p className="text-center font-serif text-xl text-[#dae2ff] italic md:text-2xl">
                &ldquo;La confianza también se confecciona.&rdquo;
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDql6RAV4sbPJQGYiXijV7KHGzjJUep7ygJh0aamJxp9_KY2wPDDgZuqgHyZ2hSX5FHdJ0_zeDOOcmveyy3URfYQuwBDOHHaeKJnJtwfHT8R4APNmQ4dC5IeR89-M-GRnMhKL3Mrmz4RIrW6UfXKZPfojqoPElzWRv7xPnZzlzYWzxpMNKA05CvKHF38tVCtOs7SaFpaAbA0baMp_63_ivw10zgiOvHS0bReDbkD2_GAibQocZlAk9zBix5wNco3k5Ph_kMGvT35cY"
                alt="Taller de confección textil"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 3: USO CORRECTO DE LA MARCA (4 Columnas) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Normas de Aplicación
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Uso correcto de la marca
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
        </div>

        {/* 4 Columnas sin tarjetas */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Uso Correcto 1 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-green-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-green-800 uppercase">
              CORRECTO
            </span>
            <div className="flex aspect-[4/3] items-center justify-center rounded border border-[#e1e2e5] bg-white p-6 text-[#143067]">
              <svg
                className="h-auto w-24 fill-current"
                viewBox="0 0 100 30"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="16"
                  height="26"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="8"
                  x2="14"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="13"
                  x2="14"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <text x="24" y="20" className="font-serif text-sm font-bold">
                  Liss
                </text>
              </svg>
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Uso del logotipo sobre fondos claros
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              El logo principal debe presentarse preferiblemente sobre fondos
              blancos o grises claros (#f8f9fb).
            </p>
          </div>

          {/* Uso Correcto 2 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-green-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-green-800 uppercase">
              CORRECTO
            </span>
            <div className="flex aspect-[4/3] items-center justify-center rounded bg-[#143067] p-6 text-white">
              <svg
                className="h-auto w-24 fill-current"
                viewBox="0 0 100 30"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="16"
                  height="26"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="8"
                  x2="14"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="13"
                  x2="14"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <text x="24" y="20" className="font-serif text-sm font-bold">
                  Liss
                </text>
              </svg>
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Respeto de colores institucionales
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              Sobre fondos corporativos oscuros (#143067) se debe emplear el
              logotipo en negativo blanco puro.
            </p>
          </div>

          {/* Uso Incorrecto 1 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-red-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-red-800 uppercase">
              INCORRECTO
            </span>
            <div className="flex aspect-[4/3] items-center justify-center rounded border border-[#e1e2e5] bg-white p-6 text-purple-600">
              <svg
                className="h-auto w-24 fill-current"
                viewBox="0 0 100 30"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="16"
                  height="26"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="8"
                  x2="14"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="13"
                  x2="14"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <text x="24" y="20" className="font-serif text-sm font-bold">
                  Liss
                </text>
              </svg>
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Modificar colores
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              Queda estrictamente prohibida la alteración del color principal
              azul marino o el uso de gradientes.
            </p>
          </div>

          {/* Uso Incorrecto 2 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-red-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-red-800 uppercase">
              INCORRECTO
            </span>
            <div className="flex aspect-[4/3] items-center justify-center rounded border border-[#e1e2e5] bg-white p-6 text-[#143067]">
              <svg
                className="h-auto w-24 scale-x-[2.0] fill-current"
                viewBox="0 0 100 30"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="16"
                  height="26"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="8"
                  x2="14"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="6"
                  y1="13"
                  x2="14"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <text x="24" y="20" className="font-serif text-sm font-bold">
                  Liss
                </text>
              </svg>
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Deformar el logotipo
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              Queda prohibido comprimir, estirar o sesgar cualquiera de los ejes
              proporcionales del logotipo.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 4: INFORMACIÓN INSTITUCIONAL (Split 50/50) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Tabla de Información */}
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Datos de Auditoría
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Información institucional
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>

            <div className="overflow-hidden rounded border border-[#e1e2e5]">
              <table className="w-full text-left font-mono text-xs text-[#444650]">
                <tbody className="divide-y divide-[#e1e2e5]">
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Fundación del oficio
                    </td>
                    <td className="p-4">2005</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Constitución del taller
                    </td>
                    <td className="p-4">2021</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Ubicación
                    </td>
                    <td className="p-4">Barrio La Merced, San Miguel.</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Especialidad
                    </td>
                    <td className="p-4">
                      <p>· Uniformes escolares</p>
                      <p>· Uniformes empresariales</p>
                      <p>· Uniformes médicos</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Placeholder Fotografía Grande */}
          <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb] p-4">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(#143067 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            ></div>

            <div className="flex items-center justify-between font-mono text-[9px] text-[#444650]">
              <span>MUESTRA DE IMAGEN: TALLER DE COSTURA</span>
              <span className="font-bold text-[#143067]">PLACEHOLDER</span>
            </div>

            {/* SVG Camara Placeholder icon */}
            <div className="my-auto flex flex-col items-center justify-center py-8 text-[#143067]/40">
              <svg
                className="mb-2 h-12 w-12 fill-none stroke-current stroke-1"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M 3,7 L 3,19 L 21,19 L 21,7 L 17,7 L 15,4 L 9,4 L 7,7 Z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span className="font-mono text-[10px] text-[#444650]">
                Fotografía de Taller Industrial
              </span>
            </div>

            <div className="text-right font-mono text-[9px] text-[#444650]/60">
              Dimensiones: 1920px x 1200px
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 5: EQUIPO PARA PRENSA (Fila Horizontal) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Contactos Autorizados
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Equipo para prensa
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
        </div>

        {/* Fila Horizontal Asimétrica */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {[
            {
              name: "Lisseth Molina",
              role: "Directora General",
              spec: "Diseño & Patronaje",
            },
            { name: "Lilian Romero", role: "Operaria", spec: "Confección" },
            { name: "Nubia Vázquez", role: "Operaria", spec: "Bordado" },
            {
              name: "Carlos Antonio Molina",
              role: "Logística",
              spec: "Despacho & Envíos",
            },
            {
              name: "René Alfonso Méndez",
              role: "Calidad",
              spec: "Auditoría de Lotes",
            },
            {
              name: "Carlos José Molina",
              role: "Estrategia",
              spec: "Ecosistema Digital",
            },
            {
              name: "Jackeline Lisseth",
              role: "Imagen",
              spec: "Catálogo Online",
            },
            { name: "Liam Alejandro", role: "Soporte", spec: "Organización" },
          ].map((member, index) => (
            <div
              key={index}
              className="flex min-h-[160px] flex-col justify-between rounded border border-[#e1e2e5] bg-white p-4 text-center transition-colors duration-300 hover:border-[#143067]/40"
            >
              <div className="space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#143067]/10 font-serif text-xs font-bold text-[#143067]">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-serif text-xs leading-tight font-bold text-[#143067]">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-[9px] font-bold text-[#143067]">
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="mt-2 border-t border-[#e1e2e5] pt-2 font-mono text-[8px] text-[#444650]">
                {member.spec}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 6: RECURSOS DISPONIBLES (Tabla Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Descargas Públicas
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Recursos disponibles
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
        </div>

        {/* Tabla editorial sin tarjetas */}
        <div className="overflow-hidden rounded border border-[#e1e2e5] bg-white">
          <table className="w-full text-left font-mono text-xs text-[#444650]">
            <thead>
              <tr className="border-b border-[#e1e2e5] bg-[#f8f9fb]">
                <th className="p-4 font-bold text-[#143067]">
                  RECURSO DE DESCARGA
                </th>
                <th className="p-4 font-bold text-[#143067]">FORMATO</th>
                <th className="p-4 text-right font-bold text-[#143067]">
                  ESTADO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e2e5]">
              <tr>
                <td className="p-4 font-serif font-bold text-[#143067]">
                  Logotipos oficiales Confecciones Liss
                </td>
                <td className="p-4">SVG / PNG</td>
                <td className="p-4 text-right font-bold text-green-700">
                  Disponible
                </td>
              </tr>
              <tr>
                <td className="p-4 font-serif font-bold text-[#143067]">
                  Fotografías de productos y uniformes
                </td>
                <td className="p-4">ZIP</td>
                <td className="p-4 text-right font-bold text-[#143067]/65">
                  Próximamente
                </td>
              </tr>
              <tr>
                <td className="p-4 font-serif font-bold text-[#143067]">
                  Manual de Identidad y Marca Corporativa
                </td>
                <td className="p-4">PDF</td>
                <td className="p-4 text-right font-bold text-[#143067]/65">
                  Próximamente
                </td>
              </tr>
              <tr>
                <td className="p-4 font-serif font-bold text-[#143067]">
                  Imágenes de las instalaciones físicas (Taller)
                </td>
                <td className="p-4">ZIP</td>
                <td className="p-4 text-right font-bold text-[#143067]/65">
                  Próximamente
                </td>
              </tr>
              <tr>
                <td className="p-4 font-serif font-bold text-[#143067]">
                  Fotografías retratos del equipo oficial
                </td>
                <td className="p-4">ZIP</td>
                <td className="p-4 text-right font-bold text-[#143067]/65">
                  Próximamente
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 7: INFORMACIÓN PARA MEDIOS (Two columns) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Bio */}
          <div className="space-y-4 lg:col-span-7">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Resumen de Prensa
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Información para medios
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 pr-4 text-sm leading-relaxed text-[#444650]">
              <h3 className="font-serif text-base font-bold text-[#143067]">
                Biografía institucional
              </h3>
              <p>
                Confecciones Liss es una empresa salvadoreña especializada en la
                confección de uniformes escolares, empresariales y médicos.
                Fundada oficialmente en 2021, pero con una trayectoria iniciada
                en 2005, combina experiencia artesanal, especialización técnica
                y transformación digital para ofrecer soluciones textiles de
                alta calidad.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Contacto */}
          <div className="space-y-4 rounded border border-[#e1e2e5] bg-white p-6 font-mono text-xs text-[#444650] lg:col-span-5">
            <span className="block border-b border-[#e1e2e5] pb-2 font-bold tracking-wider text-[#143067] uppercase">
              DATOS DE CONTACTO
            </span>
            <div className="space-y-2">
              <p>
                · Correo:{" "}
                <span className="font-semibold text-[#191c1e]">
                  prensa@confeccionesliss.com
                </span>
              </p>
              <p>
                · Teléfono:{" "}
                <span className="font-semibold text-[#191c1e]">
                  +503 7234-5678
                </span>
              </p>
              <p>
                · Sitio Web:{" "}
                <span className="font-semibold text-[#191c1e]">
                  confeccionesliss.com
                </span>
              </p>
              <p>
                · Dirección:{" "}
                <span className="font-semibold text-[#191c1e]">
                  Barrio La Merced, San Miguel, El Salvador
                </span>
              </p>
              <p>
                · Redes:{" "}
                <span className="font-semibold text-[#191c1e]">
                  @confeccionesliss
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE FINAL (Banda Horizontal 220px, Navy) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative flex h-[220px] items-center justify-center overflow-hidden border-t border-[#143067] bg-[#143067] px-5 py-12 text-center text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-lg font-bold md:text-xl">
            ¿Necesita material adicional?
          </h2>
          <p className="mx-auto max-w-lg text-xs leading-relaxed text-[#dae2ff]">
            Nuestro equipo puede proporcionar recursos específicos para medios,
            instituciones y colaboraciones cuando sea necesario.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
            >
              Contactar al equipo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
