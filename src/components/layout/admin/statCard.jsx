export default function StatCard({ label, value, detail, icon, tone }) {
  const toneClasses = {
    blue: "bg-[#f1f6fa] text-[#1a3a62]",
    yellow: "bg-[#fff2ce] text-[#1a3a62]",
    green: "bg-[#def2e8] text-[#218060]",
  };

  return (
    <div className="flex min-h-[134px] items-start justify-between rounded-lg border border-[#dce4e9] bg-white p-5 shadow-[0_1px_2px_rgba(22,46,70,0.02)] sm:p-6">
      <div>
        <p className="text-xs text-[#708398]">{label}</p>
        <p className="mt-3 text-[31px] font-bold leading-none tracking-[-0.04em] text-[#142a41]">
          {value}
        </p>
        <p className="mt-3 text-xs text-[#718296]">{detail}</p>
      </div>
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-md ${toneClasses[tone]}`}
      >
        {icon}
      </div>
    </div>
  );
}
