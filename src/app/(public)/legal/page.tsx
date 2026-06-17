import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import LegalHubClient from "@/components/legal/LegalHubClient";

const PAGE_URL = `${siteConfig.url}/legal`;

export const metadata: Metadata = {
  title: "Documentos Legales: Privacidad y Términos",
  description:
    "Accede a todos los documentos legales de Confecciones Liss: política de privacidad, términos y condiciones de uso, y más documentos regulatorios vigentes.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Documentos Legales | Confecciones Liss",
    description:
      "Accede a todos los documentos legales de Confecciones Liss: política de privacidad, términos y condiciones de uso, y más documentos regulatorios vigentes.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentos Legales | Confecciones Liss",
    description:
      "Accede a todos los documentos legales de Confecciones Liss: política de privacidad, términos y condiciones de uso, y más documentos regulatorios vigentes.",
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LegalHubPage() {
  return <LegalHubClient />;
}
