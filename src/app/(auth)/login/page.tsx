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
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: "Password cannot be empty" }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        setIsLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      <Card className="my-4 w-full md:w-10/12 lg:w-1/2 xl:w-1/3">
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
                          placeholder="Type your password..."
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
              {isLoading ? (
                <Button disabled className="flex w-full animate-pulse flex-row items-center gap-1">
                  <LoaderCircle className="animate-spin" size={16} />
                  Login
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
            </form>
            <div className="mt-2 flex justify-end">
              <Link href="/forgot-password" className="text-sm hover:underline">
                Forgot password?
              </Link>
            </div>
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
      </Card>{" "}
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
    </main>
  );
};

export default Login;
