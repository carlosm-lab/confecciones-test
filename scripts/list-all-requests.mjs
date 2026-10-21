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

async function listAllRequests() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  const network = audits["network-requests"]?.details?.items || [];
  
  console.log(`Total network requests: ${network.length}`);
  let totalKb = 0;
  network.forEach(r => {
    const kb = (r.transferSize || 0) / 1024;
    totalKb += kb;
    console.log(`  ${r.resourceType.padEnd(12)} | ${r.priority.padEnd(8)} | ${kb.toFixed(1).padStart(5)} KB | ${r.url.split('/').pop().slice(0, 50)}`);
  });
  console.log(`\nTotal transfer size: ${totalKb.toFixed(1)} KB`);
}

listAllRequests();
