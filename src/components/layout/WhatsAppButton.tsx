import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.links.whatsappDirect}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="ambient-shadow fixed right-8 bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] transition-transform hover:scale-105"
    >
      <FaWhatsapp className="text-3xl text-white" />
    </a>
  );
}
