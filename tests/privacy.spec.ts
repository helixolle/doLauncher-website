import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

for (const width of [320, 390, 1440]) {
  test.describe(`privacy policy ${width}px`, () => {
    test.use({ viewport: { width, height: 900 }, javaScriptEnabled: false });

    test('complete policy is accessible without scripts, login, cookies or external requests', async ({ page }) => {
      const requests: string[] = [];
      const failures: string[] = [];
      page.on('request', request => requests.push(request.url()));
      page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
      await page.goto('/privacy/');
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveTitle('doLauncher Privacy Policy');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('doLauncher Privacy Policy');
      await expect(page.getByRole('heading', { level: 2 })).toHaveCount(9);
      await expect(page.getByRole('main')).toContainText('Effective date: 25 November 2026');
      await expect(page.getByRole('main')).toContainText('com.dostudio.launcher');
      await expect(page.locator('script, iframe, form, input, canvas, video')).toHaveCount(0);
      await expect(page.locator('a[href="mailto:olledavegardh@gmail.com"]').first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(failures).toEqual([]);
      expect(requests.every(url => new URL(url).origin === new URL(page.url()).origin)).toBe(true);
      expect(await page.context().cookies()).toEqual([]);
      expect((await page.context().storageState()).origins).toEqual([]);

      // Every source paragraph/list item must be present, not just a summary of the policy.
      const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1').replace(/^#{1,3} |^- /gm, '').replace(/\s+/g, ' ').trim();
      const policy = readFileSync(new URL('../PRIVACY_POLICY.md', import.meta.url), 'utf8');
      const rendered = plain(await page.getByRole('main').innerText());
      for (const paragraph of policy.trim().split(/\n\s*\n/)) {
        expect(rendered).toContain(plain(paragraph));
      }
    });
  });
}

test('homepage links to the policy and section links have valid destinations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy Policy', exact: true }).click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  for (const link of await page.locator('nav a').all()) {
    const href = await link.getAttribute('href');
    await expect(page.locator(href!)).toHaveCount(1);
  }
});

test('policy passes automated accessibility checks', async ({ page }) => {
  await page.goto('/privacy/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('policy and local assets also work under the GitHub Pages project subdirectory', async ({ page }) => {
  const failures: string[] = [];
  await page.route('**/doLauncher-website/**', async route => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace('/doLauncher-website/', '/');
    const response = await page.request.get(url.toString());
    await route.fulfill({ response });
  });
  page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
  await page.goto('/doLauncher-website/privacy/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('doLauncher Privacy Policy');
  await expect(page.locator('body')).toHaveCSS('color', 'rgb(36, 39, 36)');
  expect(failures).toEqual([]);
  await page.getByRole('link', { name: 'About doLauncher' }).click();
  await expect(page).toHaveURL(/\/doLauncher-website\/$/);
  await page.getByRole('link', { name: 'Privacy Policy', exact: true }).click();
  await expect(page).toHaveURL(/\/doLauncher-website\/privacy\/$/);
});
