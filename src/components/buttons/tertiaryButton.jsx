export default function TertiaryButton({ onClick, type = "button", children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent rounded-lg transition-all duration-200 group hover:bg-(--color-accent)/80 active:bg-(--color-accent)/80"
    >
      {children}
    </button>
  );
}
