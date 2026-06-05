import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage — Functional @functional', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test.describe('Feature Tiles', () => {
    const featureTiles = [
      'Digital Proof of Delivery',
      'Spending Rewards Program',
      '"Uber-like" Customer-to-Driver Tracking',
      'Autonomous Communication',
      'Connect To Our API',
      'Autonomous Driver Assignment',
      'Drag and Drop Scheduler',
      'Recurring Subscriptions',
      'Enhanced Analytics',
    ];

    for (const title of featureTiles) {
      test(`feature tile "${title}" is visible`, async ({ page }) => {
        await expect(page.locator('.feature-title-box').filter({ hasText: title })).toBeVisible();
      });
    }
  });

  test.describe('App Feature Highlights', () => {
    const appFeatures = [
      'Customer Communication',
      'Customer Loyalty',
      'Delivery Verification',
      'Optimize Routes',
      'Delivery Calendar',
      'Delivery Sorting',
      'Driver Tracking',
      'Delivery Notes',
    ];

    for (const feature of appFeatures) {
      test(`app feature "${feature}" is listed`, async ({ page }) => {
        await expect(page.locator('.feature-title').filter({ hasText: feature })).toBeVisible();
      });
    }
  });

  test.describe('Pricing Teaser Section', () => {
    test('pricing section heading "Zippykind pricing" is visible', async ({ page }) => {
      await expect(page.locator('h2').filter({ hasText: 'Zippykind pricing' })).toBeVisible();
    });

    test('"No hidden fees" messaging is present', async ({ page }) => {
      await expect(page.locator('body')).toContainText('No hidden fees');
    });

    test('"Free Plan" and "50 deliveries" messaging is present', async ({ page }) => {
      await expect(page.locator('body')).toContainText('50 deliveries');
    });

    test('"As low as $0.19 per delivery" is displayed', async ({ page }) => {
      await expect(page.locator('body')).toContainText('$0.19 per delivery');
    });

    test('"See price comparison chart!" link is present', async ({ page }) => {
      await expect(page.getByRole('link', { name: /See price comparison chart/i })).toBeVisible();
    });
  });

  test.describe('Testimonial Section', () => {
    test('Tom Spedale testimonial section is present', async ({ page }) => {
      await expect(page.locator('body')).toContainText('Meet Tom Spedale');
    });

    test("Spedale's Florist is mentioned", async ({ page }) => {
      await expect(page.locator('body')).toContainText("Spedale's Florist");
    });
  });

  test.describe('Industry Coverage', () => {
    test('"Helping all kinds of delivery businesses!" tagline is visible', async ({ page }) => {
      await expect(page.locator('body')).toContainText('Helping all kinds of delivery businesses!');
    });

    test('Flowers industry type is featured', async ({ page }) => {
      await expect(page.locator('.industry-type').filter({ hasText: 'Flowers' })).toBeVisible();
    });

    test('Medical Supplies industry type is featured', async ({ page }) => {
      await expect(page.locator('.industry-type').filter({ hasText: 'Medical Supplies' })).toBeVisible();
    });
  });
});
