"use client";

import { MetadataLabels } from "./MetadataLabels";

interface ArticleHeaderProps {
  title: string;
  description: string;
  topic?: string;
  level?: string;
  readTime?: string;
}

/**
 * Article Header Component
 * 
 * Article Title:
 * - 36px mobile, 48px tablet, 60px desktop
 * - Semibold, tight line height (1.2-1.3), tight letter spacing
 * - Near-black color
 * - Margin bottom: 32px mobile, 40px desktop
 * - Border bottom: 1px divider, 16px padding bottom, 24px margin bottom
 * 
 * Article Description:
 * - 18px mobile, 20px desktop
 * - Muted color (70% opacity)
 * - Relaxed line height (1.75)
 * - Margin bottom: 40px mobile, 48px desktop
 * - Reading width container (85 characters max)
 * 
 * Metadata Section:
 * - Border top: 1px divider
 * - Padding top: 24px
 * - Same metadata labels as article cards
 */
export function ArticleHeader({
  title,
  description,
  topic,
  level,
  readTime,
}: ArticleHeaderProps) {
  return (
    <header className="mb-6 desktop:mb-8">
      {/* Metadata */}
      {(topic || level || readTime) && (
        <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
          <MetadataLabels topic={topic} level={level} readTime={readTime} />
        </div>
      )}

      {/* Article Title */}
      <h1
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        className="
        text-[36px]
        tablet:text-[48px]
        desktop:text-[60px]
        font-semibold
        leading-[1.08]
        tracking-tight
        text-foreground
        mb-8
        desktop:mb-10
        max-w-[85ch]
      ">
        {title}
      </h1>

      {/* Article Description */}
      <p className="
        text-lg-custom
        leading-relaxed
        text-foreground/70
        mb-8
        desktop:mb-10
        max-w-[85ch]
      ">
        {description}
      </p>

      {/* Visual Separator */}
      <div className="border-b border-divider"></div>
    </header>
  );
}
