"use client";

import { PlateEditor } from "@/components/editor/plate-editor";
import { useAppParams } from "@/hook/useAppParams";
import { useArticle } from "@/queries/article.queries";
import { Loader } from "lucide-react";

const EditorContainer = () => {
  const { articleId } = useAppParams();
  const { data: article, isPending } = useArticle(articleId);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <PlateEditor
      value={JSON.parse(article?.content || "[]")}
      articleId={articleId}
    />
  );
};

export default EditorContainer;
