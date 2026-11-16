import { NavigationProvider } from "@/context/navigationContext";
import "./globals.css";
import NavBar from "@/components/layout/essentials/navbar";
import { AuthenticationProvider } from "@/context/authenticationContext";

export const metadata = {
  title: "CATC | Thesis Library System",
  description: "Thesis library system of CAT College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="min-h-full flex flex-col">
        <AuthenticationProvider>
          <NavigationProvider>
            <NavBar />
            {children}
          </NavigationProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
