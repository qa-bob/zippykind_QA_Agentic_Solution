# AGENTS.md — Zippykind QA Agentic Solution

> **Primary agent instructions** read by GitHub Copilot CLI, Copilot cloud agent, and other AI agents working in this repository.

---

## What This Repository Does

This is a **Playwright + TypeScript** end-to-end QA test automation framework for [Zippykind](https://zippykind.com/), a delivery management SaaS. The framework uses:

- **Page Object Model (POM)** — all page interactions are encapsulated in `pages/` classes
- **OOP principles** — page classes extend a shared `BasePage` for reuse
- **Playwright Test** as the test runner with TypeScript

---

## How To Work In This Repository

### Setup (run once)
```bash
npm install
npx playwright install --with-deps
```

### Run Tests
```bash
npx playwright test                   # all tests, headless
npx playwright test tests/smoke/      # smoke suite only
npx playwright test tests/functional/ # functional suite only
npx playwright test --headed          # visible browser
npx playwright test --ui              # interactive Playwright UI
```

### Type Check
```bash
npx tsc --noEmit
```

### View Last Report
```bash
npx playwright show-report
```

---

## Architecture Conventions You Must Follow

### Page Objects (`pages/`)
- All page classes **extend `BasePage`**
- Locators are `readonly` private class properties
- Methods represent **user actions only** (no assertions inside page classes)
- File names: `PascalCase.ts` matching the page name (e.g., `LoginPage.ts`)

### Tests (`tests/`)
- Files must end in `*.spec.ts`
- Grouped with `test.describe()` blocks
- Assertions use `expect` from `@playwright/test`
- Use `fixtures/` for shared setup (authentication, browser context, test data)
- No `page.waitForTimeout()` — rely on Playwright's built-in auto-waiting

### Utilities (`utils/`)
- Pure helper functions only (no Playwright page references)
- Examples: data generators, URL builders, environment loaders

### Fixtures (`fixtures/`)
- Extend Playwright's base `test` object
- Provide pre-authenticated sessions and reusable browser state

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Root URL of the Zippykind app under test |
| `TEST_EMAIL` | Test user email |
| `TEST_PASSWORD` | Test user password |

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

---

## Key Files

| File | Purpose |
|------|---------|
| `playwright.config.ts` | Global Playwright configuration |
| `tsconfig.json` | TypeScript compiler options |
| `pages/BasePage.ts` | Shared base class for all page objects |
| `.github/copilot-instructions.md` | Repository-wide Copilot instructions |
| `.github/agents/` | Custom Copilot agent profiles |
| `.github/skills/` | Project-level Copilot skills |
| `.github/instructions/` | Path-specific Copilot instructions |
| `.github/workflows/playwright.yml` | CI/CD pipeline |

---

## What Agents Should NOT Do

- Do not add assertions inside page object methods
- Do not use `page.waitForTimeout()` for synchronization
- Do not commit `.env` or any secrets
- Do not modify `playwright.config.ts` without understanding the full test matrix
- Do not create test files outside of `tests/smoke/`, `tests/functional/`, or `tests/regression/`
- Do not bypass the POM pattern by calling `page.locator()` directly in test files

---

## Validation Steps After Any Change

1. `npx tsc --noEmit` — must pass with zero errors
2. `npx playwright test tests/smoke/` — smoke suite must remain green
3. For new page objects, run the tests that use them
4. Check Playwright HTML report for any flaky or unexpected failures
