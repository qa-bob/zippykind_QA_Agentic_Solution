# Page Object Model (POM) Conventions — Zippykind QA

> Extended reference document for agents and contributors on how POM classes are structured in this repository.
> See also: `.github/instructions/pages.instructions.md` for path-specific Copilot rules.

---

## Architecture Overview

```
pages/
├── BasePage.ts          ← Abstract base class (shared helpers, constructor)
├── LoginPage.ts         ← Login / authentication
├── DashboardPage.ts     ← Main dashboard after login
├── DeliveriesPage.ts    ← Deliveries list and management
└── ...
```

All page classes follow this hierarchy:

```
BasePage
  └── LoginPage
  └── DashboardPage
  └── DeliveriesPage
  └── ...
```

---

## BasePage Contract

`BasePage` must:
- Accept `page: Page` in its constructor
- Store `page` as `protected readonly page: Page`
- Provide shared utility methods used across all pages

```typescript
// pages/BasePage.ts
import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
```

---

## Locator Selection Strategy

Choose locators in this priority order:

| Priority | Method | When to Use |
|----------|--------|-------------|
| 1 | `getByRole()` | Buttons, links, headings, textboxes |
| 2 | `getByLabel()` | Form inputs associated with a `<label>` |
| 3 | `getByText()` | Static text, non-interactive elements |
| 4 | `getByTestId()` | When `data-testid` attributes are present |
| 5 | `locator('css')` | Last resort — fragile, avoid |
| ✗ | `locator('xpath')` | **Never use** — brittle and unreadable |

---

## Complete Page Class Example

```typescript
// pages/LoginPage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators — private, readonly, semantic
  private readonly emailInput = this.page.getByLabel('Email');
  private readonly passwordInput = this.page.getByLabel('Password');
  private readonly submitButton = this.page.getByRole('button', { name: 'Sign in' });
  private readonly errorAlert = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/login`);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Returns locator for test to assert against — not an assertion itself
  get errorMessage() {
    return this.errorAlert;
  }
}
```

---

## What Belongs in Page Classes vs. Test Files

| Concern | Page Class | Test File |
|---------|-----------|-----------|
| Locator definitions | ✅ | ❌ |
| User action methods | ✅ | ❌ |
| Assertions (`expect`) | ❌ | ✅ |
| Test setup (`beforeEach`) | ❌ | ✅ |
| Test data (emails, passwords) | ❌ | ✅ (via fixtures) |

---

## Adding a New Page

1. Create `pages/<PageName>Page.ts`
2. Extend `BasePage`
3. Define all locators as `private readonly` properties
4. Add `navigate()` if the page has a direct URL
5. Add one method per user action
6. Run `npx tsc --noEmit` to verify types
7. Create or update tests in `tests/` to use the new page class
