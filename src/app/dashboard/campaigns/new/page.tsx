"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const STEPS = [
  { num: 1, title: "Name Your Campaign", desc: "Give this campaign a recognizable name." },
  { num: 2, title: "Choose a Creative", desc: "Pick from our tested ad creatives." },
  { num: 3, title: "Set Your Audience", desc: "Define who sees your ad." },
  { num: 4, title: "Set Budget & Schedule", desc: "How much per day and for how long." },
  { num: 5, title: "Review Lead Flow", desc: "Confirm your Typeform + ManyChat setup." },
  { num: 6, title: "Review & Launch", desc: "One final check before going live." },
];

const CREATIVES = [
  { id: "1", name: "Opportunity Knock #1", format: "Video", cpl: "$3.12", tier: "A" },
  { id: "2", name: "Lifestyle Hook Static", format: "Static", cpl: "$4.08", tier: "A" },
  { id: "3", name: "Earnings Proof Carousel", format: "Carousel", cpl: "$4.55", tier: "A" },
  { id: "7", name: "Flexibility Focus", format: "Video", cpl: "$3.89", tier: "A" },
];

const AUDIENCES = [
  { id: "broad", label: "Broad (18–45, all interests)", desc: "Best for cold audiences with no prior data." },
  { id: "lookalike", label: "Lookalike (1% from past leads)", desc: "Recommended if you have existing lead data." },
  { id: "retarget", label: "Retargeting (page visitors)", desc: "Warm audience — best CPL but smaller scale." },
  { id: "custom", label: "Custom audience upload", desc: "Upload a CSV of contacts to target." },
];

interface FormData {
  name: string;
  creative: string;
  audience: string;
  dailyBudget: string;
  duration: string;
  typeformUrl: string;
  manychatEnabled: boolean;
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [launching, setLaunching] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    creative: "",
    audience: "broad",
    dailyBudget: "25",
    duration: "14",
    typeformUrl: "",
    manychatEnabled: true,
  });

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  function canAdvance() {
    if (step === 1) return form.name.trim().length > 0;
    if (step === 2) return form.creative !== "";
    if (step === 3) return form.audience !== "";
    if (step === 4) return Number(form.dailyBudget) >= 5;
    if (step === 5) return true;
    return true;
  }

  async function handleLaunch() {
    setLaunching(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard/campaigns");
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-1">Campaign Setup Wizard</h1>
        <p className="text-sm text-[#8080A0]">Step {step} of {STEPS.length} — {STEPS[step - 1].title}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <Progress value={progress} className="h-1.5" />
        <div className="flex justify-between mt-3">
          {STEPS.map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  s.num < step
                    ? "bg-emerald-500 text-white"
                    : s.num === step
                    ? "bg-[#E94560] text-white"
                    : "bg-[#16213E] text-[#5a5a7a] border border-[#2a2a4a]"
                }`}
              >
                {s.num < step ? <CheckCircle className="h-4 w-4" /> : s.num}
              </div>
              <span className={`text-xs hidden sm:block ${s.num === step ? "text-[#E94560]" : "text-[#5a5a7a]"}`}>
                {s.title.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-[#2a2a4a] bg-[#16213E] p-8 mb-6">
        <h2 className="font-display text-xl font-bold text-white mb-1">{STEPS[step - 1].title}</h2>
        <p className="text-sm text-[#8080A0] mb-6">{STEPS[step - 1].desc}</p>

        {/* Step 1: Campaign name */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign name</Label>
              <Input
                id="campaign-name"
                placeholder="e.g. Spring Recruitment Push"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoFocus
              />
            </div>
            <p className="text-xs text-[#5a5a7a]">
              Choose a name that identifies the time period, region, or strategy.
            </p>
          </div>
        )}

        {/* Step 2: Creative selection */}
        {step === 2 && (
          <div className="space-y-3">
            {CREATIVES.map((c) => (
              <label
                key={c.id}
                className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                  form.creative === c.id
                    ? "border-[#E94560] bg-[#E94560]/5"
                    : "border-[#2a2a4a] hover:border-[#E94560]/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="creative"
                    value={c.id}
                    checked={form.creative === c.id}
                    onChange={() => setForm({ ...form, creative: c.id })}
                    className="accent-[#E94560]"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{c.name}</div>
                    <div className="text-xs text-[#8080A0]">{c.format} · Tier {c.tier}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-emerald-400">{c.cpl} CPL</div>
              </label>
            ))}
            <p className="text-xs text-[#5a5a7a] pt-1">
              Tier A creatives have the lowest average CPL in our library.
            </p>
          </div>
        )}

        {/* Step 3: Audience */}
        {step === 3 && (
          <div className="space-y-3">
            {AUDIENCES.map((a) => (
              <label
                key={a.id}
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                  form.audience === a.id
                    ? "border-[#E94560] bg-[#E94560]/5"
                    : "border-[#2a2a4a] hover:border-[#E94560]/30"
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value={a.id}
                  checked={form.audience === a.id}
                  onChange={() => setForm({ ...form, audience: a.id })}
                  className="accent-[#E94560] mt-0.5"
                />
                <div>
                  <div className="text-sm font-medium text-white">{a.label}</div>
                  <div className="text-xs text-[#8080A0] mt-0.5">{a.desc}</div>
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="budget">Daily budget (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a7a]">$</span>
                <Input
                  id="budget"
                  type="number"
                  min="5"
                  placeholder="25"
                  value={form.dailyBudget}
                  onChange={(e) => setForm({ ...form, dailyBudget: e.target.value })}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-[#5a5a7a]">Minimum $5/day. Recommended: $25–$50/day to start.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Campaign duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                placeholder="14"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
              <p className="text-xs text-[#5a5a7a]">Minimum 7 days recommended for the algorithm to optimize.</p>
            </div>

            {form.dailyBudget && form.duration && (
              <div className="rounded-lg bg-[#0F0F1A] border border-[#2a2a4a] p-4">
                <div className="text-sm text-[#8080A0] mb-1">Estimated total spend</div>
                <div className="font-display text-2xl font-bold text-white">
                  ${(Number(form.dailyBudget) * Number(form.duration)).toLocaleString()}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  ~{Math.round((Number(form.dailyBudget) * Number(form.duration)) / 4.62)} leads at $4.62 avg CPL
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Lead flow */}
        {step === 5 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="typeform">Typeform URL (your lead capture form)</Label>
              <Input
                id="typeform"
                type="url"
                placeholder="https://yourform.typeform.com/to/xxxxx"
                value={form.typeformUrl}
                onChange={(e) => setForm({ ...form, typeformUrl: e.target.value })}
              />
              <p className="text-xs text-[#5a5a7a]">
                Paste your Typeform link. Leads who click your ad will be directed here.
              </p>
            </div>

            <div className="rounded-lg border border-[#2a2a4a] p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-white">ManyChat DM Bot</div>
                  <div className="text-xs text-[#8080A0]">Auto-send DM to every new lead on Instagram/Facebook</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.manychatEnabled}
                    onChange={(e) => setForm({ ...form, manychatEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#2a2a4a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E94560]"></div>
                </label>
              </div>
              {form.manychatEnabled && (
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  ManyChat bot will auto-DM all leads within 30 seconds
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 6: Review */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-[#0F0F1A] border border-[#2a2a4a] divide-y divide-[#2a2a4a]">
              {[
                { label: "Campaign Name", value: form.name },
                { label: "Creative", value: CREATIVES.find((c) => c.id === form.creative)?.name || "—" },
                { label: "Audience", value: AUDIENCES.find((a) => a.id === form.audience)?.label || "—" },
                { label: "Daily Budget", value: `$${form.dailyBudget}/day` },
                { label: "Duration", value: `${form.duration} days` },
                { label: "Est. Total Spend", value: `$${(Number(form.dailyBudget) * Number(form.duration)).toLocaleString()}` },
                { label: "Typeform", value: form.typeformUrl || "Not set" },
                { label: "ManyChat DM Bot", value: form.manychatEnabled ? "Enabled ✓" : "Disabled" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-[#8080A0]">{row.label}</span>
                  <span className="text-sm text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#F5A623]/30 bg-[#F5A623]/5 px-4 py-3">
              <p className="text-xs text-[#F5A623]">
                <strong>Note:</strong> Campaign will be submitted to your connected Meta Ads account.
                Review Meta&apos;s policies before launching.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => step > 1 ? setStep(step - 1) : router.back()}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {step === 1 ? "Cancel" : "Back"}
        </Button>

        {step < STEPS.length ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance()}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleLaunch}
            disabled={launching}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {launching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Launching...
              </>
            ) : (
              "Launch Campaign 🚀"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
