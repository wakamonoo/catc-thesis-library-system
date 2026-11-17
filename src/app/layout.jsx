import { NavigationProvider } from "@/context/navigationContext";
import "./globals.css";
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
          <NavigationProvider>{children}</NavigationProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
