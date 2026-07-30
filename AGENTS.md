# Agent Instructions

This file provides guidance for LLM agents working on the Link Shortener project.

---

## ⚠️ CRITICAL REQUIREMENT ⚠️

**BEFORE GENERATING ANY CODE, YOU MUST:**

1. **READ the relevant documentation file(s) from the `/docs` directory**
2. **UNDERSTAND the patterns, standards, and examples provided**
3. **FOLLOW the established conventions exactly**

**This is NOT optional. This is NOT a suggestion. This is a MANDATORY requirement.**

Failure to read the documentation BEFORE coding will result in code that doesn't meet project standards and will need to be rewritten.

---

## Quick Start

All detailed coding standards and guidelines are located in the `/docs` directory. **You MUST read the relevant .md file(s) BEFORE generating any code:**

- **[Project Overview](./docs/01-project-overview.md)** - Tech stack, project structure, features
- **[Authentication](./docs/02-authentication.md)** - Clerk authentication, protected routes, auth flow
- **[UI Components](./docs/03-ui-components.md)** - shadcn/ui usage, component standards, customization

## Core Principles

### 1. Type Safety First

- Use TypeScript strict mode
- Always provide explicit types
- Never use `any` type
- Use `@/` path alias for imports

### 2. Next.js Best Practices

- Server Components by default
- `'use client'` only when needed
- Server Actions for mutations
- Proper metadata for SEO

### 3. Consistent Styling

- Tailwind utility classes
- Mobile-first responsive design
- Dark mode support
- Use `cn()` for conditional classes

### 4. Database Integrity

- Use Drizzle ORM type-safe queries
- Define proper relationships
- Handle errors gracefully
- Use transactions for complex operations

### 5. Component Quality

- shadcn/ui for base components
- Composition over inheritance
- Accessible by default
- Loading and error states

## Tech Stack Summary

```
Framework:      Next.js 16 (App Router)
Language:       TypeScript 5 (strict mode)
Styling:        Tailwind CSS v4 + shadcn/ui
Database:       PostgreSQL (Neon) + Drizzle ORM
Authentication: Clerk
Icons:          Lucide React
```

## File Naming Conventions

```
Components:     kebab-case.tsx    (link-card.tsx)
Functions:      camelCase         (createLink, handleClick)
Types:          PascalCase        (LinkData, UserProfile)
Constants:      UPPER_SNAKE_CASE  (MAX_URL_LENGTH)
Routes:         kebab-case        (/user-settings)
```

## Before You Code - MANDATORY CHECKLIST

**⚠️ STOP! Before writing ANY code, you MUST complete these steps in order:**

1. 🔴 **READ the relevant `/docs` file(s)** - This is MANDATORY and MUST be done FIRST
2. ✅ Review similar existing code for patterns
3. ✅ Ensure type safety and error handling
4. ✅ Consider mobile, dark mode, and accessibility
5. ✅ Test both authenticated and unauthenticated states

**Remember:** Writing code without first reading the documentation is not acceptable and will result in non-compliant code that must be rewritten.

## Need More Details?

**Read the comprehensive documentation in the `/docs` directory BEFORE writing code.** Each file provides detailed examples, patterns, and best practices for specific areas of the project.

**Remember: Documentation first, code second. Always.**
