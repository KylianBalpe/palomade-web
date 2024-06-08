"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
import {
  assignDriver,
  startForm,
  weightForm,
} from "@/utils/form/shippings-form";
import ShippingDetailSkeleton from "./skeleton";
import DetailData from "@/components/molecules/DetailData";

type ShippingDetails = {
  code: string;
  status: string;
  driverId?: number;
  driverName?: string;
  weight: number;
  landId: number;
  distance: number;
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
  landStringId: string;
  name: string;
  address: string;
  coordinates: String;
};

type Driver = {
  driverId: number;
  email: string;
  name: string;
};

export default function Page() {
  const { data: session, status } = useSession();
  const params = useParams();
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>();
  const [companyLands, setCompanyLands] = useState<CompanyLands[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAssignDriver, setOpenAssignDriver] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getShippingsDetails = async () => {
    setIsLoading(true);
    try {
      if (status === "authenticated" && session) {
        const res = await getCompanyShippingsDetail({
          token: session.user.access_token,
          companyId: session.user.companyStringId as string,
          code: params.code as string,
        });

        const shippings = await res.json();

        if (res.status !== 200) {
          setIsLoading(false);
          return;
        }

        const data = shippings.data;

        setShippingDetails(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShippingsDetails();
  }, [session]);

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
  });

  const assignDriverForm = useForm<z.infer<typeof assignDriver>>({
    resolver: zodResolver(assignDriver),
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
        setOpenEdit(false);
        updateWeightForm.reset();
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
        setOpenEdit(false);
        updateStartForm.reset();
        getShippingsDetails();
      }
    } catch (error) {
      console.error(error);
    }
    console.log(values);
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
        assignDriverForm.reset();
        getShippingsDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shippingData = shippingDetails;
  const lands = companyLands;
  const driversData = drivers;

  let shippingStart = "";
  let shippingFinish = "";
  let shippingEstimatedArrival = "";
  let shippingDriver = "" as string | JSX.Element;

  if (shippingData) {
    shippingStart = shippingData.start_date
      ? newFormatDate(shippingData.start_date)
      : shippingData.status === "SHIPPING"
        ? "SHIPPING"
        : shippingData.status === "CANCELLED"
          ? "CANCELLED"
          : "PROCESSED";

    shippingFinish = shippingData.end_date
      ? newFormatDate(shippingData.end_date)
      : shippingData.status === "SHIPPING"
        ? "SHIPPING"
        : shippingData.status === "CANCELLED"
          ? "CANCELLED"
          : "PROCESSED";

    shippingEstimatedArrival = shippingData.estimated_arrival
      ? newFormatDate(shippingData.estimated_arrival)
      : shippingData.status === "SHIPPING"
        ? "SHIPPING"
        : shippingData.status === "CANCELLED"
          ? "CANCELLED"
          : "PROCESSED";

    shippingDriver = shippingData.driverName ? (
      shippingData.driverName
    ) : shippingData.status === "CANCELLED" ? (
      <span className="text-muted-foreground">Not assigned yet</span>
    ) : (
      <span className="text-muted-foreground">Not assigned yet</span>
    );
  }
  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div className="flex flex-row items-center space-x-2">
        {isLoading ? (
          <Button size={"sm"} disabled>
            <ArrowLeftIcon size={18} className="mr-1" /> Back
          </Button>
        ) : (
          <Button size={"sm"} asChild>
            <Link href="/dashboard/shippings">
              <ArrowLeftIcon size={18} className="mr-1" /> Back
            </Link>
          </Button>
        )}
        <p>Detail Shippings</p>
      </div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        {shippingData ? (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <Badge variant={"lg"}>{shippingData.status}</Badge>
              <div className="flex flex-row space-x-2">
                {!shippingData.driverId &&
                shippingData.status !== "CANCELLED" ? (
                  <AlertDialog
                    open={openAssignDriver}
                    onOpenChange={setOpenAssignDriver}
                  >
                    <AlertDialogTrigger asChild>
                      <Button size={"sm"}>
                        <TruckIcon size={12} className="mr-2" /> Assign Driver
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
                            <Button type="submit" disabled={isLoading}>
                              Assign
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </Form>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  ""
                )}
                {shippingData.status === "PROCESSED" && (
                  <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                      <Button size={"sm"}>
                        <PencilIcon size={12} className="mr-2" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Shippings</DialogTitle>
                      </DialogHeader>
                      <Form {...updateWeightForm}>
                        <form
                          onSubmit={updateWeightForm.handleSubmit(
                            onUpdateWeight,
                          )}
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
                                  <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                    <Input
                                      id="weight"
                                      placeholder="Enter weight of the shipping"
                                      {...field}
                                    />
                                    <Button type="submit" disabled={isLoading}>
                                      Update
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Input number only. ex: 5
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
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
                                <FormLabel htmlFor="landId">
                                  Select Where Shipping Start
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                      <SelectTrigger>
                                        <SelectValue
                                          id="landId"
                                          placeholder="Select location"
                                        />
                                      </SelectTrigger>
                                      <Button
                                        type="submit"
                                        disabled={isLoading}
                                      >
                                        Update
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <SelectContent>
                                    {lands.map((land, index) => (
                                      <SelectItem
                                        key={index}
                                        value={land.landStringId}
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
                        </form>
                      </Form>
                      <DialogFooter className="justify-center">
                        <DialogClose asChild>
                          <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="grid grid-cols-1 gap-4 rounded-md bg-gray-100 p-4 lg:grid-cols-2">
                <DetailData title="Shipping Code" data={shippingData.code} />
                <DetailData title="Start" data={shippingStart} />
                <DetailData title="Finish" data={shippingFinish} />
                <DetailData
                  title="Estimated Arrival"
                  data={shippingEstimatedArrival}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 rounded-md bg-gray-100 p-4 lg:grid-cols-3">
                <DetailData title="From" data={shippingData.from} />
                <DetailData title="Destination" data={shippingData.to} />
                <DetailData
                  title="Distance"
                  data={`${shippingData.distance} KM`}
                />
                <DetailData title="Driver" data={shippingDriver} />
                <DetailData
                  title="Weight"
                  data={`${shippingData.weight} Ton`}
                />
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
        ) : isLoading ? (
          <ShippingDetailSkeleton />
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src="/notfound.png"
              alt="404 Not Found"
              width={640}
              height={360}
              priority={true}
            />
          </div>
        )}
      </div>
    </main>
  );
}
