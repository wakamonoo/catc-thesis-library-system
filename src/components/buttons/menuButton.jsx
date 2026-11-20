export default function MenuButton({
  onClick,
  type = "button",
  children,
  activeAdminPage,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group  ${activeAdminPage ? "bg-(--color-yellow)/40" : "bg-yellow hover:bg-(--color-yellow)/40 active:bg-(--color-yellow)/40"}`}
    >
      {children}
    </button>
  );
}
