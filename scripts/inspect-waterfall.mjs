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

async function inspectWaterfall() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  const fcp = audits["first-contentful-paint"]?.numericValue;
  const lcp = audits["largest-contentful-paint"]?.numericValue;
  const score = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);
  
  console.log(`Score: ${score} | FCP: ${fcp?.toFixed(0)}ms | LCP: ${lcp?.toFixed(0)}ms`);
  
  // Inspect critical requests
  const network = audits["network-requests"]?.details?.items || [];
  console.log("=== NETWORK REQUESTS BEFORE 3000ms ===");
  network
    .filter(r => (r.startTime || 0) < 3)
    .sort((a, b) => (a.startTime || 0) - (b.startTime || 0))
    .forEach(r => {
      const s = ((r.startTime || 0) * 1000).toFixed(0);
      const e = ((r.endTime || 0) * 1000).toFixed(0);
      const d = (e - s).toFixed(0);
      console.log(`${s}ms - ${e}ms | ${d}ms dur | ${r.priority} | ${r.resourceType} | ${(r.transferSize/1024).toFixed(1)}KB | ${r.url.split('/').pop().slice(0, 45)}`);
    });

  // Check diagnostics
  console.log("\n=== MAIN THREAD WORK ===");
  console.log(audits["mainthread-work-breakdown"]?.displayValue);
  const mainThreadItems = audits["mainthread-work-breakdown"]?.details?.items || [];
  mainThreadItems.slice(0, 5).forEach(i => console.log(`  ${i.groupLabel}: ${i.duration.toFixed(0)}ms`));

  console.log("\n=== BOOTUP TIME ===");
  const bootup = audits["bootup-time"]?.details?.items || [];
  bootup.slice(0, 5).forEach(b => console.log(`  ${b.url.split('/').pop()}: total ${b.total.toFixed(0)}ms, scripting ${b.scripting.toFixed(0)}ms`));
}

inspectWaterfall();
