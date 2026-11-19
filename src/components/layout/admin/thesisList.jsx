export default function ThesisList({ theses }) {
  return (
    <div className="mt-5 space-y-3">

      {theses.map((thesis) => (
        <article
          key={thesis.id}
          className="rounded-lg border border-(--color-border) bg-panel p-5 transition hover:border-accent hover:shadow-md"
        >

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <h3 className="font-heading font-bold text-accent">
                {thesis.title}
              </h3>

              <p className="mt-1 text-sm text-muted">
                {thesis.authors}
              </p>
            </div>

            <span className="w-fit rounded-full bg-second px-3 py-1 text-xs font-semibold text-navy">
              {thesis.year}
            </span>

          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">

            <span className="rounded bg-second px-2.5 py-1">
              {thesis.program}
            </span>

            {thesis.document && (
              <span className="inline-flex items-center gap-1 text-navy">
                <MdCheck size={16} />
                PDF attached
              </span>
            )}

          </div>

        </article>
      ))}

    </div>
  );
}