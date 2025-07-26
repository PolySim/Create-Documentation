"use client";

import { PlateEditor } from "@/components/editor/plate-editor";
import { useArticle } from "@/queries/article.queries";
import { Loader } from "lucide-react";

const EditorContainer = ({ articleId }: { articleId: string }) => {
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
