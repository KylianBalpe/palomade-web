"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCompany, uploadLogo } from "@/utils/services/company-service";
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
import { companyLogo } from "@/utils/form/company-form";

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
};

export default function CompanyDetails() {
  const { data: session, status } = useSession();
  const [companyDetail, setCompanyDetails] = useState<CompanyDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openChangeLogo, setOpenChangeLogo] = useState<boolean>(false);

  const getCompanyDetails = async () => {
    setIsLoading(true);
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

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div>Company</div>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md md:p-8 lg:justify-start">
        <div className="flex h-full flex-col items-center space-y-4 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
          <Image
            src={companyDetail?.logo || "/images/company-logo.png"}
            alt="company-logo"
            width={400}
            height={400}
            className="aspect-square h-auto w-[400px] rounded-lg object-cover"
            priority={true}
          />
          <div className="flex w-full flex-col justify-between space-y-8">
            <div className="flex w-full flex-col items-start justify-center space-y-2">
              <p className="text-lg font-semibold lg:text-2xl">
                {companyDetail?.name}
              </p>
              <p className="rounded-sm bg-zinc-200 px-2 py-1 text-base text-zinc-600 lg:text-lg">
                ID: {companyDetail?.companyId}
              </p>
              <p>{companyDetail?.address}</p>
              <p>{companyDetail?.description}</p>
              <p>Coordinates: {companyDetail?.coordinates}</p>
              <div className="flex flex-row items-center space-x-2">
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
                            disabled={!logoForm.getValues("logo") || isLoading}
                          >
                            Update
                          </Button>
                        </AlertDialogFooter>
                      </form>
                    </Form>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Edit Information</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Edit Company Information
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
                            disabled={!logoForm.getValues("logo")}
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
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 rounded-md bg-zinc-200 p-4">
                <p className="text-lg text-zinc-600">Employees</p>
                <p className="text-xl font-medium">
                  {companyDetail?.employees}
                </p>
              </div>
              <div className="flex flex-col space-y-2 rounded-md bg-zinc-200 p-4">
                <p className="text-lg text-zinc-600">Shipment</p>
                <p className="text-xl font-medium">
                  {companyDetail?.shippings}
                </p>
              </div>
              <div className="flex flex-col space-y-2 rounded-md bg-zinc-200 p-4">
                <p className="text-lg text-zinc-600">Employees</p>
                <p className="text-xl font-medium">
                  {companyDetail?.employees}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
