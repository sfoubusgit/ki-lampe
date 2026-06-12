import { MainContent } from "@/components/MainContent";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleCard } from "@/components/ArticleCard";
import { MetadataLabels } from "@/components/MetadataLabels";
import { CompleteFooter } from "@/components/CompleteFooter";
import { AdBar } from "@/components/AdBar";
import { getAllArticles } from "@/lib/content";
import { NewsHeader } from "@/components/NewsHeader";

export default function NewsPage() {
  const articles = getAllArticles();

  // Categorize articles into hierarchy (same as homepage)
  // Primary: First 2 most recent articles (large, prominent, up to half-width)
  // Secondary: Next 4 articles (medium size)
  // Tertiary: Remaining older articles (compact)
  const primaryArticles = articles.slice(0, 2); // First 2 articles (newest)
  const secondaryArticles = articles.slice(2, 6); // Next 4 articles
  const tertiaryArticles = articles.slice(6); // Remaining articles

  // Build grid items with hierarchy information (same structure as homepage)
  const gridItems = [
    // Primary articles (large, span 2 columns on desktop)
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
      hierarchy: 'primary' as const,
    })),
    // AD Bar - spans 2 columns, positioned after first two primary articles
    {
      node: <AdBar />,
      hierarchy: 'primary' as const,
      isAd: true,
    },
    // Secondary articles (medium)
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
      hierarchy: 'secondary' as const,
    })),
    // Tertiary articles (compact)
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
      hierarchy: 'tertiary' as const,
    })),
  ];

  return (
    <MainContent>
      <div className="
        grid
        grid-cols-1
        tablet:grid-cols-2
        desktop:grid-cols-4
        gap-2
        tablet:gap-3
        desktop:gap-4
        tablet:-mx-4
        desktop:-mx-8
      ">
        {/* News Header - aligned with grid */}
        <div className="tablet:col-span-2 desktop:col-span-4 mb-2">
          <NewsHeader />
        </div>
        
        {/* Article Grid Items */}
        <ArticleGrid items={gridItems} hideLabels={true} hideGridWrapper={true} />
      </div>

      {/* Footer */}
      <CompleteFooter />
    </MainContent>
  );
}
