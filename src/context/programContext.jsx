"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  BiLaptop,
  BiBulb,
  BiChip,
  BiShield,
  BiLock,
  BiCode,
  BiBook,
  BiCalculator,
  BiBriefcase,
  BiCar,
  BiWrench,
  BiDesktop,
  BiBuilding,
  BiChevronRight,
} from "react-icons/bi";

import { FaBook } from "react-icons/fa6";

export const ProgramContext = createContext();

export const ProgramProvider = ({ children }) => {
  const programs = [
    { id: 1, icon: BiLaptop, title: "Computer Engineering" },
    { id: 2, icon: BiBulb, title: "Electrical Engineering" },
    { id: 3, icon: BiChip, title: "Electronics Engineering" },
    { id: 4, icon: BiShield, title: "Criminology" },
    { id: 5, icon: BiLock, title: "Industrial Security Management" },
    { id: 6, icon: BiCode, title: "Information Technology" },
    { id: 7, icon: BiDesktop, title: "Computer Science" },
    { id: 8, icon: FaBook, title: "Office Administration" },
    {
      id: 9,
      icon: BiCalculator,
      title: "Business Administration Major in Financial Management",
    },
    {
      id: 10,
      icon: BiBriefcase,
      title: "Business Administration Major in Marketing Management",
    },
    {
      id: 11,
      icon: BiCar,
      title: "Engineering Technology Major in Automotive Technology",
    },
    {
      id: 12,
      icon: BiWrench,
      title: "Engineering Technology Major in Electronics Technology",
    },
    { id: 13, icon: BiBuilding, title: "Associate in Computer Technology" },
  ];

  return (
    <ProgramContext.Provider value={{ programs }}>
      {children}
    </ProgramContext.Provider>
  );
};
