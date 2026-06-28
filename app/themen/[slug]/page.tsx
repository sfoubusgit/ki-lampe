import Link from "next/link";
import { notFound } from "next/navigation";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { ThemaIcon } from "@/components/ThemaIcon";
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
      <div className="mx-auto max-w-[1120px]">
        <div className="th-kicker"><span className="th-dot" />Thema</div>
        <h1 className="th-ptitle th-with-ico">
          <span className="th-hico"><ThemaIcon name={t.icon} size={40} /></span>
          {t.name}
        </h1>
        <p className="th-lead">
          {t.blurb} <strong style={{ color: "var(--color-foreground)" }}>{articles.length} Artikel.</strong>
        </p>

        <div className="th-agrid">
          {articles.map((a, i) => (
            <Link key={a.slug} href={`/article/${a.slug}`} className="th-acard">
              <div className="th-thumb">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="th-g" src={a.image} alt="" loading="lazy" />
                ) : (
                  <div className={`th-g g${(i % 6) + 1}`} />
                )}
              </div>
              <div className="th-abody">
                <div className="th-atitle">{a.title}</div>
                <div className="th-adate">
                  {[
                    a.date?.toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" }),
                    a.readTime,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </div>
            </Link>
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
