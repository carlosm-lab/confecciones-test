import { readFileSync } from "fs";

const text = readFileSync("C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\9993d896-6418-4a29-91ba-1095e529df34\\scratch\\flight.txt", "utf8");

// Next.js flight data format has lines like: id:payload
const lines = text.split(/(?=[0-9a-f]+:)/);
console.log("Total parsed flight entries:", lines.length);

const entries = lines.map(line => {
  const colonIdx = line.indexOf(":");
  const id = line.slice(0, colonIdx);
  const body = line.slice(colonIdx + 1);
  return { id, length: body.length, preview: body.slice(0, 120).replace(/\\/g, "") };
}).sort((a,b) => b.length - a.length);

console.log("Top 15 largest entries in flight data:");
entries.slice(0, 15).forEach(e => console.log(`  [${e.id}] ${e.length} bytes: ${e.preview}`));
