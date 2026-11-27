"use client";

import { useContext, useRef, useState } from "react";
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { NavigationContext } from "@/context/navigationContext";
import MenuButton from "@/components/buttons/menuButton";
import { PiStudent } from "react-icons/pi";
import { BiBook } from "react-icons/bi";
import AdminOptions from "@/components/options/adminOptions";
import { UserContext } from "@/context/userContext";

export default function Aside() {
  const { user } = useContext(UserContext);
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const adminOptionsButtonRef = useRef(null);
  const { handleHomeClick, activeAdminPage, handleAdminNavigation } =
    useContext(NavigationContext);

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-(--color-border) bg-accent px-4 py-5 md:fixed md:inset-y-0 md:w-64 md:border-b-0 md:border-r md:px-4 md:py-7">
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
          <p className="text-xs font-alt text-muted">
            Discover • Read • Research
          </p>
        </div>
      </div>

      <div className="my-8 flex flex-col gap-2">
        <MenuButton
          onClick={() => handleAdminNavigation("dashboard")}
          activeAdminPage={activeAdminPage === "dashboard"}
        >
          <MdDashboard className="text-base text-normal shrink-0" />
          <p className="text-sm text-normal font-bold tracking-wide">
            Dashboard
          </p>
        </MenuButton>
        <MenuButton
          onClick={() => handleAdminNavigation("students-page")}
          activeAdminPage={activeAdminPage === "students-page"}
        >
          <PiStudent className="text-base text-normal shrink-0" />
          <p className="text-sm text-normal font-bold tracking-wide">
            Students
          </p>
        </MenuButton>
        <MenuButton
          onClick={() => handleAdminNavigation("library")}
          activeAdminPage={activeAdminPage === "library"}
        >
          <BiBook className="text-base text-normal shrink-0" />
          <p className="text-sm text-normal font-bold tracking-wide">Library</p>
        </MenuButton>
      </div>

      <div className="mt-auto w-full h-px bg-yellow my-4" />

      <div className="relative ml-auto md:ml-0 px-2">
        <div className="flex items-center gap-2 p-2 rounded text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-accent text-sm font-semibold">
            Y
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-panel">{user?.name}</p>
            <p className="text-xs text-muted">Administrator</p>
          </div>

          <button
            ref={adminOptionsButtonRef}
            onClick={() => setShowAdminOptions((prev) => !prev)}
            className="cursor-pointer"
          >
            <MdKeyboardArrowDown
              className={`text-2xl text-muted shrink-0 transition-all duration-200 ${showAdminOptions ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        {showAdminOptions && (
          <AdminOptions
            setShowAdminOptions={setShowAdminOptions}
            adminOptionsButtonRef={adminOptionsButtonRef}
          />
        )}
      </div>
    </aside>
  );
}
