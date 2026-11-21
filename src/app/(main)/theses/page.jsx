"use client";
import ThesisCard from "@/components/layout/thesis/thesisCard";
import { FileLoader } from "@/components/loaders/fileLoader";
import { ProgramContext } from "@/context/programContext";
import { ThesisContext } from "@/context/thesisContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { MdFindInPage, MdSearch } from "react-icons/md";

export default function Page() {
  const { theses, thesesLoad } = useContext(ThesisContext);
  const [search, setSearch] = useState("");
  const { programs } = useContext(ProgramContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProgram = searchParams.get("program") || "All";

  const filteredTheses =
    selectedProgram === "All"
      ? theses
      : theses.filter((thesis) => thesis.program === selectedProgram);

  return (
    <div className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="mt-16 md:mt-8 flex gap-2 items-center flex-1 px-4 py-2 w-full rounded-lg border border-border bg-panel">
        <MdSearch className="pointer-events-none text-muted text-base" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title, author or keyword..."
          className="w-full text-sm text-normal outline-none"
        />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center md:items-start">
        <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
          Browse Theses
        </p>
        <p className="text-sm text-muted">
          Discover academic works from CAT College.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm text-muted whitespace-nowrap">
          {filteredTheses.length} found
        </p>
        <select
          value={selectedProgram}
          onChange={(e) => {
            const value = e.target.value;

            router.push(
              value === "All"
                ? "/theses"
                : `/theses?program=${encodeURIComponent(value)}`,
            );
          }}
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
