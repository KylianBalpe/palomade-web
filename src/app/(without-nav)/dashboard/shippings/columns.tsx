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
import { Car } from "lucide-react";

type Shippings = {
  code: string;
  companyId?: string;
  companyStringId?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  plat_nomor?: string;
  weight?: string;
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
    cell: ({ row }) => {
      const shipping = row.original;

      return (
        <>
          {shipping.driverName === "Not Assigned" ? (
            <span className="text-muted-foreground">{shipping.driverName}</span>
          ) : (
            <span>{shipping.driverName}</span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => {
      const shipping = row.original;

      return <span>{shipping.weight} Ton</span>;
    },
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
      const [isCanceling, setIsCanceling] = useState<boolean>(false);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const shippingCode = row.original.code;

      const onCancel = async () => {
        try {
          const res = await fetch(
            `${baseUrl}/api/${session?.user.companyStringId}/shipping/${shippingCode}/cancel`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session?.user.access_token}`,
              },
            },
          );
          const response = await res.json();

          if (res.status !== 200) {
            toast.error(response.errors);
          }

          toast.success(response.message);
          setIsCanceling(false);
          return response;
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="flex flex-row justify-center space-x-2">
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
            <AlertDialog open={isCanceling} onOpenChange={setIsCanceling}>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"} size={"sm"}>
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={onCancel}>Continue</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Toaster />
        </div>
      );
    },
  },
];
