"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  approveAffiliation,
  getAffiliationRequests,
} from "@/utils/services/company-service";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Search from "@/components/atom/Search";
import Pagination from "@/components/molecules/Pagination";
import { Check } from "lucide-react";

type AffiliationData = {
  data: [
    {
      id: number;
      companyId: string;
      name: string;
      logo: string;
      address: string;
      description: string;
      coordinates: string;
      requestedBy: string;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export default function Requests({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const { data: session, status } = useSession();
  const [affiliationReq, setAffiliationReq] = useState<AffiliationData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [approve, setApprove] = useState<string | null>(null);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getAffiliation = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const requests = await getAffiliationRequests({
          token: session.user.access_token,
          search: search,
          page: page,
        });

        const response = await requests.json();
        setAffiliationReq(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getAffiliation(searchTerm, thisPage);
  }, [session, searchTerm, thisPage]);

  const totalPages = affiliationReq?.paging.total_page || 1;

  const affiliationReqData = affiliationReq?.data;

  async function onApprove(companyId: string) {
    setIsLoading(true);
    try {
      const res = await approveAffiliation({
        token: session?.user.access_token,
        companyId: companyId,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        setIsLoading(false);
        return;
      }

      toast.success(response.message);
      setIsLoading(false);
      getAffiliation(searchTerm, thisPage);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <h1>Company Affiliation Requests</h1>
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
                <TableHead>Requested By</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliationReqData?.length ? (
                affiliationReqData.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.companyId}</TableCell>
                    <TableCell>{req.address}</TableCell>
                    <TableCell>{req.description}</TableCell>
                    <TableCell>{req.coordinates}</TableCell>
                    <TableCell>{req.requestedBy}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog
                        open={approve === req.companyId}
                        onOpenChange={(isOpen) =>
                          isOpen ? setApprove(req.companyId) : setApprove(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button>
                            <Check size={16} className="mr-2" />
                            Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to approve this affiliation request?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              onClick={() => onApprove(req.companyId)}
                              disabled={isLoading}
                            >
                              Approve
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(7)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination totalPages={totalPages} />
        <Toaster />
      </div>
    </main>
  );
}
