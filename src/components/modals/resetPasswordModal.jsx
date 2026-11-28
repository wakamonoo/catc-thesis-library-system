import { MdClose } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext, useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import { AuthenticationContext } from "@/context/authenticationContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { BiArrowBack } from "react-icons/bi";

export default function ResetPasswordModal() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    resetEmailPassword,
    setResetEmailPassword,
    setShowSignInModal,
    setShowResetPasswordModal,
  } = useContext(AuthenticationContext);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!resetEmailPassword.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmailPassword.trim());

      setSuccessMessage(
        "Reset link sent, kindly check your email. Once done please go back to the sign-in page.",
      );
    } catch (err) {
      console.error("Password reset error:", err);

      switch (err.code) {
        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setErrorMessage("Too many attempts. Please try again later.");
          break;

        default:
          setErrorMessage("Unable to send reset email. Please try again.");
      }
    }
  };

  return (
    <div
      onClick={() => setShowResetPasswordModal(false)}
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
              setShowResetPasswordModal(false);
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
            Welcome Back
          </p>
          <span className="text-xs text-center text-muted">
            Sign in to access the library
          </span>
        </div>

        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-2 items-center justify-center p-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="reset-emial"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              placeholder="Enter your email address"
              value={resetEmailPassword}
              onChange={(e) => setResetEmailPassword(e.target.value)}
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          {errorMessage && (
            <p className="mt-2 w-full text-xs text-error text-center">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-2 w-full text-xs text-success text-center">
              {successMessage}
            </p>
          )}
          <div className="mt-2 w-full">
            <PrimaryButton type="submit">
              <p className="text-sm text-panel font-bold tracking-wide">
                Send Reset Link
              </p>
            </PrimaryButton>
          </div>

          <button
            onClick={() => {
              setShowResetPasswordModal(false);
              setShowSignInModal(true);
            }}
            className="cursor-pointer flex items-center justify-center gap-2 group"
          >
            <BiArrowBack className="text-sm text-muted transition-all duration-200 group-hover:opacity-60 group-active:opacity-60" />
            <p className="text-xs text-muted transition-all duration-200 group-hover:opacity-60 group-active:opacity-60">
              Back to Login
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}
