import { readFileSync } from "fs";

async function check() {
  try {
    const localHtml = readFileSync(".next/server/app/(public)/index.html", "utf8");
    const localFonts = localHtml.match(/<link[^>]+as="font"[^>]*>/g) || [];
    console.log("Local font preloads:", localFonts.length);
    localFonts.forEach(f => console.log("  Local:", f));
  } catch (e) {
    console.log("Could not read local:", e.message);
  }

  const res = await fetch(`https://www.confeccionesliss.com/?_v=${Date.now()}`);
  const linkHeader = res.headers.get('link');
  console.log("HTTP Link header on /:", linkHeader || "(none ✅)");
  const html = await res.text();
  const hasLogo41 = html.includes("logo-41.webp");
  console.log("Is logo-41.webp live?", hasLogo41 ? "YES ✅" : "NO ❌ (Deployment still pending)");
  const fontPreloads = html.match(/<link[^>]+as="font"[^>]*>/g) || [];
  console.log("Live font preloads found:", fontPreloads.length);
  fontPreloads.forEach(f => console.log("  Live:", f));
  console.log("decoding=\"async\" live?", html.includes('decoding="async"'));
  const heroPreload = html.includes('rel="preload"') && html.includes('hero-home-440.webp');
  console.log("hero-home-440.webp preload live?", heroPreload ? "YES ✅" : "NO ❌");
  console.log("Date header:", res.headers.get("date"));
}

check();
