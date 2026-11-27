import { useEffect, useRef } from "react";
import ActionButton from "../buttons/actionButton";
import { BiPencil, BiTrash } from "react-icons/bi";
import { MdPersonAdd, MdPersonOff } from "react-icons/md";

export default function StudentOptions({
  student,
  setActiveMenu,
  studentOptionsButtonRef,
  onEditStudent,
  onSuspendStudent,
  onReactivateStudent,
  onDeleteStudent,
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
        <ActionButton
          onClick={() => {
            setActiveMenu(null);
            onEditStudent(student);
          }}
        >
          <BiPencil className="text-base text-panel shrink-0" />
          <p className="text-sm text-panel font-bold tracking-wide">Edit</p>
        </ActionButton>
        {student.status === "Active" && (
          <ActionButton
            onClick={() => {
              setActiveMenu(null);
              onSuspendStudent(student);
            }}
          >
            <MdPersonOff className="text-base text-panel shrink-0" />
            <p className="text-sm text-panel font-bold tracking-wide">
              Suspend
            </p>
          </ActionButton>
        )}
        {student.status === "Suspended" && (
          <ActionButton
            onClick={() => {
              setActiveMenu(null);
              onReactivateStudent(student);
            }}
          >
            <MdPersonAdd className="text-base text-panel shrink-0" />
            <p className="text-sm text-panel font-bold tracking-wide">
              Reactivate
            </p>
          </ActionButton>
        )}
        <ActionButton
          onClick={() => {
            setActiveMenu(null);
            onDeleteStudent(student);
          }}
        >
          <BiTrash className="text-base text-panel shrink-0" />
          <p className="text-sm text-panel font-bold tracking-wide">Delete</p>
        </ActionButton>
      </div>
    </div>
  );
}
