import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Uniformes",
  description:
    "Explora nuestro catálogo de uniformes profesionales: scrubs médicos, uniformes universitarios, escolares y corporativos. Confección a la medida en San Miguel, El Salvador.",
  openGraph: {
    title: "Catálogo de Uniformes | Confecciones Liss",
    description:
      "Encuentra uniformes para el sector salud, universidades, colegios y empresas. Bordado, sublimación y precios por volumen.",
  },
};

const CATEGORIES = [
  {
    title: "Scrubs",
    description: "Scrubs médicos para doctores, enfermeras y odontólogos.",
    icon: "stethoscope",
    href: "/catalogo/salud",
    badge: "Principal",
  },
  {
    title: "Universidades",
    description: "Uniformes para estudiantes del sector salud y laboratorios.",
    icon: "school",
    href: "/catalogo/universitario",
  },
  {
    title: "Escuelas y Colegios",
    description: "Uniformes y ropa escolar institucional.",
    icon: "domain",
    href: "/catalogo/escolar",
  },
  {
    title: "Empresas y Talleres",
    description: "Uniformes corporativos y laborales de alta durabilidad.",
    icon: "work",
    href: "/catalogo/corporativo",
  },
];

const STEPS = [
  {
    icon: "category",
    title: "Elige tu categoría",
    text: "Encuentra el estilo perfecto.",
  },
  {
    icon: "straighten",
    title: "Personaliza tu talla",
    text: "Ajuste ideal para ti.",
  },
  {
    icon: "local_shipping",
    title: "Recibe en tu puerta",
    text: "Envío rápido y seguro.",
  },
];

export default function CatalogoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-surface-container-lowest relative flex min-h-[500px] flex-col overflow-hidden md:min-h-[700px] md:flex-row">
        {/* Background accent */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-5"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 0%, #143067 0%, transparent 50%)",
          }}
        />

        {/* Text side */}
        <div className="z-10 flex w-full items-center justify-center p-8 md:w-1/2 lg:p-24">
          <div className="max-w-xl">
            <h1 className="text-primary font-headline mb-6 text-3xl leading-[1.1] font-extrabold tracking-tight md:text-4xl lg:text-[2.75rem]">
              ¿Qué tipo de uniforme necesitas?
            </h1>
            <p className="text-on-surface-variant mb-10 text-base leading-relaxed md:text-lg">
              Encuentra el catálogo perfecto para ti. Diseños de alta precisión
              para cada profesión.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#categorias"
                className="from-primary to-primary-container text-on-primary rounded-md bg-gradient-to-r px-8 py-4 text-center font-medium shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-opacity hover:opacity-90"
              >
                Ver Catálogo General
              </Link>
            </div>
          </div>
        </div>

        {/* Image grid side */}
        <div className="relative z-10 flex w-full items-center justify-center p-6 md:w-1/2 md:p-12 lg:p-16">
          <div className="relative grid h-full max-h-[500px] w-full grid-cols-2 gap-4 md:max-h-[600px]">
            <div className="relative col-span-1 row-span-2 h-full min-h-[300px] overflow-hidden rounded-lg shadow-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPHnbLu5luDAxr-SHXaYUG6Gg8RaeWWMKUXjg1cAaFc4ZI-oG_wIo2qIyzeEyVdLL0gQs_0OkxB1ee3MG_tbRJ7ZF8mwROvQLWFJfX-D9eXS1f2hXX2PfNpVkEVOjsbP20XWi8uILHtfbdsqKyUwCeYkVHToGbuimCb4VKRPGxjCd_IeOnmMc4WZGJLDhgf3iv80GLtmAGCs93gY3n2BpSvxZt8FD2vYtyZ63cx3FSyaD3CC20NWIBaTJG0oFAm0ieOnwkzqssWnc"
                alt="Profesionales médicos con scrubs azules"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-40 overflow-hidden rounded-lg shadow-sm md:h-full">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz0tnWS1HEP6JI-4ivXwWhSjKzlj7xOGzTJDTUIvm5ITRePEf_LFL_HqUsDwnBYFFn4mmWheiGiAuR1STquLF-6rcDuk8F3CZ4K9DPG1sGbhojF2Eko7LJatixb3rlILf7ns4I16PCvDIeNvDExRrq8aQ8SXfiFy6ZneoMsxT4mSXrwS8-2ACqcHBne4FOthDCCltrn0d4vEfe9aIWAZ0M7NuMsTHiQSeeM0Ov1qJUB9bMbL5iz-PyOU_3H_baI6o2l6IaNIXSkG0"
                alt="Equipo corporativo en uniforme formal"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-40 overflow-hidden rounded-lg shadow-sm md:h-full">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7BWgkJIQEwNUb4FnZGP7yr27oq4bx4syUzuSDSMPTkLf_vvj-rGQhKlg0zKY8UU1zXnw1-RgHeeYsfNB7GVQKZQQTA8-AirlcV0gQkk4K734JCUJMapaJqlLr3oNOu5dZgo58WEZMnc-qAB8X9cP8Y7mXmGRmvzRkIK3wsfvMzq8ELbZM6nE1g3T9DPaRBN-y_8cTyarh_FyHkUzS9vc-ONVmkW8RWYr0I0__Kp9rFTWg0k2vmYd59WYZhCEm7OIqh7QtzBaa0vc"
                alt="Estudiantes en uniforme"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Type Strip */}
      <section className="bg-surface-container-low border-surface-dim/30 border-t border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-8 md:flex-row md:gap-8 md:px-8 md:py-12">
          <h2 className="text-primary text-xl font-bold tracking-tight">
            ¿Cómo deseas comprar?
          </h2>
          <div className="bg-surface flex flex-col gap-2 rounded-lg p-2 shadow-sm sm:flex-row">
            <Link
              href="#categorias"
              className="bg-primary text-on-primary flex items-center space-x-3 rounded-md px-6 py-3 font-medium transition-all hover:opacity-90"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                person
              </span>
              <span>Compra individual</span>
            </Link>
            <Link
              href="https://confeccionesliss.axkar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:bg-surface-container flex items-center space-x-3 rounded-md px-6 py-3 transition-all"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
                aria-hidden="true"
              >
                business
              </span>
              <span>Compra al por mayor</span>
            </Link>
          </div>
          <p className="text-on-surface-variant max-w-xs text-center text-sm leading-relaxed md:text-left">
            La compra al por mayor aplica para instituciones, clínicas y grupos
            de 10 o más prendas.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section
        id="categorias"
        className="bg-surface scroll-mt-16 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-primary font-headline mb-4 text-2xl font-extrabold tracking-tight md:text-[2rem]">
              Elige tu categoría
            </h2>
            <p className="text-on-surface-variant mx-auto max-w-2xl">
              Selecciona el área para la que necesitas confecciones y descubre
              nuestras opciones especializadas.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="bg-surface-container-lowest group hover:border-t-primary relative flex h-full flex-col rounded-lg border-t-4 border-transparent p-8 shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)] md:p-10"
              >
                {cat.badge && (
                  <div className="bg-secondary/10 text-secondary absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
                    {cat.badge}
                  </div>
                )}
                <div className="bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary mb-8 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                </div>
                <h3 className="text-primary mb-4 text-2xl font-bold tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">
                  {cat.description}
                </p>
                <Link
                  href={cat.href}
                  className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed block w-full rounded-md py-3 text-center font-medium transition-colors"
                >
                  Explorar
                </Link>
              </div>
            ))}
          </div>

          {/* Centered "No sé qué necesito" Card */}
          <div className="mt-8 flex justify-center">
            <div className="bg-surface-container-low hover:border-t-primary w-full rounded-lg border-t-4 border-transparent p-8 text-center shadow-sm transition-all hover:-translate-y-1 md:w-2/3 md:p-10 lg:w-1/2">
              <div className="bg-surface-container-lowest text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-sm">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                  aria-hidden="true"
                >
                  content_cut
                </span>
              </div>
              <h3 className="text-primary mb-3 text-xl font-bold tracking-tight">
                No sé qué necesito
              </h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Te ayudamos a encontrarlo. Asesoría personalizada para tu
                proyecto.
              </p>
              <a
                href="https://confeccionesliss.axkar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary border-outline-variant/50 hover:bg-surface-container-lowest inline-block rounded-md border bg-transparent px-8 py-3 font-medium transition-colors"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Primera vez aquí? */}
      <section className="border-outline-variant/30 border-y bg-[#f0f4ff] px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full lg:w-2/3">
            <h2 className="text-primary font-headline mb-8 text-2xl font-bold tracking-tight">
              ¿Primera vez aquí?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      {step.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-primary mb-1 font-bold">
                      {step.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-start text-center lg:w-1/3 lg:items-end lg:text-right">
            <a
              href="https://confeccionesliss.axkar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 block w-full rounded-md bg-[#143067] px-8 py-4 font-medium text-white shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-opacity hover:opacity-90 sm:w-auto"
            >
              Escríbenos por WhatsApp
            </a>
            <Link
              href="/catalogo#categorias"
              className="text-primary hover:text-primary-container block w-full px-2 text-center text-sm font-medium hover:underline sm:w-auto lg:text-right"
            >
              Ver catálogo sin cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Catálogo de Uniformes Profesionales",
            description:
              "Catálogo completo de uniformes médicos, universitarios, escolares y corporativos en San Miguel, El Salvador.",
            url: "https://www.confeccionesliss.com/catalogo",
            hasPart: CATEGORIES.map((cat) => ({
              "@type": "CollectionPage",
              name: cat.title,
              url: `https://www.confeccionesliss.com${cat.href}`,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
