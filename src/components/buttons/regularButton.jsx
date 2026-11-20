export default function RegularButton({ onClick, type = "button", children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 bg-second rounded-full transition-all duration-200 group hover:bg-(--color-secondary)/80 active:bg-(--color-secondary)/80"
    >
      {children}
    </button>
  );
}
