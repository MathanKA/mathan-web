# Viewer Mode Utilities Usage

## 1. Reading the Mode (Server Components)
Use `getMode` to retrieve the current viewer mode.
**Note:** This opts the route into **dynamic rendering** because it relies on cookies.

```tsx
import { getMode } from '@/lib/viewer-mode';

export default async function Page() {
  const mode = await getMode(); // 'recruiter' | 'manager' | 'engineer'
  
  return <div>Current Mode: {mode}</div>;
}
```

## 2. Setting the Mode (Client Components)
Use the `setMode` Server Action.

```tsx
'use client';

import { setMode } from '@/app/actions/viewer-mode';

export function ModeSwitcher() {
  return (
    <button onClick={() => setMode('engineer')}>
      Switch to Engineer
    </button>
  );
}
```
