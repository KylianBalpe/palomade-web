"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("https://api-service.palomade.my.id/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();

      if (res.ok) {
        toast.success(response.message);
      } else {
        toast.error(response.errors);
      }
      return;
    } catch (e) {
      console.error(e);
    }
    console.log(values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      <Card className="my-4 w-full md:w-10/12 lg:w-1/2 xl:w-1/3">
        <CardHeader>
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to reset password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center justify-between">
                <Button type="submit">Submit</Button>
                <Link href="/login" className="text-sm hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster toastOptions={{ duration: 5000 }} />
    </main>
  );
};

export default ForgotPassword;
