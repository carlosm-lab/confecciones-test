import Link from "next/link";

export default function PublicNotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-[0.03] select-none"
      >
        <span
          className="text-[30vw] leading-none font-black tracking-tighter"
          style={{ WebkitTextStroke: "2px #143067", color: "transparent" }}
        >
          404
        </span>
      </div>

      {/* Icon */}
      <div className="bg-primary/10 mb-8 flex h-20 w-20 items-center justify-center rounded-full">
        <span
          className="material-symbols-outlined text-primary text-4xl"
          aria-hidden="true"
        >
          content_cut
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
        ¡Esta página se perdió en el taller!
      </h1>
      <p className="text-on-surface-variant mb-10 max-w-md text-lg leading-relaxed">
        La página que buscas no existe o fue movida.
      </p>

      {/* CTA buttons */}
      <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="bg-primary hover:bg-primary/95 rounded-xl px-8 py-3.5 text-center font-semibold text-white shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
