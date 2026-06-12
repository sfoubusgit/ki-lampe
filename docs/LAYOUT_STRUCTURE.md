# Layout Structure Documentation

## Overview

The KI-LAMPE layout uses a fixed left sidebar and a responsive main content area. The layout is designed to be minimal, clean, and work seamlessly across all screen sizes.

## Root Level

- **Zero margins and padding** at the HTML and body level
- Ensures content starts at the very edge of the viewport

## Sidebar

### Specifications
- **Width**: Exactly 128px (8rem / w-32)
- **Position**: Fixed to the left edge of the viewport
- **Height**: Full viewport height (100vh / h-screen)
- **Visibility**: Only visible on screens 1024px and above (desktop breakpoint)
- **Background**: Matches page background color
- **Z-index**: 20 (above main content)
- **Right Edge**: 1px vertical line with gradient from 10% opacity foreground color to transparent (left to right)
- **Content**: All elements vertically centered on the page

### Implementation
```tsx
<aside className="fixed left-0 top-0 h-screen w-32 bg-background z-20 hidden desktop:flex">
  {/* Sidebar content */}
</aside>
```

## Main Content Area

### Specifications
- **Left Margin**: 128px on large screens (1024px+) to account for sidebar
- **Maximum Width**: 1200px, then centered
- **Horizontal Padding**: 
  - 24px on mobile (px-6)
  - 32px on tablet/desktop (px-8)
- **Top Padding**: Zero (content starts immediately)
- **Background**: Matches page background color

### Implementation
```tsx
<main className="min-h-screen bg-background text-foreground">
  <div className="px-6 tablet:px-8 desktop:ml-32">
    <div className="max-w-[1200px] mx-auto">
      {/* Content */}
    </div>
  </div>
</main>
```

## Responsive Breakpoints

- **Mobile**: Default (below 768px)
  - Sidebar: Hidden
  - Main content: Full width with 24px horizontal padding
  
- **Tablet**: 768px and above
  - Sidebar: Hidden
  - Main content: Full width with 32px horizontal padding
  
- **Desktop**: 1024px and above
  - Sidebar: Visible (128px wide)
  - Main content: 128px left margin + 32px horizontal padding, max-width 1200px centered

## Component Structure

```
RootLayout
├── Sidebar (fixed, 128px wide, desktop only)
└── MainContent
    └── Content Container (max-width 1200px, centered)
        └── Page Content
```

## Usage Example

```tsx
import { MainContent } from "@/components/MainContent";

export default function Page() {
  return (
    <MainContent>
      <h1>Page Title</h1>
      <p>Page content goes here...</p>
    </MainContent>
  );
}
```

## CSS Classes Reference

### Sidebar
- `fixed left-0 top-0` - Fixed positioning
- `h-screen` - Full viewport height
- `w-32` - 128px width
- `bg-background` - Background color
- `z-20` - Z-index above main content
- `hidden desktop:flex` - Hidden on mobile/tablet, flex on desktop

### Main Content
- `px-6` - 24px horizontal padding (mobile)
- `tablet:px-8` - 32px horizontal padding (tablet+)
- `desktop:ml-32` - 128px left margin (desktop)
- `max-w-[1200px]` - Maximum width 1200px
- `mx-auto` - Centered horizontally

## Testing

To verify the layout:
1. **Mobile (< 768px)**: Sidebar should be hidden, content full width with 24px padding
2. **Tablet (768px - 1023px)**: Sidebar should be hidden, content full width with 32px padding
3. **Desktop (1024px+)**: Sidebar visible on left (128px), content has 128px left margin + 32px padding, max-width 1200px

Use browser dev tools to verify exact pixel measurements match the specification.
