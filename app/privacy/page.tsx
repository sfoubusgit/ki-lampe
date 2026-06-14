"use client";

import { MainContent } from "@/components/MainContent";
import { BackLink } from "@/components/BackLink";
import { CompleteFooter } from "@/components/CompleteFooter";
import { useLanguage } from "@/lib/language";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 2026",
      sections: [
        {
          heading: "1. Introduction",
          text: "We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.",
        },
        {
          heading: "2. Data We Collect",
          text: "We may collect information that you provide directly to us, such as when you subscribe to our newsletter or contact us. This may include your name, email address, and any other information you choose to provide.",
        },
        {
          heading: "3. How We Use Your Data",
          text: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to send you newsletters and updates if you have subscribed.",
        },
        {
          heading: "4. Data Storage and Security",
          text: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          heading: "5. Your Rights",
          text: "You have the right to access, correct, or delete your personal data at any time. You can also unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email we send you.",
        },
        {
          heading: "6. Cookies & Third-Party Advertising",
          text: "We use cookies and similar tracking technologies to track activity on our website. In addition, third-party vendors — including Google — use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet. You can opt out of personalized advertising via Google Ads Settings (adssettings.google.com), and learn how Google uses data at policies.google.com/technologies/partner-sites. You can also set your browser to refuse all cookies.",
        },
        {
          heading: "7. Changes to This Policy",
          text: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last updated' date.",
        },
        {
          heading: "8. Contact Us",
          text: "If you have any questions about this privacy policy, please contact us through the contact information provided on our website.",
        },
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: Januar 2026",
      sections: [
        {
          heading: "1. Einleitung",
          text: "Wir respektieren Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen. Diese Datenschutzerklärung erläutert, wie wir Ihre Informationen sammeln, verwenden und schützen, wenn Sie unsere Website besuchen.",
        },
        {
          heading: "2. Daten, die wir sammeln",
          text: "Wir können Informationen sammeln, die Sie uns direkt zur Verfügung stellen, z. B. wenn Sie unseren Newsletter abonnieren oder uns kontaktieren. Dies kann Ihren Namen, Ihre E-Mail-Adresse und alle anderen Informationen umfassen, die Sie bereitstellen möchten.",
        },
        {
          heading: "3. Wie wir Ihre Daten verwenden",
          text: "Wir verwenden die von uns gesammelten Informationen, um unsere Dienste bereitzustellen, zu pflegen und zu verbessern, um mit Ihnen zu kommunizieren und Ihnen Newsletter und Updates zu senden, wenn Sie sich angemeldet haben.",
        },
        {
          heading: "4. Datenspeicherung und Sicherheit",
          text: "Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre persönlichen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen.",
        },
        {
          heading: "5. Ihre Rechte",
          text: "Sie haben jederzeit das Recht, auf Ihre persönlichen Daten zuzugreifen, sie zu korrigieren oder zu löschen. Sie können sich auch jederzeit von unserem Newsletter abmelden, indem Sie auf den Abmeldelink in einer von uns gesendeten E-Mail klicken.",
        },
        {
          heading: "6. Cookies & Werbung von Drittanbietern",
          text: "Wir verwenden Cookies und ähnliche Tracking-Technologien, um die Aktivität auf unserer Website zu verfolgen. Darüber hinaus verwenden Drittanbieter – einschließlich Google – Cookies, um Anzeigen auf Grundlage Ihrer früheren Besuche auf dieser und anderen Websites auszuliefern. Die Verwendung von Werbe-Cookies durch Google ermöglicht es Google und seinen Partnern, Ihnen Anzeigen auf Grundlage Ihres Besuchs auf dieser und/oder anderen Websites im Internet bereitzustellen. Sie können personalisierte Werbung in den Google-Anzeigeneinstellungen (adssettings.google.com) deaktivieren und unter policies.google.com/technologies/partner-sites mehr darüber erfahren, wie Google Daten verwendet. Sie können Ihren Browser zudem so einstellen, dass er alle Cookies ablehnt.",
        },
        {
          heading: "7. Änderungen an dieser Richtlinie",
          text: "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Richtlinie auf dieser Seite veröffentlichen und das Datum 'Zuletzt aktualisiert' aktualisieren.",
        },
        {
          heading: "8. Kontakt",
          text: "Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte über die auf unserer Website angegebenen Kontaktinformationen.",
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
