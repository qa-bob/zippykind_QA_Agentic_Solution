# Zippykind — QA Agentic Solution

> End-to-end test automation framework for [Zippykind](https://zippykind.com/) built with **Playwright + TypeScript**, following a **Page Object Model (POM)** design pattern and **OOP** principles. AI-accelerated with **GitHub Copilot**.

---

## 🏢 Company Profile

| Field | Details |
|-------|---------|
| **Company** | Zippykind |
| **Description** | Delivery Management Software |
| **Website** | [https://zippykind.com/](https://zippykind.com/) |
| **City** | Scottsdale, AZ |
| **Founded** | 2016 |
| **Leaders** | David Shields (Owner) |

---

## 🎯 Purpose of This Repository

This repository is a **QA Agentic Solution** — a Playwright-based end-to-end test automation framework that:

- Tests the Zippykind web application at https://zippykind.com/
- Follows **Page Object Model (POM)** for maintainable, reusable test code
- Uses **OOP principles** — all page classes extend a shared `BasePage`
- Runs in **GitHub Actions CI/CD** on every push and pull request
- Leverages **GitHub Copilot** (agents, skills, instructions) to accelerate test authoring and maintenance

---

## 🧪 Test Coverage

| Suite | Path | Purpose |
|-------|------|---------|
| Smoke | `tests/smoke/` | Critical path: login, core navigation |
| Functional | `tests/functional/` | Feature-level coverage |
| Regression | `tests/regression/` | Full known user-flow coverage |

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| TypeScript | Type-safe test code |
| GitHub Actions | CI/CD pipeline |
| GitHub Copilot | AI-assisted test generation & maintenance |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 20 LTS](https://nodejs.org/) or later
- A GitHub account with access to this repository

### 1. Clone and Install

```bash
git clone https://github.com/qa-bob/zippykind_QA_Agentic_Solution.git
cd zippykind_QA_Agentic_Solution

npm install
npx playwright install --with-deps
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and fill in BASE_URL, TEST_EMAIL, TEST_PASSWORD
```

### 3. Run Tests

```bash
# Run all tests (headless)
npx playwright test

# Run smoke suite only
npx playwright test tests/smoke/

# Run with visible browser (headed mode)
npx playwright test --headed

# Open Playwright interactive UI
npx playwright test --ui

# View the HTML report from the last run
npx playwright show-report
```

### 4. Type Check

```bash
npx tsc --noEmit
```

---

## 📁 Project Structure

```
zippykind_QA_Agentic_Solution/
├── pages/                    # Page Object Model classes
│   └── BasePage.ts           # Shared base class for all page objects
├── tests/
│   ├── smoke/                # Critical path tests
│   ├── functional/           # Feature-level tests
│   └── regression/           # Full regression suite
├── fixtures/                 # Shared Playwright fixtures (auth, test data)
├── utils/                    # Pure utility helpers
├── .github/
│   ├── README.md             # .github folder guide (Agents, Skills, Hooks, Rules, Docs)
│   ├── copilot-instructions.md  # Repository-wide Copilot instructions
│   ├── agents/               # Custom Copilot agent profiles
│   ├── skills/               # Project-level Copilot skills
│   ├── instructions/         # Path-specific Copilot rules
│   ├── docs/                 # Extended docs for agents and contributors
│   └── workflows/            # GitHub Actions CI/CD
├── AGENTS.md                 # Primary agent instructions (root)
├── Skills.md                 # Skills documentation and usage guide
├── playwright.config.ts      # Playwright configuration
├── package.json
├── tsconfig.json
├── .env.example              # Environment variable template
└── README.md
```

---

## 🤖 GitHub Copilot Setup

This repository is fully configured for GitHub Copilot. See `.github/README.md` for the complete guide to:

- **Agents** — custom agent profiles in `.github/agents/`
- **Skills** — reusable Copilot skills in `.github/skills/`
- **Rules** — path-specific instructions in `.github/instructions/`
- **Hooks** — GitHub Actions workflows in `.github/workflows/`
- **Docs** — extended documentation in `.github/docs/`

### Quick Start with Copilot CLI

```bash
# From this repo's directory
copilot

# Use the QA Playwright agent
/agent   # then select qa-playwright-agent

# Run tests via a skill
Use the /playwright-test-runner skill to run smoke tests

# Generate a new page object
Use the /pom-generator skill to create a page object for the Settings page
```

---

## 📋 Contributor Rules

All contributors — human and AI — must follow these rules:

### Architecture Rules

1. **All page interactions go in `pages/`** — never call Playwright locators directly in test files
2. **All page classes must extend `BasePage`** — no standalone page classes
3. **No assertions in page objects** — `expect()` belongs in test files only
4. **No `page.waitForTimeout()`** — use Playwright's built-in auto-waiting
5. **Test files must end in `*.spec.ts`** and live in the correct `tests/` subfolder

### Code Quality Rules

6. **TypeScript strict mode** — `npx tsc --noEmit` must pass before committing
7. **Smoke tests must stay green** — `npx playwright test tests/smoke/` must pass
8. **No secrets in code** — use `.env` (never commit `.env`)
9. **One page class per file** — file name must match class name

### Branching & PRs

10. Branch from `main` for new features or test additions
11. Branch name format: `feat/<description>`, `fix/<description>`, `test/<description>`
12. PR title must be descriptive (e.g., `test: add login page POM and smoke test`)
13. Every PR requires at least one passing CI run before merge

### Copilot / AI Rules

14. Copilot agents must follow `.github/copilot-instructions.md` and `AGENTS.md`
15. Review all AI-generated code before merging — validate locators against the live app
16. Use the `qa-playwright-agent` for all test-related Copilot tasks

---

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASE_URL` | Root URL of the Zippykind app | ✅ |
| `TEST_EMAIL` | Test user email address | ✅ |
| `TEST_PASSWORD` | Test user password | ✅ |

Copy `.env.example` to `.env` and fill in values. **Never commit `.env`.**

In CI, these are stored as [GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

---

*Part of the Phoenix Startup QA Agentic Solutions project.*
