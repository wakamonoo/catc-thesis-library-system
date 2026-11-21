"use client";
import { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderContext } from "./loaderContext";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [active, setActive] = useState("hero");
  const { setIsLoading } = useContext(LoaderContext);
  const router = useRouter();
  const pathname = usePathname();
  const [activeAdminPage, setActiveAdminPage] = useState("dashboard");

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
    if (pathname === "/") {
      document
        .getElementById("featured")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setIsLoading(true);
      router.push("/#featured");
    }

    setActive("featured");
  };

  const handleCategoriesClick = () => {
    if (pathname === "/") {
      document
        .getElementById("categories")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setIsLoading(true);
      router.push("/#categories");
    }

    setActive("categories");
  };

  const handleAboutClick = () => {
    if (pathname === "/") {
      document
        .getElementById("about")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setIsLoading(true);
      router.push("/#about");
    }

    setActive("about");
  };

  const handleAdminNavigation = (page) => {
    setActiveAdminPage(page);
  };

  return (
    <NavigationContext.Provider
      value={{
        active,
        handleHomeClick,
        handleFeaturedClick,
        handleCategoriesClick,
        handleAboutClick,
        activeAdminPage,
        handleAdminNavigation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
