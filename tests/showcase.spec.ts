import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const features = ['Home screen', 'Floating folders', 'Pull-down search', 'Tasks and routines', 'Markdown notes'];

for (const viewport of [{ width: 1440, height: 1050 }, { width: 390, height: 844 }, { width: 320, height: 700 }]) {
  test.describe(`${viewport.width}px static layout`, () => {
    test.use({ viewport, javaScriptEnabled: false });

    test('content and every screenshot load without JavaScript', async ({ page }) => {
      const failures: string[] = [];
      const scripts: string[] = [];
      page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
      page.on('request', request => { if (request.resourceType() === 'script') scripts.push(request.url()); });
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('doLauncher');
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(features);
      await expect(page.locator('figure')).toHaveCount(11);
      for (const image of await page.getByRole('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => ({ width: element.naturalWidth, height: element.naturalHeight })))
          .toEqual({ width: 411, height: 891 });
        await expect(image).toHaveAttribute('alt', /\S/);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(failures).toEqual([]);
      expect(scripts).toEqual([]);
    });

    test('features alternate sides on desktop and stack in reading order on mobile', async ({ page }) => {
      await page.goto('/');
      const rows = await page.locator('.feature-row').all();
      for (const [index, row] of rows.entries()) {
        const copy = (await row.locator('.feature-copy').boundingBox())!;
        const images = (await row.locator('.screenshots').boundingBox())!;
        if (viewport.width > 760) {
          if (index % 2 === 0) expect(copy.x).toBeLessThan(images.x);
          else expect(copy.x).toBeGreaterThan(images.x);
        } else {
          expect(copy.y + copy.height).toBeLessThanOrEqual(images.y);
        }
      }
    });
  });
}

test('there are no application scripts, interactive widgets or animations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('script, button, input, textarea, select, details, dialog, canvas, video, [role="tab"]')).toHaveCount(0);
  await expect(page.locator('.eyebrow, .serif-word, #playground, #toast')).toHaveCount(0);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  const font = await page.locator('h1').evaluate(element => getComputedStyle(element).fontFamily);
  expect(font).toContain('sans-serif');
  expect(font).not.toMatch(/Georgia|Times/);
  expect((await page.context().storageState()).origins).toEqual([]);
});

test('state changes are shown as separate labeled screenshots', async ({ page }) => {
  await page.goto('/');
  const search = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Pull-down search', exact: true }) });
  await expect(search.locator('img')).toHaveCount(3);
  await expect(search.locator('figcaption')).toHaveText(['Search opened', 'Query: “ca”', 'Query: “camera”']);
  const folders = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Floating folders', exact: true }) });
  await expect(folders.locator('figcaption')).toHaveText(['Folder closed', 'Folder open']);
  const tasks = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Tasks and routines', exact: true }) });
  await expect(tasks.locator('img').nth(1)).toHaveAttribute('src', './screenshots/tasks-completed-light.png');
  const notes = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Markdown notes', exact: true }) });
  await expect(notes.locator('figcaption')).toHaveText(['Plain-text draft', 'With Markdown formatting']);
  await expect(page.getByRole('complementary')).toContainText('illustrative keyboard');
});

test('the page remains static when the operating system theme changes', async ({ page }) => {
  await page.goto('/');
  const sources = await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')));
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')))).toEqual(sources);
  await expect(page.locator('body')).toHaveCSS('color', 'rgb(36, 39, 36)');
});

test('automated accessibility checks pass', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});
