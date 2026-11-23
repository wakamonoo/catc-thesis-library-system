import { AuthenticationContext } from "@/context/authenticationContext";
import { useContext, useState } from "react";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import PrimaryButton from "../buttons/primaryButton";
import { BiMailSend } from "react-icons/bi";

export default function RequestThesisAccessModal({
  thesisId,
  setShowRequestThesisAccessModal,
  setAccessToken,
}) {
  const { user } = useContext(AuthenticationContext);
  const email = user?.email || "";
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRequestAccess = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsSubmitting(true);

      if (!user) {
        throw new Error("Please sign in first.");
      }

      const idToken = await user.getIdToken();

      const response = await fetch("/api/theses/requestAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ thesisId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification code.");
      }

      setStep("otp");
      setSuccessMessage(data.message || "Verification code sent successfully.");
    } catch (err) {
      console.error("Failed to send verification code:", err);
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsSubmitting(true);

      if (!user) {
        throw new Error("Please sign in first.");
      }

      const idToken = await user.getIdToken();

      const response = await fetch("/api/theses/verifyAccess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          thesisId,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid verification code.");
      }

      setSuccessMessage("Verification successful!");
      setAccessToken(data.accessToken);
      setShowRequestThesisAccessModal(false);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Successfull Verififcation!",
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
      console.error("OTP verification error:", err);
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={() => setShowRequestThesisAccessModal(false)}
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
              setShowRequestThesisAccessModal(false);
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
            Access Thesis
          </p>
          <span className="text-xs text-center text-muted">
            Reques access to view full document
          </span>
        </div>

        <form
          onSubmit={step === "email" ? handleRequestAccess : handleVerifyOTP}
          className="flex flex-col gap-2 items-center justify-center p-4"
        >
          {step === "email" ? (
            <>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="authentication-email"
                  className="text-sm font-medium text-panel"
                >
                  Email Address
                </label>
                <input
                  id="authentication-email"
                  type="email"
                  value={email}
                  readOnly
                  className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
                />
                <span className="text-xs text-muted text-center">
                  Your verification code will be sent to this email address.
                </span>
              </div>

              {errorMessage && (
                <p className="mt-2 text-xs w-full text-error text-center">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="mt-2 text-xs w-full text-success text-center">
                  {successMessage}
                </p>
              )}

              <div className="mt-2 w-full">
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  <BiMailSend className="text-base text-panel shrink-0" />
                  <p className="text-sm text-panel font-bold tracking-wide">
                    {isSubmitting ? "Sending..." : "Send Verification Code"}
                  </p>
                </PrimaryButton>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="authentication-otp"
                  className="text-sm font-medium text-panel"
                >
                  Verification Code
                </label>
                <input
                  id="authentication-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setErrorMessage("");
                  }}
                  placeholder="Enter your 6-digit code"
                  className="w-full rounded-lg bg-panel px-4 py-2 text-sm text-normal outline-none placeholder:text-muted"
                />
                <span className="text-xs text-muted text-center">
                  Enter the verification code sent to {email}
                </span>
              </div>

              {errorMessage && (
                <p className="mt-2 text-xs w-full text-error text-center">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="mt-2 text-xs w-full text-success text-center">
                  {successMessage}
                </p>
              )}
              <div className="mt-2 w-full">
                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting || otp.length !== 6}
                >
                  <BiMailSend className="text-base text-panel shrink-0" />
                  <p className="text-sm text-panel font-bold tracking-wide">
                    {isSubmitting ? "Verifying..." : "Verify Code"}
                  </p>
                </PrimaryButton>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
