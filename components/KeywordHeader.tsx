"use client";

import { useLanguage } from "@/lib/language";

/**
 * Keyword Header — localized "Keyword / Stichwort: <label>" line, matching the CategoryHeader style
 * (monospace, uppercase, subtle).
 */
export function KeywordHeader({ label }: { label: string }) {
  const { language } = useLanguage();
  const prefix = language === "en" ? "Keyword" : "Stichwort";

  return (
    <div className="mb-2">
      <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50">
        {prefix}: {label}
      </div>
    </div>
  );
}
