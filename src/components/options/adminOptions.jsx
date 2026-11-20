import { NavigationContext } from "@/context/navigationContext";
import { useContext, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import ActionButton from "../buttons/actionButton";
import { FaRightFromBracket } from "react-icons/fa6";

export default function AdminOptions({
  setShowAdminOptions,
  adminOptionsButtonRef,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    function handleOutClick(e) {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        adminOptionsButtonRef.current &&
        !adminOptionsButtonRef.current.contains(e.target)
      ) {
        setShowAdminOptions(false);
      }
    }
    document.addEventListener("pointerdown", handleOutClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutClick);
    };
  }, [setShowAdminOptions, adminOptionsButtonRef]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleResize(e) {
      if (e.matches) {
        setShowAdminOptions(false);
      }
    }

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [setShowAdminOptions]);

  return (
    <div
      ref={divRef}
      className="absolute bottom-full right-2 md:left-36 h-fit w-60 border border-navy bg-accent rounded-2xl p-2 shadow-2xl overflow-hidden z-100"
    >
      <ActionButton>
        <FaRightFromBracket className="text-base text-panel shrink-0" />
        <p className="text-sm text-panel font-bold tracking-wide">Sign Out</p>
      </ActionButton>
    </div>
  );
}
