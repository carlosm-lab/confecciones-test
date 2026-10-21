import { geoZonaOriental, geoRestoPais } from "@/lib/seo-data";

function MuniList({ items }: { items: string[] }) {
  return (
    <ul className="text-on-surface-variant space-y-1 text-xs">
      {items.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}

export function CoberturaNacional() {
  return (
    <section
      aria-labelledby="cobertura-heading"
      className="bg-surface-container-low lazy-section px-5 py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-screen-2xl">
        <h2
          id="cobertura-heading"
          className="text-primary mb-4 text-center font-serif text-2xl"
        >
          Enviamos uniformes y scrubs a todo El Salvador
        </h2>
        <p className="text-on-surface-variant mb-10 w-full text-left text-sm md:text-center">
          Desde nuestro taller en <strong>San Miguel</strong>, enviamos con pago
          al recibir a cualquier municipio de los 14 departamentos de El
          Salvador. Confecciones Liss llega hasta ti.
        </p>

        {/* ZONA ORIENTAL */}
        <div className="mb-8">
          <h3 className="text-primary mb-4 font-serif text-xl font-semibold">
            🔵 Zona Oriental — Entrega rápida y recogida en nuestro local
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                San Miguel (Oficina central)
              </h4>
              <MuniList items={geoZonaOriental.sanMiguel} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                Usulután
              </h4>
              <MuniList items={geoZonaOriental.usulutan} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                La Unión
              </h4>
              <MuniList items={geoZonaOriental.laUnion} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                Morazán
              </h4>
              <MuniList items={geoZonaOriental.morazan} />
            </div>
          </div>
        </div>

        {/* RESTO DEL PAÍS */}
        <div>
          <h3 className="text-primary mb-4 font-serif text-xl font-semibold">
            🟢 Todo El Salvador — Envío con pago al recibir
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                San Salvador
              </h4>
              <MuniList items={geoRestoPais.sanSalvador} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                La Libertad
              </h4>
              <MuniList items={geoRestoPais.laLibertad} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                Santa Ana
              </h4>
              <MuniList items={geoRestoPais.santaAna} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                Sonsonate / La Paz
              </h4>
              <MuniList items={geoRestoPais.sonsonateLaPaz} />
            </div>
            <div>
              <h4 className="text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                Resto del país
              </h4>
              <MuniList items={geoRestoPais.resto} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
