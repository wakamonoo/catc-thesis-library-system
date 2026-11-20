"use client";
import { useContext, useState } from "react";
import {
  MdMenuBook,
  MdSchool,
  MdAdd,
  MdSearch,
  MdVerifiedUser,
} from "react-icons/md";
import StatCard from "@/components/layout/admin/statCard";
import EmptyCollection from "@/components/layout/admin/emptyCollection";
import ThesisList from "@/components/layout/admin/thesisList";
import { ProgramContext } from "@/context/programContext";
import AddThesisModal from "@/components/modals/addThesisModal";
import TertiaryButton from "@/components/buttons/tertiaryButton";
import { BsPerson } from "react-icons/bs";

export default function Dashboard() {
  const { programs } = useContext(ProgramContext);
  const [showAddThesisModal, setShowAddThesisModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All programs");

  return (
    <>
      <section className="mx-auto px-4 sm:px-8 md:px-10 lg:px-12 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center justify-center md:items-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              CAT-C Theses Collection
            </p>
            <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
              Admin Dashboard
            </p>
            <p className="text-sm text-muted">
              Manage your college’s academic research.
            </p>
          </div>
          <div className="ml-auto w-full md:w-fit">
            <TertiaryButton onClick={() => setShowAddThesisModal(true)}>
              <MdAdd className="text-base text-panel shrink-0" />
              <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
                Add Thesis
              </p>
            </TertiaryButton>
          </div>
        </div>
        <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-3">
          <StatCard
            label="Total Theses"
            value={0}
            icon={<MdMenuBook className="text-4xl shrink-0" />}
          />
          <StatCard
            label="College Programs"
            value={programs.length}
            icon={<MdSchool className="text-4xl shrink-0" />}
          />
          <StatCard
            label="Active Students"
            value={0}
            icon={<BsPerson className="text-4xl shrink-0" />}
          />
        </div>

        <div className="mt-8 border-t border-(--color-border) pt-6 sm:mt-9 sm:pt-7">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-alt font-bold text-base uppercase tracking-widest text-accent">
              Theses Collection
            </p>

            <span className="rounded bg-second px-2 py-1 text-[11px] font-bold text-accent">
              0
            </span>
          </div>

          <p className="text-sm text-muted">
            All thesis records, newest first.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="flex gap-2 items-center flex-1 px-4 py-2 w-full rounded-lg border border-border bg-panel">
              <MdSearch className="pointer-events-none text-muted text-base" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, author or keyword..."
                className="w-full text-sm text-normal outline-none"
              />
            </div>

            <div className="sm:w-56">
              <select
                required
                defaultValue="default"
                className="w-full px-4 py-2 border border-border bg-panel rounded-lg outline-none"
              >
                <option value="default" disabled>
                  Select a program
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
          </div>

          {1 ? (
            <EmptyCollection
              setShowAddThesisModal={setShowAddThesisModal}
              hasFilters={Boolean(
                search.trim() || selectedProgram !== "All programs",
              )}
            />
          ) : (
            <ThesisList />
          )}
        </div>
      </section>

      {showAddThesisModal && (
        <AddThesisModal
          programs={programs}
          setShowAddThesisModal={setShowAddThesisModal}
        />
      )}
    </>
  );
}
