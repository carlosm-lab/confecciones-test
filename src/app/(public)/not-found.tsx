export default function PublicNotFound() {
  return (
    <section
      className="bg-background relative flex flex-col items-center justify-center px-5 py-10 text-center select-none"
      style={{ minHeight: "calc(100dvh - 56px)" }}
    >
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
        <span
          className="font-sans text-[25vw] leading-none font-black tracking-tighter md:text-[20vw] lg:text-[15vw]"
          style={{
            WebkitTextStroke: "3px var(--color-primary)",
            color: "transparent",
          }}
        >
          404
        </span>
        <h1 className="text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          Página no Encontrada
        </h1>
      </div>
    </section>
  );
}
