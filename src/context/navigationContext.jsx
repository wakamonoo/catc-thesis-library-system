"use client";
import { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [active, setActive] = useState("hero");
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = async () => {
    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      router.push("/");
      setActive("hero");
    } else {
      router.push("/");
      setActive("hero");
    }
  };

  const handleFeaturedClick = () => {
    document
      .getElementById("featured")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    setActive("featured");
  };

  return (
    <NavigationContext.Provider
      value={{
        active,
        handleHomeClick,
        handleFeaturedClick,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
