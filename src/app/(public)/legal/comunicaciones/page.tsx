import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import {
  Section,
  Hr,
  P,
  Ul,
  LegalFootnote,
} from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Política de Comunicaciones Comerciales — Políticas Oficiales",
  description:
    "Política de Comunicaciones Comerciales de Confecciones Liss. Conoce las condiciones bajo las cuales gestionamos WhatsApp, redes sociales y otros canales de atención oficiales.",
  alternates: { canonical: `${siteConfig.url}/legal/comunicaciones` },
  openGraph: {
    title: "Política de Comunicaciones Comerciales | Confecciones Liss",
    description:
      "Política de Comunicaciones Comerciales de Confecciones Liss. Conoce las condiciones bajo las cuales gestionamos WhatsApp, redes sociales y otros canales de atención oficiales.",
    url: `${siteConfig.url}/legal/comunicaciones`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Comunicaciones Comerciales | Confecciones Liss",
    description:
      "Política de Comunicaciones Comerciales de Confecciones Liss. Conoce las condiciones bajo las cuales gestionamos WhatsApp, redes sociales y otros canales de atención oficiales.",
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PoliticaComunicacionesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/comunicaciones`;
  const PAGE_TITLE = "Política de Comunicaciones";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Comunicaciones Comerciales — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Comunicaciones Comerciales de Confecciones Liss. Conoce las condiciones bajo las cuales gestionamos WhatsApp, redes sociales y otros canales de atención oficiales.",
        }),
        "@type": "Article",
        author: { "@id": `${siteConfig.url}/#business` },
        datePublished: "2026-06-24",
      },
      buildBreadcrumbSchema([
        { name: "Inicio", item: siteConfig.url },
        { name: "Legal", item: `${siteConfig.url}/legal` },
        { name: PAGE_TITLE, item: PAGE_URL },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hub background — only shown on desktop where the blur overlay exists. */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden select-none lg:block"
      >
        <LegalHubBackground animated={false} />
      </div>

      <LegalArticleReader
        title="Política de Comunicaciones Comerciales (WhatsApp y Redes Sociales Oficiales)"
        date="24 Jun, 2026"
        readingTime={12}
      >
        <P>
          La presente Política de Comunicaciones Comerciales (en adelante
          &quot;la Política&quot;) regula de manera integral, exhaustiva y
          vinculante las condiciones bajo las cuales Confecciones Liss (en
          adelante &quot;el Taller&quot;) gestiona sus comunicaciones
          comerciales con clientes, usuarios y el público en general, a través
          de sus canales digitales oficiales, incluyendo WhatsApp, redes
          sociales y cualquier otra plataforma de comunicación declarada oficial
          por el Taller.
        </P>
        <P>
          Toda persona natural que se comunique con el Taller a través de
          cualquiera de sus canales oficiales (en adelante &quot;el
          Usuario&quot; o &quot;el Cliente&quot;) declara haber leído,
          comprendido y aceptado en su integridad, de forma libre, voluntaria e
          informada, la totalidad de los términos aquí establecidos. El
          desconocimiento de esta Política no exime al Usuario de su
          cumplimiento.
        </P>
        <Hr />

        <Section n={1} title="Hub central de canales oficiales">
          <P>
            1.1 El directorio centralizado, actualizado y oficial de todos los
            canales de comunicación de Confecciones Liss se encuentra disponible
            en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <P>
            Este enlace constituye el punto de referencia único y definitivo
            para verificar la autenticidad de cualquier canal que afirme
            representar al Taller. Es responsabilidad del Usuario consultar este
            directorio antes de iniciar cualquier comunicación, gestión de
            pedido o transacción.
          </P>
          <P>
            1.2 Cualquier perfil en redes sociales, número de teléfono, cuenta
            de mensajería, correo electrónico, sitio web o cualquier otro canal
            de comunicación que afirme ser o representar a Confecciones Liss y
            que NO figure en el directorio disponible en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>{" "}
            debe considerarse NO OFICIAL y potencialmente fraudulento. El Taller
            no asume responsabilidad alguna por comunicaciones, acuerdos, pagos
            ni cualquier otra gestión realizada a través de canales no listados
            en dicho directorio.
          </P>
          <P>
            1.3 El Taller no reconocerá como válidos los pedidos, cotizaciones,
            pagos, acuerdos ni compromisos gestionados a través de canales no
            oficiales. El Usuario que realice transacciones fuera de los canales
            oficiales asume exclusiva e íntegramente el riesgo y las
            consecuencias de dicha actuación, incluyendo la posibilidad de ser
            víctima de fraude por parte de terceros que suplanten la identidad
            del Taller.
          </P>
          <P>
            1.4 Ante cualquier duda sobre la autenticidad de un canal, el
            Usuario debe verificar en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>{" "}
            antes de proceder con cualquier comunicación o transacción.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Canal oficial de WhatsApp">
          <P>
            2.1 El número de WhatsApp oficial y único de Confecciones Liss para
            la atención de clientes, recepción de pedidos, cotizaciones y
            comunicaciones comerciales en general es:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "700",
              color: "#16a34a",
              marginBottom: "0.75rem",
            }}
          >
            +503 7331-7181
          </div>
          <P>
            Este número corresponde al canal de atención comercial oficial del
            Taller y es el único número autorizado para gestionar comunicaciones
            en nombre de Confecciones Liss en la plataforma WhatsApp.
          </P>
          <P>
            2.2 El Taller no reconocerá ni asumirá responsabilidad por
            comunicaciones, acuerdos, instrucciones de pago ni compromisos
            transmitidos a través de números de WhatsApp distintos al indicado
            en el numeral anterior, independientemente de que dichos números
            afirmen pertenecer al Taller o a alguno de sus colaboradores.
          </P>
          <P>
            2.3 <strong>ENCARGADO DE COMUNICACIONES.</strong> El encargado
            oficial de comunicaciones, mediación de conflictos y representación
            del Taller ante terceros es:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              lineHeight: "1.6",
              marginBottom: "0.75rem",
            }}
          >
            <strong>Carlos José Molina Villacorta</strong>
            <br />
            Encargado de Comunicaciones — Confecciones Liss
            <br />
            Contacto directo: <strong>+503 7329-4499</strong> (solo para
            mediación y resolución de conflictos)
          </div>
          <P>
            Las comunicaciones dirigidas al Encargado de Comunicaciones a través
            de su número personal tienen carácter de comunicación interna y de
            gestión de conflictos. Toda gestión comercial ordinaria debe
            realizarse a través del canal de atención oficial indicado en el
            numeral 2.1.
          </P>
          <P>
            2.4 El número personal del Encargado de Comunicaciones (+503
            7329-4499) no es un canal de ventas ni de atención al cliente para
            pedidos ordinarios. Su uso está reservado para la mediación de
            conflictos, escalamiento de reclamaciones y comunicaciones
            institucionales que requieran la intervención directa del
            representante del Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Mensajes pre-formateados y plantillas de comunicación"
        >
          <P>
            3.1 La plataforma web del Taller (
            <Link
              href="https://www.confeccionesliss.com/"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/
            </Link>
            ) genera mensajes pre-formateados o plantillas de pedido que se
            abren automáticamente en WhatsApp cuando el Usuario decide iniciar
            un pedido desde la Plataforma. Estos mensajes están diseñados para
            facilitar al Cliente la comunicación con el Taller, asegurando que
            la información mínima necesaria para gestionar un pedido sea
            transmitida de forma estructurada y eficiente.
          </P>
          <P>
            3.2 El Usuario puede editar libremente el contenido del mensaje
            pre-formateado antes de enviarlo, adecuándolo a sus necesidades
            particulares. El Taller no impone el uso del mensaje en su forma
            original.
          </P>
          <P>
            3.3 Sin embargo, el Usuario es el único y exclusivo responsable de
            las consecuencias derivadas de cualquier modificación, eliminación u
            omisión de información en el mensaje pre-formateado. En particular:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Si el Usuario elimina o modifica campos de información
              relevantes (talla, modelo, cantidad, diseño, datos de contacto u
              otros), el Taller no asumirá responsabilidad por la gestión
              incorrecta, incompleta o demorada del pedido de la prenda o
              servicio derivada de dicha omisión.
            </P>
            <P>
              b) Si la información transmitida en el mensaje es incompleta, el
              Taller solicitará los datos faltantes. El cómputo del tiempo de
              producción no iniciará hasta recibir la información completa,
              conforme a la Política de Confección disponible en:{" "}
              <Link
                href="/legal/confeccion"
                className="text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </P>
            <P>
              c) El Cliente no podrá invocar el contenido del mensaje
              pre-formateado como compromiso del Taller si dicho mensaje fue
              editado de forma tal que eliminó o alteró información esencial del
              pedido.
            </P>
          </div>
          <P>
            3.4 Los mensajes pre-formateados son una herramienta de facilitación
            de la comunicación, no un contrato de compraventa. El pedido se
            formaliza únicamente cuando el Taller confirma por escrito la
            aceptación del pedido y se recibe el anticipo correspondiente,
            conforme a las políticas del Taller.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Horario de atención y tiempos de respuesta">
          <P>
            4.1 El Taller atiende comunicaciones a través de sus canales
            oficiales en el siguiente horario:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            Lunes a Sábado: 8:00 AM – 5:00 PM (hora de El Salvador)
          </div>
          <P>
            4.2 Los mensajes recibidos fuera del horario de atención serán
            atendidos en el siguiente día hábil, en orden de recepción y
            conforme a la capacidad operativa del Taller. El Taller realizará
            esfuerzos razonables por responder en tiempo oportuno, pero no
            garantiza tiempos de respuesta inmediatos ni exactos.
          </P>
          <P>
            4.3 El Taller no está obligado a atender comunicaciones recibidas en
            días festivos nacionales ni en períodos de cierre por causas
            operativas o de fuerza mayor, que serán comunicados cuando sea
            posible a través de sus canales oficiales.
          </P>
          <P>
            4.4 Los tiempos de respuesta pueden extenderse durante períodos de
            alta demanda, tales como los períodos de nuevo ingreso universitario
            y vacaciones de interciclo, en los que el volumen de consultas
            aumenta significativamente. El Usuario reconoce esta condición y
            renuncia a reclamar perjuicios por demoras en la respuesta durante
            dichos períodos.
          </P>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Condiciones de uso de los canales de comunicación"
        >
          <P>
            5.1 El Usuario se compromete a utilizar los canales de comunicación
            oficiales del Taller de forma respetuosa, leal y conforme a las
            presentes condiciones. Está expresamente prohibido:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Enviar mensajes con contenido amenazante, intimidatorio,
              ofensivo, insultante, difamatorio o contrario a la ley salvadoreña
              a través de cualquier canal oficial del Taller.
            </P>
            <P>
              b) Utilizar los canales del Taller para difundir información
              falsa, engañosa o perjudicial para el Taller o terceros.
            </P>
            <P>
              c) Saturar los canales del Taller mediante el envío masivo,
              repetitivo o automatizado de mensajes.
            </P>
            <P>
              d) Hacerse pasar por otra persona o suplantar la identidad de un
              cliente del Taller al comunicarse.
            </P>
            <P>
              e) Solicitar información confidencial del Taller o de otros
              clientes a través de los canales de comunicación.
            </P>
          </div>
          <P>
            5.2 <strong>TERMINACIÓN DE LA COMUNICACIÓN.</strong> El Taller se
            reserva el derecho de dar por terminada cualquier comunicación en
            curso, de forma inmediata y sin previo aviso, ante cualquiera de las
            siguientes circunstancias:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El Usuario profiere amenazas de cualquier naturaleza, ya sea
              contra el Taller, su personal o terceros.
            </P>
            <P>
              b) El Usuario utiliza lenguaje insultante, degradante, ofensivo o
              irrespetuoso de cualquier tipo.
            </P>
            <P>
              c) El Usuario incurre en conductas de hostigamiento, acoso o
              presión indebida sobre el personal del Taller.
            </P>
            <P>
              d) El Usuario persiste en solicitudes que han sido rechazadas
              conforme a las políticas del Taller, de forma reiterada y de mala
              fe.
            </P>
            <P>
              e) Cualquier otra conducta que, a juicio del Taller, resulte
              contraria a los principios de buena fe, respeto mutuo y lealtad
              comercial establecidos en la Política de Deberes del Usuario
              disponible en:{" "}
              <Link
                href="/legal/deberes"
                className="text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </P>
          </div>
          <P>
            5.3 La terminación de una comunicación por las causas descritas en
            el numeral anterior no genera para el Usuario derecho a
            compensación, devolución de anticipos ni continuación del servicio,
            salvo lo que corresponda conforme a las políticas específicas del
            Taller.
          </P>
          <P>
            5.4 El Taller podrá bloquear al Usuario en sus canales de
            comunicación cuando la conducta del mismo sea de forma reiterada
            irrespetuosa o contraria a las presentes condiciones, sin que esto
            genere responsabilidad alguna para el Taller.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Redes sociales oficiales">
          <P>
            6.1 Las redes sociales oficiales de Confecciones Liss son
            exclusivamente las que figuran en el directorio central disponible
            en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <P>
            6.2 Cualquier perfil, página, grupo, canal o cuenta en cualquier red
            social o plataforma digital que utilice el nombre &quot;Confecciones
            Liss&quot;, variaciones del mismo, o la identidad visual del Taller,
            y que NO esté listado en el directorio oficial indicado en el
            numeral anterior, debe considerarse NO OFICIAL. El Taller no asume
            responsabilidad alguna por el contenido, acuerdos, pagos o cualquier
            otra gestión realizada a través de perfiles no oficiales.
          </P>
          <P>
            6.3 El Taller reportará activamente ante las plataformas
            correspondientes los perfiles que suplanten su identidad o que
            utilicen su nombre, logo o identidad visual sin autorización.
          </P>
          <P>
            6.4 El contenido publicado en las redes sociales oficiales del
            Taller está sujeto a las condiciones de uso de cada plataforma, así
            como a las políticas del Taller disponibles en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
          </P>
          <P>
            6.5 El Taller modera sus canales de redes sociales conforme a los
            principios de respeto mutuo y buena fe. Los comentarios que
            contengan insultos, amenazas, información falsa o contenido
            contrario a las condiciones de uso de la plataforma o a las
            presentes políticas serán eliminados y, de ser necesario, el Usuario
            podrá ser bloqueado de los canales oficiales.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Privacidad en las comunicaciones">
          <P>
            7.1 Las comunicaciones intercambiadas entre el Usuario y el Taller a
            través de WhatsApp u otros canales de mensajería son tratadas como
            información confidencial de la relación comercial. El Taller no
            comparte el contenido de dichas comunicaciones con terceros ajenos a
            la gestión del pedido, salvo en los casos estrictamente necesarios
            para la prestación del servicio o cuando sea requerido por autoridad
            competente conforme a la ley.
          </P>
          <P>
            7.2 Los mensajes de contacto recibidos a través del formulario de la
            Plataforma web son tratados conforme a la Política de Privacidad del
            Taller, disponible en:{" "}
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>
          </P>
          <P>
            7.3 El Usuario reconoce que las comunicaciones realizadas a través
            de WhatsApp están sujetas a las políticas de privacidad de Meta
            Platforms, Inc., sobre las que el Taller no tiene control ni
            responsabilidad.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Exención de responsabilidad del Taller">
          <P>
            8.1 Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Comunicaciones, acuerdos o transacciones realizadas a través de
              canales no oficiales del Taller, incluyendo perfiles falsos que
              suplanten la identidad del Taller.
            </P>
            <P>
              b) La pérdida, alteración o acceso no autorizado a comunicaciones
              realizadas a través de plataformas de terceros como WhatsApp, cuya
              seguridad depende de dichas plataformas.
            </P>
            <P>
              c) Demoras en la respuesta derivadas de alta demanda operativa,
              horario fuera de atención o causas de fuerza mayor.
            </P>
            <P>
              d) Malentendidos derivados de mensajes pre-formateados editados
              por el propio Usuario que hayan resultado en información
              incompleta o incorrecta transmitida al Taller.
            </P>
            <P>
              e) Interrupciones en el servicio de WhatsApp, redes sociales u
              otras plataformas de comunicación que impidan temporalmente el
              contacto con el Taller.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={9} title="Relación con otras políticas del Taller">
          <P>
            9.1 La presente Política forma parte integral del marco jurídico de
            Confecciones Liss y debe interpretarse de forma complementaria con:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              marginBottom: "0.75rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Privacidad:</strong>{" "}
                <Link
                  href="/legal/privacidad"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/privacidad
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Términos y Condiciones de Uso:</strong>{" "}
                <Link
                  href="/legal/terminos"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/terminos
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Deberes del Usuario:</strong>{" "}
                <Link
                  href="/legal/deberes"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/deberes
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Cotizaciones:</strong>{" "}
                <Link
                  href="/legal/cotizaciones"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/cotizaciones
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Confección:</strong>{" "}
                <Link
                  href="/legal/confeccion"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/confeccion
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Resolución de Disputas:</strong>{" "}
                <Link
                  href="/legal/disputas"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/disputas
                </Link>
              </div>
            </div>
          </div>
        </Section>
        <Hr />

        <Section n={10} title="Modificaciones y divisibilidad">
          <P>
            10.1 Confecciones Liss se reserva el derecho de modificar la
            presente Política en cualquier momento, publicando la versión
            actualizada en sus canales oficiales. Las modificaciones entrarán en
            vigencia de forma inmediata desde su publicación.
          </P>
          <P>
            10.2 Si alguna disposición fuera declarada inválida, las restantes
            continuarán en plena vigencia.
          </P>
        </Section>

        <LegalFootnote>
          <div style={{ fontWeight: "700", marginBottom: "0.5rem" }}>
            CONFECCIONES LISS — CONTACTO OFICIAL
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            Toda gestión exclusivamente a través de:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "0.25rem 1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ fontWeight: "600" }}>WhatsApp oficial:</span>
            <span style={{ color: "#16a34a", fontWeight: "600" }}>
              +503 7331-7181
            </span>

            <span style={{ fontWeight: "600" }}>
              Encargado de Comunicaciones:
            </span>
            <span>Carlos José Molina Villacorta</span>

            <span style={{ fontWeight: "600" }}>Contacto del Encargado:</span>
            <span>+503 7329-4499 (solo mediación y conflictos)</span>

            <span style={{ fontWeight: "600" }}>
              Política de Comunicaciones:
            </span>
            <Link
              href="/legal/comunicaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/comunicaciones
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Privacidad:</span>
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>

            <span style={{ fontWeight: "600" }}>Términos y Condiciones:</span>
            <Link
              href="/legal/terminos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terminos
            </Link>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              lineHeight: "1.4",
            }}
          >
            <strong>Dirección:</strong> Barrio La Merced, 5ª Calle Poniente y 1ª
            Avenida Sur, Casa #402, San Miguel, El Salvador.
            <br />
            <strong>Horario:</strong> Lunes a Sábado, 8:00 AM – 5:00 PM
            <br />
            <strong>Vigente desde su publicación — Versión:</strong> Junio 2026
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
