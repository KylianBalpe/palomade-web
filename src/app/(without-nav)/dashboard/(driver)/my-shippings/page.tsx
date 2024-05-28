"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getDriverShippings } from "@/utils/services/shippings-service";
import newFormatDate from "@/utils/helpers/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/molecules/Pagination";
import { Badge } from "@/components/ui/badge";
import Search from "@/components/atom/Search";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

type ShippingsByDriver = {
  data: [
    {
      code: string;
      status: string;
      driverId: number;
      weight: string;
      from: string;
      to: string;
      createdAt: string;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export default function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const { data: session, status } = useSession();
  const [myShippings, setMyShippings] = useState<ShippingsByDriver>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getShippings = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const shippings = await getDriverShippings({
          token: session.user.access_token as string,
          search: search,
          page: page,
        });

        const shipping = await shippings.json();
        setMyShippings(shipping);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShippings(searchTerm, thisPage);
    toast.dismiss();
  }, [session, searchTerm, thisPage]);

  const totalPages = myShippings?.paging.total_page || 1;
  const shippingData = myShippings?.data;

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div>Shippings</div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Search placeholder="Search shipping code..." />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingData?.length ? (
                shippingData.map((shippings, index) => (
                  <TableRow key={index}>
                    <TableCell>{shippings.code}</TableCell>
                    <TableCell>{`${shippings.weight} Ton`}</TableCell>
                    <TableCell>{shippings.from}</TableCell>
                    <TableCell>{shippings.to}</TableCell>
                    <TableCell>{newFormatDate(shippings.createdAt)}</TableCell>
                    <TableCell>
                      <Badge>{shippings.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button size={"sm"} variant={"outline"} asChild>
                        <Link
                          href={`/dashboard/my-shippings/${shippings.code}/details`}
                        >
                          <Eye size={14} className="mr-2" />
                          Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(5)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                        </TableCell>
                      ))}
                      <TableCell colSpan={2} className="text-center">
                        <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
