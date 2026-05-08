import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uniformes Escolares | Colegios e Instituciones",
  description:
    "Camisas, faldas, pantalones, suéteres y corbatas escolares. Tela resistente al uso diario, colores institucionales exactos. Entrega directa en tu colegio en San Miguel.",
  openGraph: {
    title: "Uniformes Escolares | Confecciones Liss",
    description:
      "Catálogo de uniformes escolares resistentes y cómodos para todos los colegios de San Miguel y zona oriental.",
  },
};

export default function EscolarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
