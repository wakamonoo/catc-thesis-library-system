"use client";

import { MdClose, MdAdd } from "react-icons/md";

import ActionButton from "@/components/buttons/actionButton";
import PrimaryButton from "@/components/buttons/primaryButton";
import TertiaryButton from "@/components/buttons/tertiaryButton";

export default function AddStudentModal({
  show,
  editingStudent,
  form,
  formError,
  programs,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-auto w-full max-w-xl overflow-hidden rounded-xl border border-border bg-panel shadow-2xl">

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between bg-accent px-6 py-5">
          <div>
            <h2 className="font-alt text-base font-bold uppercase tracking-wider text-panel">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>

            <p className="mt-1 text-xs text-muted">
              {editingStudent
                ? "Update the student's profile information."
                : "Enter the student's information below."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-panel transition hover:bg-white/10"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* MODAL FORM */}
        <form onSubmit={onSubmit} className="space-y-5 p-6">

          {/* FORM ERROR */}
          {formError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-error">
              {formError}
            </div>
          )}

          {/* STUDENT ID */}
          <FormField
            label="Student ID"
            name="studentId"
            value={form.studentId}
            onChange={onChange}
            placeholder="e.g. 2024-001"
          />

          {/* FULL NAME */}
          <FormField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter student's full name"
          />

          {/* EMAIL ADDRESS */}
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="student@example.com"
          />

          {/* PROGRAM FIELD */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-accent">
              College Program <span className="text-error">*</span>
            </label>

            <select
              name="program"
              value={form.program}
              onChange={onChange}
              required
              className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-normal outline-none transition focus:border-accent"
            >
              <option value="">Select a program</option>

              {programs.map((program) => (
                <option key={program.id} value={program.title}>
                  {program.title}
                </option>
              ))}
            </select>
          </div>

          {/* MODAL BUTTONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">

            {/* CANCEL BUTTON */}
            <div className="sm:w-36">
              <PrimaryButton onClick={onClose}>
                <span className="text-sm font-semibold text-accent">
                  Cancel
                </span>
              </PrimaryButton>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="sm:w-44">
              {editingStudent ? (
                <ActionButton type="submit">
                  <span className="text-sm font-bold text-accent">
                    Save Changes
                  </span>
                </ActionButton>
              ) : (
                <TertiaryButton type="submit">
                  <MdAdd className="text-base text-panel shrink-0" />
                  <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
                    Add Student
                  </p>
                </TertiaryButton>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}


function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-accent">
        {label} <span className="text-error">*</span>
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-border bg-panel px-4 py-3 text-sm text-normal outline-none transition focus:border-accent"
      />
    </div>
  );
}
