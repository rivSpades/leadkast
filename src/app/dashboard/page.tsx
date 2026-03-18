import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  TrendingDown,
  FileSignature,
  Megaphone,
  ArrowRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const kpis = [
  {
    label: "Ad Spend",
    value: "$1,240",
    change: "+12%",
    direction: "up",
    note: "vs last week",
    icon: DollarSign,
    color: "text-[#E94560]",
  },
  {
    label: "Total Leads",
    value: "268",
    change: "+31%",
    direction: "up",
    note: "vs last week",
    icon: Users,
    color: "text-emerald-400",
  },
  {
    label: "Cost / Lead",
    value: "$4.63",
    change: "-8%",
    direction: "down",
    note: "vs last week",
    icon: TrendingDown,
    color: "text-[#F5A623]",
  },
  {
    label: "Contracts Signed",
    value: "9",
    change: "+3",
    direction: "up",
    note: "this month",
    icon: FileSignature,
    color: "text-emerald-400",
  },
  {
    label: "Cost / Contract",
    value: "$137.78",
    change: "-14%",
    direction: "down",
    note: "vs last month",
    icon: Activity,
    color: "text-[#F5A623]",
  },
  {
    label: "Active Campaigns",
    value: "3",
    change: "Running",
    direction: "neutral",
    note: "Meta Ads",
    icon: Megaphone,
    color: "text-[#E94560]",
  },
];

const quickActions = [
  { label: "Launch Campaign", href: "/dashboard/campaigns/new", icon: Megaphone, color: "bg-[#E94560]" },
  { label: "View Pipeline", href: "/dashboard/pipeline", icon: Users, color: "bg-[#F5A623]" },
  { label: "Browse Creatives", href: "/dashboard/creatives", icon: Activity, color: "bg-emerald-500" },
  { label: "View Reports", href: "/dashboard/reporting", icon: TrendingDown, color: "bg-purple-500" },
];

const recentLeads = [
  { name: "Jordan M.", stage: "DM Sent", source: "Meta Ad #3", time: "2m ago" },
  { name: "Casey T.", stage: "Form Completed", source: "Meta Ad #1", time: "14m ago" },
  { name: "Sam R.", stage: "Call Booked", source: "Meta Ad #3", time: "1h ago" },
  { name: "Alex P.", stage: "Contract Sent", source: "Meta Ad #2", time: "3h ago" },
  { name: "Morgan W.", stage: "Signed", source: "Meta Ad #1", time: "5h ago" },
];

const stageColors: Record<string, string> = {
  "DM Sent": "secondary",
  "Form Completed": "warning",
  "Call Booked": "warning",
  "Contract Sent": "default",
  "Signed": "success",
};

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Command Center</h1>
          <p className="text-sm text-[#8080A0] mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button className="gap-2" size="sm">
            <Megaphone className="h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8080A0]">{kpi.label}</span>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <div className="font-display text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="flex items-center gap-1">
                {kpi.direction === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-400" />}
                {kpi.direction === "down" && <ArrowDownRight className="h-3 w-3 text-emerald-400" />}
                <span className={`text-xs ${kpi.direction !== "neutral" ? "text-emerald-400" : "text-[#8080A0]"}`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-[#5a5a7a]">{kpi.note}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-sm font-semibold text-[#8080A0] uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 rounded-lg border border-[#2a2a4a] bg-[#16213E] p-4 hover:border-[#E94560]/40 transition-colors cursor-pointer group">
                <div className={`shrink-0 h-9 w-9 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[#C0C0D0] group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Leads</CardTitle>
            <Link href="/dashboard/pipeline">
              <Button variant="ghost" size="sm" className="gap-1 text-[#8080A0] hover:text-white text-xs">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {recentLeads.map((lead, i) => (
              <div
                key={lead.name}
                className={`flex items-center justify-between px-6 py-3 ${
                  i < recentLeads.length - 1 ? "border-b border-[#2a2a4a]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#E94560]/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-[#E94560]">
                      {lead.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{lead.name}</div>
                    <div className="text-xs text-[#5a5a7a]">{lead.source}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={stageColors[lead.stage] as "success" | "warning" | "default" | "secondary" | "amber" | "outline" | "danger" | undefined}>
                    {lead.stage}
                  </Badge>
                  <span className="text-xs text-[#5a5a7a]">{lead.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pipeline summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Pipeline Overview</CardTitle>
            <Link href="/dashboard/pipeline">
              <Button variant="ghost" size="sm" className="gap-1 text-[#8080A0] hover:text-white text-xs">
                Manage <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {[
              { stage: "New Lead", count: 47, color: "bg-[#8080A0]" },
              { stage: "DM Sent", count: 38, color: "bg-[#E94560]" },
              { stage: "Form Completed", count: 31, color: "bg-[#F5A623]" },
              { stage: "Call Booked", count: 24, color: "bg-purple-500" },
              { stage: "Contract Sent", count: 16, color: "bg-blue-500" },
              { stage: "Signed", count: 9, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.stage} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="w-32 text-xs text-[#8080A0] shrink-0">{item.stage}</div>
                <div className="flex-1 h-2 rounded-full bg-[#0F0F1A] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${(item.count / 47) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-right text-[#C0C0D0]">{item.count}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
