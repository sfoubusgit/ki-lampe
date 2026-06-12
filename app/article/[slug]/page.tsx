import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { getArticleBySlugAndLanguage, getAllArticleSlugs } from "@/lib/content";
import { ArticleViewer } from "@/components/ArticleViewer";
import { notFound } from "next/navigation";

/**
 * Article Page
 * 
 * Complete article page assembly with:
 * - Back link at top
 * - Article header (module label, title, description, metadata)
 * - Article content with all styled elements
 * - Reading width container for optimal readability
 * 
 * Loads article content from markdown files in content/articles/
 */
interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const articleDe = getArticleBySlugAndLanguage(params.slug, "de");
  const articleEn = getArticleBySlugAndLanguage(params.slug, "en");

  if (!articleDe && !articleEn) {
    notFound();
  }

  return (
    <MainContent>
      <ArticleViewer articleDe={articleDe} articleEn={articleEn} />

      {/* Footer */}
      <CompleteFooter />
    </MainContent>
  );
}
