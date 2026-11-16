import Image from "next/image";
import heroImg from "@/assets/hero-img.webp";
import { BiSearch } from "react-icons/bi";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative w-full py-16 md:min-h-screen md:flex md:items-center"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="heroImg"
          fill
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-(--color-accent-dark)/90 via-(--color-accent-dark)/80 to-transparent" />
      <div className="relative p-8 md:px-16 lg:px-32 xl:px-64">
        <div className="flex items-center gap-2">
          <div className="w-12 h-px bg-yellow" />
          <p className="font-alt tracking-widest text-base uppercase font-semibold text-yellow">
            CAT College Thesis Library System
          </p>
        </div>
        <h1 className="mt-4 text-4xl font-bold font-tall text-panel">
          Discover. Research.{" "}
          <span className="text-yellow font-alt italic">Learn More.</span>
        </h1>
        <p className="mt-4 text-base text-panel leading-tight">
          Your gateway to knowledge at CAT College Thesis Library. Find
          resources, access thesis, and explore more.
        </p>
        <div className="flex items-center gap-2 bg-brand p-2 rounded-full mt-4">
          <BiSearch className="text-2xl text-normal" />
          <input
            type="text"
            placeholder="Search for thesis title, author or keywords..."
            className="outline-none flex-1 min-w-0"
          />
          <button className="cursor-pointer px-4 py-2 bg-yellow rounded-full">
            <p className="text-normal text-sm">Search</p>
          </button>
        </div>
      </div>
    </div>
  );
}
