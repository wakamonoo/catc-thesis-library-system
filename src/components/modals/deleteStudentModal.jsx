"use client";

import { MdDelete } from "react-icons/md";
import ActionButton from "@/components/buttons/actionButton";
import PrimaryButton from "@/components/buttons/primaryButton";

export default function deleteStudentModal({
  student,
  onCancel,
  onConfirm,
}) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-panel p-6 shadow-2xl">

        {/* DELETE ICON */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <MdDelete className="text-2xl text-red-600" />
        </div>

        {/* MODAL CONTENT */}
        <h2 className="mt-4 text-lg font-bold text-accent">
          Delete Student?
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-accent">
            {student.name}
          </span>
          ? This action will remove the student from this frontend list.
        </p>

        {/* MODAL BUTTONS */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <div className="sm:w-32">
            <PrimaryButton onClick={onCancel}>
              <span className="text-sm font-semibold text-accent">
                Cancel
              </span>
            </PrimaryButton>
          </div>

          <div className="sm:w-40">
            <ActionButton onClick={onConfirm}>
              <span className="text-sm font-bold text-accent">
                Delete Student
              </span>
            </ActionButton>
          </div>

        </div>
      </div>
    </div>
  );
}
