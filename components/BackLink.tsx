"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

/**
 * Back Link Component for Article Pages
 * 
 * Specifications:
 * - Text: "← EXPLORE MORE" (or German "← MEHR ENTDECKEN")
 * - Style:
 *   - 14px font size
 *   - Monospace font
 *   - Uppercase
 *   - Subtle color (50% opacity)
 *   - Wide letter spacing
 * - Arrow: Left arrow (←), 4px margin right
 * - Hover: Text changes to accent blue, arrow translates 4px left
 * - Smooth 200ms transition
 * - Margin bottom: 48px mobile, 56px desktop
 * - Reading width container (85 characters max)
 */
export function BackLink() {
  const { language } = useLanguage();
  const text = language === "en" ? "EXPLORE MORE" : "MEHR ENTDECKEN";

  return (
    <div className="max-w-[85ch] mb-12 desktop:mb-14">
      <Link
        href="/"
        className="
          inline-flex
          items-center
          text-[14px]
          font-mono
          uppercase
          tracking-wide
          text-foreground/50
          transition-all
          duration-200
          ease
          hover:text-accent
          active:text-accent
          group
          focus:outline-none
          focus:ring-2
          focus:ring-accent/30
          focus:ring-offset-2
          focus:ring-offset-background
        "
        aria-label={language === "en" ? "Back to homepage" : "Zurück zur Startseite"}
      >
        <span className="mr-1 transition-transform duration-200 ease group-hover:-translate-x-1">
          ←
        </span>
        <span>{text}</span>
      </Link>
    </div>
  );
}
