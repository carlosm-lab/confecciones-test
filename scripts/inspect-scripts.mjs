async function main() {
  const html = await (await fetch('https://www.confeccionesliss.com/')).text();
  const scriptRegex = /<script[^>]+src="([^"]+)"/g;
  const scripts = [];
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  console.log(`Found ${scripts.length} script tags.`);
  for (const s of scripts) {
    try {
      const res = await fetch('https://www.confeccionesliss.com' + s);
      const text = await res.text();
      const name = s.split('/').pop();
      const sizeKb = (text.length / 1024).toFixed(1);
      const keywords = ['react', 'next', 'navbar', 'catalog', 'card', 'toast', 'supabase', 'cart', 'favorite', 'analytics', 'cookie', 'search', 'scroll'];
      const matched = keywords.filter(k => text.toLowerCase().includes(k));
      console.log(name.padEnd(30), `${sizeKb.padStart(6)} KB`, 'keywords:', matched.join(', '));
    } catch (e) {
      console.error(s, e.message);
    }
  }
}

main();
