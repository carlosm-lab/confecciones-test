const http = require("http");

const ROUTES = [
  "/",
  "/catalogo",
  "/catalogo/scrubs",
  "/catalogo/scrubs/scrub-san-miguel",
  "/contacto",
  "/servicios",
  "/updates",
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, html: data }));
      })
      .on("error", reject);
  });
}

async function fetchHeaders(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        resolve({ status: res.statusCode, headers: res.headers });
      })
      .on("error", reject);
  });
}

async function runTests() {
  console.log("=== INICIANDO AUDITORÍA LOCAL DE IMÁGENES OPEN GRAPH ===\n");
  let failures = 0;

  for (const route of ROUTES) {
    const pageUrl = `http://localhost:3000${route}`;
    console.log(`Auditando ruta: ${route}`);
    try {
      const pageResult = await fetchPage(pageUrl);
      if (pageResult.status !== 200) {
        console.log(
          `❌ Error: La página ${route} respondió con código ${pageResult.status}`
        );
        failures++;
        continue;
      }

      // Regex to find: <meta property="og:image" content="???" />
      const ogImageMatch =
        pageResult.html.match(
          /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
        ) ||
        pageResult.html.match(
          /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i
        );

      if (!ogImageMatch) {
        console.log(
          `❌ Error: No se encontró la etiqueta <meta property="og:image"> en la página.`
        );
        failures++;
        continue;
      }

      const ogImageUrl = ogImageMatch[1];
      console.log(`  - URL de og:image encontrada: ${ogImageUrl}`);

      if (
        !ogImageUrl.startsWith("http://") &&
        !ogImageUrl.startsWith("https://")
      ) {
        console.log(`  ❌ Error: La URL de og:image no es absoluta.`);
        failures++;
        continue;
      }

      // Fetch the OG Image headers to verify
      const imageResult = await fetchHeaders(ogImageUrl);
      const contentType = imageResult.headers["content-type"];
      console.log(
        `  - Respuesta de imagen: Status ${imageResult.status}, Content-Type: ${contentType}`
      );

      if (imageResult.status === 200 && contentType.includes("image/png")) {
        console.log(`  ✅ ÉXITO: Imagen OG válida.`);
      } else {
        console.log(
          `  ❌ FALLO: Estado ${imageResult.status} o Content-Type incorrecto.`
        );
        failures++;
      }
    } catch (err) {
      console.log(`❌ Error procesando la ruta ${route}:`, err.message);
      failures++;
    }
    console.log("");
  }

  console.log("=== RESUMEN DE AUDITORÍA ===");
  if (failures === 0) {
    console.log(
      "🎉 TODAS LAS RUTAS GENERARON IMÁGENES OPEN GRAPH CORRECTAMENTE (200 OK - image/png)"
    );
    process.exit(0);
  } else {
    console.log(
      `⚠️ Se encontraron ${failures} errores en el sistema Open Graph.`
    );
    process.exit(1);
  }
}

runTests();
