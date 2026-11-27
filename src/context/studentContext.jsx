"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [studentsLoad, setStudentsLoad] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students/getStudents", {
          method: "GET",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch students.");
        }

        setStudents(data.result);
      } catch (err) {
        console.error("failed to fetch students:", err);
        setStudents([]);
      } finally {
        setStudentsLoad(false);
      }
    };

    fetchStudents();
  }, []);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.accountStatus === "active",
  ).length;

  const unRegisteredStudents = students.filter(
    (student) => student.accountStatus === "not_registered",
  ).length;

  const suspendedStudents = students.filter(
    (student) => student.accountStatus === "duspended",
  ).length;

  return (
    <StudentContext.Provider
      value={{
        students,
        studentsLoad,
        totalStudents,
        activeStudents,
        unRegisteredStudents,
        suspendedStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
