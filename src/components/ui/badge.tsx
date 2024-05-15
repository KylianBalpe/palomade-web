import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import clsx from "clsx";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        sm: "px-1 py-0.5 text-white",
        lg: "px-2 py-1 text-white text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "sm",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  className = clsx({
    "bg-blue-500": children === "ADMIN" || children === "PROCESSED",
    "bg-yellow-500": children === "DRIVER" || children === "SHIPPING",
    "bg-green-500": children === "SUPERADMIN" || children === "FINISHED",
    "bg-zinc-950": children === "USER",
    "bg-red-500": children === "CANCELLED",
  });
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
