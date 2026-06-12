# Typography System Documentation

## Overview

The KI-LAMPE typography system uses Inter as the primary font and JetBrains Mono for system elements. All font sizes are responsive and follow the exact specifications.

## Font Families

### Primary Font: Inter
- Used for all body text and headings
- Clean, modern sans-serif
- Applied via `font-sans` class or default body font

### Monospace Font: JetBrains Mono
- Used only for system elements (labels, metadata, code)
- Applied via `font-mono` class

## Font Sizes (Responsive)

### Extra Small: 10px
```tsx
<span className="text-xs-custom">Extra small text</span>
```

### Small: 12px
```tsx
<span className="text-sm-custom">Small text</span>
```

### Base: 16px mobile, 18px desktop
```tsx
<p className="text-base-custom">Base text</p>
```

### Large: 18px mobile, 20px desktop
```tsx
<p className="text-lg-custom">Large text</p>
```

### Extra Large: 20px mobile, 24px desktop
```tsx
<h2 className="text-xl-custom">Extra large heading</h2>
```

### Huge: 36px mobile, 48px tablet, 60px desktop
```tsx
<h1 className="text-huge">Huge heading</h1>
```

## Line Heights

### Relaxed: 1.75-1.8
Used for body text and comfortable reading:
```tsx
<p className="leading-relaxed">Relaxed line height text</p>
```

### Tight: 1.2-1.3
Used for headings:
```tsx
<h1 className="leading-tight">Tight line height heading</h1>
```

## Letter Spacing

### Tight (Negative Tracking)
Used for headings:
```tsx
<h1 className="tracking-tight">Tight letter spacing</h1>
```

### Wide (Positive Tracking)
Used for uppercase labels:
```tsx
<span className="tracking-wide uppercase">WIDE LABEL</span>
```

## Font Weights

### Regular: 400
Used for body text:
```tsx
<p className="font-regular">Regular weight text</p>
```

### Semibold: 600
Used for headings and important text:
```tsx
<h1 className="font-semibold">Semibold heading</h1>
```

## Usage Examples

### Body Text
```tsx
<p className="text-base-custom leading-relaxed font-regular">
  This is body text with relaxed line height and regular weight.
</p>
```

### Heading
```tsx
<h1 className="text-huge font-semibold leading-tight tracking-tight">
  Large Heading
</h1>
```

### System Label (Monospace)
```tsx
<span className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50">
  SYSTEM LABEL
</span>
```

### Metadata
```tsx
<div className="text-xs-custom font-mono text-foreground/50">
  Metadata text
</div>
```

## CSS Variables

All typography values are available as CSS variables:

- `--font-size-xs`: 10px
- `--font-size-sm`: 12px
- `--font-size-base`: 16px (mobile) / 18px (desktop)
- `--font-size-lg`: 18px (mobile) / 20px (desktop)
- `--font-size-xl`: 20px (mobile) / 24px (desktop)
- `--font-size-huge`: 36px (mobile) / 48px (tablet) / 60px (desktop)
- `--line-height-relaxed`: 1.75
- `--line-height-tight`: 1.2
- `--letter-spacing-tight`: -0.02em
- `--letter-spacing-wide`: 0.05em

## TypeScript Utilities

Import typography utilities:
```tsx
import { typography, typographyClasses } from "@/lib/typography";

// Use constants
const baseSize = typography.sizes.base.mobile; // "16px"

// Use class names
<div className={typographyClasses.huge + " " + typographyClasses.semibold}>
  Heading
</div>
```

## Responsive Breakpoints

- **Mobile**: Default (below 768px)
- **Tablet**: 768px and above
- **Desktop**: 1024px and above

Font sizes automatically adjust at these breakpoints using CSS media queries.

## Best Practices

1. **Body Text**: Always use `leading-relaxed` for comfortable reading
2. **Headings**: Use `leading-tight` and `tracking-tight` for compact headings
3. **Labels**: Use `font-mono`, `uppercase`, and `tracking-wide` for system labels
4. **Metadata**: Use `text-xs-custom` or `text-sm-custom` with `font-mono` and reduced opacity
5. **Consistency**: Use the provided utility classes rather than custom values
