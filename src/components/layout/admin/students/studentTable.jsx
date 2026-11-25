
import StudentRow from "./studentRow";
import StudentEmptyState from "./studentEmptyState";

export default function StudentTable({
  students,
  totalStudents,
  isFiltered,
  activeMenu,
  setActiveMenu,
  onAdd,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
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
                  key={student.id}
                  student={student}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <StudentEmptyState
                isFiltered={isFiltered}
                onAdd={onAdd}
              />
            )}
          </tbody>
        </table>
      </div>

      {/* TABLE FOOTER */}
      <div className="flex flex-col gap-2 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Showing{" "}
          <span className="font-semibold text-accent">
            {students.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-accent">
            {totalStudents}
          </span>{" "}
          students
        </p>

        <p className="text-xs text-muted">
          Student records
        </p>
      </div>
    </div>
  );
}
