# Open Questions

These questions arose during the initial build. Answers will unblock specific features and copy decisions.

---

## Q1 — What industry does "model recruitment" refer to?
**Context:** The spec uses phrases like "model recruitment system" and "franchise operators." The word "model" is ambiguous — it could refer to:
- Talent/modeling industry (fashion models, brand ambassadors)
- A business model (franchise system)
- A staffing/workforce model (e.g., home services, fitness instructors)

**Impact:** Landing page copy, onboarding flow, ad creative library content and categories, Typeform question templates.

---

## Q2 — What are the exact pricing tiers and amounts?
**Context:** The spec mentions "one-time playbook purchases and recurring retainer subscriptions" but no specific prices.
The build currently uses placeholder pricing: $297 one-time / $997/month / Custom.

**Impact:** Pricing section on landing page, Stripe product/price IDs, checkout flow.

---

## Q3 — What are the Stripe product IDs / Stripe configuration?
**Context:** Stripe integration is listed as required. The build stubs out the payment flow but doesn't wire it to real Stripe products.

**Impact:** `/api/checkout` route, post-payment user provisioning, subscription management.

---

## Q4 — What does the "Campaign Setup Wizard" submit to?
**Context:** The wizard collects campaign details but the spec doesn't clarify whether:
(a) LeadKast directly manages a Meta Ads account via API, or
(b) The wizard generates a brief/spec that the operator then manually sets up in Meta Ads, or
(c) LeadKast staff manually set up the Meta campaign on behalf of the operator.

**Impact:** Step 6 of the wizard, Meta Marketing API integration scope, backend `/api/campaigns` route logic.

---

## Q5 — Is there a multi-tenant / agency tier in scope for V1?
**Context:** The pricing table includes an "Agency White-Label" tier. The spec mentions "multi-operator dashboard" as a feature. This requires significant additional architecture (org/workspace concept, sub-accounts).

**Impact:** Database schema (orgs table), routing, billing model, admin views.

---

## Q6 — What Typeform templates should be pre-loaded?
**Context:** Lead capture uses Typeform. The wizard allows operators to paste a Typeform URL. Should the platform pre-provide a LeadKast-branded Typeform template that operators duplicate?

**Impact:** Onboarding flow, Typeform API integration, lead field mapping.

---

## Q7 — What is the post-signup onboarding flow?
**Context:** After email confirmation, where does a new user land? Should there be an onboarding checklist (connect Meta, set up Typeform, launch first campaign)?

**Impact:** `/dashboard` first-time user experience, onboarding wizard vs. direct dashboard.
