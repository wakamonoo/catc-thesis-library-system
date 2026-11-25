"use client";

import {
  MdMoreVert,
  MdEdit,
  MdDelete,
  MdBlock,
  MdCheckCircle,
} from "react-icons/md";

export default function StudentRow({
  student,
  activeMenu,
  setActiveMenu,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Suspended":
        return "bg-red-100 text-red-700";

      case "Not Registered":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b border-border transition hover:bg-brand/50">
      {/* STUDENT INFORMATION */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-panel">
            {getInitials(student.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-accent">
              {student.name}
            </p>

            <p className="truncate text-xs text-muted">
              {student.email}
            </p>
          </div>
        </div>
      </td>

      {/* STUDENT ID */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-normal">
          {student.studentId}
        </span>
      </td>

      {/* PROGRAM */}
      <td className="px-6 py-4">
        <span className="text-sm text-normal">
          {student.program}
        </span>
      </td>

      {/* ACCOUNT STATUS */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
            student.accountStatus
          )}`}
        >
          {student.accountStatus}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4">
        <div className="relative flex justify-center">
          <button
            type="button"
            onClick={() =>
              setActiveMenu(
                activeMenu === student.id ? null : student.id
              )
            }
            className="cursor-pointer rounded-full p-2 text-muted transition hover:bg-second hover:text-accent"
            aria-label="Student actions"
          >
            <MdMoreVert className="text-xl" />
          </button>

          {activeMenu === student.id && (
            <>
              <button
                type="button"
                aria-label="Close action menu"
                onClick={() => setActiveMenu(null)}
                className="fixed inset-0 z-10 cursor-default"
              />

              <div className="absolute right-8 top-0 z-20 w-44 overflow-hidden rounded-lg border border-border bg-panel py-1 shadow-xl">
                {/* EDIT */}
                <button
                  type="button"
                  onClick={() => onEdit(student)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-xs text-normal transition hover:bg-brand"
                >
                  <MdEdit className="text-base text-muted" />
                  Edit Student
                </button>

                {/* SUSPEND / ACTIVATE */}
                <button
                  type="button"
                  onClick={() => onToggleStatus(student)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-xs text-normal transition hover:bg-brand"
                >
                  {student.accountStatus === "Suspended" ? (
                    <>
                      <MdCheckCircle className="text-base text-green-600" />
                      Activate Account
                    </>
                  ) : (
                    <>
                      <MdBlock className="text-base text-red-500" />
                      Suspend Account
                    </>
                  )}
                </button>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() => onDelete(student)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-xs text-error transition hover:bg-red-50"
                >
                  <MdDelete className="text-base" />
                  Delete Student
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
