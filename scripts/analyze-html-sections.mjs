async function analyzeDom() {
  const r = await fetch(`https://www.confeccionesliss.com/?_ts=${Date.now()}`);
  const t = await r.text();
  console.log("Total HTML length:", t.length);
  const sections = t.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || [];
  console.log("Number of sections:", sections.length);
  sections.forEach((s, idx) => {
    const idMatch = s.match(/id="([^"]+)"/);
    const classMatch = s.match(/class="([^"]+)"/);
    const label = idMatch ? idMatch[1] : (classMatch ? classMatch[1].slice(0, 40) : "no-id");
    console.log(`Section ${idx} [${label}]: ${s.length} chars`);
  });
}

analyzeDom();
