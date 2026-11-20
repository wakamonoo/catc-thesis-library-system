"use client";
import Logo from "@/assets/catc-logo.jpg";
import PrimaryButton from "@/components/buttons/primaryButton";
import LogInModal from "@/components/modals/signInModal";
import MenuOptions from "@/components/options/menuOptions";
import { AuthenticationContext } from "@/context/authenticationContext";
import { NavigationContext } from "@/context/navigationContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaBars, FaUser } from "react-icons/fa";
import { FaRightFromBracket, FaXmark } from "react-icons/fa6";

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const { isSignedIn, setShowSignInModal, setShowSignOutModal } = useContext(
    AuthenticationContext,
  );
  const {
    active,
    handleHomeClick,
    handleFeaturedClick,
    handleCategoriesClick,
    handleAboutClick,
  } = useContext(NavigationContext);
  const menuOptionsButtonRef = useRef(null);

  const isMainPage = pathname === "/";

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
    <>
      <div
        className={`fixed z-100 w-full flex justify-between items-center p-8 md:px-16 lg:px-32 xl:px-64 h-14 transition-all duration-200 ${scrolled || !isMainPage ? "bg-accent" : "bg-transparent"}`}
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
            <h4 className="text-lg text-panel font-heading font-bold leading-2.5">
              CAT-C
            </h4>
            <p className="text-xs font-alt text-muted">
              Discover • Read • Research
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          <button onClick={handleHomeClick} className="cursor-pointer group">
            <p
              className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "hero" ? "text-yellow underline underline-offset-8 decoration-2" : "text-panel"}`}
            >
              Home
            </p>
          </button>
          <button
            onClick={handleFeaturedClick}
            className="cursor-pointer group"
          >
            <p
              className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "featured" ? "text-yellow underline underline-offset-8 decoration-2" : "text-panel"}`}
            >
              Featured
            </p>
          </button>
          <button
            onClick={handleCategoriesClick}
            className="cursor-pointer group"
          >
            <p
              className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "categories" ? "text-yellow underline underline-offset-8 decoration-2" : "text-panel"}`}
            >
              Browse
            </p>
          </button>
          <button onClick={handleAboutClick} className="cursor-pointer group">
            <p
              className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "about" ? "text-yellow underline underline-offset-8 decoration-2" : "text-panel"}`}
            >
              About
            </p>
          </button>
        </div>
        <div className="hidden lg:block">
          {isSignedIn ? (
            <PrimaryButton
              onClick={() => setShowSignOutModal(true)}
            >
              <FaRightFromBracket className="text-base text-panel shrink-0" />
              <p className="text-sm text-panel font-bold tracking-wide">
                Sign Out
              </p>
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => setShowSignInModal(true)}
            >
              <FaUser className="text-base text-panel shrink-0" />
              <p className="text-sm text-panel font-bold tracking-wide">
                Sign In
              </p>
            </PrimaryButton>
          )}
        </div>
        <div className="relative block lg:hidden">
          <button
            ref={menuOptionsButtonRef}
            onClick={() => setShowMenuOptions((prev) => !prev)}
            className="cursor-pointer group"
          >
            {showMenuOptions ? (
              <FaXmark className="text-2xl text-panel transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow)" />
            ) : (
              <FaBars className="text-2xl text-panel transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow)" />
            )}
          </button>
          {showMenuOptions && (
            <MenuOptions
              setShowMenuOptions={setShowMenuOptions}
              menuOptionsButtonRef={menuOptionsButtonRef}
            />
          )}
        </div>
      </div>
    </>
  );
}
