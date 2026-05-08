import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Scrub Médico Premium 'San Miguel'",
  description:
    "Scrub Médico Premium confeccionado con tejido antimicrobiano Sincatex. Repelente a fluidos, estiramiento en 4 direcciones. Desde $45. Bordado personalizado disponible.",
};

const BREADCRUMB = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Salud", href: "/catalogo/salud" },
  { label: "Scrub Médico Premium" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "2XL"];
const COLORS = [
  { name: "Azul Naval", hex: "#143067", selected: true },
  { name: "Verde Bosque", hex: "#1b4332" },
  { name: "Guinda", hex: "#4a0000" },
  { name: "Gris Oscuro", hex: "#2b2d42" },
  { name: "Blanco", hex: "#ffffff" },
];

const THUMBNAILS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAHxaJ3wC7_Tyv2qoS2x-JxEIKirXQbF3Oa93ux9PxpkeDL7PxP9HgLzvuK4PXKFpUyQIEazDIMFGi-ippZhPkDRGzV0_DgjDlpq1lvYtUEKv6MM_9SCEIjG9hv1Kuj25-a2myQC0CLzn4fEvE0DFt2kbgC_jM_U-I-1a5mo6eKrFB-IUhmbhCp2sfLYyoGpdjIhZHsgiWX3J4kkrsjmCwv49dPUsoa-VXowlnCp231nVGXqhuBRF3wCeAivhPWKCJ4QLH2jr6oNBXo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
];

export default function ProductoPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-12 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Breadcrumb items={BREADCRUMB} />

      {/* Product Detail */}
      <section className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Images */}
        <div className="relative flex flex-col gap-6 lg:w-[55%]">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-tertiary rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-sm">
              Nuevo
            </span>
          </div>
          <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-[#f8f8f8] shadow-sm">
            <Image
              width={800}
              height={800}
              alt="Scrub Médico Premium San Miguel"
              className="h-full w-full object-cover object-center mix-blend-multiply"
              src={THUMBNAILS[0]}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {THUMBNAILS.map((src, i) => (
              <button
                key={i}
                className={`aspect-square overflow-hidden rounded-lg border-2 bg-[#f8f8f8] ${i === 0 ? "border-primary" : "border-gray-200 hover:border-gray-400"}`}
              >
                <Image
                  width={200}
                  height={200}
                  alt={`Vista ${i + 1}`}
                  className="h-full w-full object-cover"
                  src={src}
                />
              </button>
            ))}
            <button className="flex aspect-square items-center justify-center rounded-lg border border-gray-200 bg-gray-100 hover:border-gray-400">
              <span
                className="material-symbols-outlined text-3xl text-gray-400"
                aria-hidden="true"
              >
                play_circle
              </span>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col lg:w-[45%]">
          <div className="mb-6">
            <span className="border-primary text-primary mb-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              Scrubs Médicos
            </span>
            <h1 className="font-headline mb-3 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              Scrub Médico Premium &apos;San Miguel&apos;
            </h1>
            <div className="mb-4 flex items-center space-x-4">
              <div
                className="flex items-center text-yellow-500"
                aria-label="4.8 de 5 estrellas"
              >
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star_half
                </span>
              </div>
              <span className="text-sm text-gray-500">4.8 (12 reseñas)</span>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              Confeccionado con tejido técnico repelente a fluidos y
              estiramiento en 4 direcciones para máxima movilidad durante largas
              jornadas.
            </p>
          </div>

          {/* Price */}
          <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-end space-x-3">
              <span className="text-tertiary text-3xl font-bold">$45.00</span>
              <span className="mb-1 text-lg text-gray-400 line-through">
                $55.00
              </span>
            </div>
            <div className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600">
              <span
                className="material-symbols-outlined text-tertiary mr-2 text-sm"
                aria-hidden="true"
              >
                local_offer
              </span>
              <span className="font-medium">Mayoreo:</span>
              <span className="ml-1">$38.00 desde 10 unidades</span>
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-8 space-y-6">
            <div>
              <span className="mb-3 block text-sm font-bold tracking-wider text-gray-900 uppercase">
                Talla Seleccionada: <span className="text-primary">M</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    className={`h-10 rounded-lg border px-3 font-medium transition-colors ${s === "M" ? "border-primary bg-primary font-bold text-white shadow-md" : "hover:border-primary border-gray-300 text-gray-700"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="mb-3 block text-sm font-bold tracking-wider text-gray-900 uppercase">
                Color:{" "}
                <span className="text-primary font-medium">Azul Naval</span>
              </span>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-transform hover:scale-110 ${c.selected ? "ring-primary ring-2 ring-offset-2" : "border border-gray-300"}`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.selected && (
                      <span className="material-symbols-outlined text-[16px] text-white">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex h-12 w-32 shrink-0 items-center rounded-lg border border-gray-300 bg-white shadow-sm">
                <button
                  aria-label="Disminuir cantidad"
                  className="hover:text-primary flex h-full w-full items-center justify-center px-3 text-gray-500"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    remove
                  </span>
                </button>
                <span className="w-full text-center font-medium text-gray-900">
                  1
                </span>
                <button
                  aria-label="Aumentar cantidad"
                  className="hover:text-primary flex h-full w-full items-center justify-center px-3 text-gray-500"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>
                </button>
              </div>
              <button className="bg-primary flex h-12 flex-1 items-center justify-center rounded-lg font-bold tracking-wide text-white shadow-md transition-colors hover:bg-blue-900">
                Agregar al carrito
              </button>
              <button
                aria-label="Agregar a favoritos"
                className="hover:text-tertiary hover:border-tertiary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 shadow-sm"
              >
                <span className="material-symbols-outlined">
                  favorite_border
                </span>
              </button>
            </div>
            <a
              href="https://confeccionesliss.axkar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#25D366] font-bold tracking-wide text-white shadow-md transition-colors hover:bg-[#20b958]"
            >
              <span
                className="material-symbols-outlined mr-2 text-[20px]"
                aria-hidden="true"
              >
                chat
              </span>
              Comprar por WhatsApp
            </a>
          </div>

          {/* Info strip */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 border-y border-gray-200 py-6">
            {[
              { icon: "checkroom", text: "Confección artesanal" },
              { icon: "health_and_safety", text: "Tela médica" },
              { icon: "auto_awesome", text: "Bordado disponible" },
              { icon: "local_shipping", text: "Envío zona oriental" },
            ].map((f) => (
              <div
                key={f.text}
                className="flex items-center text-sm text-gray-600"
              >
                <span
                  className="material-symbols-outlined text-primary mr-2 text-[20px]"
                  aria-hidden="true"
                >
                  {f.icon}
                </span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="mt-8 border-b border-gray-200">
        <nav
          aria-label="Tabs de producto"
          className="hide-scrollbar flex space-x-8 overflow-x-auto"
        >
          <span className="border-primary text-primary border-b-2 px-1 py-4 text-base font-medium whitespace-nowrap">
            Descripción
          </span>
          <span className="border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-500">
            Especificaciones
          </span>
          <span className="border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-500">
            Guía de tallas
          </span>
        </nav>
        <div className="max-w-3xl py-8 leading-relaxed text-gray-600">
          <p className="mb-4">
            El Scrub Médico Premium &apos;San Miguel&apos; representa el
            pináculo de la comodidad clínica. Diseñado específicamente para
            profesionales de la salud que exigen funcionalidad sin comprometer
            la apariencia.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Tejido antimicrobiano y repelente a líquidos.</li>
            <li>Corte moderno y favorecedor con pinzas traseras.</li>
            <li>6 bolsillos funcionales incluyendo ranura para bolígrafos.</li>
            <li>Cintura elástica con cordón ajustable interno.</li>
            <li>Resistencia excepcional a la decoloración.</li>
          </ul>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-gray-200 py-8">
        <h2 className="font-headline mb-8 text-2xl font-bold text-gray-900">
          Completa tu equipo
        </h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            {
              name: "Gorro Quirúrgico Premium",
              price: "$12.00",
              img: THUMBNAILS[1],
            },
            {
              name: "Bata Médica Clásica",
              price: "$35.00",
              img: THUMBNAILS[2],
            },
          ].map((p) => (
            <div
              key={p.name}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  width={400}
                  height={500}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={p.img}
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-sm font-bold text-gray-900">
                  {p.name}
                </h3>
                <span className="text-primary font-bold">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
