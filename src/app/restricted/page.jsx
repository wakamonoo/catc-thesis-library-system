import { CiWarning } from "react-icons/ci";

export default function RestrictedPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-brand p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-panel">
        <CiWarning className="text-5xl text-muted" />
      </div>

      <p className="mt-6 text-sm uppercase font-semibold tracking-widest text-accent">
        Unauthorized Network
      </p>

      <h4 className="mt-2 text-2xl font-bold text-normal">Access Denied</h4>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Access outside the school network is restricted. If you believe this is
        an error, contact your school administrator.
      </p>
    </div>
  );
}
