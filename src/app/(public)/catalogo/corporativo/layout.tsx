import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uniformes Corporativos | Empresas y Talleres",
  description:
    "Camisas, polos, gabachas y chalecos corporativos con bordado de logo y colores institucionales. Precios por volumen desde 10 unidades. San Miguel, El Salvador.",
  openGraph: {
    title: "Uniformes Corporativos | Confecciones Liss",
    description:
      "Catálogo de uniformes empresariales con personalización completa: bordado, sublimación y colores corporativos exactos.",
  },
};

export default function CorporativoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
