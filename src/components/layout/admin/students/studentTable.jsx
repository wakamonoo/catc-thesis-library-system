import StudentRow from "./studentRow";
import StudentEmptyState from "./emptyCollection";
import { useState } from "react";
import EmptyCollection from "./emptyCollection";

export default function StudentTable({
  students,
  totalStudents,
  hasFilters,
  setShowAddStudentModal,
  onEditStudent,
  onSuspendStudent,
  onReactivateStudent,
  onDeleteStudent,
}) {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border bg-panel shadow-sm">
      <div
        className={`w-full ${students.length > 0 ? "min-h-[80vh]" : "h-fit"}  overflow-x-auto`}
      >
        <table className="w-full border-collapse text-left">
          <thead className="bg-brand">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted">
                Student
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted">
                Student ID
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted">
                Program
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted">
                Account Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <StudentRow
                  key={student.studentId}
                  student={student}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  onEditStudent={onEditStudent}
                  onSuspendStudent={onSuspendStudent}
                  onReactivateStudent={onReactivateStudent}
                  onDeleteStudent={onDeleteStudent}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-0">
                  <EmptyCollection
                    hasFilters={hasFilters}
                    setShowAddStudentModal={setShowAddStudentModal}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Showing{" "}
          <span className="font-semibold text-accent">{students.length}</span>{" "}
          of <span className="font-semibold text-accent">{totalStudents}</span>{" "}
          students
        </p>
        <p className="text-xs text-muted">Student records</p>
      </div>
    </div>
  );
}
