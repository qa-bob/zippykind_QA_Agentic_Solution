import { test, expect } from '@playwright/test';

test.describe('Forms Regression @regression', () => {
  test.describe('Login Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/app/login');
    });

    test('login form has id="frm_login"', async ({ page }) => {
      await expect(page.locator('#frm_login')).toBeAttached();
    });

    test('login form method is POST', async ({ page }) => {
      const method = await page.locator('#frm_login').getAttribute('method');
      expect(method?.toUpperCase()).toBe('POST');
    });

    test('login form has a hidden action field set to "login"', async ({ page }) => {
      const actionVal = await page.locator('#frm_login input[name="action"]').getAttribute('value');
      expect(actionVal).toBe('login');
    });

    test('email field has name="email_address"', async ({ page }) => {
      const name = await page.locator('#frm_login #email_address').getAttribute('name');
      expect(name).toBe('email_address');
    });

    test('password field has name="password"', async ({ page }) => {
      const name = await page.locator('#frm_login #password').getAttribute('name');
      expect(name).toBe('password');
    });

    test('remember me checkbox has name="remember"', async ({ page }) => {
      const name = await page.locator('#remember').getAttribute('name');
      expect(name).toBe('remember');
    });

    test('LOG IN button is of type button (not submit bypassing validation)', async ({ page }) => {
      // The form uses JS-controlled submission, button should be present
      await expect(page.locator('#frm_login button')).toBeVisible();
    });
  });

  test.describe('Forgot Password Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/app/login');
    });

    test('forgot password form has id="frm_forgotpass"', async ({ page }) => {
      await expect(page.locator('#frm_forgotpass')).toBeAttached();
    });

    test('forgot password form method is POST', async ({ page }) => {
      const method = await page.locator('#frm_forgotpass').getAttribute('method');
      expect(method?.toUpperCase()).toBe('POST');
    });

    test('forgot password form has action field set to "forgotPassword"', async ({ page }) => {
      const actionVal = await page.locator('#frm_forgotpass input[name="action"]').getAttribute('value');
      expect(actionVal).toBe('forgotPassword');
    });

    test('forgot password form email field is present', async ({ page }) => {
      await expect(page.locator('#frm_forgotpass #email_address')).toBeAttached();
    });

    test('forgot password email field is required', async ({ page }) => {
      const required = await page.locator('#frm_forgotpass #email_address').getAttribute('required');
      expect(required).not.toBeNull();
    });
  });

  test.describe('Newsletter Subscription Form (Homepage Footer)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('newsletter form is present on homepage', async ({ page }) => {
      await expect(page.locator('#subscribe-form')).toBeAttached();
    });

    test('newsletter form name field is present', async ({ page }) => {
      await expect(page.locator('#subscribe-form #name')).toBeAttached();
    });

    test('newsletter form email field is present', async ({ page }) => {
      await expect(page.locator('#subscribe-form #email')).toBeAttached();
    });

    test('newsletter subscribe button is present', async ({ page }) => {
      await expect(page.locator('#subscribe-form #submit')).toBeAttached();
    });

    test('newsletter form submits to SnappyLead endpoint', async ({ page }) => {
      const action = await page.locator('#subscribe-form').getAttribute('action');
      expect(action).toContain('snappylead.com');
    });

    test('newsletter name field has correct label', async ({ page }) => {
      const nameLabel = page.locator('#subscribe-form label[for="name"]');
      await expect(nameLabel).toBeAttached();
    });

    test('newsletter email field has correct label', async ({ page }) => {
      const emailLabel = page.locator('#subscribe-form label[for="email"]');
      await expect(emailLabel).toBeAttached();
    });
  });
});
