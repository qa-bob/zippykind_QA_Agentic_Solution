---
name: playwright-test-runner
description: >
  Guides Copilot to run, filter, and debug Playwright tests for the Zippykind QA framework.
  Use this skill when asked to run tests, debug failing tests, or generate a test report.
allowed-tools: shell
---

# Playwright Test Runner Skill

When asked to run, debug, or report on Playwright tests, follow this process:

## Step 1 — Ensure Dependencies Are Installed

Always verify the environment is ready before running tests:
```bash
npm install
npx playwright install --with-deps
```

## Step 2 — Run the Appropriate Suite

Match the user's request to the correct suite:

| Request | Command |
|---------|---------|
| Run all tests | `npx playwright test` |
| Run smoke tests only | `npx playwright test tests/smoke/` |
| Run functional tests | `npx playwright test tests/functional/` |
| Run regression suite | `npx playwright test tests/regression/` |
| Run a specific file | `npx playwright test tests/smoke/login.spec.ts` |
| Run tests matching a name | `npx playwright test --grep "user can log in"` |
| Run with visible browser | `npx playwright test --headed` |
| Run with interactive UI | `npx playwright test --ui` |

## Step 3 — Interpret Results

After running:
1. Check the CLI output for PASSED / FAILED counts
2. If tests failed, read the error output carefully — note the test name, file, and line
3. Run `npx playwright show-report` to open the detailed HTML report

## Step 4 — Debug Failures

For failing tests:
1. Identify if the failure is a locator issue (element not found), timing issue, or assertion mismatch
2. Check if the corresponding Page Object's locator matches the current DOM
3. Check for hard-coded waits or race conditions
4. Run the failing test in headed mode to observe the browser: `npx playwright test --headed <test-file>`
5. Use Playwright's trace viewer for detailed step-by-step analysis:
   ```bash
   npx playwright test --trace on
   npx playwright show-report
   ```

## Step 5 — Report Results

Summarize:
- Total tests run / passed / failed / skipped
- Names and file locations of any failing tests
- Root cause analysis for each failure
- Recommended fixes
