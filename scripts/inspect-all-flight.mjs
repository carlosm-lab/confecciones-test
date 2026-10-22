import { writeFileSync } from "fs";

async function inspect() {
  const r = await fetch("https://www.confeccionesliss.com/?_ts=" + Date.now());
  const t = await r.text();
  const matches = [...t.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)].map((m) => m[1]);
  console.log("Total flight chunks:", matches.length);
  const combined = matches.join("");
  console.log("Total flight text length:", combined.length);
  
  // Find what takes up the most characters in combined
  // Let's write combined to scratch/flight.txt to inspect
  writeFileSync("C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\9993d896-6418-4a29-91ba-1095e529df34\\scratch\\flight.txt", combined, "utf8");
  console.log("Saved scratch/flight.txt");
}

inspect();
