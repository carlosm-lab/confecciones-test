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
  title:
    "Política de Contenido Generado por el Usuario (UGC) — Políticas Oficiales",
  description:
    "Política de Contenido Generado por el Usuario (UGC) de Confecciones Liss. Conoce las condiciones de republicación, licencias y moderación de contenido digital.",
  alternates: { canonical: `${siteConfig.url}/legal/ugc` },
  openGraph: {
    title:
      "Política de Contenido Generado por el Usuario (UGC) | Confecciones Liss",
    description:
      "Política de Contenido Generado por el Usuario (UGC) de Confecciones Liss. Conoce las condiciones de republicación, licencias y moderación de contenido digital.",
    url: `${siteConfig.url}/legal/ugc`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Política de Contenido Generado por el Usuario (UGC) | Confecciones Liss",
    description:
      "Política de Contenido Generado por el Usuario (UGC) de Confecciones Liss. Conoce las condiciones de republicación, licencias y moderación de contenido digital.",
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

export default function PoliticaUgcPage() {
  const PAGE_URL = `${siteConfig.url}/legal/ugc`;
  const PAGE_TITLE = "Política de UGC";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Contenido Generado por el Usuario (UGC) — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Contenido Generado por el Usuario (UGC) de Confecciones Liss. Conoce las condiciones de republicación, licencias y moderación de contenido digital.",
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
        title="Política de Contenido Generado por el Usuario (UGC)"
        date="24 Jun, 2026"
        readingTime={12}
      >
        <P>
          La presente Política de Contenido Generado por el Usuario (en adelante
          &quot;la Política&quot;) regula de manera integral, exhaustiva y
          vinculante las condiciones bajo las cuales Confecciones Liss (en
          adelante &quot;el Taller&quot;) trata, utiliza, republica, modera o
          retira el contenido publicado, compartido o difundido por terceros (en
          adelante &quot;el Usuario&quot; o &quot;el Cliente&quot;) en relación
          con el Taller, sus productos, sus servicios o su identidad comercial,
          a través de redes sociales, plataformas digitales, reseñas, etiquetas,
          menciones, comentarios u otros medios digitales.
        </P>
        <P>
          Se entiende por &quot;Contenido Generado por el Usuario&quot; o
          &quot;UGC&quot; (por sus siglas en inglés, User Generated Content)
          todo material —incluyendo fotografías, videos, textos, reseñas,
          comentarios, historias, publicaciones, etiquetas, menciones, stories,
          reels y cualquier otro formato digital— que un Usuario cree, publique
          o comparta de forma voluntaria y haciendo referencia, alusión directa
          o indirecta al Taller, a sus productos, a sus servicios, a su personal
          o a su identidad visual o comercial, en cualquier plataforma digital
          pública o semipública.
        </P>
        <P>
          Toda persona que genere, publique o comparta contenido que haga
          referencia al Taller declara haber leído, comprendido y aceptado en su
          integridad, de forma libre, voluntaria e informada, la totalidad de
          los términos aquí establecidos. La publicación de contenido UGC que
          mencione, etiquete o aluda al Taller implica la aceptación irrevocable
          de esta Política.
        </P>
        <Hr />

        <Section
          n={1}
          title="Derecho de republicación y uso del contenido UGC por el Taller"
        >
          <P>
            1.1 Cuando un Usuario publica contenido que menciona, etiqueta,
            aluda o haga referencia al Taller —ya sea mediante la mención
            directa del nombre o usuario oficial de Confecciones Liss, la
            utilización de hashtags asociados al Taller, la etiqueta de un canal
            oficial, o cualquier alusión que identifique al Taller como creador
            o proveedor de la prenda o servicio mostrado— el Taller adquiere el
            derecho de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Repostear, republicar, compartir o redistribuir dicho contenido
              en cualquiera de sus canales oficiales, incluyendo su sitio web (
              <Link
                href="https://www.confeccionesliss.com/"
                className="text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/
              </Link>
              ), sus perfiles en redes sociales, aplicaciones de mensajería y
              cualquier otro canal de comunicación oficial, sin necesidad de
              solicitar autorización adicional al Usuario.
            </P>
            <P>
              b) Utilizar dicho contenido con fines de portafolio, testimonios,
              evidencia de trabajo, materiales de comunicación comercial,
              campañas de difusión del Taller y cualquier otro fin relacionado
              con la promoción legítima del servicio de confección.
            </P>
            <P>
              c) Editar, recortar, adaptar o ajustar el contenido UGC para su
              adecuada integración en los canales del Taller, siempre que dicha
              edición no altere el sentido original del mensaje ni perjudique la
              reputación del Usuario.
            </P>
            <P>
              d) Conservar y archivar el contenido UGC republicado en los
              canales del Taller por el tiempo que el Taller considere
              pertinente para sus fines comerciales y de portafolio.
            </P>
          </div>
          <P>
            1.2 El derecho descrito en el numeral anterior nace de forma
            automática e irrevocable desde el momento en que el Usuario publica
            el contenido UGC con alusión al Taller, sin necesidad de aceptación
            expresa adicional, toda vez que la presente Política es pública,
            vigente y accesible, y su aceptación se presume desde la publicación
            del contenido.
          </P>
          <P>
            1.3 El Taller se compromete a realizar un esfuerzo razonable por
            acreditar al Usuario como autor del contenido al republicarlo,
            mediante mención de su perfil o nombre de usuario, salvo que el
            propio Usuario haya solicitado que no se le mencione, o que las
            características del formato de publicación no lo permitan.
          </P>
          <P>
            1.4 La republicación del contenido UGC por parte del Taller no
            implica ninguna compensación económica, comisión, regalo ni
            beneficio de ningún tipo para el Usuario, a menos que el Taller haya
            acordado expresamente condiciones distintas por escrito y a través
            de sus canales oficiales.
          </P>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Titularidad de los derechos sobre el contenido UGC republicado"
        >
          <P>
            2.1 El Usuario conserva la titularidad original sobre el contenido
            UGC que haya creado. La presente Política no transfiere al Taller
            los derechos de autor originales del Usuario sobre su contenido.
          </P>
          <P>
            2.2 Sin perjuicio de lo anterior, al publicar contenido UGC con
            alusión al Taller, el Usuario otorga a Confecciones Liss una
            licencia no exclusiva, gratuita, irrevocable, transferible y de
            alcance mundial para usar, reproducir, distribuir, adaptar, exhibir
            y comunicar públicamente dicho contenido, en los términos
            establecidos en el Artículo 1, durante el tiempo que el Taller lo
            considere pertinente.
          </P>
          <P>
            2.3 La licencia descrita en el numeral anterior comprende el derecho
            del Taller de sublicenciar el uso del contenido a plataformas y
            herramientas digitales necesarias para su publicación y
            distribución, tales como redes sociales, plataformas de
            almacenamiento en la nube y servicios de hosting, en la medida
            necesaria para los fines previstos en el Artículo 1.
          </P>
          <P>
            2.4 Confecciones Liss se reserva todos los derechos sobre los
            elementos de su propia identidad visual que aparezcan en el
            contenido UGC republicado, incluyendo su logotipo, nombre comercial,
            colores institucionales y cualquier otro elemento de su marca
            registrada o no registrada. La republicación del contenido no
            transfiere al Usuario derecho alguno sobre la identidad visual del
            Taller.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Derecho de retiro de contenido UGC">
          <P>
            3.1 Confecciones Liss se reserva el derecho irrevocable de retirar,
            eliminar o dejar de distribuir cualquier contenido UGC previamente
            republicado en sus canales en cualquier momento y sin necesidad de
            justificación, notificación previa ni compensación al Usuario.
          </P>
          <P>
            3.2 Asimismo, si el Taller considera que un contenido UGC publicado
            por un Usuario en canales propios de dicho Usuario —aunque no haya
            sido republicado por el Taller— resulta perjudicial para la
            reputación, la imagen comercial o los intereses del Taller, el
            Taller podrá solicitar formalmente al Usuario que retire o modifique
            dicho contenido, a través de sus canales oficiales disponibles en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </P>
          <P>
            3.3 El Usuario que reciba una solicitud de retiro de contenido por
            parte del Taller deberá atenderla dentro de un plazo razonable. La
            negativa injustificada a atender dicha solicitud faculta al Taller
            para ejercer las acciones legales que correspondan conforme a la
            legislación salvadoreña vigente en materia de reputación comercial y
            competencia desleal.
          </P>
          <P>
            3.4 El Taller también podrá solicitar a las plataformas digitales
            correspondientes la retirada o moderación del contenido, cuando
            dicho contenido infrinja las condiciones de uso de la plataforma o
            cuando su permanencia cause perjuicio comprobable al Taller.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Contenido UGC prohibido">
          <P>
            4.1 Queda expresamente prohibido publicar, difundir o compartir
            contenido UGC que, haciendo referencia al Taller, contenga
            cualquiera de los siguientes elementos:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Información falsa, engañosa o difamatoria sobre el Taller, sus
              productos, sus servicios o su personal.
            </P>
            <P>
              b) Acusaciones no fundamentadas de prácticas ilegales,
              fraudulentas o contrarias a la ética comercial.
            </P>
            <P>
              c) Amenazas, insultos o lenguaje agresivo dirigido al Taller o a
              su personal.
            </P>
            <P>
              d) Datos personales de terceros publicados sin su consentimiento,
              que hayan sido obtenidos en el contexto de la relación con el
              Taller.
            </P>
            <P>
              e) Contenido que infrinja derechos de propiedad intelectual de
              terceros.
            </P>
            <P>
              f) Contenido que induzca a error sobre la identidad del Taller,
              que suplante su identidad o que utilice su marca para fines no
              autorizados.
            </P>
          </div>
          <P>
            4.2 El Taller se reserva el derecho de reportar ante las autoridades
            competentes y ante las plataformas digitales el contenido que
            infrinja lo establecido en el numeral anterior, así como de ejercer
            las acciones legales que correspondan en defensa de su reputación e
            intereses comerciales.
          </P>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Responsabilidad del Usuario respecto al contenido UGC"
        >
          <P>
            5.1 El Usuario es el único y exclusivo responsable del contenido UGC
            que publique en relación con el Taller. El Taller no asume
            responsabilidad alguna por el contenido creado y publicado por
            terceros, incluyendo el contenido UGC que haya sido republicado en
            los canales del Taller, en lo que respecta a la veracidad de las
            afirmaciones del Usuario, la exactitud de la información compartida
            y el impacto de dicho contenido en terceros.
          </P>
          <P>
            5.2 El Usuario garantiza al Taller que el contenido UGC que publica
            con alusión al Taller:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Es de su autoría original o cuenta con los derechos o licencias
              necesarias para publicarlo y permitir su republicación por el
              Taller.
            </P>
            <P>
              b) No infringe derechos de terceros, incluyendo derechos de
              imagen, privacidad o propiedad intelectual.
            </P>
            <P>
              c) No contiene información falsa, difamatoria ni contraria a
              derecho.
            </P>
          </div>
          <P>
            5.3 El Usuario se compromete a indemnizar y mantener indemne a
            Confecciones Liss frente a cualquier reclamación, pérdida, costo o
            perjuicio derivado del incumplimiento de las garantías establecidas
            en el numeral anterior o de la publicación de contenido UGC
            prohibido conforme al Artículo 4.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Reseñas y comentarios públicos">
          <P>
            6.1 El Taller valora las reseñas y comentarios auténticos de sus
            clientes como herramienta de mejora continua y como información útil
            para futuros clientes. El Taller no manipula, elimina ni censura
            reseñas verídicas y fundamentadas.
          </P>
          <P>
            6.2 Sin embargo, el Taller se reserva el derecho de responder
            pública y formalmente a cualquier reseña o comentario, exponiendo su
            versión de los hechos conforme a sus políticas vigentes, cuando el
            contenido de dicha reseña contenga información inexacta, incompleta
            o contraria a lo establecido en las políticas del Taller.
          </P>
          <P>
            6.3 El Taller podrá reportar y solicitar la eliminación de reseñas
            que contengan información claramente falsa, difamatoria o que
            incumplan las políticas de la plataforma en la que fueron
            publicadas.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Exención de responsabilidad del Taller">
          <P>
            7.1 Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El contenido UGC publicado por terceros en plataformas ajenas
              al Taller, incluyendo reseñas, comentarios y publicaciones en
              redes sociales.
            </P>
            <P>
              b) Las consecuencias de la republicación de contenido UGC para el
              Usuario, cuando dicho contenido fue publicado originalmente de
              forma voluntaria y pública por el propio Usuario.
            </P>
            <P>
              c) La eliminación o modificación de contenido UGC en plataformas
              de terceros por decisión de dichas plataformas, situación fuera
              del control del Taller.
            </P>
            <P>
              d) El contenido UGC que terceros compartan, redistribuyan o
              modifiquen sin intervención del Taller.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Canales oficiales y comunicación sobre esta Política"
        >
          <P>
            8.1 Toda consulta, solicitud o reclamación relacionada con esta
            Política, incluyendo solicitudes de no republicación o de retiro de
            contenido, deberá gestionarse a través de los canales oficiales del
            Taller:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </P>
          <P>
            8.2 Las solicitudes de no republicación formuladas antes de la
            publicación del contenido UGC deberán realizarse expresamente y por
            escrito a través de los canales oficiales antes de publicar el
            contenido. El Taller no puede ser responsable de republicar
            contenido cuya alusión no haya estado acompañada de restricción de
            uso comunicada oportunamente.
          </P>
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
                <strong>
                  Política de Fotografía y Uso de Imagen de Clientes:
                </strong>{" "}
                <Link
                  href="/legal/fotografia"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/fotografia
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Comunicaciones Comerciales:</strong>{" "}
                <Link
                  href="/legal/comunicaciones"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/comunicaciones
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
          </div>
        </Section>
        <Hr />

        <Section n={10} title="Modificaciones y divisibilidad">
          <P>
            10.1 Confecciones Liss se reserva el derecho de modificar la
            presente Política en cualquier momento, publicando la versión
            actualizada en sus canales oficiales. Las modificaciones entrarán en
            vigencia de forma inmediata.
          </P>
          <P>
            10.2 Si alguna disposición de la presente Política fuera declarada
            inválida, las restantes continuarán en plena vigencia.
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

            <span style={{ fontWeight: "600" }}>Política de UGC:</span>
            <Link href="/legal/ugc" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ugc
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Fotografía:</span>
            <Link
              href="/legal/fotografia"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/fotografia
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
            <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
            Villacorta
            <br />
            <strong>Vigente desde su publicación — Versión:</strong> Junio 2026
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
