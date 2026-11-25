import NavBar from "@/components/layout/essentials/navbar";


export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}