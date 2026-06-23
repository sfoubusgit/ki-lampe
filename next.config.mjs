/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // 301 redirects: the old (pre-redesign) German URL scheme -> the current English routes.
  // Keeps Google's indexed links + inbound traffic alive instead of 404ing after the v2 redesign.
  async redirects() {
    return [
      // ARTICLES — /artikel/<slug> -> /article/<slug>  (article slugs carried over 1:1)
      { source: '/artikel/seite/:n', destination: '/news', permanent: true },
      { source: '/artikel/:slug', destination: '/article/:slug', permanent: true },
      { source: '/artikel', destination: '/news', permanent: true },
      { source: '/news/seite/:n', destination: '/news', permanent: true },
      // CATEGORIES — old free-form German categories have no 1:1 equivalent -> articles listing
      { source: '/kategorie/:slug', destination: '/news', permanent: true },
      { source: '/kategorie', destination: '/news', permanent: true },
      // REMOVED FEATURES (tags / authors / search) -> home
      { source: '/tag/:slug', destination: '/', permanent: true },
      { source: '/tag', destination: '/', permanent: true },
      { source: '/autor/:slug', destination: '/', permanent: true },
      { source: '/autor', destination: '/', permanent: true },
      { source: '/suche', destination: '/', permanent: true },
      // STATIC PAGES — German -> English
      { source: '/ueber', destination: '/about', permanent: true },
      { source: '/impressum', destination: '/imprint', permanent: true },
      { source: '/datenschutz', destination: '/privacy', permanent: true },
      { source: '/agb', destination: '/terms', permanent: true },
      { source: '/kontakt', destination: '/imprint', permanent: true },
      // OLD ROOT-LEVEL ARTICLE LANDING PAGES
      { source: '/ki-als-werkzeug-kuenstler', destination: '/article/ki-als-werkzeug-kuenstler', permanent: true },
      { source: '/papa-kind-lego-mit-ki', destination: '/article/ki-lego-objekte-bauen', permanent: true },
      // OLD RSS FEED
      { source: '/rss.xml', destination: '/news', permanent: true },
    ];
  },
};

export default nextConfig;
