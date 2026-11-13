import Featured from "@/components/layout/home/featured";
import Hero from "@/components/layout/home/hero";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="p-8 md:px-16 lg:px-32 xl:px-64">
        <Featured />
      </div>
    </>
  );
}
