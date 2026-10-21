import { writeFileSync } from "fs";

async function inspectHead() {
  const res = await fetch(`https://www.confeccionesliss.com/?_v=${Date.now()}`);
  const html = await res.text();
  
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) {
    console.log("No head tag found!");
    return;
  }
  
  const headContent = headMatch[1];
  console.log("Head size:", headContent.length, "bytes");
  
  // Extract all <link>
  const links = headContent.match(/<link[^>]+>/g) || [];
  console.log("\n=== ALL LINK TAGS IN HEAD ===");
  links.forEach(l => console.log(" ", l));

  // Extract all <style>
  const styles = headContent.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
  console.log("\n=== STYLE TAGS COUNT:", styles.length);
  styles.forEach((s, idx) => console.log(`  Style ${idx} length: ${s.length} bytes`));

  // Check CSS file sizes
  const cssUrls = links
    .filter(l => l.includes('rel="stylesheet"'))
    .map(l => {
      const m = l.match(/href="([^"]+)"/);
      return m ? m[1] : null;
    })
    .filter(Boolean);

  console.log("\n=== CSS FILES ===");
  for (const u of cssUrls) {
    const fullUrl = u.startsWith("http") ? u : `https://www.confeccionesliss.com${u}`;
    const r = await fetch(fullUrl);
    const text = await r.text();
    console.log(`  ${u} -> ${r.status} | ${(text.length / 1024).toFixed(1)} KB uncompressed`);
  }
}

inspectHead();
