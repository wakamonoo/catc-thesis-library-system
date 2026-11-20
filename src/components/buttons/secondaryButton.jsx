export default function SecondaryButton({
  onClick,
  type = "button",
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-accent rounded-full transition-all duration-200 hover:bg-(--color-yellow) active:bg-(--color-yellow)"
    >
      {children}
    </button>
  );
}
