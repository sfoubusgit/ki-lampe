import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { CategoryHeader } from "@/components/CategoryHeader";
import { getArticlesByCategory, CATEGORIES, type Category } from "@/lib/content";
import { LocalizedArticleGrid } from "@/components/LocalizedArticleGrid";

export function generateStaticParams() {
  return CATEGORIES.map((slug) => ({ slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as Category;
  if (!CATEGORIES.includes(slug)) {
    notFound();
  }

  const articles = getArticlesByCategory(slug);

  return (
    <MainContent>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2 tablet:gap-3 desktop:gap-4 tablet:-mx-4 desktop:-mx-8">
        <div className="tablet:col-span-2 desktop:col-span-4 mb-2">
          <CategoryHeader category={slug} />
        </div>

        {/* Article Grid — filtered to the active language (empty state handled inside) */}
        <LocalizedArticleGrid
          articles={articles}
          hideLabels
          hideGridWrapper
          emptyText="More coming soon"
        />
      </div>

      <CompleteFooter />
    </MainContent>
  );
}
