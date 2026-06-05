---
name: pom-generator
description: >
  Scaffolds new Page Object Model (POM) classes for the Zippykind Playwright test framework.
  Use this skill when asked to create a new page object, add a new page class, or model a new page.
---

# POM Generator Skill

When asked to create a new Page Object Model class for the Zippykind application, follow this process:

## Step 1 — Gather Information

Before writing any code, identify:
1. **Page name:** What is this page called? (e.g., "Login Page", "Deliveries Dashboard")
2. **URL path:** What is the page's URL? (e.g., `/login`, `/dashboard/deliveries`)
3. **Key elements:** What interactive elements does the page have?
   - Form inputs (labels, placeholders)
   - Buttons (text/role)
   - Navigation links
   - Data tables or lists
4. **User actions:** What can a user do on this page?

If the user hasn't provided these details, ask before generating.

## Step 2 — Create the Class File

Create a new file in `pages/` following this exact template:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class <PageName>Page extends BasePage {
  // --- Locators (private readonly) ---
  private readonly <element> = this.page.getByRole('<role>', { name: '<name>' });
  // Add all locators here

  constructor(page: Page) {
    super(page);
  }

  // --- Navigation ---
  async navigate(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}/<path>`);
  }

  // --- Actions (one method per user action) ---
  async <actionName>(<params>): Promise<void> {
    // implementation
  }
}
```

## Step 3 — Naming Rules

- Class name: `PascalCase` + `Page` suffix (e.g., `LoginPage`, `DeliveriesPage`)
- File name: same as class name + `.ts` (e.g., `LoginPage.ts`)
- Locator property names: `camelCase`, descriptive (e.g., `emailInput`, `submitButton`)
- Method names: `camelCase` verbs (e.g., `login()`, `createDelivery()`)

## Step 4 — Locator Priority

Use locators in this order of preference:
1. `getByRole()` — for buttons, links, headings, inputs with accessible roles
2. `getByLabel()` — for form fields with labels
3. `getByText()` — for text content
4. `getByTestId()` — when `data-testid` attributes exist
5. `locator('css')` — last resort only

## Step 5 — Verify

After creating the file:
1. Run `npx tsc --noEmit` — must pass with zero TypeScript errors
2. Confirm the import path resolves correctly from test files
3. If a test exists that uses this page, run it: `npx playwright test --grep "<PageName>"`
