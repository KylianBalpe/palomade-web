"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCompanies } from "@/utils/services/company-service";
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

type Companies = {
  data: [
    {
      address: string;
      companyId: string;
      id: number;
      logo: string;
      name: string;
      description: string;
      coordinates: string;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export default function Companies({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const { data: session, status } = useSession();
  const [companies, setCompanies] = useState<Companies>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getCompaniesData = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const res = await getCompanies({
          token: session.user.access_token,
          search: search,
          page: page,
        });

        const company = await res.json();

        setCompanies(company);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompaniesData(searchTerm, thisPage);
  }, [session, searchTerm, thisPage]);

  const totalPages = companies?.paging.total_page || 1;

  const companyData = companies?.data;
  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <h1>Companies</h1>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Search placeholder="Search name or id..." />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location Coordinates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyData?.length ? (
                companyData.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.companyId}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.description}</TableCell>
                    <TableCell>{company.coordinates}</TableCell>
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
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
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
