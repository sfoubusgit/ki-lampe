"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

/**
 * Markdown Content Component
 * 
 * Renders markdown content as HTML with proper styling.
 * All content is automatically styled via the .article-content class.
 * 
 * Handles images:
 * - Local images (starting with /) use Next.js Image component
 * - External images use regular img tag
 */
interface MarkdownContentProps {
  content: string;
}

/**
 * Check if image URL is local (starts with /) or external
 */
function isLocalImage(src: string | undefined): boolean {
  if (!src) return false;
  return src.startsWith("/") && !src.startsWith("//");
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom rendering for markdown elements
        // Skip H1 in content since it's already in ArticleHeader
        h1: () => null,
        h2: ({ node, ...props }) => <h2 {...props} />,
        h3: ({ node, ...props }) => <h3 {...props} />,
        h4: ({ node, ...props }) => <h4 {...props} />,
        p: ({ node, ...props }) => <p {...props} />,
        a: ({ node, ...props }) => <a {...props} />,
        ul: ({ node, ...props }) => <ul {...props} />,
        ol: ({ node, ...props }) => <ol {...props} />,
        li: ({ node, ...props }) => <li {...props} />,
        code: ({ node, inline, ...props }: any) => {
          return inline ? (
            <code {...props} />
          ) : (
            <pre>
              <code {...props} />
            </pre>
          );
        },
        blockquote: ({ node, ...props }) => <blockquote {...props} />,
        img: ({ node, src, alt, ...props }: any) => {
          // Use Next.js Image for local images, regular img for external
          if (isLocalImage(src)) {
            return (
              <div className="relative w-full my-8 desktop:my-10">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-sm border border-foreground/10"
                  style={{ objectFit: "contain" }}
                />
              </div>
            );
          }
          // External images use regular img tag
          return (
            <img
              src={src}
              alt={alt || ""}
              className="w-full h-auto rounded-sm border border-foreground/10 my-8 desktop:my-10"
              {...props}
            />
          );
        },
        table: ({ node, ...props }) => <table {...props} />,
        thead: ({ node, ...props }) => <thead {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr {...props} />,
        th: ({ node, ...props }) => <th {...props} />,
        td: ({ node, ...props }) => <td {...props} />,
        hr: ({ node, ...props }) => <hr {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
