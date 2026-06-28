import type { Metadata } from "next";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { getArticleBySlugAndLanguage, getAllArticleSlugs } from "@/lib/content";
import { ArticleViewer } from "@/components/ArticleViewer";
import { CloudGpuBar } from "@/components/CloudGpuBar";
import { notFound } from "next/navigation";

const SITE = "https://ki-lampe.com";

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

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const de = getArticleBySlugAndLanguage(params.slug, "de");
  const en = getArticleBySlugAndLanguage(params.slug, "en");
  const primary = de || en;
  if (!primary) return {};
  const lang = de ? "de" : "en";
  const m = primary.metadata;
  const cover = `/images/${params.slug}/card.${lang}.jpg`;
  const url = `/article/${params.slug}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: m.title,
      description: m.description,
      images: [{ url: cover, width: 1224, height: 1148, alt: m.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [cover],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const articleDe = getArticleBySlugAndLanguage(params.slug, "de");
  const articleEn = getArticleBySlugAndLanguage(params.slug, "en");

  if (!articleDe && !articleEn) {
    notFound();
  }

  const primary = articleDe || articleEn;
  const lang = articleDe ? "de" : "en";
  const m = primary!.metadata;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: m.title,
    description: m.description,
    image: [`${SITE}/images/${params.slug}/card.${lang}.jpg`],
    datePublished: m.date ? m.date.toISOString() : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/article/${params.slug}` },
    author: { "@type": "Organization", name: "KI-LAMPE" },
    publisher: { "@type": "Organization", name: "KI-LAMPE" },
  };

  return (
    <MainContent>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleViewer articleDe={articleDe} articleEn={articleEn} />

      {/* Footer */}
      <CompleteFooter />

      {/* Sticky RunPod affiliate bar (dismissible) — article pages only */}
      <CloudGpuBar />
    </MainContent>
  );
}
