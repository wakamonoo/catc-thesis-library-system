import { BookOpen } from "lucide-react";

export default function EmptyCollection({ onAdd, hasFilters }) {
  return (
    <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-[#d8e1e7] bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f5f7] text-[#728292]">
        <BookOpen size={28} strokeWidth={1.7} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#30475e]">
        {hasFilters ? "No theses found" : "No theses yet"}
      </h3>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[#83909d]">
        {hasFilters
          ? "Try a different search term or program filter."
          : "Add your first thesis to start building the collection."}
      </p>
      {!hasFilters && (
        <button
          onClick={onAdd}
          className="mt-4 text-xs font-bold text-[#1c547e] underline decoration-[#a7c0d0] underline-offset-4 transition hover:text-[#112f56]"
        >
          Add your first thesis
        </button>
      )}
    </div>
  );
}
