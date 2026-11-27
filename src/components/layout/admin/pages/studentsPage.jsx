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
import EditStudentModal from "@/components/modals/editStudentModal";
import DeleteStudentModal from "@/components/modals/deleteStudentModal";
import ConfirmSuspendStudentModal from "@/components/modals/confirmSuspendStudentModal";
import ConfirmReactivateStudentModal from "@/components/modals/confirmReactivateStudentModal";
import StudentTable from "@/components/layout/admin/students/studentTable";
import StatCard from "../statCard";
import { StudentContext } from "@/context/studentContext";
import Filters from "@/components/layout/admin/students/filters";
import { AuthenticationContext } from "@/context/authenticationContext";
import Swal from "sweetalert2";

export default function StudentsPage() {
  const { programs } = useContext(ProgramContext);
  const { firebaseUser } = useContext(AuthenticationContext);
  const {
    students,
    setStudents,
    totalStudents,
    activeStudents,
    unRegisteredStudents,
    suspendedStudents,
  } = useContext(StudentContext);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentAction, setStudentAction] = useState(null);
  const [studentActionError, setStudentActionError] = useState("");
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
        selectedStatus === "All Status" || student.status === selectedStatus;

      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [students, search, selectedProgram, selectedStatus]);

  const hasFilters =
    search ||
    selectedProgram !== "All Programs" ||
    selectedStatus !== "All Status";

  const showStudentToast = (title, icon) => {
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

  const closeStudentModals = () => {
    setShowAddStudentModal(false);
    setStudentAction(null);
    setStudentActionError("");
  };

  const openStudentAction = (type, student) => {
    setStudentActionError("");
    setStudentAction({ type, student });
  };

  const handleStudentSubmit = async (action, values = {}) => {
    setStudentActionError("");

    try {
      if (!firebaseUser) {
        throw new Error("Please sign in first.");
      }

      const idToken = await firebaseUser.getIdToken();
      const selectedStudent = studentAction?.student;
      const endpoints = {
        add: "addStudent",
        edit: "editStudent",
        suspend: "suspendStudent",
        reactivate: "reactivateStudent",
        delete: "deleteStudent",
      };
      let body = values;

      if (action === "edit") {
        body = {
          studentId: selectedStudent.studentId,
          newStudentId: values.studentId,
          name: values.name,
          email: values.email,
          program: values.program,
        };
      } else if (action === "suspend" || action === "reactivate") {
        body = { studentId: selectedStudent.studentId };
      } else if (action === "delete") {
        body = { studentId: selectedStudent.studentId };
      }

      const response = await fetch(`/api/students/${endpoints[action]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Student action failed.");
      }

      if (action === "add") {
        setStudents((currentStudents) => [...currentStudents, data.newStudent]);
      } else if (action === "edit") {
        setStudents((currentStudents) =>
          currentStudents.map((student) =>
            student.studentId === selectedStudent.studentId
              ? { ...student, ...data.updatedStudent }
              : student,
          ),
        );
      } else if (action === "suspend" || action === "reactivate") {
        setStudents((currentStudents) =>
          currentStudents.map((student) =>
            student.studentId === selectedStudent.studentId
              ? { ...student, ...data.updatedStudent }
              : student,
          ),
        );
      } else if (action === "delete") {
        setStudents((currentStudents) =>
          currentStudents.filter(
            (student) => student.studentId !== selectedStudent.studentId,
          ),
        );
      }

      closeStudentModals();
      showStudentToast(
        data.message || "Student updated successfully.",
        "success",
      );
    } catch (err) {
      setStudentActionError(err.message || "Student action failed.");
      showStudentToast(err.message || "Student action failed.", "error");
    }
  };

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

          <div className="ml-auto flex w-full md:w-fit">
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
            onEditStudent={(student) => openStudentAction("edit", student)}
            onSuspendStudent={(student) =>
              openStudentAction("suspend", student)
            }
            onReactivateStudent={(student) =>
              openStudentAction("reactivate", student)
            }
            onDeleteStudent={(student) => openStudentAction("delete", student)}
          />
        </div>
      </section>

      {showAddStudentModal && (
        <AddStudentModal
          onClose={closeStudentModals}
          onSubmit={(values) => handleStudentSubmit("add", values)}
          errorMessage={studentActionError}
        />
      )}
      {studentAction?.type === "edit" && (
        <EditStudentModal
          student={studentAction.student}
          onClose={closeStudentModals}
          onSubmit={(values) => handleStudentSubmit("edit", values)}
          errorMessage={studentActionError}
        />
      )}
      {studentAction?.type === "delete" && (
        <DeleteStudentModal
          student={studentAction.student}
          onCancel={closeStudentModals}
          onConfirm={() => handleStudentSubmit("delete")}
          errorMessage={studentActionError}
        />
      )}
      {studentAction?.type === "suspend" && (
        <ConfirmSuspendStudentModal
          student={studentAction.student}
          onClose={closeStudentModals}
          onConfirm={() => handleStudentSubmit("suspend")}
          errorMessage={studentActionError}
        />
      )}
      {studentAction?.type === "reactivate" && (
        <ConfirmReactivateStudentModal
          student={studentAction.student}
          onClose={closeStudentModals}
          onConfirm={() => handleStudentSubmit("reactivate")}
          errorMessage={studentActionError}
        />
      )}
    </>
  );
}
