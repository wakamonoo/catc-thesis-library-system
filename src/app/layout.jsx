import "./globals.css";
import { NavigationProvider } from "@/context/navigationContext";
import { AuthenticationProvider } from "@/context/authenticationContext";
import { ProgramProvider } from "@/context/programContext";
import { ThesisProvider } from "@/context/thesisContext";
import { LoaderProvider } from "@/context/loaderContext";
import { SearchProvider } from "@/context/searchContext";
import { EducationLevelProvider } from "@/context/educationLevelContext";
import { UserProvider } from "@/context/userContext";

export const metadata = {
  title: "CATC | Thesis Library System",
  description: "Thesis library system of CAT College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="min-h-full flex flex-col">
        <AuthenticationProvider>
          <UserProvider>
            <LoaderProvider>
              <NavigationProvider>
                <ThesisProvider>
                  <ProgramProvider>
                    <EducationLevelProvider>
                      <SearchProvider>{children}</SearchProvider>
                    </EducationLevelProvider>
                  </ProgramProvider>
                </ThesisProvider>
              </NavigationProvider>
            </LoaderProvider>
          </UserProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
