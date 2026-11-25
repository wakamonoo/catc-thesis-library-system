"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (value = searchQuery, filters = {}) => {
    const query = value.trim();

    if (!query) return;

    setSearchQuery(query);

    const params = new URLSearchParams({ query });

    if (filters.program) params.set("program", filters.program);
    if (filters.educationLevel) {
      params.set("educationLevel", filters.educationLevel);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
