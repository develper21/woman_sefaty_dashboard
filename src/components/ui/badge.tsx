import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        success:
          "border-transparent bg-success text-success-foreground",
        warning:
          "border-transparent bg-warning text-warning-foreground",
        info:
          "border-transparent bg-info text-info-foreground",
        outline: "text-foreground border-border",
        // Gradient badge
        gradient: "border-transparent gradient-primary text-primary-foreground shadow-sm",
        // Subtle variants
        "subtle-primary": "border-primary/20 bg-primary/10 text-primary",
        "subtle-secondary": "border-secondary/20 bg-secondary/10 text-secondary",
        "subtle-success": "border-success/20 bg-success/10 text-success",
        "subtle-warning": "border-warning/20 bg-warning/10 text-warning",
        "subtle-destructive": "border-destructive/20 bg-destructive/10 text-destructive",
        // Status badges
        online: "border-success/30 bg-success/10 text-success",
        offline: "border-muted-foreground/30 bg-muted text-muted-foreground",
        alert: "border-destructive/30 bg-destructive/10 text-destructive animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
