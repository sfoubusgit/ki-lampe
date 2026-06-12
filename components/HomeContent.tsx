"use client";

import { useLanguage } from "@/lib/language";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleCard } from "@/components/ArticleCard";
import { MetadataLabels } from "@/components/MetadataLabels";
import { HomepageHeader } from "@/components/HomepageHeader";
import { CompleteFooter } from "@/components/CompleteFooter";
import { AdBar } from "@/components/AdBar";
import type { ArticleMetadata } from "@/lib/content";

interface HomeContentProps {
  articles: ArticleMetadata[];
}

export function HomeContent({ articles }: HomeContentProps) {
  const { language } = useLanguage();
  const visibleArticles = articles.filter((article) => article.language === language);
  const articleCount = visibleArticles.length;

  const primaryArticles = visibleArticles.slice(0, 2);
  const secondaryArticles = visibleArticles.slice(2, 6);
  const tertiaryArticles = visibleArticles.slice(6);

  const gridItems = [
    ...primaryArticles.map((article) => ({
      node: (
        <ArticleCard
          key={article.slug}
          href={`/article/${article.slug}`}
          title={article.title}
          image={article.image}
          size="primary"
          metadata={
            <MetadataLabels
              topic={article.topic}
              level={article.level}
              readTime={article.readTime}
            />
          }
        />
      ),
      hierarchy: "primary" as const,
    })),
    {
      node: <AdBar />,
      hierarchy: "primary" as const,
      isAd: true,
    },
    ...secondaryArticles.map((article) => ({
      node: (
        <ArticleCard
          key={article.slug}
          href={`/article/${article.slug}`}
          title={article.title}
          image={article.image}
          size="secondary"
          metadata={
            <MetadataLabels
              topic={article.topic}
              level={article.level}
              readTime={article.readTime}
            />
          }
        />
      ),
      hierarchy: "secondary" as const,
    })),
    ...tertiaryArticles.map((article) => ({
      node: (
        <ArticleCard
          key={article.slug}
          href={`/article/${article.slug}`}
          title={article.title}
          image={article.image}
          size="tertiary"
          metadata={
            <MetadataLabels
              topic={article.topic}
              level={article.level}
              readTime={article.readTime}
            />
          }
        />
      ),
      hierarchy: "tertiary" as const,
    })),
  ];

  return (
    <>
      <HomepageHeader articleCount={articleCount} />
      <ArticleGrid items={gridItems} />
      <CompleteFooter />
    </>
  );
}
