"use client";

type Props = {
  overview: string;

  riskLevel: string;

  recommendationCount: number;

  monthlySavings: number;

  yearlySavings: number;
};

export function AISummary({
  overview,

  riskLevel,

  recommendationCount,

  monthlySavings,

  yearlySavings,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
      <div className="absolute left-[-10%] top-[-10%] h-[250px] w-[250px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
          AI Executive Summary
        </div>

        <h3 className="max-w-4xl text-3xl font-semibold leading-tight text-white">
          {overview}
        </h3>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-white/50">
              Risk Level
            </p>

            <h4 className="mt-2 text-2xl font-semibold capitalize text-white">
              {riskLevel}
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-white/50">
              Recommendations
            </p>

            <h4 className="mt-2 text-2xl font-semibold text-white">
              {
                recommendationCount
              }
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-white/50">
              Monthly Savings
            </p>

            <h4 className="mt-2 text-2xl font-semibold text-white">
              $
              {monthlySavings}
            </h4>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-sm text-white/50">
              Yearly Savings
            </p>

            <h4 className="mt-2 text-2xl font-semibold text-white">
              $
              {yearlySavings}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
