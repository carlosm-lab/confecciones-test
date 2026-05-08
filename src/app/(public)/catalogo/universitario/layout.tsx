import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uniformes Universitarios | Scrubs Clínicos",
  description:
    "Scrubs clínicos personalizados para UNIVO, UNAB, UGB, UMA, IEPROES y UES. Bordado de logo y nombre por carrera. Desde $39.50 en San Miguel, El Salvador.",
  openGraph: {
    title: "Uniformes Clínicos Universitarios | Confecciones Liss",
    description:
      "Catálogo de scrubs universitarios con colores oficiales, bordado de nombre y carrera. Descuentos grupales disponibles.",
  },
};

export default function UniversitarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
