export default function Field({ label, required, children }) {
  return (
    <label className="block text-sm font-semibold text-[#1b3148]">
      <span className="mb-2 block text-[13px]">
        {label}
        {required && <span className="ml-1 text-[#c55454]">*</span>}
      </span>
      {children}
    </label>
  );
}
