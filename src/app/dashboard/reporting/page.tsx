"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Download, TrendingDown, TrendingUp, DollarSign, Users, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const spendLeadsData = [
  { week: "Feb W1", spend: 140, leads: 28 },
  { week: "Feb W2", spend: 160, leads: 34 },
  { week: "Feb W3", spend: 175, leads: 37 },
  { week: "Feb W4", spend: 190, leads: 42 },
  { week: "Mar W1", spend: 210, leads: 47 },
  { week: "Mar W2", spend: 225, leads: 52 },
  { week: "Mar W3", spend: 194, leads: 81 },
];

const cplData = [
  { week: "Feb W1", cpl: 5.0 },
  { week: "Feb W2", cpl: 4.71 },
  { week: "Feb W3", cpl: 4.73 },
  { week: "Feb W4", cpl: 4.52 },
  { week: "Mar W1", cpl: 4.47 },
  { week: "Mar W2", cpl: 4.33 },
  { week: "Mar W3", cpl: 4.62 },
];

const campaignPerf = [
  { name: "Opportunity Knock", leads: 81, spend: 374, cpl: 4.62 },
  { name: "Northeast Q1", leads: 47, spend: 210, cpl: 4.47 },
  { name: "Weekend Blitz", leads: 28, spend: 150, cpl: 5.36 },
  { name: "Feb Test", leads: 112, spend: 560, cpl: 5.0 },
];

const RANGE_OPTIONS = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#2a2a4a] bg-[#16213E] p-3 shadow-xl">
        <p className="text-xs text-[#8080A0] mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-sm font-medium" style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" && p.name.includes("CPL") ? `$${p.value}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportingPage() {
  const [range, setRange] = useState("Last 30 days");

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Reporting & ROI</h1>
          <p className="text-sm text-[#8080A0] mt-1">Spend, leads, CPL trends across all campaigns</p>
        </div>
        <Button variant="outline" className="gap-2" size="sm">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Date range selector */}
      <div className="flex items-center gap-2">
        {RANGE_OPTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              range === r
                ? "bg-[#E94560] text-white"
                : "bg-[#16213E] text-[#8080A0] hover:text-white border border-[#2a2a4a]"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Spend", value: "$1,294", icon: DollarSign, change: "+12%", up: true },
          { label: "Total Leads", value: "268", icon: Users, change: "+31%", up: true },
          { label: "Avg CPL", value: "$4.83", icon: TrendingDown, change: "-8%", up: false },
          { label: "Contracts", value: "9", icon: FileSignature, change: "+3", up: true },
          { label: "Cost / Contract", value: "$143.78", icon: TrendingDown, change: "-14%", up: false },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8080A0]">{kpi.label}</span>
                <kpi.icon className="h-4 w-4 text-[#E94560]" />
              </div>
              <div className="font-display text-xl font-bold text-white">{kpi.value}</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${kpi.up ? "text-emerald-400" : "text-emerald-400"}`}>
                {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spend vs Leads Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spend vs Leads Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={spendLeadsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E94560" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E94560" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="week" tick={{ fill: "#8080A0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8080A0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#8080A0", fontSize: 12 }} />
              <Area type="monotone" dataKey="spend" stroke="#E94560" fill="url(#spendGrad)" strokeWidth={2} name="Spend ($)" />
              <Area type="monotone" dataKey="leads" stroke="#10b981" fill="url(#leadsGrad)" strokeWidth={2} name="Leads" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CPL Trend */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cost Per Lead Trend</CardTitle>
            <Badge variant="success" className="text-xs">Improving ↓</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cplData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="cplGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="week" tick={{ fill: "#8080A0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "#8080A0", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
                domain={[3, 6]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cpl" stroke="#F5A623" fill="url(#cplGrad)" strokeWidth={2} name="CPL ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a4a]">
                  {["Campaign", "Leads", "Spend", "CPL", "vs Avg"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-[#5a5a7a] uppercase tracking-wider px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaignPerf.map((c, i) => {
                  const diff = ((c.cpl - 4.83) / 4.83) * 100;
                  return (
                    <tr
                      key={c.name}
                      className={`${i < campaignPerf.length - 1 ? "border-b border-[#2a2a4a]" : ""}`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{c.name}</td>
                      <td className="px-4 py-3 text-sm text-[#C0C0D0]">{c.leads}</td>
                      <td className="px-4 py-3 text-sm text-[#C0C0D0]">${c.spend}</td>
                      <td className="px-4 py-3 text-sm font-medium text-white">${c.cpl.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${diff <= 0 ? "text-emerald-400" : "text-[#E94560]"}`}>
                          {diff <= 0 ? "↓" : "↑"} {Math.abs(diff).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Performance Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={campaignPerf} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="name" tick={{ fill: "#8080A0", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8080A0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="leads" name="Leads" fill="#E94560" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
