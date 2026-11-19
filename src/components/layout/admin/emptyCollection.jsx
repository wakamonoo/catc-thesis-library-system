import { MdMenuBook } from "react-icons/md";

export default function EmptyCollection({ onAdd, hasFilters }) {
  return (
    <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-(--color-border) bg-panel px-6 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-second text-muted">
        <MdMenuBook size={30} />
      </div>

      <h3 className="mt-4 font-heading text-sm font-bold text-accent">
        {hasFilters ? "No theses found" : "No theses yet"}
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-muted">
        {hasFilters
          ? "Try a different search term or program filter."
          : "Add your first thesis to start building the collection."}
      </p>

      {!hasFilters && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-4 text-xs font-bold text-accent underline decoration-(--color-border) underline-offset-4 transition hover:text-navy"
        >
          Add your first thesis
        </button>
      )}

    </div>
  );
}