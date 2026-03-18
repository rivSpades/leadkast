# Architecture spec

The entire platform is a single Next.js 14 monorepo deployed on Vercel, with Supabase (PostgreSQL) as the backend. This keeps the team lean (1–2 developers) and avoids over-engineering.

- Frontend: Next.js with Tailwind CSS and shadcn/ui component library. Static generation for marketing/SEO pages, server-side rendering for the dashboard.
- Backend: Next.js API Routes handle all server logic. Supabase Edge Functions process webhooks from Typeform, ManyChat, and Stripe.
- Database: Supabase PostgreSQL with Row Level Security for multi-tenant data isolation. Core tables: users, subscriptions, leads, campaigns, creatives, funnel_templates, playbook_progress.
- Auth: Supabase Auth (email + Google OAuth), 100K monthly active users included on the $25/mo Pro plan.
- Payments: Stripe for one-time playbook purchases and recurring retainer subscriptions.
- Integrations: Typeform for lead capture forms, ManyChat for DM bot automation, Meta Marketing API for ad performance data, Zapier as middleware for no-code connections, Resend for transactional email.
- Key architecture decision: no separate backend framework, no microservices, no Kubernetes. Everything runs serverless on Vercel + Supabase, keeping infrastructure costs under $200/month at early scale.
