"use client";
import ThesisCard from "@/components/layout/thesis/thesisCard";
import { FileLoader } from "@/components/loaders/fileLoader";
import { ProgramContext } from "@/context/programContext";
import { ThesisContext } from "@/context/thesisContext";
import { SearchContext } from "@/context/searchContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { MdFindInPage, MdSearch } from "react-icons/md";
import { EducationLevelContext } from "@/context/educationLevelContext";
import { BiSearch } from "react-icons/bi";

export default function ThesesContent() {
  const { theses, thesesLoad } = useContext(ThesisContext);
  const { searchQuery, setSearchQuery, handleSearch } =
    useContext(SearchContext);
  const { programs } = useContext(ProgramContext);
  const { educationLevels } = useContext(EducationLevelContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProgram = searchParams.get("program") || "";
  const selectedEducationLevel = searchParams.get("educationLevel") || "";

  const filteredTheses = theses.filter((thesis) => {
    const matchesProgram =
      !selectedProgram || thesis.program === selectedProgram;

    const matchesEducationLevel =
      !selectedEducationLevel ||
      thesis.educationLevel === selectedEducationLevel;

    return matchesProgram && matchesEducationLevel;
  });

  const updateFilter = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`/theses${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery, {
            program: selectedProgram === "All" ? "" : selectedProgram,
          });
        }}
        className="mt-16 md:mt-8 flex gap-2 items-center flex-1 p-2 w-full rounded-lg border border-border bg-panel"
      >
        <BiSearch className="pointer-events-none text-muted text-base" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search title, author or keyword..."
          className="w-full text-sm text-normal outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer shrink-0 rounded-md bg-yellow px-4 py-2 text-sm text-normal"
        >
          <p className="text-normal text-xs">Search</p>
        </button>
      </form>
      <div className="mt-4 flex flex-col items-center justify-center md:items-start">
        <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
          Browse Theses
        </p>
        <p className="text-sm text-muted">
          Discover academic works from CAT College.
        </p>
      </div>
      <div className="mt-4 flex items-start sm:items-center justify-between gap-2">
        <p className="text-sm text-muted whitespace-nowrap">
          {filteredTheses.length} found
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <select
            value={selectedProgram}
            onChange={(e) => updateFilter("program", e.target.value)}
            required
            className="w-64 cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
          >
            <option value="All" className="text-normal truncate">
              All Programs
            </option>

            {programs.map((program) => (
              <option
                key={program.id}
                value={program.title}
                className="text-normal truncate"
              >
                {program.title}
              </option>
            ))}
          </select>
          <select
            value={selectedEducationLevel}
            onChange={(e) => updateFilter("educationLevel", e.target.value)}
            required
            className="w-64 cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
          >
            <option value="All" className="text-normal truncate">
              All Education Levels
            </option>

            {educationLevels.map((education) => (
              <option
                key={education.id}
                value={education.level}
                className="text-normal truncate"
              >
                {education.level}
              </option>
            ))}
          </select>
          {(selectedProgram || selectedEducationLevel) && (
            <button
              type="button"
              onClick={() => router.push("/theses")}
              className="cursor-pointer group"
            >
              <p className="text-xs text-muted whitespace-nowrap transition-all duration-200 group-hover:underline group-active:underline underline-offset-2">
                Clear filters
              </p>
            </button>
          )}
        </div>
      </div>

      {thesesLoad ? (
        <div className="flex flex-col items-center justify-center py-24">
          <FileLoader />
        </div>
      ) : filteredTheses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <MdFindInPage className="text-4xl text-muted shrink-0" />
          <p className="mt-2 max-w-xs text-xs text-muted">
            No thesis found for this program
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {filteredTheses.map((thesis) => (
            <ThesisCard key={thesis.thesisId} thesis={thesis} />
          ))}
        </div>
      )}
    </div>
  );
}
