import { config } from "@/config/config";
import { Metadata } from "next";

interface ArticleMetadataProps {
  article: {
    id: string;
    title: string;
    description?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author?: string;
  };
}

export function generateArticleMetadata({
  article,
}: ArticleMetadataProps): Metadata {
  const baseUrl = config.APP_URL;
  const articleUrl = `${baseUrl}/${article.id}/view`;

  // Extraire un extrait du contenu pour la description si elle n'existe pas
  const description =
    article.description ||
    article.content.substring(0, 160).replace(/<[^>]*>/g, "") + "...";

  // Générer des mots-clés basés sur le titre et le contenu
  const keywords = [
    "documentation",
    "article",
    article.title.toLowerCase(),
    ...article.content
      .toLowerCase()
      .replace(/<[^>]*>/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 10),
  ];

  return {
    title: article.title,
    description: description,
    keywords: keywords,
    authors: [{ name: article.author || "Documentation Team" }],
    openGraph: {
      title: `${article.title} - Documentation`,
      description: description,
      type: "article",
      url: articleUrl,
      siteName: "Documentation",
      locale: "fr_FR",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author || "Documentation Team"],
      section: "Documentation",
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} - Documentation`,
      description: description,
      site: "@votrecompte", // Remplacez par votre compte Twitter
    },
    alternates: {
      canonical: articleUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:published_time": article.createdAt,
      "article:modified_time": article.updatedAt,
      "article:author": article.author || "Documentation Team",
      "article:section": "Documentation",
    },
  };
}
