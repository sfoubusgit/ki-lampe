export type Language = 'de' | 'en'

export const translations = {
  de: {
    // Navigation
    nav: {
      home: 'Home',
      articles: 'Artikel',
      news: 'News',
      about: 'Über uns',
      contact: 'Kontakt',
    },
    // Hero Section
    hero: {
      welcome: 'WILLKOMMEN BEI',
      tagline: 'Erleuchtung durch künstliche Intelligenz – verständlich erklärt, praxisnah und alltagstauglich.',
      discoverArticles: 'Artikel entdecken',
    },
    // Home Page
    home: {
      popularTopics: 'Beliebte Themen',
      popularTopicsSubtitle: 'Entdecke unsere meistgelesenen Kategorien',
      currentArticles: 'Aktuelle Artikel',
      currentArticlesSubtitle: 'Die neuesten Insights und Expertentipps',
      showAllArticles: 'Alle Artikel anzeigen',
      article: 'Artikel',
      articles: 'Artikel',
      readMore: 'Weiterlesen',
    },
    // Footer
    footer: {
      navigation: 'Navigation',
      legal: 'Rechtliches',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
      newsletter: 'Newsletter',
      newsletterDescription: 'Bleiben Sie auf dem Laufenden mit unseren neuesten Artikeln.',
      emailPlaceholder: 'Ihre E-Mail',
      subscribe: 'Abonnieren',
      processing: 'Wird verarbeitet...',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      amazonNote: 'Hinweis: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      subscribeSuccess: 'Vielen Dank für Ihre Anmeldung!',
      subscribeError: 'Ein Fehler ist aufgetreten.',
      subscribeErrorRetry: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    },
    // Cookie Banner
    cookies: {
      description: 'Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.',
      learnMore: 'Mehr erfahren',
      reject: 'Ablehnen',
      accept: 'Akzeptieren',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      articles: 'Articles',
      news: 'News',
      about: 'About',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      welcome: 'WELCOME TO',
      tagline: 'Enlightenment through artificial intelligence – explained clearly, practical and suitable for everyday use.',
      discoverArticles: 'Discover Articles',
    },
    // Home Page
    home: {
      popularTopics: 'Popular Topics',
      popularTopicsSubtitle: 'Discover our most-read categories',
      currentArticles: 'Current Articles',
      currentArticlesSubtitle: 'The latest insights and expert tips',
      showAllArticles: 'Show All Articles',
      article: 'Article',
      articles: 'Articles',
      readMore: 'Read More',
    },
    // Footer
    footer: {
      navigation: 'Navigation',
      legal: 'Legal',
      imprint: 'Imprint',
      privacy: 'Privacy',
      terms: 'Terms',
      newsletter: 'Newsletter',
      newsletterDescription: 'Stay up to date with our latest articles.',
      emailPlaceholder: 'Your Email',
      subscribe: 'Subscribe',
      processing: 'Processing...',
      allRightsReserved: 'All rights reserved.',
      amazonNote: 'Note: As an Amazon Associate I earn from qualifying purchases.',
      invalidEmail: 'Please enter a valid email address.',
      subscribeSuccess: 'Thank you for your subscription!',
      subscribeError: 'An error occurred.',
      subscribeErrorRetry: 'An error occurred. Please try again later.',
    },
    // Cookie Banner
    cookies: {
      description: 'We use cookies to provide you with the best experience on our website. By using our website, you agree to the use of cookies.',
      learnMore: 'Learn More',
      reject: 'Reject',
      accept: 'Accept',
    },
  },
} as const
