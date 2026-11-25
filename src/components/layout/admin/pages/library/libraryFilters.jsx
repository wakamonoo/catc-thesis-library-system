"use client";

import { useContext } from "react";
import { ProgramContext } from "@/context/programContext";
import { MdSearch, MdFilterList, MdClose } from "react-icons/md";

export default function LibraryFilters({
  search,
  setSearch,
  selectedLevel,
  setSelectedLevel,
  selectedProgram,
  setSelectedProgram,
  selectedYear,
  setSelectedYear,
  academicYears = [],
  onClearFilters,
}) {
  const { programs = [] } = useContext(ProgramContext);

  const filteredPrograms =
    selectedLevel === "All"
      ? programs
      : programs.filter(
          (program) => program.academicLevel === selectedLevel,
        );

  return (
    <section className="rounded-lg border border-(--color-border) bg-panel p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <MdFilterList className="text-xl text-accent" />
        <h3 className="font-heading font-bold text-accent">
          Search and Filter
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Search */}
        <div className="lg:col-span-2">
          <label
            htmlFor="thesisSearch"
            className="mb-2 block text-sm font-semibold text-normal"
          >
            Search Thesis
          </label>

          <div className="flex items-center gap-2 rounded-lg border border-border bg-panel px-3 transition focus-within:border-accent">
            <MdSearch className="shrink-0 text-xl text-muted" />

            <input
              id="thesisSearch"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by thesis title..."
              className="w-full bg-transparent py-3 text-sm text-normal outline-none placeholder:text-muted"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 text-muted transition hover:text-accent"
              >
                <MdClose size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Academic Level */}
        <div>
          <label
            htmlFor="academicLevel"
            className="mb-2 block text-sm font-semibold text-normal"
          >
            Academic Level
          </label>

          <select
            id="academicLevel"
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setSelectedProgram("All");
            }}
            className="w-full cursor-pointer rounded-lg border border-border bg-panel px-3 py-3 text-sm text-normal outline-none transition focus:border-accent"
          >
            <option value="All">All Academic Levels</option>
            <option value="College">College</option>
            <option value="Senior High School">
              Senior High School
            </option>
          </select>
        </div>

        {/* Program */}
        <div>
          <label
            htmlFor="programFilter"
            className="mb-2 block text-sm font-semibold text-normal"
          >
            Program
          </label>

          <select
            id="programFilter"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-border bg-panel px-3 py-3 text-sm text-normal outline-none transition focus:border-accent"
          >
            <option value="All">All Programs</option>

            {filteredPrograms.map((program) => (
              <option key={program.id} value={program.title}>
                {program.title}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Year */}
        <div>
          <label
            htmlFor="academicYear"
            className="mb-2 block text-sm font-semibold text-normal"
          >
            Academic Year
          </label>

          <select
            id="academicYear"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-border bg-panel px-3 py-3 text-sm text-normal outline-none transition focus:border-accent"
          >
            <option value="All">All Academic Years</option>

            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Narrow down the collection using the available filters.
        </p>

        <button
          type="button"
          onClick={onClearFilters}
          className="w-fit text-sm font-semibold text-accent transition hover:underline"
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
}
