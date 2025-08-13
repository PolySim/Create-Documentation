"use client";

import { useAppParams } from "@/hook/useAppParams";
import { useArticle } from "@/queries/article.queries";
import { Loader2 } from "lucide-react";
import ViewContainer from "./ViewContainer";

const DataContainer = () => {
  const { articleId } = useAppParams();
  const { data: article, isPending } = useArticle(articleId);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return <ViewContainer value={JSON.parse(article?.content || "[]")} />;
};

export default DataContainer;
