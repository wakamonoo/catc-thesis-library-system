export default function PrimaryButton({ onClick, type = "button", children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 border border-panel rounded-full transition-all duration-200 group hover:bg-(--color-yellow) active:bg-(--color-yellow)"
    >
      {children}
    </button>
  );
}
