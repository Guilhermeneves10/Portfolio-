import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const configuredPreview = process.argv.includes('--configured-preview');
await mkdir('reports', { recursive: true });
const chrome = await chromeLauncher.launch({ chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless', '--disable-gpu', '--no-first-run'], logLevel: 'error' });
try {
  if (configuredPreview) execFileSync(process.execPath, ['tools/build.mjs'], { env: { ...process.env, PORTFOLIO_SITE_URL: 'http://127.0.0.1:3000' }, stdio: 'inherit' });
  for (const [name, path] of [['pt', '/'], ['en', '/en/']]) {
    const reportName = configuredPreview ? `configured-${name}` : name;
    const result = await lighthouse(`http://127.0.0.1:3000${path}`, { port: chrome.port, output: ['html', 'json'], logLevel: 'error', onlyCategories: configuredPreview ? ['seo'] : ['performance', 'accessibility', 'best-practices', 'seo'] });
    await writeFile(`reports/lighthouse-${reportName}.html`, result.report[0]);
    await writeFile(`reports/lighthouse-${reportName}.json`, result.report[1]);
    const summary = { language: name, scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])), metrics: Object.fromEntries(['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time'].map(key => [key, result.lhr.audits[key]?.displayValue || 'not measured'])), failures: Object.values(result.lhr.audits).filter(a => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative').map(a => ({ id: a.id, title: a.title, description: a.description, details: a.details })) };
    await writeFile(`reports/lighthouse-${reportName}-summary.json`, JSON.stringify(summary, null, 2));
    console.log(JSON.stringify({ language: summary.language, scores: summary.scores, metrics: summary.metrics, failures: summary.failures.map(f => f.id) }, null, 2));
  }
} finally {
  if (configuredPreview) execFileSync(process.execPath, ['tools/build.mjs'], { env: { ...process.env, PORTFOLIO_SITE_URL: '' }, stdio: 'inherit' });
  try { await chrome.kill(); } catch (error) {
    // Windows can briefly lock the temporary profile after Chrome exits.
    if (error.code !== 'EPERM') throw error;
    console.warn('Chrome ended; Windows retained its temporary Lighthouse profile. Reports were saved.');
  }
}
