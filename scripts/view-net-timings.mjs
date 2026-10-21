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

async function run() {
  const testUrl = `https://www.confeccionesliss.com/?_v=${Date.now()}`;
  console.log(`Running detailed network audit on ${testUrl}...`);
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  const perfScore = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);
  const fcp = audits["first-contentful-paint"]?.displayValue;
  const lcp = audits["largest-contentful-paint"]?.displayValue;
  const si = audits["speed-index"]?.displayValue;
  const tbt = audits["total-blocking-time"]?.displayValue;
  console.log(`Score: ${perfScore} | FCP: ${fcp} | LCP: ${lcp} | SI: ${si} | TBT: ${tbt}`);
  
  const net = audits["network-requests"]?.details?.items || [];
  const table = net.map(r => ({
    name: r.url.split("/").pop().slice(0, 32),
    type: r.resourceType,
    reqStart: Math.round(r.networkRequestTime),
    end: Math.round(r.networkEndTime),
    dur: Math.round(r.networkEndTime - r.networkRequestTime),
    size: r.transferSize,
    priority: r.priority
  }));
  console.table(table);
}

run();
