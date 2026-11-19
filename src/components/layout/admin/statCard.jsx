export default function StatCard({ label, value, detail, icon, tone }) {
  const toneClasses = {
    blue: "bg-second text-accent",
    yellow: "bg-yellow text-accent",
    green: "bg-second text-navy",
  };

  return (
    <div className="flex min-h-[134px] items-start justify-between rounded-lg border border-(--color-border) bg-panel p-5 shadow-sm sm:p-6">

      <div>
        <p className="text-xs text-muted">
          {label}
        </p>

        <p className="mt-3 text-[31px] font-bold leading-none tracking-[-0.04em] text-accent">
          {value}
        </p>

        <p className="mt-3 text-xs text-muted">
          {detail}
        </p>
      </div>

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-md ${toneClasses[tone]}`}
      >
        {icon}
      </div>

    </div>
  );
}