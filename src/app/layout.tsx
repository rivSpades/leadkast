import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "LeadKast — Systematic Recruitment for Franchise Operators",
  description:
    "81 leads. 3 signed contracts. $374 spent. 2 weeks. This is what a tested model recruitment system looks like. LeadKast gives franchise operators a data-backed pipeline.",
  keywords: "franchise recruitment, lead generation, model recruitment, ad campaigns, franchise operators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#1A1A2E] text-[#F0F0F5] antialiased">{children}</body>
    </html>
  );
}
