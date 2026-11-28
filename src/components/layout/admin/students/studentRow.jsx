"use client";

import StudentOptions from "@/components/options/studentOptions";
import { useRef} from "react";
import {
  MdMoreVert,
} from "react-icons/md";

export default function StudentRow({
  student,
  activeMenu,
  setActiveMenu,
  onEditStudent,
  onSuspendStudent,
  onReactivateStudent,
  onDeleteStudent,
}) {
  const studentOptionsButtonRef = useRef(null);
  
  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();



  return (
    <tr className="border-b border-border transition hover:bg-brand/50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent">
            <p className="text-xs font-bold text-panel">
              {getInitials(student.name)}
            </p>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-accent">
              {student.name}
            </p>

            <p className="truncate text-xs text-muted">{student.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-normal">{student.studentId}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-normal">{student.program}</p>
      </td>
      <td className="px-6 py-4">
        <div
          className={`inline-flex items-center rounded-full px-4 py-2 ${student.status === "Active" ? "bg-success" : student.status === "Not Registered" ? "bg-error" : "bg-muted"}`}
        >
          <p className="text-xs font-semibold text-panel">{student.status}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="relative">
          <button
            ref={studentOptionsButtonRef}
            onClick={() =>
              setActiveMenu(
                activeMenu === student.studentId ? null : student.studentId,
              )
            }
            className="cursor-pointer rounded-full p-2 text-muted transition hover:bg-second hover:text-accent"
          >
            <MdMoreVert className="text-xl" />
          </button>
          {activeMenu === student.studentId && (
            <StudentOptions
              student={student}
              setActiveMenu={setActiveMenu}
              studentOptionsButtonRef={studentOptionsButtonRef}
              onEditStudent={onEditStudent}
              onSuspendStudent={onSuspendStudent}
              onReactivateStudent={onReactivateStudent}
              onDeleteStudent={onDeleteStudent}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
