import { Suspense } from "react";
import SearchResults from "./searchResults";
import { PageLoader } from "@/components/loaders/pageLoader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SearchResults />
    </Suspense>
  );
}
