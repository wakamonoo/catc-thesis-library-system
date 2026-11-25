"use client";
import { createContext } from "react";

export const EducationLevelContext = createContext();

export const EducationLevelProvider = ({ children }) => {
  const educationLevels = [
    {
      id: 1,
      level: "College",
    },
    {
      id: 2,
      level: "Senior High School",
    },
  ];

  return (
    <EducationLevelContext.Provider value={{ educationLevels }}>
      {children}
    </EducationLevelContext.Provider>
  );
};
