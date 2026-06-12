# Interactive States Documentation

## Overview

All interactive elements have proper states following the specification:
- **Hover**: Subtle color changes to accent blue, background highlights (5-10% opacity), borders may change color, smooth 200ms transition
- **Active**: Accent blue text color, 10-15% accent blue background, slightly more prominent than hover
- **Focus** (form inputs): Border becomes 30% opacity accent blue, no outline (clean look)
- **Disabled**: 50% opacity on entire element, no interaction possible

## Component States

### 1. ArticleCard
**File**: `components/ArticleCard.tsx`

**Hover**:
- ✅ Border: Changes to 30% opacity accent blue
- ✅ Shadow: Subtle shadow appears
- ✅ Title: Changes to accent blue
- ✅ Arrow: Changes to accent blue
- ✅ Image: Opacity increases to 50%, grayscale removed (500ms transition)
- ✅ Transition: 200ms ease

**Active**: (Not applicable - Link component handles this)

### 2. Logo
**File**: `components/Logo.tsx`

**Hover**:
- ✅ Text: Changes to accent blue
- ✅ Background: Increases to 15% opacity (20% dark mode)
- ✅ Transition: 200ms ease

**Active**:
- ✅ Text: Accent blue
- ✅ Background: 15% opacity (20% dark mode)
- ✅ More prominent than hover

### 3. DarkModeToggle
**File**: `components/DarkModeToggle.tsx`

**Hover**:
- ✅ Text: Changes to accent blue
- ✅ Background: 5% accent background (10% dark mode)
- ✅ Transition: 200ms ease

**Active**:
- ✅ Text: Accent blue
- ✅ Background: 10% accent background (15% dark mode)
- ✅ More prominent than hover

**Focus**:
- ✅ Focus ring for accessibility (button, not form input)

### 4. LanguageSwitcher
**File**: `components/LanguageSwitcher.tsx`

**Hover**:
- ✅ Text: Changes to accent blue
- ✅ Background: 5% accent background (10% dark mode)
- ✅ Transition: 200ms ease

**Active**:
- ✅ Text: Accent blue
- ✅ Background: 10% accent background (15% dark mode)
- ✅ More prominent than hover

**Focus**:
- ✅ Focus ring for accessibility (button, not form input)

### 5. NavItem
**File**: `components/NavItem.tsx`

**Hover**:
- ✅ Text: Changes to accent blue
- ✅ Background: 5% accent background (10% dark mode)
- ✅ Transition: 200ms ease

**Active** (when route is active):
- ✅ Text: Accent blue
- ✅ Background: 10% accent background (15% dark mode)
- ✅ More prominent than hover

### 6. BackLink
**File**: `components/BackLink.tsx`

**Hover**:
- ✅ Text: Changes to accent blue
- ✅ Arrow: Translates 4px left
- ✅ Transition: 200ms ease

**Active**:
- ✅ Text: Accent blue

### 7. NewsletterSection
**File**: `components/NewsletterSection.tsx`

**Email Input**:
- ✅ Focus: Border becomes 30% opacity accent blue
- ✅ No outline: `focus:outline-none`
- ✅ Transition: 200ms ease

**Subscribe Button**:
- ✅ Hover: Background increases to 15% opacity (20% dark mode)
- ✅ Active: Background 15% opacity (20% dark mode)
- ✅ Disabled: 50% opacity, `pointer-events-none`, `cursor-not-allowed`
- ✅ Transition: 200ms ease

### 8. LegalLinks
**File**: `components/LegalLinks.tsx`

**Hover**:
- ✅ Text: Changes to accent blue
- ✅ Transition: 200ms ease

**Active**:
- ✅ Text: Accent blue

## State Specifications

### Hover State
- ✅ Subtle color changes to accent blue
- ✅ Background highlights: 5-10% opacity
- ✅ Borders may change color (ArticleCard, Logo)
- ✅ Smooth 200ms transition
- ✅ Applied to: Buttons, Links, Cards, Navigation items

### Active State
- ✅ Accent blue text color
- ✅ 10-15% accent blue background
- ✅ Slightly more prominent than hover
- ✅ Applied to: Buttons (when pressed), Active navigation items, Links (when clicked)

### Focus State (Form Inputs)
- ✅ Border becomes 30% opacity accent blue
- ✅ No outline (clean look): `focus:outline-none`
- ✅ Applied to: Email input, Form inputs
- ✅ Note: Buttons have focus rings for accessibility (not form inputs)

### Disabled State
- ✅ 50% opacity on entire element: `disabled:opacity-50`
- ✅ No interaction possible: `disabled:pointer-events-none`
- ✅ Cursor indicates disabled: `disabled:cursor-not-allowed`
- ✅ Applied to: Submit button when submitting

## Verification Checklist

### Hover States
- ✅ All interactive elements have hover states
- ✅ Color changes to accent blue
- ✅ Background highlights (5-10% opacity)
- ✅ Borders change color where appropriate
- ✅ 200ms transition

### Active States
- ✅ Buttons have active states
- ✅ Links have active states
- ✅ Navigation items have active states
- ✅ Accent blue text color
- ✅ 10-15% accent blue background
- ✅ More prominent than hover

### Focus States
- ✅ Form inputs have focus states
- ✅ Border becomes 30% opacity accent blue
- ✅ No outline (clean look)
- ✅ Buttons have focus rings for accessibility

### Disabled States
- ✅ Disabled elements have 50% opacity
- ✅ No interaction possible
- ✅ Cursor indicates disabled state

## Best Practices

1. **Consistency**: All similar elements use the same state styling
2. **Accessibility**: Focus states are visible for keyboard navigation
3. **Visual Feedback**: All interactive elements provide clear feedback
4. **Smooth Transitions**: All state changes are smoothly animated
5. **Prominence**: Active states are more prominent than hover states

## Testing

To verify interactive states:
1. **Hover**: Hover over all interactive elements - should show accent blue color and background highlights
2. **Active**: Click/press buttons and links - should show more prominent active state
3. **Focus**: Tab through form inputs - should show accent blue border, no outline
4. **Disabled**: Disable submit button - should show 50% opacity, no interaction
5. **Transitions**: All state changes should be smooth (200ms)

## Component Summary

| Component | Hover | Active | Focus | Disabled |
|-----------|-------|--------|-------|----------|
| ArticleCard | ✅ | N/A | N/A | N/A |
| Logo | ✅ | ✅ | N/A | N/A |
| DarkModeToggle | ✅ | ✅ | ✅ | N/A |
| LanguageSwitcher | ✅ | ✅ | ✅ | N/A |
| NavItem | ✅ | ✅ | N/A | N/A |
| BackLink | ✅ | ✅ | N/A | N/A |
| NewsletterSection (Input) | N/A | N/A | ✅ | N/A |
| NewsletterSection (Button) | ✅ | ✅ | ✅ | ✅ |
| LegalLinks | ✅ | ✅ | N/A | N/A |

All interactive elements have proper states implemented! ✅
