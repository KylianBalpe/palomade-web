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
import { allUsers } from "@/utils/services/user-service";
import { Badge } from "@/components/ui/badge";

type Users = {
  data: [
    {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      companyId: string;
      companyName: string;
      role: string;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export default function Users({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<Users>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getUsers = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const res = await allUsers({
          token: session.user.access_token,
          search: search,
          page: page,
        });

        const users = await res.json();

        setUsers(users);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = users?.paging.total_page || 1;

  useEffect(() => {
    getUsers(searchTerm, thisPage);
  }, [searchTerm, thisPage]);

  const usersData = users?.data;

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
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead className="text-center">Company Id</TableHead>
                <TableHead className="text-center">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData?.length ? (
                usersData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell className="text-center">
                      {user.companyId ? (
                        user.companyId
                      ) : (
                        <span className="text-muted-foreground">
                          Not an employee of any company
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge>{user.role}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
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
