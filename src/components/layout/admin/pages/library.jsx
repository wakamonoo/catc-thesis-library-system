"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MdLibraryBooks,
  MdChevronLeft,
  MdChevronRight,
  MdRefresh,
} from "react-icons/md";

import LibraryStats from "@/components/layout/admin/pages/library/libraryStats";
import LibraryFilters from "@/components/layout/admin/pages/library/libraryFilters";
import ThesisDetailsModal from "@/components/modals/thesisDetailsModal";

import ThesisList from "@/components/layout/admin/thesisList";
import EmptyCollection from "@/components/layout/admin/emptyCollection";

const ITEMS_PER_PAGE = 8;

export default function Library() {
  const [theses, setTheses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filters
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // Pagination and modal
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedThesis, setSelectedThesis] = useState(null);

  // Fetch all thesis records
  const fetchTheses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/theses/getTheses", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to retrieve theses.");
      }

      setTheses(Array.isArray(data.result) ? data.result : []);
    } catch (err) {
      console.error("Failed to load Library theses:", err);
      setError(err.message || "Something went wrong while loading theses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTheses();
  }, [fetchTheses]);

  // Get available academic years from the retrieved records
  const academicYears = useMemo(() => {
    return [
      ...new Set(
        theses
          .map((thesis) => thesis.academicYear)
          .filter(Boolean),
      ),
    ].sort((a, b) =>
      String(b).localeCompare(String(a), undefined, {
        numeric: true,
      }),
    );
  }, [theses]);

  // Apply search and filters
  const filteredTheses = useMemo(() => {
    let result = [...theses];

    // Search by thesis title
    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      result = result.filter((thesis) =>
        thesis.title?.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by academic level
    if (selectedLevel !== "All") {
      result = result.filter(
        (thesis) => thesis.educationLevel === selectedLevel,
      );
    }

    // Filter by program
    if (selectedProgram !== "All") {
      result = result.filter(
        (thesis) => thesis.program === selectedProgram,
      );
    }

    // Filter by academic year
    if (selectedYear !== "All") {
      result = result.filter(
        (thesis) => thesis.academicYear === selectedYear,
      );
    }

    // Sorting
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
  }, [
    theses,
    search,
    selectedLevel,
    selectedProgram,
    selectedYear,
    sortOrder,
  ]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedLevel,
    selectedProgram,
    selectedYear,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredTheses.length / ITEMS_PER_PAGE,
  );

  const paginatedTheses = filteredTheses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedLevel("All");
    setSelectedProgram("All");
    setSelectedYear("All");
    setSortOrder("newest");
    setCurrentPage(1);
  };

  const hasFilters =
    Boolean(search.trim()) ||
    selectedLevel !== "All" ||
    selectedProgram !== "All" ||
    selectedYear !== "All";

  return (
    <section className="mx-auto space-y-6 px-4 py-10 sm:px-8 md:px-10 lg:px-12">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MdLibraryBooks className="text-2xl text-accent" />

            <h1 className="font-heading text-2xl font-bold text-accent sm:text-3xl">
              Thesis Library
            </h1>
          </div>

          <p className="mt-2 text-sm text-muted">
            Browse, search, and explore the thesis collection.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchTheses}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-panel px-4 py-2.5 text-sm font-semibold text-accent transition hover:border-accent hover:bg-second disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MdRefresh
            size={18}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <LibraryStats theses={theses} />

      {/* Search and Filters */}
      <LibraryFilters
        search={search}
        setSearch={setSearch}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        academicYears={academicYears}
        onClearFilters={clearFilters}
      />

      {/* Thesis Collection */}
      <div className="rounded-lg border border-(--color-border) bg-panel p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-accent">
              Thesis Collection
            </h2>

            <p className="mt-1 text-xs text-muted">
              {loading
                ? "Loading thesis records..."
                : `${filteredTheses.length} ${
                    filteredTheses.length === 1 ? "thesis" : "theses"
                  } found`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sortTheses"
              className="whitespace-nowrap text-xs font-semibold text-muted"
            >
              Sort by:
            </label>

            <select
              id="sortTheses"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="cursor-pointer rounded-lg border border-border bg-panel px-3 py-2 text-xs text-normal outline-none focus:border-accent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-second border-t-accent" />

            <p className="mt-4 text-sm text-muted">
              Loading thesis collection...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mt-5 rounded-lg border border-(--color-error)/30 bg-panel p-8 text-center">
            <p className="font-semibold text-error">
              Unable to load the thesis collection.
            </p>

            <p className="mt-2 text-sm text-muted">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchTheses}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-panel transition hover:opacity-90"
            >
              <MdRefresh size={18} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredTheses.length === 0 && (
          <EmptyCollection
            hasFilters={hasFilters}
            showAddButton={false}
          />
        )}

        {/* Thesis List */}
        {!loading && !error && filteredTheses.length > 0 && (
          <>
            <ThesisList
              theses={paginatedTheses}
              onViewDetails={setSelectedThesis}
            />

            {/* Pagination */}
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">
                Showing{" "}
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                {" - "}
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredTheses.length,
                )}{" "}
                of {filteredTheses.length} theses
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
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
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1),
                    )
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-accent transition hover:bg-second disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MdChevronRight size={22} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Thesis Details Modal */}
      {selectedThesis && (
        <ThesisDetailsModal
          thesis={selectedThesis}
          onClose={() => setSelectedThesis(null)}
        />
      )}
    </section>
  );
}
