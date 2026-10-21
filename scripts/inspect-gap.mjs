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

async function inspectGap() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  const fcp = audits["first-contentful-paint"]?.numericValue;
  const lcp = audits["largest-contentful-paint"]?.numericValue;
  const score = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);
  
  console.log(`Score: ${score} | FCP: ${fcp?.toFixed(0)}ms | LCP: ${lcp?.toFixed(0)}ms | Gap: ${(lcp - fcp)?.toFixed(0)}ms`);
  
  // Inspect long-tasks
  const longTasks = audits["long-tasks"]?.details?.items || [];
  console.log("\n=== ALL LONG TASKS ===");
  longTasks.forEach(t => {
    console.log(`  Task: ${t.startTime.toFixed(0)}ms - ${(t.startTime + t.duration).toFixed(0)}ms (${t.duration.toFixed(0)}ms) | url: ${t.url?.split('/').pop()}`);
  });
  
  // Inspect all network requests
  const net = audits["network-requests"]?.details?.items || [];
  console.log(`\n=== FULL NETWORK WATERFALL ===`);
  net.sort((a,b) => a.networkRequestTime - b.networkRequestTime).forEach(r => {
    console.log(`  ${r.resourceType.padEnd(10)}: ${r.url.split('/').pop().slice(0, 35).padEnd(35)} | req: ${r.networkRequestTime?.toFixed(0).padStart(4)}ms -> end: ${r.networkEndTime?.toFixed(0).padStart(4)}ms (dur: ${(r.networkEndTime - r.networkRequestTime)?.toFixed(0).padStart(4)}ms) | prio: ${r.priority.padEnd(8)} | size: ${r.transferSize}`);
  });
}

inspectGap();
