async function analyzeHtml() {
  const res = await fetch(`https://www.confeccionesliss.com/?_v=${Date.now()}`);
  const html = await res.text();
  console.log("Total HTML length:", html.length, "bytes");

  // Check SVG in HTML
  const svgs = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  let svgBytes = 0;
  svgs.forEach(s => svgBytes += s.length);
  console.log(`Total inline SVGs: ${svgs.length} (${(svgBytes / 1024).toFixed(1)} KB)`);

  // Check script tags (especially JSON-LD or Next data)
  const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
  let scriptBytes = 0;
  scripts.forEach(s => scriptBytes += s.length);
  console.log(`Total script tags: ${scripts.length} (${(scriptBytes / 1024).toFixed(1)} KB)`);

  // Check next-flight or payload
  const flight = html.match(/self\.__next_f\.push\([\s\S]*?\)/g) || [];
  let flightBytes = 0;
  flight.forEach(f => flightBytes += f.length);
  console.log(`Total __next_f chunks: ${flight.length} (${(flightBytes / 1024).toFixed(1)} KB)`);

  // What is the biggest part?
  console.log("Remainder HTML bytes:", ((html.length - svgBytes - scriptBytes) / 1024).toFixed(1), "KB");
}

analyzeHtml();
