import {
  BiLaptop,
  BiBulb,
  BiChip,
  BiShield,
  BiLock,
  BiCode,
  BiBook,
  BiCalculator,
  BiBriefcase,
  BiCar,
  BiWrench,
  BiDesktop,
  BiBuilding,
  BiChevronRight,
} from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";

const sampleData = [
  { id: 1, icon: BiLaptop, title: "Computer Engineering" },
  { id: 2, icon: BiBulb, title: "Electrical Engineering" },
  { id: 3, icon: BiChip, title: "Electronics Engineering" },
  { id: 4, icon: BiShield, title: "Criminology" },
  { id: 5, icon: BiLock, title: "Industrial Security Management" },
  { id: 6, icon: BiCode, title: "Information Technology" },
  { id: 7, icon: BiDesktop, title: "Computer Science" },
  { id: 8, icon: FaBook, title: "Office Administration" },
  {
    id: 9,
    icon: BiCalculator,
    title: "Business Administration Major in Financial Management",
  },
  {
    id: 10,
    icon: BiBriefcase,
    title: "Business Administration Major in Marketing Management",
  },
  {
    id: 11,
    icon: BiCar,
    title: "Engineering Technology Major in Automotive Technology",
  },
  {
    id: 12,
    icon: BiWrench,
    title: "Engineering Technology Major in Electronics Technology",
  },
  { id: 13, icon: BiBuilding, title: "Associate in Computer Technology" },
];

export default function Categories() {
  return (
    <div id="categories" className="py-16">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-12 h-px bg-yellow" />
          <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
            College Programs
          </p>
        </div>
        <p className="text-normal text-base leading-tight">
          Explore theses and research from our diverse college programs.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleData.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-panel shadow-xs"
            >
              <div className="p-2 rounded-full bg-second">
                <Icon className="text-2xl shrink-0" />
              </div>
              <p className="text-sm text-normal font-semibold line-clamp-2">
                {category.title}
              </p>
              <button className="ml-auto">
                <BiChevronRight className="text-base shrink-0" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
