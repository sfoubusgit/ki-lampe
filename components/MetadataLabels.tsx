/**
 * Metadata Labels Component for Article Cards
 * 
 * Specifications:
 * - Three labels displayed horizontally:
 *   - Topic (◉ symbol) - accent blue at 60% opacity
 *   - Level (▢ symbol) - accent blue at 60% opacity
 *   - Read Time (◐ symbol) - accent blue at 60% opacity
 * - Each label:
 *   - 12px font size, monospace, uppercase, wide letter spacing
 *   - Subtle text color (50% opacity)
 *   - 20px horizontal gap between labels
 *   - 8px vertical gap if wrapping
 *   - 6px gap between symbol and text
 * - Symbols in accent blue at 60% opacity
 */
interface MetadataLabelsProps {
  topic?: string;
  level?: string;
  readTime?: string;
}

export function MetadataLabels({ topic, level, readTime }: MetadataLabelsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2" role="list" aria-label="Article metadata">
      {/* Topic Label - More prominent */}
      {topic && (
        <div className="flex items-center gap-1.5" role="listitem">
          <span 
            className="text-sm-custom text-[var(--ed-gold)]"
            aria-hidden="true"
          >
            ◉
          </span>
          <span className="text-sm-custom font-mono uppercase tracking-wide text-foreground/80 font-medium">
            {topic}
          </span>
        </div>
      )}

      {/* Level Label - Medium prominence */}
      {level && (
        <div className="flex items-center gap-1.5" role="listitem">
          <span 
            className="text-sm-custom text-[var(--ed-gold)]"
            aria-hidden="true"
          >
            ▢
          </span>
          <span className="text-sm-custom font-mono uppercase tracking-wide text-foreground/70">
            {level}
          </span>
        </div>
      )}

      {/* Read Time Label - Less prominent */}
      {readTime && (
        <div className="flex items-center gap-1.5" role="listitem">
          <span 
            className="text-sm-custom text-[var(--ed-gold)] opacity-70"
            aria-hidden="true"
          >
            ◐
          </span>
          <span className="text-xs-custom font-mono uppercase tracking-wide text-foreground/60">
            {readTime}
          </span>
        </div>
      )}
    </div>
  );
}
