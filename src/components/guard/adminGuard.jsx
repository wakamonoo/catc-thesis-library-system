"use client";

import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/context/authenticationContext";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/loaders/pageLoader";
import { MdArrowBack, MdLockOutline } from "react-icons/md";

export default function AdminGuard({ children }) {
  const { firebaseUser, loading } = useContext(AuthenticationContext);
  const [status, setStatus] = useState("checking");
  const [verifiedUid, setVerifiedUid] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!firebaseUser) {
      router.replace("/admin/login");
      return;
    }

    let cancelled = false;

    async function checkAdmin() {
      try {
        const idToken = await firebaseUser.getIdToken();
        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: "no-store",
        });

        if (!cancelled) {
          setStatus(response.ok ? "authorized" : "unauthorized");
          setVerifiedUid(firebaseUser.uid);
        }
      } catch (err) {
        console.error("Admin verification failed:", err);

        if (!cancelled) {
          setStatus("unauthorized");
          setVerifiedUid(firebaseUser.uid);
        }
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [firebaseUser, loading, router]);

  if (
    loading ||
    !firebaseUser ||
    verifiedUid !== firebaseUser.uid ||
    status === "checking"
  ) {
    return <PageLoader />;
  }

  if (status === "unauthorized") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-brand p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-panel">
          <MdLockOutline className="text-5xl text-muted" />
        </div>

        <p className="mt-6 text-sm font-semibold tracking-widest text-accent">
          ERROR 403
        </p>

        <h4 className="mt-2 text-2xl font-bold text-normal">Access Denied</h4>

        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          You don't have permission to access this page. Please sign in with an
          authorized account or contact your administrator for assistance.
        </p>

        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer mt-4 flex items-center gap-2 rounded-lg border border-border bg-panel px-4 py-2 transition hover:bg-(--color-secondary) active:bg-(--color-secondary)"
        >
          <MdArrowBack className="text-base shrink-0" />
          <p className="text-sm text-normal">Go Back</p>
        </button>
      </div>
    );
  }

  return children;
}
