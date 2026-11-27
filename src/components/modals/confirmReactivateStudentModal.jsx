"use client";

import { MdClose } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import ActionButton from "../buttons/actionButton";
import RegularButton from "../buttons/regularButton";

export default function ConfirmReactivateStudentModal({
  student,
  onClose,
  onConfirm,
  errorMessage,
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-(--color-panel)/10 bg-accent shadow-2xl"
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(event) => {
              event.stopPropagation();
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
            Reactivate Student
          </p>
          <span className="text-xs text-center text-muted">
            Reactivate {student.name} and allow them to sign in and request thesis access again?
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center p-4">
          {errorMessage && (
            <p className="mt-2 text-xs w-full text-error text-center">
              {errorMessage}
            </p>
          )}
          <div className="mt-4 ml-auto flex gap-2 w-fit">
            <RegularButton onClick={onClose}>
              <p className="text-sm text-normal font-bold tracking-wide whitespace-nowrap">
                Cancel
              </p>
            </RegularButton>
            <ActionButton onClick={onConfirm}>
              <p className="text-sm text-normal font-bold tracking-wide whitespace-nowrap">
                Reactivate Student
              </p>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
