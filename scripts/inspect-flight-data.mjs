async function inspectFlight() {
  const r = await fetch('https://www.confeccionesliss.com/?_v=' + Date.now());
  const html = await r.text();
  const flight = [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)].map(m => m[1]);
  console.log('Total flight segments:', flight.length);
  
  // Sort segments by length
  const segments = flight.map((f, i) => ({ index: i, length: f.length, preview: f.slice(0, 100).replace(/\\/g, '') })).sort((a,b) => b.length - a.length);
  console.log('Top 10 largest flight segments:');
  segments.slice(0, 10).forEach(s => console.log(`  Segment ${s.index}: ${s.length} bytes | ${s.preview}`));
}
inspectFlight();
