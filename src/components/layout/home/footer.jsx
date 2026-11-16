"use client";
import Logo from "@/assets/catc-logo.jpg";
import { NavigationContext } from "@/context/navigationContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaUser } from "react-icons/fa";

export default function Footer() {
  const {
    handleHomeClick,
    handleFeaturedClick,
    handleCategoriesClick,
    handleAboutClick,
  } = useContext(NavigationContext);

  return (
    <div className="bg-accent mt-24 p-8 md:px-16 lg:px-32 xl:px-64">
      <div className="flex flex-col gap-12 sm:flex-row md:justify-between">
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
            <h4 className="text-lg text-panel font-heading font-bold leading-2.5">
              CAT-C
            </h4>
            <p className="text-xs font-alt text-muted whitespace-nowrap">
              Discover • Read • Research
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
          <button onClick={handleHomeClick} className="cursor-pointer group">
            <p className="font-alt text-sm font-bold transition-all duration-200 text-panel group-hover:text-(--color-yellow) group-active:text-(--color-yellow)">
              Home
            </p>
          </button>
          <button
            onClick={handleFeaturedClick}
            className="cursor-pointer group"
          >
            <p className="font-alt text-sm font-bold transition-all duration-200 text-panel group-hover:text-(--color-yellow) group-active:text-(--color-yellow)">
              Featured
            </p>
          </button>
          <button
            onClick={handleCategoriesClick}
            className="cursor-pointer group"
          >
            <p className="font-alt text-sm font-bold transition-all duration-200 text-panel group-hover:text-(--color-yellow) group-active:text-(--color-yellow)">
              Browse
            </p>
          </button>
          <button onClick={handleAboutClick} className="cursor-pointer group">
            <p className="font-alt text-sm font-bold transition-all duration-200 text-panel group-hover:text-(--color-yellow) group-active:text-(--color-yellow)">
              About
            </p>
          </button>
        </div>
        <div className="flex gap-4">
          <button className="cursor-pointer w-10 h-10 p-2 rounded-full transition-all duration-200 hover:bg-(--color-yellow) active:bg-(--color-yellow)">
            <FaFacebook className="text-2xl text-panel shrink-0" />
          </button>
          <button className="cursor-pointer w-10 h-10 p-2 rounded-full transition-all duration-200 hover:bg-(--color-yellow) active:bg-(--color-yellow)">
            <FaInstagram className="text-2xl text-panel shrink-0" />
          </button>
          <button className="cursor-pointer w-10 h-10 p-2 rounded-full transition-all duration-200 hover:bg-(--color-yellow) active:bg-(--color-yellow)">
            <BsTwitter className="text-2xl text-panel shrink-0" />
          </button>
        </div>
      </div>
      <div className="my-8 flex-1 h-px bg-yellow" />
      <div className="flex justify-end">
        <p className="text-muted text-xs">
          Copyright © {new Date().getFullYear()} CAT-C. All rights reserved.
        </p>
      </div>
    </div>
  );
}
