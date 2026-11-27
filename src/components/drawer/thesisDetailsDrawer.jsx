"use client";

import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import {
  MdClose,
  MdMenuBook,
  MdPictureAsPdf,
  MdCalendarMonth,
  MdSchool,
  MdPeople,
} from "react-icons/md";

export default function ThesisDetailsDrawer({
  selectedThesis,
  setSelectedThesis,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  const document = selectedThesis.document;
  const title = selectedThesis.title;
  const authors = selectedThesis.authors;
  const keywords = selectedThesis.keywords;

  const details = [
    {
      label: "Academic Program",
      value: selectedThesis.program,
      icon: MdSchool,
    },
    {
      label: "Education Level",
      value: selectedThesis.educationLevel,
      icon: MdMenuBook,
    },
    {
      label: "Academic Year",
      value: selectedThesis.academicYear,
      icon: MdCalendarMonth,
    },
    {
      label: "Preview Pages",
      value: selectedThesis.previewPages || document.previewPages,
    },
    { label: "Total Pages", value: document.totalPages },
  ];

  const formatDate = (date) => {
    const value = new Date(date);

    return Number.isNaN(value.getTime())
      ? "Not available"
      : value.toLocaleDateString("en-PH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <div
      onClick={() => setSelectedThesis(null)}
      className="fixed inset-0 z-150 bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border border-(--color-panel)/10 bg-accent shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedThesis(null);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-panel) active:bg-(--color-panel) shrink-0"
          >
            <MdClose className="text-xl text-panel transition-all duration-20 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-base font-medium text-panel uppercase leading-tight tracking-wide">
            {selectedThesis.title}
          </p>
          <div className="mt-0.5 flex items-start gap-4">
            <BsPeopleFill className="mt-0.5 text-base text-muted shrink-0" />
            <p className="text-sm text-muted leading-tight">
              {selectedThesis?.authors?.join(", ") ||
                "Authors information unavailable"}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {details.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-brand p-4"
              >
                <p className="text-xs text-muted">{label}</p>
                <p className="mt-2 text-sm font-semibold text-accent">
                  {Array.isArray(value) ? value.join(", ") : value}
                </p>
              </div>
            ))}
          </div>
          {selectedThesis.keywords?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                Keywords
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedThesis.keywords.map((keyword, index) => (
                  <div key={index} className="px-4 py-2 rounded-full bg-muted">
                    <p className="text-xs text-panel capitalize">{keyword}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 rounded-lg border border-border bg-brand p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-second">
                <MdPictureAsPdf className="text-2xl text-accent" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-accent">
                  {document.originalFileName || "No document attached"}
                </p>
                <p className="text-xs text-muted">
                  {document.format?.toUpperCase() || "Unknown format"}
                  <span>
                    {typeof document.bytes === "number" &&
                      ` · ${(document.bytes / (1024 * 1024)).toFixed(2)} MB`}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs text-muted">
                {document.publicId
                  ? "A document is attached to this thesis record."
                  : "No document is attached to this thesis record."}
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <p className="text-xs text-panel">Thesis ID</p>
              <p className="text-xs text-muted">
                {selectedThesis.thesisId || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-panel">Date Added</p>
              <p className="text-xs text-muted">
                {selectedThesis.createdAt
                  ? formatDate(selectedThesis.createdAt)
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
