
import {
  MdPeople,
  MdPerson,
  MdPersonOff,
  MdOutlinePersonAdd,
} from "react-icons/md";

import StatCard from "@/components/layout/admin/statCard";

export default function StudentStats({
  totalStudents,
  activeStudents,
  notRegisteredStudents,
  suspendedStudents,
}) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Students"
        value={totalStudents}
        icon={<MdPeople />}
      />

      <StatCard
        label="Active Accounts"
        value={activeStudents}
        icon={<MdPerson />}
      />

      <StatCard
        label="Not Registered"
        value={notRegisteredStudents}
        icon={<MdOutlinePersonAdd />}
      />

      <StatCard
        label="Suspended Accounts"
        value={suspendedStudents}
        icon={<MdPersonOff />}
      />
    </div>
  );
}
