# KI-LAMPE Prompt Roadmap

This roadmap contains a series of prompts to build the exact page described in `KI-LAMPE-PERFECT-VISUAL-SPEC.md`. Use these prompts sequentially, one at a time, to recreate the complete blog.

## Prerequisites

Before starting, ensure you have:
- A modern web framework (Next.js, React, or similar)
- A CSS framework or styling solution (Tailwind CSS recommended)
- Access to the visual specification file: `KI-LAMPE-PERFECT-VISUAL-SPEC.md`

---

## Phase 1: Project Setup & Foundation

### Prompt 1: Project Initialization
```
Create a new web project for a blog called "KI-LAMPE". Set up the basic project structure with:
- A modern React-based framework (Next.js recommended)
- TypeScript configuration
- A CSS framework (Tailwind CSS recommended)
- Basic folder structure for components, pages, and styles

The project should be ready for building a minimal, calm blog interface.
```

### Prompt 2: Color System Setup
```
Set up the exact color system as specified in the visual spec. Create color variables/constants for:

Light Mode:
- Background: #FAFAF9 (warm off-white)
- Text: #1A1A1A (near-black)
- Dividers: #E5E5E4 (soft gray)
- Accent: #5B9BD5 (calm blue)
- Accent light: #7BB3E0
- Accent dark: #4A8BC4

Dark Mode:
- Background: #1A1A1A (dark gray)
- Text: #FAFAF9 (light off-white)
- Dividers: #3A3A3A (medium gray)
- Accent: #5B9BD5 (same blue)

Also set up text opacity levels:
- Normal: 100% opacity
- Muted: 70% opacity
- Subtle: 50% opacity

Ensure dark mode can be toggled and colors switch appropriately.
```

### Prompt 3: Typography System
```
Set up the typography system exactly as specified:
- Primary font: Inter (clean modern sans-serif)
- Monospace font: JetBrains Mono (for system elements only)

Font sizes (responsive):
- Extra Small: 10px
- Small: 12px
- Base: 16px mobile, 18px desktop
- Large: 18px mobile, 20px desktop
- Extra Large: 20px mobile, 24px desktop
- Huge: 36px mobile, 48px tablet, 60px desktop

Line heights: Relaxed (1.75-1.8) for body text
Letter spacing: Tight for headings, wide for uppercase labels
Font weights: Regular for body, Semibold for headings

Create utility classes or CSS variables for all typography settings.
```

### Prompt 4: Base Layout Structure
```
Create the base layout structure:
- Root level: Zero margins and padding
- Fixed left sidebar: 128px wide, full height, fixed to left edge
- Main content area: Starts 128px from left on large screens (1024px+)
- Sidebar hidden on screens below 1024px
- Main content max width: 1200px, centered
- Horizontal padding: 24px mobile, 32px tablet/desktop
- Top padding: Zero (content starts immediately)

Ensure the layout is responsive and works on all screen sizes.
```

---

## Phase 2: Sidebar Components

### Prompt 5: Sidebar Container
```
Create the left sidebar container component:
- Fixed position, 128px wide, full viewport height
- Background matches page background
- Right edge: 1px vertical line with gradient from 10% opacity foreground to transparent (left to right)
- All content vertically centered on the page
- Only visible on screens 1024px and wider
- Z-index: 20 (above main content)
```

### Prompt 6: Logo Component
```
Create the sidebar logo component:
- Text: "KI-LAMPE" in base font size, semibold weight
- Container with:
  - Background: 10% opacity accent blue (15% in dark mode)
  - Border: 1px, 20% opacity accent blue (25% in dark mode)
  - Small rounded corners (2-3px)
  - Padding: 10px horizontal, 6px vertical
- Hover state:
  - Background increases to 15% opacity (20% in dark mode)
  - Text color changes to full accent blue
  - Smooth 200ms transition
- Make it a clickable link to homepage
```

### Prompt 7: Divider Component
```
Create a divider component for the sidebar:
- Thin horizontal line, 48px wide, 1px height
- Color: Divider color (matches theme)
- Used to separate sidebar sections
```

### Prompt 8: Dark Mode Toggle
```
Create a dark mode toggle button:
- Lamp icon: 16x16px SVG
  - Light mode: Outline lamp, 50% opacity
  - Dark mode: Filled lamp, 100% opacity
- Button style:
  - Text color: Subtle (50% opacity)
  - Background: Transparent
  - Padding: 10px horizontal, 6px vertical
  - Small rounded corners
- Hover: Text becomes accent color, background becomes 5% opacity foreground
- Smooth 200ms transition
- Toggles between light and dark mode
```

### Prompt 9: Language Switcher
```
Create a language switcher button:
- Text: "EN" or "DE" in monospace font
- Same button styling as dark mode toggle
- Font: Monospace, uppercase, wide letter spacing
- Toggles between English and German
- Smooth 200ms transition on hover
```

### Prompt 10: Navigation Items
```
Create the sidebar navigation component with 7 items:
1. Home (⌂ symbol)
2. News (◉ symbol)
3. Reviews (▢ symbol)
4. Consoles (controller icon - simple line drawing SVG)
5. PC (◑ symbol)
6. Videos (▶ symbol)
7. More (⋯ symbol)

Each navigation item:
- Layout: Icon on top, label below (6px gap)
- Icon: Base font size, monospace, centered
- Label: 10px font size, monospace, uppercase, wide letter spacing
- Padding: 12px horizontal, 8px vertical
- Small rounded corners
- Inactive: Subtle color (50% opacity), transparent background
- Active: Accent blue text, 10% accent background (15% in dark mode)
- Hover: Accent blue text, 5% accent background (10% in dark mode)
- Smooth 200ms transition
- Stacked vertically with 20px gap between items
- Highlight active route/page
```

### Prompt 11: Complete Sidebar Assembly
```
Assemble the complete sidebar component:
- Logo at top (vertically centered)
- Divider
- Dark mode toggle
- Language switcher
- Divider
- Navigation items (7 items)

All elements should be vertically centered on the page as a group.
Ensure proper spacing and alignment.
```

---

## Phase 3: Homepage Components

### Prompt 12: Homepage Header
```
Create the homepage header section:
- Text: "MODULES · [number]" where number is the article count
- Style:
  - Monospace font
  - Uppercase
  - Subtle color (50% opacity)
  - 12px font size
  - Wide letter spacing
- Position: Top of content area
- Margin bottom: 32px mobile, 40px desktop
```

### Prompt 13: Article Grid Layout
```
Create the article grid layout:
- Single column on mobile (below 768px)
- Two columns on tablet/desktop (768px and above)
- Gap: 32px mobile, 40px tablet, 48px desktop
- Articles flow vertically, filling columns left to right
- Responsive and flexible
```

### Prompt 14: Article Card Component
```
Create the article card component with:

Card Container:
- Border: 1px, 15% opacity foreground color, small rounded corners
- Background: Transparent (matches page background)
- Flex column layout (vertical stacking)
- Overflow: Hidden (for images)
- Hover: Border becomes 30% opacity accent blue, subtle shadow appears
- Smooth 200ms transition

Article Image (if present):
- Height: 96px mobile, 128px desktop
- Width: 100% of card
- Image: Fills container, object-cover, 30% opacity, grayscale
- Background: Divider color
- Hover: Opacity increases to 50%, grayscale removed
- Smooth 500ms transition

Article Content:
- Padding: 24px mobile, 32px desktop
- Title: 20px mobile, 24px desktop, semibold, near-black
- Title hover: Changes to accent blue
- Arrow indicator (→): Subtle color, 12px, on right side of title
- Description: Muted color (70% opacity), relaxed line height, clamped to 3 lines
- Metadata labels at bottom (auto margin top)
```

### Prompt 15: Metadata Labels Component
```
Create the metadata labels component for article cards:
- Three labels displayed horizontally:
  - Topic (◉ symbol) - accent blue at 60% opacity
  - Level (▢ symbol) - accent blue at 60% opacity
  - Read Time (◐ symbol) - accent blue at 60% opacity
- Each label:
  - 12px font size, monospace, uppercase, wide letter spacing
  - Subtle text color (50% opacity)
  - 20px horizontal gap between labels
  - 8px vertical gap if wrapping
  - 6px gap between symbol and text
- Symbols in accent blue at 60% opacity
```

### Prompt 16: Homepage Content Assembly
```
Assemble the complete homepage:
- Header with "MODULES · [count]"
- Article grid with article cards
- Each card displays: image (if present), title, description, metadata labels
- Responsive layout (1 column mobile, 2 columns desktop)
- Proper spacing and alignment
- All hover effects working
```

---

## Phase 4: Article Page Components

### Prompt 17: Back Link Component
```
Create the back link component for article pages:
- Text: "← EXPLORE MORE" (or German "← MEHR ENTDECKEN")
- Style:
  - 14px font size
  - Monospace font
  - Uppercase
  - Subtle color (50% opacity)
  - Wide letter spacing
- Arrow: Left arrow (←), 4px margin right
- Hover: Text changes to accent blue, arrow translates 4px left
- Smooth 200ms transition
- Margin bottom: 48px mobile, 56px desktop
- Reading width container (85 characters max)
```

### Prompt 18: Article Header Component
```
Create the article header component:

Module Label:
- Text: "MODULE" (or "MODUL" in German)
- Monospace, uppercase, subtle color, 12px, wide letter spacing
- Margin bottom: 24px

Article Title:
- 36px mobile, 48px tablet, 60px desktop
- Semibold, tight line height (1.2-1.3), tight letter spacing
- Near-black color
- Margin bottom: 32px mobile, 40px desktop
- Border bottom: 1px divider, 16px padding bottom, 24px margin bottom

Article Description:
- 18px mobile, 20px desktop
- Muted color (70% opacity)
- Relaxed line height (1.75)
- Margin bottom: 40px mobile, 48px desktop
- Reading width container (85 characters max)

Metadata Section:
- Border top: 1px divider
- Padding top: 24px
- Same metadata labels as article cards
```

### Prompt 19: Article Content Styling
```
Style the article content area:
- Container: Reading width (85 characters max)
- Font size: 16px mobile, 18px desktop
- Line height: 1.75
- Text color: 90% opacity foreground

Headings:
- H1: 30px mobile, 36px tablet, 48px desktop, semibold, border bottom, tight spacing
- H2: 24px mobile, 30px tablet, 36px desktop, semibold, tight spacing
- H3: 20px mobile, 24px tablet, 30px desktop, semibold
- H4: 18px mobile, 20px desktop, semibold
- All headings: Generous top margin (40-80px), first heading no top margin

Paragraphs:
- Margin bottom: 28px mobile, 32px desktop
- Relaxed line height
- 90% opacity text color

Links:
- Accent blue color
- Underline with 2px offset
- Underline: 30% opacity accent blue
- Hover: Underline becomes 100% opacity accent blue
- 200ms transition

Lists:
- 24px mobile, 32px desktop margin
- 24px mobile, 32px desktop left margin
- 12px spacing between items

Code:
- Inline: Monospace, 90% size, divider background, 2px/4px padding, rounded
- Blocks: Divider background, 20px/24px padding, 1px border, rounded, horizontal scroll

Blockquotes:
- 4px left border, accent blue 30% opacity (40% dark)
- 24px/32px left padding
- 5% accent background (10% dark)
- Italic, muted color
- 40px/48px vertical margin
- 16px/20px vertical padding
- Rounded right corners

Images:
- Rounded corners, 1px border (10% opacity), 32px/40px vertical margin
- Max width 100%, auto height, block display

Tables:
- Full width, collapsed borders
- Headers: Semibold, 50% opacity divider background
- Cells: 1px divider border, 16px/12px padding

Horizontal Rules:
- 2px top border (divider color)
- 48px/64px vertical margin
```

### Prompt 20: Article Page Assembly
```
Assemble the complete article page:
- Back link at top
- Article header (module label, title, description, metadata)
- Article content with all styled elements (headings, paragraphs, links, lists, code, blockquotes, images, tables, horizontal rules)
- All spacing and typography exactly as specified
- Reading width container for optimal readability
```

---

## Phase 5: Footer Components

### Prompt 21: Footer Container
```
Create the footer container:
- Margin top: 80px mobile, 96px desktop
- Border top: 1px divider color
- Full width
- Max width: 1200px (same as main content), centered
- Padding: 32px mobile, 40px desktop vertical
- Horizontal padding: 24px mobile, 32px desktop
```

### Prompt 22: Footer Layout
```
Create the footer layout:
- Two-column grid on tablet/desktop (768px+)
- Single column on mobile
- Gap: 32px mobile, 48px desktop
```

### Prompt 23: Newsletter Section
```
Create the newsletter section in footer left column:

Heading:
- "NEWSLETTER" (or German equivalent)
- Monospace, uppercase, subtle color, 12px, wide letter spacing
- Margin bottom: 12px

Form:
- Flex column layout
- 8px gap between elements

Email Input:
- 1px border, 15% opacity foreground
- Small rounded corners
- 6px horizontal/vertical padding
- Matches page background
- Focus: Border becomes 30% opacity accent blue
- 200ms transition

Subscribe Button:
- 1px border, 20% opacity accent (30% dark)
- 10% accent background (15% dark)
- Accent text color
- Rounded corners
- 16px horizontal, 6px vertical padding
- Hover: Background increases to 15% opacity (20% dark)
- 200ms transition
```

### Prompt 24: Legal Links & Copyright
```
Create the legal links and copyright section in footer right column:

Legal Links:
- Right-aligned on desktop, left on mobile
- Flex wrap, horizontal flow
- 16px horizontal, 8px vertical gap
- 12px font size
- Subtle color (50% opacity)
- Hover: Changes to accent blue
- 200ms transition

Copyright:
- "© [current year] KI-LAMPE"
- 14px font size
- Subtle color (50% opacity)
- 16px margin top
```

### Prompt 25: Game of the Day Section
```
Create the Game of the Day section in footer:
- Border top: 1px divider color
- Margin top: 32px
- Padding top: 24px
- Text format: "GOFD : [GAME NAME]"
- Monospace, 10px font size, uppercase, wide letter spacing
- "GOFD": Subtle color (50% opacity)
- Colon: 20% opacity foreground
- Game name: Subtle color (50% opacity)
- 8px gap between elements
- Inline flex, horizontal layout
- Game name should rotate daily
```

### Prompt 26: Complete Footer Assembly
```
Assemble the complete footer:
- Newsletter section (left column)
- Legal links and copyright (right column)
- Game of the Day section (full width below)
- All spacing, typography, and styling exactly as specified
- Responsive layout working correctly
```

---

## Phase 6: Responsive Design & Polish

### Prompt 27: Responsive Breakpoints
```
Implement responsive breakpoints exactly as specified:
- Mobile: Default (below 768px)
- Tablet: 768px and above
- Desktop: 1024px and above (sidebar appears)

Ensure all components adapt correctly at these breakpoints:
- Sidebar hidden on mobile/tablet
- Grid layouts change appropriately
- Font sizes scale correctly
- Spacing adjusts for each breakpoint
- All measurements match the specification exactly
```

### Prompt 28: Transitions & Animations
```
Implement all transitions and animations:
- Most elements: 200ms ease transitions
- Image hovers: 500ms ease transitions
- Properties: Color, background, border, transform
- All transitions should be smooth and polished
- No jarring or abrupt changes
```

### Prompt 29: Interactive States
```
Implement all interactive states:

Hover:
- Subtle color changes to accent blue
- Background highlights (5-10% opacity)
- Borders may change color
- Smooth 200ms transition

Active:
- Accent blue text color
- 10-15% accent blue background
- Slightly more prominent than hover

Focus (form inputs):
- Border becomes 30% opacity accent blue
- No outline (clean look)

Disabled:
- 50% opacity on entire element
- No interaction possible

Ensure all interactive elements have proper states.
```

### Prompt 30: Spacing System Implementation
```
Implement the 4-pixel grid spacing system:
- Tiny: 4-8px (tight spacing)
- Small: 12-16px (close elements)
- Medium: 24-32px (normal spacing)
- Large: 40-48px (section spacing)
- Extra Large: 64-96px (major section breaks)

Ensure all spacing throughout the site follows this system consistently.
Verify no spacing is off-grid or inconsistent.
```

---

## Phase 7: Content Integration

### Prompt 31: Content System Setup
```
Set up a content management system:
- Markdown file support for articles
- Frontmatter parsing for metadata (title, description, topic, level, read time, image)
- Article slug generation
- Content directory structure
- Article listing functionality
- Single article page routing
```

### Prompt 32: Article Data Integration
```
Integrate article data with components:
- Homepage displays all articles in grid
- Article cards show: image, title, description, metadata
- Article pages display full content
- Metadata labels pull from article frontmatter
- Images load correctly (local and external)
- Reading time calculated automatically
```

---

## Phase 8: Final Polish & Verification

### Prompt 33: Visual Verification
```
Verify the page matches the visual specification exactly:
- All colors match hex codes and opacity levels
- All spacing matches specified measurements
- All typography matches font sizes and weights
- All components are in correct positions
- Sidebar is properly fixed and centered
- Main content area has correct margins
- Footer is properly positioned
- All responsive breakpoints work correctly
```

### Prompt 34: Dark Mode Verification
```
Verify dark mode works correctly:
- All colors invert appropriately
- Background becomes dark (#1A1A1A)
- Text becomes light (#FAFAF9)
- Dividers become medium gray (#3A3A3A)
- Accent color remains same but appears brighter
- All opacity levels remain same relative to base colors
- Transitions remain smooth
- Toggle works correctly
```

### Prompt 35: Excluded Elements Check
```
Verify the following elements are NOT present:
- No neon colors
- No dark sci-fi aesthetics
- No pixel art
- No "gamer" style fonts
- No flashy animations
- No progress bars
- No XP indicators
- No achievement badges
- No gamification UI elements
- No social media style feeds
- No dashboards
- No user profiles
- No loud call-to-action buttons
- No marketing language
- No engagement hacks

The design should be minimal, calm, and intelligent.
```

### Prompt 36: Final Quality Check
```
Perform final quality check:
- All spacing is perfectly consistent
- All colors match exactly as specified
- All transitions are smooth and polished
- All text is properly aligned
- All elements are in correct positions
- No layout shifts occur
- No white space issues exist
- Images load properly and display correctly
- All interactive elements respond immediately
- The page feels calm, intelligent, and minimal
- The design respects the reader's attention
- Everything matches the perfect visual specification
```

---

## Usage Instructions

1. **Start with Phase 1**: Complete all setup prompts in order
2. **Build incrementally**: Complete each phase before moving to the next
3. **Reference the spec**: Always refer to `KI-LAMPE-PERFECT-VISUAL-SPEC.md` for exact details
4. **Test frequently**: Test each component as you build it
5. **Verify spacing**: Use browser dev tools to verify exact pixel measurements
6. **Check colors**: Use color picker to verify hex codes match exactly
7. **Test responsive**: Check all breakpoints (mobile, tablet, desktop)
8. **Test dark mode**: Verify all colors invert correctly
9. **Polish last**: Save final polish and verification for the end

## Tips for Success

- **Be precise**: The specification is exact - follow it precisely
- **Use the 4px grid**: All spacing should be multiples of 4px
- **Test in both modes**: Always check light and dark mode
- **Verify measurements**: Use browser dev tools to check exact values
- **Keep it minimal**: When in doubt, choose the simpler, calmer option
- **Respect the reader**: Content-first, no distractions
- **Smooth transitions**: All interactions should feel polished
- **Consistent spacing**: Use the spacing system consistently throughout

## Expected Outcome

After completing all prompts, you should have:
- A perfectly matching visual implementation
- All components working correctly
- Responsive design at all breakpoints
- Smooth dark mode toggle
- Language switching functionality
- Content system integrated
- All interactive states working
- No visual flaws or inconsistencies
- A calm, minimal, intelligent blog interface

---

**Note**: Each prompt builds on the previous ones. Complete them in order for best results. If something doesn't match the spec, go back and adjust until it's exact.
