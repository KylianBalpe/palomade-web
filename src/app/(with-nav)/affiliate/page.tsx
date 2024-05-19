"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { companyRequestForm } from "@/utils/form/company-form";
import { affiliationRequest } from "@/utils/services/company-service";

export default function Affiliate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState<boolean>(false);

  const form = useForm<z.infer<typeof companyRequestForm>>({
    resolver: zodResolver(companyRequestForm),
    defaultValues: {
      name: "",
      address: "",
      coordinates: "",
      description: "",
      requestedBy: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof companyRequestForm>) => {
    setIsLoading(true);
    try {
      const res = await affiliationRequest(values);

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        setIsLoading(false);
        return;
      }

      toast.success(response.message);
      setIsLoading(false);
      setIsMessage(true);
      form.reset();
    } catch (error) {
      toast.error("Failed to create affiliation request");
    }
    console.log(values);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 px-4 md:container">
      <div className="pt-14"></div>
      <Card className="my-4 w-full md:w-10/12 lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-xl">Create Affiliation Request</CardTitle>
          <CardDescription>
            Enter your company data that requested in this form bellow to
            request affiliation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input company name..."
                        {...field}
                        id="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="address">Company Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input company address..."
                        {...field}
                        id="address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="coordinates">
                      Company Location Coordinates
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input company location coordinates..."
                        {...field}
                        id="coordinates"
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">
                      Company Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input company description..."
                        {...field}
                        id="description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="requestedBy">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email..."
                        {...field}
                        id="requestedBy"
                      />
                    </FormControl>
                    <FormDescription>
                      *If you are requesting on behalf of the company, please
                      enter your email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" size={16} />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <AlertDialog open={isMessage} onOpenChange={setIsMessage}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Affiliation Request Sent!</AlertDialogTitle>
            <AlertDialogDescription>
              Kindly check your email for further information
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsMessage(!isMessage)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </main>
  );
}
