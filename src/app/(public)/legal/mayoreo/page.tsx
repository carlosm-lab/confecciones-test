import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import { Section, P, Ul } from "@/components/legal/LegalContent";

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Política de Pedidos en Grupo y Mayoreo | Confecciones Liss",
  description:
    "Condiciones y términos aplicables a pedidos corporativos, estudiantiles y colectivos por mayoreo en Confecciones Liss. Mínimos, anticipos y entregas.",
  alternates: {
    canonical: `${siteConfig.url}/legal/mayoreo`,
  },
  openGraph: {
    title: "Política de Pedidos en Grupo y Mayoreo | Confecciones Liss",
    description:
      "Consulta los requisitos de cantidad mínima, esquemas de anticipo y condiciones de entrega para compras grupales y mayoristas.",
    url: `${siteConfig.url}/legal/mayoreo`,
    siteName: siteConfig.name,
    locale: "es_CO",
    type: "article",
  },
};

/* ── JSON-LD ──────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/legal/mayoreo`,
      url: `${siteConfig.url}/legal/mayoreo`,
      name: "Política de Pedidos en Grupo y Mayoreo",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      inLanguage: "es-CO",
      datePublished: "2026-06-25",
      dateModified: "2026-06-25",
    },
    {
      "@type": "Article",
      "@id": `${siteConfig.url}/legal/mayoreo#article`,
      headline: "Política de Pedidos en Grupo y Mayoreo — Confecciones Liss",
      datePublished: "2026-06-25",
      dateModified: "2026-06-25",
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      inLanguage: "es-CO",
      isPartOf: { "@id": `${siteConfig.url}/legal/mayoreo` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${siteConfig.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Legal",
          item: `${siteConfig.url}/legal`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Mayoreo",
          item: `${siteConfig.url}/legal/mayoreo`,
        },
      ],
    },
  ],
};

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function MayoreoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LegalArticleReader
        title="Política de Pedidos en Grupo y Mayoreo"
        category="Regulación de compras corporativas, colectivos de estudiantes y pedidos a gran escala fabricados por Confecciones Liss."
        date="25 Jun, 2026"
        readingTime={10}
      >
        {/* ── 1. Introducción ────────────────────────────────────────────── */}
        <Section n={1} title="Introducción y Ámbito de Aplicación">
          <P>
            La presente Política de Pedidos en Grupo y Mayoreo (en adelante, la
            &quot;Política&quot;) regula los términos y condiciones bajo los
            cuales Confecciones Liss (en adelante, el &quot;Taller&quot;)
            recibe, procesa, fabrica y entrega pedidos a gran escala solicitados
            por grupos organizados de personas naturales, colectivos
            estudiantiles, promociones académicas, empresas o instituciones.
          </P>
          <P>
            Esta Política es vinculante y complementaria a nuestros Términos y
            Condiciones Generales, la Política de Confección Personalizada y la
            Política de Devoluciones. Toda solicitud de cotización o inicio de
            un pedido grupal presupone la aceptación incondicional de estas
            reglas por parte del representante del grupo y de cada uno de sus
            integrantes individuales.
          </P>
        </Section>

        {/* ── 2. Definición de Mayoreo ───────────────────────────────────── */}
        <Section n={2} title="Definición de Mayoreo y Cantidades Mínimas">
          <P>
            Para que un pedido sea considerado bajo la modalidad de Mayoreo y
            pueda acceder a tarifas preferenciales, condiciones específicas de
            diseño y esquemas de facturación grupal, se deben cumplir los
            siguientes mínimos de volumen y condiciones de solicitud:
          </P>
          <Ul
            items={[
              "Empresas e Instituciones Corporativas: El volumen mínimo requerido para aplicar a la tarifa de mayoreo es a partir de doce (12) conjuntos completos de uniforme o prendas individuales equivalentes.",
              "Estudiantes, Colectivos y Personas Naturales: El volumen mínimo requerido es a partir de ocho (8) conjuntos completos de uniformes solicitados bajo un mismo requerimiento de confección.",
              "Requisito de Colectividad Activa: Para la aplicación de esta modalidad, el grupo de clientes interesados debe comparecer y tramitar el pedido en conjunto. No se consolidarán pedidos individuales realizados de forma dispersa en fechas distintas para reclamar tarifas mayoristas de manera retroactiva.",
            ]}
          />
        </Section>

        {/* ── 3. Canales de Gestión y Atención ──────────────────────────── */}
        <Section n={3} title="Gestión del Pedido y Canales Oficiales">
          <P>
            El proceso de cotización, toma de medidas, aprobación de fichas
            técnicas y seguimiento de producción para pedidos de mayoreo es
            gestionado directamente por el Taller y requiere canales formales de
            comunicación para asegurar la trazabilidad del pedido:
          </P>
          <Ul
            items={[
              "Canal Principal de Ventas: Toda coordinación operativa debe iniciarse e instrumentarse a través del canal oficial de WhatsApp del Taller.",
              "Escalamiento e Intervención Directa: Para la mediación de contratos colectivos, resolución de dudas institucionales o coordinación de grandes cuentas, los clientes podrán comunicarse con nuestro Encargado de Comunicaciones Oficial, Carlos José Molina Villacorta, al número +503 7329-4499.",
            ]}
          />
        </Section>

        {/* ── 4. Esquema de Anticipos y Financiación ─────────────────────── */}
        <Section n={4} title="Esquema de Anticipos y Adelantos de Fabricación">
          <P>
            Ningún pedido de mayoreo ingresará a la cola de programación de
            diseño ni a la mesa de corte y confección sin la acreditación previa
            del anticipo correspondiente. El porcentaje del anticipo requerido
            varía de acuerdo con la forma de recaudo elegida por el grupo de
            clientes:
          </P>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                4.1. Anticipo Consolidado (Pago a través de un Representante)
              </strong>
            </P>
            <P>
              Cuando el grupo designa a un único delegado o representante para
              coordinar y realizar el recaudo total del dinero, y este efectúa
              un único desembolso unificado al Taller, se exigirá un anticipo
              obligatorio equivalente al{" "}
              <strong>50% del valor total presupuestado</strong>. El 50%
              restante deberá liquidarse en una única transacción consolidada
              antes o en el momento exacto de la entrega de la producción.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                4.2. Anticipo Individualizado (Pagos por Cuenta Separada)
              </strong>
            </P>
            <P>
              Cuando el grupo de estudiantes o clientes solicita que el recaudo
              se realice de manera individual (donde cada integrante realiza su
              pago y abono directamente al Taller), se exigirá a cada persona un
              anticipo individual de entre el{" "}
              <strong>25% y el 50% del valor de su uniforme</strong>. La
              asignación del porcentaje exacto dentro de este rango dependerá de
              la complejidad del diseño, personalización e insumos especiales
              requeridos por el colectivo, y será determinada por el Taller al
              momento de formalizar la cotización.
            </P>
          </div>
        </Section>

        {/* ── 5. Responsabilidad de Pago y Políticas de Entrega ─────────── */}
        <Section n={5} title="Condiciones de Entrega y Responsabilidad de Pago">
          <P>
            La entrega de las prendas confeccionadas bajo la modalidad de
            mayoreo está sujeta a la liquidación absoluta del saldo pendiente.
            El Taller aplica un principio de integridad financiera del pedido
            conforme a las siguientes reglas:
          </P>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.1. Entrega Condicionada a la Liquidación Total</strong>
            </P>
            <P>
              Las prendas confeccionadas se entregarán a los clientes únicamente
              cuando se haya cancelado el monto total pendiente del adelanto y
              la liquidación final. Si el pago total de la orden de compra no se
              encuentra completo, el Taller no entregará ningún uniforme,
              salvaguardando los costos de confección y materias primas del
              proyecto colectivo.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                5.2. Falta de Pago Equivalente a Uniformes Individuales
              </strong>
            </P>
            <P>
              Si al momento de la entrega del pedido grupal el monto recaudado
              presenta un faltante equivalente al valor de uno o más uniformes,
              dichos uniformes específicos no serán entregados. En este
              escenario, el Taller retendrá las prendas correspondientes al
              faltante de dinero y aplicará las políticas de abandono de
              mercancía y compensación económica estipuladas en nuestra Política
              de Promociones.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                5.3. Retención en Modalidad de Pago por Cuenta Separada
              </strong>
            </P>
            <P>
              En el caso de grupos que hayan optado por el esquema de pago
              individualizado, la prenda se entregará únicamente a los miembros
              que hayan cancelado el 100% de su saldo personal. Aquel integrante
              que no entregue el monto total correspondiente a su prenda no
              recibirá su uniforme, el cual permanecerá retenido en las
              instalaciones del Taller hasta su pago total o la declaración de
              su pérdida de abono.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.4. Retención en Modalidad de Pago por Delegado</strong>
            </P>
            <P>
              Si el grupo gestiona sus pagos a través de un delegado o
              representante y el saldo final cancelado por este no cubre el
              total de la orden de compra colectiva, el Taller entregará única y
              exclusivamente la cantidad de uniformes que queden completamente
              cubiertos por el monto parcial que haya sido efectivamente
              cancelado hasta el momento. La selección de qué prendas se
              entregan y cuáles quedan retenidas por falta de pago será
              responsabilidad exclusiva del delegado del grupo, eximiendo al
              Taller de cualquier reclamación interna entre los miembros del
              colectivo.
            </P>
          </div>
        </Section>

        {/* ── 6. Cancelaciones y Penalizaciones ──────────────────────────── */}
        <Section n={6} title="Cancelaciones, Devoluciones y Modificaciones">
          <P>
            Dada la naturaleza personalizada y de producción en cadena que
            caracteriza a los pedidos por mayoreo, la cancelación de la
            participación de un miembro del grupo o el desistimiento del pedido
            completo se rige por las siguientes penalizaciones estrictas:
          </P>
          <Ul
            items={[
              "Inexistencia de Devoluciones: Si algún integrante del grupo decide cancelar su pedido o retirarse del colectivo después de haberse realizado el anticipo y comenzado el proceso, se aplicará estrictamente lo estipulado en nuestra Política de Devoluciones (disponible en /legal/devoluciones). Por consiguiente, no existirá devolución alguna del dinero abonado en concepto de anticipo, el cual se destinará a cubrir los gastos de corte de tela, adquisición de insumos y reserva de capacidad de producción.",
              "Venta y Liquidación de Uniformes Cancelados: Las prendas que correspondan a cancelaciones o que queden retenidas por falta de pago por más de treinta (30) días calendario a partir de la fecha de notificación de entrega, quedarán a entera disposición del Taller. A estos uniformes se les aplicarán las políticas de comercialización y liquidación previstas en nuestra Política de Promociones (disponible en /legal/promociones), perdiendo el cliente cualquier derecho a reclamar la prenda o compensación económica posterior.",
            ]}
          />
        </Section>

        {/* ── 7. Disposiciones Finales y Vigencia ───────────────────────── */}
        <Section n={7} title="Disposiciones Finales">
          <P>
            El Taller no asume responsabilidad alguna por conflictos internos,
            desavenencias, malversación de fondos o incumplimientos de pago que
            ocurran en el seno del grupo de clientes, estudiantes o empresas. El
            interlocutor oficial ante el Taller es el representante registrado,
            y las condiciones de entrega se regirán estrictamente por el balance
            de la cuenta contable de la orden de compra.
          </P>
          <P>
            Esta Política de Pedidos en Grupo y Mayoreo constituye un acuerdo
            adicional que resguarda la viabilidad operativa y financiera de la
            producción en lote del Taller. Su vigencia inicia a partir del
            <strong> 25 de junio de 2026</strong> y se aplicará a todo pedido
            colectivo que se cotice a partir de dicha fecha.
          </P>
          <P>
            <em>
              Confecciones Liss — Calidad y cumplimiento para tu colectivo.
            </em>
          </P>
        </Section>
      </LegalArticleReader>
    </>
  );
}
