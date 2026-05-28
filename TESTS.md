\# TESTS



\# Test Coverage Overview



The audit engine was tested using deterministic pricing scenarios to validate:



\* savings calculations

\* downgrade recommendations

\* severity classification

\* edge cases

\* unsupported tool handling



\---



\# Automated Tests



\## 1. Enterprise Downgrade Detection



\### File



```txt id="yo0p4x"

tests/audit-engine.test.ts

```



\### Covers



\* detects oversized enterprise plans

\* recommends lower-cost alternatives

\* calculates savings correctly



\### Example



```txt id="j9xd9i"

ChatGPT Enterprise → Team for 5 seats

```



\---



\## 2. No Savings Scenario



\### Covers



\* ensures no fake recommendations are generated

\* validates already-optimized plans



\### Example



```txt id="5uc8hf"

ChatGPT Plus for 1 seat

```



\---



\## 3. Unsupported Tool Handling



\### Covers



\* unknown tools do not crash audit engine

\* invalid pricing safely ignored



\### Example



```txt id="0q58t4"

Custom vendor not present in pricing database

```



\---



\## 4. Severity Classification



\### Covers



\* low / medium / high severity assignment



\### Example



```txt id="n4t58x"

Large enterprise overspend flagged as high severity

```



\---



\## 5. Annual Savings Calculation



\### Covers



\* verifies yearly savings = monthly savings × 12



\### Example



```txt id="q80t6l"

$100 monthly savings → $1200 yearly savings

```



\---



\# Running Tests



Install dependencies:



```bash id="jppxul"

npm install

```



Run tests:



```bash id="pd0x7l"

npm test

```



\---



\# Planned Future Tests



\* API failure handling

\* PDF export validation

\* Supabase persistence integration

\* shareable URL rendering

\* rate limiting behavior

\* accessibility testing



\---



\# Testing Philosophy



The pricing engine uses deterministic business logic.



Because the audit results directly affect financial recommendations, tests prioritize:



\* reproducibility

\* explainability

\* numerical consistency



rather than probabilistic AI-generated outputs.



