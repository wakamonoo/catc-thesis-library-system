"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/context/authenticationContext";

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [students, setStudents] = useState([]);
  const [studentsLoad, setStudentsLoad] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStudents = async () => {
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/students/getStudents", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: "no-store",
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
  }, [user]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active",
  ).length;

  const unRegisteredStudents = students.filter(
    (student) => student.status === "Not Registered",
  ).length;

  const suspendedStudents = students.filter(
    (student) => student.status === "Suspended",
  ).length;

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
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
