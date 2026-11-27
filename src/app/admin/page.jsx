"use client";
import { useContext } from "react";
import Aside from "@/components/layout/admin/aside";
import { NavigationContext } from "@/context/navigationContext";
import Dashboard from "@/components/layout/admin/pages/dashboard";
import StudentsPage from "@/components/layout/admin/pages/studentsPage";
import Library from "@/components/layout/admin/pages/library";
import { MdVerifiedUser } from "react-icons/md";
import AdminGuard from "@/components/guard/adminGuard";
import { StudentProvider } from "@/context/studentContext";

export default function Page() {
  const { activeAdminPage } = useContext(NavigationContext);

  return (
    <AdminGuard>
      <StudentProvider>
        <>
          <Aside />
          <div className="flex min-h-screen flex-col md:flex-row">
            <main className="min-w-0 flex-1 md:ml-64">
              <div className="flex h-18 items-center justify-between border-b border-(--color-border) bg-panel px-4 sm:px-8 md:px-10 lg:px-12">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted">Library Management</p>
                  <p className="text-sm text-muted">/</p>
                  <p className="text-sm font-semibold text-accent">Overview</p>
                </div>

                <div className="flex items-center gap-2">
                  <MdVerifiedUser className="text-base shrink-0" />
                  <p className="text-sm font-semibold hidden md:block">
                    Admin Access
                  </p>
                </div>
              </div>
              {activeAdminPage === "dashboard" && <Dashboard />}
              {activeAdminPage === "students-page" && <StudentsPage />}
              {activeAdminPage === "library" && <Library />}
            </main>
          </div>
        </>
      </StudentProvider>
    </AdminGuard>
  );
}
