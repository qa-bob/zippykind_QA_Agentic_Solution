import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page @smoke', () => {
  test('homepage loads and returns HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('homepage title contains Zippykind', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(page).toHaveTitle(/Zippykind/i);
  });

  test('Login navigation link is visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.loginNav).toBeVisible();
  });

  test('Login navigation link points to /app/login', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const href = await homePage.loginNav.getAttribute('href');
    expect(href).toContain('/app/login');
  });

  test('footer is present on homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await expect(homePage.footer).toBeVisible();
  });
});
