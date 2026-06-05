---
applyTo: "tests/**/*.spec.ts,tests/**/*.test.ts"
---

# Playwright Test Writing Instructions

Apply these rules whenever writing or editing Playwright test files (`*.spec.ts`).

## Test File Structure

- Every test file must import `{ test, expect }` from `@playwright/test`
- Group related tests inside `test.describe('Feature Name', () => { ... })` blocks
- Use `test.beforeEach` for setup shared across tests in a describe block
- Use fixtures from `fixtures/` for authentication and shared browser state — do not re-implement login logic in individual test files

## Page Object Usage

- Never call `page.locator()`, `page.getByRole()`, or any locator method directly inside a test
- Always instantiate a Page Object class and call its methods
- Import page objects from `../../pages/SomePage` (relative path from test file)

```typescript
// ✅ Correct
import { LoginPage } from '../../pages/LoginPage';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL(/dashboard/);
});

// ❌ Wrong — locators in test file
test('user can log in', async ({ page }) => {
  await page.fill('#email', 'user@example.com');
  await page.fill('#password', 'password');
  await page.click('button[type=submit]');
});
```

## Assertions

- Use `expect` from `@playwright/test` for all assertions
- Prefer role-based and text-based assertions over CSS/XPath
- Prefer `toBeVisible()`, `toHaveText()`, `toHaveURL()` over checking DOM attributes
- Avoid `toBeTruthy()` on Playwright Locators — use `toBeVisible()` instead

## No Hard-Coded Waits

- Never use `page.waitForTimeout(ms)` — use Playwright's built-in auto-waiting
- If waiting for a network response, use `page.waitForResponse()`
- If waiting for an element state, use `locator.waitFor({ state: 'visible' })`

## Test Isolation

- Each test must be independent and able to run in any order
- Use `test.beforeEach` / `test.afterEach` to reset state between tests
- Do not share mutable state between tests via module-level variables

## Test Naming

- Test names must be descriptive and follow the pattern: `<actor> can <action>`
- Example: `"user can log in with valid credentials"`
- Describe block names should be the feature or page: `"Login Page"`, `"Dashboard"`

## Tagging & Filtering

- Tag tests with `@smoke`, `@regression`, `@functional` in the test title where appropriate
- Example: `test('user can log in @smoke', ...)`
