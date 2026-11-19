import Field from "./field";
import { MdClose, MdKeyboardArrowDown, MdCloudUpload, MdAdd, } from "react-icons/md";

export default function AddThesisModal({
  programs,
  form,
  documentName,
  onChange,
  onDocumentChange,
  onClose,
  onSave,
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-thesis-title"
    >

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-panel shadow-2xl"
      >

        {/* MODAL HEADER */}
        <div className="flex items-start justify-between border-b border-(--color-border) px-6 py-5 sm:px-7">

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              Thesis collection
            </p>

            <h2
              id="add-thesis-title"
              className="mt-2 font-heading text-[25px] font-bold leading-tight tracking-tight text-accent"
            >
              Add thesis
            </h2>

            <p className="mt-2 text-sm text-muted">
              Enter the research details and attach an optional PDF.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close add thesis form"
            className="rounded-full p-2 text-muted transition hover:bg-second hover:text-accent"
          >
            <MdClose size={23} />
          </button>

        </div>

        {/* MODAL FORM */}
        <form
          onSubmit={onSave}
          className="custom-scroll flex-1 overflow-y-auto px-6 py-6 sm:px-7"
        >

          <div className="space-y-4">

            {/* THESIS TITLE */}
            <Field label="Thesis title" required>
              <input
                required
                value={form.title}
                onChange={(event) =>
                  onChange("title", event.target.value)
                }
                placeholder="Enter the full thesis title"
                className="w-full rounded-md border border-(--color-border) bg-panel px-3 py-2 text-sm text-normal outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
              />
            </Field>

            {/* AUTHORS */}
            <Field label="Authors" required>
              <input
                required
                value={form.authors}
                onChange={(event) =>
                  onChange("authors", event.target.value)
                }
                placeholder="Full names, separated by commas"
                className="w-full rounded-md border border-(--color-border) bg-panel px-3 py-2 text-sm text-normal outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
              />
            </Field>

            {/* PROGRAM AND YEAR */}
            <div className="grid gap-4 sm:grid-cols-[1fr_154px]">

              <Field label="College program" required>
                <div className="relative">

                  <select
                    required
                    value={form.program}
                    onChange={(event) =>
                      onChange("program", event.target.value)
                    }
                    className="w-full appearance-none rounded-md border border-(--color-border) bg-panel px-3 py-2 pr-10 text-sm text-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
                  >
                    <option value="">
                      Select a program
                    </option>

                    {programs.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>

                  <MdKeyboardArrowDown
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                    size={20}
                  />

                </div>
              </Field>

              <Field label="Publication year" required>
                <input
                  required
                  type="number"
                  min="1900"
                  max="2100"
                  value={form.year}
                  onChange={(event) =>
                    onChange("year", event.target.value)
                  }
                  placeholder="2026"
                  className="w-full rounded-md border border-(--color-border) bg-panel px-3 py-2 text-sm text-normal outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
                />
              </Field>

            </div>

            {/* ABSTRACT */}
            <Field label="Abstract">
              <textarea
                value={form.abstract}
                onChange={(event) =>
                  onChange("abstract", event.target.value)
                }
                placeholder="Research summary, objectives and findings"
                className="min-h-[84px] w-full resize-y rounded-md border border-(--color-border) bg-panel px-3 py-2 text-sm text-normal outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
              />
            </Field>

            {/* KEYWORDS */}
            <Field label="Keywords">
              <input
                value={form.keywords}
                onChange={(event) =>
                  onChange("keywords", event.target.value)
                }
                placeholder="e.g. library management, information systems"
                className="w-full rounded-md border border-(--color-border) bg-panel px-3 py-2 text-sm text-normal outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
              />
            </Field>

            {/* PDF UPLOAD */}
            <label className="flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-(--color-border) bg-brand px-5 text-center transition hover:border-accent hover:bg-second">

              <MdCloudUpload
                className="text-muted"
                size={32}
              />

              <span className="mt-2 text-sm font-bold text-accent">
                Attach thesis document
              </span>

              <span className="mt-1 text-xs text-muted">
                PDF · up to 20 MB · optional
              </span>

              <span className="mt-2 max-w-full truncate rounded-md bg-panel px-3 py-1 text-xs text-normal shadow-sm">
                {documentName || "Choose File - No file chosen"}
              </span>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={onDocumentChange}
                className="sr-only"
              />

            </label>

          </div>

          {/* MODAL FOOTER */}
          <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-(--color-border) pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-(--color-border) bg-panel px-4 py-2.5 text-sm font-bold text-normal transition hover:bg-second"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-panel transition hover:bg-(--color-accent-dark) focus:outline-none focus:ring-2 focus:ring-(--color-navy) focus:ring-offset-2"
            >
              <MdAdd size={20} />
              Save thesis
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}