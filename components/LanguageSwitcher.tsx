"use client";

import { useLanguage } from "@/lib/language";

/**
 * Language Switcher Button Component
 * 
 * Specifications:
 * - Text: "EN" or "DE" in monospace font
 * - Same button styling as dark mode toggle
 * - Font: Monospace, uppercase, wide letter spacing
 * - Toggles between English and German
 * - Smooth 200ms transition on hover
 */
export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="
        px-[10px]
        py-[6px]
        rounded-sm
        bg-transparent
        text-white/70
        dark:text-white/80
        font-mono
        uppercase
        tracking-wide
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
        focus-visible:ring-2
        focus-visible:ring-white/50
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
      "
      aria-label={language === "en" ? "Switch to German" : "Switch to English"}
      type="button"
    >
      {language === "en" ? "EN" : "DE"}
    </button>
  );
}
