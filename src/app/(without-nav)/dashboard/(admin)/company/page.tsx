"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getCompany,
  updateInformation,
  uploadLogo,
} from "@/utils/services/company-service";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  companyLogo,
  updateCompanyAddressForm,
  updateCompanyCoordinatesForm,
  updateCompanyDescriptionForm,
  updateCompanyNameForm,
} from "@/utils/form/company-form";
import { Textarea } from "@/components/ui/textarea";
import { getUser } from "@/utils/services/user-service";
import CompanySekeleton from "./sekeleton";

type CompanyDetails = {
  id: number;
  companyId: string;
  name: string;
  logo: string;
  address: string;
  description: string;
  coordinates: string;
  requestedBy: string;
  employees: number;
  shippings: number;
  lands: number;
};

export default function CompanyDetails() {
  const { data: session, status, update } = useSession();
  const [companyDetail, setCompanyDetails] = useState<CompanyDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openChangeLogo, setOpenChangeLogo] = useState<boolean>(false);
  const [openEditInfo, setOpenEditInfo] = useState<boolean>(false);

  const getCompanyDetails = async () => {
    try {
      if (status === "authenticated" && session) {
        const res = await getCompany({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
        });

        const company = await res.json();
        setCompanyDetails(company.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyDetails();
  }, [session]);

  const logoForm = useForm<z.infer<typeof companyLogo>>({
    resolver: zodResolver(companyLogo),
  });

  const nameForm = useForm<z.infer<typeof updateCompanyNameForm>>({
    resolver: zodResolver(updateCompanyNameForm),
    defaultValues: {
      name: "",
    },
  });

  const addressForm = useForm<z.infer<typeof updateCompanyAddressForm>>({
    resolver: zodResolver(updateCompanyAddressForm),
    defaultValues: {
      address: "",
    },
  });

  const descriptionForm = useForm<z.infer<typeof updateCompanyDescriptionForm>>(
    {
      resolver: zodResolver(updateCompanyDescriptionForm),
      defaultValues: {
        description: "",
      },
    },
  );

  const coordinatesForm = useForm<z.infer<typeof updateCompanyCoordinatesForm>>(
    {
      resolver: zodResolver(updateCompanyCoordinatesForm),
      defaultValues: {
        coordinates: "",
      },
    },
  );

  const fileRef = logoForm.register("logo");

  async function onSubmitLogo(values: any) {
    const formData = new FormData();
    formData.append("logo", values.logo[0]);
    setIsLoading(true);

    try {
      if (status === "authenticated" && session) {
        const res = await uploadLogo({
          token: session?.user.access_token,
          companyId: session?.user.companyStringId,
          logo: formData,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        toast.success(response.message);
        getCompanyDetails();
        setOpenChangeLogo(false);
        logoForm.reset();
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onUpdateName = async (
    values: z.infer<typeof updateCompanyNameForm>,
  ) => {
    try {
      if (status === "authenticated" && session) {
        const res = await updateInformation({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        toast.success(response.message);
        getCompanyDetails();
        setOpenEditInfo(false);
        nameForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateAddress = async (
    values: z.infer<typeof updateCompanyAddressForm>,
  ) => {
    try {
      if (status === "authenticated" && session) {
        const res = await updateInformation({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        toast.success(response.message);
        getCompanyDetails();
        setOpenEditInfo(false);
        addressForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateDescription = async (
    values: z.infer<typeof updateCompanyDescriptionForm>,
  ) => {
    try {
      if (status === "authenticated" && session) {
        const res = await updateInformation({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        toast.success(response.message);
        getCompanyDetails();
        setOpenEditInfo(false);
        descriptionForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCoordinates = async (
    values: z.infer<typeof updateCompanyCoordinatesForm>,
  ) => {
    try {
      if (status === "authenticated" && session) {
        const res = await updateInformation({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        toast.success(response.message);
        getCompanyDetails();
        setOpenEditInfo(false);
        coordinatesForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div>Company</div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md md:p-8 lg:justify-start">
        {companyDetail ? (
          <>
            <div className="flex h-full flex-col items-center space-y-4 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
              <Image
                src={companyDetail.logo || "/images/company-logo.png"}
                alt="company-logo"
                width={400}
                height={400}
                className="aspect-square h-auto w-[400px] rounded-lg object-cover"
                priority={true}
              />
              <div className="flex w-full flex-col justify-between space-y-8">
                <div className="flex w-full flex-col items-center justify-center space-y-2 lg:items-start">
                  <p className="rounded-sm bg-gray-100 px-2 py-1 text-sm text-gray-600">
                    ID: {companyDetail.companyId}
                  </p>
                  <p className="text-lg font-semibold lg:text-2xl">
                    {companyDetail.name}
                  </p>
                  <p>{companyDetail.address}</p>
                  <p>{companyDetail.description}</p>
                  <p className="text-center lg:text-start">
                    Coordinates: {companyDetail.coordinates}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
                  <AlertDialog
                    open={openChangeLogo}
                    onOpenChange={setOpenChangeLogo}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant={"outline"}>Change Logo</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Change Profile Picture
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Form {...logoForm}>
                        <form
                          onSubmit={logoForm.handleSubmit(onSubmitLogo)}
                          className="space-y-8"
                        >
                          <FormField
                            control={logoForm.control}
                            name="logo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    id="logo"
                                    className="cursor-pointer"
                                    accept="image/*"
                                    {...fileRef}
                                    onChange={(event) => {
                                      field.onChange(
                                        event.target?.files?.[0] ?? undefined,
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              type="submit"
                              disabled={
                                !logoForm.getValues("logo") || isLoading
                              }
                            >
                              Update
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </Form>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog
                    open={openEditInfo}
                    onOpenChange={setOpenEditInfo}
                  >
                    <AlertDialogTrigger asChild>
                      <Button>Edit Information</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="h-screen overflow-y-scroll md:h-min md:overflow-hidden">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Edit Company Information
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <Form {...nameForm}>
                        <form
                          onSubmit={nameForm.handleSubmit(onUpdateName)}
                          className="space-y-8"
                        >
                          <FormField
                            control={nameForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="name">
                                  Company Name
                                </FormLabel>
                                <FormControl>
                                  <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                    <Input
                                      id="name"
                                      placeholder="Enter new company name"
                                      {...field}
                                    />
                                    <Button
                                      type="submit"
                                      disabled={!nameForm.formState.isDirty}
                                    >
                                      Update
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                      <Form {...addressForm}>
                        <form
                          onSubmit={addressForm.handleSubmit(onUpdateAddress)}
                          className="space-y-8"
                        >
                          <FormField
                            control={addressForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <FormControl>
                                  <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                    <Textarea
                                      id="address"
                                      placeholder="Enter new company address"
                                      {...field}
                                    />
                                    <Button
                                      type="submit"
                                      disabled={!addressForm.formState.isDirty}
                                    >
                                      Update
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                      <Form {...descriptionForm}>
                        <form
                          onSubmit={descriptionForm.handleSubmit(
                            onUpdateDescription,
                          )}
                          className="space-y-8"
                        >
                          <FormField
                            control={descriptionForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="description">
                                  Description
                                </FormLabel>
                                <FormControl>
                                  <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                    <Textarea
                                      id="description"
                                      placeholder="Enter new company description"
                                      {...field}
                                    />
                                    <Button
                                      type="submit"
                                      disabled={
                                        !descriptionForm.formState.isDirty
                                      }
                                    >
                                      Update
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                      <Form {...coordinatesForm}>
                        <form
                          onSubmit={coordinatesForm.handleSubmit(
                            onUpdateCoordinates,
                          )}
                          className="space-y-8"
                        >
                          <FormField
                            control={coordinatesForm.control}
                            name="coordinates"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="coordinates">
                                  Coordinates
                                </FormLabel>
                                <FormControl>
                                  <div className="flex w-full flex-col items-end space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0">
                                    <Input
                                      id="coordinates"
                                      placeholder="Enter new company coordinates"
                                      {...field}
                                    />
                                    <Button
                                      type="submit"
                                      disabled={
                                        !coordinatesForm.formState.isDirty
                                      }
                                    >
                                      Update
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
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="flex flex-col space-y-1 rounded-md bg-gray-100 p-4">
                <p className="text-lg text-gray-600">Employees</p>
                <p className="text-xl font-semibold">
                  {companyDetail.employees}
                </p>
              </div>
              <div className="flex flex-col space-y-1 rounded-md bg-gray-100 p-4">
                <p className="text-lg text-gray-600">Shipment</p>
                <p className="text-xl font-semibold">
                  {companyDetail.shippings}
                </p>
              </div>
              <div className="flex flex-col space-y-1 rounded-md bg-gray-100 p-4">
                <p className="text-lg text-gray-600">Lands</p>
                <p className="text-xl font-semibold">{companyDetail.lands}</p>
              </div>
            </div>
          </>
        ) : isLoading ? (
          <CompanySekeleton />
        ) : (
          <p>404 not found</p>
        )}
      </div>
      <Toaster />
    </main>
  );
}
