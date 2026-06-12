import { ReactNode } from "react";

/**
 * Article Content Container Component
 * 
 * Provides reading-width container and base styling for article content.
 * All content elements (headings, paragraphs, links, lists, code, etc.) are styled
 * via CSS classes in globals.css.
 */
interface ArticleContentProps {
  children: ReactNode;
}

export function ArticleContent({ children }: ArticleContentProps) {
  return (
    <article className="article-content max-w-[85ch] pt-8 desktop:pt-10">
      {children}
    </article>
  );
}
