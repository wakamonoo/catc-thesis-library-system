"use client";

import { useContext, useMemo, useRef, useState } from "react";
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
import { ProgramContext } from "@/context/programContext";
import AddThesisModal from "@/components/modals/addThesisModal";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { NavigationContext } from "@/context/navigationContext";
import MenuButton from "@/components/buttons/menuButton";
import { PiStudent } from "react-icons/pi";
import { BiBook } from "react-icons/bi";
import PrimaryButton from "@/components/buttons/primaryButton";
import { FaRightFromBracket } from "react-icons/fa6";
import ActionButton from "@/components/buttons/actionButton";
import TertiaryButton from "@/components/buttons/tertiaryButton";
import { BsPerson } from "react-icons/bs";
import AdminOptions from "@/components/options/adminOptions";

export default function Page() {
  const { programs } = useContext(ProgramContext);
  const { handleHomeClick } = useContext(NavigationContext);
  const [showAddThesisModal, setShowAddThesisModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All programs");
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const adminOptionsButtonRef = useRef(null);

  return (
    <div>
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-(--color-border) bg-accent px-4 py-5 md:fixed md:inset-y-0 md:w-64 md:border-b-0 md:border-r md:px-4 md:py-7">
          <div className="flex items-center gap-2">
            <button onClick={handleHomeClick} className="cursor-pointer">
              <div className="w-12 h-auto">
                <Image
                  src={Logo}
                  alt="catc_logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
            <div className="flex flex-col justify-center mt-2.5">
              <h4 className="text-lg text-panel font-heading font-bold leading-2.5">
                CAT-C
              </h4>
              <p className="text-xs font-alt text-muted">
                Discover • Read • Research
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <MenuButton>
              <MdDashboard className="text-base text-normal shrink-0" />
              <p className="text-sm text-normal font-bold tracking-wide">
                Dashboard
              </p>
            </MenuButton>
            <MenuButton>
              <PiStudent className="text-base text-normal shrink-0" />
              <p className="text-sm text-normal font-bold tracking-wide">
                Students
              </p>
            </MenuButton>
            <MenuButton>
              <BiBook className="text-base text-normal shrink-0" />
              <p className="text-sm text-normal font-bold tracking-wide">
                Library
              </p>
            </MenuButton>
          </div>

          <div className="mt-auto w-full h-px bg-yellow my-4" />

          <div className="relative ml-auto md:ml-0 px-2">
            <div className="flex items-center gap-2 p-2 rounded text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-accent text-sm font-semibold">
                Y
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-panel">
                  Yancy Nidea
                </p>
                <p className="text-xs text-muted">Administrator</p>
              </div>

              <button
                ref={adminOptionsButtonRef}
                onClick={() => setShowAdminOptions((prev) => !prev)}
                className="cursor-pointer"
              >
                <MdKeyboardArrowDown
                  className={`text-2xl text-muted shrink-0 transition-all duration-200 ${showAdminOptions ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {showAdminOptions && (
              <AdminOptions
                setShowAdminOptions={setShowAdminOptions}
                adminOptionsButtonRef={adminOptionsButtonRef}
              />
            )}
          </div>
        </aside>

        <main className="min-w-0 flex-1 md:ml-64">
          <div className="flex h-18 items-center justify-between border-b border-(--color-border) bg-panel px-4 sm:px-8 md:px-10 lg:px-12">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted">Library Management</p>
              <p className="text-sm text-muted">/</p>
              <p className="text-sm font-semibold text-accent">Overview</p>
            </div>

            <div className="flex items-center gap-2">
              <MdVerifiedUser className="text-base shrink-0" />
              <p className="text-sm font-semibold hidden md:block">
                Admin Access
              </p>
            </div>
          </div>
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
        </main>
      </div>

      {/* ADD THESIS POPUP */}
      {showAddThesisModal && (
        <AddThesisModal
          programs={programs}
          setShowAddThesisModal={setShowAddThesisModal}
        />
      )}
    </div>
  );
}
