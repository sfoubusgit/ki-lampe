import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { HomeBand } from "@/components/HomeBand";
import { ArticleBrowser } from "@/components/ArticleBrowser";
import { THEMEN, themaCounts, allArticlesLiteBoth } from "@/lib/themen";

export default function Home() {
  const counts = themaCounts();
  const pills = THEMEN.filter((t) => (counts[t.slug] || 0) > 0)
    .sort((a, b) => (counts[b.slug] || 0) - (counts[a.slug] || 0))
    .map((t) => ({ slug: t.slug, name: t.name }));
  const articles = allArticlesLiteBoth();

  return (
    <MainContent>
      <div className="mx-auto max-w-[1180px]">
        <HomeBand />
        <ArticleBrowser articles={articles} pills={pills} />
      </div>
      <CompleteFooter />
    </MainContent>
  );
}
