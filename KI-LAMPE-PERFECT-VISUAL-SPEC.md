# KI-LAMPE Perfect Visual Specification

## Page Overview

A bright, minimal blog with a fixed left sidebar and main content area. The design is calm, intelligent, and slightly playful. Everything feels like a quiet lab where ideas are tested.

## Color Palette

### Light Mode
- **Page Background**: Warm off-white (#FAFAF9) - not pure white, has a slight warm tone
- **Text Color**: Near-black (#1A1A1A) - almost black but not pure black
- **Divider Lines**: Soft gray (#E5E5E4) - very light gray, barely visible
- **Accent Color**: Calm blue (#5B9BD5) - used sparingly for links, active states, and highlights
- **Accent Light**: Lighter blue (#7BB3E0) - for hover states
- **Accent Dark**: Darker blue (#4A8BC4) - for pressed states

### Dark Mode
- **Page Background**: Dark gray (#1A1A1A) - not pure black, has a slight gray tone
- **Text Color**: Light off-white (#FAFAF9) - almost white but not pure white
- **Divider Lines**: Medium gray (#3A3A3A) - visible but subtle
- **Accent Color**: Same blue (#5B9BD5) - appears slightly brighter against dark background

### Text Opacity Variations
- **Normal Text**: 100% opacity of foreground color
- **Muted Text**: 70% opacity of foreground color - for descriptions and secondary text
- **Subtle Text**: 50% opacity of foreground color - for labels and metadata

## Typography

### Font Families
- **Body Text**: Inter - clean, modern sans-serif font
- **System Elements**: JetBrains Mono - monospace font, only for small labels, metadata, and code

### Font Sizes (Responsive)
- **Extra Small**: 10px - for very small labels
- **Small**: 12px - for metadata and labels
- **Base**: 16px mobile, 18px desktop - for body text
- **Large**: 18px mobile, 20px desktop - for descriptions
- **Extra Large**: 20px mobile, 24px desktop - for card titles
- **Huge**: 36px mobile, 48px tablet, 60px desktop - for article titles

### Typography Characteristics
- **Line Height**: Relaxed (1.75-1.8) for comfortable reading
- **Letter Spacing**: 
  - Tight for headings (negative tracking)
  - Wide for uppercase labels (positive tracking)
- **Font Weight**: 
  - Regular for body text
  - Semibold for headings and important text

## Layout Structure

### Overall Page
- Zero margins and padding at the root level
- Content flows naturally from top to bottom
- No fixed header at the top

### Left Sidebar
- **Width**: Exactly 128 pixels
- **Position**: Fixed to the left edge of the viewport
- **Height**: Full viewport height (top to bottom)
- **Visibility**: Only visible on screens 1024px wide and above
- **Background**: Matches page background color
- **Right Edge**: 1 pixel vertical line, gradient from 10% opacity foreground color to transparent (left to right)
- **Content**: All elements vertically centered on the page

### Main Content Area
- **Left Margin**: 128 pixels on large screens (to account for sidebar)
- **Maximum Width**: 1200 pixels, then centered
- **Horizontal Padding**: 24 pixels on mobile, 32 pixels on tablet/desktop
- **Top Padding**: Zero - content starts immediately

## Left Sidebar Components

### Logo
- **Text**: "KI-LAMPE" in base font size, semibold weight
- **Container**: 
  - Background: 10% opacity accent blue (15% in dark mode)
  - Border: 1 pixel, 20% opacity accent blue (25% in dark mode)
  - Rounded corners: Small radius (2-3 pixels)
  - Padding: 10 pixels horizontal, 6 pixels vertical
- **Hover State**: 
  - Background increases to 15% opacity (20% in dark mode)
  - Text color changes to full accent blue
  - Smooth 200ms transition

### Dividers
- **Appearance**: Thin horizontal line
- **Width**: 48 pixels
- **Height**: 1 pixel
- **Color**: Divider color (matches theme)
- **Position**: After logo, after controls section

### Dark Mode Toggle Button
- **Icon**: Lamp symbol, 16x16 pixels
  - Light mode: Outline lamp, 50% opacity
  - Dark mode: Filled lamp, 100% opacity
- **Button Style**:
  - Text color: Subtle (50% opacity)
  - Background: Transparent
  - Padding: 10 pixels horizontal, 6 pixels vertical
  - Rounded corners: Small radius
- **Hover**: Text becomes accent color, background becomes 5% opacity foreground

### Language Switcher Button
- **Text**: "EN" or "DE" in monospace font
- **Style**: Same as dark mode toggle
- **Font**: Monospace, uppercase, wide letter spacing

### Navigation Items (7 total)
Stacked vertically with 20 pixel gap between each:

1. **Home** - House symbol (⌂)
2. **News** - Circle symbol (◉)
3. **Reviews** - Square symbol (▢)
4. **Consoles** - Controller icon (simple line drawing of game controller)
5. **PC** - Circle symbol (◑)
6. **Videos** - Play symbol (▶)
7. **More** - Three dots (⋯)

Each navigation item:
- **Layout**: Icon on top, label below
- **Icon**: Base font size, monospace font, centered
- **Label**: 10 pixel font size, monospace, uppercase, wide letter spacing, below icon
- **Gap**: 6 pixels between icon and label
- **Padding**: 12 pixels horizontal, 8 pixels vertical
- **Rounded Corners**: Small radius
- **Inactive State**: 
  - Text: Subtle color (50% opacity)
  - Background: Transparent
- **Active State**: 
  - Text: Accent blue color
  - Background: 10% opacity accent (15% in dark mode)
- **Hover State**: 
  - Text: Accent blue color
  - Background: 5% opacity accent (10% in dark mode)
- **Transition**: 200ms ease for all changes

## Homepage Layout

### Header Text
- **Content**: "MODULES · [number]" where number is article count
- **Style**: 
  - Monospace font
  - Uppercase
  - Subtle color (50% opacity)
  - 12 pixel font size
  - Wide letter spacing
- **Position**: Top of content area
- **Margin Bottom**: 32 pixels mobile, 40 pixels desktop

### Article Grid
- **Layout**: 
  - Single column on mobile (below 768px)
  - Two columns on tablet/desktop (768px and above)
- **Gap**: 
  - 32 pixels on mobile
  - 40 pixels on tablet
  - 48 pixels on desktop
- **Flow**: Articles stack vertically, filling columns left to right

### Article Cards

Each card is a rectangular container with:

**Card Container**:
- **Border**: 1 pixel, 15% opacity foreground color, rounded corners (small radius)
- **Background**: Transparent (matches page background)
- **Layout**: Flex column (vertical stacking)
- **Overflow**: Hidden (for images)
- **Hover Effect**: 
  - Border becomes 30% opacity accent blue
  - Subtle shadow appears (very light, barely visible)
  - Smooth 200ms transition

**Article Image** (if present):
- **Height**: 96 pixels on mobile, 128 pixels on desktop
- **Width**: 100% of card width
- **Image Style**: 
  - Fills container completely
  - Object-cover (maintains aspect ratio, crops if needed)
  - 30% opacity
  - Grayscale filter applied
- **Background**: Divider color (behind image)
- **Hover Effect**: 
  - Opacity increases to 50%
  - Grayscale removed (full color)
  - Smooth 500ms transition

**Article Content** (inside card):
- **Padding**: 24 pixels on mobile, 32 pixels on desktop (all sides)
- **Title**: 
  - 20 pixels mobile, 24 pixels desktop
  - Semibold weight
  - Near-black text color
  - Hover: Changes to accent blue
  - Layout: Title on left, arrow (→) on right
- **Arrow Indicator**: 
  - Subtle color (50% opacity)
  - 12 pixel font size
  - Positioned on right side of title
  - Hover: Changes to accent color
- **Description**: 
  - Muted text color (70% opacity)
  - Relaxed line height
  - Clamped to maximum 3 lines (with ellipsis if longer)
  - Margin bottom: 16 pixels mobile, 20 pixels desktop
- **Metadata Labels**: 
  - Position: Bottom of card content
  - Auto margin top (pushes to bottom)

**Metadata Labels** (on cards):
Three labels displayed horizontally with symbols:
- **Topic** - Circle symbol (◉) in accent blue at 60% opacity, followed by topic name
- **Level** - Square symbol (▢) in accent blue at 60% opacity, followed by level name
- **Read Time** - Circle symbol (◐) in accent blue at 60% opacity, followed by time in minutes

Each label:
- **Font**: 12 pixels, monospace, uppercase, wide letter spacing
- **Text Color**: Subtle (50% opacity)
- **Gap**: 20 pixels horizontal between labels, 8 pixels vertical if wrapping
- **Symbol-Text Gap**: 6 pixels between symbol and text

## Article Page Layout

### Back Link
- **Position**: Top of article content area
- **Text**: "← EXPLORE MORE" (or German equivalent "← MEHR ENTDECKEN")
- **Style**: 
  - Small font size (14 pixels)
  - Monospace font
  - Uppercase
  - Subtle color (50% opacity)
  - Wide letter spacing
- **Arrow**: Left arrow (←) symbol, 4 pixels margin right
- **Hover Effect**: 
  - Text changes to accent blue
  - Arrow translates 4 pixels to the left
  - Smooth 200ms transition
- **Margin Bottom**: 48 pixels mobile, 56 pixels desktop
- **Width**: Reading width container (85 characters max)

### Article Header

**Module Label**:
- **Text**: "MODULE" (or "MODUL" in German)
- **Style**: 
  - Monospace font
  - Uppercase
  - Subtle color (50% opacity)
  - 12 pixel font size
  - Wide letter spacing
- **Margin Bottom**: 24 pixels

**Article Title**:
- **Size**: 
  - 36 pixels on mobile
  - 48 pixels on tablet
  - 60 pixels on desktop
- **Weight**: Semibold
- **Line Height**: Tight (1.2-1.3)
- **Letter Spacing**: Tight (negative tracking)
- **Color**: Near-black (light mode) or near-white (dark mode)
- **Margin Bottom**: 32 pixels mobile, 40 pixels desktop
- **Border Bottom**: 1 pixel divider color, 16 pixels padding bottom, 24 pixels margin bottom

**Article Description**:
- **Size**: 18 pixels mobile, 20 pixels desktop
- **Color**: Muted (70% opacity)
- **Line Height**: Relaxed (1.75)
- **Margin Bottom**: 40 pixels mobile, 48 pixels desktop
- **Width**: Reading width container (85 characters max)

**Metadata Section**:
- **Border Top**: 1 pixel divider color
- **Padding Top**: 24 pixels
- **Labels**: Same style as article card metadata labels

### Article Content

**Container**:
- **Width**: Reading width (85 characters maximum)
- **Font Size**: 16 pixels mobile, 18 pixels desktop
- **Line Height**: 1.75
- **Text Color**: 90% opacity foreground color

**Headings**:
- **H1**: 
  - 30 pixels mobile, 36 pixels tablet, 48 pixels desktop
  - Semibold weight
  - Border bottom: 1 pixel divider color
  - Tight line height and letter spacing
  - Top margin: 64 pixels mobile, 80 pixels desktop (first H1 has no top margin)
  - Bottom margin: 24 pixels mobile, 32 pixels desktop
- **H2**: 
  - 24 pixels mobile, 30 pixels tablet, 36 pixels desktop
  - Semibold weight
  - Tight spacing
  - Top margin: 56 pixels mobile, 64 pixels desktop
  - Bottom margin: 24 pixels mobile, 32 pixels desktop
- **H3**: 
  - 20 pixels mobile, 24 pixels tablet, 30 pixels desktop
  - Semibold weight
  - Top margin: 40 pixels mobile, 48 pixels desktop
  - Bottom margin: 20 pixels mobile, 24 pixels desktop
- **H4**: 
  - 18 pixels mobile, 20 pixels desktop
  - Semibold weight
  - Top margin: 32 pixels mobile, 40 pixels desktop
  - Bottom margin: 16 pixels mobile, 20 pixels desktop

**Paragraphs**:
- **Margin Bottom**: 28 pixels mobile, 32 pixels desktop
- **Line Height**: Relaxed (1.75)
- **Color**: 90% opacity foreground

**Links**:
- **Color**: Accent blue (#5B9BD5)
- **Decoration**: Underline
- **Underline Offset**: 2 pixels from text
- **Underline Color**: 30% opacity accent blue
- **Hover**: Underline becomes 100% opacity accent blue
- **Transition**: 200ms ease

**Lists**:
- **Margin**: 24 pixels mobile, 32 pixels desktop (vertical)
- **Left Margin**: 24 pixels mobile, 32 pixels desktop
- **List Item Spacing**: 12 pixels vertical between items
- **Bullet/Number Color**: Matches text color
- **Nested Lists**: Additional 12 pixels left margin

**Inline Code**:
- **Font**: Monospace
- **Size**: 90% of base font size
- **Background**: Divider color
- **Padding**: 2 pixels horizontal, 4 pixels vertical
- **Rounded Corners**: Small radius
- **Color**: Matches text color

**Code Blocks**:
- **Background**: Divider color
- **Padding**: 20 pixels mobile, 24 pixels desktop (all sides)
- **Border**: 1 pixel, 10% opacity foreground color
- **Rounded Corners**: Small radius
- **Font**: Monospace, 14 pixels
- **Overflow**: Horizontal scroll if content is too wide
- **Margin**: 32 pixels mobile, 40 pixels desktop (vertical)

**Blockquotes**:
- **Left Border**: 4 pixels, accent blue at 30% opacity (light mode) or 40% opacity (dark mode)
- **Left Padding**: 24 pixels mobile, 32 pixels desktop
- **Background**: 5% opacity accent color (10% in dark mode)
- **Text Style**: Italic
- **Text Color**: Muted (70% opacity)
- **Vertical Margin**: 40 pixels mobile, 48 pixels desktop
- **Vertical Padding**: 16 pixels mobile, 20 pixels desktop
- **Rounded Corners**: Right side only (small radius)

**Images** (in article content):
- **Rounded Corners**: Small radius
- **Border**: 1 pixel, 10% opacity foreground color
- **Vertical Margin**: 32 pixels mobile, 40 pixels desktop
- **Max Width**: 100% of container
- **Height**: Auto (maintains aspect ratio)
- **Display**: Block element

**Tables**:
- **Width**: 100% of container
- **Border Collapse**: Collapsed borders
- **Vertical Margin**: 32 pixels mobile, 40 pixels desktop
- **Header Cells**: 
  - Semibold weight
  - Background: 50% opacity divider color
  - Border: 1 pixel divider color
  - Padding: 16 pixels horizontal, 12 pixels vertical
- **Data Cells**: 
  - Border: 1 pixel divider color
  - Padding: 16 pixels horizontal, 12 pixels vertical

**Horizontal Rules**:
- **Border Top**: 2 pixels divider color
- **Vertical Margin**: 48 pixels mobile, 64 pixels desktop
- **No Border Bottom**: Only top border visible

## Footer

### Position
- **Margin Top**: 80 pixels mobile, 96 pixels desktop
- **Border Top**: 1 pixel divider color
- **Width**: Full width of page

### Content Container
- **Max Width**: 1200 pixels (same as main content)
- **Centered**: Horizontally centered
- **Padding**: 32 pixels mobile, 40 pixels desktop (vertical)
- **Horizontal Padding**: 24 pixels mobile, 32 pixels desktop

### Layout
- **Grid**: Two columns on tablet/desktop (768px+), single column on mobile
- **Gap**: 32 pixels mobile, 48 pixels desktop

### Left Column: Newsletter

**Heading**:
- **Text**: "NEWSLETTER" (or "NEWSLETTER" in German)
- **Style**: 
  - Monospace font
  - Uppercase
  - Subtle color (50% opacity)
  - 12 pixel font size
  - Wide letter spacing
- **Margin Bottom**: 12 pixels

**Form**:
- **Layout**: Flex column
- **Gap**: 8 pixels between elements

**Email Input**:
- **Border**: 1 pixel, 15% opacity foreground color
- **Rounded Corners**: Small radius
- **Padding**: 6 pixels horizontal, 6 pixels vertical
- **Background**: Matches page background
- **Text Color**: Matches foreground color
- **Font Size**: 14 pixels
- **Focus State**: Border becomes 30% opacity accent blue
- **Transition**: 200ms ease

**Subscribe Button**:
- **Border**: 1 pixel, 20% opacity accent blue (30% in dark mode)
- **Background**: 10% opacity accent blue (15% in dark mode)
- **Text Color**: Accent blue
- **Rounded Corners**: Small radius
- **Padding**: 16 pixels horizontal, 6 pixels vertical
- **Font Size**: 14 pixels
- **Hover**: Background increases to 15% opacity (20% in dark mode)
- **Transition**: 200ms ease

### Right Column: Legal Links & Copyright

**Alignment**: 
- Right-aligned on desktop
- Left-aligned on mobile

**Legal Links**:
- **Layout**: Flex wrap, horizontal flow
- **Gap**: 16 pixels horizontal, 8 pixels vertical
- **Font Size**: 12 pixels
- **Color**: Subtle (50% opacity)
- **Hover**: Changes to accent blue
- **Transition**: 200ms ease

**Copyright**:
- **Text**: "© [current year] KI-LAMPE"
- **Font Size**: 14 pixels
- **Color**: Subtle (50% opacity)
- **Margin Top**: 16 pixels

### Game of the Day Section

**Position**:
- **Border Top**: 1 pixel divider color
- **Margin Top**: 32 pixels
- **Padding Top**: 24 pixels

**Content**:
- **Text Format**: "GOFD : [GAME NAME]"
- **Style**: 
  - Monospace font
  - 10 pixel font size
  - Uppercase
  - Wide letter spacing
- **Colors**: 
  - "GOFD": Subtle color (50% opacity)
  - Colon: 20% opacity foreground color
  - Game name: Subtle color (50% opacity)
- **Gap**: 8 pixels between elements
- **Layout**: Inline flex, horizontal

## Responsive Breakpoints

- **Mobile**: Default (below 768 pixels wide)
- **Tablet**: 768 pixels and above
- **Desktop**: 1024 pixels and above (sidebar appears)

## Transitions & Animations

All interactive elements use smooth transitions:
- **Duration**: 200ms for most elements
- **Easing**: Ease function
- **Properties**: Color, background, border, transform

Image hover transitions: 500ms ease

## Spacing System

Based on 4 pixel grid system:
- **Tiny**: 4-8 pixels (tight spacing)
- **Small**: 12-16 pixels (close elements)
- **Medium**: 24-32 pixels (normal spacing)
- **Large**: 40-48 pixels (section spacing)
- **Extra Large**: 64-96 pixels (major section breaks)

## Visual Principles

1. **Minimal**: Clean, uncluttered, no unnecessary elements
2. **Calm**: Soft colors, generous spacing, relaxed reading experience
3. **Intelligent**: Clear hierarchy, structured layout, easy to scan
4. **Slightly Playful**: Through wording and subtle interactions, not flashy visuals
5. **Respectful**: Content-first approach, no engagement tricks, no loud calls-to-action

## Dark Mode Behavior

When dark mode is active:
- All background colors invert (light becomes dark)
- All text colors invert (dark becomes light)
- Divider colors become medium gray
- Accent color remains the same blue but appears brighter
- All opacity percentages remain the same relative to their base colors
- Transitions remain smooth and consistent

## Interactive States

**Hover**:
- Subtle color changes to accent blue
- Background highlights appear (5-10% opacity)
- Borders may change color
- Smooth 200ms transition

**Active**:
- Accent blue text color
- 10-15% accent blue background
- Slightly more prominent than hover

**Focus** (form inputs):
- Border becomes 30% opacity accent blue
- Outline removed (clean look)

**Disabled**:
- 50% opacity on entire element
- No interaction possible

## What Is NOT Present

The following elements are explicitly NOT part of the design:
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

## Perfect State Assumptions

When viewing this specification, assume:
- All spacing is perfectly consistent
- All colors match exactly as specified
- All transitions are smooth and polished
- All text is properly aligned
- All elements are in their correct positions
- No layout shifts occur
- No white space issues exist
- Images load properly and display correctly
- All interactive elements respond immediately
- The page feels calm, intelligent, and minimal
