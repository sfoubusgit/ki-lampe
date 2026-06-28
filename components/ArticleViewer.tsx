"use client";

import { useLanguage } from "@/lib/language";
import { Article } from "@/lib/content";
import { BackLink } from "@/components/BackLink";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleContent } from "@/components/ArticleContent";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ArticleRail } from "@/components/ArticleRail";

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
    <div className="mx-auto flex max-w-[1080px] items-start justify-center gap-12">
      <div className="min-w-0 w-full max-w-[70ch]">
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

      <aside className="hidden min-[1100px]:block w-60 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-auto pb-8">
        <ArticleRail content={article.content} />
      </aside>
    </div>
  );
}
