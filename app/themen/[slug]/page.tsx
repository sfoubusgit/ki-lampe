import Link from "next/link";
import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { ThemaIcon } from "@/components/ThemaIcon";
import { CoverCard } from "@/components/CoverCard";
import { THEMEN, MIN_THEMA, getThema, getArticlesByThema, themaCounts } from "@/lib/themen";

export function generateStaticParams() {
  const counts = themaCounts();
  return THEMEN.filter((t) => (counts[t.slug] || 0) >= MIN_THEMA).map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getThema(params.slug);
  return t ? { title: `${t.name} — KI-Lampe`, description: t.blurb } : {};
}

export default function ThemaPage({ params }: { params: { slug: string } }) {
  const t = getThema(params.slug);
  const counts = themaCounts();
  if (!t || (counts[t.slug] || 0) < MIN_THEMA) {
    notFound();
  }

  const articles = getArticlesByThema(t.slug);

  return (
    <MainContent>
      <div className="mx-auto max-w-[1180px]">
        <div className="th-kicker"><span className="th-dot" />Thema</div>
        <h1 className="th-ptitle th-with-ico">
          <span className="th-hico"><ThemaIcon name={t.icon} size={40} /></span>
          {t.name}
        </h1>
        <p className="th-lead">
          {t.blurb} <strong style={{ color: "var(--color-foreground)" }}>{articles.length} Artikel.</strong>
        </p>

        <div className="kl-grid">
          {articles.map((a) => (
            <CoverCard
              key={a.slug}
              href={`/article/${a.slug}`}
              image={a.image}
              title={a.title}
              category={t.name}
              parent={t.parent}
              dateLabel={a.date?.toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}
              readTime={a.readTime}
            />
          ))}
        </div>

        <p style={{ marginTop: "44px" }}>
          <Link href="/themen" className="th-back">← Alle Themen</Link>
        </p>
      </div>
      <CompleteFooter />
    </MainContent>
  );
}
