import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { getAllArticles } from "@/lib/content";
import { NewsHeader } from "@/components/NewsHeader";
import { LocalizedArticleGrid } from "@/components/LocalizedArticleGrid";

export default function NewsPage() {
  const articles = getAllArticles();

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

        {/* Article Grid — filtered to the active language */}
        <LocalizedArticleGrid articles={articles} hideLabels hideGridWrapper withAd />
      </div>

      {/* Footer */}
      <CompleteFooter />
    </MainContent>
  );
}
