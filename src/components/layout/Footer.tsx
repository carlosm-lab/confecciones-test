import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import {
  SiFacebook,
  SiGooglemaps,
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from "react-icons/si";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1e2d4a] bg-[#0b1b3d] font-sans text-white">
      <div className="mx-auto max-w-screen-2xl px-6 py-16 md:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Branding & Socials */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-4">
            <div>
              <Link href="/" className="mb-6 inline-block">
                <Image
                  src="/logo.png"
                  alt="Confecciones Liss"
                  width={180}
                  height={180}
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-[#a5b1c9]">
                Confección profesional de scrubs médicos, uniformes
                empresariales y escolares. Calidad artesanal y diseño
                contemporáneo desde San Miguel, El Salvador.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[
                {
                  href: siteConfig.links.instagram,
                  icon: SiInstagram,
                  color: "hover:text-[#E1306C]",
                  label: "Instagram",
                },
                {
                  href: siteConfig.links.facebook,
                  icon: SiFacebook,
                  color: "hover:text-[#1877F2]",
                  label: "Facebook",
                },
                {
                  href: siteConfig.links.tiktok,
                  icon: SiTiktok,
                  color: "hover:text-white",
                  label: "TikTok",
                },
                {
                  href: siteConfig.links.youtube,
                  icon: SiYoutube,
                  color: "hover:text-[#FF0000]",
                  label: "YouTube",
                },
                {
                  href: siteConfig.links.googleMaps,
                  icon: SiGooglemaps,
                  color: "hover:text-[#4285F4]",
                  label: "Google Maps",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#1e2d4a] bg-[#0f244c]/50 text-[#a5b1c9] transition-all duration-300 hover:border-white ${social.color} hover:scale-105`}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explorar */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-white uppercase">
              Explorar
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/servicios", label: "Servicios" },
                { href: "/empresa", label: "Empresa" },
                { href: "/contacto", label: "Contacto" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[#a5b1c9] transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacto */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-white uppercase">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-[#a5b1c9]">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-[#e8cbb5]">
                  location_on
                </span>
                <span className="leading-relaxed">
                  {siteConfig.address.full}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined shrink-0 text-[20px] text-[#e8cbb5]">
                  phone
                </span>
                <a
                  href={siteConfig.links.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-white hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined shrink-0 text-[20px] text-[#e8cbb5]">
                  mail
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors duration-200 hover:text-white hover:underline"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-[#e8cbb5]">
                  schedule
                </span>
                <span className="leading-relaxed">{siteConfig.schedule}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 font-serif text-sm font-semibold tracking-wider text-white uppercase">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/legal/privacidad", label: "Política de Privacidad" },
                { href: "/legal/terminos", label: "Términos y Condiciones" },
                { href: "/legal/envios", label: "Política de Envíos" },
                {
                  href: "/legal/devoluciones",
                  label: "Política de Devoluciones",
                },
                { href: "/legal/garantia", label: "Garantía de Producto" },
                { href: "/legal/mayoreo", label: "Ventas al Mayoreo" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[#a5b1c9] transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 border-t border-[#1e2d4a] pt-2">
                <Link
                  href="/legal"
                  className="inline-flex items-center gap-1 font-semibold text-[#e8cbb5] transition-colors duration-200 hover:text-white hover:underline"
                >
                  Ver todos los documentos
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_right_alt
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[#1e2d4a] bg-[#08132e] py-6">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-6 text-xs text-[#7c8ba6] md:flex-row md:px-12">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Confecciones Liss
            </Link>
            . Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacidad"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacidad
            </Link>
            <Link
              href="/legal/terminos"
              className="transition-colors duration-200 hover:text-white"
            >
              Términos
            </Link>
            <Link
              href="/legal"
              className="transition-colors duration-200 hover:text-white"
            >
              Documentos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
