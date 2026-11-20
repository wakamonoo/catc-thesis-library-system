import { AuthenticationContext } from "@/context/authenticationContext";
import { useContext, useState } from "react";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import PrimaryButton from "../buttons/primaryButton";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function RegistrationModal() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setShowRegistrationModal, setShowSignInModal } = useContext(
    AuthenticationContext,
  );

  const handleRegistration = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !name.trim() ||
      !studentId.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const verificationRes = await fetch("/api/students/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId.trim(),
          email: email.trim(),
        }),
      });

      const verificationData = await verificationRes.json();

      if (!verificationRes.ok) {
        throw new Error(verificationData.message);
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name.trim(),
      });

      const token = await user.getIdToken();

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          studentId: studentId.trim(),
          name: name.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register user");
      }

      await sendEmailVerification(user);

      await signOut(auth);

      setSuccessMessage(
        "Account created succesfully! Please check your email to verify your account before signing in.",
      );

      setName("");
      setStudentId("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Registration error:", err);

      if (err.message == "Student ID and email do not match our records.") {
        setErrorMessage(err.message);
        return;
      }

      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorMessage("This email address is already registered.");
          break;

        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setErrorMessage("Your password is too weak.");
          break;

        case "auth/too-many-requests":
          setErrorMessage("Too many attempts. Please try again later.");
          break;

        default:
          setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span className="text-xs text-center text-muted">
            Register to access the library
          </span>
        </div>

        <form
          onSubmit={handleRegistration}
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
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="registration-studentid"
              className="text-sm font-medium text-panel"
            >
              Student Id
            </label>
            <input
              id="registration-studentid"
              type="text"
              placeholder="Enter Student-ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="registration-email"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="registration-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="registration-password"
                className="text-sm font-medium text-panel"
              >
                Create Password
              </label>
              <input
                id="registration-password"
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="registration-confirmpassword"
                className="text-sm font-medium text-panel"
              >
                Confirm Password
              </label>
              <input
                id="registration-confirmpassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
              />
            </div>
          </div>

          {errorMessage && (
            <p className="mt-2 text-xs w-full text-error text-center">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <div className="mt-2 flex flex-col items-center gap-2 w-full">
              <p className="text-xs w-full text-success text-center">
                {successMessage}
              </p>
              <PrimaryButton
                type="button"
                onClick={() => {
                  setShowRegistrationModal(false);
                  setShowSignInModal(true);
                }}
              >
                <p className="text-sm text-panel font-bold tracking-wide">
                  Proceed to Sign In
                </p>
              </PrimaryButton>
            </div>
          )}

          {!successMessage && (
            <div className="mt-2 w-full">
              <PrimaryButton type="submit" disabled={isSubmitting}>
                <p className="text-sm text-panel font-bold tracking-wide">
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </p>
              </PrimaryButton>
            </div>
          )}
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
