async function test() {
  const r = await fetch('https://www.confeccionesliss.com/?_v=' + Date.now());
  const html = await r.text();
  const svgs = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  console.log('Total SVGs found:', svgs.length);
  const byClass = {};
  for (const s of svgs) {
    const classMatch = s.match(/class="([^"]+)"/);
    const key = classMatch ? classMatch[1] : (s.match(/<svg[^>]*>/) || ['svg'])[0];
    byClass[key] = (byClass[key] || 0) + 1;
  }
  const sorted = Object.entries(byClass).sort((a,b) => b[1] - a[1]);
  console.log('Top SVG patterns:');
  sorted.slice(0, 20).forEach(([k, v]) => console.log(`  ${v}x: ${k.slice(0, 60)}`));
}
test();
