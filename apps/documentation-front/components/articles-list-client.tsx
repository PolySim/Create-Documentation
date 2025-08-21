"use client";

import { useArticles } from "@/queries/article.queries";
import { Loader2 } from "lucide-react";
import { ArticlesList } from "./articles-list";

export default function ArticlesListClient() {
  const { isPending } = useArticles();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return <ArticlesList />;
}
