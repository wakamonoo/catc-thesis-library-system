"use client";

import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/context/authenticationContext";
import { GiAngryEyes } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/loaders/pageLoader";

export default function AdminGuard({ children }) {
  const { user, loading } = useContext(AuthenticationContext);
  const [status, setStatus] = useState("checking");
  const [verifiedUid, setVerifiedUid] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    let cancelled = false;

    async function checkAdmin() {
      try {
        const idToken = await user.getIdToken();
        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: "no-store",
        });

        if (!cancelled) {
          setStatus(response.ok ? "authorized" : "unauthorized");
          setVerifiedUid(user.uid);
        }
      } catch (err) {
        console.error("Admin verification failed:", err);

        if (!cancelled) {
          setStatus("unauthorized");
          setVerifiedUid(user.uid);
        }
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [user, loading, router]);

  if (loading || !user || verifiedUid !== user.uid || status === "checking") {
    return <PageLoader />;
  }

  if (status === "unauthorized") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-brand opacity-40 p-8">
        <GiAngryEyes className="text-9xl text-normal -m-8" />
        <h4 className="font-bold text-2xl text-normal text-center">
          Well, look who decided to crash the party
        </h4>
      </div>
    );
  }

  return children;
}
