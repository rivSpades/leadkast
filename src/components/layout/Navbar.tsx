"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a4a] bg-[#1A1A2E]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E94560]">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Lead<span className="text-[#E94560]">Kast</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-[#C0C0D0] hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm text-[#C0C0D0] hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-sm text-[#C0C0D0] hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/#results" className="text-sm text-[#C0C0D0] hover:text-white transition-colors">
              Results
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-[#C0C0D0]">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#C0C0D0] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2a2a4a] bg-[#1A1A2E] px-4 py-4">
          <nav className="flex flex-col gap-4">
            <Link href="/#features" className="text-sm text-[#C0C0D0] hover:text-white" onClick={() => setMobileOpen(false)}>
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm text-[#C0C0D0] hover:text-white" onClick={() => setMobileOpen(false)}>
              How It Works
            </Link>
            <Link href="/#pricing" className="text-sm text-[#C0C0D0] hover:text-white" onClick={() => setMobileOpen(false)}>
              Pricing
            </Link>
            <Link href="/#results" className="text-sm text-[#C0C0D0] hover:text-white" onClick={() => setMobileOpen(false)}>
              Results
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-[#2a2a4a]">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
