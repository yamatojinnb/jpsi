import Link from "next/link";

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-16 text-center text-white">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          We&apos;ll Be Back Soon
        </h1>
        <p className="text-lg text-slate-300">
          Our site is undergoing scheduled maintenance. We&apos;re working hard
          to bring everything back online as quickly as possible. Thank you for
          your patience.
        </p>
        <p className="text-sm text-slate-500">
          If you need immediate assistance, please contact us at{" "}
          <a
            className="font-medium text-sky-400 hover:text-sky-300"
            href="mailto:info@worldinvestmentcup.com"
          >
            info@worldinvestmentcup.com
          </a>
          .
        </p>
        <Link
          href="https://www.worldinvestmentcup.com"
          className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Visit our global site
        </Link>
      </div>
    </main>
  );
}
