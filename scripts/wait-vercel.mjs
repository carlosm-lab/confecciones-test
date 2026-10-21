async function poll() {
  console.log("Polling GitHub deployments for 07f700e...");
  const targetSha = "07f700e";
  for (let i = 1; i <= 60; i++) {
    try {
      const res = await fetch("https://api.github.com/repos/carlosm-lab/confeccionesliss/deployments");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[0];
        console.log(`[${i}/60] Latest deployment SHA: ${latest.sha.slice(0, 7)} (Target: ${targetSha})`);
        if (latest.sha.startsWith(targetSha)) {
          console.log("SUCCESS! 07f700e is deployed!");
          return;
        }
      }
    } catch (e) {
      console.error("Error polling:", e.message);
    }
    await new Promise((r) => setTimeout(r, 10000));
  }
  console.log("Timed out waiting for 07f700e deployment.");
}

poll();
