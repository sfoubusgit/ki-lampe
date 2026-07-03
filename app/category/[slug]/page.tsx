import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { CategoryHeader } from "@/components/CategoryHeader";
import { getArticlesByCategory, CATEGORIES, type Category } from "@/lib/content";
import { liteList } from "@/lib/themen";
import { CoverCardGrid } from "@/components/CoverCardGrid";

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
      <div className="mx-auto max-w-[1180px]">
        <CategoryHeader category={slug} />
        {/* Universal home-grid cards, filtered to the active language */}
        <CoverCardGrid articles={liteList(articles)} emptyText="More coming soon" />
      </div>

      <CompleteFooter />
    </MainContent>
  );
}
