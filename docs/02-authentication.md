# Authentication

## Overview

All authentication in this application is handled exclusively by **Clerk**. Do not implement or use any other authentication methods.

## Key Rules

### 1. Clerk Only

- ✅ Use Clerk for all authentication needs
- ❌ Never implement custom auth logic
- ❌ Never use alternative auth providers

### 2. Protected Routes

The `/dashboard` route is protected and requires authentication:

```tsx
// Use Clerk's middleware or auth checks
import { auth } from "@clerk/nextjs/server";

// In server components
const { userId } = await auth();
if (!userId) redirect("/");
```

### 3. Authentication Flow

**Homepage Redirect:**

- If user is authenticated → redirect to `/dashboard`
- If user is not authenticated → show landing page

**Dashboard Access:**

- If user is not authenticated → redirect to sign-in modal
- If user is authenticated → show dashboard content

### 4. Modal Authentication

Sign-in and sign-up must always launch as modals, not separate pages:

```tsx
// Use Clerk's built-in modal components
import { SignInButton, SignUpButton } from '@clerk/nextjs';

// Correct usage
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

## Implementation Checklist

- [ ] All auth uses Clerk components/hooks
- [ ] `/dashboard` is protected
- [ ] Homepage redirects authenticated users
- [ ] Sign-in/sign-up use `mode="modal"`
- [ ] No custom auth logic implemented

## Common Clerk Hooks

```tsx
// Client components
import { useUser, useAuth } from "@clerk/nextjs";

const { user, isLoaded, isSignedIn } = useUser();
const { signOut } = useAuth();

// Server components
import { auth, currentUser } from "@clerk/nextjs/server";

const { userId } = await auth();
const user = await currentUser();
```

## Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
