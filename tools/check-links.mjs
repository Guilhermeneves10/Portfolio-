import { writeFile, mkdir } from 'node:fs/promises';
import { site, projects, otherProjects } from '../site.config.mjs';
const urls = [...new Set([site.github, site.linkedin, ...projects.flatMap(p => [p.demo, p.github]), ...otherProjects.map(p => p.url)].filter(Boolean))];
const results = await Promise.all(urls.map(async url => {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'Portfolio-Link-Check' }, signal: AbortSignal.timeout(20000) });
    await response.body?.cancel();
    return { url, status: response.status, finalUrl: response.url };
  } catch (error) { return { url, error: error.message }; }
}));
await mkdir('reports', { recursive: true });
await writeFile('reports/links.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
