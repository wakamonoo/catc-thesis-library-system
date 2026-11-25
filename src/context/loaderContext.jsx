"use client";
import { createContext, useState } from "react";
import { PageLoader } from "@/components/loaders/pageLoader";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && <PageLoader />}
    </LoaderContext.Provider>
  );
};
