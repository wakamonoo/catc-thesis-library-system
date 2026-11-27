"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdOutlinePersonAdd,
  MdPeople,
  MdPerson,
  MdPersonOff,
} from "react-icons/md";
import { ProgramContext } from "@/context/programContext";
import TertiaryButton from "@/components/buttons/tertiaryButton";
import AddStudentModal from "@/components/modals/addStudentModal";
import DeleteStudentModal from "@/components/modals/deleteStudentModal";
import StudentFilters from "@/components/layout/admin/students/filters";
import StudentTable from "@/components/layout/admin/students/studentTable";
import StatCard from "../statCard";
import { StudentContext } from "@/context/studentContext";
import Filters from "@/components/layout/admin/students/filters";

export default function StudentsPage() {
  const { programs } = useContext(ProgramContext);
  const {
    students,
    totalStudents,
    activeStudents,
    unRegisteredStudents,
    suspendedStudents,
  } = useContext(StudentContext);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        (student.name || "").toLowerCase().includes(searchValue) ||
        (student.studentId || "").toLowerCase().includes(searchValue) ||
        (student.email || "").toLowerCase().includes(searchValue);

      const matchesProgram =
        selectedProgram === "All Programs" ||
        student.program === selectedProgram;

      const matchesStatus =
        selectedStatus === "All Status" ||
        student.accountStatus === selectedStatus;

      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [students, search, selectedProgram, selectedStatus]);

  const hasFilters =
    search ||
    selectedProgram !== "All Programs" ||
    selectedStatus !== "All Status";

  return (
    <>
      <section className="mx-auto px-4 py-10 sm:px-8 md:px-10 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center justify-center md:items-start">
            <p className="font-alt font-bold text-lg uppercase tracking-widest text-accent">
              Student Management
            </p>
            <p className="text-sm text-muted">
              Manage student records and account statuses.
            </p>
          </div>

          <div className="sm:w-44">
            <TertiaryButton onClick={() => setShowAddStudentModal(true)}>
              <MdAdd className="text-base text-panel shrink-0" />
              <p className="text-sm text-panel font-bold tracking-wide whitespace-nowrap">
                Add Student
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
        </div>

        <div className="border-t border-(--color-border) mt-8 pt-8">
          <Filters
            search={search}
            setSearch={setSearch}
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            programs={programs}
          />

          <StudentTable
            students={filteredStudents}
            totalStudents={totalStudents}
            hasFilters={hasFilters}
            setShowAddStudentModal={setShowAddStudentModal}
          />
        </div>
      </section>

      {showAddStudentModal && (
        <AddStudentModal setShowAddStudentModal={setShowAddStudentModal} />
      )}
    </>
  );
}
