import { readFileSync, writeFileSync } from 'fs';

const envContent = readFileSync('.env', 'utf8');
const apiKey = envContent.match(/PAGESPEED_API_KEY=(.+)/)[1].trim();

const url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://www.confeccionesliss.com/?_t=' + Date.now()) + '&strategy=mobile&key=' + apiKey + '&category=performance';

console.log('Fetching detailed Lighthouse mobile run...');
const res = await fetch(url);
const data = await res.json();
const audits = data.lighthouseResult.audits;

console.log('Perf Score:', Math.round(data.lighthouseResult.categories.performance.score * 100));
console.log('FCP:', audits['first-contentful-paint']?.displayValue);
console.log('LCP:', audits['largest-contentful-paint']?.displayValue);
console.log('TBT:', audits['total-blocking-time']?.displayValue);
console.log('Speed Index:', audits['speed-index']?.displayValue);

console.log('\n--- LCP Element ---');
console.log(JSON.stringify(audits['largest-contentful-paint-element']?.details?.items, null, 2));

console.log('\n--- Prioritize LCP Image ---');
console.log(JSON.stringify(audits['prioritize-lcp-image']?.details?.items, null, 2));

console.log('\n--- Network Requests ---');
const items = audits['network-requests']?.details?.items || [];
for (const i of items) {
  const name = i.url.split('/').pop().slice(0, 40);
  console.log(`${name.padEnd(42)} | ${i.mimeType.padEnd(20)} | ${String(Math.round(i.transferSize/1024)).padStart(4)} KB | start: ${String(Math.round(i.rendererStartTime)).padStart(5)} ms | end: ${String(Math.round(i.networkEndTime)).padStart(5)} ms | priority: ${i.priority}`);
}

writeFileSync('scripts/last-lcp-details.json', JSON.stringify({
  lcpElement: audits['largest-contentful-paint-element'],
  lcpBreakdown: audits['lcp-breakdown'] || audits['prioritize-lcp-image'],
  networkRequests: audits['network-requests']
}, null, 2));
