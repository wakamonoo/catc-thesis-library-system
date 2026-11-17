export default function ThesisList({ theses }) {
  return (
    <div className="mt-5 space-y-3">
      {theses.map((thesis) => (
        <article
          key={thesis.id}
          className="rounded-lg border border-[#dce4e9] bg-white p-5 transition hover:border-[#b9cbd7] hover:shadow-[0_5px_16px_rgba(32,64,89,0.06)]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-bold text-[#1b334c]">{thesis.title}</h3>
              <p className="mt-1 text-sm text-[#708195]">{thesis.authors}</p>
            </div>
            <span className="w-fit rounded-full bg-[#eef5f8] px-3 py-1 text-xs font-semibold text-[#39707b]">
              {thesis.year}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#65798c]">
            <span className="rounded bg-[#f5f7f8] px-2.5 py-1">
              {thesis.program}
            </span>
            {thesis.document && (
              <span className="inline-flex items-center gap-1 text-[#23815f]">
                <Check size={14} /> PDF attached
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
