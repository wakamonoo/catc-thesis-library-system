import { ChevronDown, Plus, UploadCloud, X } from "lucide-react";
import Field from "./field";

export default function AddThesisDrawer({
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
      className="fixed inset-0 z-20 flex justify-end bg-[#152b43]/25 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-thesis-title"
    >
      <div className="flex h-full w-full max-w-[672px] flex-col overflow-y-auto bg-white shadow-[-10px_0_40px_rgba(23,44,67,0.12)] animate-slide-in">
        <div className="flex items-start justify-between border-b border-[#e1e7eb] px-6 py-6 sm:px-7">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[-0.01em] text-[#5f7488]">
              Thesis collection
            </p>
            <h2
              id="add-thesis-title"
              className="mt-2 text-[27px] font-bold leading-none tracking-[-0.035em] text-[#182e45]"
            >
              Add thesis
            </h2>
            <p className="mt-2 text-sm text-[#718296]">
              Enter the research details and attach an optional PDF.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close add thesis form"
            className="rounded-md p-1 text-[#1b2c3d] transition hover:bg-[#f2f5f7] hover:text-[#0e4d70]"
          >
            <X size={21} strokeWidth={1.9} />
          </button>
        </div>

        <form
          onSubmit={onSave}
          className="flex flex-1 flex-col px-6 py-6 sm:px-7"
        >
          <div className="space-y-4">
            <Field label="Thesis title" required>
              <input
                required
                value={form.title}
                onChange={(event) => onChange("title", event.target.value)}
                placeholder="Enter the full thesis title"
                className="form-control"
              />
            </Field>
            <Field label="Authors" required>
              <input
                required
                value={form.authors}
                onChange={(event) => onChange("authors", event.target.value)}
                placeholder="Full names, separated by commas"
                className="form-control"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[1fr_154px]">
              <Field label="College program" required>
                <div className="relative">
                  <select
                    required
                    value={form.program}
                    onChange={(event) =>
                      onChange("program", event.target.value)
                    }
                    className="form-control appearance-none pr-10"
                  >
                    <option value="">Select a program</option>
                    {programs.map((program) => (
                      <option key={program}>{program}</option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#314a62]"
                    size={17}
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
                  onChange={(event) => onChange("year", event.target.value)}
                  placeholder="2026"
                  className="form-control"
                />
              </Field>
            </div>
            <Field label="Abstract">
              <textarea
                value={form.abstract}
                onChange={(event) => onChange("abstract", event.target.value)}
                placeholder="Research summary, objectives and findings"
                className="form-control min-h-[84px] resize-y"
              />
            </Field>
            <Field label="Keywords">
              <input
                value={form.keywords}
                onChange={(event) => onChange("keywords", event.target.value)}
                placeholder="e.g. library management, information systems"
                className="form-control"
              />
            </Field>
            <label className="flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#d7e1e6] bg-[#f5f8f9] px-5 text-center transition hover:border-[#8ba6b7] hover:bg-[#f0f6f8]">
              <UploadCloud
                className="text-[#738494]"
                size={28}
                strokeWidth={1.7}
              />
              <span className="mt-2 text-sm font-bold text-[#5a6d7f]">
                Attach thesis document
              </span>
              <span className="mt-1 text-xs text-[#82909d]">
                PDF · up to 20 MB · optional
              </span>
              <span className="mt-2 max-w-full truncate rounded-md bg-white px-3 py-1 text-xs text-[#334b63] shadow-[0_1px_2px_rgba(31,57,78,0.04)]">
                {documentName || "Choose File  No file chosen"}
              </span>
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={onDocumentChange}
                className="sr-only"
              />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-[#e1e7eb] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#d8e1e6] bg-white px-4 py-2.5 text-sm font-bold text-[#263a4f] transition hover:bg-[#f5f7f8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-[#112f56] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#193c69] focus:outline-none focus:ring-2 focus:ring-[#86a7bd] focus:ring-offset-2"
            >
              <Plus size={18} /> Save thesis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
