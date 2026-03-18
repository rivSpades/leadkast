import Link from "next/link";
import { Plus, Play, Pause, BarChart2, DollarSign, Users, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const campaigns = [
  {
    id: "1",
    name: "Spring Recruitment Push",
    status: "active",
    budget: "$50/day",
    spend: "$374",
    leads: 81,
    cpl: "$4.62",
    started: "Mar 4, 2026",
    creative: "Opportunity Knock #1",
    region: "National",
  },
  {
    id: "2",
    name: "Northeast Q1 Drive",
    status: "active",
    budget: "$30/day",
    spend: "$210",
    leads: 47,
    cpl: "$4.47",
    started: "Mar 10, 2026",
    creative: "Lifestyle Hook Static",
    region: "Northeast",
  },
  {
    id: "3",
    name: "Weekend Blitz",
    status: "paused",
    budget: "$25/day",
    spend: "$150",
    leads: 28,
    cpl: "$5.36",
    started: "Mar 1, 2026",
    creative: "Weekend Story Ad",
    region: "Southeast",
  },
  {
    id: "4",
    name: "February Test Campaign",
    status: "ended",
    budget: "$20/day",
    spend: "$560",
    leads: 112,
    cpl: "$5.00",
    started: "Feb 1, 2026",
    creative: "Earnings Proof Carousel",
    region: "National",
  },
];

const statusBadge = (status: string) => {
  if (status === "active") return <Badge variant="success">● Active</Badge>;
  if (status === "paused") return <Badge variant="warning">⏸ Paused</Badge>;
  return <Badge variant="secondary">Ended</Badge>;
};

export default function CampaignsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-sm text-[#8080A0] mt-1">
            {campaigns.filter((c) => c.status === "active").length} active · managed via Meta Ads
          </p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Aggregate stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Spend", value: "$1,294", icon: DollarSign },
          { label: "Total Leads", value: "268", icon: Users },
          { label: "Avg CPL", value: "$4.83", icon: TrendingDown },
          { label: "Active Budgets", value: "$80/day", icon: BarChart2 },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8080A0]">{s.label}</span>
                <s.icon className="h-4 w-4 text-[#E94560]" />
              </div>
              <div className="font-display text-xl font-bold text-white">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign list */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a4a]">
                  {["Campaign", "Status", "Budget", "Spend", "Leads", "CPL", "Started", ""].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-[#5a5a7a] uppercase tracking-wider px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`${i < campaigns.length - 1 ? "border-b border-[#2a2a4a]" : ""} hover:bg-[#16213E]/50 transition-colors`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{c.name}</div>
                        <div className="text-xs text-[#5a5a7a]">{c.creative} · {c.region}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{statusBadge(c.status)}</td>
                    <td className="px-4 py-4 text-sm text-[#C0C0D0]">{c.budget}</td>
                    <td className="px-4 py-4 text-sm text-[#C0C0D0]">{c.spend}</td>
                    <td className="px-4 py-4 text-sm text-[#C0C0D0]">{c.leads}</td>
                    <td className="px-4 py-4 text-sm font-medium text-emerald-400">{c.cpl}</td>
                    <td className="px-4 py-4 text-sm text-[#5a5a7a]">{c.started}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {c.status === "active" ? (
                          <Button variant="secondary" size="icon" className="h-7 w-7">
                            <Pause className="h-3 w-3" />
                          </Button>
                        ) : c.status === "paused" ? (
                          <Button variant="secondary" size="icon" className="h-7 w-7">
                            <Play className="h-3 w-3" />
                          </Button>
                        ) : null}
                        <Link href={`/dashboard/reporting?campaign=${c.id}`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <BarChart2 className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Empty state if no campaigns */}
      {campaigns.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-[#2a2a4a]">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="font-display text-lg font-semibold text-white mb-2">No campaigns yet</h3>
          <p className="text-sm text-[#8080A0] mb-6 max-w-xs">
            Launch your first systematic recruitment campaign using our 6-step wizard.
          </p>
          <Link href="/dashboard/campaigns/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Launch First Campaign
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
