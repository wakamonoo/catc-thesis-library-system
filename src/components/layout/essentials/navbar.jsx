"use client";
import Logo from "@/assets/catc-logo.jpg";
import { NavigationContext } from "@/context/navigationContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { active, handleHomeClick, handleFeaturedClick } =
    useContext(NavigationContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-100 w-full flex justify-between items-center p-8 md:px-16 lg:px-32 xl:px-64 h-14 transition-all duration-200 ${scrolled ? "bg-accent" : "bg-transparent"}`}
    >
      <div className="flex items-center gap-2">
        <button onClick={handleHomeClick} className="cursor-pointer">
          <div className="w-12 h-auto">
            <Image
              src={Logo}
              alt="catc_logo"
              className="w-full h-full object-contain"
            />
          </div>
        </button>
        <div className="flex flex-col justify-center mt-2.5">
          <h4 className="text-lg text-brand font-heading font-bold leading-2.5">
            CAT-C
          </h4>
          <p className="text-xs font-alt text-muted">
            Discover • Read • Research
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-12">
        <button onClick={handleHomeClick} className="cursor-pointer">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 ${active === "hero" ? "text-yellow underline underline-offset-8 decoration-2" : "text-brand"}`}
          >
            Home
          </p>
        </button>
        <button onClick={handleFeaturedClick} className="cursor-pointer">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 ${active === "featured" ? "text-yellow underline underline-offset-8 decoration-2" : "text-brand"}`}
          >
            Featured
          </p>
        </button>
        <button>
          <p className="font-alt text-sm font-bold text-brand">Browse</p>
        </button>
        <button>
          <p className="font-alt text-sm font-bold text-brand">About</p>
        </button>
      </div>
      <div className="hidden lg:block">
        <button className="flex items-center gap-2 px-4 py-2 border border-panel rounded-full">
          <FaUser className="text-base text-brand shrink-0" />
          <p className="text-sm text-brand">Sign In</p>
        </button>
      </div>
      <div className="block lg:hidden">
        <button>
          <BiMenu className="text-2xl text-brand" />
        </button>
      </div>
    </div>
  );
}
