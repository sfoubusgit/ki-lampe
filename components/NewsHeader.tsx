"use client";

import { useLanguage } from "@/lib/language";

/**
 * News Header Component
 * 
 * Displays the "News" title in the same format as "Latest Highlights"
 */
export function NewsHeader() {
  const { language } = useLanguage();
  const text = language === "en" ? "News" : "News";

  return (
    <div className="mb-2">
      <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50">
        {text}
      </div>
    </div>
  );
}
