import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PricingPage } from '../../pages/PricingPage';
import { FeaturesPage } from '../../pages/FeaturesPage';

test.describe('Content Regression @regression', () => {
  test.describe('Homepage Critical Content', () => {
    test('homepage has Zippykind in title', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Zippykind/i);
    });

    test('homepage Login nav link is present', async ({ page }) => {
      const hp = new HomePage(page);
      await hp.navigate();
      await expect(hp.loginNav).toBeVisible();
    });

    test('homepage footer is present', async ({ page }) => {
      const hp = new HomePage(page);
      await hp.navigate();
      await expect(hp.footer).toBeVisible();
    });

    test('homepage footer contains copyright text', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('.sub-footer')).toContainText('Snappylead');
    });

    test('homepage features section is present', async ({ page }) => {
      await page.goto('/');
      const featureBox = page.locator('.feature-title-box').first();
      await expect(featureBox).toBeVisible();
    });

    test('homepage pricing teaser section is present', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('body')).toContainText('Zippykind pricing');
    });
  });

  test.describe('Login Page Critical Content', () => {
    test('login page title is "Zippykind Login"', async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.navigate();
      await expect(page).toHaveTitle('Zippykind Login');
    });

    test('login form is present', async ({ page }) => {
      await page.goto('/app/login');
      await expect(page.locator('#frm_login')).toBeVisible();
    });

    test('email field is present on login page', async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.navigate();
      await expect(lp.email).toBeVisible();
    });

    test('password field is present on login page', async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.navigate();
      await expect(lp.password).toBeVisible();
    });

    test('LOG IN button is present', async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.navigate();
      await expect(lp.submitButton).toBeVisible();
    });

    test('"Forgot password?" link is present', async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.navigate();
      await expect(lp.forgotPassword).toBeVisible();
    });
  });

  test.describe('Pricing Page Critical Content', () => {
    test('pricing page title is "Pricing - Zippykind"', async ({ page }) => {
      const pp = new PricingPage(page);
      await pp.navigate();
      await expect(page).toHaveTitle('Pricing - Zippykind');
    });

    test('all 4 pricing plans are present', async ({ page }) => {
      const pp = new PricingPage(page);
      await pp.navigate();
      await expect(pp.freePlan).toBeVisible();
      await expect(pp.meadowPlan).toBeVisible();
      await expect(pp.forestPlan).toBeVisible();
      await expect(pp.orchardPlan).toBeVisible();
    });

    test('"Simple Pricing" heading is present', async ({ page }) => {
      const pp = new PricingPage(page);
      await pp.navigate();
      await expect(pp.heading).toBeVisible();
    });
  });

  test.describe('Features Page Critical Content', () => {
    test('features page title is "Features - Zippykind"', async ({ page }) => {
      const fp = new FeaturesPage(page);
      await fp.navigate();
      await expect(page).toHaveTitle('Features - Zippykind');
    });

    test('main features heading is present', async ({ page }) => {
      const fp = new FeaturesPage(page);
      await fp.navigate();
      await expect(fp.mainHeading).toBeVisible();
    });

    test('"Interactive Map Dashboard" section is present', async ({ page }) => {
      const fp = new FeaturesPage(page);
      await fp.navigate();
      await expect(fp.mapDashboard).toBeVisible();
    });

    test('"Dispatch Operator\'s Dashboard" section is present', async ({ page }) => {
      const fp = new FeaturesPage(page);
      await fp.navigate();
      await expect(fp.dispatchDashboard).toBeVisible();
    });
  });

  test.describe('Shared Footer Content', () => {
    const pagesWithFooter = [
      { name: 'Homepage', path: '/' },
      { name: 'Pricing',  path: '/pricing' },
      { name: 'Features', path: '/features' },
    ];

    for (const { name, path } of pagesWithFooter) {
      test(`${name} has footer with Scottsdale AZ location`, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator('body')).toContainText('Scottsdale');
      });
    }
  });
});
