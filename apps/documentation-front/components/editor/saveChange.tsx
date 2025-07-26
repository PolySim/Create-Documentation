"use client";

import { useUpdateArticle } from "@/queries/article.queries";
import { useEditorRef } from "platejs/react";
import { Button } from "../ui/button";

const SaveChange = ({ articleId }: { articleId: string }) => {
  const editor = useEditorRef();
  const { mutate: updateArticle } = useUpdateArticle(articleId);

  return (
    <div className="fixed bottom-2 left-2 z-50">
      <Button
        onClick={() => {
          updateArticle(JSON.stringify(editor.children));
        }}
      >
        Save change
      </Button>
    </div>
  );
};

export default SaveChange;
