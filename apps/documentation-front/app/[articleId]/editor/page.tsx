import { Toaster } from "sonner";

import EditorContainer from "./EditorContainer";

export default function Page({ params }: { params: { articleId: string } }) {
  const { articleId } = params;

  return (
    <div className="h-screen w-full">
      <EditorContainer articleId={articleId} />

      <Toaster />
    </div>
  );
}
