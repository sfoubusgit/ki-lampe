"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { KEYWORDS } from "@/lib/keywords";

/**
 * Keywords Panel Component
 *
 * Displays the real content keywords (lib/keywords.ts). Each keyword links to /keyword/[slug], which
 * lists the matching articles — every keyword resolves to real content (no dead links).
 */
export function KeywordsPanel() {
  const { language } = useLanguage();
  const headingText = language === "en" ? "KEYWORDS" : "STICHWÖRTER";

  const keywords = KEYWORDS;

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
        {keywords.map((keyword) => (
          <Link
            key={keyword.slug}
            href={`/keyword/${keyword.slug}`}
            className="
              text-xs-custom
              font-mono
              text-foreground/50
              hover:text-accent
              transition-colors
              duration-200
              ease
              focus:outline-none
              focus-visible:ring-1
              focus-visible:ring-accent/30
              focus-visible:ring-offset-1
              focus-visible:ring-offset-background
            "
          >
            {keyword.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
