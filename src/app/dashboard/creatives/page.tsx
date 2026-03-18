"use client";

import { useState } from "react";
import { Download, Search, Star, TrendingUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Format = "Video" | "Static" | "Carousel" | "Story";
type Tier = "A" | "B" | "C";
type Region = "National" | "Northeast" | "Southeast" | "Midwest" | "West";

interface Creative {
  id: string;
  title: string;
  format: Format;
  region: Region;
  tier: Tier;
  cpl: string;
  leads: number;
  preview: string;
  description: string;
  tags: string[];
}

const CREATIVES: Creative[] = [
  {
    id: "1",
    title: "Opportunity Knock #1",
    format: "Video",
    region: "National",
    tier: "A",
    cpl: "$3.12",
    leads: 214,
    preview: "🎬",
    description: "30-second testimonial-style video. Highest converting creative in the library.",
    tags: ["testimonial", "urgency", "income-focus"],
  },
  {
    id: "2",
    title: "Lifestyle Hook Static",
    format: "Static",
    region: "National",
    tier: "A",
    cpl: "$4.08",
    leads: 187,
    preview: "🖼️",
    description: "Bold text overlay on lifestyle imagery. Works across all demographics.",
    tags: ["lifestyle", "bold-text", "broad-audience"],
  },
  {
    id: "3",
    title: "Earnings Proof Carousel",
    format: "Carousel",
    region: "National",
    tier: "A",
    cpl: "$4.55",
    leads: 156,
    preview: "📊",
    description: "4-slide carousel showing real earnings data and social proof.",
    tags: ["social-proof", "earnings", "data-driven"],
  },
  {
    id: "4",
    title: "Weekend Story Ad",
    format: "Story",
    region: "Northeast",
    tier: "B",
    cpl: "$5.20",
    leads: 98,
    preview: "📱",
    description: "Vertical story format optimized for mobile-first audience.",
    tags: ["mobile", "vertical", "weekend-launch"],
  },
  {
    id: "5",
    title: "Recruitment Direct",
    format: "Video",
    region: "Southeast",
    tier: "B",
    cpl: "$5.87",
    leads: 89,
    preview: "🎬",
    description: "Direct response video with clear CTA. Best for warm audiences.",
    tags: ["direct-response", "warm-audience", "cta-heavy"],
  },
  {
    id: "6",
    title: "Community Story",
    format: "Static",
    region: "Midwest",
    tier: "B",
    cpl: "$6.14",
    leads: 74,
    preview: "🖼️",
    description: "Community-focused angle with local imagery. Strong in mid-size markets.",
    tags: ["community", "local", "mid-market"],
  },
  {
    id: "7",
    title: "Flexibility Focus",
    format: "Video",
    region: "West",
    tier: "A",
    cpl: "$3.89",
    leads: 142,
    preview: "🎬",
    description: "Targets work-life balance. High resonance in West Coast markets.",
    tags: ["flexibility", "work-life", "west-coast"],
  },
  {
    id: "8",
    title: "Income Proof Story",
    format: "Story",
    region: "National",
    tier: "C",
    cpl: "$8.20",
    leads: 51,
    preview: "📱",
    description: "Income claim format. Use with caution — compliance review required.",
    tags: ["income-claim", "compliance-needed"],
  },
];

const TIER_COLORS: Record<Tier, string> = {
  A: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  B: "bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20",
  C: "bg-[#E94560]/10 text-[#E94560] border-[#E94560]/20",
};

const FORMAT_ICONS: Record<Format, string> = {
  Video: "🎬",
  Static: "🖼️",
  Carousel: "📊",
  Story: "📱",
};

export default function CreativesPage() {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState<Format | "All">("All");
  const [tierFilter, setTierFilter] = useState<Tier | "All">("All");

  const filtered = CREATIVES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.includes(search.toLowerCase()));
    const matchesFormat = formatFilter === "All" || c.format === formatFilter;
    const matchesTier = tierFilter === "All" || c.tier === tierFilter;
    return matchesSearch && matchesFormat && matchesTier;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Ad Creative Library</h1>
          <p className="text-sm text-[#8080A0] mt-1">
            {CREATIVES.length} tested creatives · sorted by performance tier
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a5a7a]" />
          <Input
            placeholder="Search creatives or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Format filter */}
        <div className="flex items-center gap-2">
          {(["All", "Video", "Static", "Carousel", "Story"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormatFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                formatFilter === f
                  ? "bg-[#E94560] text-white"
                  : "bg-[#16213E] text-[#8080A0] hover:text-white border border-[#2a2a4a]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tier filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5a5a7a]">Tier:</span>
          {(["All", "A", "B", "C"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                tierFilter === t
                  ? "bg-[#F5A623] text-[#1A1A2E]"
                  : "bg-[#16213E] text-[#8080A0] hover:text-white border border-[#2a2a4a]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="font-display text-lg font-semibold text-white mb-2">No creatives found</h3>
          <p className="text-sm text-[#8080A0]">Try adjusting your filters or search query.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((creative) => (
          <Card key={creative.id} className="group overflow-hidden hover:border-[#E94560]/40 transition-colors">
            {/* Preview */}
            <div className="relative aspect-video bg-[#0F0F1A] flex items-center justify-center text-5xl border-b border-[#2a2a4a]">
              {creative.preview}
              {creative.format === "Video" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="h-12 w-12 rounded-full bg-[#E94560] flex items-center justify-center">
                    <Play className="h-5 w-5 text-white ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${TIER_COLORS[creative.tier]}`}>
                  {creative.tier === "A" && <Star className="h-3 w-3 mr-1" />}
                  Tier {creative.tier}
                </span>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-white leading-tight">{creative.title}</h3>
                <span className="text-xs text-[#5a5a7a] ml-2 shrink-0">{FORMAT_ICONS[creative.format]}</span>
              </div>

              <p className="text-xs text-[#8080A0] mb-3 leading-relaxed">{creative.description}</p>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">{creative.cpl} CPL</span>
                </div>
                <span className="text-xs text-[#5a5a7a]">{creative.leads} leads</span>
                <Badge variant="secondary" className="text-xs">{creative.region}</Badge>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {creative.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-[#5a5a7a] bg-[#0F0F1A] rounded px-1.5 py-0.5">
                    #{tag}
                  </span>
                ))}
              </div>

              <Button size="sm" className="w-full gap-2">
                <Download className="h-3 w-3" />
                Download Creative
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
