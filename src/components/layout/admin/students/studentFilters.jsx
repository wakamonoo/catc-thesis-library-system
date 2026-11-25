
import {
  MdSearch,
  MdFilterList,
  MdSchool,
  MdKeyboardArrowDown,
} from "react-icons/md";

export default function StudentFilters({
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
        <div>
          <h2 className="font-alt text-base font-bold text-accent">
            Student Records
          </h2>

          <p className="mt-1 text-xs text-muted">
            View and manage registered student information.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:max-w-xs">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-muted" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search students..."
            className="w-full rounded-full border border-border bg-panel py-2.5 pl-10 pr-4 text-sm text-normal outline-none transition focus:border-accent"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative w-full sm:max-w-xs">
          <MdSchool className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted" />

          <select
            value={selectedProgram}
            onChange={(event) =>
              setSelectedProgram(event.target.value)
            }
            className="w-full appearance-none rounded-full border border-border bg-panel py-2.5 pl-10 pr-9 text-xs text-normal outline-none focus:border-accent"
          >
            <option value="All Programs">All Programs</option>

            {programs.map((program) => (
              <option key={program.id} value={program.title}>
                {program.title}
              </option>
            ))}
          </select>

          <MdKeyboardArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-muted" />
        </div>

        <div className="relative w-full sm:max-w-xs">
          <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted" />

          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value)
            }
            className="w-full appearance-none rounded-full border border-border bg-panel py-2.5 pl-10 pr-9 text-xs text-normal outline-none focus:border-accent"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Not Registered">Not Registered</option>
            <option value="Suspended">Suspended</option>
          </select>

          <MdKeyboardArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-muted" />
        </div>
      </div>
    </>
  );
}
