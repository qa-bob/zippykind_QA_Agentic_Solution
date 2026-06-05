import { test, expect } from '@playwright/test';

const NAV_LINKS = [
  { text: 'Home',        href: '/',             expectedUrl: /\/$/ },
  { text: 'Features',    href: '/features',      expectedUrl: /\/features/ },
  { text: 'Pricing',     href: '/pricing',       expectedUrl: /\/pricing/ },
  { text: 'How It Works',href: '/how-it-works',  expectedUrl: /\/how-it-works/ },
  { text: 'About',       href: '/about',         expectedUrl: /\/about/ },
  { text: 'FAQs',        href: '/faqs',          expectedUrl: /\/faqs/ },
  { text: 'Careers',     href: '/careers',       expectedUrl: /\/careers/ },
  { text: 'Support',     href: '/docs',          expectedUrl: /\/docs/ },
  { text: 'Contact Us',  href: '/contact',       expectedUrl: /\/contact/ },
];

test.describe('Links Regression @regression', () => {
  test.describe('Top Navigation Links on Pricing Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/pricing');
    });

    for (const { text, href } of NAV_LINKS) {
      test(`"${text}" link has href="${href}"`, async ({ page }) => {
        const link = page.locator('#top-nav').getByRole('link', { name: text, exact: true });
        const actualHref = await link.getAttribute('href');
        expect(actualHref).toBe(href);
      });
    }

    test('LOG IN link has href="/app/login"', async ({ page }) => {
      const loginLink = page.locator('#top-nav .login a');
      const href = await loginLink.getAttribute('href');
      expect(href).toContain('/app/login');
    });
  });

  test.describe('Top Navigation Links on Features Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/features');
    });

    for (const { text, href } of NAV_LINKS) {
      test(`"${text}" link has href="${href}"`, async ({ page }) => {
        const link = page.locator('#top-nav').getByRole('link', { name: text, exact: true });
        const actualHref = await link.getAttribute('href');
        expect(actualHref).toBe(href);
      });
    }
  });

  test.describe('Navigation Link Pages Load', () => {
    const fastPages = [
      { text: 'Features', path: '/features' },
      { text: 'Pricing',  path: '/pricing' },
    ];

    for (const { text, path } of fastPages) {
      test(`${text} page loads successfully after nav click`, async ({ page }) => {
        await page.goto('/pricing');
        const link = page.locator('#top-nav').getByRole('link', { name: text, exact: true });
        await link.click();
        await page.waitForURL(new RegExp(path));
        const response = await page.evaluate(() => window.performance.getEntriesByType('navigation')[0]);
        expect(page.url()).toContain(path);
      });
    }
  });

  test.describe('Homepage Footer Links', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('Login link in homepage nav points to /app/login', async ({ page }) => {
      const hp = page;
      const loginLinks = hp.getByRole('link', { name: /Login/i });
      const firstHref = await loginLinks.first().getAttribute('href');
      expect(firstHref).toContain('/app/login');
    });

    test('Facebook social link is present in footer', async ({ page }) => {
      const fbLink = page.locator('.sub-footer a[href*="facebook"]');
      await expect(fbLink).toBeAttached();
    });

    test('Twitter social link is present in footer', async ({ page }) => {
      const twLink = page.locator('.sub-footer a[href*="twitter"]');
      await expect(twLink).toBeAttached();
    });

    test('YouTube social link is present in footer', async ({ page }) => {
      const ytLink = page.locator('.sub-footer a[href*="youtube"]');
      await expect(ytLink).toBeAttached();
    });
  });

  test.describe('Pricing Plan CTA Links', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/pricing');
    });

    test('Free Plan CTA links to /signup', async ({ page }) => {
      const freePlanBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Free Plan' }) });
      const ctaHref = await freePlanBox.locator('.action a').getAttribute('href');
      expect(ctaHref).toContain('/signup');
    });

    test('All plan CTAs link to /signup', async ({ page }) => {
      const ctaLinks = page.locator('.action a');
      const count = await ctaLinks.count();
      expect(count).toBeGreaterThanOrEqual(4);
      for (let i = 0; i < count; i++) {
        const href = await ctaLinks.nth(i).getAttribute('href');
        expect(href).toContain('/signup');
      }
    });
  });
});
