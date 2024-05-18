"use client";

import { useEffect, useState } from "react";
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
import { Cross, PencilIcon, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Search from "@/components/atom/Search";
import Pagination from "@/components/molecules/Pagination";
import { useSession } from "next-auth/react";
import {
  addLands,
  deleteLands,
  getCompanyLands,
  updateLands,
} from "@/utils/services/land-service";
import {
  addLandsForm,
  updateLandsAdressForm,
  updateLandsCoordinatesForm,
  updateLandsNameForm,
} from "@/utils/form/lands-form";

type Lands = {
  data: [
    {
      id: number;
      landStringId: string;
      name: string;
      address: string;
      coordinates: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lands, setLands] = useState<Lands>();
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getLands = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const lands = await getCompanyLands({
          token: session.user.access_token as string,
          companyId: session.user.companyStringId as string,
          search: search,
          page: page,
        });

        const land = await lands.json();
        setLands(land);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLands(searchTerm, thisPage);
  }, [session, searchTerm, thisPage]);

  const totalPages = lands?.paging.total_page || 1;

  const addForm = useForm<z.infer<typeof addLandsForm>>({
    resolver: zodResolver(addLandsForm),
    defaultValues: {
      name: "",
      address: "",
      coordinates: "",
    },
  });

  const landsNameForm = useForm<z.infer<typeof updateLandsNameForm>>({
    resolver: zodResolver(updateLandsNameForm),
    defaultValues: {
      name: "",
    },
  });

  const landsCoordinatesForm = useForm<
    z.infer<typeof updateLandsCoordinatesForm>
  >({
    resolver: zodResolver(updateLandsCoordinatesForm),
    defaultValues: {
      coordinates: "",
    },
  });

  const landsAddressForm = useForm<z.infer<typeof updateLandsAdressForm>>({
    resolver: zodResolver(updateLandsAdressForm),
    defaultValues: {
      address: "",
    },
  });

  const onAddLands = async (data: z.infer<typeof addLandsForm>) => {
    try {
      const res = await addLands({
        token: session?.user.access_token,
        companyId: session?.user.companyStringId,
        values: data,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenAdd(false);
      getLands(searchTerm, thisPage);
      addForm.reset();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateName = async (
    data: z.infer<typeof updateLandsNameForm>,
    landId: string,
  ) => {
    try {
      const res = await updateLands({
        token: session?.user.access_token,
        companyId: session?.user.companyStringId,
        landId: landId,
        values: data,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenEdit(null);
      getLands(searchTerm, thisPage);
      landsNameForm.reset();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateAddress = async (
    data: z.infer<typeof updateLandsAdressForm>,
    landId: string,
  ) => {
    try {
      const res = await updateLands({
        token: session?.user.access_token,
        companyId: session?.user.companyStringId,
        landId: landId,
        values: data,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenEdit(null);
      getLands(searchTerm, thisPage);
      landsAddressForm.reset();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCoordinates = async (
    data: z.infer<typeof updateLandsCoordinatesForm>,
    landId: string,
  ) => {
    try {
      const res = await updateLands({
        token: session?.user.access_token,
        companyId: session?.user.companyStringId,
        landId: landId,
        values: data,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenEdit(null);
      getLands(searchTerm, thisPage);
      landsCoordinatesForm.reset();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteLands = async (landId: string) => {
    try {
      const res = await deleteLands({
        token: session?.user.access_token,
        companyId: session?.user.companyStringId,
        landId: landId,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenDelete(null);
      getLands(searchTerm, thisPage);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const landsData = lands?.data;

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <h1>Lands</h1>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Search placeholder="Search name or address..." />
          <AlertDialog open={openAdd} onOpenChange={setOpenAdd}>
            <AlertDialogTrigger asChild>
              <Button className="max-w-min">
                <Cross size={12} className="mr-2" />
                Add Land
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Lands</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...addForm}>
                <form
                  onSubmit={addForm.handleSubmit(onAddLands)}
                  className="space-y-4"
                >
                  <FormField
                    control={addForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Lands Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Enter lands name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="address">Lands Address</FormLabel>
                        <FormControl>
                          <Textarea
                            id="address"
                            placeholder="Enter lands address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="coordinates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="coordinates">
                          Lands Coordinates
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="coordinates"
                            placeholder="Enter location coordinates"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          *Right click location on Google Maps and copy the
                          coordinates
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit" disabled={!addForm.formState.isDirty}>
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
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead className="text-center" colSpan={2}>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landsData?.length ? (
                landsData.map((lands) => (
                  <TableRow key={lands.id}>
                    <TableCell>{lands.landStringId}</TableCell>
                    <TableCell>{lands.name}</TableCell>
                    <TableCell>{lands.address}</TableCell>
                    <TableCell>{lands.coordinates}</TableCell>
                    <TableCell className="w-16 text-end">
                      <AlertDialog
                        open={openEdit === lands.id}
                        onOpenChange={(isOpen) =>
                          isOpen ? setOpenEdit(lands.id) : setOpenEdit(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button size={"sm"} variant={"outline"}>
                            <PencilIcon size={12} className="mr-2" />
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit Lands Data</AlertDialogTitle>
                          </AlertDialogHeader>
                          <Form {...landsNameForm}>
                            <form
                              onSubmit={landsNameForm.handleSubmit((data) =>
                                onUpdateName(data, lands.landStringId),
                              )}
                              className="space-y-4"
                            >
                              <FormField
                                control={landsNameForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="name">
                                      Lands Name
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex w-full items-center space-x-2">
                                        <Input
                                          id="name"
                                          placeholder="Enter new lands name"
                                          {...field}
                                        />
                                        <Button
                                          type="submit"
                                          disabled={
                                            !landsNameForm.formState.isDirty
                                          }
                                        >
                                          Submit
                                        </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                          <Form {...landsAddressForm}>
                            <form
                              onSubmit={landsAddressForm.handleSubmit((data) =>
                                onUpdateAddress(data, lands.landStringId),
                              )}
                              className="space-y-4"
                            >
                              <FormField
                                control={landsAddressForm.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="address">
                                      Lands Address
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                        <Textarea
                                          id="address"
                                          placeholder="Enter new lands address"
                                          {...field}
                                        />
                                        <Button
                                          type="submit"
                                          disabled={
                                            !landsAddressForm.formState.isDirty
                                          }
                                        >
                                          Submit
                                        </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                          <Form {...landsCoordinatesForm}>
                            <form
                              onSubmit={landsCoordinatesForm.handleSubmit(
                                (data) =>
                                  onUpdateCoordinates(data, lands.landStringId),
                              )}
                              className="space-y-4"
                            >
                              <FormField
                                control={landsCoordinatesForm.control}
                                name="coordinates"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="coordinates">
                                      Lands Coordinates
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex w-full items-center space-x-2">
                                        <Input
                                          id="coordinates"
                                          placeholder="Enter new lands coordinates"
                                          {...field}
                                        />
                                        <Button
                                          type="submit"
                                          disabled={
                                            !landsCoordinatesForm.formState
                                              .isDirty
                                          }
                                        >
                                          Submit
                                        </Button>
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="w-16 text-start">
                      <AlertDialog
                        open={openDelete === lands.id}
                        onOpenChange={(isOpen) =>
                          isOpen ? setOpenDelete(lands.id) : setOpenDelete(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button size={"sm"} variant={"destructive"}>
                            <X size={14} className="mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to delete this land?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undo. You need to add again
                              if you made a mistake.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              onClick={() => onDeleteLands(lands.landStringId)}
                            >
                              Delete
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
                      {[...Array(3)].map((_, cellIndex) => (
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
                  <TableCell colSpan={5} className="h-24 text-center">
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
