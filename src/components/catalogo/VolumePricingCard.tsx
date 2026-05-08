import { cn } from "@/lib/utils";

interface VolumeTier {
  range: string;
  discount: string;
  highlight?: boolean;
}

interface VolumePricingCardProps {
  title?: string;
  description?: string;
  tiers: VolumeTier[];
  className?: string;
}

export function VolumePricingCard({
  title = "Precios por Volumen",
  description,
  tiers,
  className,
}: VolumePricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <h3 className="font-headline text-primary mb-2 text-xl font-bold">
        {title}
      </h3>
      {description && (
        <p className="mb-6 text-sm text-gray-500">{description}</p>
      )}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Cantidad
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-semibold text-gray-700"
              >
                Precio unitario
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tiers.map((tier) => (
              <tr
                key={tier.range}
                className={cn(tier.highlight && "bg-primary/5 font-semibold")}
              >
                <td className="px-4 py-3 text-gray-700">{tier.range}</td>
                <td
                  className={cn(
                    "px-4 py-3",
                    tier.highlight ? "text-primary font-bold" : "text-gray-700"
                  )}
                >
                  {tier.discount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
