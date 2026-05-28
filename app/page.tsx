import { Navbar } from "@/components/layout/navbar";

import { AuditForm } from "@/components/forms/audit-form";

import { AuditResults } from "@/components/audit/audit-results";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-40 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-xl">
          AI Spend Optimization Platform
        </div>

        <h1 className="max-w-6xl text-6xl font-semibold leading-[1] tracking-tight md:text-8xl">
          Stop burning money
          <br />
          on AI subscriptions.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
          Audit ChatGPT, Claude, Cursor, Copilot,
          Gemini, and API spend in minutes.
          Identify oversized plans, redundant seats,
          and hidden optimization opportunities.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#audit-form"
            className="rounded-2xl bg-white px-8 py-4 text-sm font-medium text-black transition duration-200 hover:scale-[1.02] hover:opacity-90"
          >
            Audit My AI Spend
          </a>

          <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10">
            View Sample Audit
          </button>
        </div>

        <div className="mt-24 grid w-full gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-semibold">
              $1,240
            </h3>

            <p className="mt-3 text-sm text-white/60">
              Average monthly savings identified
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-semibold">
              8+
            </h3>

            <p className="mt-3 text-sm text-white/60">
              Supported AI vendors
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <h3 className="text-5xl font-semibold">
              5 min
            </h3>

            <p className="mt-3 text-sm text-white/60">
              Average audit completion time
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <AuditForm />
      </div>

      <div className="relative z-10">
        <AuditResults />
      </div>
    </main>
  );
}