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
import {
  FaChartLine,
  FaFlask,
  FaGlobe,
  FaLandmark,
  FaNetworkWired,
  FaPlug,
  FaTerminal,
} from "react-icons/fa";

import { FaBook, FaGaugeHigh } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";

export const ProgramContext = createContext();

export const ProgramProvider = ({ children }) => {
  const programs = [
    {
      id: 1,
      icon: BiLaptop,
      title: "Computer Engineering",
      academicLevel: "College",
    },
    {
      id: 2,
      icon: BiBulb,
      title: "Electrical Engineering",
      academicLevel: "College",
    },
    {
      id: 3,
      icon: BiChip,
      title: "Electronics Engineering",
      academicLevel: "College",
    },
    { id: 4, icon: BiShield, title: "Criminology", academicLevel: "College" },
    {
      id: 5,
      icon: BiLock,
      title: "Industrial Security Management",
      academicLevel: "College",
    },
    {
      id: 6,
      icon: BiCode,
      title: "Information Technology",
      academicLevel: "College",
    },
    {
      id: 7,
      icon: BiDesktop,
      title: "Computer Science",
      academicLevel: "College",
    },
    {
      id: 8,
      icon: FaBook,
      title: "Office Administration",
      academicLevel: "College",
    },
    {
      id: 9,
      icon: BiCalculator,
      title: "Business Administration Major in Financial Management",
      academicLevel: "College",
    },
    {
      id: 10,
      icon: BiBriefcase,
      title: "Business Administration Major in Marketing Management",
      academicLevel: "College",
    },
    {
      id: 11,
      icon: BiCar,
      title: "Engineering Technology Major in Automotive Technology",
      academicLevel: "College",
    },
    {
      id: 12,
      icon: BiWrench,
      title: "Engineering Technology Major in Electronics Technology",
      academicLevel: "College",
    },
    {
      id: 13,
      icon: BiBuilding,
      title: "Associate in Computer Technology",
      academicLevel: "College",
    },
    {
      id: 14,
      icon: FaChartLine,
      title: "Accountancy, Business and Management (ABM)",
      academicLevel: "Senior High School",
    },
    {
      id: 15,
      icon: FaGlobe,
      title: "General Academic Strand (GAS)",
      academicLevel: "Senior High School",
    },
    {
      id: 16,
      icon: FaLandmark,
      title: "Humanities and Social Sciences (HUMSS)",
      academicLevel: "Senior High School",
    },
    {
      id: 17,
      icon: FaFlask,
      title: "Science, Technology, Engineering and Mathematics (STEM)",
      academicLevel: "Senior High School",
    },
    {
      id: 18,
      icon: FaGaugeHigh,
      title: "Automotive Servicing NC II",
      academicLevel: "Senior High School",
    },
    {
      id: 19,
      icon: FaTerminal,
      title: "Computer Programming NC III",
      academicLevel: "Senior High School",
    },
    {
      id: 20,
      icon: FaNetworkWired,
      title: "Computer Systems Servicing NC II",
      academicLevel: "Senior High School",
    },
    {
      id: 21,
      icon: FaPlug,
      title: "Electronic Products Assembly & Servicing NC II",
      academicLevel: "Senior High School",
    },
  ];

  return (
    <ProgramContext.Provider value={{ programs }}>
      {children}
    </ProgramContext.Provider>
  );
};
