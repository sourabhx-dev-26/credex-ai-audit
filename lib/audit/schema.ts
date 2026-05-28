import { z } from "zod";

export const toolInputSchema = z.object({
  tool: z.string(),

  plan: z.string(),

  monthlySpend: z
    .number()
    .min(0),

  seats: z
    .number()
    .min(1),
});

export const auditFormSchema =
  z.object({
    teamSize: z
      .number()
      .min(1),

    primaryUseCase: z.enum([
      "coding",
      "writing",
      "research",
      "data",
      "mixed",
    ]),

    tools: z
      .array(toolInputSchema)
      .min(1),
  });

export type AuditFormSchema =
  z.infer<
    typeof auditFormSchema
  >;