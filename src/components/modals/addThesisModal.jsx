"use client";
import { MdClose, MdCloudUpload } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext } from "react";
import { ProgramContext } from "@/context/programContext";
import ActionButton from "../buttons/actionButton";
import RegularButton from "../buttons/regularButton";

export default function AddThesisModal({ setShowAddThesisModal }) {
  const { programs } = useContext(ProgramContext);

  return (
    <div
      onClick={() => setShowAddThesisModal(false)}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-(--color-panel)/10 bg-accent shadow-2xl"
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAddThesisModal(false);
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
            Add New Thesis
          </p>
          <span className="text-xs text-center text-muted">
            Expand the library with new academic research
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-panel"
            >
              Title
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="Enter full thesis title"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-panel"
            >
              Authors
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="eg. Juan Dela Cruz, Jose Rizal"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-panel"
            >
              Program
            </label>

            <select
              required
              defaultValue="default"
              className="w-full px-4 py-2 bg-panel rounded-lg outline-none"
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

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-panel"
            >
              Keywoards
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="e.g. library management, information systems"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <label
            id="fileUpload"
            className="flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-(--color-border) bg-transparent p-4 text-center transition hover:border-accent hover:bg-second"
          >
            <MdCloudUpload className="text-4xl text-muted" />
            <p className="mt-2 text-sm font-bold text-yellow">
              Attach thesis document
            </p>
            <div className="mt-2 max-w-full rounded-md bg-panel p-2 transition-all duration-200 hover:bg-(--color-panel)/80 active:bg-(--color-panel)/80">
              <p className="truncate text-xs font-semibold text-normal">
                Choose file - No file chosen
              </p>
            </div>
            <span className="mt-2 text-xs text-muted">Maximum of 50mb</span>
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
          />

          <div className="mt-4 ml-auto flex gap-2 w-fit">
            <RegularButton onClick={() => setShowAddThesisModal(false)}>
              <p className="text-sm text-normal font-bold tracking-wide">
                Cancel
              </p>
            </RegularButton>
            <ActionButton>
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
