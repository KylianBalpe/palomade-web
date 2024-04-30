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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import toast, { Toaster } from "react-hot-toast";

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
  const [hasError, setHasError] = React.useState<string>("");

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const req = await fetch("https://api-service.palomade.my.id/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const res = await req.json();

      if (!res.errors) {
        toast.success("Account created successfully. Check your email to verify your account.");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        toast.error(res.errors);
      }
      setHasError(res.errors);
      return req;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      {hasError && (
        <Alert variant={"destructive"} className="mt-4 w-full md:w-10/12 lg:w-1/2 xl:w-1/3">
          <ExclamationTriangleIcon />
          <AlertTitle>{hasError}</AlertTitle>
          <AlertDescription>There was an error with your submission</AlertDescription>
        </Alert>
      )}
      <Card className="my-4 w-full md:w-10/12 lg:w-1/2 xl:w-1/3">
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
      <Toaster />
    </main>
  );
};

export default Register;
