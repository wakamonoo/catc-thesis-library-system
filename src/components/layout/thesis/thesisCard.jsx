import Image from "next/image";
import Link from "next/link";
import { BiBook } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

export default function ThesisCard({ thesis }) {
  return (
    <Link
      key={thesis.thesisId}
      href={`/thesis/${thesis.thesisId}`}
      className={`"cursor-pointer flex flex-col bg-panel shadow-xs rounded-lg border-b-8 ${thesis.educationLevel === "College" ? "border-accent" : "border-yellow"} overflow-hidden transtition-all duration-200 group hover:-translate-y-1 active:-translate-y-1 hover:shadow-2xl active:shadow-2xl`}
    >
      <div className="relative w-full h-44">
        <Image
          src={thesis.coverImage}
          alt={thesis.title}
          fill
          className="object-cover"
        />
        <div
          className={`absolute top-2 right-2 flex items-center gap-0.5 px-4 py-2 rounded-full w-fit max-w-3/4 ${thesis.educationLevel === "College" ? "bg-(--color-accent)/90" : "bg-(--color-yellow)/90"}`}
        >
          <BiBook className="text-xs text-panel" />
          <p className="text-xs text-panel truncate">{thesis.program}</p>
        </div>
      </div>

      <div className="p-4">
        <p className="mt-2 font-alt tracking-wide text-base font-semibold leading-tight">
          {thesis.title}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-second shrink-0 flex items-center justify-center">
              <BsPerson className="text-xs text-muted shrink-0" />
            </div>
            <p className="text-xs text-muted">
              {thesis?.authors?.join(", ") || "Authors information unavailable"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
