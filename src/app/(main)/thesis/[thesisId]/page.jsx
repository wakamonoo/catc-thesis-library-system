"use client";
import ThesisReader from "@/components/layout/thesis/thesisReader";
import { PageLoader } from "@/components/loaders/pageLoader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdCalendarToday,
  MdDescription,
  MdSchool,
  MdSell,
} from "react-icons/md";

export default function Page() {
  const { thesisId } = useParams();
  const [thesis, setThesis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThesis() {
      try {
        setLoading(true);
        const response = await fetch(`/api/theses/getTheses/${thesisId}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Thesis not found"
              : "Failed to load thesis.",
          );
        }

        const data = await response.json();
        setThesis(data.thesis);
      } catch (err) {
        console.log("Failed to fetch thesis:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchThesis();
  }, [thesisId]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="mt-16 md:mt-8 p-4 bg-panel rounded-2xl border border-border shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-yellow px-4 py-2 rounded-full">
            <MdSchool className="text-sm text-normal shrink-0" />
            <p className="text-xs text-normal font-semibold">
              {thesis?.program || "Unspecified Program"}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-second px-4 py-2 rounded-full">
            <MdDescription className="text-sm text-normal shrink-0" />
            <p className="text-xs text-normal font-semibold">
              {thesis?.document?.totalPages || 0} Pages
            </p>
          </div>
        </div>
        <p className="mt-4 text-xl font-bold text-accent leading-tight max-w-2xl">
          {thesis?.title}
        </p>
        <div className="w-full h-px bg-border my-6" />
        <p className="text-sm text-muted">
          {thesis?.authors?.join(", ") || "Authors information unavailable"}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-second flex items-center justify-center">
              <MdCalendarToday className="text-xl text-normal shrink-0" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-normal">
                Date Uploaded
              </p>
              <p className="text-xs text-normal">
                {new Date(thesis?.createdAt).toLocaleDateString("en-PH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-second flex items-center justify-center">
              <MdDescription className="text-xl text-normal shrink-0" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-normal">
                Document Length
              </p>
              <p className="text-xs text-normal">
                {thesis?.document?.totalPages || 0} Pages
              </p>
            </div>
          </div>
        </div>
        {thesis?.keywords?.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <MdSell className="text-normal text-sm shrink-0" />
              <p className="text-xs uppercase tracking-widest font-bold text-normal">
                Research Keywords
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {thesis?.keywords.map((keyword, index) => (
                <div key={index} className="px-4 py-2 rounded-lg bg-second">
                  <p className="text-xs text-muted capitalize">{keyword}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-px h-5 bg-yellow" />
              <p className="text-xs font-bold text-muted uppercase tracking-widest">
                Digital Archive
              </p>
            </div>
            <p className="mt-2 text-xl font-bold text-accent">
              Thesis Document
            </p>
            <p className="text-sm text-muted mt-0.5">
              Read and explore the complete research document.
            </p>
          </div>
          <p className="text-xs font-semibold text-muted">
            {thesis?.document?.totalPages || 0} Pages Available
          </p>
        </div>
        <ThesisReader thesisId={thesis?.thesisId} />
      </div>
    </div>
  );
}
