# Copilot Repository Instructions — Zippykind QA Agentic Solution

## Project Summary

This repository is a **Playwright + TypeScript** end-to-end test automation framework for the [Zippykind](https://zippykind.com/) delivery management web application. It follows:

- **Page Object Model (POM)** design pattern — all page interactions live in `pages/`
- **Object-Oriented Programming (OOP)** — page classes extend a `BasePage` with shared helpers
- **Playwright Test** as the test runner

---

## Tech Stack & Versions

| Tool | Version / Notes |
|------|----------------|
| Node.js | 20 LTS |
| TypeScript | 5.x |
| Playwright | Latest (`@playwright/test`) |
| Package manager | `npm` |

---

## Repository Layout

```
zippykind_QA_Agentic_Solution/
├── pages/                  # Page Object Model classes (extend BasePage)
│   └── BasePage.ts         # Shared Playwright helpers (navigate, click, fill, etc.)
├── tests/
│   ├── smoke/              # Fast smoke tests (critical paths only)
│   ├── functional/         # Feature-level tests
│   └── regression/         # Full regression suite
├── fixtures/               # Shared test fixtures and test data
├── utils/                  # Utility helpers (e.g. data generators, env loaders)
├── .github/
│   ├── copilot-instructions.md   # This file
│   ├── agents/                   # Custom Copilot agent profiles
│   ├── skills/                   # Project-level Copilot skills
│   ├── instructions/             # Path-specific Copilot instructions
│   ├── docs/                     # Extended project documentation
│   └── workflows/                # GitHub Actions CI/CD
├── playwright.config.ts    # Playwright configuration
├── package.json
├── tsconfig.json
├── AGENTS.md               # Primary agent instructions (root)
└── README.md
```

---

## Bootstrap & Build Commands

Always run these commands in order from the repository root:

```bash
# Install dependencies (always run before building or testing)
npm install

# Install Playwright browsers (required on first setup or in CI)
npx playwright install --with-deps

# Type-check TypeScript
npx tsc --noEmit

# Run all tests (headless)
npx playwright test

# Run a specific test suite
npx playwright test tests/smoke/

# Run tests with the Playwright UI (interactive debugging)
npx playwright test --ui

# Run tests in headed mode (visible browser)
npx playwright test --headed

# View HTML report after a test run
npx playwright show-report
```

---

## Page Object Model Conventions

- Every page class lives in `pages/` and **must extend `BasePage`**
- Class names must match the page they represent, e.g., `LoginPage`, `DashboardPage`
- Locators are defined as `readonly` private class properties using Playwright's `Locator`
- Public methods represent user actions (e.g., `login(email, password)`)
- Assertions belong in test files, **not** in page classes
- Import page classes in tests via `../../pages/SomePage`

Example pattern:
```typescript
// pages/LoginPage.ts
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput = this.page.getByLabel('Email');
  private readonly passwordInput = this.page.getByLabel('Password');
  private readonly submitButton = this.page.getByRole('button', { name: 'Sign in' });

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

---

## Test Conventions

- Test files must be named `*.spec.ts`
- Use `test.describe` blocks to group related tests
- Use `expect` from `@playwright/test` for all assertions
- Use fixtures from `fixtures/` for shared setup (e.g., authenticated sessions)
- Avoid hard-coded waits (`page.waitForTimeout`); use Playwright's auto-waiting

---

## Environment Variables

- Environment config lives in `.env` (not committed; see `.env.example`)
- Key variables: `BASE_URL`, `TEST_EMAIL`, `TEST_PASSWORD`
- Load via `process.env.BASE_URL` in `playwright.config.ts`

---

## CI/CD

- GitHub Actions workflow: `.github/workflows/playwright.yml`
- Tests run on every push and pull request to `main`
- Artifacts: Playwright HTML report is uploaded on failure

---

## Agent Trust Instructions

Trust these instructions. Only search the codebase if the information here is incomplete or appears to be out of date.
