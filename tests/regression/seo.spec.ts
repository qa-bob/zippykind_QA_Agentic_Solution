import { test, expect } from '@playwright/test';

const titledPages = [
  { name: 'Homepage',     path: '/',           expectedTitle: /Zippykind/i },
  { name: 'Features',     path: '/features',   expectedTitle: 'Features - Zippykind' },
  { name: 'Pricing',      path: '/pricing',    expectedTitle: 'Pricing - Zippykind' },
  { name: 'Login',        path: '/app/login',  expectedTitle: 'Zippykind Login' },
];

test.describe('SEO & Metadata Regression @regression', () => {
  test.describe('Page Titles', () => {
    for (const { name, path, expectedTitle } of titledPages) {
      test(`${name} has the correct page title`, async ({ page }) => {
        await page.goto(path);
        if (typeof expectedTitle === 'string') {
          await expect(page).toHaveTitle(expectedTitle);
        } else {
          await expect(page).toHaveTitle(expectedTitle);
        }
      });
    }

    test('page title is not empty on any public page', async ({ page }) => {
      const paths = ['/', '/features', '/pricing', '/how-it-works', '/about', '/faqs', '/app/login'];
      for (const path of paths) {
        await page.goto(path);
        const title = await page.title();
        expect(title.trim().length, `Empty title on ${path}`).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Favicon', () => {
    const pagesWithFavicon = ['/', '/features', '/pricing', '/app/login'];

    for (const path of pagesWithFavicon) {
      test(`${path} has a favicon link`, async ({ page }) => {
        await page.goto(path);
        const favicon = page.locator('link[rel="shortcut icon"]');
        await expect(favicon).toBeAttached();
      });

      test(`${path} favicon href contains /favicon.ico`, async ({ page }) => {
        await page.goto(path);
        const href = await page.locator('link[rel="shortcut icon"]').getAttribute('href');
        expect(href).toContain('favicon.ico');
      });
    }
  });

  test.describe('Content-Type & Encoding', () => {
    const pages = ['/', '/features', '/pricing', '/app/login'];

    for (const path of pages) {
      test(`${path} has UTF-8 charset meta tag`, async ({ page }) => {
        await page.goto(path);
        const meta = page.locator('meta[http-equiv="Content-Type"]');
        await expect(meta).toBeAttached();
        const content = await meta.getAttribute('content');
        expect(content?.toLowerCase()).toContain('utf-8');
      });
    }
  });

  test.describe('Body CSS Classes', () => {
    test('pricing page body has page-pricing class', async ({ page }) => {
      await page.goto('/pricing');
      await expect(page.locator('body')).toHaveClass(/page-pricing/);
    });

    test('features page body has page-features class', async ({ page }) => {
      await page.goto('/features');
      await expect(page.locator('body')).toHaveClass(/page-features/);
    });

    test('login page body has login-body class', async ({ page }) => {
      await page.goto('/app/login');
      await expect(page.locator('body')).toHaveClass(/login-body/);
    });
  });
});
