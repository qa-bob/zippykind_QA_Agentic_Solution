# .github Folder — Copilot Configuration Guide

This folder contains all GitHub Copilot customization files for the **Zippykind QA Agentic Solution** repository.
Use this README as the reference for what belongs here and why.

---

## Folder Structure

```
.github/
├── README.md                          ← You are here
├── copilot-instructions.md            ← Repository-wide Copilot instructions
├── agents/                            ← Custom Copilot agent profiles
│   └── qa-playwright-agent.md
├── skills/                            ← Project-level Copilot skills
│   ├── playwright-test-runner/
│   │   └── SKILL.md
│   └── pom-generator/
│       └── SKILL.md
├── instructions/                      ← Path-specific Copilot instructions (rules)
│   ├── playwright.instructions.md
│   └── pages.instructions.md
├── docs/                              ← Extended project documentation for agents
│   └── pom-conventions.md
└── workflows/                         ← GitHub Actions CI/CD (hooks)
    └── playwright.yml
```

---

## 1. Agents (`agents/`)

**What they are:** Custom agent profiles that define a specialized version of Copilot with particular expertise, tools, and instructions. Each `.md` file in this directory is a loadable agent profile.

**When to add a new agent:** When a recurring task type has unique requirements that differ from the default Copilot behavior — for example, a dedicated QA triage agent, an accessibility testing agent, or a test data generation agent.

**Naming convention:** `kebab-case-description.md` (e.g., `qa-playwright-agent.md`, `accessibility-checker.md`)

**Agents currently in this repo:**

| Agent File | Purpose |
|------------|---------|
| `qa-playwright-agent.md` | Specialized agent for writing, running, and debugging Playwright tests following POM conventions |

**How to use an agent in Copilot CLI:**
```bash
/agent                              # Browse and select from available agents
Use the qa-playwright-agent to...   # Mention it in your prompt
copilot --agent=qa-playwright-agent # Use the CLI flag
```

**Official docs:** https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview#use-custom-agents

---

## 2. Skills (`skills/`)

**What they are:** Folders containing a `SKILL.md` file (plus optional scripts) that give Copilot specialized instructions for a particular task. Skills are auto-loaded when the task context matches the skill description.

**When to add a new skill:** When you have a specialized, repeatable task where Copilot needs detailed procedural knowledge — for example, running tests, scaffolding page objects, or analyzing test reports.

**Structure:** Each skill is a subdirectory with its own `SKILL.md`:
```
skills/
└── skill-name/
    ├── SKILL.md       ← Required: name, description, instructions
    └── script.sh      ← Optional: helper scripts referenced in SKILL.md
```

**Skills currently in this repo:**

| Skill | Description |
|-------|-------------|
| `playwright-test-runner` | Runs Playwright tests, filters by suite, surfaces failures |
| `pom-generator` | Scaffolds new Page Object Model classes following repo conventions |

**See also:** `Skills.md` in the repo root for full usage guide.

**Official docs:** https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills

---

## 3. Rules / Instructions (`instructions/`)

**What they are:** Path-specific Copilot instruction files (`NAME.instructions.md`) that apply automatically when Copilot is working on files matching a glob pattern defined in each file's YAML frontmatter.

**When to add a new instructions file:** When a specific area of the codebase (e.g., page objects, test specs, utility files) needs Copilot to follow particular conventions that don't apply everywhere.

**Structure:** Each file starts with YAML frontmatter defining which files it applies to:
```markdown
---
applyTo: "pages/**/*.ts"
---
Your instructions here...
```

**Instructions currently in this repo:**

| File | Applies To | Purpose |
|------|-----------|---------|
| `playwright.instructions.md` | `tests/**/*.spec.ts` | Playwright test writing conventions |
| `pages.instructions.md` | `pages/**/*.ts` | Page Object Model class conventions |

**Note:** Instructions from `copilot-instructions.md` (repository-wide) and matching path-specific files are combined. Avoid conflicting rules between the two.

**Official docs:** https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions#creating-path-specific-custom-instructions

---

## 4. Hooks / Workflows (`workflows/`)

**What they are:** GitHub Actions workflow files that run automatically on repository events (push, pull request, schedule). In the context of Copilot, these also act as validation hooks — running tests, linting, and type checks on every change.

**When to add a new workflow:**
- A new CI check is required (e.g., accessibility audit, visual regression)
- A scheduled job is needed (e.g., nightly full regression)
- An automated report or notification is needed

**Workflows currently in this repo:**

| Workflow File | Trigger | Purpose |
|---------------|---------|---------|
| `playwright.yml` | push / pull_request to `main` | Run full Playwright test suite, upload HTML report on failure |

**Git hooks (local):** In addition to GitHub Actions, consider adding local Git hooks via a tool like [Husky](https://typicode.github.io/husky/):
- `pre-commit`: run `npx tsc --noEmit`
- `pre-push`: run `npx playwright test tests/smoke/`

---

## 5. Docs (`docs/`)

**What they are:** Extended documentation files for agents and contributors that go beyond what fits in `copilot-instructions.md` or `AGENTS.md`. These are referenced by agents and skills when more detail is needed.

**When to add a doc:**
- Detailed architectural decisions that affect how agents should generate code
- Extended conventions with many examples
- Testing strategy documentation

**Docs currently in this repo:**

| File | Purpose |
|------|---------|
| `pom-conventions.md` | Detailed POM class structure, naming rules, and examples for the Zippykind app |

---

## 6. Repository-Wide Instructions (`copilot-instructions.md`)

**What it is:** The primary Copilot instructions file. Applied globally to every Copilot request made in the context of this repository — in Copilot Chat, Copilot CLI, and Copilot code review.

**What it covers:**
- Project summary and tech stack
- Repository layout
- Build and test commands
- POM and test conventions
- Environment variables
- CI/CD overview

**Rule:** Keep this file under 2 pages. Use `docs/` for extended detail.

---

## Summary: When To Use Each Type

| Goal | Use |
|------|-----|
| Apply context to ALL Copilot requests in this repo | `copilot-instructions.md` |
| Apply context only when editing specific files | `instructions/*.instructions.md` |
| Create a specialized Copilot "expert" for a task type | `agents/*.md` |
| Give Copilot step-by-step procedural knowledge for recurring tasks | `skills/<name>/SKILL.md` |
| Automate CI validation on every push/PR | `workflows/*.yml` |
| Store detailed docs for agent/human reference | `docs/*.md` |
