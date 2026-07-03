"use client";

import { useLanguage } from "@/lib/language";

/**
 * "Rent GPUs on RunPod" Referral Badge
 *
 * A subtle, themeable badge linking to RunPod via the site owner's
 * referral link. Rendered as a pill with a small RunPod-style mark
 * (inline SVG — no external asset, no hotlinking) plus a wordmark.
 *
 * - Text follows the EN/DE language toggle (useLanguage), like the rest
 *   of the footer.
 * - rel="sponsored" marks the affiliate/referral relationship for SEO.
 * - target="_blank" opens RunPod in a new tab so visitors keep the article.
 * - Brand violet is used for the mark so it stays recognizable in both
 *   light and dark mode; the surrounding chrome follows the site tokens.
 */
const RUNPOD_REFERRAL_URL = "https://runpod.io?ref=jo7pk601";

export function RunpodBadge() {
  const { language } = useLanguage();

  // "RunPod" stays highlighted at the end in both languages.
  const prefix = language === "de" ? "GPUs mieten bei" : "Rent GPUs on";
  const ariaLabel =
    language === "de"
      ? "GPUs mieten bei RunPod (Empfehlungslink, öffnet in neuem Tab)"
      : "Rent GPUs on RunPod (referral link, opens in a new tab)";
  const title = language === "de" ? "GPUs mieten bei RunPod" : "Rent GPUs on RunPod";

  return (
    <a
      href={RUNPOD_REFERRAL_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={ariaLabel}
      title={title}
      className="
        group
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-foreground/15
        bg-foreground/[0.02]
        px-3
        py-1.5
        text-sm-custom
        font-sans
        text-foreground/60
        transition-all
        duration-200
        ease
        hover:border-[#7c5cff]/50
        hover:bg-[#7c5cff]/[0.06]
        hover:text-foreground/90
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#7c5cff]/30
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      "
    >
      {/* RunPod-style mark: violet rounded square with connected-node motif */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 ease group-hover:scale-110"
      >
        <rect width="24" height="24" rx="6" fill="#7c5cff" />
        <circle cx="8" cy="8" r="2" fill="#fff" />
        <circle cx="16" cy="8" r="2" fill="#fff" fillOpacity="0.55" />
        <circle cx="8" cy="16" r="2" fill="#fff" fillOpacity="0.55" />
        <circle cx="16" cy="16" r="2" fill="#fff" />
        <path
          d="M9.4 9.4 14.6 14.6M14.6 9.4 9.4 14.6"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </svg>

      <span className="whitespace-nowrap">
        {prefix}{" "}
        <span className="font-semibold text-foreground/80 group-hover:text-[#7c5cff]">
          RunPod
        </span>
      </span>
    </a>
  );
}
