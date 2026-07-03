import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { NewsHeader } from "@/components/NewsHeader";
import { allArticlesLiteBoth } from "@/lib/themen";
import { CoverCardGrid } from "@/components/CoverCardGrid";

export default function NewsPage() {
  const articles = allArticlesLiteBoth();

  return (
    <MainContent>
      <div className="mx-auto max-w-[1180px]">
        <NewsHeader />
        {/* Universal home-grid cards, filtered to the active language */}
        <CoverCardGrid articles={articles} />
      </div>

      {/* Footer */}
      <CompleteFooter />
    </MainContent>
  );
}
