---
applyTo: "pages/**/*.ts"
---

# Page Object Model (POM) Instructions

Apply these rules whenever writing or editing files in the `pages/` directory.

## Class Structure

Every page class must:
1. Be named after the page it represents in `PascalCase` (e.g., `LoginPage`, `DashboardPage`)
2. Extend `BasePage` from `./BasePage`
3. Export the class as a named export

```typescript
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // ...
}
```

## Locators

- Locators must be declared as `private readonly` class properties
- Use Playwright's semantic locator methods in priority order:
  1. `getByRole()` — preferred for interactive elements
  2. `getByLabel()` — for form inputs
  3. `getByText()` — for text-based elements
  4. `getByTestId()` — when `data-testid` attributes are available
  5. `locator()` with CSS — last resort only
- Locator names must be descriptive and camelCase: `emailInput`, `submitButton`, `errorMessage`

```typescript
// ✅ Correct
private readonly emailInput = this.page.getByLabel('Email');
private readonly submitButton = this.page.getByRole('button', { name: 'Sign in' });

// ❌ Wrong — generic names, CSS fallback used unnecessarily
private readonly el1 = this.page.locator('#email');
private readonly btn = this.page.locator('button');
```

## Public Methods

- Public methods represent **user actions** only (e.g., `login()`, `fillForm()`, `selectOption()`)
- Each method should do one focused thing — avoid large multi-step methods
- Method names must be camelCase verbs: `login()`, `navigateTo()`, `selectDeliveryZone()`
- Methods should return `Promise<void>` unless they return a value for chaining

```typescript
async login(email: string, password: string): Promise<void> {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.submitButton.click();
}
```

## No Assertions in Page Objects

- **Never** use `expect()` inside a page class — assertions belong in test files
- Page classes may return locators or text for tests to assert against

```typescript
// ✅ OK — returns locator for test to assert
get errorMessage() {
  return this.page.getByRole('alert');
}

// ❌ Wrong — assertion in page class
async verifyErrorVisible() {
  await expect(this.errorMessage).toBeVisible(); // DO NOT DO THIS
}
```

## Navigation

- Use a `navigate()` method to go to the page's URL
- Use `process.env.BASE_URL` (from `playwright.config.ts`) for the base URL

```typescript
async navigate(): Promise<void> {
  await this.page.goto(`${process.env.BASE_URL}/login`);
}
```

## BasePage

- `BasePage` receives `page: Page` in its constructor and stores it as `protected page`
- All page classes call `super(page)` in their constructor
- Common helpers (scroll, wait for network idle, etc.) go in `BasePage`, not individual page classes

## File Naming

- File name must match the class name: `LoginPage.ts`, `DashboardPage.ts`
- One class per file
