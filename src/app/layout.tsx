import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    default:
      "Confecciones Liss | Scrubs y Uniformes a la Medida en San Miguel, El Salvador",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "Confecciones Liss | Scrubs y Uniformes en San Miguel El Salvador",
    description:
      "Confección profesional a la medida en San Miguel. Scrubs, uniformes universitarios, escolares y corporativos a la medida. Pago al recibir.",
    url: siteConfig.url,
    siteName: siteConfig.name,

    locale: "es_SV",
    type: "website",
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
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,

    creator: siteConfig.twitterHandle,
  },
};

export const viewport = {
  themeColor: "#055e38",
  width: "device-width",
  initialScale: 1,
};

import { Providers } from "@/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <head></head>
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
