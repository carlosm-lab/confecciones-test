import { cn } from "@/lib/utils";

interface CatalogHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  bgClassName?: string;
  children?: React.ReactNode;
}

export function CatalogHero({
  title,
  subtitle,
  description,
  icon,
  bgClassName,
  children,
}: CatalogHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-5 py-16 md:px-8 md:py-24",
        bgClassName ?? "bg-primary text-white"
      )}
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {subtitle && (
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                {icon && (
                  <span
                    className="material-symbols-outlined text-sm"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                )}
                {subtitle}
              </span>
            )}
            <h1 className="font-headline mb-4 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-base leading-relaxed opacity-90 md:text-lg">
              {description}
            </p>
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
