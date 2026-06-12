# Transitions & Animations Documentation

## Overview

All interactive elements use smooth, polished transitions following the specification:
- **Most elements**: 200ms ease transitions
- **Image hovers**: 500ms ease transitions
- **Properties**: Color, background, border, transform
- **Timing function**: `ease` (not ease-in-out or other variants)
- **No jarring changes**: All state changes are smoothly animated

## Component Transitions

### 1. ArticleCard
**File**: `components/ArticleCard.tsx`

**Card Container**:
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers border, shadow)
- ✅ Timing: `ease`
- ✅ Hover: Border color, shadow

**Article Image**:
- ✅ Duration: 500ms (correct for image hovers)
- ✅ Properties: `transition-all` (covers opacity, grayscale)
- ✅ Timing: `ease`
- ✅ Hover: Opacity (30% → 50%), grayscale removal

**Title & Arrow**:
- ✅ Duration: 200ms
- ✅ Properties: `transition-colors` (color changes)
- ✅ Timing: `ease`
- ✅ Hover: Text color to accent

### 2. Logo
**File**: `components/Logo.tsx`
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers background, border, text color)
- ✅ Timing: `ease`
- ✅ Hover: Background opacity, text color

### 3. DarkModeToggle
**File**: `components/DarkModeToggle.tsx`
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers text color, background)
- ✅ Timing: `ease`
- ✅ Hover: Text color, background

### 4. LanguageSwitcher
**File**: `components/LanguageSwitcher.tsx`
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers text color, background)
- ✅ Timing: `ease`
- ✅ Hover: Text color, background

### 5. NavItem
**File**: `components/NavItem.tsx`
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers text color, background)
- ✅ Timing: `ease`
- ✅ Hover: Text color, background
- ✅ Active: Text color, background

### 6. BackLink
**File**: `components/BackLink.tsx`
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (text color) + `transition-transform` (arrow transform)
- ✅ Timing: `ease`
- ✅ Hover: Text color, arrow translate

### 7. NewsletterSection
**File**: `components/NewsletterSection.tsx`

**Email Input**:
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers border color)
- ✅ Timing: `ease`
- ✅ Focus: Border color

**Subscribe Button**:
- ✅ Duration: 200ms
- ✅ Properties: `transition-all` (covers background)
- ✅ Timing: `ease`
- ✅ Hover: Background opacity

### 8. LegalLinks
**File**: `components/LegalLinks.tsx`
- ✅ Duration: 200ms
- ✅ Properties: `transition-colors` (text color)
- ✅ Timing: `ease`
- ✅ Hover: Text color to accent

## Transition Properties Coverage

### Color Transitions
- ✅ Text color changes (hover states)
- ✅ Border color changes (focus states, hover states)
- ✅ Background color changes (hover states, active states)

### Background Transitions
- ✅ Background opacity changes (hover states)
- ✅ Background color changes (active states)

### Border Transitions
- ✅ Border color changes (focus states, hover states)
- ✅ Border opacity changes (hover states)

### Transform Transitions
- ✅ Transform translate (BackLink arrow)
- ✅ Other transforms can be added as needed

## Timing Functions

All transitions use the `ease` timing function:
- ✅ Not `ease-in-out`
- ✅ Not `ease-in`
- ✅ Not `ease-out`
- ✅ Not `linear`
- ✅ Consistent `ease` throughout

## Duration Standards

### 200ms (Most Elements)
- Card containers
- Buttons
- Links
- Navigation items
- Form inputs
- Text color changes
- Background changes
- Border changes

### 500ms (Image Hovers)
- Article card images
- Any image hover effects
- Opacity transitions on images
- Grayscale transitions

## Verification Checklist

- ✅ All interactive elements have transitions
- ✅ Most elements use 200ms duration
- ✅ Image hovers use 500ms duration
- ✅ All transitions use `ease` timing function
- ✅ Properties covered: color, background, border, transform
- ✅ No jarring or abrupt changes
- ✅ Smooth and polished feel
- ✅ Consistent across all components

## Best Practices

1. **Consistency**: All similar elements use the same transition duration
2. **Smoothness**: Use `ease` for natural-feeling animations
3. **Performance**: Use specific properties (`transition-colors`) when possible instead of `transition-all`
4. **Accessibility**: Transitions enhance UX without being distracting
5. **Polished**: All state changes are animated, no abrupt changes

## Testing

To verify transitions:
1. Hover over interactive elements - should smoothly transition
2. Focus on form inputs - should smoothly transition
3. Hover over article cards - card should transition in 200ms, image in 500ms
4. Check all buttons and links - should have smooth color/background transitions
5. Verify no abrupt changes - everything should animate smoothly
