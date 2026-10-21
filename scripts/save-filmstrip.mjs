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

async function saveFilmstrip() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  const filmstrip = audits["screenshot-thumbnails"]?.details?.items || [];
  console.log(`Saving ${filmstrip.length} frames...`);
  
  filmstrip.forEach((f, idx) => {
    const base64Data = f.data.replace(/^data:image\/jpeg;base64,/, "");
    const filename = `frame_${idx}_${f.timing}ms.jpg`;
    const filepath = join("C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\9993d896-6418-4a29-91ba-1095e529df34", filename);
    writeFileSync(filepath, Buffer.from(base64Data, "base64"));
    console.log(`Saved frame ${idx} at ${f.timing}ms: ${filename}`);
  });
}

saveFilmstrip();
