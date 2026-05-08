"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  className?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function QuoteForm({ className }: QuoteFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const quantity = data.get("quantity") as string;
    const message = data.get("message") as string;

    // Build WhatsApp message with form data
    const waMessage = [
      `*Solicitud de Cotización Corporativa*`,
      ``,
      `👤 *Nombre:* ${name}`,
      company ? `🏢 *Empresa:* ${company}` : "",
      `📧 *Email:* ${email}`,
      `📱 *Teléfono:* ${phone}`,
      quantity ? `📦 *Cantidad:* ${quantity}` : "",
      message ? `📝 *Detalles:* ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      // Open WhatsApp with the formatted message
      window.open(
        `https://wa.me/50373317181?text=${encodeURIComponent(waMessage)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8",
        className
      )}
    >
      <h3 className="font-headline text-primary mb-2 text-xl font-bold">
        Solicitar Cotización Corporativa
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        Completa el formulario y nos comunicaremos contigo en menos de 24 horas.
      </p>

      {status === "success" && (
        <div
          role="alert"
          className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800"
        >
          <span
            className="material-symbols-outlined text-lg"
            aria-hidden="true"
          >
            check_circle
          </span>
          ¡Solicitud enviada con éxito! Te contactaremos pronto.
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800"
        >
          <span
            className="material-symbols-outlined text-lg"
            aria-hidden="true"
          >
            error
          </span>
          Hubo un problema al enviar. Intenta de nuevo o contáctanos por
          WhatsApp directamente.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        noValidate
      >
        <div>
          <label
            htmlFor="quote-name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Nombre completo
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Tu nombre"
            className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:ring-1 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="quote-company"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Empresa / Institución
          </label>
          <input
            id="quote-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Nombre de tu empresa"
            className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:ring-1 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="quote-email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="tu@empresa.com"
            className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:ring-1 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="quote-phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Teléfono / WhatsApp
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+503 7331-7181"
            className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:ring-1 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="quote-quantity"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Cantidad aproximada
          </label>
          <select
            id="quote-quantity"
            name="quantity"
            className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-700 focus:ring-1 focus:outline-none"
          >
            <option value="">Selecciona</option>
            <option value="10-25">10 - 25 unidades</option>
            <option value="25-50">25 - 50 unidades</option>
            <option value="50-100">50 - 100 unidades</option>
            <option value="100+">Más de 100 unidades</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="quote-message"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Detalles del pedido
          </label>
          <textarea
            id="quote-message"
            name="message"
            rows={4}
            placeholder="Describe el tipo de uniformes, personalización, colores, etc."
            className="focus:border-primary focus:ring-primary w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-1 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-primary w-full cursor-pointer rounded-lg py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? "Enviando..."
              : "Enviar solicitud de cotización"}
          </button>
        </div>
      </form>
    </div>
  );
}
