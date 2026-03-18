"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Zap, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

function SignupForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  async function handleGoogleSignup() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (success) {
    return (
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-3">Check your email</h2>
        <p className="text-[#8080A0] mb-6">
          We sent a confirmation link to <strong className="text-white">{email}</strong>.
          Click it to activate your account and access your dashboard.
        </p>
        <Link href="/login">
          <Button variant="outline">Back to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E94560]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-white">
            Lead<span className="text-[#E94560]">Kast</span>
          </span>
        </Link>
        <h1 className="font-display text-3xl font-bold text-white">Create your account</h1>
        <p className="mt-2 text-[#8080A0]">
          {plan === "retainer"
            ? "Setting up your Operator Retainer"
            : plan === "starter"
            ? "Getting your Starter Playbook"
            : "Start your systematic recruitment engine"}
        </p>
      </div>

      <div className="rounded-xl border border-[#2a2a4a] bg-[#16213E] p-8">
        {error && (
          <div className="mb-6 rounded-lg border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-3">
            <p className="text-sm text-[#F5A623]">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="operator@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a5a7a] hover:text-[#C0C0D0]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-[#5a5a7a]">
          By signing up you agree to our{" "}
          <Link href="#" className="text-[#8080A0] hover:text-[#E94560]">Terms</Link>{" "}
          and{" "}
          <Link href="#" className="text-[#8080A0] hover:text-[#E94560]">Privacy Policy</Link>.
        </p>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a4a]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#16213E] px-3 text-[#5a5a7a]">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="mt-4 w-full flex items-center justify-center gap-3 rounded-md border border-[#2a2a4a] bg-[#0F0F1A] px-4 py-2.5 text-sm text-[#C0C0D0] hover:bg-[#16213E] transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-[#8080A0]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#E94560] hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E94560]/8 blur-3xl" />
      </div>
      <Suspense fallback={<div className="text-[#8080A0]">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
