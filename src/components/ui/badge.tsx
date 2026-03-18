import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#E94560] text-white",
        secondary: "border-transparent bg-[#16213E] text-[#C0C0D0]",
        amber: "border-transparent bg-[#F5A623] text-[#1A1A2E]",
        outline: "border-[#2a2a4a] text-[#C0C0D0]",
        success: "border-transparent bg-emerald-500/20 text-emerald-400",
        warning: "border-transparent bg-amber-500/20 text-amber-400",
        danger: "border-transparent bg-red-500/20 text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
