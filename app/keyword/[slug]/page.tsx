import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { KeywordHeader } from "@/components/KeywordHeader";
import { getArticlesByKeyword } from "@/lib/content";
import { KEYWORDS, keywordBySlug } from "@/lib/keywords";
import { liteList } from "@/lib/themen";
import { CoverCardGrid } from "@/components/CoverCardGrid";

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
      <div className="mx-auto max-w-[1180px]">
        <KeywordHeader label={def.label} />
        {/* Universal home-grid cards, filtered to the active language */}
        <CoverCardGrid articles={liteList(articles)} emptyText="More coming soon" />
      </div>

      <CompleteFooter />
    </MainContent>
  );
}
