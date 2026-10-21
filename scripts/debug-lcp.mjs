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

async function debugLcp() {
  const testUrl = `https://www.confeccionesliss.com/?_v=${Date.now()}`;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=mobile&key=${apiKey}&category=performance`;
  
  console.log("Analyzing LCP breakdown on mobile...");
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  console.log("Score:", Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100));
  console.log("FCP:", audits["first-contentful-paint"]?.displayValue, audits["first-contentful-paint"]?.numericValue);
  console.log("LCP:", audits["largest-contentful-paint"]?.displayValue, audits["largest-contentful-paint"]?.numericValue);
  const lcpElemAudit = audits["largest-contentful-paint-element"];
  console.log("LCP Element audit details:", JSON.stringify(lcpElemAudit?.details, null, 2));

  // Network requests
  const network = audits["network-requests"]?.details?.items || [];
  console.log("Early network requests:");
  network.forEach(r => {
    const start = typeof r.startTime === 'number' ? r.startTime.toFixed(0) : (r.rendererStartTime ? r.rendererStartTime.toFixed(0) : '?');
    const end = typeof r.endTime === 'number' ? r.endTime.toFixed(0) : '?';
    const size = typeof r.transferSize === 'number' ? (r.transferSize/1024).toFixed(1) : '?';
    console.log(`  ${r.resourceType || 'other'} | ${r.priority} | start: ${start}ms | end: ${end}ms | size: ${size}KB | ${r.url.split('/').pop().slice(0, 50)}`);
  });
}

debugLcp();
