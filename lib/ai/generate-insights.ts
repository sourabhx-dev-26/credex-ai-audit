type Props = {
  teamSize: number;

  primaryUseCase: string;

  tools: {
    toolName: string;
    plan: string;
    monthlyCost: number;
    seats: number;
  }[];
};

export async function generateInsights(
  input: Props
) {
  try {
    const response =
      await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          },

          body: JSON.stringify({
            model:
              "llama-3.3-70b-versatile",

            messages: [
              {
                role: "system",

                content:
                  "You are a world-class AI spend optimization consultant.",
              },

              {
                role: "user",

                content: `
You are an elite AI SaaS optimization consultant.

Analyze this organization's AI tooling stack.

Provide:
1. Executive Summary
2. Optimization Opportunities
3. Cost Reduction Ideas
4. Overspending Risks
5. Strategic Recommendations

TEAM SIZE:
${input.teamSize}

PRIMARY USE CASE:
${input.primaryUseCase}

TOOLS:
${JSON.stringify(
                  input.tools,
                  null,
                  2
                )}
`,
              },
            ],

            temperature: 0.7,
          }),
        }
      );

    const data =
      await response.json();

    return (
      data.choices?.[0]
        ?.message?.content ||
      "No AI insights generated."
    );
  } catch (error) {
    console.error(
      "Groq Error:",
      error
    );

    return "AI insights could not be generated.";
  }
}