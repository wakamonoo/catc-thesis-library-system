import ActionButton from "@/components/buttons/actionButton";
import PrimaryButton from "@/components/buttons/primaryButton";
import SecondaryButton from "@/components/buttons/secondaryButton";
import {
  MdCheck,
  MdPictureAsPdf,
  MdVisibility,
  MdCalendarMonth,
} from "react-icons/md";

export default function ThesisList({ theses, onViewDetails }) {
  return (
    <div className="space-y-2">
      {theses.map((thesis) => (
        <div
          key={thesis.thesisId}
          className="rounded-lg border border-(--color-border) bg-panel p-5 transition hover:border-accent hover:shadow-md"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="mt-2 font-alt tracking-wide text-base font-semibold leading-tight">
                {thesis.title}
              </p>

              <p className="mt-0.5 text-xs text-muted">
                {thesis.authors.join(", ")}
              </p>
            </div>

            <div className="w-fit shrink-0 rounded-full bg-second px-4 py-2">
              <p className="text-xs font-semibold text-accent">
                {thesis.academicYear}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded bg-second p-2">
                <p className="text-xs muted">{thesis.program}</p>
              </div>
              <div className="rounded bg-second p-2">
                <p className="text-xs muted">{thesis.educationLevel}</p>
              </div>
              {thesis.document.publicId && (
                <div className="flex items-center gap-0.5">
                  <MdCheck className="text-success text-base shrink-0" />
                  <p className="text-sm text-success font-medium">
                    PDF Attached
                  </p>
                </div>
              )}
            </div>

            <div className="ml-auto w-fit">
              <SecondaryButton onClick={() => onViewDetails?.(thesis)}>
                <MdVisibility className="text-base text-panel shrink-0" />
                <p className="text-sm text-panel font-bold">View Details</p>
              </SecondaryButton>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-0.5">
            <MdCalendarMonth className="text-sm text-muted shrink-0" />
            <p className="text-xs text-muted">
              Added{" "}
              {new Date(thesis.createdAt).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
