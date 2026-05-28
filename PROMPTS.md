\# PROMPTS



\# AI Summary Prompt



The application uses Groq LLM inference to generate personalized audit summaries.



The prompt is intentionally constrained to:



\* summarization

\* optimization commentary

\* recommendation framing



The AI is NOT responsible for pricing calculations.



Financial calculations are handled entirely through deterministic rule-based logic.



\---



\# Full Prompt



```txt id="rqg1nx"

You are an elite AI SaaS optimization consultant.



Analyze this AI tooling stack.



Provide:

1\. Executive Summary

2\. Optimization Opportunities

3\. Cost Reduction Ideas

4\. Overspending Risks

5\. Strategic Recommendations



TEAM SIZE:

{teamSize}



PRIMARY USE CASE:

{primaryUseCase}



TOOLS:

{tools}

```



\---



\# System Prompt



```txt id="0wt9s5"

You are a world-class AI spend optimization consultant.

```



\---



\# Why This Prompt Was Written This Way



The prompt intentionally:



\* frames the model as a financial optimization consultant

\* encourages concise business-oriented recommendations

\* avoids generic AI assistant tone

\* focuses on operational efficiency and cost reduction



The structure improves consistency across generated summaries while still allowing personalized responses.



\---



\# What I Tried That Did Not Work



\## 1. Fully AI-generated audit calculations



Initially I experimented with asking the model to:



\* estimate overspending

\* calculate savings

\* recommend alternative plans



This produced inconsistent outputs and occasional hallucinated pricing.



Because the assignment emphasized defensible financial reasoning, I moved all calculations into deterministic rule-based logic.



\---



\## 2. Longer prompts with excessive context



Longer prompts containing:



\* vendor descriptions

\* pricing tables

\* feature explanations



caused slower responses and less focused summaries.



Reducing the prompt to core audit information improved:



\* response quality

\* consistency

\* latency



\---



\# Failure Handling



If the AI provider fails:



\* the app falls back to deterministic audit recommendations

\* the audit report still renders correctly

\* the user still receives actionable savings information



This prevents the AI layer from blocking the core product experience.



\---



\# Why Groq Was Used



Groq was selected because:



\* free-tier access was available

\* inference latency was extremely low

\* API compatibility with OpenAI SDK simplified integration



The implementation remains portable and could later migrate to:



\* Anthropic

\* OpenAI

\* Together AI

\* Fireworks AI



with minimal changes.



