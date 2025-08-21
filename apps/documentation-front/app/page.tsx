import ArticlesListClient from "@/components/articles-list-client";
import { generateHomeMetadata } from "@/components/seo/home-metadata";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = generateHomeMetadata();

export default function Home() {
  return (
    <main>
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">
                  <Loader2 className="animate-spin" />
                </div>
              </div>
            }
          >
            <ArticlesListClient />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
