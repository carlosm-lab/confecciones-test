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
    "Política de Uso de Cookies y Tecnologías de Rastreo — Políticas Oficiales",
  description:
    "Política de Uso de Cookies y Tecnologías de Rastreo de Confecciones Liss. Conoce cómo utilizamos las cookies, localStorage y otras tecnologías de almacenamiento funcional.",
  alternates: { canonical: `${siteConfig.url}/legal/cookies` },
  openGraph: {
    title:
      "Política de Uso de Cookies y Tecnologías de Rastreo | Confecciones Liss",
    description:
      "Política de Uso de Cookies y Tecnologías de Rastreo de Confecciones Liss. Conoce cómo utilizamos las cookies, localStorage y otras tecnologías de almacenamiento funcional.",
    url: `${siteConfig.url}/legal/cookies`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Política de Uso de Cookies y Tecnologías de Rastreo | Confecciones Liss",
    description:
      "Política de Uso de Cookies y Tecnologías de Rastreo de Confecciones Liss. Conoce cómo utilizamos las cookies, localStorage y otras tecnologías de almacenamiento funcional.",
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

export default function PoliticaCookiesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/cookies`;
  const PAGE_TITLE = "Política de Cookies";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Uso de Cookies y Tecnologías de Rastreo — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Uso de Cookies y Tecnologías de Rastreo de Confecciones Liss. Conoce cómo utilizamos las cookies, localStorage y otras tecnologías de almacenamiento funcional.",
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
        title="Política de Uso de Cookies y Tecnologías de Rastreo"
        date="24 Jun, 2026"
        readingTime={10}
      >
        <P>
          La presente Política de Uso de Cookies y Tecnologías de Rastreo (en
          adelante &quot;la Política&quot;) regula de manera integral,
          exhaustiva y vinculante el uso que Confecciones Liss (en adelante
          &quot;el Taller&quot;) hace de cookies, almacenamiento local y otras
          tecnologías de almacenamiento o acceso a información en el dispositivo
          del usuario, en el marco del funcionamiento de su plataforma web
          oficial (
          <Link
            href="https://www.confeccionesliss.com/"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/
          </Link>
          , en adelante &quot;la Plataforma&quot;).
        </P>
        <P>
          Toda persona natural que acceda, navegue o utilice la Plataforma (en
          adelante &quot;el Usuario&quot;) declara haber leído, comprendido y
          aceptado en su integridad, de forma libre, voluntaria e informada, la
          totalidad de los términos aquí establecidos. La presente Política
          complementa y debe leerse en conjunto con la Política de Privacidad
          del Taller, disponible en:
        </P>
        <div
          style={{
            paddingLeft: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          <Link
            href="/legal/privacidad"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/legal/privacidad
          </Link>
        </div>
        <P>
          El desconocimiento de esta Política no exime al Usuario de su
          cumplimiento.
        </P>
        <Hr />

        <Section n={1} title="Definiciones">
          <P>1.1 A los efectos de la presente Política, se entenderá por:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) &quot;Cookie&quot;: archivo de texto pequeño que un sitio web
              almacena en el dispositivo del Usuario con el fin de recordar
              información sobre su visita o preferencias.
            </P>
            <P>
              b) &quot;Almacenamiento local&quot; o &quot;localStorage&quot;:
              mecanismo de almacenamiento del navegador que permite a la
              Plataforma guardar datos directamente en el dispositivo del
              Usuario de forma permanente entre sesiones, sin fecha de
              expiración automática, salvo las condiciones definidas por la
              Plataforma.
            </P>
            <P>
              c) &quot;Tecnologías de rastreo&quot;: conjunto de mecanismos
              técnicos —incluyendo cookies, localStorage, tokens de sesión y
              similares— utilizados para identificar, recordar o rastrear el
              comportamiento o preferencias del Usuario en la Plataforma.
            </P>
            <P>
              d) &quot;Terceros&quot;: proveedores de servicios externos cuyos
              sistemas interactúan con la Plataforma, incluyendo Supabase,
              Google y Vercel.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={2} title="Tecnologías utilizadas por la Plataforma">
          <P>
            2.1 La Plataforma de Confecciones Liss no utiliza cookies de rastreo
            publicitario, cookies de terceros para seguimiento entre sitios, ni
            ningún tipo de tecnología orientada a la elaboración de perfiles
            comerciales del Usuario. La Plataforma opera bajo un modelo de
            mínima recopilación de datos.
          </P>
          <P>
            2.2 Las tecnologías de almacenamiento efectivamente utilizadas por
            la Plataforma son las siguientes:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>ALMACENAMIENTO LOCAL (localStorage):</strong> La
              Plataforma utiliza localStorage para persistir de forma local en
              el dispositivo del Usuario los siguientes datos, sin los cuales
              las funcionalidades descritas no operarían correctamente:
            </P>
            <Ul
              items={[
                "Ítems del carrito de compras del Usuario.",
                "Identificadores de productos marcados como favoritos.",
                "Marcas de tiempo de última modificación del carrito.",
                "Preferencia de modo visual (oscuro o claro).",
                "Registro binario de aceptación del aviso informativo de cookies de primera visita.",
              ]}
            />
            <P>
              El carrito almacenado en localStorage se elimina automáticamente
              transcurridos siete (7) días de inactividad del Usuario.
            </P>
            <P>
              b) <strong>TOKENS DE SESIÓN (autenticación Google OAuth):</strong>{" "}
              Cuando el Usuario decide iniciar sesión mediante Google OAuth, el
              sistema genera y almacena en el navegador un token de sesión
              gestionado por Supabase que permite mantener la sesión activa.
              Este token es estrictamente funcional y no se utiliza para rastreo
              publicitario.
            </P>
            <P>
              c) <strong>REGISTRO DE ACEPTACIÓN DE AVISO:</strong> Un valor
              booleano en localStorage registra si el Usuario ha interactuado
              con el aviso informativo de cookies que se muestra en la primera
              visita. Este dato no se transmite a ningún servidor y permanece
              exclusivamente en el dispositivo.
            </P>
          </div>
          <P>2.3 La Plataforma NO utiliza:</P>
          <Ul
            items={[
              "Cookies de terceros para publicidad segmentada.",
              "Píxeles de seguimiento de redes publicitarias.",
              "Herramientas de análisis de comportamiento como Google Analytics, Meta Pixel, Hotjar ni similares.",
              "Cookies de sesión con fines distintos a los estrictamente funcionales descritos en el numeral anterior.",
            ]}
          />
        </Section>
        <Hr />

        <Section
          n={3}
          title="Finalidad del uso de tecnologías de almacenamiento"
        >
          <P>
            3.1 Todas las tecnologías de almacenamiento utilizadas por la
            Plataforma tienen finalidad exclusivamente funcional, es decir, son
            necesarias para que la Plataforma opere de la manera prevista y para
            que el Usuario pueda disfrutar de sus funcionalidades principales.
            Ninguna de ellas tiene finalidad publicitaria, de perfilado
            comercial ni de seguimiento entre sitios web.
          </P>
          <P>3.2 Las finalidades específicas de cada tecnología son:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>Carrito y favoritos en localStorage:</strong> permitir
              que el Usuario conserve su selección de productos entre sesiones
              sin necesidad de iniciar sesión, y que el carrito persista ante
              recargas de página.
            </P>
            <P>
              b) <strong>Token de sesión OAuth:</strong> mantener la identidad
              del Usuario autenticado activa durante la navegación, evitando que
              deba iniciar sesión en cada página.
            </P>
            <P>
              c) <strong>Preferencia visual:</strong> recordar si el Usuario
              prefiere el modo oscuro o claro de la interfaz.
            </P>
            <P>
              d) <strong>Registro de aceptación de aviso:</strong> evitar
              mostrar repetidamente el aviso informativo de cookies a Usuarios
              que ya lo hayan reconocido.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={4} title="Proveedores terceros y sus tecnologías">
          <P>
            4.1 La Plataforma utiliza servicios de terceros que, como parte de
            su funcionamiento, pueden acceder a o generar datos técnicos en el
            dispositivo del Usuario. El Taller no tiene control sobre las
            prácticas de dichos terceros, que se rigen por sus propias
            políticas:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>SUPABASE:</strong> proveedor de base de datos y
              autenticación. Gestiona los tokens de sesión del Usuario
              autenticado y puede registrar datos de conexión técnicos
              (dirección IP, marcas de tiempo) conforme a su propia política de
              privacidad disponible en{" "}
              <Link
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://supabase.com/privacy
              </Link>
            </P>
            <P>
              b) <strong>GOOGLE (OAuth):</strong> proveedor del servicio de
              autenticación. Cuando el Usuario elige iniciar sesión con Google,
              Google procesa los datos de autenticación conforme a su política
              de privacidad disponible en{" "}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://policies.google.com/privacy
              </Link>
            </P>
            <P>
              c) <strong>VERCEL:</strong> proveedor de alojamiento y
              distribución de contenido. Puede registrar datos técnicos de las
              solicitudes al servidor (IP, agente de usuario, rutas solicitadas)
              conforme a su política de privacidad disponible en{" "}
              <Link
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://vercel.com/legal/privacy-policy
              </Link>
            </P>
          </div>
          <P>
            4.2 El Taller selecciona proveedores que ofrecen garantías
            contractuales razonables sobre la protección de datos. Sin embargo,
            el Taller no asume responsabilidad por las prácticas de datos de
            dichos terceros más allá de su rol como responsable del tratamiento
            de los datos que gestiona directamente.
          </P>
          <P>
            4.3 La Plataforma no incorpora tecnologías de terceros con fines
            publicitarios. Si en el futuro se incorporara algún servicio de este
            tipo, la presente Política será actualizada con anticipación
            razonable.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Consentimiento y gestión de preferencias">
          <P>
            5.1 Dado que las tecnologías de almacenamiento utilizadas por la
            Plataforma son de naturaleza estrictamente funcional y necesaria
            para el correcto funcionamiento del servicio, su uso no requiere
            consentimiento previo explícito en los mismos términos que se exige
            para cookies publicitarias o de rastreo. Sin embargo, el Taller
            informa al Usuario sobre su uso mediante el aviso de primera visita
            y la presente Política, en cumplimiento del principio de
            transparencia.
          </P>
          <P>
            5.2 El Usuario puede gestionar o eliminar los datos almacenados en
            su dispositivo mediante las siguientes acciones:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>Borrar el localStorage de la Plataforma</strong> desde
              la configuración de su navegador (habitualmente en Herramientas de
              desarrollador &gt; Aplicación &gt; Almacenamiento local). Esta
              acción eliminará el carrito, los favoritos no sincronizados con
              una cuenta, las preferencias visuales y el registro de aceptación
              del aviso.
            </P>
            <P>
              b) <strong>Cerrar sesión en la Plataforma</strong>, lo cual revoca
              el token de sesión activo gestionado por Supabase.
            </P>
            <P>
              c){" "}
              <strong>
                Revocar el acceso de la Plataforma a su cuenta de Google
              </strong>{" "}
              desde la configuración de seguridad de Google (
              <Link
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://myaccount.google.com/permissions
              </Link>
              ), lo cual desvinculará la autenticación OAuth.
            </P>
          </div>
          <P>
            5.3 La eliminación de los datos de localStorage puede afectar el
            correcto funcionamiento de las funcionalidades de carrito y
            favoritos no sincronizadas con una cuenta de Usuario. El Taller no
            asume responsabilidad por pérdida de datos derivada de acciones de
            limpieza realizadas por el propio Usuario.
          </P>
          <P>
            5.4 El Usuario que no desee que se almacene ningún dato en su
            dispositivo puede optar por navegar en modo incógnito o privado en
            su navegador, lo cual limitará la persistencia de los datos entre
            sesiones, aunque el funcionamiento de algunas funcionalidades puede
            verse afectado.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Exención de responsabilidad del Taller">
          <P>
            6.1 En la máxima medida permitida por la legislación de la República
            de El Salvador, Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El procesamiento de datos técnicos realizado por los
              proveedores terceros descritos en el Artículo 4, conforme a sus
              propias políticas.
            </P>
            <P>
              b) La pérdida de datos del carrito, favoritos o preferencias del
              Usuario derivada de la limpieza manual del localStorage o del uso
              del modo incógnito del navegador.
            </P>
            <P>
              c) Incompatibilidades entre la Plataforma y determinados
              navegadores, extensiones o configuraciones de seguridad que
              impidan el correcto funcionamiento del localStorage.
            </P>
            <P>
              d) El uso de tecnologías de bloqueo de cookies o scripts por parte
              del Usuario, y las consecuencias funcionales que dicho bloqueo
              pueda tener sobre la experiencia de uso de la Plataforma.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={7} title="Relación con otras políticas del Taller">
          <P>
            7.1 La presente Política forma parte integral del marco jurídico de
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
          </div>
        </Section>
        <Hr />

        <Section n={8} title="Modificaciones a la Política">
          <P>
            8.1 Confecciones Liss se reserva el derecho de modificar la presente
            Política en cualquier momento, publicando la versión actualizada en:{" "}
            <Link
              href="/legal/cookies"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cookies
            </Link>
          </P>
          <P>
            8.2 Las modificaciones entrarán en vigencia de forma inmediata desde
            su publicación. El acceso continuado a la Plataforma constituirá
            aceptación automática de la versión actualizada.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Divisibilidad">
          <P>
            9.1 Si alguna disposición de la presente Política fuera declarada
            inválida o inaplicable por un tribunal competente, las restantes
            disposiciones continuarán en plena vigencia y efecto.
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

            <span style={{ fontWeight: "600" }}>Política de Cookies:</span>
            <Link
              href="/legal/cookies"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cookies
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
