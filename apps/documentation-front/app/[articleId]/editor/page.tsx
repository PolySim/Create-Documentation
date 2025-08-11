import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import EditorContainer from "./EditorContainer";

export const metadata = {
  title: "Éditeur",
};

export default function Page() {
  return (
    <div className="h-screen w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <EditorContainer />
      </Suspense>
    </div>
  );
}
