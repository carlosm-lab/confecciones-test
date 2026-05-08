import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uniformes Médicos | Sector Salud",
  description:
    "Scrubs médicos, batas, gorros quirúrgicos y chaquetas clínicas confeccionados con tela antimicrobiana Sincatex. Bordado personalizado. Desde $35 en San Miguel, El Salvador.",
  openGraph: {
    title: "Uniformes Médicos — Sector Salud | Confecciones Liss",
    description:
      "Catálogo de uniformes médicos: scrubs, batas y accesorios con tela Sincatex antimicrobiana. Envío nacional.",
  },
};

export default function SaludLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
