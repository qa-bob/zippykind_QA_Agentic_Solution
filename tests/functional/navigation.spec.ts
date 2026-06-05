import { test, expect } from '@playwright/test';
import { PricingPage } from '../../pages/PricingPage';

test.describe('Navigation — Functional @functional', () => {
  // All tests use the pricing page as the base since its top-nav is well-defined
  test.beforeEach(async ({ page }) => {
    const pricingPage = new PricingPage(page);
    await pricingPage.navigate();
  });

  test.describe('Top Nav Links Presence', () => {
    const navItems = [
      { text: 'Home', href: '/' },
      { text: 'Features', href: '/features' },
      { text: 'Pricing', href: '/pricing' },
      { text: 'How It Works', href: '/how-it-works' },
      { text: 'About', href: '/about' },
      { text: 'FAQs', href: '/faqs' },
      { text: 'Careers', href: '/careers' },
      { text: 'Support', href: '/docs' },
      { text: 'Contact Us', href: '/contact' },
    ];

    for (const { text, href } of navItems) {
      test(`"${text}" nav link is visible`, async ({ page }) => {
        const link = page.locator('#top-nav').getByRole('link', { name: text, exact: true });
        await expect(link).toBeVisible();
      });

      test(`"${text}" nav link href is "${href}"`, async ({ page }) => {
        const link = page.locator('#top-nav').getByRole('link', { name: text, exact: true });
        const href_ = await link.getAttribute('href');
        expect(href_).toBe(href);
      });
    }
  });

  test.describe('Navigation Flows', () => {
    test('clicking "Features" navigates to /features', async ({ page }) => {
      await page.locator('#top-nav').getByRole('link', { name: 'Features', exact: true }).click();
      await page.waitForURL(/\/features/);
      expect(page.url()).toContain('/features');
    });

    test('clicking "How It Works" navigates to /how-it-works', async ({ page }) => {
      await page.locator('#top-nav').getByRole('link', { name: 'How It Works', exact: true }).click();
      await page.waitForURL(/\/how-it-works/);
      expect(page.url()).toContain('/how-it-works');
    });

    test('clicking "About" navigates to /about', async ({ page }) => {
      await page.locator('#top-nav').getByRole('link', { name: 'About', exact: true }).click();
      await page.waitForURL(/\/about/);
      expect(page.url()).toContain('/about');
    });

    test('clicking "FAQs" navigates to /faqs', async ({ page }) => {
      await page.locator('#top-nav').getByRole('link', { name: 'FAQs', exact: true }).click();
      await page.waitForURL(/\/faqs/);
      expect(page.url()).toContain('/faqs');
    });

    test('clicking "LOG IN" navigates to /app/login', async ({ page }) => {
      await page.locator('#top-nav .login a').click();
      await page.waitForURL(/\/app\/login/);
      expect(page.url()).toContain('/app/login');
    });

    test('clicking the Zippykind logo returns to homepage', async ({ page }) => {
      const logo = page.locator('.top-menu a[href="https://zippykind.com"]').first();
      await logo.click();
      await page.waitForURL(/zippykind\.com\/?$/);
      expect(page.url()).toMatch(/zippykind\.com\/?$/);
    });
  });
});
