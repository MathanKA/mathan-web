# Header Alignment & Role Toggle Implementation

**Date:** 2025-12-17
**Task:** Align header menu with container and style according to background; Implement animated Role Toggle.

## Changes Overview

### 1. Role Toggle Component

- **File:** `src/components/role-toggle.tsx`
- **Description:** A new client component replacing the old `ModeSwitcher`.
- **Key Features:**
  - Uses `framer-motion` for the sliding pill animation (`layoutId="active-pill"`).
  - Integrated with `src/app/actions/viewer-mode` for server-side mode persistence.
  - Updates URL/cookies optimistically (via `useTransition`) but triggers a server refresh.
  - **Styles:** Glassmorphism (`bg-black/5` / `dark:bg-white/10` with blur).

### 2. Navigation Updates

- **File:** `src/components/nav.tsx`
- **Link Styling:**
  - Default: `text-zinc-400`
  - Hover: `text-white`
  - Active: `text-white font-semibold` (Logic added using `usePathname`).
- **Integration:** Replaced `ModeSwitcher` with `<RoleToggle />`.

### 3. Header Alignment

- **File:** `src/components/header-resizable.tsx`
- **Changes:**
  - Wrapped `NavBody` in a global `container mx-auto px-4` to enforce alignment with page content.
  - Fixed syntax errors (extra closing tags) that were present during refactor.
- **File:** `src/components/ui/resizable-navbar.tsx`
- **Changes:**
  - `NavBody`:
    - Removed `mx-auto` and `hidden` from internal classes to let parent container control positioning.
    - Updated animation logic: `width` transitions from `100%` to `auto` (pill).
    - Styling: Enhanced glassmorphism (`backdrop-blur-md`, `border-white/20`).

## Usage & Configuration

### Role Toggle usage

```tsx
import RoleToggle from "@/components/role-toggle";
// ...
<RoleToggle initialMode={mode} />;
```

Requires `mode` (ViewerMode) prop from server component/layout.

### Header Configuration

The header is now fixed and responsive.

- **Top Offset:** Fixed at `top-0`.
- **Scroll Trigger:** Pill shape triggers after 50px scroll (configurable in `resizable-navbar.tsx` > `useMotionValueEvent`).

## Assumptions & Dependencies

- Assumed `container` class is defined in Tailwind config (standard in this repo).
- Assumed `framer-motion` is installed and configured correctly.
- Assumed `src/app/actions/viewer-mode` exists and exports `setMode`.

## Verification Status

- **Linting:** Passed (with minor unrelated warnings).
- **Typecheck:** Passed.
- **Build:** Passed (`next build`).
- **Formatting:** Checked (`npm run format`).
