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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: "Password cannot be empty" }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState<boolean>(true);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    router.push("/dashboard");
    console.log(values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      <Card className="my-4 w-full md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>Enter your email and password to login</CardDescription>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center justify-center">
                        <Input
                          type={password ? "password" : "text"}
                          placeholder="password"
                          {...field}
                          className="flex items-center"
                          id="password"
                        />
                        {password ? (
                          <Eye
                            size={18}
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setPassword(!password)}
                          />
                        ) : (
                          <EyeOff
                            size={18}
                            className="absolute right-4 cursor-pointer"
                            onClick={() => setPassword(!password)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <Link href="/forgot-password" className="mt-2 flex justify-end text-sm hover:underline">
              Forgot password?
            </Link>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center space-y-6">
          <div className="relative flex w-full items-center justify-center">
            <div className="absolute flex w-full items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center">
              <p className="bg-background px-2 text-sm text-muted-foreground md:text-base">
                Don't have an account yet?
              </p>
            </div>
          </div>
          <Button asChild className="w-full" variant={"outline"}>
            <Link href="/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
