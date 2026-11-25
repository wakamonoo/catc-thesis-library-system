import { NavigationContext } from "@/context/navigationContext";
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
    handleProgramsClick,
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
      className="absolute top-12 -right-4 h-fit w-60 bg-accent border border-navy rounded-2xl p-8 shadow-2xl overflow-hidden z-100"
    >
      <div className="flex flex-col gap-4 items-start">
        <button onClick={handleHomeClick} className="cursor-pointer group">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "hero" ? "text-yellow" : "text-panel"}`}
          >
            Home
          </p>
        </button>
        <button onClick={handleFeaturedClick} className="cursor-pointer group">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "featured" ? "text-yellow" : "text-panel"}`}
          >
            Featured
          </p>
        </button>
        <button
          onClick={handleProgramsClick}
          className="cursor-pointer group"
        >
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "categories" ? "text-yellow" : "text-panel"}`}
          >
            Browse
          </p>
        </button>
        <button onClick={handleAboutClick} className="cursor-pointer group">
          <p
            className={`font-alt text-sm font-bold transition-all duration-200 group-hover:text-(--color-yellow) group-active:text-(--color-yellow) ${active === "about" ? "text-yellow" : "text-panel"}`}
          >
            About
          </p>
        </button>
      </div>
      <div className="flex-1 h-px bg-yellow my-4" />
      <button className="flex items-center gap-2 px-4 py-2 border border-panel rounded-full">
        <FaUser className="text-base text-panel shrink-0" />
        <p className="text-sm text-panel font-bold">Sign In</p>
      </button>
    </div>
  );
}
