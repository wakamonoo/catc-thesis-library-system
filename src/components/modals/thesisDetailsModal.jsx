"use client";

import { MdClose, MdMenuBook, MdPictureAsPdf } from "react-icons/md";

export default function ThesisDetailsModal({
  thesis,
  onClose,
}) {
  if (!thesis) return null;

  const details = [
    {
      label: "Academic Program",
      value: thesis.program,
    },
    {
      label: "Education Level",
      value: thesis.educationLevel,
    },
    {
      label: "Academic Year",
      value: thesis.academicYear,
    },
    {
      label: "Preview Pages",
      value:
        thesis.previewPages ||
        thesis.document?.previewPages ||
        "Not specified",
    },
    {
      label: "Total Pages",
      value: thesis.document?.totalPages || "Not specified",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="thesisDetailsTitle"
        className="custom-scroll max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-(--color-border) bg-panel shadow-xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-panel p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-second">
              <MdMenuBook className="text-2xl text-accent" />
            </div>

            <div>
              <h2
                id="thesisDetailsTitle"
                className="font-heading text-lg font-bold text-accent"
              >
                Thesis Details
              </h2>
              <p className="text-xs text-muted">
                Complete thesis information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close thesis details"
            className="rounded-lg p-2 text-muted transition hover:bg-second hover:text-accent"
          >
            <MdClose size={22} />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Thesis Title
            </p>

            <h3 className="break-words font-heading text-xl font-bold text-accent">
              {thesis.title || "Untitled Thesis"}
            </h3>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Authors
            </p>

            {Array.isArray(thesis.authors) &&
            thesis.authors.length > 0 ? (
              <ul className="space-y-1">
                {thesis.authors.map((author, index) => (
                  <li
                    key={`${author}-${index}`}
                    className="text-sm text-normal"
                  >
                    {author}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">No authors listed.</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-lg border border-border bg-brand p-4"
              >
                <p className="text-xs text-muted">{detail.label}</p>
                <p className="mt-1 break-words text-sm font-semibold text-accent">
                  {detail.value || "Not specified"}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              Keywords
            </p>

            {Array.isArray(thesis.keywords) &&
            thesis.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {thesis.keywords.map((keyword, index) => (
                  <span
                    key={`${keyword}-${index}`}
                    className="rounded-full bg-second px-3 py-1 text-xs font-medium text-navy"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">No keywords available.</p>
            )}
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2">
              <MdPictureAsPdf className="text-2xl text-accent" />

              <div>
                <p className="text-sm font-semibold text-accent">
                  Thesis Document
                </p>
                <p className="text-xs text-muted">
                  {thesis.document?.originalFileName ||
                    "No document filename available"}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
              <span>
                Format:{" "}
                {thesis.document?.format?.toUpperCase() || "N/A"}
              </span>

              {typeof thesis.document?.bytes === "number" && (
                <span>
                  Size:{" "}
                  {(thesis.document.bytes / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </div>

            <p className="mt-3 text-xs text-muted">
              {thesis.document?.publicId
                ? "A PDF document is attached to this thesis record."
                : "No PDF document is attached."}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted">
              Thesis ID: {thesis.thesisId || "Not available"}
            </p>

            {thesis.createdAt && (
              <p className="mt-1 text-xs text-muted">
                Date added:{" "}
                {new Date(thesis.createdAt).toLocaleDateString(
                  "en-PH",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-border bg-panel p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-panel transition hover:opacity-90"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
