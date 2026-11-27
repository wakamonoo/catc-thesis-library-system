"use client";
import { MdClose } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext, useState } from "react";
import { ProgramContext } from "@/context/programContext";
import ActionButton from "../buttons/actionButton";
import RegularButton from "../buttons/regularButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { AuthenticationContext } from "@/context/authenticationContext";
import Swal from "sweetalert2";

export default function AddAdminModal({ setShowAddAdminModal }) {
  const { firebaseUser } = useContext(AuthenticationContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddAdmin = async () => {
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    try {
      const idToken = await firebaseUser.getIdToken();

      const res = await fetch("/api/admin/addAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add admin");
      }

      await sendPasswordResetEmail(auth, email.trim().toLowerCase());

      setShowAddAdminModal(false);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Admin successfully added!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-yellow)",
        iconColor: "var(--color-success)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title:
            "!text-base !font-[family-name:var(--font-normal)] !font-semibold !text-(--color-normal) !leading-4.5",
        },
      });
    } catch (err) {
      console.error("Admin submission error", err);
      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Something went wrong try again later!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-yellow)",
        iconColor: "var(--color-error)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title:
            "!text-base !font-[family-name:var(--font-normal)] !font-semibold !text-(--color-normal) !leading-4.5",
        },
      });
    }
  };

  return (
    <div
      onClick={() => setShowAddAdminModal(false)}
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
              setShowAddAdminModal(false);
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
            Add New Administrator
          </p>
          <span className="text-xs text-center text-muted">
            Enter personnel details to get started.
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="admin-name"
              className="text-sm font-medium text-panel"
            >
              Name
            </label>
            <input
              id="admin-name"
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
              htmlFor="admin-email"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="admin-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="mt-4 ml-auto flex gap-2 w-fit">
            <RegularButton onClick={() => setShowAddAdminModal(false)}>
              <p className="text-sm text-normal font-bold tracking-wide">
                Cancel
              </p>
            </RegularButton>
            <ActionButton onClick={handleAddAdmin}>
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
