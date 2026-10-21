interface StaticHeroImageProps {
  sizes?: string;
}

/**
 * StaticHeroImage — Server Component
 *
 * Usa archivos WebP estáticos optimizados desde /hero.png para rendimiento máximo
 * y cumplimiento de Core Web Vitals (LCP estático sin JavaScript).
 */
export function StaticHeroImage({ sizes: _sizes }: StaticHeroImageProps) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-home-440.webp"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 overflow-hidden rounded-xl"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "0.75rem",
        }}
      >
        <picture
          className="block h-full w-full"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <source
            media="(max-width: 480px)"
            srcSet="/images/hero/hero-home-440.webp"
          />
          <source
            media="(min-width: 1025px)"
            srcSet="/images/hero/hero-home.webp"
          />
          <source
            media="(min-width: 641px)"
            srcSet="/images/hero/hero-home-800.webp"
          />
          <source
            media="(min-width: 481px)"
            srcSet="/images/hero/hero-home-640.webp"
          />
          <img
            src="/images/hero/hero-home-440.webp"
            srcSet="/images/hero/hero-home-440.webp 480w, /images/hero/hero-home-640.webp 640w, /images/hero/hero-home-800.webp 800w, /images/hero/hero-home.webp 1025w"
            sizes="(max-width: 480px) 380px, (max-width: 640px) 640px, (max-width: 1024px) 800px, 1200px"
            alt="Uniformes médicos y universitarios de Confecciones Liss, empresa de uniformes en San Miguel, El Salvador"
            width={380}
            height={475}
            className="h-full w-full rounded-xl object-cover object-center"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "0.75rem",
            }}
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </div>
    </>
  );
}
