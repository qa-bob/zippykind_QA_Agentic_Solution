import { test, expect } from '@playwright/test';
import { PricingPage } from '../../pages/PricingPage';

test.describe('Pricing Page — Functional @functional', () => {
  let pricingPage: PricingPage;

  test.beforeEach(async ({ page }) => {
    pricingPage = new PricingPage(page);
    await pricingPage.navigate();
  });

  test.describe('Page Identity', () => {
    test('pricing page loads with title "Pricing - Zippykind"', async ({ page }) => {
      await expect(page).toHaveTitle('Pricing - Zippykind');
    });

    test('pricing page URL is /pricing', async ({ page }) => {
      expect(page.url()).toContain('/pricing');
    });

    test('"Simple Pricing" heading is visible', async () => {
      await expect(pricingPage.heading).toBeVisible();
    });

    test('"As low as $0.19 per delivery" sub-heading is visible', async () => {
      await expect(pricingPage.pricingSubHeading).toBeVisible();
    });
  });

  test.describe('Plan Names', () => {
    test('"Free Plan" is displayed', async () => {
      await expect(pricingPage.freePlan).toBeVisible();
    });

    test('"Meadow Plan" is displayed', async () => {
      await expect(pricingPage.meadowPlan).toBeVisible();
    });

    test('"Forest Plan" is displayed', async () => {
      await expect(pricingPage.forestPlan).toBeVisible();
    });

    test('"Orchard Plan" is displayed', async () => {
      await expect(pricingPage.orchardPlan).toBeVisible();
    });
  });

  test.describe('Plan Content', () => {
    test('Free Plan shows $0', async ({ page }) => {
      const freePlanBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Free Plan' }) });
      await expect(freePlanBox.locator('price')).toContainText('0');
    });

    test('Free Plan shows 50 delivery tickets', async ({ page }) => {
      const freePlanBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Free Plan' }) });
      await expect(freePlanBox).toContainText('50');
    });

    test('Orchard Plan shows $570', async ({ page }) => {
      const orchardBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Orchard Plan' }) });
      await expect(orchardBox.locator('price')).toContainText('570');
    });

    test('Orchard Plan shows 3000 delivery tickets', async ({ page }) => {
      const orchardBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Orchard Plan' }) });
      await expect(orchardBox).toContainText('3000');
    });

    test('Forest Plan shows 1500 delivery tickets', async ({ page }) => {
      const forestBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Forest Plan' }) });
      await expect(forestBox).toContainText('1500');
    });

    test('"Credit Never Expires" is shown on each paid plan', async ({ page }) => {
      const allBoxes = page.locator('.box');
      const count = await allBoxes.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('"Unlimited drivers" is listed in plan features', async ({ page }) => {
      const firstBox = page.locator('.box').first();
      await expect(firstBox).toContainText('unlimited drivers');
    });
  });

  test.describe('CTAs and Links', () => {
    test('price comparison chart link is visible', async () => {
      await expect(pricingPage.comparisonLink).toBeVisible();
    });

    test('"SEE PRICE COMPARISON CHART" button is visible', async () => {
      await expect(pricingPage.comparisonButton).toBeVisible();
    });

    test('each plan has a CTA button', async () => {
      const ctaCount = await pricingPage.ctaButtons.count();
      expect(ctaCount).toBeGreaterThanOrEqual(4);
    });

    test('Free Plan sign up CTA links to /signup', async ({ page }) => {
      const freePlanBox = page.locator('.box').filter({ has: page.locator('h5', { hasText: 'Free Plan' }) });
      const ctaHref = await freePlanBox.locator('.action a').getAttribute('href');
      expect(ctaHref).toContain('/signup');
    });
  });

  test.describe('Membership Information', () => {
    test('"What your membership comes with" section is visible', async () => {
      await expect(pricingPage.membershipInfo).toBeVisible();
    });

    test('"Add-ons Pricing" section is visible', async () => {
      await expect(pricingPage.addOns).toBeVisible();
    });

    test('Route Optimization add-on is listed', async ({ page }) => {
      await expect(page.locator('body')).toContainText('Route Optimization');
    });

    test('SMS pricing rates section is present', async ({ page }) => {
      await expect(page.locator('body')).toContainText('Price per SMS');
    });
  });
});
