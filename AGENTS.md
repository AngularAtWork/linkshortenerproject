# Agent Instructions

This file provides guidance for LLM agents working on the Link Shortener project.

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

1. ✅ Review similar existing code for patterns
2. ✅ Ensure type safety and error handling
3. ✅ Consider mobile, dark mode, and accessibility
4. ✅ Test both authenticated and unauthenticated states

**Remember:** Writing code without first reading the documentation is not acceptable and will result in non-compliant code that must be rewritten.

## Need More Details?

**Remember: Documentation first, code second. Always.**
