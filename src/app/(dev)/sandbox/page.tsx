import SublimacionPageClient from "@/components/servicios/SublimacionPageClient";

export default function SandboxPage() {
  const mockOtherServices = [
    {
      slug: "bordados-personalizados",
      title: "Servicio de Bordado Computarizado",
      navLabel: "Bordados",
      navIcon: "draw",
    },
    {
      slug: "confeccion-a-medida",
      title: "Confección y Sastrería a la Medida",
      navLabel: "A Medida",
      navIcon: "straighten",
    },
    {
      slug: "mano-de-obra",
      title: "Servicio de Solo Mano de Obra",
      navLabel: "Mano de Obra",
      navIcon: "construction",
    },
    {
      slug: "ropa-general",
      title: "Confección de Ropa Casual y de Vestir",
      navLabel: "Ropa General",
      navIcon: "checkroom",
    },
  ];

  return (
    <div className="py-10">
      <div className="mx-auto mb-6 max-w-screen-2xl px-5 md:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-mono text-xs text-amber-900">
          <strong>ENTORNO DE SANDBOX DE DESARROLLO</strong>
          <br />
          Esta ruta se utiliza exclusivamente para validar visualmente y probar
          la interactividad del componente de sublimación.
        </div>
      </div>
      <SublimacionPageClient otherServices={mockOtherServices} />
    </div>
  );
}
