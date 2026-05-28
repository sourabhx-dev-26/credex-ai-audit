"use client";

import { useAuditStore } from "@/store/audit-store";

import { Card } from "@/components/ui/card";

import { SavingsChart } from "@/components/charts/savings-chart";

import { AISummary } from "@/components/audit/ai-summary";

import { generateSummary } from "@/lib/ai/generate-summary";

export function AuditResults() {
  const result =
    useAuditStore(
      (state) => state.result
    );

  if (!result) {
    return null;
  }
   const summary =
  generateSummary(
    result
  );

  return (
    <section className="mx-auto max-w-7xl px-6 pb-32">
      <div className="mb-10">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60">
          Audit Results
        </div>

        <h2 className="text-5xl font-semibold tracking-tight text-white">
          Savings Opportunities Identified
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/60">
          Based on your current AI tooling stack,
          we identified several opportunities
          to reduce unnecessary spend.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="text-sm text-white/60">
            Estimated Monthly Savings
          </p>

          <h3 className="mt-4 text-6xl font-semibold text-white">
            $
            {result.totalMonthlySavings.toFixed(
              0
            )}
          </h3>
        </Card>

        <Card className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="text-sm text-white/60">
            Estimated Yearly Savings
          </p>

          <h3 className="mt-4 text-6xl font-semibold text-white">
            $
            {result.totalYearlySavings.toFixed(
              0
            )}
          </h3>
        </Card>
      </div>
	<div className="mb-10">
  <AISummary
    overview={
      summary.overview
    }
    riskLevel={
      summary.riskLevel
    }
    recommendationCount={
      summary.recommendationCount
    }
    monthlySavings={
      summary.monthlySavings
    }
    yearlySavings={
      summary.yearlySavings
    }
  />
</div>

		<div className="mt-10">
  <Card className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-white">
        Spend Breakdown
      </h3>

      <p className="mt-2 text-white/60">
        Current spend compared to optimized spend projections.
      </p>
    </div>

    <SavingsChart
      current={
        result.totalMonthlySavings +
        result.recommendations.reduce(
          (acc, item) =>
            acc +
            item.optimizedMonthlyCost,
          0
        )
      }
      optimized={result.recommendations.reduce(
        (acc, item) =>
          acc +
          item.optimizedMonthlyCost,
        0
      )}
      savings={
        result.totalMonthlySavings
      }
    />
  </Card>
</div>
      <div className="mt-10 space-y-6">
        {result.recommendations.map(
          (
            recommendation,
            index
          ) => (
            <Card
              key={`${recommendation.tool}-${index}`}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div
                    className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      recommendation.severity ===
                      "high"
                        ? "bg-red-500/10 text-red-300"
                        : recommendation.severity ===
                            "medium"
                          ? "bg-yellow-500/10 text-yellow-300"
                          : "bg-blue-500/10 text-blue-300"
                    }`}
                  >
                    {recommendation.severity.toUpperCase()}{" "}
                    IMPACT
                  </div>

                  <h3 className="text-3xl font-semibold text-white">
                    {recommendation.tool}
                  </h3>

                  <p className="mt-4 leading-8 text-white/60">
                    {recommendation.reason}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                      Current:{" "}
                      {
                        recommendation.currentPlan
                      }
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                      Recommended:{" "}
                      {
                        recommendation.recommendedPlan
                      }
                    </div>

                    <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                      Confidence:{" "}
                      {
                        recommendation.confidence
                      }
                    </div>
                  </div>
                </div>

                <div className="min-w-[260px] rounded-3xl border border-white/10 bg-black/30 p-6">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-white/50">
                        Current Cost
                      </p>

                      <h4 className="mt-2 text-2xl font-semibold text-white">
                        $
                        {recommendation.currentMonthlyCost.toFixed(
                          0
                        )}
                        /mo
                      </h4>
                    </div>

                    <div>
                      <p className="text-sm text-white/50">
                        Optimized Cost
                      </p>

                      <h4 className="mt-2 text-2xl font-semibold text-white">
                        $
                        {recommendation.optimizedMonthlyCost.toFixed(
                          0
                        )}
                        /mo
                      </h4>
                    </div>

                    <div className="border-t border-white/10 pt-5">
                      <p className="text-sm text-white/50">
                        Estimated Savings
                      </p>

                      <h4 className="mt-2 text-4xl font-semibold text-green-300">
                        $
                        {recommendation.monthlySavings.toFixed(
                          0
                        )}
                      </h4>

                      <p className="mt-1 text-sm text-white/40">
                        per month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        )}
      </div>

      {result.totalMonthlySavings >=
      500 ? (
        <Card className="mt-10 rounded-3xl border border-green-500/20 bg-green-500/10 p-8">
          <h3 className="text-3xl font-semibold text-white">
            Significant optimization opportunity detected
          </h3>

          <p className="mt-4 max-w-3xl leading-8 text-white/70">
            Your current AI tooling stack appears substantially
            overprovisioned for current team utilization.
            Credex consultation may help reduce vendor overlap,
            improve seat allocation, and optimize API strategy.
          </p>
        </Card>
      ) : null}

      {result.totalMonthlySavings <
      100 ? (
        <Card className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8">
          <h3 className="text-3xl font-semibold text-white">
            Your AI spend already appears efficient
          </h3>

          <p className="mt-4 max-w-3xl leading-8 text-white/70">
            Current vendor selection and plan allocation
            appear reasonably optimized relative to your
            reported usage profile.
          </p>
        </Card>
      ) : null}
    </section>
  );
}