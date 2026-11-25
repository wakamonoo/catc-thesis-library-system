import {
  MdCheck,
  MdPictureAsPdf,
  MdVisibility,
  MdCalendarMonth,
} from "react-icons/md";

export default function ThesisList({
  theses = [],
  onViewDetails,
}) {
  return (
    <div className="mt-5 space-y-3">
      {theses.map((thesis) => {
        const hasDocument = Boolean(thesis.document?.publicId);

        return (
          <article
            key={thesis.thesisId || thesis._id}
            className="rounded-lg border border-(--color-border) bg-panel p-5 transition hover:border-accent hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="break-words font-heading font-bold text-accent">
                  {thesis.title || "Untitled Thesis"}
                </h3>

                <p className="mt-1 text-sm text-muted">
                  {Array.isArray(thesis.authors) &&
                  thesis.authors.length > 0
                    ? thesis.authors.join(", ")
                    : "No authors listed"}
                </p>
              </div>

              <span className="w-fit shrink-0 rounded-full bg-second px-3 py-1 text-xs font-semibold text-navy">
                {thesis.academicYear || "Year not specified"}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded bg-second px-2.5 py-1">
                  {thesis.program || "Program not specified"}
                </span>

                <span className="rounded bg-second px-2.5 py-1">
                  {thesis.educationLevel || "Education level not specified"}
                </span>

                {hasDocument ? (
                  <span className="inline-flex items-center gap-1 text-success">
                    <MdCheck size={16} />
                    PDF attached
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted">
                    <MdPictureAsPdf size={16} />
                    No PDF
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => onViewDetails?.(thesis)}
                className="inline-flex w-fit items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-accent transition hover:border-accent hover:bg-second"
              >
                <MdVisibility size={18} />
                View Details
              </button>
            </div>

            {thesis.createdAt && (
              <div className="mt-3 flex items-center gap-1 text-xs text-muted">
                <MdCalendarMonth size={15} />

                Added{" "}
                {new Date(thesis.createdAt).toLocaleDateString(
                  "en-PH",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
