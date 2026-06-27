/**
 * CloudGpuCTA — a designed, high-visibility RunPod affiliate card for GPU-heavy articles.
 *
 * Drop it into any article markdown by writing the marker  [[CLOUD_CTA]]  on its own line
 * (MarkdownContent swaps that marker for this component). Dark card so the white RunPod logo
 * always reads, regardless of the site's light/dark theme — and so it visibly stands out.
 */
export function CloudGpuCTA() {
  return (
    <div
      className="my-8 overflow-hidden rounded-xl"
      style={{
        background: "linear-gradient(135deg,#14121d 0%,#1b1830 55%,#241d3d 100%)",
        border: "1px solid rgba(139,92,246,0.35)",
        boxShadow: "0 10px 40px -12px rgba(124,92,255,0.35)",
      }}
    >
      <div className="p-6 desktop:p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/runpod-logo-white.svg" alt="RunPod" className="h-7 w-auto" />
          <span
            className="text-[11px] font-mono uppercase tracking-widest"
            style={{ color: "rgba(196,181,253,0.75)" }}
          >
            Empfohlenes Tool · Cloud-GPU
          </span>
        </div>

        <div>
          <h3 className="text-xl desktop:text-2xl font-bold leading-snug" style={{ color: "#ffffff" }}>
            Keine starke Grafikkarte? Führe ComfyUI in der Cloud aus.
          </h3>
          <p className="mt-2 text-sm desktop:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
            Flux &amp; SDXL sind speicherhungrig. Statt ~1.800&nbsp;€ für eine eigene Karte mietest du bei
            RunPod eine 24-GB-GPU ab ca.{" "}
            <strong style={{ color: "#ffffff" }}>0,50&nbsp;€/Stunde</strong> – und zahlst nur, was du nutzt.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="https://runpod.io?ref=jo7pk601"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#7c5cff", color: "#ffffff" }}
          >
            GPU mieten &amp; Flux starten →
          </a>
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.42)" }}>
            Affiliate-Link · für dich ohne Mehrkosten
          </span>
        </div>
      </div>
    </div>
  );
}
