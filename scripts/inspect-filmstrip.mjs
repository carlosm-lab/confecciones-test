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

async function inspectFilmstrip() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.confeccionesliss.com%2F%3F_v%3D${Date.now()}&strategy=mobile&key=${apiKey}&category=performance`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const audits = data.lighthouseResult?.audits || {};
  
  console.log("FCP:", audits["first-contentful-paint"]?.displayValue);
  console.log("LCP:", audits["largest-contentful-paint"]?.displayValue);
  
  const filmstrip = audits["screenshot-thumbnails"]?.details?.items || [];
  console.log("Filmstrip frames count:", filmstrip.length);
  filmstrip.forEach(f => {
    console.log(`  Frame at ${f.timing}ms (${(f.timing/1000).toFixed(2)}s)`);
  });

  // Check long tasks
  const longTasks = audits["long-tasks"]?.details?.items || [];
  console.log("Long tasks count:", longTasks.length);
  longTasks.forEach(t => {
    console.log(`  Long task: ${t.startTime.toFixed(0)}ms - ${(t.startTime + t.duration).toFixed(0)}ms (${t.duration.toFixed(0)}ms) | url: ${t.url?.split('/').pop()}`);
  });
}

inspectFilmstrip();
