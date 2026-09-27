// Development-only: screenshots and conversion never run in the production site.
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { randomUUID } from 'node:crypto';
import { projects } from '../site.config.mjs';

const root = resolve(import.meta.dirname, '..');
const selected = process.argv[2];
const targets = selected ? projects.filter(p => p.slug === selected || p.cover === selected) : projects;
if (!targets.length) throw new Error('Unknown project slug.');
const originalDir = resolve(root, 'captures/projects');
const outputDir = resolve(root, 'assets/images/projects');
const manifestPath = resolve(root, 'docs/project-captures.json');
await mkdir(originalDir, { recursive: true });
await mkdir(outputDir, { recursive: true });
let history = [];
try { history = JSON.parse(await readFile(manifestPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let completed = 0;
try {
  for (const project of targets) {
    if (!project.demo || project.demo.includes('COLOCAR_LINK')) {
      console.log(`PENDING ${project.name}: missing real demo URL.`);
      continue;
    }
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light', locale: 'pt-BR', permissions: [] });
    try {
      const page = await context.newPage();
      const response = await page.goto(project.demo, { waitUntil: 'load', timeout: 60000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()} at ${project.demo}`);
      // Analytics may keep sockets open; explicitly verify fonts and visible images.
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await page.evaluate(async () => {
        await document.fonts.ready;
        window.scrollTo(0, 0);
        const inViewport = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0; };
        await Promise.all([...document.images].filter(inViewport).map(async img => { await img.decode(); if (!img.naturalWidth) throw new Error('Failed image: ' + img.currentSrc); }));
        const urls = new Set();
        for (const el of [...document.querySelectorAll('body *')].filter(inViewport)) {
          for (const pseudo of [null, '::before', '::after']) {
            for (const match of getComputedStyle(el, pseudo).backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)) urls.add(match[1]);
          }
        }
        await Promise.all([...urls].map(url => new Promise((ok, fail) => {
          const img = new Image(); img.onload = ok; img.onerror = () => fail(new Error('Failed background: ' + url)); img.src = url;
        })));
        document.querySelectorAll('video').forEach(video => video.pause());
        await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
      });
      const buffer = await page.screenshot({ type: 'png', fullPage: false, animations: 'disabled', caret: 'hide', timeout: 30000 });
      const id = project.cover || project.slug;
      const stamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
      const original = resolve(originalDir, `${id}-${stamp}-${randomUUID().slice(0, 8)}.png`);
      // Exclusive creation guarantees an existing PNG can never be overwritten.
      await writeFile(original, buffer, { flag: 'wx' });
      const optimized = resolve(outputDir, `${id}.webp`);
      const small = resolve(outputDir, `${id}-720.webp`);
      await sharp(original).webp({ quality: 84, effort: 6 }).toFile(optimized);
      await sharp(original).resize({ width: 720 }).webp({ quality: 82, effort: 6 }).toFile(small);
      const metadata = await sharp(optimized).metadata();
      if (metadata.width !== 1440 || metadata.height !== 900) throw new Error('Unexpected screenshot dimensions.');
      const record = {
        project: project.name, slug: project.slug, url: project.demo, title: await page.title(), capturedAt: new Date().toISOString(),
        width: 1440, height: 900, aspectRatio: '8:5',
        original: relative(root, original).replaceAll('\\', '/'), originalBytes: buffer.length,
        optimized: relative(root, optimized).replaceAll('\\', '/'), optimizedBytes: (await stat(optimized)).size,
        small: relative(root, small).replaceAll('\\', '/'), smallBytes: (await stat(small)).size,
      };
      record.reductionPercent = Number(((1 - record.optimizedBytes / record.originalBytes) * 100).toFixed(1));
      history.push(record);
      await writeFile(manifestPath, JSON.stringify(history, null, 2) + '\n');
      completed++;
      console.log(JSON.stringify(record, null, 2));
    } catch (error) { console.error(`FAILED ${project.name}: ${error.message}`); process.exitCode = 1; }
    finally { await context.close(); }
  }
} finally { await browser.close(); }
console.log(`Captured ${completed} project(s). Run npm run build to update PT/EN cards.`);
