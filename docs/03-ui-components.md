# UI Components Standards

## Core Principle

**ALL UI elements in this app use shadcn/ui. DO NOT create custom components.**

## shadcn/ui Integration

### Installation

```bash
npx shadcn@latest add [component-name]
```

### Available Components

Always use shadcn/ui components for:

- Buttons, inputs, forms
- Cards, dialogs, dropdowns
- Navigation, tabs, menus
- Data displays (tables, badges, avatars)
- Feedback (alerts, toasts, progress)

### Component Usage Pattern

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MyFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Customization

### Styling shadcn/ui Components

Customize using Tailwind classes, NOT by creating wrappers:

✅ **Correct:**

```tsx
<Button className="w-full bg-primary hover:bg-primary/90">Submit</Button>
```

❌ **Incorrect:**

```tsx
// Don't create custom button components
export function PrimaryButton() { ... }
```

### Using Variants

Use built-in variants when available:

```tsx
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>
```

## Component Composition

Build complex UI by **composing** shadcn/ui components:

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateLinkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Short Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">URL</Label>
            <Input id="url" placeholder="https://..." />
          </div>
          <Button type="submit">Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## When You Need a New Component

1. Check [shadcn/ui docs](https://ui.shadcn.com) first
2. Install the component: `npx shadcn@latest add [component]`
3. Import and use immediately
4. **Never** build from scratch

## Exception: Feature Components

Only create new files in `/components` for **feature-specific compositions**, not base UI:

✅ **Allowed:**

```tsx
// components/link-card.tsx - Feature component using shadcn/ui
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LinkCard({ link }) {
  return <Card>{/* Compose shadcn components for link feature */}</Card>;
}
```

❌ **Not Allowed:**

```tsx
// components/custom-button.tsx - Custom UI component
export function CustomButton() { ... }
```

## Quick Reference

| Need          | Use                             |
| ------------- | ------------------------------- |
| Button        | `@/components/ui/button`        |
| Form input    | `@/components/ui/input`         |
| Card layout   | `@/components/ui/card`          |
| Modal/popup   | `@/components/ui/dialog`        |
| Dropdown      | `@/components/ui/dropdown-menu` |
| Loading state | `@/components/ui/skeleton`      |
| Error message | `@/components/ui/alert`         |
| Data table    | `@/components/ui/table`         |

## Summary

- ✅ Always use shadcn/ui for ALL UI elements
- ✅ Customize with Tailwind classes
- ✅ Compose multiple components together
- ❌ Never create custom base UI components
- ❌ Never wrap shadcn components unnecessarily
