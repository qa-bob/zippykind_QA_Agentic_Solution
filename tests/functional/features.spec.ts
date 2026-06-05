import { test, expect } from '@playwright/test';
import { FeaturesPage } from '../../pages/FeaturesPage';

test.describe('Features Page — Functional @functional', () => {
  let featuresPage: FeaturesPage;

  test.beforeEach(async ({ page }) => {
    featuresPage = new FeaturesPage(page);
    await featuresPage.navigate();
  });

  test.describe('Page Identity', () => {
    test('features page title is "Features - Zippykind"', async ({ page }) => {
      await expect(page).toHaveTitle('Features - Zippykind');
    });

    test('features page URL contains /features', async ({ page }) => {
      expect(page.url()).toContain('/features');
    });

    test('main heading "Zippykind\'s Software and App Features" is visible', async () => {
      await expect(featuresPage.mainHeading).toBeVisible();
    });

    test('sub-heading about team organization is visible', async ({ page }) => {
      await expect(page.locator('p').filter({ hasText: /keep your team organized/i })).toBeVisible();
    });
  });

  test.describe('App Feature Sections', () => {
    test('"Interactive Map Dashboard" section is present', async () => {
      await expect(featuresPage.mapDashboard).toBeVisible();
    });

    test('"Drivers Stay Efficient" section heading is visible', async () => {
      await expect(featuresPage.driversEfficient).toBeVisible();
    });

    test('"Communicate Better With Customers" section heading is visible', async () => {
      await expect(featuresPage.communicateBetter).toBeVisible();
    });
  });

  test.describe('Dispatch Dashboard Sections', () => {
    test('"Dispatch Operator\'s Dashboard" heading is visible', async () => {
      await expect(featuresPage.dispatchDashboard).toBeVisible();
    });

    test('"Track Your Drivers" section heading is visible', async () => {
      await expect(featuresPage.trackDrivers).toBeVisible();
    });

    test('"Delivery History Heatmap" section heading is visible', async () => {
      await expect(featuresPage.heatmap).toBeVisible();
    });

    test('"Easily Send Delivery Tickets To Your Drivers" section is visible', async () => {
      await expect(featuresPage.sendTickets).toBeVisible();
    });

    test('"Notification Templates" section is visible', async () => {
      await expect(featuresPage.notificationTemplates).toBeVisible();
    });
  });

  test.describe('Feature Content', () => {
    test('features page mentions "Real time tracking"', async ({ page }) => {
      await expect(page.locator('body')).toContainText('Real time tracking');
    });

    test('features page mentions "Signature Verification"', async ({ page }) => {
      await expect(page.locator('body')).toContainText(/signature verification/i);
    });

    test('features page mentions route optimization', async ({ page }) => {
      await expect(page.locator('body')).toContainText('route');
    });

    test('features page mentions Google Maps integration', async ({ page }) => {
      await expect(page.locator('body')).toContainText('Google maps');
    });
  });

  test.describe('Navigation', () => {
    test('LOG IN link in features nav navigates to login page', async ({ page }) => {
      await page.locator('#top-nav .login a').click();
      await page.waitForURL(/\/app\/login/);
      expect(page.url()).toContain('/app/login');
    });

    test('Pricing link navigates to /pricing', async ({ page }) => {
      await page.locator('#top-nav').getByRole('link', { name: 'Pricing', exact: true }).click();
      await page.waitForURL(/\/pricing/);
      expect(page.url()).toContain('/pricing');
    });
  });
});
