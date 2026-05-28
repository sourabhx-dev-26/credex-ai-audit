import Link from "next/link";

import {
  ArrowLeft,
  Share2,
} from "lucide-react";

import { supabase } from "@/lib/db/supabase";

import { DownloadPdfButton } from "@/components/pdf/download-pdf-button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuditPage({
  params,
}: Props) {
  const { id } =
    await params;

  const { data } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Audit not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />

            Back
          </Link>

          <div className="flex items-center gap-3">
            <DownloadPdfButton
              audit={data}
            />

            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:bg-white/[0.06]">
              <Share2 className="h-4 w-4" />

              Share Report
            </button>
          </div>
        </nav>

        <div className="mb-12">
          <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            AI Spend Audit Report
          </div>

          <h1 className="text-6xl font-semibold tracking-tight">
            Executive Summary
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Your organization appears
            to have significant AI
            tooling optimization
            opportunities across seat
            allocation, plan selection,
            and vendor overlap.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
            <p className="text-sm text-white/50">
              Team Size
            </p>

            <h2 className="mt-4 text-5xl font-semibold">
              {data.team_size}
            </h2>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
            <p className="text-sm text-white/50">
              Monthly Savings
            </p>

            <h2 className="mt-4 text-5xl font-semibold text-emerald-400">
              $
              {
                data.total_monthly_savings
              }
            </h2>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
            <p className="text-sm text-white/50">
              Yearly Savings
            </p>

            <h2 className="mt-4 text-5xl font-semibold text-cyan-300">
              $
              {
                data.total_yearly_savings
              }
            </h2>
          </div>
        </div>

        <section className="mt-14">
          <div className="mb-8">
            <h3 className="text-3xl font-semibold">
              Optimization Insights
            </h3>

            <p className="mt-3 text-white/50">
              Recommendations generated
              from your current AI
              tooling stack.
            </p>
          </div>

          <div className="space-y-6">
            {data.recommendations.map(
              (
                rec: any,
                index: number
              ) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-3xl font-semibold">
                        {rec.tool}
                      </h4>

                      <p className="mt-3 max-w-2xl text-white/60">
                        {rec.reason}
                      </p>
                    </div>

                    <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                      {rec.severity}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm text-white/50">
                        Current
                      </p>

                      <h5 className="mt-2 text-xl font-medium">
                        {
                          rec.currentPlan
                        }
                      </h5>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm text-white/50">
                        Recommended
                      </p>

                      <h5 className="mt-2 text-xl font-medium">
                        {
                          rec.recommendedPlan
                        }
                      </h5>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm text-white/50">
                        Confidence
                      </p>

                      <h5 className="mt-2 text-xl font-medium">
                        {
                          rec.confidence
                        }
                      </h5>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm text-white/50">
                        Savings
                      </p>

                      <h5 className="mt-2 text-xl font-medium text-emerald-400">
                        $
                        {
                          rec.monthlySavings
                        }
                        /mo
                      </h5>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}