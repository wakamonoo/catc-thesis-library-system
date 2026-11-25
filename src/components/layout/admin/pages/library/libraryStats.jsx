import {
  MdMenuBook,
  MdSchool,
  MdCalendarMonth,
} from "react-icons/md";

import StatCard from "@/components/layout/admin/statCard";

export default function LibraryStats({ theses = [] }) {
  const totalTheses = theses.length;

  const totalPrograms = new Set(
    theses.map((thesis) => thesis.program).filter(Boolean),
  ).size;

  const totalAcademicYears = new Set(
    theses.map((thesis) => thesis.academicYear).filter(Boolean),
  ).size;

  const stats = [
    {
      label: "Total Theses",
      value: totalTheses,
      icon: <MdMenuBook className="text-2xl text-accent" />,
    },
    {
      label: "Programs Represented",
      value: totalPrograms,
      icon: <MdSchool className="text-2xl text-accent" />,
    },
    {
      label: "Academic Years",
      value: totalAcademicYears,
      icon: <MdCalendarMonth className="text-2xl text-accent" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
