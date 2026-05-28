"use client";

type Props = {
  current: number;

  optimized: number;

  savings: number;
};

export function SavingsChart({
  current,
 optimized,
  savings,
}: Props) {
  const maxValue = Math.max(
    current,
    optimized,
    savings
  );

  const getWidth = (
    value: number
  ) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
      <div className="absolute left-[-10%] top-[-10%] h-[250px] w-[250px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 space-y-8">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">
                Current Spend
              </p>

              <h3 className="text-3xl font-semibold text-white">
                ${current}
              </h3>
            </div>

            <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
              Active Cost
            </div>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              style={{
                width:
                  getWidth(
                    current
                  ),
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">
                Optimized Spend
              </p>

              <h3 className="text-3xl font-semibold text-white">
                ${optimized}
              </h3>
            </div>

            <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              Reduced Cost
            </div>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              style={{
                width:
                  getWidth(
                    optimized
                  ),
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">
                Estimated Savings
              </p>

              <h3 className="text-3xl font-semibold text-white">
                ${savings}
              </h3>
            </div>

            <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm text-green-300">
              Opportunity
            </div>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
              style={{
                width:
                  getWidth(
                    savings
                  ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}