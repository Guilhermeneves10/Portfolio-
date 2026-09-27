import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';
import { HtmlValidate } from 'html-validate';
import { parse } from 'css-tree';
const root = resolve(import.meta.dirname, '..');
const validator = new HtmlValidate({ extends: ['html-validate:recommended'], rules: { 'no-inline-style': 'off', 'void-style': ['error', { style: 'omit' }], 'long-title': 'off' } });
const preserved = ['https://github.com/Guilhermeneves10', 'https://www.linkedin.com/in/guilherme-neves-067065380/', ...['Lista-de-tarefas', 'pagina-de-filmes-com-API', 'Site-de-pet-shop', 'Netflixcopy'].map(p => 'https://github.com/Guilhermeneves10/' + p)];
for (const path of ['index.html', 'en/index.html']) {
  const file = resolve(root, path);
  const html = await readFile(file, 'utf8');
  const report = await validator.validateString(html, file);
  if (!report.valid) console.error(JSON.stringify(report.results.map(r => r.messages), null, 2));
  assert(report.valid, `${path}: HTML validation`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const link of preserved) assert(html.includes(`href="${link}"`), `Missing preserved link: ${link}`);
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    let local = resolve(dirname(file), url);
    if (url.endsWith('/')) local = resolve(local, 'index.html');
    await access(local);
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate ID');
  for (const [, target] of html.matchAll(/href="#([^\"]+)"/g)) assert(ids.includes(target), `Missing anchor ${target}`);
  const script = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.equal(JSON.parse(script[1])['@type'], 'Person');
  assert(!/href="(?:#|)"/.test(html));
  console.log(`PASS ${path}: HTML, metadata, assets, anchors, preserved links`);
}
const css = await readFile(resolve(root, 'assets/css/style.css'), 'utf8');
parse(css, { positions: true, onParseError: error => { throw error; } });
console.log('PASS CSS syntax');
