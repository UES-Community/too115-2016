# Contributing to TOO115-2016

Thank you for your interest in contributing to **TOO115-2016 · Tecnologías Orientadas a Objetos**!

This document provides guidelines and instructions to help you contribute effectively.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Style Guide](#style-guide)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before contributing.

---

## How to Contribute

There are several ways to contribute:

1. **Report bugs** — Open an issue describing the bug and steps to reproduce it.
2. **Suggest features** — Open an issue with the `enhancement` label.
3. **Improve documentation** — Fix typos, clarify explanations, or add examples.
4. **Submit code changes** — Fix bugs or implement new features via Pull Requests.
5. **Improve UI/UX** — Enhance the visual design or user experience.

---

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.x
- [pnpm](https://pnpm.io/) ≥ 9.x

### Steps

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/too115-2016.git
cd too115-2016

# 3. Add the upstream remote
git remote add upstream https://github.com/UES-Community/too115-2016.git

# 4. Install dependencies
pnpm install

# 5. Start the development server
pnpm dev
```

---

## Commit Convention

This project uses **Conventional Commits**. All commit messages must follow this format:

```
<type>(<scope>): <short description>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Code formatting (no logic changes) |
| `refactor` | Code refactoring without feature/fix |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build process or tooling changes |
| `ci` | CI/CD configuration changes |

### Examples

```bash
feat(editor): add syntax highlighting for Python
fix(navbar): close dropdown on outside click
docs(readme): update installation instructions
chore(deps): upgrade next to v16.3
ci: add GitHub Actions workflow for deployment
```

---

## Pull Request Process

1. **Create a branch** from `main` with a descriptive name:
   ```bash
   git checkout -b feat/add-sorting-visualizer
   ```

2. **Make your changes** following the [Style Guide](#style-guide).

3. **Commit** with conventional commit messages.

4. **Push** your branch:
   ```bash
   git push origin feat/add-sorting-visualizer
   ```

5. **Open a Pull Request** against the `main` branch.

6. **Fill in** the PR template completely.

7. **Wait for review** — maintainers will review and provide feedback.

### PR Requirements

- [ ] Follows the commit convention
- [ ] No TypeScript errors (`pnpm build` passes)
- [ ] No lint errors (`pnpm lint` passes)
- [ ] Documentation updated if applicable
- [ ] Responsive design preserved

---

## Project Structure

```
too115-2016/
├── app/                    # Next.js App Router pages
│   ├── editor/             # Code editor page
│   ├── unidad/[slug]/      # Dynamic unit pages
│   ├── globals.css         # Global styles & design tokens
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── editor/             # Monaco code editor wrapper
│   ├── home/               # Home page sections
│   ├── layout/             # Navbar and Footer
│   ├── ui/                 # Reusable UI primitives
│   └── unit/               # Unit detail components
├── lib/
│   ├── course-data.ts      # Course curriculum data
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

---

## Style Guide

### TypeScript

- Use TypeScript with strict mode.
- Prefer `interface` over `type` for object shapes.
- Export types and interfaces explicitly.
- Avoid `any`; use `unknown` when the type is uncertain.

### React & Next.js

- Use **App Router** conventions (`page.tsx`, `layout.tsx`).
- Mark client components with `'use client'` only when necessary.
- Use `next/link` for internal navigation.

### CSS / Tailwind

- Use Tailwind utility classes.
- Follow the existing design token system defined in `globals.css`.
- Prefer responsive classes (`sm:`, `md:`, `lg:`) over media queries in CSS.

### Components

- One component per file.
- Keep components small and focused.
- Use `lucide-react` for icons.
- Use `framer-motion` for animations.

---

## Questions?

If you have questions, feel free to open an issue on GitHub.

Thank you for contributing!
