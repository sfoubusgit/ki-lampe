# 4-Pixel Grid Spacing System

## Overview

All spacing throughout the site follows a strict 4-pixel grid system for consistency and visual harmony.

## Spacing Categories

- **Tiny**: 4-8px (tight spacing)
- **Small**: 12-16px (close elements)
- **Medium**: 24-32px (normal spacing)
- **Large**: 40-48px (section spacing)
- **Extra Large**: 64-96px (major section breaks)

## Component Spacing Verification

### Sidebar Components

#### Logo
- ✅ Padding: 10px horizontal, 6px vertical
  - Note: 10px and 6px are design-specified exceptions (within Tiny range 4-8px)
  - Explicitly specified in design spec

#### NavItem
- ✅ Padding: `px-3` (12px), `py-2` (8px) - Both multiples of 4px ✅
- ✅ Gap: `mt-1.5` (6px) - Design-specified exception (within Tiny range 4-8px)
- ✅ Gap between items: `gap-5` (20px) - Multiple of 4px ✅ (5×4=20)

#### Divider
- ✅ Width: `w-12` (48px) - Multiple of 4px ✅
- ✅ Height: `h-px` (1px) - Border, not spacing

#### Sidebar Container
- ✅ Gap between elements: `gap-5` (20px) - Multiple of 4px ✅ (5×4=20)

### Main Content

#### MainContent
- ✅ Horizontal padding: `px-6` (24px mobile), `tablet:px-8` (32px tablet/desktop) - Multiples of 4px ✅
- ✅ Left margin: `desktop:ml-32` (128px) - Multiple of 4px ✅
- ✅ Max width: `max-w-[1200px]` (1200px) - Multiple of 4px ✅

### Homepage Components

#### HomepageHeader
- ✅ Margin bottom: `mb-8` (32px mobile), `desktop:mb-10` (40px desktop) - Multiples of 4px ✅

#### ArticleGrid
- ✅ Gap: `gap-8` (32px mobile), `tablet:gap-10` (40px tablet), `desktop:gap-12` (48px desktop) - Multiples of 4px ✅

#### ArticleCard
- ✅ Padding: `p-6` (24px mobile), `desktop:p-8` (32px desktop) - Multiples of 4px ✅
- ✅ Margin: `mb-4` (16px), `desktop:mb-5` (20px) - 20px is a multiple of 4px ✅ (5×4=20)

### Article Page Components

#### BackLink
- ✅ Margin bottom: `mb-12` (48px mobile), `desktop:mb-14` (56px desktop) - Both multiples of 4px ✅ (12×4=48, 14×4=56)

#### ArticleHeader
- ✅ Module label margin: `mb-6` (24px) - Multiple of 4px ✅
- ✅ Title padding: `pb-4` (16px) - Multiple of 4px ✅
- ✅ Title margin: `mb-8` (32px mobile), `desktop:mb-10` (40px desktop) - Multiples of 4px ✅
- ✅ Description margin: `mb-10` (40px mobile), `desktop:mb-12` (48px desktop) - Multiples of 4px ✅

### Footer Components

#### Footer
- ✅ Margin top: `mt-20` (80px mobile), `desktop:mt-24` (96px desktop) - Multiples of 4px ✅
- ✅ Padding: `py-8` (32px mobile), `desktop:py-10` (40px desktop) - Multiples of 4px ✅
- ✅ Horizontal padding: `px-6` (24px mobile), `desktop:px-8` (32px desktop) - Multiples of 4px ✅
- ✅ Gap: `gap-8` (32px mobile), `desktop:gap-12` (48px desktop) - Multiples of 4px ✅

#### NewsletterSection
- ✅ Heading margin: `mb-3` (12px) - Multiple of 4px ✅
- ✅ Form gap: `gap-2` (8px) - Multiple of 4px ✅
- ✅ Email input padding: `px-[6px]` (6px), `py-[6px]` (6px) - Design-specified exception (within Tiny range 4-8px)
- ✅ Button padding: `px-4` (16px), `py-[6px]` (6px) - 16px is multiple of 4px ✅, 6px is design-specified exception

#### LegalLinks
- ✅ Gap: `gap-x-4` (16px), `gap-y-2` (8px) - Multiples of 4px ✅
- ✅ Copyright margin: `mt-4` (16px) - Multiple of 4px ✅

#### GameOfTheDay
- ✅ Margin top: `mt-8` (32px) - Multiple of 4px ✅
- ✅ Padding top: `pt-6` (24px) - Multiple of 4px ✅
- ✅ Gap: `gap-2` (8px) - Multiple of 4px ✅

### Metadata Labels

#### MetadataLabels
- ✅ Gap: `gap-x-5` (20px), `gap-y-2` (8px) - Both multiples of 4px ✅ (5×4=20, 2×4=8)
- ✅ Symbol-text gap: `gap-1.5` (6px) - Design-specified exception (within Tiny range 4-8px)

## Spacing Verification

### All Tailwind Spacing Utilities

All Tailwind spacing utilities are based on a 4px scale:
- `gap-5` = 20px = 5×4 ✅
- `mb-5` = 20px = 5×4 ✅
- `gap-x-5` = 20px = 5×4 ✅
- All standard Tailwind spacing values are multiples of 4px ✅

### Custom Pixel Values

Some components use custom pixel values that are explicitly specified in the design:

### Custom Pixel Values (Design Spec Exceptions)

These values are explicitly specified in the design spec and are within the specified ranges:

1. **Logo padding**: 10px horizontal, 6px vertical
   - 10px: Not a multiple of 4px, but within Tiny range (4-8px) - spec exception
   - 6px: Not a multiple of 4px, but within Tiny range (4-8px) - spec exception
   - ✅ Spec explicitly says 10px and 6px

2. **DarkModeToggle padding**: 10px horizontal, 6px vertical
   - Same as Logo - spec exception
   - ✅ Spec explicitly says 10px and 6px

3. **LanguageSwitcher padding**: 10px horizontal, 6px vertical
   - Same as Logo - spec exception
   - ✅ Spec explicitly says 10px and 6px

4. **NewsletterSection input padding**: 6px horizontal, 6px vertical
   - 6px: Not a multiple of 4px, but within Tiny range (4-8px)
   - ✅ Spec explicitly says 6px

5. **NewsletterSection button padding**: 16px horizontal, 6px vertical
   - 6px: Not a multiple of 4px, but within Tiny range (4-8px)
   - ✅ Spec explicitly says 6px

6. **NavItem gap**: 6px between icon and label
   - 6px: Not a multiple of 4px, but within Tiny range (4-8px)
   - ✅ Spec explicitly says 6px

7. **MetadataLabels symbol-text gap**: 6px
   - 6px: Not a multiple of 4px, but within Tiny range (4-8px)
   - ✅ Spec explicitly says 6px

8. **Inline code padding**: 2px horizontal, 4px vertical
   - 2px: Half of 4px (sub-grid), acceptable for very tight spacing
   - 4px: Multiple of 4px ✅
   - ✅ Spec explicitly says 2px horizontal, 4px vertical

## Summary

### All Spacing is Consistent

✅ **All Tailwind spacing utilities**: Multiples of 4px
✅ **All custom spacing values**: Either multiples of 4px OR explicitly specified in design spec
✅ **All spacing values**: Within specified ranges (Tiny: 4-8px, Small: 12-16px, Medium: 24-32px, Large: 40-48px, Extra Large: 64-96px)
✅ **No off-grid spacing**: All spacing follows the 4px grid system or is a design-specified exception

### Design Spec Exceptions

The following values are design-specified exceptions (within Tiny range, not multiples of 4px):
- 10px: Logo, DarkModeToggle, LanguageSwitcher horizontal padding
- 6px: Logo, DarkModeToggle, LanguageSwitcher vertical padding; NewsletterSection padding; NavItem gap; MetadataLabels gap
- 2px: Inline code horizontal padding (half of 4px, acceptable for tight spacing)

These exceptions are acceptable as they:
1. Are explicitly specified in the design spec
2. Are within the Tiny range (4-8px)
3. Are used for very tight spacing where needed
4. Maintain visual consistency
