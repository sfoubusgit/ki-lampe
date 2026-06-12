# Sidebar Container Documentation

## Overview

The sidebar container is a fixed-position element on the left side of the viewport. It serves as the foundation for all sidebar content (logo, navigation, controls).

## Specifications

### Dimensions & Position
- **Width**: Exactly 128px (w-32 in Tailwind)
- **Height**: Full viewport height (h-screen)
- **Position**: Fixed to the left edge of the viewport
- **Z-index**: 20 (above main content)

### Visibility
- **Visible**: Only on screens 1024px and wider (desktop breakpoint)
- **Hidden**: On screens below 1024px (mobile and tablet)

### Styling
- **Background**: Matches page background color (`bg-background`)
- **Content Alignment**: All content vertically centered on the page
- **Right Edge**: 1px vertical line with gradient
  - Gradient direction: Left to right
  - Left side: 10% opacity foreground color
  - Right side: Transparent
  - Creates a subtle fade effect

## Implementation Details

### CSS Classes
```tsx
className="fixed left-0 top-0 h-screen w-32 bg-background z-20 hidden desktop:flex flex-col items-center justify-center"
```

- `fixed left-0 top-0` - Fixed to top-left corner
- `h-screen` - Full viewport height
- `w-32` - 128px width (8rem)
- `bg-background` - Matches page background
- `z-20` - Above main content
- `hidden desktop:flex` - Hidden on mobile/tablet, flex on desktop
- `flex-col items-center justify-center` - Vertical centering

### Right Edge Gradient Line
```tsx
<div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-r from-foreground/10 to-transparent" />
```

- `absolute right-0` - Positioned on right edge
- `top-0 bottom-0` - Full height
- `w-px` - 1px width
- `bg-gradient-to-r` - Horizontal gradient (left to right)
- `from-foreground/10` - 10% opacity on left
- `to-transparent` - Transparent on right

## Content Structure

The sidebar uses a flex column layout with centered items:
```tsx
<div className="flex flex-col items-center gap-5">
  {/* Content will be added here */}
</div>
```

All sidebar content (logo, dividers, controls, navigation) will be added as children of this container and will be vertically centered as a group.

## Responsive Behavior

### Mobile & Tablet (< 1024px)
- Sidebar is completely hidden
- Main content uses full width
- No left margin needed

### Desktop (≥ 1024px)
- Sidebar is visible
- Fixed to left edge
- Main content has 128px left margin to account for sidebar

## Accessibility

- `aria-label="Sidebar navigation"` - Identifies the sidebar for screen readers
- Gradient line has `aria-hidden="true"` - Decorative element, not announced

## Next Steps

This container is ready for:
- Logo component (Prompt 6)
- Divider components (Prompt 7)
- Dark mode toggle (Prompt 8)
- Language switcher (Prompt 9)
- Navigation items (Prompt 10)
- Complete sidebar assembly (Prompt 11)
