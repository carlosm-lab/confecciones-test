import { readFileSync } from "fs";
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

async function listAuditKeys() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  const paintKeys = Object.keys(audits).filter(k => k.includes("paint") || k.includes("lcp") || k.includes("largest") || k.includes("contentful"));
  console.log("Matching audit keys:", paintKeys);
  paintKeys.forEach(k => {
    console.log(`\nAudit: ${k}`);
    console.log("  title:", audits[k].title);
    console.log("  displayValue:", audits[k].displayValue);
    if (audits[k].details) {
      console.log("  details type:", audits[k].details.type);
      console.log("  details items count:", audits[k].details.items?.length);
      if (audits[k].details.items?.[0]) {
        console.log("  first item:", JSON.stringify(audits[k].details.items[0], null, 2).slice(0, 300));
      }
    }
  });
}

listAuditKeys();
