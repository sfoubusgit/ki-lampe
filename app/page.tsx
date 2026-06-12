import { MainContent } from "@/components/MainContent";
import { HomeContent } from "@/components/HomeContent";
import { getAllArticles } from "@/lib/content";

export default function Home() {
  const articles = getAllArticles();

  return (
    <MainContent>
      <HomeContent articles={articles} />
    </MainContent>
  );
}
