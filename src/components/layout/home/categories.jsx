"use client";
import { ProgramContext } from "@/context/programContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Categories() {
  const { programs } = useContext(ProgramContext);
  const router = useRouter();

  return (
    <div id="categories" className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-12 h-px bg-yellow" />
          <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
            Programs
          </p>
        </div>
        <p className="text-normal text-base leading-tight">
          Explore theses and research from our diverse programs.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {programs.map((program) => {
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
              className="cursor-pointer flex flex-col items-center gap-2 p-4 rounded-lg bg-accent shadow-xs group transition-all duration-200 hover:bg-(--color-yellow) active:bg-(--color-yellow) hover:shadow-2xl active:shadow-2xl"
            >
              <Icon className="text-4xl text-yellow transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) shrink-0" />
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
