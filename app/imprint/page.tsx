"use client";

import { MainContent } from "@/components/MainContent";
import { BackLink } from "@/components/BackLink";
import { CompleteFooter } from "@/components/CompleteFooter";
import { useLanguage } from "@/lib/language";

export default function ImprintPage() {
  const { language } = useLanguage();
  const isGerman = language === "de";

  const content = {
    en: {
      title: "Imprint",
      sections: [
        {
          heading: "Information according to § 5 TMG",
          items: [
            { label: "Company", value: "KI-LAMPE" },
            { label: "Address", value: "Heinestraße 6, 22880 Wedel, Germany" },
          ],
        },
        {
          heading: "Contact",
          items: [
            { label: "Email", value: "sfou.business@gmail.com" },
            { label: "Website", value: "www.ki-lampe.com" },
          ],
        },
        {
          heading: "Responsible for Content",
          items: [
            { label: "Name", value: "KI-LAMPE Editorial Team" },
            { label: "Address", value: "Heinestraße 6, 22880 Wedel, Germany" },
          ],
        },
        {
          heading: "Disclaimer",
          text: "The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness or topicality. As service providers, we are liable for our own contents of these websites according to the general laws. However, we are not under obligation to permanently monitor submitted or stored information of third parties or to investigate circumstances pointing to illegal activity.",
        },
        {
          heading: "Liability for Links",
          text: "Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.",
        },
      ],
    },
    de: {
      title: "Impressum",
      sections: [
        {
          heading: "Angaben gemäß § 5 TMG",
          items: [
            { label: "Firma", value: "KI-LAMPE" },
            { label: "Adresse", value: "Heinestraße 6, 22880 Wedel, Deutschland" },
          ],
        },
        {
          heading: "Kontakt",
          items: [
            { label: "E-Mail", value: "sfou.business@gmail.com" },
            { label: "Website", value: "www.ki-lampe.com" },
          ],
        },
        {
          heading: "Verantwortlich für den Inhalt",
          items: [
            { label: "Name", value: "KI-LAMPE Redaktion" },
            { label: "Adresse", value: "Heinestraße 6, 22880 Wedel, Deutschland" },
          ],
        },
        {
          heading: "Haftungsausschluss",
          text: "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        },
        {
          heading: "Haftung für Links",
          text: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
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
          mb-12
          desktop:mb-16
        ">
          {currentContent.title}
        </h1>

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
              
              {section.items && (
                <dl className="space-y-3 mb-4 desktop:mb-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex flex-col tablet:flex-row">
                      <dt className="
                        text-base-custom
                        font-semibold
                        text-foreground
                        min-w-[120px]
                        mb-1
                        tablet:mb-0
                      ">
                        {item.label}:
                      </dt>
                      <dd className="
                        text-base-custom
                        text-foreground/70
                        tablet:ml-4
                      ">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.text && (
                <p className="
                  text-base-custom
                  leading-relaxed
                  text-foreground/70
                ">
                  {section.text}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <CompleteFooter />
    </MainContent>
  );
}
