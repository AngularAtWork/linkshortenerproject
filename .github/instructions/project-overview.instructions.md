---
description: Overview of the URL shortener project, including tech stack, structure, and key features.
---

# Project Overview

## Project Description

A modern URL shortener application built with Next.js 16, allowing users to create, manage, and track shortened links.

## Technology Stack

### Core Framework

- **Next.js 16.2.12** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Database & ORM

- **Drizzle ORM 1.0** - Type-safe ORM
- **Neon Database** - Serverless PostgreSQL
- **PostgreSQL** - Database dialect

### Authentication

- **Clerk** - Authentication and user management

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Base UI React** - Headless component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### Development Tools

- **ESLint** - Code linting
- **Drizzle Kit** - Database migrations
- **tsx** - TypeScript execution

## Project Structure

```
/app                  # Next.js App Router pages
/components           # React components
  /ui                 # shadcn/ui components
/db                   # Database schema and connection
  schema.ts           # Drizzle schema definitions
  index.ts            # Database client
/lib                  # Utility functions
/public               # Static assets
/drizzle              # Database migrations
```

## Key Features

- URL shortening with custom aliases
- User authentication via Clerk
- Link analytics and tracking
- Dark mode support
- Responsive design (mobile-first)
- Type-safe database operations

## Environment Variables

- `DATABASE_URL` - Neon PostgreSQL connection string
- Clerk authentication keys (managed by Clerk)

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
