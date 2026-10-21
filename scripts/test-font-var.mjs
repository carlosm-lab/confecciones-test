import { JSDOM } from 'jsdom';
const html = `<html class="font_var" style="--font-sans: Manrope;"><style>:root { --font-sans: var(--font-sans), Arial; } body { font-family: var(--font-sans); }</style><body>Test</body></html>`;
const dom = new JSDOM(html);
const cs = dom.window.getComputedStyle(dom.window.document.body);
console.log('font-family computed:', cs.fontFamily);
