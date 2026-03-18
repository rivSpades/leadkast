"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Image,
  Megaphone,
  BarChart2,
  Settings,
  Zap,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { label: "Lead Pipeline", href: "/dashboard/pipeline", icon: Users },
  { label: "Ad Creatives", href: "/dashboard/creatives", icon: Image },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Reporting", href: "/dashboard/reporting", icon: BarChart2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-[#2a2a4a] bg-[#0F0F1A] transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#2a2a4a] px-4">
        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E94560]">
            <Zap className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold text-white truncate">
              Lead<span className="text-[#E94560]">Kast</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#E94560]/10 text-[#E94560]"
                  : "text-[#8080A0] hover:bg-[#16213E] hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#2a2a4a] p-2 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#8080A0] hover:bg-[#16213E] hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5 shrink-0" /> : <ChevronLeft className="h-5 w-5 shrink-0" />}
          {!collapsed && <span>Collapse</span>}
        </button>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#8080A0] hover:bg-[#16213E] hover:text-red-400 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
