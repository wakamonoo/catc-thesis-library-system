import { AuthenticationContext } from "@/context/authenticationContext";
import { useContext } from "react";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import PrimaryButton from "../buttons/primaryButton";

export default function RegistrationModal() {
  const { setShowRegistrationModal, setShowSignInModal } = useContext(
    AuthenticationContext,
  );

  return (
    <div
      onClick={() => setShowRegistrationModal(false)}
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
              setShowRegistrationModal(false);
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
            Create Account
          </p>
          <span className="text-xs text-muted">
            Register to access the library
          </span>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2 items-center justify-center p-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="registration-name"
              className="text-sm font-medium text-panel"
            >
              Full Name
            </label>
            <input
              id="registration-name"
              type="email"
              placeholder="Enter your full name"
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="registration-name"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="registration-email"
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="registration-email"
                className="text-sm font-medium text-panel"
              >
                Create Password
              </label>
              <input
                id="registration-password"
                type="email"
                placeholder="Create Password"
                className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="registration-name"
                className="text-sm font-medium text-panel"
              >
                Confirm Password
              </label>
              <input
                id="registration-name"
                type="email"
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
              />
            </div>
          </div>
          <div className="mt-2 w-full">
            <PrimaryButton>
              <p className="text-sm text-panel font-bold tracking-wide">
                Create Account
              </p>
            </PrimaryButton>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-center text-xs text-muted">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => {
                setShowRegistrationModal(false);
                setShowSignInModal(true);
              }}
              className="cursor-pointer transition-all duration-200 hover:opacity-60 active:opacity-60"
            >
              <p className="text-xs font-semibold text-yellow">Sign In</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
