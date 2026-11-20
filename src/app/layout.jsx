import "./globals.css";
import { NavigationProvider } from "@/context/navigationContext";
import { AuthenticationProvider } from "@/context/authenticationContext";
import { ProgramProvider } from "@/context/programContext";

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
            <ProgramProvider>{children}</ProgramProvider>
          </NavigationProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
