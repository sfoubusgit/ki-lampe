"use client";

import { useLanguage } from "@/lib/language";
import type { Category } from "@/lib/content";

const TITLES: Record<Category, { en: string; de: string }> = {
  games: { en: "Games", de: "Games" },
  "game-design": { en: "Game Design", de: "Game Design" },
  art: { en: "Art", de: "Art" },
  ai: { en: "AI", de: "KI" },
};

/**
 * Category Header — shows the localized category title, matching the
 * NewsHeader format (monospace, uppercase, subtle).
 */
export function CategoryHeader({ category }: { category: Category }) {
  const { language } = useLanguage();
  const title = TITLES[category][language];

  return (
    <div className="mb-2">
      <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50">
        {title}
      </div>
    </div>
  );
}
