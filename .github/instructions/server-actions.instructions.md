---
description: Read this before implementing or modifying server actions for data mutations in the project.
---

# Server Actions Guidelines

## File Naming and Location

- Server action files **MUST** be named `actions.ts`
- Colocate `actions.ts` in the same directory as the component that calls it
- Example: `app/dashboard/actions.ts` for `app/dashboard/page.tsx`

## Server Action Implementation

### 1. Use Server Actions for All Mutations

All data mutations (create, update, delete) must be done via server actions.

```typescript
"use server";

export async function createLink(data: CreateLinkInput) {
  // implementation
}
```

### 2. TypeScript Types (Required)

- Use explicit TypeScript types for all parameters
- **NEVER** use the `FormData` TypeScript type
- Define input and return types clearly
- Return type is a discriminated union: **either** success with data **OR** error (never both)

```typescript
type CreateLinkInput = {
  url: string;
  slug?: string;
};

// Discriminated union: EITHER success with data OR just error
type ActionResponse<T = void> =
  | { success: true; data: T } // Success case: has success flag and data
  | { error: string }; // Error case: only has error message (no success property)
```

### 3. Zod Validation (Mandatory)

Validate all incoming data with Zod schemas:

```typescript
import { z } from "zod";

const linkSchema = z.object({
  url: z.string().url(),
  slug: z.string().optional(),
});

export async function createLink(data: CreateLinkInput) {
  const validated = linkSchema.parse(data);
  // continue with validated data
}
```

### 4. Authentication Check (First Step)

Always verify the user is authenticated before any database operations.
**Return error objects instead of throwing:**

```typescript
import { auth } from "@clerk/nextjs/server";

export async function createLink(
  data: CreateLinkInput,
): Promise<ActionResponse<Link>> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // continue with validated data
}
```

### 5. Database Operations via Helper Functions

- **NEVER** use Drizzle queries directly in server actions
- Use helper functions from the `/data` directory
- Keep server actions thin and delegated
- Wrap operations in try-catch and return error objects

```typescript
import { insertLink } from "@/data/links";

export async function createLink(
  data: CreateLinkInput,
): Promise<ActionResponse<Link>> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const validated = linkSchema.parse(data);

    // Use helper function from /data directory
    const link = await insertLink({ ...validated, userId });

    return { success: true, data: link };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
```

## Error Handling Pattern

**NEVER** throw errors in server actions. Always return an object with **either** `success: true` and `data` **OR** just `error` (no success property on errors):

```typescript
// ✅ CORRECT - Return error object (only error property)
if (!userId) {
  return { error: "Unauthorized" };
}

// ✅ CORRECT - Return success object (success: true, data)
const link = await insertLink(data);
return { success: true, data: link };

// ❌ WRONG - Never throw
if (!userId) {
  throw new Error("Unauthorized");
}

// ❌ WRONG - Never include success: false
return { success: false, error: "Unauthorized" };

// ❌ WRONG - Never return both data and error
return { success: true, error: "message", data: link };
```

## Client Component Usage

Server actions must be called from client components. Handle the response:

```typescript
"use client";

import { createLink } from "./actions";
import { toast } from "sonner";

export function CreateLinkForm() {
  async function handleSubmit(data: CreateLinkInput) {
    const result = await createLink(data);

    if (result.success) {
      toast.success("Link created!");
      // Use result.data
    } else {
      toast.error(result.error);
    }
  }

  // component implementation
}
```

## Complete Example Structure

```
app/
  dashboard/
    actions.ts          ← Server actions
    page.tsx            ← Client component calling actions
data/
  links.ts              ← Database helper functions
```

## Checklist

- [ ] File named `actions.ts` and colocated with component
- [ ] `'use server'` directive at top of file
- [ ] Explicit TypeScript types (not FormData)
- [ ] Return type: `ActionResponse<T>` (success with data OR just error)
- [ ] Zod validation for all inputs
- [ ] Authentication check before operations
- [ ] Database operations via `/data` helpers only
- [ ] Try-catch block wrapping all operations
- [ ] **NEVER** throw errors - always return error objects
