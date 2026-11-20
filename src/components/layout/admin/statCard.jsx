import CountUp from "react-countup";

export default function StatCard({ label, value, icon }) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-(--color-border) bg-panel p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-xs text-muted">{label}</p>
        <div className="mt-2">
          <CountUp
            start={0}
            end={value}
            duration={1.5}
            className="text-2xl font-bold text-accent"
          />
        </div>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-yellow">
        {icon}
      </div>
    </div>
  );
}
