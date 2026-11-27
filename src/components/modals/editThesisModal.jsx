"use client";

import { MdClose } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext, useState } from "react";
import { ProgramContext } from "@/context/programContext";
import { EducationLevelContext } from "@/context/educationLevelContext";
import ActionButton from "../buttons/actionButton";
import RegularButton from "../buttons/regularButton";

export default function EditThesisModal({
  thesis,
  onClose,
  onSubmit,
  errorMessage,
}) {
  const { programs } = useContext(ProgramContext);
  const { educationLevels } = useContext(EducationLevelContext);
  const [validationError, setValidationError] = useState("");
  const [title, setTitle] = useState(thesis.title || "");
  const [authors, setAuthors] = useState(thesis.authors?.join(", ") || "");
  const [program, setProgram] = useState(thesis.program || "");
  const [educationLevel, setEducationLevel] = useState(
    thesis.educationLevel || "",
  );
  const [academicYear, setAcademicYear] = useState(thesis.academicYear || "");
  const [keywords, setKeywords] = useState(thesis.keywords?.join(", ") || "");

  const handleSubmit = () => {
    const authorList = authors
      .split(",")
      .map((author) => author.trim())
      .filter(Boolean);
    const keywordList = keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    if (
      !title.trim() ||
      !authorList.length ||
      !program ||
      !educationLevel ||
      !academicYear.trim() ||
      !keywordList.length
    ) {
      setValidationError("Please complete all fields.");
      return;
    }

    setValidationError("");
    onSubmit({
      title: title.trim(),
      authors: authorList,
      program: program.trim(),
      educationLevel: educationLevel.trim(),
      academicYear: academicYear.trim(),
      keywords: keywordList,
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto custom-scroll rounded-2xl border border-(--color-panel)/10 bg-accent shadow-2xl"
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-panel) active:bg-(--color-panel) shrink-0"
          >
            <MdClose className="text-xl text-panel transition-all duration-20 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-14 h-auto shrink-0">
            <Image
              src={Logo}
              alt="CAT-C Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-2 text-base text-panel uppercase font-semibold tracking-widest">
            Edit Thesis
          </p>
          <span className="text-xs text-center text-muted">
            Update the thesis details below.
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="edit-thesis-title" className="text-sm font-medium text-panel">
              Title
            </label>
            <input
              id="edit-thesis-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter full thesis title"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="edit-thesis-authors" className="text-sm font-medium text-panel">
              Authors
            </label>
            <input
              id="edit-thesis-authors"
              type="text"
              value={authors}
              onChange={(event) => setAuthors(event.target.value)}
              placeholder="eg. Juan Dela Cruz, Jose Rizal"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="edit-thesis-program" className="text-sm font-medium text-panel">
              Program
            </label>
            <select
              id="edit-thesis-program"
              value={program}
              onChange={(event) => setProgram(event.target.value)}
              required
              className="w-full cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
            >
              <option value="" disabled>
                Select a program
              </option>
              {programs.map((availableProgram) => (
                <option key={availableProgram.id} value={availableProgram.title}>
                  {availableProgram.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="edit-thesis-education-level" className="text-sm font-medium text-panel">
              Education Level
            </label>
            <select
              id="edit-thesis-education-level"
              value={educationLevel}
              onChange={(event) => setEducationLevel(event.target.value)}
              required
              className="w-full cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
            >
              <option value="" disabled>
                Select an education level
              </option>
              {educationLevels.map((level) => (
                <option key={level.id} value={level.level}>
                  {level.level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="edit-thesis-academic-year" className="text-sm font-medium text-panel">
              Academic Year
            </label>
            <input
              id="edit-thesis-academic-year"
              type="text"
              value={academicYear}
              onChange={(event) => setAcademicYear(event.target.value)}
              placeholder="eg. 2025-2026"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="edit-thesis-keywords" className="text-sm font-medium text-panel">
              Keywords
            </label>
            <input
              id="edit-thesis-keywords"
              type="text"
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              placeholder="e.g. library management, information systems"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          {(validationError || errorMessage) && (
            <p className="mt-2 text-xs w-full text-error text-center">
              {validationError || errorMessage}
            </p>
          )}

          <div className="mt-4 ml-auto flex gap-2 w-fit">
            <RegularButton onClick={onClose}>
              <p className="text-sm text-normal font-bold tracking-wide whitespace-nowrap">
                Cancel
              </p>
            </RegularButton>
            <ActionButton onClick={handleSubmit}>
              <p className="text-sm text-normal font-bold tracking-wide whitespace-nowrap">
                Save Changes
              </p>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
