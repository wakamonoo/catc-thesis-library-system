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
    <div id="featured" className="py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-yellow" />
            <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
              Featured Thesis
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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {sampleData.map((thesis) => {
          return (
            <div
              key={thesis.id}
              className="flex flex-col bg-second shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-50">
                <Image
                  src={thesis.image}
                  alt={thesis.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-0 flex items-center gap-0.5 px-4 py-2 bg-(--color-accent)/80 rounded-tl-lg rounded-bl-lg w-fit">
                  <BiBook className="text-xs text-brand" />
                  <p className="text-xs text-brand">{thesis.category}</p>
                </div>
              </div>

              <div className="p-4 border-l-4 border-(--color-yellow)">
                <p className="mt-2 font-heading text-base font-semibold leading-tight">
                  {thesis.title}
                </p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <BsPerson className="text-sm text-normal shrink-0" />
                    <p className="text-sm text-normal">{thesis.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BiCalendar className="text-sm text-normal shrink-0" />
                    <p className="text-sm text-normal">{thesis.date}</p>
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
