# Link Shortener Project - Agent Instructions

This directory contains comprehensive coding standards and guidelines for LLMs working on this project.

## Documentation Files

1. **[01-project-overview.md](./01-project-overview.md)**
   - Technology stack
   - Project structure
   - Key features
   - Development commands

2. **[02-typescript-standards.md](./02-typescript-standards.md)**
   - Type safety rules
   - Function typing
   - Null safety
   - Import path aliases

3. **[03-react-nextjs-standards.md](./03-react-nextjs-standards.md)**
   - App Router conventions
   - Server vs Client components
   - Data fetching patterns
   - Component structure

4. **[04-styling-standards.md](./04-styling-standards.md)**
   - Tailwind CSS usage
   - Color system
   - Responsive design
   - Dark mode support

5. **[05-database-standards.md](./05-database-standards.md)**
   - Drizzle ORM patterns
   - Schema definitions
   - Query patterns
   - Type safety

6. **[06-component-standards.md](./06-component-standards.md)**
   - Component architecture
   - shadcn/ui integration
   - Form patterns
   - Accessibility

7. **[07-file-structure.md](./07-file-structure.md)**
   - Directory organization
   - Naming conventions
   - Import ordering
   - Code splitting

8. **[08-authentication.md](./08-authentication.md)**
   - Clerk integration
   - Route protection
   - User management
   - Webhook handling

## Quick Reference

### Project Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **Auth**: Clerk

### Key Conventions

- **Components**: PascalCase names, kebab-case files
- **Imports**: Use `@/` path alias
- **Styling**: Tailwind utility classes with `cn()` helper
- **Types**: Explicit typing, avoid `any`
- **Server Actions**: Mark with `'use server'`
- **Client Components**: Mark with `'use client'`

### File Structure

```
/app          - Next.js pages and routes
/components   - Shared React components
  /ui         - shadcn/ui components
/db           - Database schema and client
/lib          - Utility functions
/actions      - Server actions
/types        - TypeScript types
/docs         - This documentation
```

## For LLM Agents

When working on this project:

1. **Read the relevant documentation** before making changes
2. **Follow TypeScript strict mode** - always provide explicit types
3. **Use the established patterns** - don't introduce new patterns without discussion
4. **Maintain consistency** - match the existing code style
5. **Consider accessibility** - include ARIA labels and keyboard navigation
6. **Test dark mode** - ensure components work in both themes
7. **Think mobile-first** - start with mobile layouts, enhance for larger screens

## Priority Guidelines

### Critical (Must Follow)

- TypeScript strict mode and type safety
- Next.js App Router conventions
- Authentication checks in server components
- Database schema consistency
- Tailwind class ordering

### Important (Should Follow)

- Component composition patterns
- File naming conventions
- Import organization
- Error handling
- Loading states

### Recommended (Nice to Have)

- Code comments for complex logic
- Accessibility enhancements
- Performance optimizations
- Comprehensive error messages

## Getting Started

To understand this project quickly:

1. Start with [01-project-overview.md](./01-project-overview.md)
2. Review the relevant technical standards:
   - TypeScript → [02-typescript-standards.md](./02-typescript-standards.md)
   - React/Next.js → [03-react-nextjs-standards.md](./03-react-nextjs-standards.md)
   - Styling → [04-styling-standards.md](./04-styling-standards.md)
3. Check examples in existing code
4. Follow the established patterns

## Questions?

When unsure about a standard:

1. Check the relevant documentation file
2. Look for similar patterns in existing code
3. Follow Next.js and React best practices
4. Prioritize type safety and accessibility

---

**Last Updated**: 2026-07-30  
**Maintained By**: Project Development Team
