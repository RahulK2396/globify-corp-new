import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceItem {
  name: string;
  description: string;
  url?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
  };
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  faq?: FAQItem[];
  services?: ServiceItem[];
  breadcrumbs?: BreadcrumbItem[];
  howTo?: { name: string; description?: string; steps: HowToStep[] };
  speakable?: string[];
}

const SITE_NAME = "Globify";
const BASE_URL = "https://globify.ae";
const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.png`;

// Dynamic OG image based on page path for unique social sharing previews
const getOGImageForPath = (canonical?: string): string => {
  if (!canonical) return DEFAULT_OG_IMAGE;
  // For now all pages use default OG image - replace with proper 1200x630 images when available
  return DEFAULT_OG_IMAGE;
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Globify",
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png`, width: 512, height: 512 },
  description: "Globify delivers custom web & mobile app development, e-commerce, ERP, AI automation, and digital marketing solutions.",
  sameAs: [
    "https://www.linkedin.com/company/globify",
    "https://www.instagram.com/globify.in",
    "https://www.facebook.com/globify.in",
  ],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Trivandrum",
      addressRegion: "Kerala",
      addressCountry: "IN",
      streetAddress: "Amster House, Technopark Trivandrum",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
      streetAddress: "Office 310, Al Qusais Plaza Building, Damascus Street, Qusais",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Gießen",
      addressCountry: "DE",
      streetAddress: "101, Eichendorffring, 35394 Gießen",
    },
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-9544086877", contactType: "sales", areaServed: "IN" },
    { "@type": "ContactPoint", telephone: "+971-547308673", contactType: "sales", areaServed: "AE" },
    { "@type": "ContactPoint", telephone: "+49-1777072309", contactType: "sales", areaServed: "DE" },
  ],
};

const buildFAQSchema = (faq: FAQItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

const buildServiceSchema = (services: ServiceItem[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@type": "Organization", name: "Globify" },
      ...(s.url ? { url: `${BASE_URL}${s.url}` } : {}),
    },
  })),
});

const buildBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((bc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: bc.name,
    item: `${BASE_URL}${bc.url}`,
  })),
});

const buildHowToSchema = (howTo: { name: string; description?: string; steps: HowToStep[] }) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: howTo.name,
  ...(howTo.description ? { description: howTo.description } : {}),
  step: howTo.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});

const buildArticleSchema = (title: string, description: string, canonical: string, article: { publishedTime?: string; author?: string; section?: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: `${BASE_URL}${canonical}`,
  ...(article.publishedTime ? { datePublished: article.publishedTime } : {}),
  ...(article.author ? { author: { "@type": "Person", name: article.author } } : {}),
  ...(article.section ? { articleSection: article.section } : {}),
  publisher: {
    "@type": "Organization",
    name: "Globify",
    logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
  },
});

const buildSpeakableSchema = (canonical: string, cssSelectors: string[]) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: `${BASE_URL}${canonical}`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  },
});

const SEOHead = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  article,
  noindex = false,
  jsonLd,
  faq,
  services,
  breadcrumbs,
  howTo,
  speakable,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Globify") ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const resolvedOGImage = ogImage || getOGImageForPath(canonical);

  const schemas: Record<string, unknown>[] = [];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) schemas.push(...jsonLd);
    else schemas.push(jsonLd);
  }
  if (faq && faq.length > 0) schemas.push(buildFAQSchema(faq));
  if (services && services.length > 0) schemas.push(buildServiceSchema(services));
  if (breadcrumbs && breadcrumbs.length > 0) schemas.push(buildBreadcrumbSchema(breadcrumbs));
  if (howTo) schemas.push(buildHowToSchema(howTo));
  if (article && canonical) schemas.push(buildArticleSchema(fullTitle, description, canonical, article));
  if (speakable && canonical) schemas.push(buildSpeakableSchema(canonical, speakable));

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Hreflang - only x-default since all regions serve same content */}
      {canonical && <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${canonical}`} />}
      {canonical && <link rel="alternate" hrefLang="en" href={`${BASE_URL}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={resolvedOGImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOGImage} />

      {/* Article metadata */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}

      {/* JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export { ORGANIZATION_SCHEMA };
export default SEOHead;
