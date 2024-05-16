"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getUser,
  updateUser,
  uploadImage,
} from "@/utils/services/user-service";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const firstName = z.object({
  first_name: z.string().min(3).max(30).optional(),
});

const lastName = z.object({
  last_name: z.string().min(1).max(30).optional(),
});

const userName = z.object({
  username: z.string().min(1).optional(),
});

const profilePicture = z.object({
  image: z.any().optional(),
});

export default function Profile() {
  const { data: session, status, update } = useSession();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [openFirstName, setOpenFirstName] = useState<boolean>(false);
  const [openLastName, setOpenLastName] = useState<boolean>(false);
  const [openUserName, setOpenUserName] = useState<boolean>(false);
  const [openChangePicture, setOpenChangePicture] = useState<boolean>(false);

  const firstNameForm = useForm<z.infer<typeof firstName>>({
    resolver: zodResolver(firstName),
    defaultValues: {
      first_name: "",
    },
  });

  const lastNameForm = useForm<z.infer<typeof lastName>>({
    resolver: zodResolver(lastName),
    defaultValues: {
      last_name: "",
    },
  });

  const userNameForm = useForm<z.infer<typeof userName>>({
    resolver: zodResolver(userName),
    defaultValues: {
      username: "",
    },
  });

  const pictureForm = useForm<z.infer<typeof profilePicture>>({
    resolver: zodResolver(profilePicture),
  });

  async function onSubmitFirstName(values: z.infer<typeof firstName>) {
    try {
      if (status === "authenticated" && session) {
        const res = await updateUser({
          token: session.user.access_token,
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
        setOpenFirstName(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmitLastName(values: z.infer<typeof lastName>) {
    try {
      if (status === "authenticated" && session) {
        const res = await updateUser({
          token: session.user.access_token,
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
        setOpenLastName(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmitUserName(values: z.infer<typeof userName>) {
    try {
      if (status === "authenticated" && session) {
        const res = await updateUser({
          token: session.user.access_token,
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
        setOpenUserName(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fileRef = pictureForm.register("image");

  async function onSubmitPicture(values: any) {
    const formData = new FormData();
    formData.append("image", values.image[0]);

    try {
      if (status === "authenticated" && session) {
        const res = await uploadImage({
          token: session?.user.access_token,
          image: formData,
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
        setOpenChangePicture(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col space-y-2 md:space-y-4">
      <div>Profile</div>
      <div className="flex flex-col space-y-8 rounded-md border p-4 shadow-md md:p-8 lg:flex-row lg:justify-start lg:space-x-8 lg:space-y-0 xl:space-x-8">
        <div className="flex flex-col items-center justify-center space-y-8 lg:justify-between lg:space-y-0">
          <p className="font-semibold">Profile Picture</p>
          {status === "loading" || !update ? (
            <div className="flex h-[180px] w-[180px] animate-pulse rounded-full bg-gray-300" />
          ) : (
            <Image
              src={session?.user.picture}
              alt="profile-picture"
              width={180}
              height={180}
              className="h-[180px] w-[180px] rounded-full object-cover"
              priority={true}
            />
          )}
          <AlertDialog
            open={openChangePicture}
            onOpenChange={setOpenChangePicture}
          >
            <AlertDialogTrigger asChild>
              <Button variant={"outline"}>Change Profile Picture</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Profile Picture</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...pictureForm}>
                <form
                  onSubmit={pictureForm.handleSubmit(onSubmitPicture)}
                  className="space-y-8"
                >
                  <FormField
                    control={pictureForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Picture</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
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
                    {!pictureForm.getValues("image") ? (
                      <AlertDialogAction disabled>Update</AlertDialogAction>
                    ) : (
                      <Button type="submit">Update</Button>
                    )}
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex w-full flex-col justify-between space-y-8 lg:space-y-0">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col space-y-2">
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">First Name</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p className="truncate">{session?.user?.first_name}</p>
                      <AlertDialog
                        open={openFirstName}
                        onOpenChange={setOpenFirstName}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            className="px-2"
                          >
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit First Name</AlertDialogTitle>
                          </AlertDialogHeader>
                          <Form {...firstNameForm}>
                            <form
                              onSubmit={firstNameForm.handleSubmit(
                                onSubmitFirstName,
                              )}
                              className="space-y-8"
                            >
                              <FormField
                                control={firstNameForm.control}
                                name="first_name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="First Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                {!firstNameForm.getValues("first_name") ? (
                                  <AlertDialogAction disabled>
                                    Update
                                  </AlertDialogAction>
                                ) : (
                                  <Button type="submit">Update</Button>
                                )}
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">Last Name</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.last_name}</p>
                      <AlertDialog
                        open={openLastName}
                        onOpenChange={setOpenLastName}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            className="px-2"
                          >
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                          </AlertDialogHeader>
                          <Form {...lastNameForm}>
                            <form
                              onSubmit={lastNameForm.handleSubmit(
                                onSubmitLastName,
                              )}
                              className="space-y-8"
                            >
                              <FormField
                                control={lastNameForm.control}
                                name="last_name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Last Name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                {!lastNameForm.getValues("last_name") ? (
                                  <AlertDialogAction disabled>
                                    Update
                                  </AlertDialogAction>
                                ) : (
                                  <Button type="submit">Update</Button>
                                )}
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">Username</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.username}</p>
                      <AlertDialog
                        open={openUserName}
                        onOpenChange={setOpenUserName}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            className="px-2"
                          >
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit Username</AlertDialogTitle>
                          </AlertDialogHeader>
                          <Form {...userNameForm}>
                            <form
                              onSubmit={userNameForm.handleSubmit(
                                onSubmitUserName,
                              )}
                              className="space-y-8"
                            >
                              <FormField
                                control={userNameForm.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="New username"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                {!userNameForm.getValues("username") ? (
                                  <AlertDialogAction disabled>
                                    Update
                                  </AlertDialogAction>
                                ) : (
                                  <Button type="submit">Update</Button>
                                )}
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">Email</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.email}</p>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">Company</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.companyName}</p>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">Company Code</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.companyStringId}</p>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
              <div className="flex h-16 flex-col space-y-1">
                <div className="flex h-full flex-col">
                  <p className="font-semibold">Role</p>
                  {status === "loading" || !update ? (
                    <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
                  ) : (
                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.role}</p>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
              <div className="flex h-16 flex-col justify-center space-y-1">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"outline"} className="max-w-min">
                      Change Password
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
