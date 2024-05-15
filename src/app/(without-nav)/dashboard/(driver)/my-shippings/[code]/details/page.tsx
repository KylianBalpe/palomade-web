"use client";
import newFormatDate from "@/utils/helpers/helper";
import {
  createShippingDetail,
  finishShipping,
  getDriverShippingsDetail,
  startShipping,
} from "@/utils/services/shippings-service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoveLeft } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  detail: z.string().min(4),
  place_name: z.string().min(3),
});

type ShippingsByDriver = {
  code: string;
  companyId?: string;
  companyStringId?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  weight?: string;
  from: string;
  to: string;
  coordinates_start: string;
  coordinates_end: string;
  estimated_arrival?: string;
  createdAt: string;
  driverId?: number;
  driverName?: string;
  details?: Array<{
    place_name: string;
    coordinates: string;
    detail: string;
    createdAt: string;
  }>;
};

export default function Page() {
  const { data: session, status } = useSession();
  const [shippingsDetails, setShippingsDetails] = useState<ShippingsByDriver>();
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [confirmStart, setConfirmStart] = useState<boolean>(false);
  const [confirmFinsih, setConfirmFinish] = useState<boolean>(false);

  const params = useParams();

  const getShippingsDetails = async () => {
    try {
      if (status === "authenticated" && session) {
        const shippings = await getDriverShippingsDetail({
          token: session.user.access_token,
          code: params.code,
        });

        const data = shippings.data;

        setShippingsDetails(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShippingsDetails();
  }, [session]);

  const data = shippingsDetails;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      detail: "",
      place_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createShippingDetail(
        session?.user.companyStringId,
        params.code,
        session?.user.access_token,
        values,
      );

      const response = await res.json();
      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenUpdate(false);
      getShippingsDetails();
      return response;
    } catch (error) {
      console.error(error);
    }
    console.log(values);
  }

  async function onStart() {
    try {
      const res = await startShipping(
        session?.user.companyStringId,
        params.code,
        session?.user.access_token,
      );
      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      getShippingsDetails();
      setConfirmStart(false);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function onFinish() {
    try {
      const res = await finishShipping(
        session?.user.companyStringId,
        params.code,
        session?.user.access_token,
      );

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      getShippingsDetails();
      setConfirmFinish(false);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col space-y-4">
      <div className="flex flex-row items-center space-x-4">
        <Button size={"sm"} asChild>
          <Link href="/dashboard/my-shippings">
            <ArrowLeftIcon size={18} className="mr-1" /> Back
          </Link>
        </Button>
        <p>Shippings Details</p>
      </div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        {data !== undefined ? (
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
              <span
                className={`max-w-min rounded-md px-2 py-1 text-xs font-medium text-white ${data.status === "SHIPPING" ? "bg-yellow-500" : data.status === "FINISHED" ? "bg-green-500" : data.status === "CANCELED" ? "bg-red-500" : "bg-blue-500"}`}
              >
                {data.status}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="grid grid-cols-1 gap-4 rounded-md bg-gray-100 p-4 lg:grid-cols-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Shipping Code</p>
                  <p className="font-medium">{data.code}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Start</p>
                  <p className="font-medium">
                    {data.start_date ? newFormatDate(data.start_date) : ""}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Finish</p>
                  <p className="font-medium">
                    {data.end_date
                      ? newFormatDate(data.end_date)
                      : data.status === "SHIPPING"
                        ? "SHIPPING"
                        : data.status === "CANCELED"
                          ? "CANCELED"
                          : "PROCESSED"}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Estimated Arrival</p>
                  <p className="font-medium">
                    {data.estimated_arrival
                      ? newFormatDate(data.estimated_arrival)
                      : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 rounded-md bg-gray-100 p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">From</p>
                  <p className="font-medium">{data.from}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-gray-600">Destination</p>
                  <p className="font-medium">{data.to}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
              <p>Activity</p>
              {data.status === "SHIPPING" && (
                <div className="flex flex-row space-x-2">
                  <AlertDialog open={openUpdate} onOpenChange={setOpenUpdate}>
                    <AlertDialogTrigger asChild>
                      <Button size={"sm"}>Update Activity</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name="detail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Detail Activity</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Detail Acivity"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="place_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Place Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Place Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Button type="submit">Submit</Button>
                            </AlertDialogFooter>
                          </form>
                        </Form>
                      </AlertDialogHeader>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog
                    open={confirmFinsih}
                    onOpenChange={setConfirmFinish}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        size={"sm"}
                        className="bg-green-700 hover:bg-green-500"
                      >
                        Finish Shipping
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure you have finished shipping?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You can't undo this action.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={onFinish}>Continue</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            {data.details!.length < 1 ? (
              <div className="flex h-32 w-full flex-col items-center justify-center space-y-2 rounded-md bg-gray-100">
                <p className="text-gray-500">No activity yet</p>
                <AlertDialog open={confirmStart} onOpenChange={setConfirmStart}>
                  <AlertDialogTrigger asChild>
                    <Button>Start Shipping</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you really sure about starting shipping?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You can't undo this action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button onClick={onStart}>Continue</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="grid gap-4">
                {data.details?.map((detail, index, array) => (
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
