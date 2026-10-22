import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logosDir = path.join(__dirname, "../public/logos");

const files = [
  { in: "univo.png", out: "univo.webp" },
  { in: "unab.png", out: "unab.webp" },
  { in: "ugb-2.png", out: "ugb-2.webp" },
  { in: "uma.png", out: "uma.webp" },
  { in: "ieproes.png", out: "ieproes.webp" },
  { in: "ues.png", out: "ues.webp" },
  { in: "uees.avif", out: "uees.webp" },
];

for (const f of files) {
  const inPath = path.join(logosDir, f.in);
  const outPath = path.join(logosDir, f.out);
  await sharp(inPath)
    .resize(112, 112, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(outPath);
  const stat = statSync(outPath);
  console.log(`Converted ${f.in} -> ${f.out} (${stat.size} bytes)`);
}
