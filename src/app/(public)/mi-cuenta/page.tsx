import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mi Cuenta | Confecciones Liss",
  description: "Accede a tu cuenta en Confecciones Liss.",
  robots: { index: false, follow: false },
};

export default function MiCuentaPage() {
  return (
    <section className="px-5 pt-16 pb-20 md:px-8">
      <div className="mx-auto flex min-h-[60vh] max-w-screen-2xl flex-col items-center justify-center gap-6 text-center">
        <span
          className="animate-fade-in-up material-symbols-outlined text-primary text-6xl"
          style={{
            fontVariationSettings: "'FILL' 0'",
            animationDelay: "100ms",
          }}
          aria-hidden="true"
        >
          manage_accounts
        </span>
        <h1
          className="animate-fade-in-up text-primary font-serif text-3xl font-bold"
          style={{ animationDelay: "200ms" }}
        >
          Mi Cuenta
        </h1>
        <p
          className="animate-fade-in-up max-w-sm text-gray-500"
          style={{ animationDelay: "250ms" }}
        >
          El área de cuenta estará disponible próximamente. Por ahora puedes
          contactarnos directamente.
        </p>
        <Link
          href="/contacto"
          className="animate-fade-in-up bg-primary text-on-primary rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition hover:opacity-90 active:scale-[0.97]"
          style={{ animationDelay: "300ms" }}
        >
          Ir a Contacto
        </Link>
      </div>
    </section>
  );
}
