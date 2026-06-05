# Skills.md — Copilot Skills for Zippykind QA

> This file documents the **Copilot agent skills** available in this repository and how to use them.
> Skills live in `.github/skills/` and are automatically discovered by GitHub Copilot CLI.

---

## What Are Skills?

Skills are folders containing a `SKILL.md` file plus optional scripts and resources. When Copilot is performing a task, it automatically loads relevant skills based on your prompt and the skill's description. Skills give Copilot specialized knowledge and tooling for your project without needing to re-explain context each session.

**Skill locations:**

| Type | Location |
|------|----------|
| Project skills (this repo) | `.github/skills/<skill-name>/SKILL.md` |
| Personal skills (all projects) | `~/.copilot/skills/<skill-name>/SKILL.md` |

---

## Available Skills in This Repository

### 1. `playwright-test-runner`
**Location:** `.github/skills/playwright-test-runner/`  
**Purpose:** Guides Copilot to run, filter, and debug Playwright tests correctly.  
**Use when:** You ask Copilot to run tests, debug a failing test, or generate a test run report.

```
Use the /playwright-test-runner skill to run smoke tests and show me failures
```

---

### 2. `pom-generator`
**Location:** `.github/skills/pom-generator/`  
**Purpose:** Guides Copilot to scaffold new Page Object Model classes following this repo's OOP conventions.  
**Use when:** You ask Copilot to create a new page object for a Zippykind page.

```
Use the /pom-generator skill to create a page object for the Zippykind login page
```

---

## How To Use Skills

### Let Copilot choose automatically
Just describe your task — Copilot will load the relevant skill:
```
Run the smoke tests and tell me which ones are failing
```

### Explicitly invoke a skill
Prefix the skill name with `/`:
```
Use the /playwright-test-runner skill to debug the failing checkout test
```

### Manage skills in Copilot CLI

```bash
/skills list          # See all available skills
/skills               # Toggle skills on/off
/skills info <name>   # Details about a specific skill
/skills reload        # Reload after adding or editing a skill
```

---

## Adding a New Skill

1. Create a directory under `.github/skills/<your-skill-name>/`
2. Create a `SKILL.md` file with YAML frontmatter and instructions
3. Optionally add helper scripts in the same directory
4. Reload skills in your Copilot CLI session with `/skills reload`

Minimal `SKILL.md` template:
```markdown
---
name: your-skill-name
description: What this skill does. When should Copilot use it?
---

Instructions for Copilot in plain language...
```

---

## Community Skills

Browse and install community-contributed skills from:
> https://awesome-copilot.github.com/skills/

Install a skill using GitHub CLI:
```bash
gh skill install <skill-name>
```
