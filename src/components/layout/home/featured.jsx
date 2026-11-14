import sample from "@/assets/hero-img.webp";
import Image from "next/image";
import { BiBook, BiCalendar } from "react-icons/bi";
import { BsArrowRight, BsPerson } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";

const sampleData = [
  {
    id: 1,
    title: "Development of a Web-Based Library Management System",
    author: "Joven Bataller",
    category: "Information Technology",
    date: "Aug. 2025",
    image: sample,
  },
  {
    id: 2,
    title:
      "An Online Platform for Preserving Local Folklore and Cultural Heritage",
    author: "Maria Santos",
    category: "Information Technology",
    date: "Mar. 2025",
    image: sample,
  },
  {
    id: 3,
    title: "A Study on Sustainable Agricultural Practices in Albay",
    author: "Juan Dela Cruz",
    category: "Agriculture",
    date: "Jan. 2025",
    image: sample,
  },
];

export default function Featured() {
  return (
    <div id="featured" className="p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-accent" />
            <p className="font-alt tracking-widest text-base uppercase font-semibold text-accent">
              Featured Theses
            </p>
          </div>
          <p className="text-normal text-base leading-tight">
            Explore some of the latest and most relevant theses from CAT
            College.
          </p>
        </div>
        <button className="cursor-pointer flex items-center gap-2">
          <p className="text-sm text-muted whitespace-nowrap">Browse All</p>
          <BsArrowRight className="text-sm text-muted" />
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {sampleData.map((thesis) => {
          return (
            <div
              key={thesis.id}
              className="flex flex-col bg-panel shadow-xs rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-44">
                <Image
                  src={thesis.image}
                  alt={thesis.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-4 py-2 bg-(--color-accent)/90 rounded-full w-fit">
                  <BiBook className="text-xs text-brand" />
                  <p className="text-xs text-brand">{thesis.category}</p>
                </div>
              </div>

              <div className="p-4 border-b-8 border-accent">
                <p className="mt-2 font-alt tracking-wide text-base font-semibold leading-tight">
                  {thesis.title}
                </p>
                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-2">
                    <BsPerson className="text-sm text-muted shrink-0" />
                    <p className="text-sm text-muted">{thesis.author}</p>
                  </div>
                  <div className="w-px h-4 bg-muted" />
                  <div className="flex items-center gap-2">
                    <BiCalendar className="text-sm text-muted shrink-0" />
                    <p className="text-sm text-muted">{thesis.date}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
