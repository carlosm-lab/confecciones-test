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

async function inspectLcpTrace() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  console.log("LCP displayValue:", audits["largest-contentful-paint"]?.displayValue);
  console.log("LCP numericValue:", audits["largest-contentful-paint"]?.numericValue);
  console.log("LCP details:", JSON.stringify(audits["largest-contentful-paint"]?.details, null, 2));
  console.log("FCP numericValue:", audits["first-contentful-paint"]?.numericValue);
  console.log("Speed Index numericValue:", audits["speed-index"]?.numericValue);
}

inspectLcpTrace();
