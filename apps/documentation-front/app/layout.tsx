import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { config } from "@/config/config";
import { ReactQueryProvider } from "@/lib/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Documentation - Plateforme de documentation collaborative",
    template: "%s | Documentation",
  },
  description:
    "Plateforme de documentation collaborative moderne avec éditeur riche et gestion d'articles avancée. Créez, partagez et collaborez sur vos documentations.",
  keywords: [
    "documentation",
    "collaboration",
    "éditeur",
    "articles",
    "plateforme",
    "partage",
  ],
  authors: [{ name: "Documentation Team" }],
  creator: "Documentation Team",
  publisher: "Documentation Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(config.APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Documentation - Plateforme de documentation collaborative",
    description:
      "Plateforme de documentation collaborative moderne avec éditeur riche et gestion d'articles avancée.",
    siteName: "Documentation",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Documentation - Plateforme collaborative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation - Plateforme de documentation collaborative",
    description:
      "Plateforme de documentation collaborative moderne avec éditeur riche et gestion d'articles avancée.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = config.APP_URL || "http://localhost:3000";

  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          <WebsiteJsonLd
            name="Documentation - Plateforme de documentation collaborative"
            description="Plateforme de documentation collaborative moderne avec éditeur riche et gestion d'articles avancée."
            url={baseUrl}
          />
          <OrganizationJsonLd
            name="Documentation Platform"
            description="Plateforme de documentation collaborative"
            url={baseUrl}
            logo={`${baseUrl}/logo.png`}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex flex-col`}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster richColors closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
