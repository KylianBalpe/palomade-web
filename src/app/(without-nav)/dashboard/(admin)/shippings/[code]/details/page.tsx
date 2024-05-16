"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  getCompanyShippingsDetail,
  updateShipping,
  assignDriverToShippings,
  getAvailableDrivers,
} from "@/utils/services/shippings-service";
import { getCompanyLands } from "@/utils/services/land-service";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon, Truck, TruckIcon } from "lucide-react";
import newFormatDate from "@/utils/helpers/helper";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

type ShippingDetails = {
  code: string;
  status: string;
  driverId?: number;
  driverName?: string;
  weight: number;
  landId: number;
  coordinates_start: string;
  coordinates_end: string;
  createdAt: string;
  estimated_arrival?: string;
  start_date?: string;
  end_date?: string;
  from: string;
  to: string;
  details?: Array<{
    place_name: string;
    detail: string;
    createdAt: string;
  }>;
};

type CompanyLands = {
  id: number;
  name: string;
  address: string;
  coordinates: String;
};

type Driver = {
  driverId: number;
  email: string;
  name: string;
};

const weightForm = z.object({
  weight: z
    .string({
      required_error: "Please enter the weight of the shipping",
      message: "Weight cannot be 0",
    })
    .transform((v) => Number(v) || 0)
    .refine((v) => v !== 0, {
      message: "Weight cannot be 0",
    })
    .optional(),
});

const startForm = z.object({
  landId: z
    .string({
      required_error: "Please select land where the shipping come from",
    })
    .transform((v) => Number(v) || 0)
    .optional(),
});

const assignDriver = z.object({
  email: z.string({
    required_error: "Please select a driver!",
  }),
});

export default function Page() {
  const { data: session, status } = useSession();
  const params = useParams();
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>();
  const [companyLands, setCompanyLands] = useState<CompanyLands[]>([]);
  const [openWeight, setOpenWeight] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [openAssignDriver, setOpenAssignDriver] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const getShippingsDetails = async () => {
    try {
      if (status === "authenticated" && session) {
        const shippings = await getCompanyShippingsDetail({
          token: session.user.access_token,
          companyId: session.user.companyStringId as string,
          code: params.code as string,
        });

        const data = shippings.data;

        setShippingDetails(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getShippingsDetails();
    toast.dismiss();
  }, [session]);

  const getLands = async () => {
    try {
      if (status === "authenticated" && session) {
        const lands = await getCompanyLands({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
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

  const availableDrivers = async () => {
    try {
      if (status === "authenticated" && session) {
        const drivers = await getAvailableDrivers({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
        });

        const driver = await drivers.json();
        setDrivers(driver.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    availableDrivers();
  }, [session]);

  const updateWeightForm = useForm<z.infer<typeof weightForm>>({
    resolver: zodResolver(weightForm),
    defaultValues: {
      weight: 0,
    },
  });

  const updateStartForm = useForm<z.infer<typeof startForm>>({
    resolver: zodResolver(startForm),
    defaultValues: {
      landId: 0,
    },
  });

  const assignDriverForm = useForm<z.infer<typeof assignDriver>>({
    resolver: zodResolver(assignDriver),
    defaultValues: {
      email: "",
    },
  });

  const onUpdateWeight = async (values: z.infer<typeof weightForm>) => {
    try {
      if (status === "authenticated" && session) {
        const res = await updateShipping({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          code: params.code as string,
          values: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        toast.success(response.message);
        setOpenWeight(false);
        getShippingsDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateStart = async (values: z.infer<typeof startForm>) => {
    try {
      if (status === "authenticated" && session) {
        const res = await updateShipping({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          code: params.code as string,
          values: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        toast.success(response.message);
        setOpenStart(false);
        getShippingsDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAssignDriver = async (values: z.infer<typeof assignDriver>) => {
    try {
      if (status === "authenticated" && session) {
        const res = await assignDriverToShippings({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          code: params.code as string,
          email: values.email,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        toast.success(response.message);
        setOpenAssignDriver(false);
        getShippingsDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shippingData = shippingDetails;
  const lands = companyLands;
  const driversData = drivers;

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div className="flex flex-row items-center space-x-2">
        <Button size={"sm"} asChild>
          <Link href="/dashboard/shippings">
            <ArrowLeftIcon size={18} className="mr-1" /> Back
          </Link>
        </Button>
        <p>Detail Shippings</p>
      </div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        {shippingData !== undefined ? (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
              <Badge variant={"lg"}>{shippingData.status}</Badge>
              <div className="flex flex-row space-x-2">
                {!shippingData.driverId && (
                  <AlertDialog
                    open={openAssignDriver}
                    onOpenChange={setOpenAssignDriver}
                  >
                    <AlertDialogTrigger asChild>
                      <Button size={"sm"}>
                        <TruckIcon size={12} className="mr-2" />
                        Assign Driver
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Assign Driver to Shipping
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Form {...assignDriverForm}>
                        <form
                          onSubmit={assignDriverForm.handleSubmit(
                            onAssignDriver,
                          )}
                          className="space-y-4"
                        >
                          <FormField
                            control={assignDriverForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Driver</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select driver" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {driversData.length < 1 ? (
                                      <SelectItem
                                        value="disabled"
                                        disabled={true}
                                      >
                                        No available drivers
                                      </SelectItem>
                                    ) : (
                                      driversData.map((driver, index) => (
                                        <SelectItem
                                          key={index}
                                          value={driver.email}
                                        >
                                          {driver.name}
                                        </SelectItem>
                                      ))
                                    )}
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
                              disabled={!assignDriverForm.formState.isDirty}
                            >
                              Assign
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </Form>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {shippingData.status === "PROCESSED" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={"sm"}>
                        <PencilIcon size={12} className="mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>What you want to edit?</DialogTitle>
                        <DialogDescription>
                          You can edit the weight or the start location of the
                          shipping
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="justify-center">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => setOpenWeight(!openWeight)}
                          >
                            Weight
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => setOpenStart(!openStart)}
                          >
                            Start Location
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <AlertDialog open={openWeight} onOpenChange={setOpenWeight}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Weight</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Form {...updateWeightForm}>
                      <form
                        onSubmit={updateWeightForm.handleSubmit(onUpdateWeight)}
                        className="space-y-4"
                      >
                        <FormField
                          control={updateWeightForm.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="weight">
                                Shipping Weight
                              </FormLabel>
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
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button
                            type="submit"
                            disabled={!updateWeightForm.formState.isDirty}
                          >
                            Update
                          </Button>
                        </AlertDialogFooter>
                      </form>
                    </Form>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog open={openStart} onOpenChange={setOpenStart}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Edit Shipping Start Location
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <Form {...updateStartForm}>
                      <form
                        onSubmit={updateStartForm.handleSubmit(onUpdateStart)}
                        className="space-y-4"
                      >
                        <FormField
                          control={updateStartForm.control}
                          name="landId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Where Shipping Start</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                // @ts-ignore
                                defaultValue={field.value.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select location" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {lands.map((land, index) => (
                                    <SelectItem
                                      key={index}
                                      value={land.id.toString()}
                                    >
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
                            disabled={!updateStartForm.formState.isDirty}
                          >
                            Update
                          </Button>
                        </AlertDialogFooter>
                      </form>
                    </Form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="grid grid-cols-1 gap-4 rounded-md bg-gray-100 p-4 lg:grid-cols-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Shipping Code</p>
                  <p className="font-medium">{shippingData.code}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Start</p>
                  <p className="font-medium">
                    {shippingData.start_date
                      ? newFormatDate(shippingData.start_date)
                      : shippingData.status === "SHIPPING"
                        ? "SHIPPING"
                        : shippingData.status === "CANCELLED"
                          ? "CANCELLED"
                          : "PROCESSED"}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Finish</p>
                  <p className="font-medium">
                    {shippingData.end_date
                      ? newFormatDate(shippingData.end_date)
                      : shippingData.status === "SHIPPING"
                        ? "SHIPPING"
                        : shippingData.status === "CANCELLED"
                          ? "CANCELLED"
                          : "PROCESSED"}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Estimated Arrival</p>
                  <p className="font-medium">
                    {shippingData.estimated_arrival
                      ? newFormatDate(shippingData.estimated_arrival)
                      : shippingData.status === "SHIPPING"
                        ? "SHIPPING"
                        : shippingData.status === "CANCELLED"
                          ? "CANCELLED"
                          : "PROCESSED"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 rounded-md bg-gray-100 p-4 lg:grid-cols-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">From</p>
                  <p className="font-medium">{shippingData.from}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Destination</p>
                  <p className="font-medium">{shippingData.to}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Driver</p>
                  <p className="font-medium">
                    {shippingData.driverName ? (
                      shippingData.driverName
                    ) : shippingData.status === "CANCELLED" ? (
                      <span className="text-muted-foreground">
                        Not assigned yet
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Not assigned yet
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Weight</p>
                  <p className="font-medium">{shippingData.weight} Ton</p>
                </div>
              </div>
            </div>
            <p>Activity</p>
            {shippingData.details!.length < 1 ? (
              <div className="flex h-20 w-full flex-col items-center justify-center space-y-2 rounded-md bg-gray-100">
                <p className="text-gray-500">No activity yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {shippingData.details?.map((detail, index, array) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative flex h-full w-6 flex-col items-center">
                      <div
                        className={`absolute top-0 h-full w-[2px] ${index === array.length - 1 ? "bg-zinc-950" : "bg-gray-300"}`}
                      />
                      <div
                        className={`relative z-10 h-6 w-6 rounded-full ${index === array.length - 1 ? "bg-zinc-950" : "bg-gray-300"}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-medium">{detail.detail}</h3>
                      <p>{detail.place_name}</p>
                      <p className="text-sm text-gray-600 ">
                        {newFormatDate(detail.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>404 not found</p>
        )}
      </div>
      <Toaster />
    </main>
  );
}
