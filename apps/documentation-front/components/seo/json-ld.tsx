import { config } from "@/config/config";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: datePublished,
    dateModified: dateModified,
    url: url,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Documentation Platform",
      url: config.APP_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebsiteJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function WebsiteJsonLd({ name, description, url }: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    description: description,
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface OrganizationJsonLdProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
}

export function OrganizationJsonLd({
  name,
  description,
  url,
  logo,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: name,
    description: description,
    url: url,
    ...(logo && {
      logo: {
        "@type": "ImageObject",
        url: logo,
      },
    }),
    sameAs: [
      // Ajoutez ici vos réseaux sociaux
      // "https://twitter.com/votrecompte",
      // "https://linkedin.com/company/votreentreprise",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
