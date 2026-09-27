import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('reports', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const errors = [];
const base = 'http://127.0.0.1:3000';
try {
  for (const path of ['/', '/en/']) {
    for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.goto(base + path);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert(await page.locator('h1').isVisible());
      const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, images: [...document.images].every(img => img.width > 0 && img.height > 0) }));
      assert(layout.scroll <= layout.width, `${path} at ${width}: horizontal overflow ${layout.scroll}`);
      assert(layout.images);
      const targets = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.hash));
      for (const target of targets) assert(await page.locator(target).count(), target);
      assert.equal(await page.locator('[data-whatsapp]:visible').count(), 0, 'Missing phone must not produce a link');
      if (width < 1024) {
        const toggle = page.locator('.menu-toggle');
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        assert(await page.locator('.navigation a').first().evaluate(el => el === document.activeElement));
        await page.keyboard.press('Escape');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert(await toggle.evaluate(el => el === document.activeElement));
        await toggle.click();
        await page.locator('.navigation a[href="#projetos"]').click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert(await page.locator('#projetos').evaluate(el => el === document.activeElement));
      }
      await page.locator('.brand').click();
      if ([390, 1440].includes(width)) {
        for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode()); }
        await page.locator('.brand').click();
        await page.screenshot({ path: `reports/${path === '/' ? 'pt' : 'en'}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `reports/${path === '/' ? 'pt' : 'en'}-${width}-hero.png` });
      }
      results.push(`${path} ${width}px: layout, anchors, images, menu/Escape PASS`);
      await context.close();
    }
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base + '/#projetos');
  await page.locator('[data-language-link]').click();
  assert.equal(new URL(page.url()).pathname, '/en/');
  assert.equal(new URL(page.url()).hash, '#projetos');
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.locator('[data-language-link]').click();
  assert.equal(new URL(page.url()).pathname, '/');
  assert.equal(new URL(page.url()).hash, '#projetos');
  await page.locator('.theme-toggle').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.reload();
  assert.equal(await page.locator('.theme-toggle').getAttribute('aria-pressed'), 'true');
  await page.screenshot({ path: 'reports/dark-mobile.png', fullPage: true });
  await page.locator('.theme-toggle').click();
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert(await page.locator('.skip-link').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Enter');
  assert(await page.locator('main').evaluate(el => el === document.activeElement));
  await context.close();
  results.push('Language round trip preserves anchor; theme persists; keyboard skip link PASS');

  // Synthetic fixture, never written to site configuration and never opened.
  // It tests URL/message wiring without contacting WhatsApp or a real person.
  for (const path of ['/', '/en/']) {
    const waContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await waContext.route('**/assets/js/config.js', async route => {
      const response = await route.fetch();
      const source = await response.text();
      await route.fulfill({ response, body: source.replace("phone: ''", "phone: '10000000000'") });
    });
    const waPage = await waContext.newPage();
    await waPage.goto(base + path);
    const wa = waPage.locator('.whatsapp-float');
    await wa.waitFor({ state: 'visible' });
    const target = new URL(await wa.getAttribute('href'));
    assert.equal(target.host, 'wa.me');
    assert.equal(target.searchParams.get('text'), path === '/' ? 'Olá, Guilherme! Encontrei seu portfólio e gostaria de conversar sobre um projeto ou oportunidade.' : 'Hello, Guilherme! I found your portfolio and would like to talk about a project or opportunity.');
    const size = await wa.boundingBox();
    assert(size.width >= 44 && size.height >= 44);
    await waPage.locator('#contato').scrollIntoViewIfNeeded();
    await wa.waitFor({ state: 'hidden' });
    assert(await waPage.locator('.contact-paper [data-whatsapp]').isVisible());
    await waContext.close();
  }
  results.push('WhatsApp PT/EN wiring and 44px targets PASS with synthetic browser-only fixture; real recipient remains pending');

  for (const path of ['/', '/en/']) {
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
    const page = await nojs.newPage();
    await page.goto(base + path);
    assert(await page.locator('h1').isVisible());
    assert(await page.locator('.navigation').isVisible());
    assert.equal(await page.locator('.project-card').count(), 4);
    assert(await page.locator('[data-language-link]').isVisible());
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.locator('[data-language-link]').click();
    assert.equal(new URL(page.url()).pathname, path === '/' ? '/en/' : '/');
    await nojs.close();
  }
  results.push('PT/EN without JavaScript at 320px: content, navigation, language links PASS');

  const zoomContext = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const zoomPage = await zoomContext.newPage();
  for (const path of ['/', '/en/']) {
    await zoomPage.goto(base + path);
    // Browser zoom at 200% halves the effective CSS viewport. CSS zoom does not
    // change media queries and is not equivalent to the browser's native zoom.
    await zoomPage.setViewportSize({ width: 640, height: 450 });
    assert(await zoomPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '200% reflow overflow');
    await zoomPage.screenshot({ path: `reports/zoom-${path === '/' ? 'pt' : 'en'}.png`, fullPage: true });
    await zoomPage.setViewportSize({ width: 1280, height: 900 });
  }
  await zoomContext.close();
  results.push('200% equivalent desktop reflow PASS (640 CSS px for a 1280px display; native zoom requires manual confirmation)');
  assert.deepEqual(errors, [], 'Browser console errors');
  results.push('No page or console errors in 14 responsive checks');
  await writeFile('reports/browser-results.json', JSON.stringify({ results, errors }, null, 2));
  console.log(results.join('\n'));
} finally { await browser.close(); }
