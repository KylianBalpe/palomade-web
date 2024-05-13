import clsx from "clsx";
import React from "react";

export function TableRoleBadges({ children }: { children: React.ReactNode }) {
  const className = clsx(
    "px-1 py-0.5 rounded-sm text-xs font-medium text-white bg-blue-500",
    {
      "bg-blue-500": children === "ADMIN",
      "bg-yellow-500": children === "DRIVER",
    },
  );
  return <span className={className}>{children}</span>;
}

export function SideNavRoleBadges({ children }: { children: React.ReactNode }) {
  const className = clsx(
    "px-2 py-1 rounded-full text-xs font-medium text-white",
    {
      "bg-blue-500": children === "ADMIN",
      "bg-yellow-500": children === "DRIVER",
      "bg-green-500": children === "SUPERADMIN",
      "bg-zinc-950": children === "USER",
    },
  );
  return <span className={className}>{children}</span>;
}

export function ShippingStatusBadges({
  children,
}: {
  children: React.ReactNode;
}) {
  const className = clsx(
    "px-2 py-1 rounded-md text-xs font-medium text-white",
    {
      "bg-blue-500": children === "PROCESSED",
      "bg-green-500": children === "FINISHED",
      "bg-yellow-500": children === "SHIPPING",
      "bg-red-500": children === "CANCELLED",
    },
  );
  return <span className={className}>{children}</span>;
}
