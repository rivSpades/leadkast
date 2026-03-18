import { DashboardNav } from "@/components/layout/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#1A1A2E] overflow-hidden">
      <DashboardNav />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
