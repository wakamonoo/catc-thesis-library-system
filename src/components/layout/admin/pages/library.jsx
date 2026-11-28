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
import EditThesisModal from "@/components/modals/editThesisModal";
import DeleteThesisModal from "@/components/modals/deleteThesisModal";
import ThesisDetailsDrawer from "@/components/drawer/thesisDetailsDrawer";
import Filters from "../library/filters";
import { AuthenticationContext } from "@/context/authenticationContext";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 8;

export default function Library() {
  const { programs } = useContext(ProgramContext);
  const { firebaseUser } = useContext(AuthenticationContext);
  const {
    theses,
    setTheses,
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
  const [thesisAction, setThesisAction] = useState(null);
  const [thesisActionError, setThesisActionError] = useState("");

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

  const showThesisToast = (title, icon) => {
    Swal.fire({
      toast: true,
      position: "bottom-start",
      title,
      icon,
      timer: 2000,
      showConfirmButton: false,
      background: "var(--color-yellow)",
      iconColor:
        icon === "success" ? "var(--color-success)" : "var(--color-error)",
      customClass: {
        popup:
          "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
        title:
          "!text-base !font-[family-name:var(--font-normal)] !font-semibold !text-(--color-normal) !leading-4.5",
      },
    });
  };

  const closeThesisModals = () => {
    setThesisAction(null);
    setThesisActionError("");
  };

  const openThesisAction = (type, thesis) => {
    setThesisActionError("");
    setSelectedThesis(null);
    setThesisAction({ type, thesis });
  };

  const handleThesisSubmit = async (action, values = {}) => {
    setThesisActionError("");

    try {
      if (!firebaseUser) {
        throw new Error("Please sign in first.");
      }

      const idToken = await firebaseUser.getIdToken();
      const selectedRecord = thesisAction?.thesis;
      const endpoints = {
        edit: "editThesis",
        delete: "deleteThesis",
      };
      const body =
        action === "edit"
          ? { thesisId: selectedRecord.thesisId, ...values }
          : { thesisId: selectedRecord.thesisId };
      const response = await fetch(`/api/theses/${endpoints[action]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Thesis action failed.");
      }

      if (action === "edit") {
        setTheses((currentTheses) =>
          currentTheses.map((thesis) =>
            thesis.thesisId === selectedRecord.thesisId
              ? { ...thesis, ...data.updatedThesis }
              : thesis,
          ),
        );
      } else if (action === "delete") {
        setTheses((currentTheses) =>
          currentTheses.filter(
            (thesis) => thesis.thesisId !== selectedRecord.thesisId,
          ),
        );
      }

      closeThesisModals();
      showThesisToast(
        data.message || "Thesis updated successfully.",
        "success",
      );
    } catch (err) {
      setThesisActionError(err.message || "Thesis action failed.");
      showThesisToast(err.message || "Thesis action failed.", "error");
    }
  };

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
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          onEditThesis={(thesis) => openThesisAction("edit", thesis)}
          onDeleteThesis={(thesis) => openThesisAction("delete", thesis)}
        />
      )}
      {thesisAction?.type === "edit" && (
        <EditThesisModal
          thesis={thesisAction.thesis}
          onClose={closeThesisModals}
          onSubmit={(values) => handleThesisSubmit("edit", values)}
          errorMessage={thesisActionError}
        />
      )}
      {thesisAction?.type === "delete" && (
        <DeleteThesisModal
          thesis={thesisAction.thesis}
          onCancel={closeThesisModals}
          onConfirm={() => handleThesisSubmit("delete")}
          errorMessage={thesisActionError}
        />
      )}
    </section>
  );
}
