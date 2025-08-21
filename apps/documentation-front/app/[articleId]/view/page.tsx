import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import DataContainer from "./DataContainer";

export const metadata: Metadata = {
  title: "Visualisation d'article",
  description:
    "Consultez et visualisez le contenu de cet article de documentation.",
  openGraph: {
    title: "Visualisation d'article - Documentation",
    description:
      "Consultez et visualisez le contenu de cet article de documentation.",
    type: "article",
  },
  twitter: {
    title: "Visualisation d'article - Documentation",
    description:
      "Consultez et visualisez le contenu de cet article de documentation.",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <DataContainer />
      </Suspense>
    </div>
  );
}
