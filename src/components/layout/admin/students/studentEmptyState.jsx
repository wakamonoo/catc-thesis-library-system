import { MdAdd, MdPeople } from "react-icons/md";

import TertiaryButton from "@/components/buttons/tertiaryButton";

export default function StudentEmptyState({
  isFiltered,
  onAdd,
}) {
  return (
    <tr>
      <td colSpan="5" className="px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand">
          <MdPeople className="text-3xl text-muted" />
        </div>

        <h3 className="mt-4 text-sm font-bold text-accent">
          No Students Found
        </h3>

        <p className="mt-1 text-xs text-muted">
          {isFiltered
            ? "Try changing your search or filters."
            : "There are currently no student records."}
        </p>

        {!isFiltered && (
          <div className="mx-auto mt-4 max-w-40">
            <TertiaryButton onClick={onAdd}>
              <MdAdd className="text-lg" />
              <span className="text-xs font-semibold text-panel">
                Add Student
              </span>
            </TertiaryButton>
          </div>
        )}
      </td>
    </tr>
  );
}
