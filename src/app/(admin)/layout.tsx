/**
 * Layout del grupo de rutas (admin).
 * No incluye el navbar/footer público.
 * Los Client Components dentro leen AuthContext para protección.
 */
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
