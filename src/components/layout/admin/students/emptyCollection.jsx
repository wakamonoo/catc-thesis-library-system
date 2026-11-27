import { MdPeople } from "react-icons/md";

import TertiaryButton from "@/components/buttons/tertiaryButton";

export default function EmptyCollection({ hasFilters, setShowAddThesisModal }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-panel p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-second">
        <MdPeople className="shrink-0 text-4xl text-muted" />
      </div>
      <p className="mt-4 text-base font-semibold text-accent">
        No Students Found
      </p>
      <p className="max-w-sm text-center text-xs text-muted">
        {hasFilters
          ? "Try changing your search or filters."
          : "There are currently no student records."}
      </p>
      <div className="mt-2 w-fit">
        <TertiaryButton onClick={() => setShowAddThesisModal(true)}>
          <p className="whitespace-nowrap text-sm font-bold tracking-wide text-panel">
            Add Thesis
          </p>
        </TertiaryButton>
      </div>
      ,
    </div>
  );
}
