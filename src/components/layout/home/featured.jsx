"use client";
import { ThesisContext } from "@/context/thesisContext";
import Link from "next/link";
import { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import ThesisCard from "../thesis/thesisCard";
import { MdFindInPage } from "react-icons/md";
import { FileLoader } from "@/components/loaders/fileLoader";

export default function Featured() {
  const { theses, thesesLoad } = useContext(ThesisContext);

  return (
    <div id="featured" className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex flex-col">
          <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
            Featured Theses
          </p>
          <p className="text-normal text-base leading-tight">
            Explore some of the latest and most relevant theses from CAT
            College.
          </p>
        </div>
        <Link
          href="/theses"
          className="cursor-pointer flex items-center gap-2 group"
        >
          <p className="text-sm text-muted group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            Browse All
          </p>
          <BsArrowRight className="text-sm text-muted transition-all duration-200 ggroup-hover:text-(--color-accent) group-active:text-(--color-accent)" />
        </Link>
      </div>

      {thesesLoad ? (
        <div className="flex flex-col items-center justify-center py-24">
          <FileLoader />
        </div>
      ) : theses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <MdFindInPage className="text-4xl text-muted shrink-0" />
          <p className="mt-2 max-w-xs text-xs text-muted">
            No featured theses yet
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {theses.map((thesis) => (
            <ThesisCard key={thesis.thesisId} thesis={thesis} />
          ))}
        </div>
      )}
    </div>
  );
}
