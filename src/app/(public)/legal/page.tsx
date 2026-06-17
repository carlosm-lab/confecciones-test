import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import LegalHubClient from "@/components/legal/LegalHubClient";

const PAGE_URL = `${siteConfig.url}/legal`;

export const metadata: Metadata = {
  title: "Documentos Legales: Privacidad y Términos",
  description:
    "Accede a todos los documentos legales de Confecciones Liss: política de privacidad, términos y condiciones de uso, y más documentos regulatorios vigentes.",
  alternates: { canonical: PAGE_URL },
};

export default function LegalHubPage() {
  return <LegalHubClient />;
}
