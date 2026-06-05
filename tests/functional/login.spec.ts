import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page — Functional @functional', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.describe('Form Fields', () => {
    test('email field has correct placeholder', async () => {
      await expect(loginPage.email).toHaveAttribute('placeholder', 'Enter email');
    });

    test('password field type is "password"', async () => {
      await expect(loginPage.password).toHaveAttribute('type', 'password');
    });

    test('password field has correct placeholder', async () => {
      await expect(loginPage.password).toHaveAttribute('placeholder', 'Password');
    });

    test('email field accepts text input', async ({ page }) => {
      await loginPage.email.fill('test@example.com');
      await expect(loginPage.email).toHaveValue('test@example.com');
    });

    test('password field accepts text input', async () => {
      await loginPage.password.fill('mypassword');
      await expect(loginPage.password).toHaveValue('mypassword');
    });

    test('"Remember me" checkbox is checked by default', async () => {
      await expect(loginPage.rememberMe).toBeChecked();
    });

    test('"Remember me" checkbox can be unchecked', async () => {
      await loginPage.rememberMe.uncheck();
      await expect(loginPage.rememberMe).not.toBeChecked();
    });
  });

  test.describe('Forgot Password Flow', () => {
    test('"Forgot password?" link is visible', async () => {
      await expect(loginPage.forgotPassword).toBeVisible();
    });

    test('clicking "Forgot password?" hides the login form', async ({ page }) => {
      await loginPage.clickForgotPassword();
      await expect(page.locator('#frm_login')).toBeHidden();
    });

    test('clicking "Forgot password?" reveals the forgot password form', async ({ page }) => {
      await loginPage.clickForgotPassword();
      await expect(page.locator('#frm_forgotpass')).toBeVisible();
    });

    test('"Go back" link returns to the login form', async ({ page }) => {
      await loginPage.clickForgotPassword();
      await page.locator('#frm_forgotpass').getByText('Go back').click();
      await expect(page.locator('#frm_login')).toBeVisible();
    });

    test('forgot password form has an email input', async ({ page }) => {
      await loginPage.clickForgotPassword();
      await expect(page.locator('#frm_forgotpass #email_address')).toBeVisible();
    });

    test('forgot password form has a SUBMIT button', async ({ page }) => {
      await loginPage.clickForgotPassword();
      await expect(page.locator('#frm_forgotpass button')).toBeVisible();
    });
  });

  test.describe('Login Behavior', () => {
    test('submitting empty form shows validation (fields are required)', async ({ page }) => {
      // HTML5 required attributes prevent submission; email should show a validation message
      const isRequired = await loginPage.email.getAttribute('required');
      expect(isRequired).not.toBeNull();
    });

    test('password field is marked as required', async () => {
      const isRequired = await loginPage.password.getAttribute('required');
      expect(isRequired).not.toBeNull();
    });

    test('invalid credentials keep user on login page', async ({ page }) => {
      await loginPage.login('nobody@nowhere.invalid', 'wrongpassword123');
      await page.waitForTimeout(2500);
      expect(page.url()).toContain('/app/login');
    });

    test('sign up link navigates to pricing page', async ({ page }) => {
      await loginPage.signUp.click();
      await page.waitForURL(/\/pricing/);
      expect(page.url()).toContain('/pricing');
    });
  });

  test.describe('Branding', () => {
    test('Zippykind logo links to homepage', async ({ page }) => {
      const logoLink = page.locator('.login-wrap a[href="https://zippykind.com"]');
      await expect(logoLink).toBeVisible();
    });

    test('page body has login-body class', async ({ page }) => {
      await expect(page.locator('body')).toHaveClass(/login-body/);
    });
  });
});
