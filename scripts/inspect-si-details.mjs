import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(join(__dirname, "..", ".env"), "utf8");
let apiKey = "";
for (const line of envContent.split("\n")) {
  if (line.startsWith("PAGESPEED_API_KEY=")) {
    apiKey = line.split("=")[1].trim();
  }
}

async function inspectSI() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  const si = audits["speed-index"];
  console.log("SI displayValue:", si?.displayValue);
  console.log("SI numericValue:", si?.numericValue);
  console.log("SI details keys:", Object.keys(si?.details || {}));
  console.log("SI details items:", JSON.stringify(si?.details?.items || [], null, 2));

  // Let's inspect audits['screenshot-thumbnails']
  const thumbs = audits["screenshot-thumbnails"]?.details?.items || [];
  console.log("Thumbnails count:", thumbs.length);
  thumbs.forEach((t, i) => {
    console.log(`Thumb ${i}: timing=${t.timing}ms, dataLen=${t.data?.length}`);
  });
}

inspectSI();
