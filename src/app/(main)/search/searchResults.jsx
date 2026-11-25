"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdFindInPage, MdSearch } from "react-icons/md";
import { ProgramContext } from "@/context/programContext";
import { SearchContext } from "@/context/searchContext";
import ThesisCard from "@/components/layout/thesis/thesisCard";
import { FileLoader } from "@/components/loaders/fileLoader";
import { EducationLevelContext } from "@/context/educationLevelContext";

const getValue = (value) =>
  Array.isArray(value) ? value[0] || "" : value || "";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = getValue(searchParams.get("query"));
  const program = getValue(searchParams.get("program"));
  const educationLevel = getValue(searchParams.get("educationLevel"));
  const { educationLevels } = useContext(EducationLevelContext);
  const { programs } = useContext(ProgramContext);
  const { searchQuery, setSearchQuery, handleSearch } =
    useContext(SearchContext);
  const [theses, setTheses] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(Boolean(query));
  const [error, setError] = useState("");
  const hasFilters = Boolean(program || educationLevel);
  const resultCount = query.trim() ? total : 0;

  useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ query });

    if (program) params.set("program", program);
    if (educationLevel) params.set("educationLevel", educationLevel);

    const fetchResults = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/theses/search?${params.toString()}`,
          { signal: controller.signal },
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to search theses.");
        }

        setTheses(data.result || []);
        setTotal(data.total || 0);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setTheses([]);
          setTotal(0);
          setError("Theses could not be loaded. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [query, program, educationLevel]);

  const updateFilter = (name, value) => {
    const params = new URLSearchParams();

    if (query.trim()) params.set("query", query);
    if (name === "program" ? value : program) {
      params.set("program", name === "program" ? value : program);
    }
    if (name === "educationLevel" ? value : educationLevel) {
      params.set(
        "educationLevel",
        name === "educationLevel" ? value : educationLevel,
      );
    }

    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query);
    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery, { program, educationLevel });
        }}
        className="mt-16 md:mt-8 flex gap-2 items-center flex-1 px-4 py-2 w-full rounded-lg border border-border bg-panel"
      >
        <MdSearch className="pointer-events-none text-muted text-base" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search title, author or keyword..."
          className="w-full min-w-0 text-sm text-normal outline-none"
          aria-label="Search theses"
        />
        <button
          type="submit"
          className="cursor-pointer shrink-0 rounded-md bg-yellow px-4 py-2 text-sm text-normal"
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-col items-center justify-center md:items-start">
        <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
          Search Results
        </p>
        <p className="text-sm text-muted">
          {query
            ? `Showing theses matching “${query}”.`
            : "Enter a title, author, or keyword to search the thesis library."}
        </p>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-muted whitespace-nowrap">
          {query.trim() && isLoading
            ? "Searching…"
            : `${resultCount} ${resultCount === 1 ? "thesis" : "theses"} found`}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <select
            value={program}
            onChange={(event) => updateFilter("program", event.target.value)}
            aria-label="Filter by program"
            className="w-full sm:w-64 cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
          >
            <option value="">All Programs</option>
            {programs.map((option) => (
              <option
                key={option.id}
                value={option.title}
                className="text-normal truncate"
              >
                {option.title}
              </option>
            ))}
          </select>
          <select
            value={educationLevel}
            onChange={(event) =>
              updateFilter("educationLevel", event.target.value)
            }
            aria-label="Filter by education level"
            className="w-full sm:w-56 cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
          >
            <option value="">All Education Levels</option>
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
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="cursor-pointer group"
            >
              <p className="text-xs text-muted whitespace-nowrap transition-all duration-200 group-hover:underline group-active:underline underline-offset-2">
                Clear filters
              </p>
            </button>
          )}
        </div>
      </div>

      {query.trim() && isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <FileLoader />
        </div>
      ) : query.trim() && error ? (
        <div className="flex flex-col items-center justify-center py-24">
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        </div>
      ) : !query.trim() || theses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <MdFindInPage className="text-4xl text-muted shrink-0" />
          <p className="mt-2 max-w-xs text-center text-xs text-muted">
            {query.trim()
              ? "No theses match this search. Try another keyword or clear the filters."
              : "Enter a search term to find matching theses."}
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
