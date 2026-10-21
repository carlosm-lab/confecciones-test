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
  const html = await res.text();
  const fontPreloads = html.match(/<link[^>]+as="font"[^>]*>/g) || [];
  console.log("Live font preloads found:", fontPreloads.length);
  fontPreloads.forEach(f => console.log("  Live:", f));

  // Check Noto_Serif font in CSS or HTML
  const notoMatches = html.match(/[a-zA-Z0-9_\-\.]*noto[a-zA-Z0-9_\-\.]*\.woff2/gi) || [];
  console.log("Noto woff2 mentions in live HTML:", notoMatches);
}

check();
