"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const ResetPassword = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = React.useState<boolean>(true);
  const [isConfirmPassword, setIsConfirmPassword] = React.useState<boolean>(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    router.push("/login");
    console.log(values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      <Card className="my-4 w-full md:w-1/3">
        <CardHeader>
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center justify-center">
                        <Input
                          type={isPassword ? "password" : "text"}
                          placeholder="Type your new password..."
                          {...field}
                          className="flex items-center"
                          id="password"
                        />
                        {isPassword ? (
                          <Eye
                            size={18}
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setIsPassword(!isPassword)}
                          />
                        ) : (
                          <EyeOff
                            size={18}
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setIsPassword(!isPassword)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirm_password">Password Confirmation</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center justify-center">
                        <Input
                          type={isConfirmPassword ? "password" : "text"}
                          placeholder="Retype your new password..."
                          {...field}
                          className="flex items-center"
                          id="confirm_password"
                        />
                        {isConfirmPassword ? (
                          <Eye
                            size={18}
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                          />
                        ) : (
                          <EyeOff
                            size={18}
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                          />
                        )}
                      </div>
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
    </main>
  );
};

export default ResetPassword;
