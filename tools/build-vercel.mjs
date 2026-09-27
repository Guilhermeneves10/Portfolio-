import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
await mkdir(output, { recursive: true });
for (const path of ['index.html', 'en', 'assets', 'robots.txt', 'sitemap.xml']) {
  await cp(resolve(root, path), resolve(output, path), { recursive: true });
}
console.log('Vercel static output generated in dist/.');
