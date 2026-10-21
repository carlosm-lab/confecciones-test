async function waitDeploy() {
  console.log("Waiting 30 seconds for Vercel build & deployment...");
  await new Promise((res) => setTimeout(res, 30000));

  for (let i = 0; i < 20; i++) {
    try {
      const r = await fetch(`https://www.confeccionesliss.com/?_ts=${Date.now()}`);
      const t = await r.text();
      const hasNewHero = t.toLowerCase().includes("imagesrcset");
      console.log(`[Poll ${i + 1}/20] New deployment (imageSrcSet preload) live: ${hasNewHero}`);
      if (hasNewHero) {
        console.log("DEPLOY IS LIVE ON VERCEL EDGE CDN!");
        return true;
      }
    } catch (e) {
      console.log("Fetch error:", e.message);
    }
    await new Promise((res) => setTimeout(res, 5000));
  }
  return false;
}

waitDeploy();
