import { BiChevronRight, BiCloud } from "react-icons/bi";
import { FaBolt } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import sample from "@/assets/hero-img.webp";
import Image from "next/image";
import SecondaryButton from "@/components/buttons/secondaryButton";

const features = [
  {
    id: 1,
    icon: GiBookshelf,
    title: "Extensive Collection",
    description: "Access a wide range of theses and dissertations.",
  },
  {
    id: 2,
    icon: FaBolt,
    title: "Fast & Easy Search",
    description: "Find what you need in just few clicks.",
  },
  {
    id: 3,
    icon: GoVerified,
    title: "Trusted Resources",
    description: "Reliable and verified acadamic works.",
  },
];

export default function About() {
  return (
    <div id="about" className="p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="flex flex-col">
        <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
          What We Offer
        </p>
        <p className="text-normal text-base leading-tight">
          A comprehensive library system built for your academic needs.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className="flex flex-col gap-4 p-4 rounded-xl bg-panel shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-second">
                  <Icon className="text-2xl shrink-0" />
                </div>
                <span className="text-xs text-muted">0{feature.id}</span>
              </div>
              <div>
                <h2 className="font-alt font-semibold text-base">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="relative h-62 md:h-auto rounded-2xl overflow-hidden">
          <Image
            src={sample}
            alt="CATC Library"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-(--color-accent-dark)/80 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-xs text-panel uppercase tracking-widest">
              CAT-C
            </p>
            <p className="font-alt text-xl text-panel font-semibold">
              Discover. Explore. Learn
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-yellow" />
            <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
              Our Collections
            </p>
          </div>
          <p className="mt-4 text-base text-normal leading-relaxed">
            The CAT-C Thesis Collection is a centralized platform that brings
            together academic research and thesis works from various college
            programs of CAT-C.
          </p>
          <div className="mt-4">
            <SecondaryButton>
              <p className="text-sm text-panel font-bold">
                Explore the Collection
              </p>
              <BiChevronRight className="text-base text-panel shrink-0" />
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
