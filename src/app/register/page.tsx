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
    username: z.string().min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const Register = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = React.useState<boolean>(true);
  const [isConfirmPassword, setIsConfirmPassword] = React.useState<boolean>(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
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
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>Enter your email and password to create account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your username..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center justify-center">
                        <Input
                          type={isPassword ? "password" : "text"}
                          placeholder="Type your password..."
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
                          placeholder="Retype your password..."
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
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center space-y-6">
          <div className="relative flex w-full items-center justify-center">
            <div className="absolute flex w-full items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center">
              <p className="bg-background px-2 text-sm text-muted-foreground md:text-base">Already have an account?</p>
            </div>
          </div>
          <Button asChild className="w-full" variant={"outline"}>
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Register;
