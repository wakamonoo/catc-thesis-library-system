
"use client";

import { useContext, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";

import { ProgramContext } from "@/context/programContext";

import TertiaryButton from "@/components/buttons/tertiaryButton";
import AddStudentModal from "@/components/modals/addStudentModal";
import DeleteStudentModal from "@/components/modals/deleteStudentModal";

import StudentStats from "@/components/layout/admin/students/studentStats";
import StudentFilters from "@/components/layout/admin/students/studentFilters";
import StudentTable from "@/components/layout/admin/students/studentTable";

const initialStudents = [
  {
    id: 1,
    studentId: "2024-001",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    program: "Information Technology",
    accountStatus: "Active",
  },
  {
    id: 2,
    studentId: "2024-002",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    program: "Information Technology",
    accountStatus: "Not Registered",
  },
  {
    id: 3,
    studentId: "2024-003",
    name: "Pedro Reyes",
    email: "pedro.reyes@example.com",
    program: "Computer Science",
    accountStatus: "Suspended",
  },
  {
    id: 4,
    studentId: "2024-004",
    name: "Ana Garcia",
    email: "ana.garcia@example.com",
    program: "Computer Engineering",
    accountStatus: "Active",
  },
  {
    id: 5,
    studentId: "2024-005",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@example.com",
    program: "Criminology",
    accountStatus: "Active",
  },
];

const initialForm = {
  studentId: "",
  name: "",
  email: "",
  program: "",
};

export default function StudentsPage() {
  const { programs } = useContext(ProgramContext);

  // STUDENT STATE
  const [students, setStudents] = useState(initialStudents);

  // SEARCH AND FILTER STATE
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] =
    useState("All Programs");
  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // ACTION MENU STATE
  const [activeMenu, setActiveMenu] = useState(null);

  // FORM STATE
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  // STUDENT STATISTICS
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.accountStatus === "Active"
  ).length;

  const notRegisteredStudents = students.filter(
    (student) => student.accountStatus === "Not Registered"
  ).length;

  const suspendedStudents = students.filter(
    (student) => student.accountStatus === "Suspended"
  ).length;

  // FILTER STUDENTS
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.studentId.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue);

      const matchesProgram =
        selectedProgram === "All Programs" ||
        student.program === selectedProgram;

      const matchesStatus =
        selectedStatus === "All Status" ||
        student.accountStatus === selectedStatus;

      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [students, search, selectedProgram, selectedStatus]);

  // OPEN ADD MODAL
  const openAddModal = () => {
    setEditingStudent(null);
    setForm({ ...initialForm });
    setFormError("");
    setActiveMenu(null);
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (student) => {
    setEditingStudent(student);

    setForm({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      program: student.program,
    });

    setFormError("");
    setActiveMenu(null);
    setShowModal(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormError("");
    setForm({ ...initialForm });
  };

  // HANDLE FORM CHANGES
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setFormError("");
  };

  // ADD OR UPDATE STUDENT
  const handleSubmit = (event) => {
    event.preventDefault();

    const studentId = form.studentId.trim();
    const name = form.name.trim();
    const email = form.email.trim();
    const program = form.program;

    if (!studentId || !name || !email || !program) {
      setFormError("Please complete all required fields.");
      return;
    }

    // CHECK DUPLICATE STUDENT ID
    const duplicateStudentId = students.some(
      (student) =>
        student.studentId.toLowerCase() === studentId.toLowerCase() &&
        student.id !== editingStudent?.id
    );

    if (duplicateStudentId) {
      setFormError("This Student ID already exists.");
      return;
    }

    if (editingStudent) {
      // UPDATE EXISTING STUDENT
      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                studentId,
                name,
                email,
                program,
              }
            : student
        )
      );
    } else {
      // ADD NEW STUDENT
      const newStudent = {
        id: Date.now(),
        studentId,
        name,
        email,
        program,
        accountStatus: "Not Registered",
      };

      setStudents((previousStudents) => [
        ...previousStudents,
        newStudent,
      ]);
    }

    closeModal();
  };

  // OPEN DELETE CONFIRMATION
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setActiveMenu(null);
  };

  // DELETE STUDENT
  const handleDelete = () => {
    if (!studentToDelete) return;

    setStudents((previousStudents) =>
      previousStudents.filter(
        (student) => student.id !== studentToDelete.id
      )
    );

    setStudentToDelete(null);
  };

  // SUSPEND OR ACTIVATE STUDENT
  const handleToggleStatus = (student) => {
    setStudents((previousStudents) =>
      previousStudents.map((item) =>
        item.id === student.id
          ? {
              ...item,
              accountStatus:
                item.accountStatus === "Suspended"
                  ? "Active"
                  : "Suspended",
            }
          : item
      )
    );

    setActiveMenu(null);
  };

  // CHECK IF TABLE IS FILTERED
  const isFiltered =
    search ||
    selectedProgram !== "All Programs" ||
    selectedStatus !== "All Status";

  return (
    <>
      <section className="mx-auto px-4 py-10 sm:px-8 md:px-10 lg:px-12">

        {/* PAGE HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-accent">
              Student Management
            </h1>

            <p className="mt-1 text-sm text-muted">
              Manage student records and account statuses.
            </p>
          </div>

          <div className="sm:w-44">
            <TertiaryButton onClick={openAddModal}>
              <MdAdd className="text-xl" />
              <span className="text-sm font-semibold text-panel">
                Add Student
              </span>
            </TertiaryButton>
          </div>
        </div>

        {/* STUDENT STATISTICS */}
        <StudentStats
          totalStudents={totalStudents}
          activeStudents={activeStudents}
          notRegisteredStudents={notRegisteredStudents}
          suspendedStudents={suspendedStudents}
        />

        {/* STUDENT RECORDS */}
        <div className="overflow-hidden rounded-xl border border-border bg-panel shadow-sm">

          {/* SEARCH AND FILTERS */}
          <div className="border-b border-border p-5">
            <StudentFilters
              search={search}
              setSearch={setSearch}
              selectedProgram={selectedProgram}
              setSelectedProgram={setSelectedProgram}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              programs={programs}
            />
          </div>

          {/* STUDENT TABLE */}
          <StudentTable
            students={filteredStudents}
            totalStudents={totalStudents}
            isFiltered={isFiltered}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteClick}
          />

        </div>
      </section>

      {/* ADD / EDIT STUDENT MODAL */}
      <AddStudentModal
        show={showModal}
        editingStudent={editingStudent}
        form={form}
        formError={formError}
        programs={programs}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteStudentModal
        student={studentToDelete}
        onCancel={() => setStudentToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
