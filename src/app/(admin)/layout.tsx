import type { Metadata } from "next";

/**
 * Layout del grupo de rutas (admin).
 * No incluye el navbar/footer público.
 * Los Client Components dentro leen AuthContext para protección.
 *
 * robots noindex/nofollow — el panel de administración nunca debe
 * aparecer en resultados de búsqueda.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
