"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Shippings = {
  code: string;
  companyId?: string;
  companyStringId?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  plat_nomor?: string;
  berat?: string;
  from: string;
  to: string;
  coordinates_start: string;
  coordinates_end: string;
  estimated_arrival?: string;
  driverId?: number;
  driverName?: string;
};

export const columns: ColumnDef<Shippings>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "driverName",
    header: "Driver",
  },
  {
    accessorKey: "berat",
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
    header: "Status",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const shipping = row.original;

      return (
        <div className="flex flex-row space-x-2">
          <Button variant={"default"} size={"sm"} asChild>
            <Link href={`/dashboard/shippings/${shipping.code}/details`}>
              Detail
            </Link>
          </Button>
          {shipping.status === "CANCELED" ? (
            <Button disabled size={"sm"}>
              Canceled
            </Button>
          ) : (
            <Button variant={"destructive"} size={"sm"} asChild>
              <Link href={`/dashboard/shippings/${shipping.code}/cancel`}>
                Cancel
              </Link>
            </Button>
          )}
        </div>
      );
    },
  },
];
