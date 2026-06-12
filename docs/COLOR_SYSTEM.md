# Color System Documentation

## Overview

The KI-LAMPE color system is set up with CSS variables and Tailwind CSS integration. It supports both light and dark modes with smooth transitions.

## Color Values

### Light Mode
- **Background**: `#FAFAF9` (warm off-white)
- **Foreground (Text)**: `#1A1A1A` (near-black)
- **Divider**: `#E5E5E4` (soft gray)
- **Accent**: `#5B9BD5` (calm blue)
- **Accent Light**: `#7BB3E0`
- **Accent Dark**: `#4A8BC4`

### Dark Mode
- **Background**: `#1A1A1A` (dark gray)
- **Foreground (Text)**: `#FAFAF9` (light off-white)
- **Divider**: `#3A3A3A` (medium gray)
- **Accent**: `#5B9BD5` (same blue, appears brighter)

## Text Opacity Levels

- **Normal**: 100% opacity (`opacity-normal`)
- **Muted**: 70% opacity (`opacity-muted`) - for descriptions and secondary text
- **Subtle**: 50% opacity (`opacity-subtle`) - for labels and metadata

## Usage in Tailwind CSS

### Background Colors
```tsx
<div className="bg-background">...</div>
```

### Text Colors
```tsx
<p className="text-foreground">Normal text</p>
<p className="text-foreground/70">Muted text (70% opacity)</p>
<p className="text-foreground/50">Subtle text (50% opacity)</p>
```

### Accent Colors
```tsx
<span className="text-accent">Accent text</span>
<span className="text-accent-light">Light accent</span>
<span className="text-accent-dark">Dark accent</span>
```

### Divider Colors
```tsx
<div className="border-divider">...</div>
<div className="bg-divider">...</div>
```

## Using the Theme Hook

```tsx
"use client";

import { useTheme } from "@/lib/theme";

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## CSS Variables

All colors are available as CSS variables:
- `var(--color-background)`
- `var(--color-foreground)`
- `var(--color-divider)`
- `var(--color-accent)`
- `var(--color-accent-light)`
- `var(--color-accent-dark)`
- `var(--opacity-normal)`
- `var(--opacity-muted)`
- `var(--opacity-subtle)`

## TypeScript Constants

Import color constants directly:
```tsx
import { colors, opacity } from "@/lib/colors";

const lightBg = colors.light.background; // "#FAFAF9"
const mutedOpacity = opacity.muted; // 0.7
```

## Dark Mode Toggle

The theme is managed by the `ThemeProvider` in the root layout. The theme preference is saved to localStorage and persists across page reloads.

To toggle dark mode, use the `useTheme` hook:
```tsx
const { toggleTheme } = useTheme();
```
