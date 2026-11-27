"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Image from "next/image";
import Logo from "@/assets/catc-logo.jpg";
import PrimaryButton from "@/components/buttons/primaryButton";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }

    if (isSubmitting) return;

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
      const response = await fetch("/api/admin/verify", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        await signOut(auth);
        setErrorMessage(
          "You are not authorized to access the admin dashboard.",
        );
        return;
      }

      router.replace("/admin");
    } catch (err) {
      console.error("Admin sign in error:", err);

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
    <main className="bg-brand flex min-h-screen w-full items-center justify-center p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-(--color-panel)/10 bg-accent shadow-2xl">
        <div className="flex flex-col items-center justify-center px-4 pt-8">
          <div className="w-14 h-auto shrink-0">
            <Image
              src={Logo}
              alt="CAT-C Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-2 text-base text-panel uppercase font-semibold tracking-widest">
            Admin Sign In
          </p>
          <span className="text-xs text-center text-muted">
            Sign in to access the admin dashboard
          </span>
        </div>

        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-2 items-center justify-center p-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="admin-login-email"
              className="text-sm font-medium text-panel"
            >
              Email Address
            </label>
            <input
              id="admin-login-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="admin-login-password"
              className="text-sm font-medium text-panel"
            >
              Password
            </label>
            <div className="flex gap-2 w-full items-center justify-between rounded-lg bg-panel px-4 py-2">
              <input
                id="admin-login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="flex-1 text-sm text-normal outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
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
        </form>
      </div>
    </main>
  );
}
