"use client";
import { ThesisContext } from "@/context/thesisContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { BiBook, BiCalendar } from "react-icons/bi";
import { BsArrowRight, BsPerson } from "react-icons/bs";

export default function Featured() {
  const { theses } = useContext(ThesisContext);

  return (
    <div id="featured" className="p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-yellow" />
            <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
              Featured Theses
            </p>
          </div>
          <p className="text-normal text-base leading-tight">
            Explore some of the latest and most relevant theses from CAT
            College.
          </p>
        </div>
        <button className="cursor-pointer flex items-center gap-2 group">
          <p className="text-sm text-muted group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            Browse All
          </p>
          <BsArrowRight className="text-sm text-muted transition-all duration-200 ggroup-hover:text-(--color-accent) group-active:text-(--color-accent)" />
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {theses.map((thesis) => {
          return (
            <Link
              key={thesis.thesisId}
              href={`/thesis/${thesis.thesisId}`}
              className="cursor-pointer flex flex-col bg-panel shadow-xs rounded-lg overflow-hidden transtition-all duration-200 group hover:-translate-y-1 active:-translate-y-1 hover:shadow-2xl active:shadow-2xl"
            >
              <div className="relative w-full h-44">
                <Image
                  src={thesis.coverImage}
                  alt={thesis.title}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute top-2 right-2 flex items-center gap-0.5 px-4 py-2 rounded-full w-fit ${thesis.educationLevel === "College" ? "bg-(--color-accent)/90" : "bg-(--color-yellow)/90"}`}
                >
                  <BiBook className="text-xs text-panel" />
                  <p className="text-xs text-panel">{thesis.program}</p>
                </div>
              </div>

              <div className="p-4 border-b-8 border-accent">
                <p className="mt-2 font-alt tracking-wide text-base font-semibold leading-tight">
                  {thesis.title}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-second shrink-0 flex items-center justify-center">
                      <BsPerson className="text-xs text-muted shrink-0" />
                    </div>
                    <p className="text-xs text-muted">
                      {thesis?.authors?.join(", ") ||
                        "Authors information unavailable"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
