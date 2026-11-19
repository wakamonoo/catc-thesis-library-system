
"use client";

import { useMemo, useState } from "react";
import {
  MdOpenInNew,
  MdMenuBook,
  MdDescription,
  MdSchool,
  MdDashboard,
  MdLogout,
  MdAdd,
  MdSearch,
  MdVerifiedUser,
  MdKeyboardArrowDown,
} from "react-icons/md";

import StatCard from "@/components/layout/admin/statCard";
import EmptyCollection from "@/components/layout/admin/emptyCollection";
import ThesisList from "@/components/layout/admin/thesisList";
import AddThesisModal from "@/components/layout/admin/addThesisModal";


const programs = [
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Business Administration",
  "Bachelor of Arts in Communication",
];

const initialForm = {
  title: "",
  authors: "",
  program: "",
  year: "2026",
  abstract: "",
  keywords: "",
};

export default function Page() {
  const [theses, setTheses] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All programs");
  const [form, setForm] = useState(initialForm);
  const [documentName, setDocumentName] = useState("");

  // Filter thesis records
  const filteredTheses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return theses.filter((thesis) => {
      const matchesSearch =
        !query ||
        [thesis.title, thesis.authors, thesis.keywords].some(
          (value) => String(value ?? "").toLowerCase().includes(query)
        );

      const matchesProgram =
        selectedProgram === "All programs" ||
        thesis.program === selectedProgram;

      return matchesSearch && matchesProgram;
    });
  }, [search, selectedProgram, theses]);

  // Open Add Thesis popup
  const openAddThesis = () => {
    setForm(initialForm);
    setDocumentName("");
    setIsAddOpen(true);
  };

  // Close Add Thesis popup
  const closeAddThesis = () => setIsAddOpen(false);

  // Update form fields
  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Validate PDF document
  const handleDocument = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("The PDF file must not exceed 20 MB.");
      event.target.value = "";
      return;
    }

    setDocumentName(file.name);
  };

  // Save thesis record
  const saveThesis = (event) => {
    event.preventDefault();

    const newThesis = {
      ...form,
      id: Date.now(),
      document: documentName,
    };

    setTheses((current) => [newThesis, ...current]);
    closeAddThesis();
  };

  return (
    <div className="min-h-screen bg-brand text-normal">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* SIDEBAR */}
        <aside className="flex w-full shrink-0 flex-col border-b border-(--color-border) bg-panel px-4 py-5 md:fixed md:inset-y-0 md:w-[230px] md:border-b-0 md:border-r md:px-4 md:py-7">

          {/* LOGO */}
          <div className="flex items-center gap-3 px-2 md:px-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-accent bg-second text-accent shadow-[inset_0_0_0_3px_white]">
              <MdMenuBook size={26} />
            </div>

            <div>
              <div className="font-heading text-[24px] font-bold leading-none tracking-[-0.04em] text-accent">
                CAT-C
              </div>
              <div className="mt-1 text-[11px] font-medium tracking-[0.02em] text-muted">
                Thesis Library
              </div>
            </div>
          </div>

          {/* WORKSPACE */}
          <div className="mt-8 flex items-center justify-between px-3 md:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-muted">
              Workspace
            </p>

            <span className="rounded-full bg-second px-2 py-1 text-[10px] font-semibold text-navy md:hidden">
              Admin
            </span>
          </div>

          {/* NAVIGATION */}
          <nav className="mt-4 flex gap-2 overflow-x-auto md:block md:space-y-2">
            <button
              type="button"
              className="flex min-w-max items-center gap-3 rounded-md bg-accent px-3 py-3 text-left text-sm font-semibold text-panel shadow-sm transition hover:bg-(--color-accent-dark) md:w-full"
            >
              <MdDashboard size={19} />
              Dashboard
            </button>

            <button
              type="button"
              onClick={openAddThesis}
              className="flex min-w-max items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-muted transition hover:bg-second hover:text-accent md:w-full"
            >
              <MdAdd size={21} />
              Add thesis
            </button>
          </nav>

          {/* OTHER NAVIGATION */}
          <div className="mt-4 flex gap-2 border-t border-(--color-border) pt-4 md:mt-auto md:block md:border-t-0 md:pt-0">
            <button
              type="button"
              className="flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-muted transition hover:bg-second hover:text-accent md:w-full"
            >
              <MdOpenInNew size={19} />
              View library
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-muted transition hover:bg-second hover:text-accent md:mt-1 md:w-full"
            >
              <MdLogout size={19} />
              Sign out
            </button>
          </div>

          {/* ADMIN PROFILE */}
          <div className="mt-5 hidden items-center gap-3 border-t border-(--color-border) px-1 pt-5 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-accent text-sm font-semibold">
              Y
            </div>

            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-normal">
                Yancy Nidea
              </div>
              <div className="mt-1 text-[10px] text-muted">
                Administrator
              </div>
            </div>

            <MdVerifiedUser className="ml-auto text-accent" size={18} />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1 md:ml-[230px]">

          {/* HEADER */}
          <header className="flex h-[70px] items-center justify-between border-b border-(--color-border) bg-panel px-5 sm:px-8 lg:px-9">
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="hidden sm:inline">
                Library management
              </span>
              <span className="hidden text-muted sm:inline">/</span>
              <span className="font-medium text-accent">
                Overview
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-navy">
              <MdVerifiedUser size={18} />
              <span className="hidden sm:inline">Admin access</span>
            </div>
          </header>

          {/* DASHBOARD CONTENT */}
          <section className="mx-auto max-w-[1110px] px-5 py-8 sm:px-8 lg:px-9 lg:py-12">

            {/* PAGE TITLE */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[-0.01em] text-muted">
                  CAT-C thesis collection
                </p>

                <h1 className="mt-2 font-heading text-[30px] font-bold leading-[1.15] tracking-[-0.035em] text-accent sm:text-[32px]">
                  Admin dashboard
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Manage your college’s academic research.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddThesis}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-panel shadow-sm transition hover:-translate-y-0.5 hover:bg-(--color-accent-dark) focus:outline-none focus:ring-2 focus:ring-(--color-navy) focus:ring-offset-2"
              >
                <MdAdd size={20} />
                Add thesis
              </button>
            </div>

            {/* STATISTICS */}
            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              <StatCard
                label="Total theses"
                value={theses.length}
                detail="In the collection"
                icon={<MdMenuBook size={25} />}
                tone="blue"
              />

              <StatCard
                label="College programs"
                value={new Set(theses.map((thesis) => thesis.program)).size}
                detail="With thesis records"
                icon={<MdSchool size={25} />}
                tone="yellow"
              />

              <StatCard
                label="Documents"
                value={theses.filter((thesis) => thesis.document).length}
                detail="PDFs uploaded"
                icon={<MdDescription size={25} />}
                tone="green"
              />
            </div>

            {/* THESIS COLLECTION */}
            <div className="mt-8 border-t border-(--color-border) pt-6 sm:mt-9 sm:pt-7">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-[19px] font-bold tracking-[-0.02em] text-accent">
                  Thesis collection
                </h2>

                <span className="rounded bg-second px-2 py-1 text-[11px] font-bold text-accent">
                  {theses.length}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                All thesis records, newest first.
              </p>

              {/* SEARCH AND FILTER */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <label className="relative block flex-1">
                  <MdSearch
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                    size={20}
                  />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search title, author or keyword..."
                    className="h-10 w-full rounded-md border border-(--color-border) bg-panel pl-10 pr-4 text-sm text-normal outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
                  />
                </label>

                <div className="relative sm:w-[224px]">
                  <select
                    value={selectedProgram}
                    onChange={(event) => setSelectedProgram(event.target.value)}
                    className="h-10 w-full appearance-none rounded-md border border-(--color-border) bg-panel px-4 pr-10 text-sm text-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-(--color-secondary)"
                  >
                    <option>All programs</option>

                    {programs.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>

                  <MdKeyboardArrowDown
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                    size={20}
                  />
                </div>
              </div>

              {/* THESIS RESULTS */}
              {filteredTheses.length === 0 ? (
                <EmptyCollection
                  onAdd={openAddThesis}
                  hasFilters={Boolean(
                    search.trim() ||
                    selectedProgram !== "All programs"
                  )}
                />
              ) : (
                <ThesisList theses={filteredTheses} />
              )}
            </div>
          </section>
        </main>
      </div>

      {/* ADD THESIS POPUP */}
      {isAddOpen && (
        <AddThesisModal
          programs={programs}
          form={form}
          documentName={documentName}
          onChange={updateForm}
          onDocumentChange={handleDocument}
          onClose={closeAddThesis}
          onSave={saveThesis}
        />
      )}
    </div>
  );
}
