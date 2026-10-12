const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/Users/universe/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

async function inspect(page) {
  return page.locator('#home h1 strong').evaluate((element) => {
    const region = element.getBoundingClientRect();
    const visible = [...element.querySelectorAll('span.absolute')].filter((node) => Number(getComputedStyle(node).opacity) > 0.95);
    return { title: visible.map((node) => node.textContent.trim()), width: region.width, height: region.height, overflow: document.documentElement.scrollWidth > innerWidth, visibility: document.visibilityState };
  });
}

(async () => {
  const output = process.argv[2];
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: false, ignoreDefaultArgs: ['--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--disable-background-timer-throttling'] });
  const evidence = { browser: browser.version(), url: 'http://localhost:3127', checks: [] };
  try {
    for (const width of [320, 1280]) {
      for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
        await context.addInitScript((value) => localStorage.setItem('theme', value), theme);
        const page = await context.newPage();
        await page.goto(evidence.url);
        await page.waitForLoadState('networkidle');
        const initial = await inspect(page);
        assert.deepEqual(initial.title, ['Senior Software Engineer']);
        await page.waitForTimeout(5200);
        const settled = await inspect(page);
        assert.deepEqual(settled.title, initial.title);
        assert.equal(settled.overflow, false);
        assert.equal(settled.width, initial.width);
        assert.equal(settled.height, initial.height);
        const actualTheme = await page.locator('html').getAttribute('class');
        assert.equal(actualTheme.includes('dark'), theme === 'dark');
        await page.screenshot({ path: path.join(output, `reduced-${width}-${theme}.png`) });
        evidence.checks.push({ kind: 'reduced-motion', width, theme, initial, settled });
        await context.close();
      }
    }
    const context = await browser.newContext({ viewport: { width: 320, height: 900 } });
    const page = await context.newPage();
    await page.goto(evidence.url);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      window.__visibilityEvidence = [];
      document.addEventListener('visibilitychange', () => window.__visibilityEvidence.push({ state: document.visibilityState, time: performance.now() }));
    });
    const before = await inspect(page);
    const session = await context.newCDPSession(page);
    const { windowId } = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'minimized' } });
    await page.waitForTimeout(600);
    const hidden = await inspect(page);
    assert.equal(hidden.visibility, 'hidden');
    await page.waitForTimeout(5100);
    const paused = await inspect(page);
    assert.deepEqual(paused.title, hidden.title);
    await session.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'normal' } });
    await page.bringToFront();
    await page.waitForTimeout(1200);
    const resumedEarly = await inspect(page);
    assert.equal(resumedEarly.visibility, 'visible');
    assert.deepEqual(resumedEarly.title, paused.title);
    await page.waitForTimeout(3600);
    const resumedLate = await inspect(page);
    assert.notDeepEqual(resumedLate.title, paused.title);
    evidence.checks.push({ kind: 'real-minimized-window', before, hidden, paused, resumedEarly, resumedLate, events: await page.evaluate(() => window.__visibilityEvidence) });
    await page.screenshot({ path: path.join(output, 'background-resumed.png') });
    await context.close();
    evidence.status = 'passed';
  } finally {
    fs.writeFileSync(path.join(output, 'browser-acceptance.json'), JSON.stringify(evidence, null, 2));
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
