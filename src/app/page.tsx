import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  ChevronRight,
  DollarSign,
  Image,
  Megaphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: LayoutDashboardIcon,
    title: "Command Center Dashboard",
    description:
      "Live KPIs at a glance — ad spend, cost-per-lead, total leads, contracts sent, and cost-per-contract. One screen, every number that matters.",
  },
  {
    icon: Users,
    title: "Lead Pipeline Board",
    description:
      "Kanban-style drag-and-drop pipeline: New Lead → DM Sent → Typeform Completed → Call Booked → Contract Sent → Signed.",
  },
  {
    icon: Image,
    title: "Ad Creative Library",
    description:
      "Download tested, high-performing creatives tagged by format, region, and performance tier. No design work required.",
  },
  {
    icon: Megaphone,
    title: "Campaign Setup Wizard",
    description:
      "6-step guided flow to launch Meta ads even if you've never run a single campaign. Guardrails included.",
  },
  {
    icon: BarChart2,
    title: "ROI Reporting",
    description:
      "Spend-vs-leads charts, CPL trends, exportable PDF reports. Know your exact return on every dollar spent.",
  },
  {
    icon: Zap,
    title: "Automation Layer",
    description:
      "ManyChat DM bots, Typeform lead capture, and Zapier integrations handle follow-up automatically.",
  },
];

function LayoutDashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

const steps = [
  { num: "01", title: "Connect Your Meta Account", desc: "Link your Facebook/Meta Business account in under 2 minutes." },
  { num: "02", title: "Pick a Tested Creative", desc: "Choose from our library of performance-proven ad creatives." },
  { num: "03", title: "Launch with the Wizard", desc: "Our 6-step wizard sets targeting, budget, and copy — no guesswork." },
  { num: "04", title: "Automate Follow-Up", desc: "ManyChat bots handle DMs and Typeform captures lead data automatically." },
  { num: "05", title: "Track & Close", desc: "Move leads through the Kanban pipeline from new lead to signed contract." },
];

const stats = [
  { label: "Avg. leads per $1k spent", value: "81+" },
  { label: "Avg. cost-per-lead", value: "$4.62" },
  { label: "Avg. contracts from 81 leads", value: "3–5" },
  { label: "Time to first lead", value: "< 48h" },
];

const pricingTiers = [
  {
    name: "Starter Playbook",
    price: "$297",
    type: "one-time",
    description: "Everything you need to launch your first campaign.",
    features: [
      "Campaign Setup Wizard",
      "10 Ad Creatives",
      "Basic Pipeline Board",
      "Typeform Integration",
      "30-day email support",
    ],
    cta: "Buy Playbook",
    href: "/signup?plan=starter",
    highlighted: false,
  },
  {
    name: "Operator Retainer",
    price: "$997",
    type: "/month",
    description: "Done-with-you management for serious operators.",
    features: [
      "Everything in Starter",
      "Full Creative Library Access",
      "ManyChat Bot Setup",
      "Weekly Performance Reports",
      "Meta Ads Account Audit",
      "Priority Slack Support",
      "Monthly Strategy Call",
    ],
    cta: "Start Retainer",
    href: "/signup?plan=retainer",
    highlighted: true,
  },
  {
    name: "Agency White-Label",
    price: "Custom",
    type: "",
    description: "For agencies managing multiple franchise operators.",
    features: [
      "Everything in Retainer",
      "Multi-operator Dashboard",
      "Custom Branding",
      "Bulk Campaign Management",
      "API Access",
      "Dedicated Account Manager",
    ],
    cta: "Contact Us",
    href: "mailto:hello@leadkast.com",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E94560]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <Badge className="mb-6 bg-[#E94560]/10 text-[#E94560] border-[#E94560]/20 text-sm px-4 py-1">
            Tested. Systematic. Results-driven.
          </Badge>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Turn $374 in ad spend into{" "}
            <span className="gradient-text">3 signed contracts</span>{" "}
            in 2 weeks.
          </h1>

          <p className="text-xl text-[#8080A0] max-w-2xl mx-auto mb-10 leading-relaxed">
            LeadKast is the systematic recruitment engine built for franchise operators.
            Stop guessing on Meta ads. Start using a model that&apos;s already proven to
            generate leads at sub-$5 CPL.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="xl" className="gap-2 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button size="xl" variant="outline" className="gap-2 w-full sm:w-auto">
                See How It Works
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-[#5a5a7a]">
            No credit card required. Set up in under 10 minutes.
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto max-w-5xl mt-16">
          <div className="rounded-xl border border-[#2a2a4a] bg-[#0F0F1A] p-1 shadow-2xl">
            <div className="rounded-lg bg-[#16213E] p-6">
              {/* Mock dashboard stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Leads", value: "81", change: "+12%", icon: Users },
                  { label: "Ad Spend", value: "$374", change: "This week", icon: DollarSign },
                  { label: "Cost / Lead", value: "$4.62", change: "-8%", icon: TrendingUp },
                  { label: "Contracts", value: "3", change: "Signed", icon: CheckCircle },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-[#1A1A2E] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#8080A0]">{stat.label}</span>
                      <stat.icon className="h-4 w-4 text-[#E94560]" />
                    </div>
                    <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-emerald-400 mt-1">{stat.change}</div>
                  </div>
                ))}
              </div>
              {/* Mock pipeline stages */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["New Lead (23)", "DM Sent (18)", "Form Done (15)", "Call Booked (12)", "Contract Sent (8)", "Signed (3)"].map((stage) => (
                  <div key={stage} className="shrink-0 rounded-lg bg-[#1A1A2E] border border-[#2a2a4a] px-4 py-2">
                    <span className="text-xs text-[#C0C0D0] whitespace-nowrap">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Stats bar */}
      <section id="results" className="border-y border-[#2a2a4a] bg-[#0F0F1A] py-10 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[#E94560]">{s.value}</div>
              <div className="mt-1 text-sm text-[#8080A0]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20">Platform Features</Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything you need.<br />Nothing you don&apos;t.
            </h2>
            <p className="text-lg text-[#8080A0] max-w-2xl mx-auto">
              LeadKast is purpose-built for franchise operators running paid recruitment campaigns.
              Every feature exists to lower your CPL and increase signed contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:border-[#E94560]/40 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#E94560]/10">
                    <feature.icon className="h-6 w-6 text-[#E94560]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#8080A0] leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-[#0F0F1A]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E94560]/10 text-[#E94560] border-[#E94560]/20">Process</Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              From zero to signed contracts<br />in under 2 weeks
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E94560] to-[#F5A623] hidden md:block" />

            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-6 items-start">
                  <div className="shrink-0 relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#E94560] bg-[#1A1A2E] font-display font-bold text-[#E94560]">
                    {step.num}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display text-xl font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-[#8080A0]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof quote */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-2xl sm:text-3xl font-bold text-white leading-relaxed">
            &ldquo;81 leads. 3 signed contracts. $374 spent. 2 weeks.
            <span className="gradient-text"> This is what a tested model recruitment system looks like.</span>&rdquo;
          </blockquote>
          <p className="mt-6 text-[#8080A0]">— LeadKast Operator, Q1 2026</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[#0F0F1A]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20">Pricing</Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#8080A0]">
              One-time playbook purchase or a monthly retainer. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-[#E94560] bg-[#E94560]/5"
                    : "border-[#2a2a4a] bg-[#16213E]"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#E94560] text-white border-0 px-4">Most Popular</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="font-display text-4xl font-bold text-white">{tier.price}</span>
                    {tier.type && <span className="text-[#8080A0] mb-1">{tier.type}</span>}
                  </div>
                  <p className="text-sm text-[#8080A0]">{tier.description}</p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#C0C0D0]">
                      <CheckCircle className="h-4 w-4 text-[#E94560] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={tier.href}>
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to build a{" "}
            <span className="gradient-text">systematic pipeline?</span>
          </h2>
          <p className="text-xl text-[#8080A0] mb-10">
            Stop wasting ad budget on guesswork. LeadKast operators know their CPL,
            their conversion rate, and their next move — before the week starts.
          </p>
          <Link href="/signup">
            <Button size="xl" className="gap-2">
              Start Free Today
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
