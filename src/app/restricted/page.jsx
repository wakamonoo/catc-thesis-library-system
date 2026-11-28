import { CiWarning } from "react-icons/ci";

export default function RestrictedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-16 lg:px-32 xl:px-64">
      <div className="w-full max-w-md rounded-xl border border-panel bg-panel p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-second">
          <CiWarning className="text-4xl text-error shrink-0" />
        </div>

        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Access Restricted
        </p>

        <p className="text-2xl font-bold text-accent">
          School Network Required
        </p>

        <p className="mt-4 text-sm leading-tight text-muted">
          This thesis library is only accessible through the school&apos;s
          network. Please connect to the school&apos;s Wi-Fi or network to
          continue browsing.
        </p>

        <div className="mt-4 rounded-lg bg-second p-4">
          <p className="text-sm text-muted">
            f you believe this is a mistake, please contact your school
            administrator for assistance.
          </p>
        </div>

        <p className="mt-8 text-xs text-muted uppercase tracking-widest text-center">
          CATC Thesis Library System
        </p>
      </div>
    </main>
  );
}
