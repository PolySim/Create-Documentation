import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import DataContainer from "./DataContainer";

export const metadata = {
  title: "Éditeur",
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
