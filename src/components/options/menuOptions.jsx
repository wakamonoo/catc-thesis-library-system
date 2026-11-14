import { NavigationContext } from "@/context/navigationContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";

export default function MenuOptions({
  setShowMenuOptions,
  menuOptionsButtonRef,
}) {
  const {
    active,
    handleHomeClick,
    handleFeaturedClick,
    handleCategoriesClick,
    handleAboutClick,
  } = useContext(NavigationContext);
  const divRef = useRef(null);

  useEffect(() => {
    function handleOutClick(e) {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        menuOptionsButtonRef.current &&
        !menuOptionsButtonRef.current.contains(e.target)
      ) {
        setShowMenuOptions(false);
      }
    }
    document.addEventListener("pointerdown", handleOutClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutClick);
    };
  }, [setShowMenuOptions, menuOptionsButtonRef]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleResize(e) {
      if (e.matches) {
        setShowMenuOptions(false);
      }
    }

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [setShowMenuOptions]);

  return (
    <div
      ref={divRef}
      className="fixed top-18 right-8 md:right-16 h-fit w-[50vw] md:w-[30vw] bg-accent rounded-2xl p-8 shadow-2xl overflow-hidden z-100"
    >
      <div className="flex flex-col gap-4 items-start">
        <button onClick={handleHomeClick} className="cursor-pointer group">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "hero" ? "text-yellow" : "text-brand"}`}
          >
            Home
          </p>
        </button>
        <button onClick={handleFeaturedClick} className="cursor-pointer group">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "featured" ? "text-yellow" : "text-brand"}`}
          >
            Featured
          </p>
        </button>
        <button
          onClick={handleCategoriesClick}
          className="cursor-pointer group"
        >
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "categories" ? "text-yellow" : "text-brand"}`}
          >
            Browse
          </p>
        </button>
        <button onClick={handleAboutClick} className="cursor-pointer group">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "about" ? "text-yellow" : "text-brand"}`}
          >
            About
          </p>
        </button>
      </div>
      <div className="flex-1 h-px bg-yellow my-4" />
      <button className="flex items-center gap-2 px-4 py-2 border border-panel rounded-full">
        <FaUser className="text-base text-brand shrink-0" />
        <p className="text-sm text-brand font-bold">Sign In</p>
      </button>
    </div>
  );
}
