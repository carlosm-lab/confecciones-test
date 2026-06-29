import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamData } from "@/data/team";
import PerfilDetalleClient from "@/components/empresa/PerfilDetalleClient";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return teamData.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamData.find((m) => m.slug === slug);

  if (!member) {
    return {
      title: "Miembro no encontrado | Confecciones Liss",
    };
  }

  const PAGE_TITLE = `${member.name} - ${member.role} | Confecciones Liss`;
  const PAGE_DESCRIPTION = `${member.name} es ${member.role} en Confecciones Liss. Conoce su rol técnico, trayectoria y especialidad en el taller de San Miguel.`;
  const PAGE_URL = `${siteConfig.url}/empresa/equipo/${member.slug}`;

  return {
    title: { absolute: PAGE_TITLE },
    description: PAGE_DESCRIPTION,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function MemberProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = teamData.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return <PerfilDetalleClient member={member} />;
}
