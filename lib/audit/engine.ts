import {
  TOOL_PRICING,
} from "@/lib/pricing/pricing-data";

import type {
  AuditInput,
  AuditRecommendation,
  AuditResult,
} from "@/types/audit";

export function generateAudit(
  input: AuditInput
): AuditResult {
  const recommendations: AuditRecommendation[] =
    [];

  for (const item of input.tools) {
    const pricing =
      TOOL_PRICING.find(
        (tool) =>
          tool.tool === item.tool
      );

    if (!pricing) {
      continue;
    }

    let bestPlan =
      pricing.plans[0];

    for (const plan of pricing.plans) {
      const minSeats =
        plan.recommendedMinSeats ??
        0;

      const maxSeats =
        plan.recommendedMaxSeats ??
        Infinity;

      if (
        item.seats >= minSeats &&
        item.seats <= maxSeats
      ) {
        bestPlan = plan;
        break;
      }
    }

    const currentMonthlyCost =
      item.monthlySpend;

    const optimizedMonthlyCost =
      bestPlan.monthlyPrice *
      item.seats;

    const monthlySavings =
      currentMonthlyCost -
      optimizedMonthlyCost;

    if (monthlySavings <= 0) {
      continue;
    }

    const yearlySavings =
      monthlySavings * 12;

    let severity:
      | "low"
      | "medium"
      | "high" = "low";

    if (monthlySavings >= 500) {
      severity = "high";
    } else if (
      monthlySavings >= 150
    ) {
      severity = "medium";
    }

    recommendations.push({
      tool: item.tool,

      currentPlan:
        item.plan,

      recommendedPlan:
        bestPlan.name,

      currentMonthlyCost,

      optimizedMonthlyCost,

      monthlySavings,

      yearlySavings,

      severity,

      confidence:
        "high",

      reason: `${item.plan} appears oversized for ${item.seats} seat(s). ${bestPlan.name} better matches current team usage and reduces unnecessary AI spend.`,
    });
  }

  const totalMonthlySavings =
    recommendations.reduce(
      (
        acc,
        recommendation
      ) =>
        acc +
        recommendation.monthlySavings,
      0
    );

  const totalCurrentSpend =
    input.tools.reduce(
      (acc, item) =>
        acc +
        item.monthlySpend,
      0
    );

  const optimizedSpend =
    totalCurrentSpend -
    totalMonthlySavings;

  return {
    totalMonthlySavings,

    totalYearlySavings:
      totalMonthlySavings * 12,

    currentSpend:
      totalCurrentSpend,

    optimizedSpend,

    recommendations,
  };
}