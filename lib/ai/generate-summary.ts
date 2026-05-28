import { AuditResult } from "@/types/audit";

export function generateSummary(
  result: AuditResult
) {
  const monthlySavings =
    result.totalMonthlySavings;

  const yearlySavings =
    result.totalYearlySavings;

  const recommendationCount =
    result.recommendations.length;

  let riskLevel =
    "moderate";

  if (
    monthlySavings >= 1000
  ) {
    riskLevel = "high";
  }

  if (
    monthlySavings < 200
  ) {
    riskLevel = "low";
  }

  let overview =
    "";

  if (
    riskLevel === "high"
  ) {
    overview =
      "Your organization appears significantly overprovisioned on enterprise-tier AI subscriptions. Several tools show strong opportunities for consolidation, seat optimization, and plan reduction.";
  } else if (
    riskLevel ===
    "moderate"
  ) {
    overview =
      "Your AI tooling stack shows moderate optimization opportunities. Some subscriptions appear larger than current operational requirements.";
  } else {
    overview =
      "Current AI spending appears relatively efficient based on the provided usage profile and team structure.";
  }

  return {
    overview,

    riskLevel,

    recommendationCount,

    monthlySavings,

    yearlySavings,
  };
}