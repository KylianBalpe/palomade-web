"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  cancelShipping,
  createShipping,
  getCompanyShippings,
} from "@/utils/services/shippings-service";
import newFormatDate from "@/utils/helpers/helper";
import Search from "@/components/atom/Search";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cross, Eye, PencilIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import Pagination from "@/components/molecules/Pagination";
import { createShippingForm } from "@/utils/form/shippings-form";
import { getCompanyLands } from "@/utils/services/land-service";
import { Badge } from "@/components/ui/badge";

type CompanyShippings = {
  data: [
    {
      id: number;
      code: string;
      companyId: string;
      companyStringId: string;
      start_date: string;
      end_date: string;
      status: string;
      weight: string;
      from: string;
      to: string;
      coordinates_start: string;
      coordinates_end: string;
      estimated_arrival: string;
      createdAt: string;
      updatedAt: string;
      driverId: number;
      driverName: string;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

type CompanyLands = {
  id: number;
  landStringId: string;
  name: string;
  address: string;
  coordinates: String;
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
  const [companyShippings, setCompanyShippings] = useState<CompanyShippings>();
  const [companyLands, setCompanyLands] = useState<CompanyLands[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openCancel, setOpenCancel] = useState<string | null>(null);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getShippings = async (search: string, page: number) => {
    setIsLoading(true);
    try {
      if (status === "authenticated" && session) {
        const shipping = await getCompanyShippings({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          search: search,
          page: page,
        });

        const shippings = await shipping.json();
        setCompanyShippings(shippings);
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

  const totalPages = companyShippings?.paging.total_page || 1;

  const createForm = useForm<z.infer<typeof createShippingForm>>({
    resolver: zodResolver(createShippingForm),
    defaultValues: {
      weight: 0,
    },
  });

  const getLands = async () => {
    try {
      if (status === "authenticated" && session) {
        const lands = await getCompanyLands({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          search: "",
        });

        const companyLands = await lands.json();
        setCompanyLands(companyLands.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLands();
  }, [session]);

  const onCreateShippings = async (
    values: z.infer<typeof createShippingForm>,
  ) => {
    try {
      if (status === "authenticated" && session) {
        const res = await createShipping({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          values: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        toast.success(response.message);
        setOpenCreate(false);
        getShippings(searchTerm, thisPage);
        createForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelShippings = async (code: string) => {
    try {
      if (status === "authenticated" && session) {
        const res = await cancelShipping({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          code: code,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        toast.success(response.message);
        setOpenCancel(null);
        getShippings(searchTerm, thisPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const data = companyShippings?.data;
  const lands = companyLands;

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div>Shippings</div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Search placeholder="Search code or driver name..." />
          <AlertDialog open={openCreate} onOpenChange={setOpenCreate}>
            <AlertDialogTrigger asChild>
              <Button className="max-w-min">
                <Cross size={12} className="mr-2" />
                Create Shippings
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create New Shipping</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...createForm}>
                <form
                  onSubmit={createForm.handleSubmit(onCreateShippings)}
                  className="space-y-4"
                >
                  <FormField
                    control={createForm.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="weight">Shipping Weight</FormLabel>
                        <FormControl>
                          <Input
                            id="weight"
                            placeholder="Enter weight of the shipping"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Input number only. ex: 5
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="landId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="landId">
                          Select Where Shipping Start
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                id="landId"
                                placeholder="Select location"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lands.map((land, index) => (
                              <SelectItem key={index} value={land.landStringId}>
                                {land.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      type="submit"
                      // disabled={!createForm.formState.isDirty}
                    >
                      Add
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center" colSpan={2}>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length ? (
                data.map((shippings, index) => (
                  <TableRow key={index}>
                    <TableCell>{shippings.code}</TableCell>
                    <TableCell>
                      {shippings.driverName ? (
                        <p>{shippings.driverName}</p>
                      ) : (
                        <p className="text-muted-foreground">
                          Not assigned yet
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{`${shippings.weight} Ton`}</TableCell>
                    <TableCell>{newFormatDate(shippings.createdAt)}</TableCell>
                    <TableCell>
                      <Badge>{shippings.status}</Badge>
                    </TableCell>
                    <TableCell className="w-16 text-end">
                      <Button size={"sm"} variant={"outline"} asChild>
                        <Link
                          href={`/dashboard/shippings/${shippings.code}/details`}
                        >
                          <Eye size={14} className="mr-2" />
                          Details
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="w-16 text-start">
                      <AlertDialog
                        open={openCancel === shippings.code}
                        onOpenChange={(isOpen) =>
                          isOpen
                            ? setOpenCancel(shippings.code)
                            : setOpenCancel(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"destructive"}
                            size={"sm"}
                            disabled={
                              shippings.status === "CANCELLED" ||
                              shippings.status === "FINISHED" ||
                              shippings.status === "SHIPPING"
                            }
                          >
                            <X size={14} className="mr-2" />
                            Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to cancel this shippings?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undo. You need to add again
                              if you made a mistake.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              onClick={() => onCancelShippings(shippings.code)}
                            >
                              Submit
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
        <Toaster />
      </div>
    </main>
  );
}
