import { config } from "@/config/config";
import { Metadata } from "next";

export function generateHomeMetadata(): Metadata {
  const baseUrl = config.APP_URL;

  return {
    title: "Accueil - Plateforme de Documentation Collaborative",
    description:
      "Découvrez notre plateforme de documentation collaborative moderne. Créez, partagez et collaborez sur vos documentations avec notre éditeur riche et intuitif. Parcourez les articles, gérez vos contenus et améliorez la productivité de votre équipe.",
    keywords: [
      "documentation",
      "collaboration",
      "éditeur",
      "articles",
      "plateforme",
      "partage",
      "équipe",
      "productivité",
      "gestion",
      "contenu",
    ],
    authors: [{ name: "Documentation Team" }],
    creator: "Documentation Team",
    publisher: "Documentation Platform",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "/",
      title: "Accueil - Plateforme de Documentation Collaborative",
      description:
        "Découvrez notre plateforme de documentation collaborative moderne. Créez, partagez et collaborez sur vos documentations avec notre éditeur riche et intuitif.",
      siteName: "Documentation",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Documentation - Plateforme collaborative moderne",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Accueil - Plateforme de Documentation Collaborative",
      description:
        "Découvrez notre plateforme de documentation collaborative moderne. Créez, partagez et collaborez sur vos documentations avec notre éditeur riche et intuitif.",
      images: ["/og-image.png"],
      site: "@votrecompte", // Remplacez par votre compte Twitter
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      "application-name": "Documentation",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "Documentation",
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-config": "/browserconfig.xml",
      "msapplication-TileColor": "#3b82f6",
      "msapplication-tap-highlight": "no",
      "theme-color": "#3b82f6",
    },
  };
}
