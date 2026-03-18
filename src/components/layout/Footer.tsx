import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#2a2a4a] bg-[#0F0F1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E94560]">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Lead<span className="text-[#E94560]">Kast</span>
              </span>
            </Link>
            <p className="text-sm text-[#8080A0] leading-relaxed">
              The systematic recruitment engine for franchise operators. Data-backed. Results-driven.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "How It Works", "Results"].map((item) => (
                <li key={item}>
                  <Link href={`/#${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-[#8080A0] hover:text-[#E94560] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Lead Pipeline", href: "/dashboard/pipeline" },
                { label: "Ad Creatives", href: "/dashboard/creatives" },
                { label: "Campaigns", href: "/dashboard/campaigns" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#8080A0] hover:text-[#E94560] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#8080A0] hover:text-[#E94560] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#2a2a4a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8080A0]">
            © {new Date().getFullYear()} LeadKast. All rights reserved.
          </p>
          <p className="text-sm text-[#8080A0]">
            Built for franchise operators who demand results.
          </p>
        </div>
      </div>
    </footer>
  );
}
