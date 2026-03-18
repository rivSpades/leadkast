"use client";

import { useState } from "react";
import { Plus, Search, Filter, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Stage =
  | "New Lead"
  | "DM Sent"
  | "Form Completed"
  | "Call Booked"
  | "Contract Sent"
  | "Signed";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  stage: Stage;
  date: string;
  notes?: string;
}

const STAGES: Stage[] = [
  "New Lead",
  "DM Sent",
  "Form Completed",
  "Call Booked",
  "Contract Sent",
  "Signed",
];

const STAGE_COLORS: Record<Stage, string> = {
  "New Lead": "border-[#8080A0]/30 bg-[#8080A0]/5",
  "DM Sent": "border-[#E94560]/30 bg-[#E94560]/5",
  "Form Completed": "border-[#F5A623]/30 bg-[#F5A623]/5",
  "Call Booked": "border-purple-500/30 bg-purple-500/5",
  "Contract Sent": "border-blue-500/30 bg-blue-500/5",
  "Signed": "border-emerald-500/30 bg-emerald-500/5",
};

const STAGE_HEADER_COLORS: Record<Stage, string> = {
  "New Lead": "text-[#8080A0]",
  "DM Sent": "text-[#E94560]",
  "Form Completed": "text-[#F5A623]",
  "Call Booked": "text-purple-400",
  "Contract Sent": "text-blue-400",
  "Signed": "text-emerald-400",
};

const INITIAL_LEADS: Lead[] = [
  { id: "1", name: "Jordan Mills", email: "jordan@example.com", source: "Meta Ad #3", stage: "New Lead", date: "Mar 18" },
  { id: "2", name: "Casey Torres", email: "casey@example.com", source: "Meta Ad #1", stage: "New Lead", date: "Mar 18" },
  { id: "3", name: "Sam Rivera", email: "sam@example.com", source: "Meta Ad #3", stage: "DM Sent", date: "Mar 17" },
  { id: "4", name: "Alex Parker", email: "alex@example.com", source: "Meta Ad #2", stage: "DM Sent", date: "Mar 17" },
  { id: "5", name: "Morgan White", email: "morgan@example.com", source: "Meta Ad #1", stage: "Form Completed", date: "Mar 16", notes: "Interested in full-time" },
  { id: "6", name: "Drew Chen", email: "drew@example.com", source: "Meta Ad #3", stage: "Call Booked", date: "Mar 15", phone: "+1 555-0100" },
  { id: "7", name: "Riley James", email: "riley@example.com", source: "Meta Ad #2", stage: "Contract Sent", date: "Mar 14" },
  { id: "8", name: "Quinn Lee", email: "quinn@example.com", source: "Meta Ad #1", stage: "Signed", date: "Mar 12", notes: "Signed 3-month contract" },
  { id: "9", name: "Taylor Brooks", email: "taylor@example.com", source: "Meta Ad #3", stage: "New Lead", date: "Mar 18" },
  { id: "10", name: "Avery Scott", email: "avery@example.com", source: "Meta Ad #1", stage: "DM Sent", date: "Mar 17" },
];

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<Stage | null>(null);

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  const byStage = (stage: Stage) => filtered.filter((l) => l.stage === stage);

  function handleDragStart(id: string) {
    setDragging(id);
  }

  function handleDrop(stage: Stage) {
    if (!dragging) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === dragging ? { ...l, stage } : l))
    );
    setDragging(null);
    setDragOver(null);
  }

  function advanceStage(id: string) {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const idx = STAGES.indexOf(l.stage);
        if (idx < STAGES.length - 1) return { ...l, stage: STAGES[idx + 1] };
        return l;
      })
    );
  }

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Lead Pipeline</h1>
          <p className="text-sm text-[#8080A0] mt-1">
            {leads.length} total leads · drag cards to move stages
          </p>
        </div>
        <Button className="gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a5a7a]" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="secondary" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {STAGES.map((stage) => {
          const stageLeads = byStage(stage);
          return (
            <div
              key={stage}
              className={`shrink-0 w-64 rounded-xl border ${STAGE_COLORS[stage]} flex flex-col transition-colors ${
                dragOver === stage ? "ring-2 ring-[#E94560]/50" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(stage);
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(stage)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className={`text-xs font-semibold uppercase tracking-wider ${STAGE_HEADER_COLORS[stage]}`}>
                  {stage}
                </span>
                <span className="text-xs text-[#5a5a7a] bg-[#0F0F1A] rounded-full px-2 py-0.5">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px]">
                {stageLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-xs text-[#5a5a7a]">No leads here yet</p>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={() => handleDragStart(lead.id)}
                      className={`rounded-lg bg-[#16213E] border border-[#2a2a4a] p-3 cursor-grab active:cursor-grabbing hover:border-[#E94560]/30 transition-colors ${
                        dragging === lead.id ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-[#E94560]/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-semibold text-[#E94560]">
                              {lead.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-white leading-tight">{lead.name}</span>
                        </div>
                        <span className="text-xs text-[#5a5a7a] shrink-0">{lead.date}</span>
                      </div>

                      <div className="text-xs text-[#8080A0] mb-2 truncate">{lead.email}</div>

                      {lead.notes && (
                        <div className="text-xs text-[#5a5a7a] italic mb-2 truncate">{lead.notes}</div>
                      )}

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{lead.source}</Badge>
                        <div className="flex items-center gap-1">
                          <button className="h-6 w-6 rounded flex items-center justify-center text-[#5a5a7a] hover:text-[#E94560] hover:bg-[#E94560]/10 transition-colors">
                            <Mail className="h-3 w-3" />
                          </button>
                          {lead.phone && (
                            <button className="h-6 w-6 rounded flex items-center justify-center text-[#5a5a7a] hover:text-[#E94560] hover:bg-[#E94560]/10 transition-colors">
                              <Phone className="h-3 w-3" />
                            </button>
                          )}
                          {stage !== "Signed" && (
                            <button
                              onClick={() => advanceStage(lead.id)}
                              className="h-6 w-6 rounded flex items-center justify-center text-[#5a5a7a] hover:text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                              title="Advance to next stage"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
