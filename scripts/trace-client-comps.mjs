import { readFileSync, existsSync } from "fs";
import { join } from "path";

const root = "c:\\Users\\usuar\\Desktop\\confecciones liss";

function getClientComponents(file, visited = new Set()) {
  if (visited.has(file) || !existsSync(file)) return [];
  visited.add(file);
  const content = readFileSync(file, "utf8");
  const isClient = content.includes('"use client"') || content.includes("'use client'");
  const clientList = isClient ? [file] : [];
  
  const importMatches = content.match(/from\s+["'](@\/[^"']+)["']/g) || [];
  for (const m of importMatches) {
    const rawPath = m.match(/["'](@\/[^"']+)["']/)[1];
    let resolved = rawPath.replace("@/", join(root, "src/"));
    if (!resolved.endsWith(".tsx") && !resolved.endsWith(".ts")) {
      if (existsSync(resolved + ".tsx")) resolved += ".tsx";
      else if (existsSync(resolved + ".ts")) resolved += ".ts";
      else if (existsSync(join(resolved, "index.tsx"))) resolved = join(resolved, "index.tsx");
      else if (existsSync(join(resolved, "index.ts"))) resolved = join(resolved, "index.ts");
    }
    clientList.push(...getClientComponents(resolved, visited));
  }
  return clientList;
}

const homeClients = getClientComponents(join(root, "src/app/(public)/page.tsx"));
const layoutClients = getClientComponents(join(root, "src/app/(public)/layout.tsx"));
const rootLayoutClients = getClientComponents(join(root, "src/app/layout.tsx"));

console.log("--- HOME PAGE CLIENT COMPONENTS ---");
console.log([...new Set(homeClients)].map(f => f.replace(root, "")));

console.log("\n--- PUBLIC LAYOUT CLIENT COMPONENTS ---");
console.log([...new Set(layoutClients)].map(f => f.replace(root, "")));

console.log("\n--- ROOT LAYOUT CLIENT COMPONENTS ---");
console.log([...new Set(rootLayoutClients)].map(f => f.replace(root, "")));
