"use client";
import { ProgramContext } from "@/context/programContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Programs() {
  const { programs } = useContext(ProgramContext);
  const router = useRouter();
  const [selectedAcademicLevel, setSelectedAcademicLevel] = useState("College");

  const filteredPrograms =
    selectedAcademicLevel === "College"
      ? programs.filter((program) => program.academicLevel === "College")
      : programs.filter(
          (program) => program.academicLevel === "Senior High School",
        );

  return (
    <div id="programs" className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2">
        <div className="flex flex-col">
          <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
            Programs
          </p>
          <p className="text-normal text-base leading-tight">
            Explore theses and research from our diverse programs.
          </p>
        </div>
        <select
          value={selectedAcademicLevel}
          onChange={(e) => {
            setSelectedAcademicLevel(e.target.value);
          }}
          required
          className="w-full md:w-64 cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
        >
          <option value="College" className="text-normal truncate">
            College
          </option>
          <option value="Senior High School" className="text-normal truncate">
            Senior High School
          </option>
        </select>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPrograms.map((program) => {
          const Icon = program.icon;

          return (
            <button
              key={program.id}
              type="button"
              onClick={() =>
                router.push(
                  `/theses?program=${encodeURIComponent(program.title)}`,
                )
              }
              className={`cursor-pointer flex flex-col items-center gap-2 p-4 rounded-lg ${program.academicLevel === "College" ? "bg-accent hover:bg-(--color-yellow) active:bg-(--color-yellow)" : "bg-yellow hover:bg-(--color-accent) active:bg-(--color-accent)"} shadow-xs group transition-all duration-200 hover:shadow-2xl active:shadow-2xl`}
            >
              <Icon
                className={`text-4xl transition-all duration-200 shrink-0 ${program.academicLevel === "College" ? "text-yellow group-hover:text-(--color-accent) group-active:text-(--color-accent)" : "text-accent group-hover:text-(--color-yellow) group-active:text-(--color-yellow)"}`}
              />
              <p className="text-sm text-panel text-center font-semibold line-clamp-2">
                {program.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
