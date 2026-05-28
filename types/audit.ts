export type AuditRecommendation =
  {
    tool: string;

    currentPlan: string;

    recommendedPlan: string;

    currentMonthlyCost: number;

    optimizedMonthlyCost: number;

    monthlySavings: number;

    yearlySavings: number;

    severity:
      | "low"
      | "medium"
      | "high";

    confidence: string;

    reason: string;
  };

export type AuditResult = {
  totalMonthlySavings: number;

  totalYearlySavings: number;

  currentSpend: number;

  optimizedSpend: number;

  recommendations:
    AuditRecommendation[];

  aiSummary?: string;
};
export type AuditInput = {
  teamSize: number;

  primaryUseCase: string;

  tools: {
    tool: string;

    plan: string;

    monthlySpend: number;

    seats: number;
  }[];
};
export type ToolPricing = {
  tool: string;

  category?: string;

  plans: {
    name: string;

    monthlyPrice: number;

    recommendedMinSeats?: number;

    recommendedMaxSeats?: number;
  }[];
};