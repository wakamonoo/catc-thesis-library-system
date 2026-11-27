import {
  MdSearch,
  MdFilterList,
  MdSchool,
  MdKeyboardArrowDown,
} from "react-icons/md";

export default function Filters({
  search,
  setSearch,
  selectedProgram,
  setSelectedProgram,
  selectedStatus,
  setSelectedStatus,
  programs,
}) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col">
          <p className="font-alt font-bold text-base uppercase tracking-widest text-accent">
            Student Records
          </p>
          <p className="text-sm text-muted">
            View and manage registered student information.
          </p>
        </div>

        <div className="w-full lg:max-w-xs flex items-center gap-2 rounded-full border border-border bg-panel px-4 py-2">
          <MdSearch className="text-base text-muted shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="text-sm text-normal outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex items-center gap-2 border border-border bg-panel rounded-full px-4 py-2 w-full sm:max-w-xs">
          <MdSchool className="pointer-events-none text-lg text-muted shrink-0" />

          <select
            value={selectedProgram}
            onChange={(event) => setSelectedProgram(event.target.value)}
            className="w-full appearance-none text-sm text-normal outline-none px-4"
          >
            <option value="All Programs">All Programs</option>

            {programs.map((program) => (
              <option key={program.id} value={program.title}>
                {program.title}
              </option>
            ))}
          </select>

          <MdKeyboardArrowDown className="pointer-events-none absolute right-4 text-lg text-muted" />
        </div>

        <div className="relative flex items-center gap-2 border border-border bg-panel rounded-full px-4 py-2 w-full sm:max-w-xs">
          <MdFilterList className="pointer-events-none text-lg text-muted shrink-0" />

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="w-full appearance-none text-sm text-normal outline-none px-4"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Not Registered">Not Registered</option>
            <option value="Suspended">Suspended</option>
          </select>

          <MdKeyboardArrowDown className="pointer-events-none absolute right-4 text-lg text-muted" />
        </div>
      </div>
    </>
  );
}
