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
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      <picture>
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
          alt="Uniformes médicos y universitarios de Confecciones Liss, empresa de uniformes en San Miguel, El Salvador"
          width={440}
          height={550}
          className="h-full w-full rounded-xl object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>
    </div>
  );
}
