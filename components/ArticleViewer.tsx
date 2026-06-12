"use client";

import { useLanguage } from "@/lib/language";
import { Article } from "@/lib/content";
import { BackLink } from "@/components/BackLink";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleContent } from "@/components/ArticleContent";
import { MarkdownContent } from "@/components/MarkdownContent";

interface ArticleViewerProps {
  articleDe: Article | null;
  articleEn: Article | null;
}

export function ArticleViewer({ articleDe, articleEn }: ArticleViewerProps) {
  const { language } = useLanguage();

  const article =
    language === "en" ? articleEn || articleDe : articleDe || articleEn;

  if (!article) {
    return null;
  }

  return (
    <div className="max-w-[85ch]">
      <BackLink />

      <ArticleHeader
        title={article.metadata.title}
        description={article.metadata.description}
        topic={article.metadata.topic}
        level={article.metadata.level}
        readTime={article.metadata.readTime}
      />

      <ArticleContent>
        <MarkdownContent content={article.content} />
      </ArticleContent>
    </div>
  );
}
