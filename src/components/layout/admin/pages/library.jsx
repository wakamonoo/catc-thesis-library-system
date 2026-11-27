"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  MdLibraryBooks,
  MdChevronLeft,
  MdChevronRight,
  MdRefresh,
  MdAdd,
  MdMenuBook,
  MdSchool,
  MdCalendarMonth,
  MdKeyboardArrowDown,
  MdSearch,
} from "react-icons/md";
import ThesisDetailsModal from "@/components/drawer/thesisDetailsDrawer";
import ThesisList from "@/components/layout/admin/library/thesisList";
import EmptyCollection from "@/components/layout/admin/library/emptyCollection";
import MenuButton from "@/components/buttons/menuButton";
import TertiaryButton from "@/components/buttons/tertiaryButton";
import { ThesisContext } from "@/context/thesisContext";
import StatCard from "../statCard";
import { ProgramContext } from "@/context/programContext";
import { FileLoader } from "@/components/loaders/fileLoader";
import AddThesisModal from "@/components/modals/addThesisModal";
import ThesisDetailsDrawer from "@/components/drawer/thesisDetailsDrawer";
import Filters from "../library/filters";

const ITEMS_PER_PAGE = 8;

export default function Library() {
  const { programs } = useContext(ProgramContext);
  const {
    theses,
    fetchTheses,
    thesesLoad,
    showAddThesisModal,
    setShowAddThesisModal,
  } = useContext(ThesisContext);
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedThesis, setSelectedThesis] = useState(null);

  useEffect(() => {
    fetchTheses();
  }, [fetchTheses]);

  const academicYears = useMemo(() => {
    return [
      ...new Set(theses.map((thesis) => thesis.academicYear).filter(Boolean)),
    ].sort((a, b) =>
      String(b).localeCompare(String(a), undefined, {
        numeric: true,
      }),
    );
  }, [theses]);

  const filteredTheses = useMemo(() => {
    let result = [...theses];

    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      result = result.filter((thesis) =>
        thesis.title?.toLowerCase().includes(searchTerm),
      );
    }

    if (selectedLevel !== "All") {
      result = result.filter(
        (thesis) => thesis.educationLevel === selectedLevel,
      );
    }

    if (selectedProgram !== "All") {
      result = result.filter((thesis) => thesis.program === selectedProgram);
    }

    if (selectedYear !== "All") {
      result = result.filter((thesis) => thesis.academicYear === selectedYear);
    }

    result.sort((a, b) => {
      if (sortOrder === "alphabetical") {
        return (a.title || "").localeCompare(b.title || "");
      }

      if (sortOrder === "oldest") {
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
        );
      }

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

    return result;
  }, [theses, search, selectedLevel, selectedProgram, selectedYear, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedLevel, selectedProgram, selectedYear, sortOrder]);

  const totalPages = Math.ceil(filteredTheses.length / ITEMS_PER_PAGE);

  const paginatedTheses = filteredTheses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const hasFilters =
    Boolean(search.trim()) ||
    selectedLevel !== "All" ||
    selectedProgram !== "All" ||
    selectedYear !== "All";

  const filteredPrograms =
    selectedLevel === "All"
      ? programs
      : programs.filter((program) => program.academicLevel === selectedLevel);

  return (
    <section className="mx-auto space-y-6 px-4 py-10 sm:px-8 md:px-10 lg:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-center justify-center md:items-start">
          <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
            Thesis Library
          </p>
          <p className="text-sm text-muted">
            Browse, search, and explore the thesis collection.
          </p>
        </div>
        <div className="ml-auto flex flex-col md:flex-row gap-2 w-full md:w-fit">
          <TertiaryButton onClick={() => setShowAddThesisModal(true)}>
            <MdAdd className="text-base text-panel shrink-0" />
            <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
              Add Thesis
            </p>
          </TertiaryButton>
          <MenuButton onClick={fetchTheses} disabled={thesesLoad}>
            <MdRefresh className="text-base text-panel shrink-0" />
            <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
              Refresh
            </p>
          </MenuButton>
        </div>
      </div>
      <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-3">
        <StatCard
          label="Total Theses"
          value={theses.length}
          icon={<MdMenuBook className="text-2xl text-accent" />}
        />
        <StatCard
          label="Programs Represented"
          value={
            new Set(theses.map((thesis) => thesis.program).filter(Boolean)).size
          }
          icon={<MdSchool className="text-2xl text-accent" />}
        />
        <StatCard
          label="Academic Years"
          value={
            new Set(theses.map((thesis) => thesis.academicYear).filter(Boolean))
              .size
          }
          icon={<MdCalendarMonth className="text-2xl text-accent" />}
        />
      </div>
      <Filters
        thesesLoad={thesesLoad}
        filteredTheses={filteredTheses}
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        selectedLevel={selectedLevel}
        selectedProgram={selectedProgram}
        selectedYear={selectedYear}
        filteredPrograms={filteredPrograms}
        academicYears={academicYears}
      />
      <div className="border-y border-border my-4 py-4">
        {thesesLoad ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FileLoader />
          </div>
        ) : filteredTheses.length === 0 ? (
          <EmptyCollection
            setShowAddThesisModal={setShowAddThesisModal}
            hasFilters={hasFilters}
          />
        ) : (
          <ThesisList
            theses={paginatedTheses}
            onViewDetails={setSelectedThesis}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}
          {" - "}
          {Math.min(
            currentPage * ITEMS_PER_PAGE,
            filteredTheses.length,
          )} of {filteredTheses.length} theses
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-accent transition hover:bg-second disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdChevronLeft size={22} />
          </button>

          <span className="min-w-20 text-center text-sm font-semibold text-accent">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-accent transition hover:bg-second disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdChevronRight size={22} />
          </button>
        </div>
      </div>

      {showAddThesisModal && (
        <AddThesisModal setShowAddThesisModal={setShowAddThesisModal} />
      )}
      {selectedThesis && (
        <ThesisDetailsDrawer
          selectedThesis={selectedThesis}
          setSelectedThesis={setSelectedThesis}
        />
      )}
    </section>
  );
}
