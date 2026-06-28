import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CoverCard } from "@/components/CoverCard";
import { CompleteFooter } from "@/components/CompleteFooter";
import { CategoryHeader } from "@/components/CategoryHeader";
import { getArticlesByCategory, CATEGORIES, type Category } from "@/lib/content";
import { firstThemaOf } from "@/lib/themen";

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

        {articles.length > 0 ? (
          <div className="kl-grid" style={{ marginTop: "26px" }}>
            {articles.map((a) => {
              const { category, parent } = firstThemaOf(a);
              return (
                <CoverCard
                  key={a.slug}
                  href={`/article/${a.slug}`}
                  image={a.image}
                  title={a.title}
                  category={category}
                  parent={parent}
                  dateLabel={a.date?.toLocaleDateString(a.language === "en" ? "en-US" : "de-DE", { day: "2-digit", month: "short", year: "numeric" })}
                  readTime={a.readTime}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-sm-custom font-mono uppercase tracking-wide text-foreground/40">
            More coming soon
          </div>
        )}
      </div>

      <CompleteFooter />
    </MainContent>
  );
}
