import { test, expect } from '@playwright/test';

const PUBLIC_PAGES = [
  { name: 'Homepage',     path: '/' },
  { name: 'Features',     path: '/features' },
  { name: 'Pricing',      path: '/pricing' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About',        path: '/about' },
  { name: 'FAQs',         path: '/faqs' },
  { name: 'Careers',      path: '/careers' },
  { name: 'Support',      path: '/docs' },
  { name: 'Contact Us',   path: '/contact' },
  { name: 'Login',        path: '/app/login' },
];

test.describe('Site Health @regression', () => {
  test.describe('All Public Pages Return HTTP 200', () => {
    for (const { name, path } of PUBLIC_PAGES) {
      test(`${name} (${path}) returns HTTP 200`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status(), `${name} expected 200, got ${response?.status()}`).toBe(200);
      });
    }
  });

  test.describe('Page Load Times', () => {
    for (const { name, path } of PUBLIC_PAGES) {
      test(`${name} loads within 15 seconds`, async ({ page }) => {
        const start = Date.now();
        await page.goto(path);
        await page.waitForLoadState('load');
        const elapsed = Date.now() - start;
        expect(elapsed, `${name} took ${elapsed}ms`).toBeLessThan(15000);
      });
    }
  });

  test.describe('No Broken Page Shell', () => {
    for (const { name, path } of PUBLIC_PAGES) {
      test(`${name} renders a non-empty body`, async ({ page }) => {
        await page.goto(path);
        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.trim().length, `${name} body is empty`).toBeGreaterThan(100);
      });
    }
  });
});
