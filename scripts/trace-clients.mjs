import { readFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';

function resolveModule(fromFile, imp) {
  let target = imp;
  if (target.startsWith('@/')) {
    target = join(process.cwd(), 'src', target.slice(2));
  } else if (target.startsWith('.')) {
    target = resolve(dirname(fromFile), target);
  } else {
    return null;
  }

  for (const ext of ['', '.tsx', '.ts', '/index.tsx', '/index.ts']) {
    const candidate = target + ext;
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

const visited = new Set();
const clients = new Set();

function trace(file) {
  if (visited.has(file)) return;
  visited.add(file);
  try {
    const code = readFileSync(file, 'utf8');
    if (code.includes('"use client"') || code.includes("'use client'")) {
      clients.add(file.replace(process.cwd(), ''));
    }
    const lines = code.split('\n');
    for (const line of lines) {
      const match = line.match(/from\s+["']([^"']+)["']/);
      if (match) {
        const mod = resolveModule(file, match[1]);
        if (mod) trace(mod);
      }
    }
  } catch {}
}

trace(join(process.cwd(), 'src/app/(public)/page.tsx'));
trace(join(process.cwd(), 'src/app/(public)/layout.tsx'));
trace(join(process.cwd(), 'src/app/layout.tsx'));

console.log('Homepage Client Components (' + clients.size + '):');
for (const c of clients) {
  console.log('  ', c);
}
