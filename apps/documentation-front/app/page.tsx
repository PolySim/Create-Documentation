"use client";

import { ArticlesList } from "@/components/articles-list";
import { useArticles } from "@/queries/article.queries";
import { Loader } from "lucide-react";

export default function Home() {
  const { data: articles = [], isLoading } = useArticles();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">
          <Loader className="animate-spin" />
        </div>
      </div>
    );
  }

  return <ArticlesList articles={articles} />;
}
