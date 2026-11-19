export default function Field({ label, required, children }) {
  return (
    <label className="block text-sm font-semibold text-normal">

      <span className="mb-2 block text-[13px]">
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </span>

      {children}

    </label>
  );
}