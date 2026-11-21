"use client";
import About from "@/components/layout/home/about";
import Categories from "@/components/layout/home/categories";
import Featured from "@/components/layout/home/featured";
import Footer from "@/components/layout/home/footer";
import Hero from "@/components/layout/home/hero";
import { LoaderContext } from "@/context/loaderContext";
import { useContext, useEffect } from "react";

export default function Page() {
  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
      <Hero />
      <Featured />
      <Categories />
      <About />
      <Footer />
    </>
  );
}
