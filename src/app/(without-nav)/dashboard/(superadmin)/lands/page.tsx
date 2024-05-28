"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Search from "@/components/atom/Search";
import Pagination from "@/components/molecules/Pagination";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { allLands } from "@/utils/services/land-service";

type Lands = {
  data: [
    {
      id: number;
      landStringId: string;
      name: string;
      address: string;
      coordinates: string;
      isActive: boolean;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export default function Lands({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const { data: session, status } = useSession();
  const [lands, setLands] = useState<Lands>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getLands = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const res = await allLands({
          token: session.user.access_token,
          search: search,
          page: page,
        });

        const land = await res.json();

        setLands(land);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = lands?.paging.total_page || 1;

  useEffect(() => {
    getLands(searchTerm, thisPage);
  }, [session, searchTerm, thisPage]);

  const landsData = lands?.data;

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <h1>Companies</h1>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Search placeholder="Search" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Coordinates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landsData?.length ? (
                landsData.map((land) => (
                  <TableRow key={land.id}>
                    <TableCell>{land.landStringId}</TableCell>
                    <TableCell>{land.name}</TableCell>
                    <TableCell>{land.address}</TableCell>
                    <TableCell>{land.coordinates}</TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(4)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No data available
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
