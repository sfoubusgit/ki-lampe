"use client";

import { MainContent } from "@/components/MainContent";
import { BackLink } from "@/components/BackLink";
import { CompleteFooter } from "@/components/CompleteFooter";
import { useLanguage } from "@/lib/language";

export default function AboutPage() {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const content = {
    en: {
      title: "About KI-LAMPE",
      subtitle: "The ideas behind great games, AI & art.",
      sections: [
        {
          heading: "What is KI-LAMPE?",
          text: "KI-LAMPE is an independent blog about artificial intelligence, game design, digital art and creative technology. We publish deep-dives, hands-on tutorials and design breakdowns — the 'why' behind the tools and games people love, explained clearly and without filler.",
        },
        {
          heading: "What we cover",
          text: "Our writing is organized around three pillars: AI (tools like Stable Diffusion, ComfyUI, RunPod and AI music), Games (how great mechanics, culture and engines actually work), and Art. Each article aims to teach something real — whether that's installing a tool step by step or understanding a piece of game design history.",
        },
        {
          heading: "Our approach",
          text: "We test things first-hand, make our own original diagrams and visuals, and give honest, opinionated takes. We don't republish generic, AI-spun filler — every article is meant to be genuinely useful to someone building, creating or learning.",
        },
        {
          heading: "Who's behind it",
          text: "KI-LAMPE is an independent creator project under the Krafthaus studio umbrella. It's written and maintained by a small, hands-on team that actually uses the tools it writes about.",
        },
        {
          heading: "Contact",
          text: "Questions, feedback or collaboration ideas are welcome. You'll find our contact details on the Imprint page linked in the footer.",
        },
      ],
    },
    de: {
      title: "Über KI-LAMPE",
      subtitle: "Die Ideen hinter großartigen Spielen, KI & Kunst.",
      sections: [
        {
          heading: "Was ist KI-LAMPE?",
          text: "KI-LAMPE ist ein unabhängiger Blog über Künstliche Intelligenz, Game Design, digitale Kunst und kreative Technologie. Wir veröffentlichen tiefgehende Analysen, praxisnahe Tutorials und Design-Breakdowns – das „Warum“ hinter den Tools und Spielen, die man liebt, klar erklärt und ohne Füllmaterial.",
        },
        {
          heading: "Worüber wir schreiben",
          text: "Unsere Inhalte gliedern sich in drei Säulen: KI (Tools wie Stable Diffusion, ComfyUI, RunPod und KI-Musik), Games (wie großartige Mechaniken, Kultur und Engines wirklich funktionieren) und Kunst. Jeder Artikel soll etwas Echtes vermitteln – ob eine Schritt-für-Schritt-Installation oder das Verständnis eines Stücks Game-Design-Geschichte.",
        },
        {
          heading: "Unser Ansatz",
          text: "Wir testen aus erster Hand, erstellen eigene Diagramme und Grafiken und geben ehrliche, klare Einschätzungen. Wir veröffentlichen keine generischen, KI-generierten Fülltexte – jeder Artikel soll für Menschen, die etwas bauen, erschaffen oder lernen, wirklich nützlich sein.",
        },
        {
          heading: "Wer dahintersteht",
          text: "KI-LAMPE ist ein unabhängiges Creator-Projekt unter dem Dach des Studios Krafthaus. Geschrieben und gepflegt von einem kleinen, praxisorientierten Team, das die Tools, über die es schreibt, selbst nutzt.",
        },
        {
          heading: "Kontakt",
          text: "Fragen, Feedback oder Kooperationsideen sind willkommen. Unsere Kontaktdaten findest du auf der im Footer verlinkten Impressum-Seite.",
        },
      ],
    },
  };

  const currentContent = isGerman ? content.de : content.en;

  return (
    <MainContent>
      <div className="max-w-[85ch]">
        <BackLink />

        <h1 className="
          text-[36px]
          tablet:text-[48px]
          desktop:text-[60px]
          font-semibold
          leading-[1.2]
          tracking-tight
          text-foreground
          mb-4
          desktop:mb-6
        ">
          {currentContent.title}
        </h1>

        <p className="
          text-base-custom
          font-mono
          text-foreground/50
          mb-12
          desktop:mb-16
        ">
          {currentContent.subtitle}
        </p>

        <div className="border-b border-divider mb-12 desktop:mb-16"></div>

        <div className="space-y-10 desktop:space-y-12">
          {currentContent.sections.map((section, index) => (
            <section key={index}>
              <h2 className="
                text-xl-custom
                font-semibold
                text-foreground
                mb-4
                desktop:mb-6
              ">
                {section.heading}
              </h2>
              <p className="
                text-base-custom
                leading-relaxed
                text-foreground/70
              ">
                {section.text}
              </p>
            </section>
          ))}
        </div>
      </div>

      <CompleteFooter />
    </MainContent>
  );
}
