"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const ThesisContext = createContext();

export const ThesisProvider = ({ children }) => {
  const [theses, setTheses] = useState([]);

  const fetchTheses = async () => {
    try {
      const res = await fetch("/api/theses/getTheses", {
        method: "GET",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch theses.");
      }

      setTheses(data.result);
    } catch (err) {
      console.error("failed to fetch products", err);
      setTheses([]);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  return (
    <ThesisContext.Provider value={{ theses }}>
      {children}
    </ThesisContext.Provider>
  );
};
