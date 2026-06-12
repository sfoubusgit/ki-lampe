import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleCard } from "@/components/ArticleCard";
import { MetadataLabels } from "@/components/MetadataLabels";
import { CompleteFooter } from "@/components/CompleteFooter";
import { CategoryHeader } from "@/components/CategoryHeader";
import { getArticlesByCategory, CATEGORIES, type Category } from "@/lib/content";

export function generateStaticParams() {
  return CATEGORIES.map((slug) => ({ slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as Category;
  if (!CATEGORIES.includes(slug)) {
    notFound();
  }

  const articles = getArticlesByCategory(slug);

  const primaryArticles = articles.slice(0, 2);
  const secondaryArticles = articles.slice(2, 6);
  const tertiaryArticles = articles.slice(6);

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
            <MetadataLabels topic={article.topic} level={article.level} readTime={article.readTime} />
          }
        />
      ),
      hierarchy: "primary" as const,
    })),
    ...secondaryArticles.map((article) => ({
      node: (
        <ArticleCard
          key={article.slug}
          href={`/article/${article.slug}`}
          title={article.title}
          image={article.image}
          size="secondary"
          metadata={
            <MetadataLabels topic={article.topic} level={article.level} readTime={article.readTime} />
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
            <MetadataLabels topic={article.topic} level={article.level} readTime={article.readTime} />
          }
        />
      ),
      hierarchy: "tertiary" as const,
    })),
  ];

  return (
    <MainContent>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2 tablet:gap-3 desktop:gap-4 tablet:-mx-4 desktop:-mx-8">
        <div className="tablet:col-span-2 desktop:col-span-4 mb-2">
          <CategoryHeader category={slug} />
        </div>

        {articles.length > 0 ? (
          <ArticleGrid items={gridItems} hideLabels={true} hideGridWrapper={true} />
        ) : (
          <div className="tablet:col-span-2 desktop:col-span-4 py-16 text-center text-sm-custom font-mono uppercase tracking-wide text-foreground/40">
            More coming soon
          </div>
        )}
      </div>

      <CompleteFooter />
    </MainContent>
  );
}
