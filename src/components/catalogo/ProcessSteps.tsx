import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

interface ProcessStepsProps {
  title?: string;
  steps: Step[];
  className?: string;
}

export function ProcessSteps({
  title = "Nuestro Proceso",
  steps,
  className,
}: ProcessStepsProps) {
  return (
    <section className={cn("px-5 py-14 md:px-8 md:py-20", className)}>
      <div className="mx-auto max-w-screen-xl">
        <h2 className="section-title mb-12 text-center">{title}</h2>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-12 right-[10%] left-[10%] hidden h-0.5 bg-gray-200 md:block"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-row items-center gap-4 md:flex-col md:items-center md:text-center"
            >
              <div className="bg-primary flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow md:size-20 md:text-2xl">
                {step.icon ? (
                  <span
                    className="material-symbols-outlined text-2xl"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </span>
                ) : (
                  step.number
                )}
              </div>
              <div>
                <h3 className="font-headline text-on-surface mb-1 text-base font-bold md:mt-4">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
