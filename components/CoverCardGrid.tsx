"use client";

import { useLanguage } from "@/lib/language";
import { CoverCard } from "@/components/CoverCard";
import type { ArticleLite } from "@/lib/themen";

/**
 * The universal home-grid of CoverCards (`.kl-grid`), filtered to the active UI language client-side.
 * Used by category / keyword / news listings so every page shares the same grid design as the home page.
 */
export function CoverCardGrid({
  articles,
  emptyText,
}: {
  articles: ArticleLite[];
  emptyText?: string;
}) {
  const { language } = useLanguage();
  const visible = articles.filter((a) => a.language === language);

  if (visible.length === 0) {
    return (
      <p className="th-empty">
        {emptyText || (language === "en" ? "No guides found." : "Keine Anleitungen gefunden.")}
      </p>
    );
  }

  return (
    <div className="kl-grid">
      {visible.map((a) => (
        <CoverCard
          key={`${a.language}-${a.slug}`}
          href={`/article/${a.slug}`}
          image={a.image}
          title={a.title}
          category={a.category}
          parent={a.parent}
          dateLabel={a.dateLabel}
          readTime={a.readTime}
        />
      ))}
    </div>
  );
}
