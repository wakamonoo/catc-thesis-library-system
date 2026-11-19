import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext, useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import { AuthenticationContext } from "@/context/authenticationContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import Swal from "sweetalert2";

export default function SignOutModal() {
  const { signOutUser, setShowSignOutModal } = useContext(
    AuthenticationContext,
  );

  const handleSignOut = async () => {
    try {
      await signOutUser();

      setShowSignOutModal(false);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Signed out successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-yellow)",
        iconColor: "var(--color-accent)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title:
            "!text-base !font-[family-name:var(--font-normal)] !font-semibold !text-(--color-normal) !leading-4.5",
        },
      });
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };
  return (
    <div
      onClick={() => setShowSignOutModal(false)}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-(--color-panel)/10 bg-accent shadow-2xl"
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSignOutModal(false);
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
            See You Again
          </p>
          <span className="text-xs text-center text-muted">
            Are you sure you want to sign out of your account?
          </span>
        </div>

        <div className="flex items-center justify-center p-4">
          <PrimaryButton onClick={handleSignOut}>
            <p className="text-sm text-panel font-bold tracking-wide">
              Sign Out
            </p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
