"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

/**
 * Keywords Panel Component
 * 
 * Displays ~40 keywords in a compact panel matching newsletter height
 * Each keyword is clickable and routes to a keyword-specific page
 */
export function KeywordsPanel() {
  const { language } = useLanguage();
  const headingText = language === "en" ? "KEYWORDS" : "STICHWÖRTER";

  // Generate ~40 gaming-related keywords
  const keywords = [
    "Action", "Adventure", "RPG", "FPS", "Strategy", "Simulation", "Racing", "Sports",
    "Puzzle", "Platformer", "Horror", "Survival", "Battle Royale", "MOBA", "MMO",
    "Indie", "AAA", "Retro", "Remaster", "Remake", "Early Access", "Beta", "Alpha",
    "PC Gaming", "Console Gaming", "Mobile Gaming", "VR Gaming", "Cloud Gaming",
    "Nintendo Switch", "PlayStation", "Xbox", "Steam", "Epic Games", "GOG",
    "Ray Tracing", "DLSS", "FSR", "4K", "8K", "60fps", "120fps", "144fps",
  ];

  return (
    <div>
      {/* Heading */}
      <h2 className="
        inline-flex
        items-center
        gap-2
        text-sm-custom
        font-mono
        uppercase
        tracking-wide
        text-[#d55b9b]
        dark:text-[#4a9f6a]
        mb-3
      ">
        <span className="footer-title-dot footer-title-dot-keywords" aria-hidden="true" />
        <span>{headingText}</span>
      </h2>

      {/* Keywords Container - Integrated, no scrollbar, matches newsletter height */}
      <div className="
        flex
        flex-wrap
        gap-1.5
        gap-y-1.5
        content-start
      ">
        {keywords.map((keyword, index) => (
          <Link
            key={index}
            href={`/keyword/${keyword.toLowerCase().replace(/\s+/g, "-")}`}
            className="
              text-xs-custom
              font-mono
              text-foreground/50
              hover:text-accent
              transition-colors
              duration-200
              ease
              focus:outline-none
              focus:ring-1
              focus:ring-accent/30
              focus:ring-offset-1
              focus:ring-offset-background
            "
          >
            {keyword}
          </Link>
        ))}
      </div>
    </div>
  );
}
