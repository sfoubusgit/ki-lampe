"use client";

import { useTheme } from "@/lib/theme";
import { LampIcon } from "./LampIcon";

/**
 * Dark Mode Toggle Button Component
 * 
 * Specifications:
 * - Power toggle icon: 16x16px SVG
 *   - Light mode: Unclicked/off, 70% opacity
 *   - Dark mode: Clicked/on with yellow glow
 * - Button style:
 *   - Text color: Subtle (50% opacity)
 *   - Background: Transparent
 *   - Padding: 10px horizontal, 6px vertical
 *   - Small rounded corners
 * - Hover: Text becomes accent color, background becomes 5% opacity foreground
 * - Smooth 200ms transition
 * - Toggles between light and dark mode
 */
export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="
        px-[12px]
        py-[8px]
        rounded-sm
        bg-transparent
        text-white/70
        dark:text-white/80
        transition-all
        duration-200
        ease
        hover:text-white
        hover:bg-white/10
        dark:hover:bg-white/15
        active:text-white
        active:bg-white/15
        dark:active:bg-white/20
        focus:outline-none
        focus:ring-2
        focus:ring-white/50
        focus:ring-offset-2
        focus:ring-offset-transparent
      "
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <LampIcon isDark={isDark} />
    </button>
  );
}
