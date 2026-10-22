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
  for (let attempt = 1; attempt <= 10; attempt++) {
    const testUrl = `https://www.confeccionesliss.com/?_v=${Date.now()}_${attempt}`;
    console.log(`[Attempt ${attempt}] Running audit...`);
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=mobile&key=${apiKey}&category=performance`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const audits = data.lighthouseResult?.audits || {};
    const perfScore = Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100);
    const fcp = audits["first-contentful-paint"]?.displayValue;
    const lcp = audits["largest-contentful-paint"]?.displayValue;
    const si = audits["speed-index"]?.displayValue;
    const siNum = audits["speed-index"]?.numericValue;
    const tbt = audits["total-blocking-time"]?.displayValue;
    console.log(`Score: ${perfScore} | FCP: ${fcp} | LCP: ${lcp} | SI: ${si} | TBT: ${tbt}`);
    
    if (siNum > 3000 || perfScore < 95) {
      console.log(`>>> CAUGHT SLOW RUN (Score: ${perfScore}, SI: ${si})! Saving diagnostics...`);
      const thumbs = audits["screenshot-thumbnails"]?.details?.items || [];
      const net = audits["network-requests"]?.details?.items || [];
      const diag = {
        perfScore,
        fcp,
        lcp,
        si,
        tbt,
        lcpDetails: audits["largest-contentful-paint-element"]?.details?.items,
        networkRequests: net.map(r => ({
          url: r.url,
          mimeType: r.mimeType,
          transferSize: r.transferSize,
          resourceType: r.resourceType,
          statusCode: r.statusCode
        })),
        thumbnails: thumbs.map(t => ({ timing: t.timing }))
      };
      // Save thumbs
      thumbs.forEach((t, idx) => {
        if (t.data) {
          const base64 = t.data.replace(/^data:image\/jpeg;base64,/, "");
          writeFileSync(`C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\9993d896-6418-4a29-91ba-1095e529df34\\.tempmediaStorage\\slow_si_${idx}_${t.timing}ms.jpg`, Buffer.from(base64, "base64"));
        }
      });
      writeFileSync("C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\9993d896-6418-4a29-91ba-1095e529df34\\scratch\\slow_run_diag.json", JSON.stringify(diag, null, 2), "utf8");
      break;
    }
    await new Promise(r => setTimeout(r, 5000));
  }
}

run();
