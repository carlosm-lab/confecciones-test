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

async function checkLcp() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  console.log("=== LCP AUDIT ===");
  console.log("displayValue:", audits["largest-contentful-paint"]?.displayValue);
  console.log("numericValue:", audits["largest-contentful-paint"]?.numericValue);
  
  const lcpElem = audits["largest-contentful-paint-element"];
  console.log("=== LCP ELEMENT AUDIT ===");
  console.log("title:", lcpElem?.title);
  console.log("description:", lcpElem?.description);
  console.log("score:", lcpElem?.score);
  console.log("displayValue:", lcpElem?.displayValue);
  console.log("details type:", lcpElem?.details?.type);
  console.log("details items:", JSON.stringify(lcpElem?.details?.items, null, 2));
}

checkLcp();
