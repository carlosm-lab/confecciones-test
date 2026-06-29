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

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "PolÃ­tica de Deberes de Usuarios y Clientes",
  description:
    "PolÃ­tica de deberes de Confecciones Liss: obligaciones de pago, informaciÃ³n oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
  keywords:
    "deberes del cliente de confecciones liss, obligaciones del usuario de confecciones liss, conducta cliente confecciones liss, normas confecciones liss",
  alternates: { canonical: `${siteConfig.url}/legal/deberes` },
  openGraph: {
    title: "PolÃ­tica de Deberes de Usuarios y Clientes | Confecciones Liss",
    description:
      "PolÃ­tica de deberes de Confecciones Liss: obligaciones de pago, informaciÃ³n oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
    url: `${siteConfig.url}/legal/deberes`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolÃ­tica de Deberes de Usuarios y Clientes | Confecciones Liss",
    description:
      "PolÃ­tica de deberes de Confecciones Liss: obligaciones de pago, informaciÃ³n oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
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
  other: {
    publisher: siteConfig.name,
  },
};

export default function PoliticaDeberesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/deberes`;
  const PAGE_TITLE = "PolÃ­tica de Deberes";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "PolÃ­tica de Deberes de Usuarios y Clientes | Confecciones Liss",
          description:
            "PolÃ­tica de deberes de Confecciones Liss: obligaciones de pago, informaciÃ³n oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
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
      {/* Hub background â€” only shown on desktop where the blur overlay exists. */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden select-none lg:block"
      >
        <LegalHubBackground animated={false} />
      </div>

      <LegalArticleReader
        title="PolÃ­tica de Deberes del Usuario y Cliente"
        category="CatÃ¡logo de deberes, obligaciones de pago y normas de conducta que rigen la relaciÃ³n comercial."
        date="24 Jun, 2026"
        readingTime={20}
      >
        <P>
          El presente documento establece de manera integral, exhaustiva y
          vinculante el catÃ¡logo de deberes que corresponden a toda persona
          natural que acceda, navegue, consulte, interactÃºe, solicite servicios
          o adquiera productos de Confecciones Liss (en adelante &quot;el
          Taller&quot;), ya sea en calidad de visitante, usuario de la
          plataforma o cliente con pedido en curso o completado (en adelante
          &quot;el Cliente&quot; o &quot;el Usuario&quot;, utilizados de forma
          indistinta segÃºn el contexto).
        </P>
        <P>
          La relaciÃ³n entre el Cliente y el Taller no genera Ãºnicamente
          derechos a favor del primero: genera tambiÃ©n deberes cuyo
          cumplimiento es condiciÃ³n indispensable para que el Taller pueda
          prestar su servicio de forma Ã³ptima, para que el Cliente pueda
          ejercer sus derechos vÃ¡lidamente, y para que cualquier reclamaciÃ³n
          sea admisible. El incumplimiento de los deberes aquÃ­ establecidos
          tiene consecuencias directas sobre la validez de las reclamaciones, la
          exigibilidad de compromisos del Taller, y la posibilidad de ejercer
          los derechos reconocidos en la PolÃ­tica de Derechos disponible en:
        </P>
        <div
          style={{
            paddingLeft: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          <Link
            href="/legal/derechos"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/legal/derechos
          </Link>
        </div>
        <P>
          El desconocimiento de los deberes aquÃ­ establecidos no exime al
          Cliente de su cumplimiento, no le otorga derechos adicionales, y no
          constituye fundamento vÃ¡lido para reclamaciÃ³n ni para exoneraciÃ³n
          de responsabilidad. La interacciÃ³n con cualquier canal oficial del
          Taller implica la aceptaciÃ³n plena, libre, voluntaria e informada de
          la totalidad de los deberes aquÃ­ descritos.
        </P>
        <Hr />

        <Section n={1} title="Deber de conocimiento de las polÃ­ticas">
          <P>
            1.1 El Cliente tiene el deber ineludible de leer, comprender y
            conocer en su totalidad la polÃ­tica o polÃ­ticas del Taller
            aplicables a la operaciÃ³n que pretende realizar, antes de
            iniciarla. Este deber es previo a cualquier consulta, solicitud,
            pago o reclamaciÃ³n.
          </P>
          <P>
            1.2 El conjunto de polÃ­ticas vigentes del Taller se encuentra
            disponible pÃºblicamente y de forma permanente en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
          </div>
          <P>
            El acceso a dichas polÃ­ticas es libre, gratuito y no requiere
            registro previo. El Cliente no podrÃ¡ alegar ignorancia, confusiÃ³n
            ni falta de acceso como justificaciÃ³n para el incumplimiento de
            ninguna de ellas.
          </P>
          <P>
            1.3 El deber de conocimiento comprende, sin limitarse a ello, las
            siguientes polÃ­ticas, en la versiÃ³n vigente al momento de cada
            interacciÃ³n:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              marginBottom: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <div>
              â€” PolÃ­tica de Privacidad:{" "}
              <Link
                href="/legal/privacidad"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/privacidad
              </Link>
            </div>
            <div>
              â€” TÃ©rminos y Condiciones de Uso:{" "}
              <Link
                href="/legal/terminos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terminos
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de Cotizaciones:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/cotizaciones
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de EnvÃ­os:{" "}
              <Link
                href="/legal/envios"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/envios
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de Devoluciones:{" "}
              <Link
                href="/legal/devoluciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/devoluciones
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de ConfecciÃ³n:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de Promociones:{" "}
              <Link
                href="/legal/promociones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/promociones
              </Link>
            </div>
            <div>
              â€” Programa de Referidos:{" "}
              <Link
                href="/legal/referidos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/referidos
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de Uso de Inteligencia Artificial:{" "}
              <Link
                href="/legal/ia"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/ia
              </Link>
            </div>
            <div>
              â€” PolÃ­tica de Derechos del Usuario:{" "}
              <Link
                href="/legal/derechos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derecho
              </Link>
            </div>
            <div>
              â€” La presente PolÃ­tica de Deberes:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </div>
            <div>
              â€” La polÃ­tica del uso de imÃ¡genes y marcas de terceros:{" "}
              <Link
                href="/legal/terceros"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terceros
              </Link>
            </div>
          </div>
          <P>
            1.4 Las polÃ­ticas del Taller pueden ser actualizadas en cualquier
            momento. Es deber exclusivo e indelegable del Cliente verificar que
            estÃ¡ consultando la versiÃ³n vigente al momento de cada
            interacciÃ³n. El Taller no estÃ¡ obligado a notificar
            individualmente al Cliente sobre modificaciones a sus polÃ­ticas.
          </P>
          <P>
            1.5 El incumplimiento del deber establecido en el presente artÃ­culo
            tiene como consecuencia directa que cualquier reclamaciÃ³n formulada
            por el Cliente al margen de las polÃ­ticas vigentes serÃ¡
            inadmisible, invÃ¡lida e inoponible al Taller.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Deber de informarse previamente">
          <P>
            2.1 El Cliente tiene el deber de informarse de manera suficiente,
            oportuna y diligente sobre los productos, servicios, condiciones,
            caracterÃ­sticas, precios, tiempos y procedimientos del Taller antes
            de iniciar cualquier proceso de compra, cotizaciÃ³n, reserva o pago.
          </P>
          <P>
            2.2 El deber de informaciÃ³n previa comprende, sin limitarse a ello:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Conocer las caracterÃ­sticas reales de la prenda o servicio que
              desea adquirir, incluyendo materiales, tallas, colores y mÃ©todos
              de confecciÃ³n disponibles.
            </P>
            <P>
              b) Verificar que el producto o servicio deseado se ajusta a sus
              necesidades reales antes de confirmar el pedido.
            </P>
            <P>
              c) Consultar con el Taller cualquier duda sobre el producto antes
              de efectuar cualquier pago o reserva, a travÃ©s de los canales
              oficiales disponibles en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              d) Informarse sobre los tiempos de producciÃ³n y entrega antes de
              comprometer el pedido, de forma que dichos tiempos sean
              compatibles con sus necesidades particulares.
            </P>
            <P>
              e) Verificar la viabilidad tÃ©cnica y logÃ­stica del pedido con el
              Taller antes de confirmarlo formalmente.
            </P>
          </div>
          <P>
            2.3 Las decisiones de compra adoptadas por el Cliente sin haber
            cumplido el deber de informaciÃ³n previa establecido en el presente
            artÃ­culo son de responsabilidad exclusiva del Cliente. El Taller no
            asumirÃ¡ responsabilidad alguna derivada de expectativas no
            consultadas, necesidades no comunicadas o supuestos no verificados
            previamente por el Cliente.
          </P>
          <P>
            2.4 La disponibilidad de imÃ¡genes del CatÃ¡logo Digital no exime al
            Cliente del deber de informarse sobre las caracterÃ­sticas reales de
            la prenda. El contenido visual del catÃ¡logo es de carÃ¡cter
            referencial y puede haber sido editado mediante herramientas de
            inteligencia artificial, conforme a lo declarado en la PolÃ­tica de
            Uso de Inteligencia Artificial del Taller. El Cliente que proceda a
            efectuar un pedido sin haber consultado las caracterÃ­sticas reales
            del producto, asume exclusivamente las consecuencias de dicha
            omisiÃ³n.
          </P>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Deber de contraste y verificaciÃ³n de informaciÃ³n"
        >
          <P>
            3.1 El Cliente tiene el deber de contrastar, verificar y validar
            toda informaciÃ³n que reciba o consulte sobre los productos y
            servicios del Taller, con independencia del canal o fuente de la que
            provenga.
          </P>
          <P>3.2 El deber de contraste comprende, sin limitarse a ello:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Verificar que la informaciÃ³n consultada proviene de un Canal
              Oficial del Taller, conforme al directorio disponible en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>{" "}
              El Taller no reconoce informaciÃ³n proporcionada a travÃ©s de
              canales no oficiales, terceros no autorizados ni plataformas no
              verificadas.
            </P>
            <P>
              b) Contrastar cualquier informaciÃ³n recibida verbalmente, por
              mensaje informal o fuera de los canales oficiales, con la
              informaciÃ³n publicada en la Plataforma o confirmada directamente
              por el Taller a travÃ©s de sus canales oficiales.
            </P>
            <P>
              c) Verificar personalmente, antes de confirmar cualquier pedido,
              que las especificaciones del producto â€” incluyendo talla, color,
              modelo, diseÃ±o, materiales y precio â€” coinciden con lo que el
              Cliente efectivamente requiere.
            </P>
            <P>
              d) Solicitar aclaraciÃ³n expresa al Taller en caso de duda o
              discrepancia entre distintas fuentes de informaciÃ³n, antes de
              proceder con cualquier pago o confirmaciÃ³n.
            </P>
          </div>
          <P>
            3.3 El Cliente que actÃºe sobre la base de informaciÃ³n no
            verificada, proveniente de fuentes no oficiales o no contrastada con
            el Taller, asume exclusiva e integralmente las consecuencias de
            dicha actuaciÃ³n. El Taller no estarÃ¡ obligado a corregir,
            compensar ni asumir los perjuicios derivados de informaciÃ³n que el
            Cliente no verificÃ³ con la debida diligencia.
          </P>
          <P>
            3.4 En particular, el Cliente tiene el deber de contrastar el
            contenido visual del CatÃ¡logo Digital con la realidad del producto
            fÃ­sico antes de confirmar su pedido, solicitando al Taller, si lo
            considera necesario, imÃ¡genes sin ediciÃ³n, muestras de material o
            cualquier otra referencia que le permita tomar una decisiÃ³n de
            compra informada.
          </P>
        </Section>
        <Hr />

        <Section
          n={4}
          title="Deber de proporcionar informaciÃ³n oportuna, exacta y completa"
        >
          <P>
            4.1 El Cliente tiene el deber de proporcionar al Taller, de forma
            oportuna, exacta, completa y verificable, toda la informaciÃ³n
            necesaria para la correcta ejecuciÃ³n del pedido, la prestaciÃ³n del
            servicio y la gestiÃ³n de la relaciÃ³n comercial.
          </P>
          <P>
            4.2 El deber de informaciÃ³n oportuna comprende, sin limitarse a
            ello:
          </P>
          <Ul
            items={[
              "a) Proporcionar las medidas corporales correctas y actualizadas al momento de solicitar la cotizaciÃ³n o confirmaciÃ³n del pedido. El Cliente es el Ãºnico responsable de la exactitud de las medidas que proporciona, y el Taller confeccionarÃ¡ estrictamente con base en ellas.",
              "b) Especificar con claridad y precisiÃ³n el modelo, color, diseÃ±o, tipo de tela, logotipo, texto o cualquier otro elemento de personalizaciÃ³n que forme parte del pedido, antes del inicio de la producciÃ³n.",
              "c) Proporcionar los archivos, diseÃ±os, logotipos o referencias visuales en la calidad, formato y resoluciÃ³n adecuados para la producciÃ³n, dentro del plazo acordado con el Taller.",
              "d) Informar al Taller, de forma inmediata y a travÃ©s de los canales oficiales, sobre cualquier cambio en las especificaciones del pedido, siempre que dicho cambio sea factible dentro del proceso de producciÃ³n en curso.",
              "e) Proporcionar los datos de contacto, direcciÃ³n de entrega y cualquier otra logÃ­stica de forma correcta y actualizada al momento de confirmar el pedido.",
              "f) Confirmar la recepciÃ³n de proformas, muestras o aprobaciones que el Taller remita al Cliente para su validaciÃ³n, dentro del plazo establecido por el Taller.",
            ]}
          />
          <P>
            4.3 Los errores, omisiones, inexactitudes o demoras en la provisiÃ³n
            de informaciÃ³n por parte del Cliente son de responsabilidad
            exclusiva de este Ãºltimo. El Taller no asumirÃ¡ responsabilidad
            alguna derivada de la informaciÃ³n incorrecta, incompleta o
            tardÃ­amente proporcionada por el Cliente, incluyendo sin limitarse
            a: prendas confeccionadas en talla incorrecta, diseÃ±os errÃ³neos
            basados en especificaciones del Cliente, demoras en la entrega
            atribuibles a la falta de informaciÃ³n oportuna, o cualquier otro
            perjuicio derivado de dicha omisiÃ³n.
          </P>
          <P>
            4.4 Once iniciada la producciÃ³n sobre la base de la informaciÃ³n
            proporcionada por el Cliente, cualquier cambio que requiera
            reiniciar o modificar el proceso de confecciÃ³n serÃ¡ evaluado por
            el Taller a su entera discreciÃ³n y podrÃ¡ implicar costos
            adicionales que el Cliente deberÃ¡ asumir Ã­ntegramente, sin derecho
            a reclamaciÃ³n ni reembolso de los montos ya pagados.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Deber de pago en tiempo y forma">
          <P>
            5.1 El Cliente tiene el deber de efectuar todos los pagos que
            correspondan al Taller en los montos, plazos, modalidades y
            condiciones acordadas al momento de la cotizaciÃ³n o confirmaciÃ³n
            del pedido.
          </P>
          <P>5.2 El deber de pago comprende, sin limitarse a ello:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Cancelar el anticipo requerido dentro del plazo establecido por
              el Taller para reservar o iniciar la producciÃ³n del pedido. El
              Taller no estÃ¡ obligado a iniciar ningÃºn proceso de confecciÃ³n,
              reserva de materiales ni asignaciÃ³n de tiempo de producciÃ³n sin
              haber recibido el anticipo correspondiente.
            </P>
            <P>
              b) Cancelar el saldo restante en el plazo acordado, conforme a las
              condiciones establecidas en la PolÃ­tica de Cotizaciones
              disponible en:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                /legal/cotizaciones
              </Link>{" "}
              y en la PolÃ­tica de ConfecciÃ³n disponible en:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                /legal/confeccion
              </Link>
            </P>
            <P>
              c) Cancelar el valor total del pedido antes de la entrega fÃ­sica
              del mismo, salvo que el Taller haya acordado expresamente
              condiciones de pago distintas por escrito y a travÃ©s de los
              canales oficiales.
            </P>
            <P>
              d) Efectuar los pagos Ãºnicamente a travÃ©s de los medios de pago
              habilitados y comunicados por el Taller a travÃ©s de sus canales
              oficiales. El Taller no reconoce pagos realizados a personas,
              cuentas o plataformas no autorizadas expresamente.
            </P>
            <P>
              e) Conservar el comprobante de pago correspondiente y presentarlo
              al Taller cuando sea requerido para verificaciÃ³n.
            </P>
          </div>
          <P>
            5.3 La demora o incumplimiento en el pago faculta al Taller para:
          </P>
          <Ul
            items={[
              "a) Suspender el proceso de producciÃ³n del pedido sin obligaciÃ³n de notificaciÃ³n previa y sin responsabilidad por demoras derivadas de dicha suspensiÃ³n.",
              "b) Renegociar los plazos de entrega en funciÃ³n del tiempo perdido por la falta de pago oportuno.",
              "c) Cancelar el pedido con pÃ©rdida total del anticipo ya recibido, el cual quedarÃ¡ en beneficio del Taller como compensaciÃ³n por los costos incurridos.",
              "d) Requerir el pago del saldo pendiente por los medios legales que correspondan.",
            ]}
          />
          <P>
            5.4 El Cliente no podrÃ¡ invocar la demora en la entrega como causa
            de incumplimiento de pago si dicha demora es, total o parcialmente,
            consecuencia de la falta de pago oportuno, de la provisiÃ³n tardÃ­a
            de informaciÃ³n, o de cualquier otra causa atribuible al propio
            Cliente.
          </P>
          <P>
            5.5 Bajo ninguna circunstancia el Cliente podrÃ¡ efectuar
            contracargos, reversiones de pago o reclamaciones ante entidades
            financieras de forma unilateral e injustificada. En caso de hacerlo,
            el Taller se reserva el derecho de ejercer las acciones legales
            correspondientes para la recuperaciÃ³n de los montos retenidos, mÃ¡s
            los costos y honorarios que dicha gestiÃ³n genere.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Deber de comunicaciÃ³n oportuna con el taller">
          <P>
            6.1 El Cliente tiene el deber de comunicarse con el Taller de manera
            oportuna, directa y a travÃ©s de los canales oficiales disponibles
            en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/links
            </Link>
            , ante cualquiera de las siguientes circunstancias, sin limitarse a
            ellas:
          </P>
          <Ul
            items={[
              "a) Inconformidad con algÃºn aspecto del pedido, ya sea durante el proceso de producciÃ³n o al momento de la recepciÃ³n del producto.",
              "b) Duda, consulta o solicitud de aclaraciÃ³n sobre cualquier aspecto del producto, servicio o polÃ­tica del Taller.",
              "c) Incapacidad para recibir el pedido en la fecha o condiciones acordadas.",
              "d) Cambio en los datos de contacto o direcciÃ³n de entrega.",
              "e) Cualquier circunstancia que pudiera afectar el normal desarrollo del pedido o de la relaciÃ³n comercial.",
            ]}
          />
          <P>
            6.2 El deber de comunicaciÃ³n oportuna implica que el Cliente
            deberÃ¡ contactar al Taller dentro de los plazos razonables y
            especÃ­ficos establecidos en las polÃ­ticas aplicables. La
            comunicaciÃ³n tardÃ­a, la falta de comunicaciÃ³n o la comunicaciÃ³n
            a travÃ©s de canales no oficiales tendrÃ¡ como consecuencia directa
            la inadmisibilidad de la reclamaciÃ³n o solicitud que el Cliente
            pretenda formular.
          </P>
          <P>
            6.3 El Cliente no podrÃ¡ invocar circunstancias que debiÃ³ comunicar
            oportunamente al Taller, como fundamento de una reclamaciÃ³n
            posterior. La omisiÃ³n de comunicaciÃ³n en el momento oportuno
            equivale a la aceptaciÃ³n tÃ¡cita de las condiciones sobre las que
            el Cliente no formulÃ³ objeciÃ³n alguna.
          </P>
          <P>
            6.4 Toda comunicaciÃ³n debe realizarse exclusivamente a travÃ©s de
            los canales oficiales del Taller. El Taller no reconocerÃ¡
            reclamaciones, solicitudes ni comunicaciones realizadas a travÃ©s de
            terceros no autorizados, plataformas no verificadas, o canales
            informales no oficiales, incluso si el contenido de dichas
            comunicaciones llegara a conocimiento del Taller por otras vÃ­as.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Deber de reclamar con base en las polÃ­ticas vigentes"
        >
          <P>
            7.1 El Cliente tiene el deber de formular cualquier reclamaciÃ³n,
            queja o solicitud de atenciÃ³n conforme a las condiciones, plazos y
            procedimientos establecidos en las polÃ­ticas vigentes del Taller
            aplicables al caso concreto. Ninguna reclamaciÃ³n formulada al
            margen de dichas polÃ­ticas serÃ¡ admisible ni obligarÃ¡ al Taller a
            su atenciÃ³n.
          </P>
          <P>
            7.2 El deber de reclamar con base en las polÃ­ticas comprende, sin
            limitarse a ello:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Formular la reclamaciÃ³n dentro de los plazos especÃ­ficamente
              establecidos en la polÃ­tica aplicable. Las reclamaciones
              extemporÃ¡neas serÃ¡n declaradas inadmisibles sin mÃ¡s trÃ¡mite.
            </P>
            <P>
              b) Fundamentar la reclamaciÃ³n en hechos concretos, objetivos y
              verificables, acompaÃ±ados de la evidencia documental,
              fotogrÃ¡fica o de cualquier otro tipo que sustente los argumentos
              expuestos.
            </P>
            <P>
              c) Identificarse plenamente como Cliente del Taller al formular la
              reclamaciÃ³n, proporcionando los datos del pedido sobre el que
              recae la misma.
            </P>
            <P>
              d) Canalizar la reclamaciÃ³n exclusivamente a travÃ©s de los
              canales oficiales establecidos en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              e) Abstenerse de formular reclamaciones cuyo fundamento sea la
              falta de cumplimiento de deberes propios del Cliente, incluyendo
              la falta de informaciÃ³n previa, la provisiÃ³n de datos
              incorrectos, o la omisiÃ³n de comunicaciÃ³n oportuna.
            </P>
          </div>
          <P>
            7.3 Las reclamaciones formuladas con base en argumentos subjetivos,
            expectativas no documentadas, percepciones personales no respaldadas
            en especificaciones escritas y aprobadas, o discrepancias derivadas
            del incumplimiento de los propios deberes del Cliente, no serÃ¡n
            admitidas ni procesadas por el Taller.
          </P>
          <P>
            7.4 El Cliente que formule reclamaciones reiteradas, infundadas, de
            mala fe, o que utilice los mecanismos de reclamaciÃ³n del Taller de
            forma abusiva, faculta al Taller para declarar inadmisibles futuras
            reclamaciones del mismo Cliente y para ejercer las acciones que
            correspondan en caso de que dicha conducta cause perjuicio al
            Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Deber de actuar e interactuar con base en las polÃ­ticas"
        >
          <P>
            8.1 El Cliente tiene el deber de ajustar toda su conducta,
            interacciÃ³n y actuaciÃ³n frente al Taller a lo establecido en el
            marco de polÃ­ticas vigente, disponible en:{" "}
            <Link
              href="/legal"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal
            </Link>
            . Ninguna actuaciÃ³n del Cliente que contradiga dicho marco le
            generarÃ¡ derechos ni le eximirÃ¡ de las consecuencias de dicha
            contradicciÃ³n.
          </P>
          <P>
            8.2 El deber de actuar con base en las polÃ­ticas implica que el
            Cliente:
          </P>
          <Ul
            items={[
              "a) No podrÃ¡ exigir condiciones, plazos, garantÃ­as, devoluciones ni beneficios que no estÃ©n expresamente reconocidos en las polÃ­ticas vigentes del Taller.",
              "b) No podrÃ¡ invocar compromisos verbales, informales o extraoficiales que contradigan lo establecido en las polÃ­ticas del Taller, salvo que dichos compromisos consten por escrito y sean confirmados por el Taller a travÃ©s de sus canales oficiales.",
              "c) No podrÃ¡ pretender aplicar condiciones de polÃ­ticas anteriores o versiones ya actualizadas del marco legal del Taller, a operaciones realizadas bajo la vigencia de versiones posteriores.",
              "d) DeberÃ¡ aceptar que las polÃ­ticas del Taller constituyen el marco normativo exclusivo y excluyente que rige la relaciÃ³n entre las partes, con independencia de usos, costumbres, expectativas o estÃ¡ndares de otros comercios o talleres.",
            ]}
          />
          <P>
            8.3 El incumplimiento del deber establecido en el presente artÃ­culo
            no genera obligaciÃ³n alguna de atenciÃ³n especial por parte del
            Taller, y la decisiÃ³n de atender o no la solicitud del Cliente
            queda a la entera discreciÃ³n del Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={9}
          title="Deber de someterse al marco legal de Confecciones Liss"
        >
          <P>
            9.1 El Cliente declara y acepta expresamente que toda relaciÃ³n
            comercial con Confecciones Liss se rige de forma exclusiva e
            irrenunciable por:
          </P>
          <Ul
            items={[
              "a) Las polÃ­ticas comerciales vigentes del Taller, en la versiÃ³n aplicable al momento de cada operaciÃ³n.",
              "b) La legislaciÃ³n de la RepÃºblica de El Salvador, aplicable a la relaciÃ³n entre las partes.",
              "c) La jurisdicciÃ³n exclusiva de los tribunales competentes de la RepÃºblica de El Salvador, para cualquier controversia que no sea resuelta mediante acuerdo directo entre las partes.",
            ]}
          />
          <P>
            9.2 El Cliente renuncia expresamente a invocar legislaciÃ³n
            extranjera, estÃ¡ndares internacionales de protecciÃ³n al consumidor
            de otras jurisdicciones, o normativas aplicables en paÃ­ses
            distintos a El Salvador, como fundamento de reclamaciones contra el
            Taller.
          </P>
          <P>
            9.3 El sometimiento al marco legal del Taller implica que el
            Cliente:
          </P>
          <Ul
            items={[
              "a) Acepta que las polÃ­ticas del Taller son vinculantes desde el momento en que accede a cualquier canal oficial, con independencia de si ha firmado un contrato, dado un clic de aceptaciÃ³n o leÃ­do formalmente los documentos.",
              "b) Acepta que el Taller es el intÃ©rprete primario de sus propias polÃ­ticas, y que en caso de duda sobre el alcance de una disposiciÃ³n, la interpretaciÃ³n del Taller prevalece, sin perjuicio del derecho del Cliente a someter la controversia a los tribunales competentes conforme al literal c) del numeral 9.1.",
              "c) Acepta que la relaciÃ³n comercial con el Taller no genera derechos adquiridos sobre condiciones futuras, disponibilidad de productos, precios ni modalidades de servicio mÃ¡s allÃ¡ de lo acordado en cada operaciÃ³n concreta.",
            ]}
          />
        </Section>
        <Hr />

        <Section n={10} title="Deber de uso adecuado de los canales oficiales">
          <P>
            10.1 El Cliente tiene el deber de utilizar exclusivamente los
            canales oficiales del Taller para toda comunicaciÃ³n, consulta,
            solicitud, reclamaciÃ³n o gestiÃ³n vinculada a su relaciÃ³n con
            Confecciones Liss. El directorio de canales oficiales vigentes estÃ¡
            disponible en:
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
            10.2 El deber de uso adecuado de los canales oficiales comprende,
            sin limitarse a ello:
          </P>
          <Ul
            items={[
              "a) No utilizar los canales del Taller para el envÃ­o de contenido ofensivo, difamatorio, amenazante, abusivo o contrario a la ley salvadoreÃ±a.",
              "b) No utilizar los canales del Taller para la difusiÃ³n de informaciÃ³n falsa sobre sus productos, servicios o personal.",
              "c) No contactar al Taller a travÃ©s de perfiles, cuentas o plataformas distintas a las listadas en el directorio oficial.",
              "d) No intentar eludir, saturar ni interferir con los canales oficiales del Taller mediante mensajes masivos, automatizados o de carÃ¡cter inapropiado.",
              "e) Identificarse correctamente al momento de contactar al Taller, proporcionando los datos necesarios para la atenciÃ³n de su consulta o reclamaciÃ³n.",
            ]}
          />
          <P>
            10.3 El incumplimiento del presente artÃ­culo faculta al Taller para
            ignorar, bloquear o denunciar las comunicaciones del Cliente
            realizadas fuera de los parÃ¡metros establecidos, sin que ello
            genere responsabilidad alguna para el Taller ni derecho de
            reclamaciÃ³n para el Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Deber de validaciÃ³n y aprobaciÃ³n oportuna">
          <P>
            11.1 El Cliente tiene el deber de revisar, validar y aprobar de
            forma expresa, oportuna y dentro del plazo establecido por el
            Taller, toda proforma, diseÃ±o, muestra, cotizaciÃ³n, confirmaciÃ³n
            de especificaciones o cualquier otro documento que el Taller le
            remita para su aprobaciÃ³n previa al inicio o continuaciÃ³n de la
            producciÃ³n.
          </P>
          <P>
            11.2 La aprobaciÃ³n del Cliente sobre cualquier documento, diseÃ±o o
            especificaciÃ³n remitido por el Taller constituye confirmaciÃ³n
            irrevocable de que el Cliente ha revisado, comprendido y aceptado el
            contenido aprobado. Una vez aprobado, el Cliente no podrÃ¡ invocar
            discrepancias sobre los elementos que aprobÃ³ como fundamento de
            reclamaciÃ³n posterior.
          </P>
          <P>
            11.3 El silencio del Cliente ante una solicitud de aprobaciÃ³n,
            transcurrido el plazo establecido por el Taller, podrÃ¡ ser
            interpretado por el Taller como aprobaciÃ³n tÃ¡cita o como abandono
            del pedido, a discreciÃ³n del Taller, sin generar obligaciÃ³n de
            compensaciÃ³n ni responsabilidad alguna para el Taller por los
            retrasos o consecuencias derivadas.
          </P>
          <P>
            11.4 El Cliente es el Ãºnico responsable de verificar que los
            archivos, diseÃ±os y referencias que proporciona al Taller son los
            definitivos y correctos antes de su aprobaciÃ³n. Los errores
            contenidos en materiales aprobados por el Cliente son
            responsabilidad exclusiva de este Ãºltimo.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Deber de conducta diligente y buena fe">
          <P>
            12.1 El Cliente tiene el deber de actuar en todo momento con buena
            fe, diligencia razonable y respeto mutuo en su relaciÃ³n con el
            Taller, su personal y sus representantes.
          </P>
          <P>
            12.2 El deber de conducta diligente comprende, sin limitarse a ello:
          </P>
          <Ul
            items={[
              "a) No proporcionar informaciÃ³n falsa, incompleta o engaÃ±osa al Taller con el propÃ³sito de obtener beneficios, descuentos o condiciones a las que no tendrÃ­a derecho conforme a las polÃ­ticas vigentes.",
              "b) No intentar manipular los procesos del Taller mediante presiÃ³n indebida, amenazas de publicidad negativa, reseÃ±as falsas o cualquier otro mecanismo de coacciÃ³n.",
              "c) No difundir informaciÃ³n falsa o malintencionada sobre el Taller, sus productos o su personal, ya sea en medios digitales, redes sociales o cualquier otro canal.",
              "d) Tratar con respeto al personal del Taller en toda interacciÃ³n, independientemente del medio o canal utilizado.",
              "e) Abstenerse de realizar comparaciones, atribuciones o declaraciones pÃºblicas sobre el Taller que no se sustenten en hechos verificables y que puedan causar perjuicio a su reputaciÃ³n comercial.",
            ]}
          />
          <P>
            12.3 El incumplimiento de este deber faculta al Taller para
            suspender la atenciÃ³n del Cliente, cancelar pedidos en curso y
            ejercer las acciones legales que correspondan por los perjuicios
            causados.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Deber de recepciÃ³n oportuna del pedido">
          <P>
            13.1 El Cliente tiene el deber de recibir el pedido en las
            condiciones, plazos y modalidades acordadas con el Taller. La
            disponibilidad del Cliente para la recepciÃ³n es una condiciÃ³n
            necesaria para el cumplimiento de la obligaciÃ³n de entrega del
            Taller.
          </P>
          <P>13.2 El Cliente deberÃ¡:</P>
          <Ul
            items={[
              "a) Estar disponible o garantizar la disponibilidad de una persona autorizada para la recepciÃ³n del pedido en la fecha y lugar acordados.",
              "b) Informar al Taller con la debida antelaciÃ³n y a travÃ©s de los canales oficiales sobre cualquier cambio en la disponibilidad de recepciÃ³n.",
              "c) Revisar el pedido al momento de la recepciÃ³n y comunicar al Taller, de forma inmediata y dentro de los plazos establecidos en la PolÃ­tica de Devoluciones, cualquier inconformidad observable en ese momento.",
            ]}
          />
          <P>
            13.3 La falta de disponibilidad del Cliente para la recepciÃ³n, o la
            de-mora en coordinar la entrega por causas atribuibles al Cliente,
            no genera responsabilidad alguna para el Taller por los retrasos
            resultantes, ni exime al Cliente de su deber de pago en los
            tÃ©rminos acordados.
          </P>
          <P>
            13.4 La recepciÃ³n del pedido por parte del Cliente sin formular
            objeciÃ³n expresa e inmediata ante el Taller constituye aceptaciÃ³n
            tÃ¡cita e irrevocable de la conformidad del producto recibido, en
            los tÃ©rminos establecidos en la PolÃ­tica de Devoluciones.
          </P>
        </Section>
        <Hr />

        <Section
          n={14}
          title="Deber de autogestiÃ³n y responsabilidad personal"
        >
          <P>
            14.1 El Cliente es el Ãºnico e irrenunciable responsable de las
            decisiones que adopte en el marco de su relaciÃ³n comercial con el
            Taller. El Taller presta sus servicios sobre la base de la
            informaciÃ³n que el Cliente proporciona, y no puede asumir
            responsabilidad por las consecuencias de decisiones adoptadas de
            forma autÃ³noma por el Cliente sin la debida consulta previa.
          </P>
          <P>
            14.2 El deber de autogestiÃ³n y responsabilidad personal comprende,
            sin limitarse a ello:
          </P>
          <Ul
            items={[
              "a) La responsabilidad exclusiva sobre las tallas, medidas y especificaciones que el Cliente proporciona al Taller.",
              "b) La responsabilidad exclusiva sobre los diseÃ±os, textos, logotipos y referencias visuales que el Cliente entrega para la producciÃ³n.",
              "c) La responsabilidad exclusiva sobre las decisiones de compra adoptadas sin haber consultado previamente con el Taller.",
              "d) La responsabilidad exclusiva sobre el uso posterior que el Cliente haga del producto adquirido.",
              "e) La responsabilidad sobre la correcta elecciÃ³n del producto en funciÃ³n de las necesidades reales del Cliente, sin que el Taller sea garante de la idoneidad del producto para un uso especÃ­fico no comunicado al Taller con anterioridad al pedido.",
            ]}
          />
          <P>
            14.3 El Taller actÃºa como ejecutor tÃ©cnico de las especificaciones
            aprobadas por el Cliente. La responsabilidad del Taller se limita a
            confeccionar el producto conforme a las especificaciones aprobadas.
            Todo lo que exceda de dicho alcance es responsabilidad exclusiva del
            Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Consecuencias del incumplimiento de deberes">
          <P>
            15.1 El incumplimiento por parte del Cliente de cualquiera de los
            deberes establecidos en la presente PolÃ­tica tendrÃ¡, segÃºn la
            naturaleza y gravedad del incumplimiento, las siguientes
            consecuencias, sin que esta lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Inadmisibilidad de la reclamaciÃ³n formulada, si el incumplimiento del deber es determinante para la procedencia de la misma.",
              "b) PÃ©rdida del derecho a invocar la protecciÃ³n de las polÃ­ticas del Taller respecto al aspecto especÃ­fico sobre el que el Cliente incumpliÃ³ su deber.",
              "c) Traslado Ã­ntegro de la responsabilidad al Cliente por los perjuicios que su incumplimiento haya causado, tanto al Taller como al propio Cliente.",
              "d) Facultad del Taller para suspender, cancelar o dar por terminada la relaciÃ³n comercial con el Cliente, con o sin previo aviso.",
              "e) Ejercicio por parte del Taller de las acciones legales que correspondan para la recuperaciÃ³n de perjuicios causados por el incumplimiento del Cliente.",
            ]}
          />
          <P>
            15.2 La traslaciÃ³n de responsabilidad al Cliente como consecuencia
            del incumplimiento de sus deberes opera de pleno derecho, sin
            necesidad de declaraciÃ³n judicial previa, y es oponible al Cliente
            desde el momento en que el incumplimiento se produce.
          </P>
        </Section>
        <Hr />

        <Section
          n={16}
          title="RelaciÃ³n con otras polÃ­ticas y derechos del cliente"
        >
          <P>
            16.1 La presente PolÃ­tica de Deberes debe interpretarse de forma
            conjunta y complementaria con la totalidad del marco legal de
            Confecciones Liss. Los deberes aquÃ­ establecidos son la contraparte
            necesaria de los derechos reconocidos al Cliente en la PolÃ­tica de
            Derechos, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/derechos
            </Link>
          </div>
          <P>
            16.2 El ejercicio vÃ¡lido de los derechos reconocidos al Cliente
            estÃ¡ condicionado al previo cumplimiento de los deberes que
            corresponden al caso concreto. El Cliente que no ha cumplido sus
            deberes no podrÃ¡ invocar los derechos correlacionados como si los
            hubiera cumplido.
          </P>
          <P>
            16.3 La presente PolÃ­tica no establece ni modifica los derechos del
            Cliente. Los derechos del Cliente se encuentran exclusivamente en la
            PolÃ­tica de Derechos del Usuario, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/derechos
            </Link>
          </div>
        </Section>
        <Hr />

        <Section n={17} title="Modificaciones a la polÃ­tica">
          <P>
            17.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente PolÃ­tica en cualquier momento,
            publicando la versiÃ³n actualizada en los canales oficiales del
            Taller, disponibles en:
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
            17.2 Las modificaciones entrarÃ¡n en vigencia de forma inmediata
            desde su publicaciÃ³n. El acceso continuado a cualquier canal
            oficial del Taller con posterioridad a la publicaciÃ³n de cualquier
            modificaciÃ³n constituirÃ¡ aceptaciÃ³n automÃ¡tica e irrevocable de
            la versiÃ³n actualizada.
          </P>
          <P>
            17.3 Es deber exclusivo del Cliente verificar periÃ³dicamente la
            versiÃ³n vigente de la presente PolÃ­tica. El Taller no estÃ¡
            obligado a notificar individualmente a los Clientes sobre
            modificaciones a sus polÃ­ticas.
          </P>
        </Section>

        <LegalFootnote>
          CONFECCIONES LISS â€” CONTACTO OFICIAL
          <br />
          Toda gestiÃ³n exclusivamente a travÃ©s de:{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
          <br />
          <br />
          PolÃ­tica de Privacidad:{" "}
          <Link
            href="/legal/privacidad"
            className="text-blue-600 hover:underline"
          >
            /legal/privacidad
          </Link>{" "}
          Â· TÃ©rminos y Condiciones:{" "}
          <Link
            href="/legal/terminos"
            className="text-blue-600 hover:underline"
          >
            /legal/terminos
          </Link>{" "}
          Â· PolÃ­tica de Devoluciones:{" "}
          <Link
            href="/legal/devoluciones"
            className="text-blue-600 hover:underline"
          >
            /legal/devoluciones
          </Link>{" "}
          Â· PolÃ­tica de ConfecciÃ³n:{" "}
          <Link
            href="/legal/confeccion"
            className="text-blue-600 hover:underline"
          >
            /legal/confeccion
          </Link>{" "}
          Â· PolÃ­tica de Promociones:{" "}
          <Link
            href="/legal/promociones"
            className="text-blue-600 hover:underline"
          >
            /legal/promociones
          </Link>{" "}
          Â· PolÃ­tica de IA:{" "}
          <Link href="/legal/ia" className="text-blue-600 hover:underline">
            /legal/ia
          </Link>{" "}
          Â· Derechos del Usuario:{" "}
          <Link
            href="/legal/derechos"
            className="text-blue-600 hover:underline"
          >
            /legal/derecho
          </Link>
          <br />
          <br />
          <strong>DirecciÃ³n:</strong> Barrio La Merced, 5Âª Calle Poniente y
          1Âª Avenida Sur, Casa #402, San Miguel, El Salvador.
          <br />
          <strong>Horario:</strong> Lunes a SÃ¡bado, 8:00 AM â€“ 5:00 PM
          <br />
          <strong>Encargado de Comunicaciones:</strong> Carlos JosÃ© Molina
          Villacorta
          <br />
          <br />
          Vigente desde su publicaciÃ³n â€” VersiÃ³n: Junio 2026
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
