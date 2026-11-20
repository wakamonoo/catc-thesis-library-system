import TertiaryButton from "@/components/buttons/tertiaryButton";
import { MdMenuBook } from "react-icons/md";

export default function EmptyCollection({ setShowAddThesisModal, hasFilters }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-panel p-8">
      <div className="flex w-14 h-14 items-center justify-center rounded-full bg-second">
        <MdMenuBook className="text-4xl text-muted shrink-0" />
      </div>
      <p className="mt-4 text-base font-semibold text-accent">
        {hasFilters ? "No theses found" : "No theses yet"}
      </p>
      <p className="max-w-sm text-xs text-muted">
        {hasFilters
          ? "Try a different search term or program filter."
          : "Add first thesis to start building the collection."}
      </p>
      {!hasFilters && (
        <div className="mt-2 w-fit">
          <TertiaryButton onClick={() => setShowAddThesisModal(true)}>
            <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
              Add Thesis
            </p>
          </TertiaryButton>
        </div>
      )}
    </div>
  );
}
