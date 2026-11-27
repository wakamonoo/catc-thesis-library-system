"use client";
import { MdClose } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext, useState } from "react";
import { ProgramContext } from "@/context/programContext";
import ActionButton from "../buttons/actionButton";
import RegularButton from "../buttons/regularButton";

export default function AddStudentModal({ onClose, onSubmit, errorMessage }) {
  const { programs } = useContext(ProgramContext);
  const [validationError, setValidationError] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");

  const handleSubmit = () => {
    if (!studentId.trim() || !name.trim() || !email.trim() || !program) {
      setValidationError("Please complete all fields.");
      return;
    }

    setValidationError("");
    onSubmit({
      studentId: studentId.trim(),
      name: name.trim(),
      email: email.trim(),
      program: program.trim(),
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-(--color-panel)/10 bg-accent shadow-2xl"
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-panel) active:bg-(--color-panel) shrink-0"
          >
            <MdClose className="text-xl text-panel transition-all duration-20 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-14 h-auto shrink-0">
            <Image
              src={Logo}
              alt="CAT-C Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-2 text-base text-panel uppercase font-semibold tracking-widest">
            Add New Student
          </p>
          <span className="text-xs text-center text-muted">
            Enter student details to get started.
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="student-studentId"
              className="text-sm font-medium text-panel"
            >
              Student Id
            </label>
            <input
              id="student-studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student Id."
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="student-name"
              className="text-sm font-medium text-panel"
            >
              Full Name
            </label>
            <input
              id="student-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="student-email"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="student-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="thesis-program"
              className="text-sm font-medium text-panel"
            >
              Program
            </label>

            <select
              id="thesis-program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required
              className="w-full cursor-pointer px-4 py-2 border border-border bg-panel rounded-lg outline-none"
            >
              <option value="" disabled>
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

          {(validationError || errorMessage) && (
            <p className="mt-2 text-xs w-full text-error text-center">
              {validationError || errorMessage}
            </p>
          )}

          <div className="mt-4 ml-auto flex gap-2 w-fit">
            <RegularButton onClick={onClose}>
              <p className="text-sm text-normal font-bold tracking-wide">
                Cancel
              </p>
            </RegularButton>
            <ActionButton onClick={handleSubmit}>
              <p className="text-sm text-normal font-bold tracking-wide">
                Submit
              </p>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
