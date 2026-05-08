import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <Link
      href="https://confeccionesliss.axkar.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="ambient-shadow fixed right-8 bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] transition-transform hover:scale-105"
    >
      <FaWhatsapp className="text-3xl text-white" />
    </Link>
  );
}
