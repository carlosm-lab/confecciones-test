"use client";

interface StatCard {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  colorClass?: string;
}

interface StatsCardsProps {
  stats: StatCard[];
  onCardClick?: (id: string) => void;
}

export default function StatsCards({ stats, onCardClick }: StatsCardsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 2xl:grid-cols-6">
      {stats.map((stat) => {
        const Tag = onCardClick ? "button" : "div";
        return (
          <Tag
            key={stat.id}
            type={onCardClick ? "button" : undefined}
            onClick={onCardClick ? () => onCardClick(stat.id) : undefined}
            aria-label={
              onCardClick ? `Ver detalles de ${stat.label}` : undefined
            }
            className={`group focus:ring-primary flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg focus:ring-2 focus:outline-none md:gap-4 md:p-5 dark:border-white/5 dark:bg-white/5 ${onCardClick ? "cursor-pointer text-left" : ""}`}
          >
            <div className="flex w-full items-center justify-between">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 md:h-11 md:w-11 ${stat.colorClass || "bg-primary/10 text-primary"}`}
              >
                <span className="material-symbols-outlined text-[18px] md:text-[22px]">
                  {stat.icon}
                </span>
              </div>
              <h3 className="text-xl leading-tight font-black text-slate-900 md:text-2xl dark:text-white">
                {stat.value}
              </h3>
            </div>
            <div className="w-full text-center">
              <p className="line-clamp-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase md:text-xs dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
