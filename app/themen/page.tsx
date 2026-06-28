import Link from "next/link";
import { MainContent } from "@/components/MainContent";
import { CompleteFooter } from "@/components/CompleteFooter";
import { ThemaIcon } from "@/components/ThemaIcon";
import { THEMEN, MIN_THEMA, PARENTS, themaCounts, type Parent } from "@/lib/themen";

export const metadata = {
  title: "Themen — KI-Lampe",
  description:
    "Alle Themen von KI-Lampe — Bildgenerierung, KI-Musik, Cloud-GPUs, Game Design, KI-Kunst und mehr. Finde die Nische, die dich interessiert.",
};

export default function ThemenPage() {
  const counts = themaCounts();
  const order: Parent[] = ["ki", "game", "kunst"];

  return (
    <MainContent>
      <div className="mx-auto max-w-[1120px]">
        <div className="th-kicker"><span className="th-dot" />Entdecken</div>
        <h1 className="th-ptitle">Themen</h1>
        <p className="th-lead">
          Browse nach Thema — finde genau die Nische, die dich interessiert.
        </p>

        {order.map((parent) => {
          const cards = THEMEN.filter((t) => t.parent === parent && (counts[t.slug] || 0) >= MIN_THEMA)
            .sort((a, b) => (counts[b.slug] || 0) - (counts[a.slug] || 0));
          if (!cards.length) return null;
          return (
            <div key={parent}>
              <div className="th-sec">{PARENTS[parent].name}</div>
              <div className="th-qrow">
                {cards.map((t) => (
                  <Link key={t.slug} href={`/themen/${t.slug}`} className={`th-qcard ${t.parent}`}>
                    <span className="th-ico"><ThemaIcon name={t.icon} size={26} /></span>
                    <div className="th-tname">{t.name}</div>
                    <div className="th-tcount"><span className="th-ld" />{counts[t.slug]} Artikel</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <CompleteFooter />
    </MainContent>
  );
}
