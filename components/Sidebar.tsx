import { Logo } from "./Logo";
import { Divider } from "./Divider";
import { DarkModeToggle } from "./DarkModeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Navigation } from "./Navigation";

/**
 * Complete Sidebar Component
 * 
 * Assembled with all components in the correct order:
 * 1. Logo (at top, near edge)
 * 2. Divider
 * 3. Dark mode toggle
 * 4. Language switcher
 * 5. Divider
 * 6. Navigation items (7 items)
 * 
 * Logo is positioned at the top with minimal padding.
 * Other elements are vertically centered below the logo.
 * 
 * Specifications:
 * - Fixed position, 128px wide, full viewport height
 * - Background matches page background
 * - Right edge: 1px vertical line with gradient from 10% opacity foreground to transparent (left to right)
 * - Only visible on screens 1024px and wider
 * - Z-index: 20 (above main content)
 */
export function Sidebar() {
  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-40 bg-gradient-to-br from-[#d55b9b] to-[#5b9bd5] dark:from-[#2d5f3a] dark:to-[#3a6a8f] border-r border-white/20 dark:border-white/10 z-20 hidden desktop:flex flex-col items-center transition-colors duration-200 ease"
      aria-label="Sidebar navigation"
      role="navigation"
    >
      {/* Logo positioned lower */}
      <div className="mt-8 desktop:mt-12 w-full px-4">
        <Logo />
      </div>
      
      {/* Rest of the content - vertically centered in remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        {/* Divider after logo */}
        <Divider />
        
        {/* Dark mode toggle */}
        <DarkModeToggle />
        
        {/* Language switcher */}
        <LanguageSwitcher />
        
        {/* Divider after controls */}
        <Divider />
        
        {/* Navigation items (7 items) */}
        <Navigation />
      </div>
    </aside>
  );
}
