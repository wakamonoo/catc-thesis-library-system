import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { useContext, useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import { AuthenticationContext } from "@/context/authenticationContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import Swal from "sweetalert2";

export default function SignInModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    setShowSignInModal,
    setShowRegistrationModal,
    setShowResetPasswordModal,
  } = useContext(AuthenticationContext);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }

    try {
      setIsSubmitting(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);

        setErrorMessage("Please verify your email address before signing in.");
        return;
      }

      const idToken = await user.getIdToken();
      const statusResponse = await fetch("/api/users/checkStatus", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        cache: "no-store",
      });
      const statusData = await statusResponse.json();

      if (!statusResponse.ok) {
        await signOut(auth);
        setErrorMessage(
          statusData.message || "This student account is not active.",
        );
        return;
      }

      setShowSignInModal(false);
      setEmail("");
      setPassword("");

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: `Hello ${user.displayName}!`,
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
      console.error("Sign in error:", err);

      switch (err.code) {
        case "auth/invalid-credential":
          setErrorMessage("Incorrect email or password.");
          break;

        case "auth/user-not-found":
          setErrorMessage("No account found with this email address.");
          break;

        case "auth/wrong-password":
          setErrorMessage("Incorrect email or password.");
          break;

        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;

        case "auth/user-disabled":
          setErrorMessage("This account has been disabled.");
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
      onClick={() => setShowSignInModal(false)}
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
              setShowSignInModal(false);
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
          onSubmit={handleSignIn}
          className="flex flex-col gap-2 items-center justify-center p-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="signin-email"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="signin-password"
              className="text-sm font-medium text-panel"
            >
              Password
            </label>
            <div className="flex gap-2 w-full items-center justify-between rounded-lg bg-panel px-4 py-2">
              <input
                id="sigin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 text-sm text-normal outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer group"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-xl text-muted shrink-0 transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
                ) : (
                  <MdVisibility className="text-xl text-muted shrink-0 transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <button
              onClick={() => {
                setShowSignInModal(false);
                setShowResetPasswordModal(true);
              }}
              className="cursor-pointer"
            >
              <p className="text-xs text-muted transition-all duration-200 hover:opacity-60 active:opacity-60">
                Forgot Password?
              </p>
            </button>
          </div>
          {errorMessage && (
            <p className="mt-2 w-full text-xs text-error text-center">
              {errorMessage}
            </p>
          )}
          <div className="mt-2 w-full">
            <PrimaryButton type="submit" disabled={isSubmitting}>
              <p className="text-sm text-panel font-bold tracking-wide">
                {isSubmitting ? "Signing in..." : "Sign In"}
              </p>
            </PrimaryButton>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-center text-xs text-muted">
              Don&apos;t have an account?
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSignInModal(false);
                setShowRegistrationModal(true);
              }}
              className="cursor-pointer transition-all duration-200 hover:opacity-60 active:opacity-60"
            >
              <p className="text-xs font-semibold text-yellow">Register</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
