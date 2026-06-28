import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { ThemenBrowser, type ThemaCard } from "@/components/ThemenBrowser";
import { THEMEN, MIN_THEMA, themaCounts, allArticlesLite } from "@/lib/themen";

export const metadata = {
  title: "Themen — KI-Lampe",
  description:
    "Alle KI-Tutorials nach Thema durchstöbern oder nach Tool filtern — Bildgenerierung, KI-Musik, Cloud-GPUs, Game Design und mehr.",
};

export default function ThemenPage() {
  const counts = themaCounts();
  const themen: ThemaCard[] = THEMEN.map((t) => ({
    slug: t.slug,
    name: t.name,
    icon: t.icon,
    parent: t.parent,
    count: counts[t.slug] || 0,
    hasPage: (counts[t.slug] || 0) >= MIN_THEMA,
  }));
  const articles = allArticlesLite();

  return (
    <MainContent>
      <div className="mx-auto max-w-[1120px]">
        <div className="th-kicker"><span className="th-dot" />Entdecken</div>
        <h1 className="th-ptitle">Themen</h1>
        <p className="th-lead">
          Browse nach Thema oder filtere blitzschnell nach Tool — finde genau die Nische, die dich interessiert.
        </p>
        <ThemenBrowser themen={themen} articles={articles} />
      </div>
      <CompleteFooter />
    </MainContent>
  );
}
