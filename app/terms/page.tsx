"use client";

import { MainContent } from "@/components/MainContent";
import { BackLink } from "@/components/BackLink";
import { CompleteFooter } from "@/components/CompleteFooter";
import { useLanguage } from "@/lib/language";

export default function TermsPage() {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const content = {
    en: {
      title: "Terms of Use",
      lastUpdated: "Last updated: January 2026",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          text: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
        },
        {
          heading: "2. Use License",
          text: "Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.",
        },
        {
          heading: "3. Disclaimer",
          text: "The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
        },
        {
          heading: "4. Limitations",
          text: "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.",
        },
        {
          heading: "5. Accuracy of Materials",
          text: "The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.",
        },
        {
          heading: "6. Links",
          text: "We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.",
        },
        {
          heading: "7. Modifications",
          text: "We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.",
        },
        {
          heading: "8. Governing Law",
          text: "These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in which we operate.",
        },
      ],
    },
    de: {
      title: "Nutzungsbedingungen",
      lastUpdated: "Zuletzt aktualisiert: Januar 2026",
      sections: [
        {
          heading: "1. Annahme der Bedingungen",
          text: "Durch den Zugriff auf und die Nutzung dieser Website akzeptieren und stimmen Sie zu, an die Bedingungen und Bestimmungen dieser Vereinbarung gebunden zu sein. Wenn Sie nicht mit den oben genannten Bedingungen einverstanden sind, nutzen Sie bitte diesen Service nicht.",
        },
        {
          heading: "2. Nutzungslizenz",
          text: "Es wird die Erlaubnis erteilt, vorübergehend eine Kopie der Materialien auf dieser Website nur zum persönlichen, nicht kommerziellen vorübergehenden Betrachten herunterzuladen. Dies ist die Gewährung einer Lizenz, kein Eigentumsübergang, und unter dieser Lizenz dürfen Sie die Materialien nicht ändern oder kopieren.",
        },
        {
          heading: "3. Haftungsausschluss",
          text: "Die Materialien auf dieser Website werden 'wie besehen' bereitgestellt. Wir geben keine Gewährleistungen, weder ausdrücklich noch stillschweigend, und lehnen hiermit alle anderen Gewährleistungen ab, einschließlich, aber nicht beschränkt auf, stillschweigende Gewährleistungen oder Bedingungen der Handelsüblichkeit, Eignung für einen bestimmten Zweck oder Nichtverletzung geistigen Eigentums oder andere Verletzung von Rechten.",
        },
        {
          heading: "4. Einschränkungen",
          text: "In keinem Fall haften wir oder unsere Lieferanten für Schäden (einschließlich, aber nicht beschränkt auf, Schäden durch Datenverlust oder Gewinnverlust oder aufgrund von Geschäftsunterbrechungen), die sich aus der Nutzung oder Unfähigkeit zur Nutzung der Materialien auf dieser Website ergeben.",
        },
        {
          heading: "5. Genauigkeit der Materialien",
          text: "Die auf dieser Website erscheinenden Materialien können technische, typografische oder fotografische Fehler enthalten. Wir garantieren nicht, dass eines der Materialien auf unserer Website genau, vollständig oder aktuell ist. Wir können die auf unserer Website enthaltenen Materialien jederzeit ohne Vorankündigung ändern.",
        },
        {
          heading: "6. Links",
          text: "Wir haben nicht alle mit unserer Website verlinkten Seiten überprüft und sind nicht für den Inhalt solcher verlinkten Seiten verantwortlich. Die Aufnahme eines Links impliziert keine Billigung der Seite durch uns. Die Nutzung einer solchen verlinkten Website erfolgt auf eigenes Risiko des Benutzers.",
        },
        {
          heading: "7. Änderungen",
          text: "Wir können diese Nutzungsbedingungen für unsere Website jederzeit ohne Vorankündigung überarbeiten. Durch die Nutzung dieser Website stimmen Sie zu, an die dann aktuelle Version dieser Nutzungsbedingungen gebunden zu sein.",
        },
        {
          heading: "8. Geltendes Recht",
          text: "Diese Allgemeinen Geschäftsbedingungen unterliegen den geltenden Gesetzen und werden in Übereinstimmung mit diesen ausgelegt. Alle Streitigkeiten im Zusammenhang mit diesen Bedingungen unterliegen der ausschließlichen Gerichtsbarkeit der Gerichte, in denen wir tätig sind.",
        },
      ],
    },
  };

  const currentContent = isGerman ? content.de : content.en;

  return (
    <MainContent>
      <div className="max-w-[85ch]">
        {/* Back Link */}
        <BackLink />

        {/* Title */}
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

        {/* Last Updated */}
        <p className="
          text-sm-custom
          font-mono
          text-foreground/50
          mb-12
          desktop:mb-16
        ">
          {currentContent.lastUpdated}
        </p>

        {/* Visual Separator */}
        <div className="border-b border-divider mb-12 desktop:mb-16"></div>

        {/* Content Sections */}
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

      {/* Footer */}
      <CompleteFooter />
    </MainContent>
  );
}
