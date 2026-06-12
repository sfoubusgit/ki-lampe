# KI-LAMPE Visual Design Specification

## Overall Layout

The page has a fixed left sidebar (128px wide) and a main content area that starts 128px from the left edge on large screens. On smaller screens, the sidebar is hidden. The entire page has zero margins and padding at the root level.

## Color System

### Light Mode
- Background: `#FAFAF9` (warm off-white, not pure white)
- Text: `#1A1A1A` (near-black)
- Dividers: `#E5E5E4` (soft gray)
- Accent: `#5B9BD5` (calm blue, used sparingly)
- Accent light: `#7BB3E0`
- Accent dark: `#4A8BC4`

### Dark Mode
- Background: `#1A1A1A` (dark gray, not pure black)
- Text: `#FAFAF9` (light off-white)
- Dividers: `#3A3A3A` (medium gray)
- Accent: `#5B9BD5` (same blue, slightly more visible)

### Text Opacity Levels
- Muted text: 70% opacity of foreground color
- Subtle text: 50% opacity of foreground color

## Typography

- Primary font: Inter (clean modern sans-serif)
- Monospace font: JetBrains Mono (only for small system/meta elements)
- Font sizes scale responsively (base, md, lg breakpoints)
- Line heights: relaxed (1.75-1.8 for body text)
- Letter spacing: tight for headings, wider for uppercase labels

## Left Sidebar (Fixed, 128px wide)

### Position
- Fixed to left edge of viewport
- Full height (top to bottom)
- Visible only on screens 1024px and wider
- Background matches page background
- Has a subtle 1px gradient shadow on the right edge (from 10% opacity foreground color to transparent, left to right)

### Content (Vertically Centered)
All sidebar content is vertically centered on the page.

#### Logo Section
- Text: "KI-LAMPE" in base font size, semibold weight
- Background: 10% opacity accent color (15% in dark mode)
- Border: 20% opacity accent color (25% in dark mode), 1px, rounded corners
- Padding: 10px horizontal, 6px vertical
- Hover: Background increases to 15% opacity (20% in dark mode), text color changes to accent color
- Transition: 200ms ease

#### Divider
- Thin horizontal line, 48px wide
- Color: divider color
- 1px height
- Appears after logo, before controls

#### Controls Section
Two buttons stacked vertically with 10px gap between them:

1. **Dark Mode Toggle**
   - Lamp icon (16x16px SVG)
   - Light mode: outline lamp, 50% opacity
   - Dark mode: filled lamp, full opacity
   - Button: subtle text color, rounded corners, padding 10px horizontal, 6px vertical
   - Hover: text changes to accent color, background becomes 5% opacity foreground

2. **Language Switcher**
   - Text: "EN" or "DE" in monospace font
   - Small font size, uppercase, wide letter spacing
   - Same button styling as dark mode toggle

#### Divider
- Same as first divider
- Appears after controls, before navigation

#### Navigation Items
Seven navigation links stacked vertically with 20px gap:

1. Home (⌂ symbol)
2. News (◉ symbol)
3. Reviews (▢ symbol)
4. Consoles (controller icon - simple line drawing)
5. PC (◑ symbol)
6. Videos (▶ symbol)
7. More (⋯ symbol)

Each navigation item:
- Icon: base font size, monospace, centered
- Label: 10px font size, monospace, uppercase, wide letter spacing, below icon
- Inactive: subtle text color (50% opacity)
- Active: accent text color, 10% accent background (15% in dark mode)
- Hover: text changes to accent, background becomes 5% accent (10% in dark mode)
- Padding: 12px horizontal, 8px vertical
- Rounded corners
- Transition: 200ms ease

## Main Content Area

### Container
- Maximum width: 1200px
- Centered horizontally
- Padding: 24px on mobile, 32px on tablet/desktop
- Starts immediately at top of page (no top margin or padding)

## Homepage

### Header Section
- Small text: "MODULES · [number]" in monospace, uppercase, subtle color, wide letter spacing
- Margin bottom: 32px on mobile, 40px on desktop

### Article Grid
- Two-column grid on tablet/desktop (768px+)
- Single column on mobile
- Gap: 32px on mobile, 40px on tablet, 48px on desktop
- Articles flow vertically

### Article Cards

Each card:
- Border: 1px, 15% opacity foreground color, rounded corners
- Background: transparent (matches page background)
- Hover: border becomes 30% opacity accent color, subtle shadow appears
- Overflow: hidden (for images)
- Flex column layout

#### Article Image (if present)
- Height: 96px on mobile, 128px on desktop
- Full width
- Image: fills container, object-cover, 30% opacity, grayscale
- Hover: opacity increases to 50%, grayscale removed
- Background: divider color
- Transition: 500ms ease

#### Article Content
- Padding: 24px on mobile, 32px on desktop
- Title: 20px on mobile, 24px on desktop, semibold, near-black text
- Hover: title color changes to accent
- Arrow indicator: subtle color, 12px font size, appears on right side of title
- Description: muted text color (70% opacity), relaxed line height, clamped to 3 lines
- Metadata labels: at bottom of card, auto margin top

#### Metadata Labels
Three labels shown with symbols:
- Topic (◉ symbol) - accent color at 60% opacity
- Level (▢ symbol) - accent color at 60% opacity
- Read Time (◐ symbol) - accent color at 60% opacity

Each label:
- 12px font size, monospace, uppercase, wide letter spacing
- Subtle text color
- Gap: 20px horizontal between labels, 8px vertical if wrapping
- Symbol and text separated by 6px gap

## Article Page

### Back Link
- Position: top of article content
- Text: "← EXPLORE MORE" (or German equivalent)
- Small font size, monospace, uppercase, subtle color
- Hover: text changes to accent, arrow translates left slightly
- Margin bottom: 48px on mobile, 56px on desktop
- Reading width container

### Article Header

#### Module Label
- Text: "MODULE" in monospace, uppercase, subtle color, 12px font size
- Wide letter spacing
- Margin bottom: 24px

#### Title
- Size: 36px on mobile, 48px on tablet, 60px on desktop
- Semibold weight, tight line height, tight letter spacing
- Near-black text
- Margin bottom: 32px on mobile, 40px on desktop
- Border bottom: 1px divider color, 16px padding bottom, 24px margin bottom

#### Description
- Size: 18px on mobile, 20px on desktop
- Muted text color (70% opacity)
- Relaxed line height
- Margin bottom: 40px on mobile, 48px on desktop
- Reading width container

#### Metadata Section
- Border top: 1px divider color
- Padding top: 24px
- Same metadata labels as article cards

### Article Content
- Container: reading width (85 characters max)
- Font size: 16px on mobile, 18px on desktop
- Line height: 1.75
- Text color: 90% opacity foreground

#### Headings
- H1: 30px mobile, 36px tablet, 48px desktop, semibold, border bottom, tight spacing
- H2: 24px mobile, 30px tablet, 36px desktop, semibold, tight spacing
- H3: 20px mobile, 24px tablet, 30px desktop, semibold
- H4: 18px mobile, 20px desktop, semibold
- All headings: generous top margin (40-80px depending on level), first heading has no top margin

#### Paragraphs
- Margin bottom: 28px on mobile, 32px on desktop
- Relaxed line height
- 90% opacity text color

#### Links
- Accent color
- Underline with 2px offset
- Underline color: 30% opacity accent
- Hover: underline becomes full accent color
- Transition: 200ms

#### Lists
- Margin: 24px on mobile, 32px on desktop
- Left margin: 24px on mobile, 32px on desktop
- List items: 12px spacing between items
- Bullet/number color: matches text

#### Code
- Inline: monospace, small font size, background divider color, padding 2px horizontal, 4px vertical, rounded corners
- Blocks: background divider color, padding 20px on mobile, 24px on desktop, rounded corners, border 1px 10% opacity foreground, horizontal scroll if needed

#### Blockquotes
- Left border: 4px accent color (30% opacity light, 40% dark)
- Left padding: 24px mobile, 32px desktop
- Background: 5% accent color (10% dark)
- Italic text
- Muted text color
- Margin: 40px mobile, 48px desktop vertical
- Padding: 16px mobile, 20px desktop vertical
- Rounded right corners

#### Images
- Rounded corners
- Border: 1px, 10% opacity foreground
- Margin: 32px mobile, 40px desktop vertical
- Max width: 100%
- Height: auto
- Display: block

#### Tables
- Full width
- Border collapse
- Margin: 32px mobile, 40px desktop vertical
- Headers: semibold, background 50% opacity divider color
- Cells: border 1px divider color, padding 16px horizontal, 12px vertical

#### Horizontal Rules
- Border top: 2px divider color
- Margin: 48px mobile, 64px desktop vertical

## Footer

### Position
- Margin top: 80px on mobile, 96px on desktop
- Border top: 1px divider color
- Full width

### Content Container
- Same max-width and padding as main content
- Padding: 32px mobile, 40px desktop vertical

### Layout
- Two-column grid on tablet/desktop
- Single column on mobile
- Gap: 32px mobile, 48px desktop

### Left Column: Newsletter
- Heading: "NEWSLETTER" in monospace, uppercase, subtle color, 12px font size, wide letter spacing
- Margin bottom: 12px
- Form: flex column, 8px gap
- Input: border 1px 15% opacity foreground, rounded corners, padding 6px horizontal, 6px vertical, focus border becomes 30% accent
- Button: border 1px 20% accent, background 10% accent (15% dark), accent text color, rounded corners, padding 16px horizontal, 6px vertical
- Button hover: background increases to 15% accent (20% dark)

### Right Column: Legal Links & Copyright
- Aligned right on desktop, left on mobile
- Links: subtle color, 12px font size, hover to accent
- Gap: 16px horizontal, 8px vertical between links
- Copyright: subtle color, 14px font size
- Gap: 16px between links section and copyright

### Game of the Day Section
- Border top: 1px divider color
- Margin top: 32px
- Padding top: 24px
- Text: "GOFD : [GAME NAME]" in monospace, 10px font size, uppercase, wide letter spacing
- Format: "GOFD" in subtle color, colon in 20% opacity foreground, game name in subtle color
- Gap: 8px between elements

## Responsive Breakpoints

- Mobile: default (below 768px)
- Tablet: 768px and above (md:)
- Desktop: 1024px and above (lg:)

## Transitions

All interactive elements use 200ms ease transitions for:
- Color changes
- Background changes
- Border changes
- Transform (for arrow in back link)

Image hover transitions: 500ms ease

## Spacing System

Vertical rhythm based on multiples of 4px:
- Small gaps: 8-12px
- Medium gaps: 16-24px
- Large gaps: 32-48px
- Extra large: 64-96px

## Visual Principles

1. **Minimal**: Very little UI noise, clean borders, subtle colors
2. **Calm**: Soft colors, generous spacing, relaxed typography
3. **Intelligent**: Clear hierarchy, structured layout, readable content
4. **Slightly Playful**: Through wording and structure, not flashy visuals
5. **Respectful**: Content-first, no engagement hacks, no loud CTAs

## Dark Mode Behavior

All colors invert appropriately:
- Background becomes dark
- Text becomes light
- Dividers become medium gray
- Accent color remains the same but may appear slightly brighter
- All opacity levels remain the same relative to their base colors

## Interactive States

- Hover: Subtle color changes, background highlights, border changes
- Active: Accent color with background tint
- Focus: Accent border on form inputs
- Disabled: 50% opacity

## No Visual Elements

- No neon colors
- No dark sci-fi aesthetics
- No pixel art
- No "gamer" fonts
- No flashy animations
- No progress bars
- No XP indicators
- No achievement badges
- No gamification UI elements
