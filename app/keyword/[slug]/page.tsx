import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { KeywordHeader } from "@/components/KeywordHeader";
import { getArticlesByKeyword } from "@/lib/content";
import { KEYWORDS, keywordBySlug } from "@/lib/keywords";
import { LocalizedArticleGrid } from "@/components/LocalizedArticleGrid";

export function generateStaticParams() {
  return KEYWORDS.map((k) => ({ slug: k.slug }));
}

export default function KeywordPage({ params }: { params: { slug: string } }) {
  const def = keywordBySlug(params.slug);
  if (!def) {
    notFound();
  }

  const articles = getArticlesByKeyword(params.slug);

  return (
    <MainContent>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2 tablet:gap-3 desktop:gap-4 tablet:-mx-4 desktop:-mx-8">
        <div className="tablet:col-span-2 desktop:col-span-4 mb-2">
          <KeywordHeader label={def.label} />
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
