import { readFileSync } from 'fs';

const content = readFileSync('.next/static/chunks/2xz_e36l79mfx.js', 'utf8');
const matches = new Set();
const regex = /node_modules\/([^\/\"]+)/g;
let m;
while ((m = regex.exec(content)) !== null) {
  matches.add(m[1]);
}
console.log('Packages in 2xz_e36l79mfx.js:');
console.log(Array.from(matches));

const fileMatches = new Set();
const fileRegex = /\[project\]\/([^\"]+)/g;
while ((m = fileRegex.exec(content)) !== null) {
  fileMatches.add(m[1]);
}
console.log('Project files in 2xz_e36l79mfx.js:');
console.log(Array.from(fileMatches).slice(0, 30));
