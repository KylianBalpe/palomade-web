"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

type ShippingsByDriver = {
  code: string;
  status: string;
  driverId: number;
  weight: string;
  from: string;
  to: string;
  coordinates_start: string;
  coordinates_end: string;
  createdAt: string;
};

export const columns: ColumnDef<ShippingsByDriver>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "status",
    header: () => <div className="flex flex-row justify-center">Status</div>,
    cell: ({ row }) => {
      const shipping = row.original;

      return (
        <div className="flex flex-row justify-center">
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium text-white ${
              shipping.status === "SHIPPING"
                ? "bg-yellow-500"
                : shipping.status === "FINISHED"
                  ? "bg-green-500"
                  : shipping.status === "CANCELED"
                    ? "bg-red-500"
                    : "bg-blue-500"
            }`}
          >
            {shipping.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="flex flex-row justify-center">Actions</div>,
    id: "actions",
    cell: ({ row }) => {
      const shipping = row.original;
      const { data: session } = useSession();

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const shippingCode = row.original.code;

      return (
        <div className="flex flex-row justify-center space-x-2">
          <Button variant={"default"} size={"sm"} asChild>
            <Link href={`/dashboard/my-shippings/${shipping.code}/details`}>
              Detail
            </Link>
          </Button>
          <Toaster />
        </div>
      );
    },
  },
];
