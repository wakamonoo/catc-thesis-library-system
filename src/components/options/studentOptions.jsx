import { useEffect, useRef } from "react";
import ActionButton from "../buttons/actionButton";
import { BiPencil, BiTrash } from "react-icons/bi";
import { MdPersonOff } from "react-icons/md";

export default function StudentOptions({
  setActiveMenu,
  studentOptionsButtonRef,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    function handleOutClick(e) {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        studentOptionsButtonRef.current &&
        !studentOptionsButtonRef.current.contains(e.target)
      ) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("pointerdown", handleOutClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutClick);
    };
  }, [setActiveMenu, studentOptionsButtonRef]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleResize(e) {
      if (e.matches) {
        setActiveMenu(null);
      }
    }

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [setActiveMenu]);

  return (
    <div
      ref={divRef}
      className="absolute bottom-full top-2 right-2 h-fit w-60 border border-navy bg-accent rounded-2xl p-2 shadow-2xl overflow-hidden z-100"
    >
      <div className="flex flex-col gap-4 items-start">
        <ActionButton>
          <BiPencil className="text-base text-panel shrink-0" />
          <p className="text-sm text-panel font-bold tracking-wide">Edit</p>
        </ActionButton>
        <ActionButton>
          <MdPersonOff className="text-base text-panel shrink-0" />
          <p className="text-sm text-panel font-bold tracking-wide">Suspend</p>
        </ActionButton>
        <ActionButton>
          <BiTrash className="text-base text-panel shrink-0" />
          <p className="text-sm text-panel font-bold tracking-wide">Delete</p>
        </ActionButton>
      </div>
    </div>
  );
}
