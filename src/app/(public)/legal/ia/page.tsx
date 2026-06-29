import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import {
  Section,
  Hr,
  InfoBox,
  P,
  Ul,
  LegalFootnote,
} from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "PolÃ­tica de Uso de Inteligencia Artificial",
  description:
    "PolÃ­tica de Inteligencia Artificial de Confecciones Liss: uso de imÃ¡genes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
  keywords:
    "inteligencia artificial de confecciones liss, liam alejandro modelo liss, imÃ¡genes ia de confecciones liss, tecnologÃ­a en confecciones liss",
  alternates: { canonical: `${siteConfig.url}/legal/ia` },
  openGraph: {
    title: "PolÃ­tica de Uso de Inteligencia Artificial | Confecciones Liss",
    description:
      "PolÃ­tica de Inteligencia Artificial de Confecciones Liss: uso de imÃ¡genes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
    url: `${siteConfig.url}/legal/ia`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolÃ­tica de Uso de Inteligencia Artificial | Confecciones Liss",
    description:
      "PolÃ­tica de Inteligencia Artificial de Confecciones Liss: uso de imÃ¡genes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
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

export default function PoliticaIAPage() {
  const PAGE_URL = `${siteConfig.url}/legal/ia`;
  const PAGE_TITLE = "PolÃ­tica de Inteligencia Artificial";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "PolÃ­tica de Uso de Inteligencia Artificial â€” PolÃ­ticas Oficiales | Confecciones Liss",
          description:
            "PolÃ­tica de Inteligencia Artificial de Confecciones Liss: uso de imÃ¡genes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
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
        title="PolÃ­tica de Uso de Inteligencia Artificial en Contenidos Visuales y Comerciales"
        category="Aviso legal y polÃ­ticas sobre el uso transparente de inteligencia artificial y modelos generativos en el Taller."
        date="24 Jun, 2026"
        readingTime={20}
      >
        <P>
          El presente documento regula de manera integral, exhaustiva y
          vinculante el uso de tecnologÃ­as de inteligencia artificial (en
          adelante &quot;IA&quot;) por parte de Confecciones Liss (en adelante
          &quot;el Taller&quot;) en la producciÃ³n, ediciÃ³n y publicaciÃ³n de
          contenido visual de carÃ¡cter comercial, incluyendo fotografÃ­as de
          productos, imÃ¡genes de catÃ¡logo, materiales publicitarios y
          cualquier otro contenido difundido a travÃ©s de la plataforma web{" "}
          <Link
            href="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/
          </Link>{" "}
          (en adelante &quot;la Plataforma&quot;), asÃ­ como en todas las redes
          sociales y canales de comunicaciÃ³n oficiales del Taller.
        </P>
        <P>
          Cualquier persona natural que acceda, navegue, visualice o interactÃºe
          con el contenido del Taller en cualquiera de sus canales digitales (en
          adelante &quot;el Usuario&quot;), declara haber leÃ­do, comprendido y
          aceptado de forma libre, voluntaria e informada la totalidad de los
          tÃ©rminos aquÃ­ establecidos. El desconocimiento de esta PolÃ­tica no
          exime al Usuario de su cumplimiento, no le otorga derechos adicionales
          a los expresamente reconocidos en este documento, y no constituye
          fundamento vÃ¡lido para reclamaciÃ³n alguna.
        </P>
        <Hr />

        <Section n={1} title="DeclaraciÃ³n de transparencia y propÃ³sito">
          <P>
            1.1 Confecciones Liss adopta la presente PolÃ­tica con el propÃ³sito
            de comunicar de forma transparente, clara e inequÃ­voca el uso de
            herramientas de inteligencia artificial en la producciÃ³n de
            contenido visual comercial, a fin de garantizar que el Usuario
            disponga de informaciÃ³n suficiente para interpretar correctamente
            los materiales publicados por el Taller.
          </P>
          <P>
            1.2 El uso de IA por parte del Taller responde exclusivamente a
            finalidades de mejora estÃ©tica, optimizaciÃ³n visual y
            presentaciÃ³n comercial de productos reales y tangibles. En ningÃºn
            caso el Taller utiliza IA para crear, inventar ni publicitar
            productos que no pueda confeccionar o que no existan en su
            repertorio de fabricaciÃ³n.
          </P>
          <P>
            1.3 Confecciones Liss opera bajo el principio de que la realidad
            antecede a la representaciÃ³n: todo producto que aparece en el
            catÃ¡logo digital, redes sociales o cualquier material comercial del
            Taller tiene como origen un artÃ­culo fÃ­sico real, confeccionado o
            confeccionable por el Taller, cuya existencia material precede en
            todos los casos a cualquier tratamiento o ediciÃ³n mediante IA.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Definiciones">
          <P>2.1 A los efectos de la presente PolÃ­tica, se entenderÃ¡ por:</P>
          <div className="mb-3 space-y-4 pl-6">
            <P>
              <strong>
                a) &quot;Inteligencia Artificial&quot; o &quot;IA&quot;:
              </strong>{" "}
              cualquier sistema, herramienta, software o algoritmo de
              aprendizaje automÃ¡tico o generaciÃ³n asistida por computadora
              utilizado por el Taller para la ediciÃ³n, mejora, recreaciÃ³n o
              generaciÃ³n de elementos visuales en imÃ¡genes, fotografÃ­as o
              contenido multimedia de carÃ¡cter comercial.
            </P>
            <P>
              <strong>
                b) &quot;Modelo IA&quot; o &quot;Liam Alejandro&quot;:
              </strong>{" "}
              personaje masculino de naturaleza artÃ­stica y origen irreal, que
              responde al nombre de Liam Alejandro, creado Ã­ntegramente
              mediante herramientas de inteligencia artificial, utilizado como
              soporte visual para la presentaciÃ³n de prendas del Taller. El
              Modelo IA no corresponde a ninguna persona natural real,
              identificable o existente; ha sido generado de cero mediante
              tecnologÃ­a computacional y no constituye la representaciÃ³n
              digitalizada de ningÃºn ser humano. No obstante lo anterior, Liam
              Alejandro posee una ficha de identidad propia, con rasgos,
              denominaciÃ³n y carÃ¡cter definidos, y cuenta con presencia
              oficial en Facebook bajo el perfil:{" "}
              <a
                href="https://www.facebook.com/confeccionliss.admin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.facebook.com/confeccionliss.admin
              </a>{" "}
              donde se le atribuye el rol de modelo comercial del Taller. La
              gestiÃ³n de dicho perfil, al igual que la de todos los Canales
              Oficiales del Taller listados en{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
              , estÃ¡ a cargo exclusivo del Encargado de Comunicaciones Carlos
              JosÃ© Molina Villacorta. En ningÃºn momento el Taller ha ocultado
              el origen artÃ­stico e irreal de Liam Alejandro; su naturaleza
              sintÃ©tica es pÃºblica, declarada y de conocimiento general a
              travÃ©s de la presente PolÃ­tica.
            </P>
            <P>
              <strong>c) &quot;Modelo Femenino Humano&quot;:</strong> persona
              natural real que ha participado en sesiones fotogrÃ¡ficas para el
              CatÃ¡logo Digital del Taller, portando las prendas de la
              colecciÃ³n. Las imÃ¡genes del Modelo Femenino Humano pueden haber
              sido sometidas a ediciÃ³n con IA con fines de mejora estÃ©tica
              (iluminaciÃ³n, fondo, detalles), pero la persona fotografiada es
              en todos los casos un ser humano real que otorgÃ³ su
              consentimiento para la sesiÃ³n y cuya identidad no se oculta. El
              Modelo Femenino Humano no es una construcciÃ³n computacional ni
              una figura generada artificialmente.
            </P>
            <P>
              <strong>d) &quot;Encargado de Comunicaciones&quot;:</strong>{" "}
              Carlos JosÃ© Molina Villacorta, persona natural responsable de la
              gestiÃ³n de todos los Canales Oficiales del Taller. El Encargado
              de Comunicaciones ha realizado apariciones en el CatÃ¡logo Digital
              del Taller en calidad de colaborador visual, cuyas imÃ¡genes han
              sido editadas con IA conforme a los procedimientos establecidos en
              la presente PolÃ­tica. Dichas apariciones son de conocimiento
              pÃºblico y no constituyen uso no autorizado de imagen ni
              infracciÃ³n de derecho alguno.
            </P>
            <P>
              <strong>e) &quot;Prenda Real&quot;:</strong> todo artÃ­culo textil
              confeccionado o confeccionable por el Taller, cuya existencia
              material, fÃ­sica y verificable es previa e independiente de
              cualquier tratamiento con IA. Una Prenda Real puede tocarse,
              medirse, fotografiarse y entregarse fÃ­sicamente.
            </P>
            <P>
              <strong>f) &quot;Imagen Editada con IA&quot;:</strong> toda
              fotografÃ­a, render o composiciÃ³n visual en la que la IA ha
              intervenido para mejorar aspectos tales como iluminaciÃ³n,
              textura, color, fondo, presentaciÃ³n del producto, montaje sobre
              el Modelo IA u otros elementos estÃ©ticos, partiendo siempre de
              una Prenda Real como insumo base.
            </P>
            <P>
              <strong>g) &quot;Imagen Real sin EdiciÃ³n&quot;:</strong> toda
              fotografÃ­a publicada por el Taller en la que la prenda o el
              producto aparece en su estado visual original, sin intervenciÃ³n
              de herramientas de IA. El Taller publica este tipo de imÃ¡genes de
              forma periÃ³dica y reconoce el derecho del Usuario a recibirlas
              como referencia directa del producto fÃ­sico.
            </P>
            <P>
              <strong>h) &quot;CatÃ¡logo Digital&quot;:</strong> el conjunto de
              imÃ¡genes, fichas y descripciones de productos publicadas en la
              Plataforma y en los canales oficiales del Taller, disponibles en{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              <strong>i) &quot;Canales Oficiales&quot;:</strong> la Plataforma
              web, las pÃ¡ginas y perfiles de redes sociales del Taller
              (Facebook, Instagram, TikTok y cualquier otra plataforma en la que
              el Taller tenga presencia oficial verificada), todos gestionados
              por el Encargado de Comunicaciones.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Naturaleza y alcance del uso de IA en contenido visual"
        >
          <P>
            3.1{" "}
            <strong>
              TIPOLOGÃA DE MODELOS UTILIZADOS EN EL CATÃLOGO DIGITAL.
            </strong>{" "}
            El Taller emplea dos categorÃ­as distintas de soporte visual humano
            para la presentaciÃ³n de sus prendas, cuya naturaleza difiere
            sustancialmente y se declara de forma expresa en la presente
            PolÃ­tica:
          </P>
          <div className="mb-4 pl-6">
            <P>
              <strong>
                A) MODELO IA â€” LIAM ALEJANDRO â€” PERSONAJE ARTÃSTICO
                SINTÃ‰TICO.
              </strong>
            </P>
            <P>
              Liam Alejandro, definido en el ArtÃ­culo 2.1(b), es un personaje
              masculino de origen completamente irreal, creado mediante IA. El
              Usuario reconoce y acepta expresamente que:
            </P>
            <Ul
              items={[
                "a) Liam Alejandro es una construcciÃ³n computacional completa. No es la imagen de ninguna persona natural real, ningÃºn individuo identificable, ningÃºn modelo fotogrÃ¡fico ni ninguna persona cuya identidad haya sido digitalizada, modificada o alterada.",
                "b) Liam Alejandro ha sido creado de cero mediante tecnologÃ­a de generaciÃ³n por IA, sin partir de la fotografÃ­a, imagen, rostro, cuerpo ni identidad de ningÃºn ser humano existente.",
                "c) A pesar de su origen irreal, Liam Alejandro posee rasgos visuales consistentes, una identidad artÃ­stica propia y presencia en redes sociales. Esta construcciÃ³n de identidad responde a una decisiÃ³n artÃ­stica y comercial del Taller. En ningÃºn momento el Taller ha presentado a Liam Alejandro como una persona humana real, y su naturaleza irreal ha sido siempre pÃºblica y declarada.",
                "d) Cualquier semejanza visual de Liam Alejandro con personas naturales reales es puramente incidental, fortuita e involuntaria, y no implica representaciÃ³n, endorsement, autorizaciÃ³n ni vinculaciÃ³n de ningÃºn tipo con persona real alguna.",
                "e) Liam Alejandro no reemplaza, desplaza ni estÃ¡ vinculado a ninguna persona natural que haya prestado sus derechos de imagen al Taller.",
              ]}
            />
          </div>
          <div className="mb-4 pl-6">
            <P>
              <strong>
                B) MODELO FEMENINO HUMANO â€” PERSONA NATURAL REAL.
              </strong>
            </P>
            <P>
              El CatÃ¡logo Digital del Taller incluye asimismo imÃ¡genes de una
              persona natural real, definida en el ArtÃ­culo 2.1(c) como
              &quot;Modelo Femenino Humano&quot;. El Usuario reconoce y acepta
              expresamente que:
            </P>
            <Ul
              items={[
                "a) El Modelo Femenino Humano es una persona real cuya participaciÃ³n en las sesiones fotogrÃ¡ficas del Taller fue libre, voluntaria y consentida. No es una figura generada por IA ni una simulaciÃ³n computacional de ningÃºn tipo.",
                "b) Las imÃ¡genes del Modelo Femenino Humano pueden haber sido sometidas a ediciÃ³n con IA con fines exclusivamente estÃ©ticos (mejora de iluminaciÃ³n, ajuste de fondo, nitidez de detalles del producto), pero la persona fotografiada es en todos los casos un ser humano real. La ediciÃ³n no altera la identidad ni la naturaleza humana del sujeto fotografiado.",
                "c) El hecho de que las imÃ¡genes del Modelo Femenino Humano sean editadas con IA no convierte a dicho modelo en una figura sintÃ©tica ni elimina su condiciÃ³n de persona natural real. La ediciÃ³n es un tratamiento de la imagen, no una sustituciÃ³n del sujeto.",
                "d) El Usuario no podrÃ¡ reclamar engaÃ±o ni falta de transparencia con base en la coexistencia de ambas categorÃ­as de modelo en el CatÃ¡logo Digital, dado que ambas quedan expresamente definidas y distinguidas en la presente PolÃ­tica.",
              ]}
            />
          </div>
          <P>
            3.2{" "}
            <strong>
              USO DE IA EN LA PRESENTACIÃ“N DE PRENDAS E IMÃGENES SIN EDICIÃ“N.
            </strong>
            El Taller aplica herramientas de inteligencia artificial sobre
            imÃ¡genes de sus Prendas Reales con el exclusivo propÃ³sito de
            mejorar su presentaciÃ³n visual comercial. Adicionalmente, el Taller
            publica de forma periÃ³dica ImÃ¡genes Reales sin EdiciÃ³n, conforme
            a lo definido en el ArtÃ­culo 2.1(g). El Usuario reconoce y acepta
            expresamente que:
          </P>
          <Ul
            items={[
              "a) El punto de partida de toda imagen publicada en el CatÃ¡logo Digital es siempre una Prenda Real. La IA no crea la prenda; recrea su presentaciÃ³n visual a partir del artÃ­culo fÃ­sico existente.",
              "b) Las intervenciones de IA sobre la imagen de una prenda pueden incluir, sin limitarse a ello: mejora de iluminaciÃ³n, ajuste de color y tono, mejora de textura y acabado visual, eliminaciÃ³n o sustituciÃ³n de fondo, montaje o composiciÃ³n de la prenda sobre el Modelo IA, correcciÃ³n de perspectiva o pliegues, y cualquier otro tratamiento estÃ©tico que optimice la presentaciÃ³n comercial del producto.",
              "c) Ninguna de las intervenciones descritas en el literal anterior altera la naturaleza esencial de la prenda publicada, sus caracterÃ­sticas funcionales, su composiciÃ³n de materiales, su mÃ©todo de confecciÃ³n ni su disponibilidad real para fabricaciÃ³n y entrega.",
              "d) Las mejoras visuales aplicadas mediante IA pueden generar diferencias de percepciÃ³n entre la imagen publicada y el producto fÃ­sico entregado, particularmente en lo referente a brillo, saturaciÃ³n de color, textura aparente o nitidez de detalles. Dichas diferencias son inherentes al proceso de ediciÃ³n y no constituyen publicidad engaÃ±osa, defecto del producto, incumplimiento contractual ni fundamento vÃ¡lido para devoluciÃ³n o reclamaciÃ³n.",
            ]}
          />
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            <P>
              e) El CatÃ¡logo Digital del Taller no estÃ¡ compuesto
              exclusivamente por ImÃ¡genes Editadas con IA. El Taller publica
              tambiÃ©n ImÃ¡genes Reales sin EdiciÃ³n de sus productos, las
              cuales reflejan fielmente el aspecto fÃ­sico de la prenda sin
              ningÃºn tratamiento de mejora artificial. El Usuario tiene derecho
              a solicitar ImÃ¡genes Reales sin EdiciÃ³n de cualquier producto
              antes de efectuar su pedido, a travÃ©s de los canales oficiales
              disponibles en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
          </div>
          <P>
            3.3 <strong>DIRECCIÃ“N DEL PROCESO DE PRODUCCIÃ“N.</strong> El flujo
            de trabajo del Taller es invariablemente el siguiente, en el orden
            aquÃ­ establecido y en ningÃºn otro:
          </P>
          <div className="mb-3 space-y-2 pl-6 font-semibold text-slate-700">
            <P>PRIMERO: El Taller confecciona o dispone de la Prenda Real.</P>
            <P>
              SEGUNDO: La Prenda Real es fotografiada o documentada en su estado
              fÃ­sico.
            </P>
            <P>
              TERCERO: La imagen de la Prenda Real es procesada mediante IA para
              mejorar su presentaciÃ³n visual.
            </P>
            <P>
              CUARTO: La imagen resultante es publicada en el CatÃ¡logo Digital.
            </P>
          </div>
          <P>
            Bajo ninguna circunstancia el Taller invierte este proceso
            publicando imÃ¡genes de prendas cuya existencia fÃ­sica dependa de
            la imagen generada o sugerida por IA. La IA es exclusivamente una
            herramienta de presentaciÃ³n, no una herramienta de diseÃ±o de
            productos nuevos ni de invenciÃ³n de artÃ­culos inexistentes.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="GarantÃ­a de autenticidad y veracidad comercial">
          <P>
            4.1 El Taller garantiza de forma expresa e irrevocable que todo
            producto publicado en su CatÃ¡logo Digital, en sus redes sociales y
            en cualquier material de comunicaciÃ³n comercial es un producto real
            que el Taller puede confeccionar y entregar. Esta garantÃ­a se
            extiende a todos los artÃ­culos publicados, sin excepciÃ³n.
          </P>
          <P>
            4.2 El Taller no publica bajo ninguna circunstancia imÃ¡genes de
            productos ficticios, de artÃ­culos que no puede confeccionar, de
            prendas diseÃ±adas exclusivamente por IA sin correlato fÃ­sico real,
            ni de productos que existan Ãºnicamente como imagen digital.
          </P>
          <P>
            4.3 El Usuario puede verificar la autenticidad y disponibilidad de
            cualquier prenda publicada comunicÃ¡ndose con el Taller a travÃ©s de
            los canales oficiales disponibles en:
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
            4.4 La existencia de mejoras visuales mediante IA en las imÃ¡genes
            del CatÃ¡logo Digital no desvirtÃºa ni invalida la garantÃ­a de
            autenticidad establecida en el numeral 4.1. La presentaciÃ³n visual
            mejorada no altera la realidad del producto, sino Ãºnicamente su
            representaciÃ³n fotogrÃ¡fica.
          </P>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Diferencias visuales entre imagen publicada y producto fÃ­sico"
        >
          <P>
            5.1 El Usuario reconoce y acepta expresamente que las imÃ¡genes
            publicadas por el Taller en su CatÃ¡logo Digital y canales de
            comunicaciÃ³n han sido sometidas a tratamiento de ediciÃ³n mediante
            IA con fines de presentaciÃ³n comercial y que, en consecuencia,
            pueden existir diferencias perceptibles entre la imagen publicada y
            el producto fÃ­sico entregado.
          </P>
          <P>
            5.2 Las posibles diferencias entre la imagen publicada y el producto
            fÃ­sico pueden incluir, sin limitarse a ello: variaciones en la
            saturaciÃ³n, brillo o tono del color; diferencias en la percepciÃ³n
            de textura o grosor del tejido; variaciones en la nitidez o
            definiciÃ³n visual de costuras y detalles; diferencias en el
            contexto de presentaciÃ³n o fondo de la imagen.
          </P>
          <P>
            5.3 Las diferencias descritas en el numeral anterior son
            consecuencia directa e inevitable del proceso de ediciÃ³n y mejora
            visual mediante IA, y son de conocimiento expreso del Usuario desde
            el momento en que accede al contenido del Taller. En consecuencia,
            dichas diferencias:
          </P>
          <Ul
            items={[
              "a) No constituyen publicidad engaÃ±osa ni falsa representaciÃ³n del producto.",
              "b) No constituyen incumplimiento de ninguna obligaciÃ³n contractual del Taller.",
              "c) No fundamentan reclamo alguno por diferencia entre lo ofrecido y lo entregado, siempre que el producto fÃ­sico corresponda en sus caracterÃ­sticas esenciales (tipo de prenda, modelo, talla y color base) a lo acordado entre las partes.",
              "d) No fundamentan solicitud de devoluciÃ³n, cambio ni reembolso con base exclusiva en la diferencia visual entre imagen editada y producto fÃ­sico.",
            ]}
          />
          <P>
            5.4 Para cualquier consulta sobre el aspecto o caracterÃ­sticas
            reales de una prenda antes de efectuar un pedido, el Usuario deberÃ¡
            comunicarse con el Taller a travÃ©s de sus canales oficiales. El
            Taller harÃ¡ sus mejores esfuerzos por proporcionar informaciÃ³n
            adicional, incluyendo fotografÃ­as sin ediciÃ³n cuando sea posible.
          </P>
          <P>
            5.5 Toda diferencia visual entre la imagen publicada y el producto
            fÃ­sico deberÃ¡ haberse comunicado al Taller dentro de los plazos
            establecidos en la PolÃ­tica de Devoluciones, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/devoluciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/devoluciones
            </Link>
          </div>
          <P>
            Transcurridos dichos plazos, el Taller no estarÃ¡ obligado a atender
            ninguna reclamaciÃ³n de esta naturaleza.
          </P>
        </Section>
        <Hr />

        <Section
          n={6}
          title="Naturaleza jurÃ­dica de los modelos: derechos de imagen y protecciÃ³n de identidad"
        >
          <P>
            6.1{" "}
            <strong>LIAM ALEJANDRO (MODELO IA) â€” RÃ‰GIMEN JURÃDICO.</strong>{" "}
            Liam Alejandro, el Modelo IA utilizado por el Taller en sus
            contenidos visuales, es una construcciÃ³n sintÃ©tica masculina
            generada mediante inteligencia artificial. No tiene identidad civil
            reconocible en el ordenamiento jurÃ­dico salvadoreÃ±o como persona
            natural, no tiene derechos de imagen atribuibles a ninguna persona
            fÃ­sica, y no ha sido creado a partir de fotografÃ­as, datos
            biomÃ©tricos ni imagen de ningÃºn ser humano real. Su perfil en
            Facebook ({" "}
            <a
              href="https://www.facebook.com/confeccionliss.admin"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.facebook.com/confeccionliss.admin
            </a>{" "}
            ) constituye una extensiÃ³n artÃ­stica y comercial de su identidad
            ficticia, gestionada en todo momento por el Encargado de
            Comunicaciones, sin que dicha presencia digital implique atribuciÃ³n
            de personalidad jurÃ­dica ni derechos civiles al personaje.
          </P>
          <P>
            6.2 Dado que Liam Alejandro no representa a ninguna persona natural,
            el Usuario queda expresamente impedido de:
          </P>
          <Ul
            items={[
              "a) Reclamar al Taller por supuesta utilizaciÃ³n no autorizada de la imagen de una persona concreta, con base en el parecido visual de Liam Alejandro con algÃºn individuo real.",
              "b) Exigir la retirada de contenido bajo el argumento de que Liam Alejandro reproduce o se asemeja a su propia imagen o la de un tercero.",
              "c) Atribuir al Taller responsabilidad civil o de cualquier otra Ã­ndole derivada del parecido casual de Liam Alejandro con personas reales.",
              "d) Cuestionar la transparencia del Taller respecto a Liam Alejandro, dado que su naturaleza irreal ha sido pÃºblica y declarada en todo momento a travÃ©s de la presente PolÃ­tica, disponible en los Canales Oficiales.",
            ]}
          />
          <P>
            6.3 El Taller, en el diseÃ±o y selecciÃ³n de Liam Alejandro, ha
            actuado de buena fe y con la debida diligencia para que la figura
            generada no constituya representaciÃ³n identificable de ninguna
            persona natural existente. Cualquier semejanza visual involuntaria
            de Liam Alejandro con persona real alguna no genera derecho a
            indemnizaciÃ³n ni a reclamo de ningÃºn tipo en contra del Taller.
          </P>
          <P>
            6.4 <strong>MODELO FEMENINO HUMANO â€” RÃ‰GIMEN JURÃDICO.</strong>{" "}
            Las imÃ¡genes del Modelo Femenino Humano publicadas en el CatÃ¡logo
            Digital del Taller fueron obtenidas con el pleno consentimiento de
            la persona fotografiada. El Taller garantiza que:
          </P>
          <Ul
            items={[
              "a) La participaciÃ³n del Modelo Femenino Humano fue libre y voluntaria.",
              "b) El tratamiento de ediciÃ³n con IA aplicado sobre dichas imÃ¡genes se limitÃ³ a mejoras estÃ©ticas del entorno visual y de la presentaciÃ³n del producto, sin alterar la identidad ni la apariencia esencial de la persona fotografiada de manera que pudiera considerarse engaÃ±osa o lesiva para su imagen.",
              "c) El Taller asume plena responsabilidad por el uso adecuado de las imÃ¡genes del Modelo Femenino Humano dentro de los tÃ©rminos acordados.",
            ]}
          />
          <P>
            6.5 <strong>APARICIONES DEL ENCARGADO DE COMUNICACIONES.</strong> El
            Encargado de Comunicaciones, Carlos JosÃ© Molina Villacorta, ha
            realizado apariciones en el CatÃ¡logo Digital del Taller en calidad
            de colaborador visual, con su propio consentimiento expreso. Dichas
            apariciones han sido editadas con IA conforme a los procedimientos
            establecidos en la presente PolÃ­tica. El Usuario reconoce que estas
            apariciones son de carÃ¡cter pÃºblico y comercial, y que no
            constituyen uso no autorizado de imagen ni infracciÃ³n de derecho
            alguno.
          </P>
          <P>
            6.6 Liam Alejandro, los parÃ¡metros utilizados para su generaciÃ³n,
            las imÃ¡genes resultantes, su identidad artÃ­stica y el proceso
            creativo que los rodea constituyen activos comerciales del Taller,
            protegidos por los principios generales de propiedad intelectual
            aplicables en El Salvador. Queda expresamente prohibida su
            reproducciÃ³n, copia, alteraciÃ³n o uso comercial sin autorizaciÃ³n
            escrita del Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Propiedad intelectual del contenido generado con IA"
        >
          <P>
            7.1 Todo el contenido visual publicado por el Taller, incluyendo las
            imÃ¡genes de productos editadas con IA, las composiciones del Modelo
            IA portando prendas del Taller, los materiales de campaÃ±a y
            cualquier otro elemento grÃ¡fico de carÃ¡cter comercial, es
            propiedad exclusiva del Taller o ha sido utilizado bajo licencia
            vÃ¡lida.
          </P>
          <P>
            7.2 El Usuario obtiene Ãºnicamente una licencia limitada, personal,
            no exclusiva, intransferible y revocable para visualizar el
            contenido del Taller con el exclusivo propÃ³sito de explorar el
            catÃ¡logo y evaluar la adquisiciÃ³n de productos. Esta licencia no
            autoriza la descarga, copia, reproducciÃ³n, distribuciÃ³n,
            modificaciÃ³n, uso comercial ni publicaciÃ³n del contenido en
            ningÃºn medio o plataforma.
          </P>
          <P>
            7.3 El uso no autorizado del contenido visual del Taller, incluyendo
            las imÃ¡genes editadas con IA, el Modelo IA, o cualquier material de
            campaÃ±a, faculta al Taller para ejercer las acciones legales que
            correspondan conforme a la legislaciÃ³n salvadoreÃ±a aplicable.
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="ExenciÃ³n de responsabilidad del taller por el uso de IA"
        >
          <P>
            8.1 En la mÃ¡xima medida permitida por la legislaciÃ³n salvadoreÃ±a
            aplicable, Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de los siguientes supuestos, sin que esta
            lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Diferencias visuales entre las imÃ¡genes del catÃ¡logo, procesadas con IA, y el producto fÃ­sico real entregado al Usuario, siempre que dichas diferencias sean consecuencia del proceso de ediciÃ³n y no correspondan a un cambio sustancial en las caracterÃ­sticas esenciales del producto acordadas entre las partes.",
              "b) Expectativas estÃ©ticas del Usuario formadas a partir de las imÃ¡genes editadas del CatÃ¡logo Digital que no se vean satisfechas por el producto fÃ­sico, cuando dicha insatisfacciÃ³n de-rive exclusivamente de la mejora visual aplicada por IA y no de un defecto de fabricaciÃ³n real o de un incumplimiento del Taller en las especificaciones acordadas.",
              "c) ConfusiÃ³n o error del Usuario respecto a si el contenido visual del Taller ha sido edi-tado con IA, dado que la presente PolÃ­tica declara dicho uso de forma expresa, pÃºblica y accesible, y es vinculante desde el momento en que el Usuario accede a cualquier canal oficial del Taller.",
              "d) Reclamaciones basadas en la apariencia del Modelo IA, incluyendo su parecido casual con personas reales, su tamaÃ±o o proporciones corporales, o cualquier caracterÃ­stica estÃ©tica de la figura generada.",
              "e) Decisiones de compra adoptadas por el Usuario basÃ¡ndose exclusiva o principalmente en las imÃ¡genes del catÃ¡logo sin haber consultado previamente con el Taller sobre las caracterÃ­sticas especÃ­ficas de la prenda.",
              "f) Interpretaciones incorrectas del contenido visual del Taller derivadas del desconoci-miento de la presente PolÃ­tica por parte del Usuario.",
              "g) Cualquier controversia, reclamo o responsabilidad legal que el Usuario intente derivar del uso de IA en los contenidos comerciales del Taller, siempre que dicho uso sea conforme a lo establecido en la presente PolÃ­tica.",
            ]}
          />
          <P>
            8.2 La exenciÃ³n de responsabilidad establecida en el numeral
            anterior no opera en caso de que el Taller publique imÃ¡genes de
            productos que no puede confeccionar ni entregar, supuesto que el
            Taller declara de forma expresa que no ocurrirÃ¡ en ningÃºn caso
            conforme al ArtÃ­culo 4.
          </P>
        </Section>
        <Hr />

        <Section
          n={9}
          title="DivulgaciÃ³n obligatoria, consentimiento informado y derecho a la informaciÃ³n del usuario"
        >
          <P>
            9.1 La presente PolÃ­tica constituye la divulgaciÃ³n oficial y
            suficiente del Taller respecto a su uso de inteligencia artificial
            en la producciÃ³n de contenido visual. Su publicaciÃ³n en
            https://www.confeccionesliss.com/legal y su inclusiÃ³n en el
            repositorio de polÃ­ticas del Taller hacen presumir de pleno derecho
            el conocimiento de la presente PolÃ­tica por parte de todo Usuario
            que acceda a cualquier contenido del Taller.
          </P>
          <P>
            9.2 Al visualizar, compartir, comentar, guardar en favoritos,
            consultar o interactuar de cualquier modo con el contenido comercial
            del Taller â€” ya sea en la Plataforma, en redes sociales, en
            aplicaciones de mensajerÃ­a o en cualquier otro canal â€” el Usuario
            declara de forma tÃ¡cita e irrevocable haber tomado conocimiento de
            la presente PolÃ­tica y haber aceptado en su integridad sus
            tÃ©rminos y condiciones.
          </P>
          <P>
            9.3 El Taller no estÃ¡ obligado a incluir avisos, etiquetas, marcas
            de agua ni notas especÃ­ficas en cada imagen individual que indiquen
            el uso de IA, dado que la presente PolÃ­tica establece dicho uso de
            manera general y aplicable a la totalidad del contenido visual del
            Taller. La ausencia de aviso individualizado en una imagen concreta
            no desvirtÃºa la aplicabilidad de la presente PolÃ­tica a dicha
            imagen.
          </P>
          <P>
            9.4 <strong>DERECHO A LA INFORMACIÃ“N.</strong> El Usuario tiene el
            derecho expreso e irrenunciable de recibir informaciÃ³n clara sobre
            la naturaleza del contenido visual publicado por el Taller. En
            ejercicio de dicho derecho, el Usuario podrÃ¡ en todo momento:
          </P>
          <Ul
            items={[
              "a) Solicitar al Taller la aclaraciÃ³n sobre si una imagen especÃ­fica del CatÃ¡logo Digital corresponde a una Imagen Editada con IA, a una Imagen Real sin EdiciÃ³n, o a una imagen del Modelo Femenino Humano o del Encargado de Comunicaciones.",
              "b) Solicitar ImÃ¡genes Reales sin EdiciÃ³n de cualquier producto de interÃ©s antes de efec-tuar su pedido, a travÃ©s de los canales oficiales disponibles en https://www.confeccionesliss.com/links",
            ]}
          />
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            <P>
              c) Consultar la totalidad de sus derechos como Usuario del Taller
              en:{" "}
              <Link
                href="/legal/derechos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derecho
              </Link>
            </P>
          </div>
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            <P>
              d) Consultar la totalidad de sus deberes como Usuario del Taller
              en:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </P>
          </div>
          <P>
            9.5 El ejercicio de los derechos establecidos en el numeral anterior
            no suspende ni modifica las condiciones comerciales aplicables al
            pedido del Usuario, ni otorga derechos adicionales de devoluciÃ³n o
            reembolso mÃ¡s allÃ¡ de los establecidos en la PolÃ­tica de
            Devoluciones del Taller.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="RelaciÃ³n con otras polÃ­ticas del taller">
          <P>
            10.1 La presente PolÃ­tica forma parte integral del marco jurÃ­dico
            comercial de Confecciones Liss y debe interpretarse de forma
            complementaria y consistente con las demÃ¡s polÃ­ticas del Taller,
            en particular:
          </P>
          <div className="mb-3 space-y-2 pl-6">
            <P>
              â€” TÃ©rminos y Condiciones de Uso:{" "}
              <Link
                href="/legal/terminos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terminos
              </Link>
            </P>
            <P>
              â€” PolÃ­tica de Privacidad:{" "}
              <Link
                href="/legal/privacidad"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/privacidad
              </Link>
            </P>
            <P>
              â€” PolÃ­tica de Devoluciones:{" "}
              <Link
                href="/legal/devoluciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/devoluciones
              </Link>
            </P>
            <P>
              â€” PolÃ­tica de ConfecciÃ³n:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </P>
            <P>
              â€” PolÃ­tica de EnvÃ­os:{" "}
              <Link
                href="/legal/envios"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/envios
              </Link>
            </P>
            <P>
              â€” PolÃ­tica de Cotizaciones:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/cotizaciones
              </Link>
            </P>
            <P>
              â€” PolÃ­tica de Promociones:{" "}
              <Link
                href="/legal/promociones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/promociones
              </Link>
            </P>
            <P>
              â€” Programa de Referidos:{" "}
              <Link
                href="/legal/referidos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/referidos
              </Link>
            </P>
            <P>
              â€” Derechos del Usuario:{" "}
              <Link
                href="/legal/derechos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derecho
              </Link>
            </P>
            <P>
              â€” Deberes del Usuario:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </P>
          </div>
          <P>
            10.2 En caso de aparente conflicto entre la presente PolÃ­tica y
            cualquier otra polÃ­tica del Taller, prevalecerÃ¡ la interpretaciÃ³n
            mÃ¡s favorable al principio de transparencia comercial y a la
            garantÃ­a de autenticidad de los productos establecida en el
            ArtÃ­culo 4.
          </P>
          <P>
            10.3 La PolÃ­tica de Devoluciones es el instrumento especÃ­fico que
            rige los plazos, condiciones y procedimientos aplicables a cualquier
            reclamaciÃ³n por diferencias entre la imagen del producto y el
            producto fÃ­sico. Toda reclamaciÃ³n de esta naturaleza deberÃ¡
            gestionarse conforme a dicha PolÃ­tica, sin que la presente
            PolÃ­tica amplÃ­e los derechos de devoluciÃ³n o reembolso del
            Usuario mÃ¡s allÃ¡ de lo establecido en ella.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Canales oficiales de consulta y comunicaciÃ³n">
          <P>
            11.1 Toda consulta, solicitud de aclaraciÃ³n o comunicaciÃ³n
            relacionada con el uso de inteligencia artificial en el contenido
            del Taller, con la autenticidad de un producto publicado, o con
            cualquier aspecto regulado por la presente PolÃ­tica, deberÃ¡
            gestionarse exclusivamente a travÃ©s de los canales oficiales de
            Confecciones Liss, disponibles en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <P>
            11.2 El Taller no reconocerÃ¡ reclamaciones, consultas ni
            comunicaciones gestionadas fuera de los canales oficiales. Cualquier
            promesa, aclaraciÃ³n o compromiso comunicado a travÃ©s de canales no
            oficiales, personas no autorizadas o plataformas no verificadas es
            invÃ¡lido e inoponible al Taller.
          </P>
          <P>
            11.3 El Taller atenderÃ¡ las consultas relacionadas con esta
            PolÃ­tica dentro de sus horarios de atenciÃ³n habituales (Lunes a
            SÃ¡bado, 8:00 AM â€“ 5:00 PM) y a travÃ©s del nÃºmero de WhatsApp
            habilitado para comunicaciÃ³n comercial.
          </P>
        </Section>
        <Hr />

        <Section
          n={12}
          title="ResoluciÃ³n de disputas y jurisdicciÃ³n aplicable"
        >
          <P>
            12.1 Toda controversia que surja de la aplicaciÃ³n, interpretaciÃ³n
            o incumplimiento de la presente PolÃ­tica se resolverÃ¡ en primera
            instancia mediante negociaciÃ³n directa de buena fe entre el Usuario
            y el Taller, a travÃ©s de los canales oficiales establecidos en el
            ArtÃ­culo 11.
          </P>
          <P>
            12.2 De no alcanzarse un acuerdo en un plazo razonable, la
            controversia se someterÃ¡ a la jurisdicciÃ³n exclusiva de los
            tribunales competentes de la RepÃºblica de El Salvador, aplicando la
            legislaciÃ³n salvadoreÃ±a vigente. El Usuario renuncia expresamente
            a cualquier otro fuero o jurisdicciÃ³n que pudiera corresponderle.
          </P>
          <P>
            12.3 La legislaciÃ³n de la RepÃºblica de El Salvador es la Ãºnica
            aplicable a la presente PolÃ­tica y a todas las relaciones
            jurÃ­dicas que de ella deriven, con exclusiÃ³n de cualquier
            normativa extranjera, independientemente del lugar de residencia o
            domicilio del Usuario.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Modificaciones a la polÃ­tica">
          <P>
            13.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente PolÃ­tica en cualquier momento,
            publicando la versiÃ³n actualizada en los canales oficiales del
            Taller disponibles en:
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
            13.2 Las modificaciones entrarÃ¡n en vigencia inmediatamente
            despuÃ©s de su publicaciÃ³n. El acceso continuado al contenido del
            Taller con posterioridad a la publicaciÃ³n de cualquier
            modificaciÃ³n constituirÃ¡ aceptaciÃ³n automÃ¡tica e irrevocable de
            la versiÃ³n actualizada de la PolÃ­tica.
          </P>
          <P>
            13.3 El Taller no estÃ¡ obligado a notificar individualmente a cada
            Usuario sobre las modificaciones a la presente PolÃ­tica. Es
            responsabilidad exclusiva del Usuario consultar periÃ³dicamente la
            versiÃ³n vigente.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Divisibilidad">
          <P>
            14.1 Si alguna disposiciÃ³n de la presente PolÃ­tica fuera declarada
            invÃ¡lida, ilegal o inaplicable por un tribunal competente, las
            restantes disposiciones continuarÃ¡n en plena vigencia y efecto, sin
            que la invalidez parcial afecte la validez del conjunto del
            documento.
          </P>
          <P>
            14.2 En caso de que una disposiciÃ³n sea declarada invÃ¡lida, el
            Taller y el Usuario realizarÃ¡n sus mejores esfuerzos para acordar
            una disposiciÃ³n sustituta que, siendo legalmente vÃ¡lida, refleje
            en la mayor medida posible la intenciÃ³n original de la disposiciÃ³n
            invÃ¡lida.
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
          Â· Derechos del Usuario:{" "}
          <Link
            href="/legal/derechos"
            className="text-blue-600 hover:underline"
          >
            /legal/derecho
          </Link>{" "}
          Â· Deberes del Usuario:{" "}
          <Link href="/legal/deberes" className="text-blue-600 hover:underline">
            /legal/deberes
          </Link>
          <br />
          Perfil Modelo IA:{" "}
          <a
            href="https://www.facebook.com/confeccionliss.admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.facebook.com/confeccionliss.admin
          </a>
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
