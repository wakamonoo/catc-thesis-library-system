import { Suspense } from "react";
import ThesesContent from "./thesesContent";
import { PageLoader } from "@/components/loaders/pageLoader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ThesesContent />
    </Suspense>
  );
}
