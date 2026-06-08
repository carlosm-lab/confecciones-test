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
import "@/env";

export const metadata = {
  title: {
    default:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
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
    title:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TailoringShop",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.address.street,
                addressLocality: siteConfig.address.city,
                addressCountry: "SV",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: siteConfig.geo.lat,
                longitude: siteConfig.geo.lng,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
              sameAs: [
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
                siteConfig.links.youtube,
                siteConfig.links.threads,
                siteConfig.links.twitter,
                siteConfig.links.linkedin,
                siteConfig.links.pinterest,
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
