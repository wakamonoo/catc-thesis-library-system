import NavBar from "@/components/layout/essentials/navbar";
import About from "@/components/layout/home/about";
import Categories from "@/components/layout/home/categories";
import Featured from "@/components/layout/home/featured";
import Footer from "@/components/layout/home/footer";
import Hero from "@/components/layout/home/hero";

export default function Page() {
  return (
    <>
      <NavBar />
      <Hero />
      <Featured />
      <Categories />
      <About />
      <Footer />
    </>
  );
}
