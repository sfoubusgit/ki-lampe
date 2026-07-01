"use client";

import { useLanguage } from "@/lib/language";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleCard } from "@/components/ArticleCard";
import { MetadataLabels } from "@/components/MetadataLabels";
import { AdBar } from "@/components/AdBar";
import type { ArticleMetadata } from "@/lib/content";

interface LocalizedArticleGridProps {
  /** All articles (both languages). Filtered to the active language client-side. */
  articles: ArticleMetadata[];
  hideLabels?: boolean;
  hideGridWrapper?: boolean;
  /** Insert the ad bar after the primary articles (homepage/news style). */
  withAd?: boolean;
  /** Shown when the active language has no matching articles. */
  emptyText?: string;
}

/**
 * Renders the article grid filtered to the CURRENT UI language, so a listing
 * never mixes DE + EN. The language lives in a client context (useLanguage),
 * so this filtering must happen client-side.
 */
export function LocalizedArticleGrid({
  articles,
  hideLabels = false,
  hideGridWrapper = false,
  withAd = false,
  emptyText,
}: LocalizedArticleGridProps) {
  const { language } = useLanguage();
  const visible = articles.filter((article) => article.language === language);

  if (visible.length === 0 && emptyText) {
    return (
      <div className="tablet:col-span-2 desktop:col-span-4 py-16 text-center text-sm-custom font-mono uppercase tracking-wide text-foreground/40">
        {emptyText}
      </div>
    );
  }

  const primary = visible.slice(0, 2);
  const secondary = visible.slice(2, 6);
  const tertiary = visible.slice(6);

  const card = (article: ArticleMetadata, size: "primary" | "secondary" | "tertiary") => ({
    node: (
      <ArticleCard
        key={article.slug}
        href={`/article/${article.slug}`}
        title={article.title}
        image={article.image}
        size={size}
        metadata={
          <MetadataLabels topic={article.topic} level={article.level} readTime={article.readTime} />
        }
      />
    ),
    hierarchy: size,
  });

  const gridItems = [
    ...primary.map((a) => card(a, "primary")),
    ...(withAd ? [{ node: <AdBar />, hierarchy: "primary" as const, isAd: true }] : []),
    ...secondary.map((a) => card(a, "secondary")),
    ...tertiary.map((a) => card(a, "tertiary")),
  ];

  return <ArticleGrid items={gridItems} hideLabels={hideLabels} hideGridWrapper={hideGridWrapper} />;
}
