"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

/** Slim funnel band atop the home grid: brand value-prop + "start here" cornerstone chips. */
export function HomeBand() {
  const { language } = useLanguage();
  const t =
    language === "en"
      ? {
          lead: ["Guides for ", "AI, Art & Games"],
          sub: "Hands-on tutorials — from your first AI image to a GPU in the cloud.",
          starts: [
            { label: "Start: ComfyUI setup", href: "/article/comfyui-flux-lokal-einrichten" },
            { label: "Use RunPod cheaply", href: "/article/runpod-artikel" },
          ],
        }
      : {
          lead: ["Anleitungen für ", "KI, Kunst & Games"],
          sub: "Praxisnahe Tutorials — von der ersten KI-Bildgenerierung bis zur GPU in der Cloud.",
          starts: [
            { label: "Start: ComfyUI einrichten", href: "/article/comfyui-flux-lokal-einrichten" },
            { label: "RunPod günstig nutzen", href: "/article/runpod-artikel" },
          ],
        };

  return (
    <div className="kl-band">
      <div>
        <div className="kl-band-lead">
          {t.lead[0]}
          <b>{t.lead[1]}</b>
        </div>
        <div className="kl-band-sub">{t.sub}</div>
      </div>
      <div className="kl-starts">
        {t.starts.map((s) => (
          <Link key={s.href} href={s.href} className="kl-chip">
            <span className="kl-chip-d" />
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
