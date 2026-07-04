"use client";

import { ServicioBordadosDetalle } from "./ServicioBordadosDetalle";
import { ServicioSublimacionDetalle } from "./ServicioSublimacionDetalle";
import { ServicioSastreriaDetalle } from "./ServicioSastreriaDetalle";
import { ServicioManoObraDetalle } from "./ServicioManoObraDetalle";
import { ServicioRopaCasualDetalle } from "./ServicioRopaCasualDetalle";
import { ServicioDetalleGeneric } from "./ServicioDetalleGeneric";

import { ServicePage } from "@/data/services";

interface ServicioDetallePageProps {
  service: ServicePage;
}

export function ServicioDetallePage({ service }: ServicioDetallePageProps) {
  if (service.slug === "bordados-personalizados") {
    return <ServicioBordadosDetalle service={service} />;
  }

  if (service.slug === "sublimacion") {
    return <ServicioSublimacionDetalle service={service} />;
  }

  if (service.slug === "confeccion-a-medida") {
    return <ServicioSastreriaDetalle service={service} />;
  }

  if (service.slug === "mano-de-obra") {
    return <ServicioManoObraDetalle service={service} />;
  }

  if (service.slug === "ropa-general") {
    return <ServicioRopaCasualDetalle />;
  }

  return <ServicioDetalleGeneric service={service} />;
}
