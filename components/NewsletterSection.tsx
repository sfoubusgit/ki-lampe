"use client";

import { useLanguage } from "@/lib/language";
import { useState, FormEvent } from "react";

/**
 * Newsletter Section Component
 * 
 * Specifications:
 * 
 * Heading:
 * - "NEWSLETTER" (or German equivalent)
 * - Monospace, uppercase, subtle color, 12px, wide letter spacing
 * - Margin bottom: 12px
 * 
 * Form:
 * - Flex column layout
 * - 8px gap between elements
 * 
 * Email Input:
 * - 1px border, 15% opacity foreground
 * - Small rounded corners
 * - 6px horizontal/vertical padding
 * - Matches page background
 * - Focus: Border becomes 30% opacity accent blue
 * - 200ms transition
 * 
 * Subscribe Button:
 * - 1px border, 20% opacity accent (30% dark)
 * - 10% accent background (15% dark)
 * - Accent text color
 * - Rounded corners
 * - 16px horizontal, 6px vertical padding
 * - Hover: Background increases to 15% opacity (20% dark)
 * - 200ms transition
 */
type Status = "idle" | "ok" | "already" | "error";

export function NewsletterSection() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const headingText = language === "en" ? "NEWSLETTER" : "NEWSLETTER"; // German uses same word

  const messages = {
    ok: language === "en" ? "Thanks — you're in! 💡" : "Danke — du bist dabei! 💡",
    already:
      language === "en"
        ? "You're already subscribed."
        : "Du bist bereits angemeldet.",
    error:
      language === "en"
        ? "Something went wrong. Please try again."
        : "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus(data.already ? "already" : "ok");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="
        inline-flex
        items-center
        gap-2
        text-sm-custom
        font-mono
        uppercase
        tracking-wide
        text-[#5b9bd5]
        dark:text-[#5ba3d5]
        mb-3
      ">
        <span className="footer-title-dot footer-title-dot-newsletter" aria-hidden="true" />
        <span>{headingText}</span>
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" aria-label={headingText}>
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language === "en" ? "Your email" : "Ihre E-Mail"}
          required
          className="
            border
            border-foreground/15
            rounded-sm
            px-[6px]
            py-[6px]
            bg-background
            text-foreground
            text-sm
            font-sans
            transition-all
            duration-200
            ease
            focus:outline-none
            focus:border-accent/30
            placeholder:text-foreground/50
          "
          aria-label={language === "en" ? "Email address" : "E-Mail-Adresse"}
          aria-required="true"
        />

        {/* Subscribe Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            border
            border-accent/20
            dark:border-accent/30
            bg-accent/10
            dark:bg-accent/15
            text-accent
            rounded-sm
            px-4
            py-[6px]
            text-sm
            font-sans
            transition-all
            duration-200
            ease
            hover:bg-accent/15
            dark:hover:bg-accent/20
            active:bg-accent/15
            dark:active:bg-accent/20
            focus:outline-none
            focus:ring-2
            focus:ring-accent/20
            focus:ring-offset-2
            focus:ring-offset-background
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:pointer-events-none
          "
          aria-label={language === "en" ? "Subscribe to newsletter" : "Newsletter abonnieren"}
        >
          {isSubmitting
            ? language === "en" ? "Subscribing..." : "Abonnieren..."
            : language === "en" ? "Subscribe" : "Abonnieren"}
        </button>

        {status !== "idle" && (
          <p
            role="status"
            className={`text-sm-custom mt-1 ${
              status === "error"
                ? "text-red-400"
                : "text-[#5b9bd5] dark:text-[#5ba3d5]"
            }`}
          >
            {messages[status]}
          </p>
        )}
      </form>
    </div>
  );
}
