"use client";

import { useState } from "react";
import { Save, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#8080A0] mt-1">Manage your account and integrations</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fname">Full name</Label>
              <Input id="fname" defaultValue="Operator Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="operator@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Business / Franchise name</Label>
            <Input id="company" placeholder="Your franchise name" />
          </div>
          <Button onClick={handleSave} className="gap-2" size="sm">
            {saved ? <><CheckCircle className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}
          </Button>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect your tools to automate your pipeline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              name: "Meta Ads",
              desc: "Connect your Meta Business account to launch and track campaigns.",
              connected: true,
              icon: "📘",
            },
            {
              name: "Typeform",
              desc: "Your lead capture form. Leads from your ads fill this form.",
              connected: true,
              icon: "📋",
            },
            {
              name: "ManyChat",
              desc: "Automated DM follow-up on Instagram and Facebook.",
              connected: false,
              icon: "💬",
            },
            {
              name: "Stripe",
              desc: "Payment processing for playbook purchases and retainer subscriptions.",
              connected: true,
              icon: "💳",
            },
            {
              name: "Zapier",
              desc: "Connect 5,000+ apps to extend your recruitment workflow.",
              connected: false,
              icon: "⚡",
            },
            {
              name: "Resend (Email)",
              desc: "Transactional email for lead notifications and reports.",
              connected: false,
              icon: "✉️",
            },
          ].map((integration, i, arr) => (
            <div key={integration.name}>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{integration.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{integration.name}</span>
                      {integration.connected && (
                        <Badge variant="success" className="text-xs">Connected</Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#8080A0]">{integration.desc}</p>
                  </div>
                </div>
                <Button
                  variant={integration.connected ? "secondary" : "outline"}
                  size="sm"
                  className="gap-1 shrink-0 ml-4"
                >
                  {integration.connected ? "Manage" : "Connect"}
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Your current plan and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#E94560]/5 border border-[#E94560]/20">
            <div>
              <div className="text-sm font-semibold text-white">Operator Retainer</div>
              <div className="text-xs text-[#8080A0] mt-0.5">$997/month · Next billing: Apr 18, 2026</div>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" size="sm">Manage Billing</Button>
            <Button variant="ghost" size="sm" className="text-[#E94560]">Cancel Plan</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-[#E94560]/20">
        <CardHeader>
          <CardTitle className="text-[#E94560]">Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Delete Account</div>
              <div className="text-xs text-[#8080A0]">Permanently delete your account and all data.</div>
            </div>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
