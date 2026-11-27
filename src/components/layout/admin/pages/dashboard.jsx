"use client";
import { useContext, useState } from "react";
import {
  MdAdd,
  MdCalendarMonth,
  MdMenuBook,
  MdOutlinePersonAdd,
  MdPeople,
  MdPerson,
  MdPersonOff,
  MdSchool,
} from "react-icons/md";
import StatCard from "@/components/layout/admin/statCard";
import { ThesisContext } from "@/context/thesisContext";
import { StudentContext } from "@/context/studentContext";
import TertiaryButton from "@/components/buttons/tertiaryButton";
import AddAdminModal from "@/components/modals/addAdminModal";

export default function Dashboard() {
  const { theses } = useContext(ThesisContext);
  const {
    totalStudents,
    activeStudents,
    unRegisteredStudents,
    suspendedStudents,
  } = useContext(StudentContext);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  return (
    <>
      <section className="mx-auto px-4 sm:px-8 md:px-10 lg:px-12 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center justify-center md:items-start">
            <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
              Admin Dashboard
            </p>
            <p className="text-sm text-muted">
              Manage your college’s academic research.
            </p>
          </div>
          <div className="ml-auto flex w-full md:w-fit">
            <TertiaryButton onClick={() => setShowAddAdminModal(true)}>
              <MdAdd className="text-base text-panel shrink-0" />
              <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
                Add Administrator
              </p>
            </TertiaryButton>
          </div>
        </div>
        <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-4">
          <StatCard
            label="Total Students"
            value={totalStudents}
            icon={<MdPeople className="text-4xl shrink-0" />}
          />
          <StatCard
            label="Active Students"
            value={activeStudents}
            icon={<MdPerson className="text-4xl shrink-0" />}
          />
          <StatCard
            label="Unregistered Students"
            value={unRegisteredStudents}
            icon={<MdOutlinePersonAdd className="text-4xl shrink-0" />}
          />
          <StatCard
            label="Suspended Students"
            value={suspendedStudents}
            icon={<MdPersonOff className="text-4xl shrink-0" />}
          />
          <StatCard
            label="Total Theses"
            value={theses.length}
            icon={<MdMenuBook className="text-2xl text-accent" />}
          />
          <StatCard
            label="Programs Represented"
            value={
              new Set(theses.map((thesis) => thesis.program).filter(Boolean))
                .size
            }
            icon={<MdSchool className="text-2xl text-accent" />}
          />
          <StatCard
            label="Academic Years"
            value={
              new Set(
                theses.map((thesis) => thesis.academicYear).filter(Boolean),
              ).size
            }
            icon={<MdCalendarMonth className="text-2xl text-accent" />}
          />
        </div>
      </section>
      {showAddAdminModal && (
        <AddAdminModal setShowAddAdminModal={setShowAddAdminModal} />
      )}
    </>
  );
}
