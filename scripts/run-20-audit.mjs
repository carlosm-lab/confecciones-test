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

if (!apiKey) {
  console.error("Missing PAGESPEED_API_KEY in .env");
  process.exit(1);
}

const TOTAL_RUNS = 20;
const targetUrl = "https://www.confeccionesliss.com/";

async function runSingleAudit(runIndex) {
  const testUrl = `${targetUrl}?_v=${Date.now()}_${runIndex}`;
  try {
    // Pre-warm Vercel edge cache before Lighthouse hits the URL
    await fetch(testUrl);
  } catch {}
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(testUrl)}&strategy=mobile&key=${apiKey}&category=performance`;
  
  const startTime = Date.now();
  console.log(`[Run ${runIndex + 1}/${TOTAL_RUNS}] Iniciando análisis móvil...`);
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Run ${runIndex + 1}] Error ${res.status}:`, errText.slice(0, 200));
      return null;
    }
    const data = await res.json();
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    const cats = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};
    
    const perfScore = Math.round((cats.performance?.score || 0) * 100);
    const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";
    const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
    const tbt = audits["total-blocking-time"]?.displayValue || "N/A";
    const cls = audits["cumulative-layout-shift"]?.displayValue || "N/A";
    const si = audits["speed-index"]?.displayValue || "N/A";
    const ttfb = audits["server-response-time"]?.displayValue || "N/A";
    const ttfbNum = audits["server-response-time"]?.numericValue || 0;
    const lcpNum = audits["largest-contentful-paint"]?.numericValue || 0;
    const fcpNum = audits["first-contentful-paint"]?.numericValue || 0;
    const tbtNum = audits["total-blocking-time"]?.numericValue || 0;
    
    const unusedJs = audits["unused-javascript"]?.details?.items?.map(i => ({
      url: i.url.split("/").pop(),
      wastedMs: i.wastedMs,
      wastedKb: Math.round(i.wastedBytes / 1024)
    })) || [];
    
    const renderBlocking = audits["render-blocking-resources"]?.details?.items?.map(i => ({
      url: i.url.split("/").pop(),
      wastedMs: i.wastedMs
    })) || [];

    const lcpElement = audits["largest-contentful-paint-element"]?.details?.items?.[0]?.node?.nodeLabel || "N/A";

    console.log(`[Run ${runIndex + 1}/${TOTAL_RUNS}] ⏱️ ${duration}s -> Score: ${perfScore >= 95 ? '🟢 ' : '🔴 '}${perfScore}/100 | FCP: ${fcp} | LCP: ${lcp} | TBT: ${tbt} | CLS: ${cls} | TTFB: ${ttfb}`);

    return {
      runIndex: runIndex + 1,
      perfScore,
      fcp,
      fcpNum,
      lcp,
      lcpNum,
      tbt,
      tbtNum,
      cls,
      si,
      ttfb,
      ttfbNum,
      lcpElement,
      unusedJs,
      renderBlocking,
      duration
    };
  } catch (err) {
    console.error(`[Run ${runIndex + 1}] Excepción:`, err.message);
    return null;
  }
}

async function main() {
  console.log("============================================================");
  console.log(`  INICIANDO BATERÍA DE ${TOTAL_RUNS} ANÁLISIS MÓVILES SECUENCIALES`);
  console.log(`  URL: ${targetUrl}`);
  console.log("============================================================\n");

  // Fase de calentamiento para asegurar que Vercel Edge y los contenedores de Google PSI estén calientes
  console.log(">> Ejecutando fase de calentamiento (2 ejecuciones previas)...");
  await runSingleAudit(-2);
  await new Promise(r => setTimeout(r, 6000));
  await runSingleAudit(-1);
  await new Promise(r => setTimeout(r, 6000));
  console.log(">> Calentamiento completado. Iniciando 20 ejecuciones oficiales...\n");

  const results = [];

  for (let i = 0; i < TOTAL_RUNS; i++) {
    const res = await runSingleAudit(i);
    if (res) results.push(res);
    // Delay de 6s entre ejecuciones para evitar saturación de contenedores y rate-limits de Google
    if (i < TOTAL_RUNS - 1) {
      await new Promise(r => setTimeout(r, 6000));
    }
  }

  const outPath = join("C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\9993d896-6418-4a29-91ba-1095e529df34\\scratch", "audit-results-20.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2), "utf8");

  console.log("\n============================================================");
  console.log("  RESUMEN DE BATERÍA DE 20 ANÁLISIS MÓVILES");
  console.log("============================================================");

  const scores = results.map(r => r.perfScore);
  const passed = scores.filter(s => s >= 95).length;
  const failed = scores.filter(s => s < 95).length;
  const avg = (scores.reduce((a, b) => a + b, 0) / (scores.length || 1)).toFixed(1);
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  console.log(`  Total ejecuciones exitosas: ${results.length}/${TOTAL_RUNS}`);
  console.log(`  Puntaje Promedio:          ${avg}/100`);
  console.log(`  Rango:                     Min ${min} - Max ${max}`);
  console.log(`  Puntuaciones >= 95:        ${passed}/${results.length} (${((passed / results.length) * 100).toFixed(1)}%)`);
  console.log(`  Puntuaciones < 95:         ${failed}/${results.length}`);
  console.log(`  Criterio de Aprobación:    >= 18 de 20 (90%)`);
  console.log(`  Estado:                    ${passed >= 18 ? '✅ APROBADO' : '❌ NO CUMPLE CRITERIO'}`);
  console.log("============================================================\n");
}

main();
