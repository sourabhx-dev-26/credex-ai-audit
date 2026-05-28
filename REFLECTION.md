\# REFLECTION



\# 1. The hardest bug I hit this week, and how I debugged it



The hardest bug during development involved integrating the Groq API with the frontend application. Initially, I attempted to instantiate the OpenAI SDK directly inside client-side code, which caused runtime credential errors and browser-side security restrictions.



The application repeatedly threw:

“Missing credentials” and “dangerouslyAllowBrowser” related errors.



At first, I assumed the issue was with incorrect API keys or environment variable loading. I verified `.env.local`, restarted the development server multiple times, and tested different key names. After narrowing down the problem, I realized the actual issue was architectural: the SDK was being initialized in a browser-executed component instead of a server-safe environment.



I then redesigned the implementation to safely handle API usage while keeping the frontend responsive. During debugging I used:



\* console tracing

\* runtime stack inspection

\* incremental rollback testing

\* validation of environment variable scope



This bug taught me that integration issues are often caused more by execution context and architecture decisions than syntax mistakes.



\---



\# 2. A decision I reversed mid-week, and what made me reverse it



Initially, I planned to let the AI model calculate all pricing recommendations and savings directly from prompts. The idea seemed attractive because it reduced manual pricing logic.



However, after testing, I noticed several serious issues:



\* hallucinated pricing

\* inconsistent savings estimates

\* non-repeatable outputs

\* vague financial reasoning



Because the assignment emphasized defensible audit logic, I reversed this approach entirely.



I rebuilt the audit engine using deterministic rule-based pricing calculations while limiting AI usage to:



\* executive summaries

\* recommendation framing

\* optimization commentary



This improved reliability significantly and made the audit outputs more trustworthy.



The experience reinforced an important engineering lesson: AI should not replace deterministic systems where correctness and explainability matter.



\---



\# 3. What I would build in week 2 if I had it



If I had another week, I would focus primarily on:



\* benchmarking analytics

\* team utilization tracking

\* deeper SaaS-grade reporting



I would add:



\* CSV billing imports

\* real API usage ingestion

\* organization-level dashboards

\* historical spend tracking

\* usage anomaly detection

\* benchmark comparisons against similar startups



I would also improve:



\* Open Graph previews

\* PDF report design

\* onboarding UX

\* rate limiting and abuse protection



Another important addition would be an embeddable audit widget so founders and bloggers could place the audit directly on external websites.



From a business perspective, I would build a stronger lead qualification layer that identifies companies most likely to benefit from Credex credits.



\---



\# 4. How I used AI tools during development



I used AI tools extensively during development, primarily:



\* ChatGPT

\* Groq-powered LLMs

\* Cursor AI



I used AI for:



\* debugging assistance

\* UI iteration

\* architecture brainstorming

\* TypeScript fixes

\* copywriting support

\* rapid prototyping



However, I intentionally did not trust AI with:



\* financial calculation correctness

\* pricing logic validation

\* architecture finalization

\* deployment assumptions



One specific case where AI was wrong involved savings calculations. An earlier AI-generated implementation multiplied pricing incorrectly because the distinction between per-seat cost and total monthly spend was unclear. The generated logic produced unrealistic savings numbers.



I manually traced the data flow, identified the mismatch, and corrected the audit engine logic.



This reinforced the importance of validating AI-generated outputs rather than blindly accepting them.



\---



\# 5. Self-rating



\## Discipline — 8/10



I maintained steady progress across multiple days and consistently iterated on the project instead of attempting everything at once.



\## Code Quality — 7/10



The architecture is clean for an MVP, but there are areas where testing, abstraction, and backend separation could improve.



\## Design Sense — 8/10



I focused heavily on creating a polished SaaS-style UI with strong visual hierarchy and responsive layouts.



\## Problem Solving — 8/10



Multiple API, runtime, and pricing logic issues required iterative debugging and architectural adjustments.



\## Entrepreneurial Thinking — 7/10



I tried to approach the project as a real lead-generation SaaS product rather than just a coding assignment, though I would validate assumptions further with more user interviews and real usage data.



