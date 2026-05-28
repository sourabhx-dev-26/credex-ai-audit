import { supabase } from "./supabase";

export async function saveAudit(
  payload: any
) {
  console.log(
    "PAYLOAD:",
    payload
  );

  const response =
    await supabase
      .from("audits")
      .insert([
        {
          team_size:
            Number(
              payload.teamSize
            ),

          primary_use_case:
            payload.primaryUseCase,

          total_monthly_savings:
            Number(
              payload.result
                .totalMonthlySavings
            ),

          total_yearly_savings:
            Number(
              payload.result
                .totalYearlySavings
            ),

          recommendations:
            payload.result
              .recommendations,
        },
      ])
      .select();

  console.log(
    "SUPABASE RESPONSE:",
    response
  );

  return response;
}