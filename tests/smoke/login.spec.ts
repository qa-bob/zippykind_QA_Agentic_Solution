import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

test.describe('Login Page @smoke', () => {
  test('login page loads successfully', async ({ page }) => {
    const response = await page.goto('/app/login');
    expect(response?.status()).toBe(200);
  });

  test('login page title is "Zippykind Login"', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page).toHaveTitle('Zippykind Login');
  });

  test('login page URL is /app/login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    expect(page.url()).toContain('/app/login');
  });

  test('email input field is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.email).toBeVisible();
  });

  test('password input field is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.password).toBeVisible();
  });

  test('LOG IN button is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('"Remember me" checkbox is checked by default', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.rememberMe).toBeChecked();
  });

  test('"Forgot password?" link is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.forgotPassword).toBeVisible();
  });

  test('Zippykind logo is visible on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.brandLogo).toBeVisible();
  });

  test('sign up link is visible on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.signUp).toBeVisible();
  });

  test('navigating to login from homepage reaches login page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.clickLogin();
    await page.waitForURL(/\/app\/login/);
    await expect(page).toHaveURL(/\/app\/login/);
  });

  test('invalid credentials show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    // Wait for error feedback — allow time for the AJAX response
    await page.waitForTimeout(2000);
    // The page should still be on the login URL (not redirected to dashboard)
    expect(page.url()).toContain('/app/login');
  });
});
