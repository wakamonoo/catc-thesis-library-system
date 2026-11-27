import { MdKeyboardArrowDown, MdSchool, MdSearch } from "react-icons/md";

export default function Filters({
  thesesLoad,
  filteredTheses,
  search,
  setSearch,
  sortOrder,
  selectedLevel,
  selectedProgram,
  selectedYear,
  filteredPrograms,
  academicYears,
}) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col">
          <p className="font-alt font-bold text-base uppercase tracking-widest text-accent">
            Thesis Collection
          </p>
          <p className="text-sm text-muted">
            {thesesLoad
              ? "loading thesis records..."
              : `${filteredTheses.length} ${
                  filteredTheses.length === 1 ? "thesis" : "theses"
                } found`}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <div className="w-full lg:max-w-xs flex items-center gap-2 rounded-full border border-border bg-panel px-4 py-2">
            <MdSearch className="text-base text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search thesis..."
              className="text-sm text-normal outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="sortTheses"
              className="whitespace-nowrap text-xs font-semibold text-muted"
            >
              Sort by:
            </label>
            <select
              id="sortTheses"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="cursor-pointer rounded-lg border border-border bg-panel px-3 py-2 text-xs text-normal outline-none focus:border-accent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="relative flex items-center gap-2 border border-border bg-panel rounded-full px-4 py-2 w-full sm:max-w-xs">
          <MdSchool className="pointer-events-none text-lg text-muted shrink-0" />
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setSelectedProgram("All");
            }}
            className="w-full appearance-none text-sm text-normal outline-none px-4"
          >
            <option value="All">All Academic Levels</option>
            <option value="College">College</option>
            <option value="Senior High School">Senior High School</option>
          </select>

          <MdKeyboardArrowDown className="pointer-events-none absolute right-4 text-lg text-muted" />
        </div>
        <div className="relative flex items-center gap-2 border border-border bg-panel rounded-full px-4 py-2 w-full sm:max-w-xs">
          <MdSchool className="pointer-events-none text-lg text-muted shrink-0" />

          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full appearance-none text-sm text-normal outline-none px-4"
          >
            <option value="All">All Programs</option>
            {filteredPrograms.map((program) => (
              <option key={program.id} value={program.title}>
                {program.title}
              </option>
            ))}
          </select>

          <MdKeyboardArrowDown className="pointer-events-none absolute right-4 text-lg text-muted" />
        </div>

        <div className="relative flex items-center gap-2 border border-border bg-panel rounded-full px-4 py-2 w-full sm:max-w-xs">
          <MdSchool className="pointer-events-none text-lg text-muted shrink-0" />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full appearance-none text-sm text-normal outline-none px-4"
          >
            <option value="All">All Academic Years</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <MdKeyboardArrowDown className="pointer-events-none absolute right-4 text-lg text-muted" />
        </div>
      </div>
    </>
  );
}
