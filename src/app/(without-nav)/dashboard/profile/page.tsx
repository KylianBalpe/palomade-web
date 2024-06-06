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
  updatePassword,
  updateUser,
  uploadImage,
} from "@/utils/services/user-service";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
  firstName,
  lastName,
  userName,
  profilePicture,
  newPassword,
} from "@/utils/form/user-form";
import { Eye, EyeOff } from "lucide-react";
import ProfileSkeleton from "./skeleton";

export default function Profile() {
  const { data: session, status, update } = useSession();
  const [openFirstName, setOpenFirstName] = useState<boolean>(false);
  const [openLastName, setOpenLastName] = useState<boolean>(false);
  const [openUserName, setOpenUserName] = useState<boolean>(false);
  const [openChangePicture, setOpenChangePicture] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [isNewPassword, setIsNewPassword] = useState<boolean>(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);
  const [isOldPassword, setIsOldPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const changePasswordForm = useForm<z.infer<typeof newPassword>>({
    resolver: zodResolver(newPassword),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmitFirstName(values: z.infer<typeof firstName>) {
    setIsLoading(true);
    try {
      if (status === "authenticated" && session) {
        const res = await updateUser({
          token: session.user.access_token,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          setIsLoading(false);

          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        setOpenFirstName(false);
        toast.success(response.message);
        setIsLoading(false);
        firstNameForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmitLastName(values: z.infer<typeof lastName>) {
    setIsLoading(true);
    try {
      if (status === "authenticated" && session) {
        const res = await updateUser({
          token: session.user.access_token,
          data: values,
        });

        const response = await res.json();
        if (res.status !== 200) {
          toast.error(response.errors);
          setIsLoading(false);

          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        setOpenLastName(false);
        toast.success(response.message);
        setIsLoading(false);
        lastNameForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmitUserName(values: z.infer<typeof userName>) {
    setIsLoading(true);
    try {
      if (status === "authenticated" && session) {
        const res = await updateUser({
          token: session.user.access_token,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          setIsLoading(false);

          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        setOpenUserName(false);
        toast.success(response.message);
        setIsLoading(false);
        userNameForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fileRef = pictureForm.register("image");

  async function onSubmitPicture(values: any) {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    setIsLoading(true);

    try {
      if (status === "authenticated" && session) {
        const res = await uploadImage({
          token: session?.user.access_token,
          image: formData,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          setIsLoading(false);

          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        setOpenChangePicture(false);
        toast.success(response.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmitChangePassword(values: z.infer<typeof newPassword>) {
    setIsLoading(true);
    try {
      if (status === "authenticated" && session) {
        const res = await updatePassword({
          token: session.user.access_token,
          data: values,
        });

        const response = await res.json();

        if (res.status !== 200) {
          toast.error(response.errors);
          setIsLoading(false);

          return;
        }

        const refreshSession = await getUser(session?.user.access_token);

        await update({
          ...session,
          user: {
            ...refreshSession,
          },
        });

        setOpenChangePassword(false);
        toast.success(response.message);
        setIsLoading(false);
        changePasswordForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <div>Profile</div>
      {status === "loading" || !update ? (
        <ProfileSkeleton />
      ) : (
        <div className="flex flex-col space-y-8 rounded-md border p-4 shadow-md md:p-8 lg:flex-row lg:justify-start lg:space-x-8 lg:space-y-0 xl:space-x-8">
          <div className="flex flex-col items-center justify-center space-y-8 lg:justify-between lg:space-y-0">
            <p className="font-semibold">Profile Picture</p>

            <Image
              src={session?.user.picture}
              alt="profile-picture"
              width={180}
              height={180}
              className="h-[180px] w-[180px] rounded-full object-cover"
              priority={true}
            />
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
                      <Button
                        type="submit"
                        disabled={!pictureForm.getValues("image") || isLoading}
                      >
                        Update
                      </Button>
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
                                <Button type="submit" disabled={isLoading}>
                                  Update
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <Separator />
                </div>
                <div className="flex h-16 flex-col space-y-1">
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">Last Name</p>

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
                            <AlertDialogTitle>Edit Last Name</AlertDialogTitle>
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
                                <Button type="submit" disabled={isLoading}>
                                  Update
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <Separator />
                </div>
                <div className="flex h-16 flex-col space-y-1">
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">Username</p>

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

                                <Button type="submit" disabled={isLoading}>
                                  Update
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <Separator />
                </div>
                <div className="flex h-16 flex-col space-y-1">
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">Email</p>

                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.email}</p>
                    </div>
                  </div>
                  <Separator />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex h-16 flex-col space-y-1">
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">Company</p>

                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.companyName}</p>
                    </div>
                  </div>
                  <Separator />
                </div>
                <div className="flex h-16 flex-col space-y-1">
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">Company Code</p>

                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.companyStringId}</p>
                    </div>
                  </div>
                  <Separator />
                </div>
                <div className="flex h-16 flex-col space-y-1">
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">Role</p>

                    <div className="flex h-8 flex-row items-center justify-between">
                      <p>{session?.user?.role}</p>
                    </div>
                  </div>
                  <Separator />
                </div>
                <div className="flex h-16 flex-col justify-center space-y-1">
                  <AlertDialog
                    open={openChangePassword}
                    onOpenChange={setOpenChangePassword}
                  >
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
                      <Form {...changePasswordForm}>
                        <form
                          onSubmit={changePasswordForm.handleSubmit(
                            onSubmitChangePassword,
                          )}
                          className="space-y-4"
                        >
                          <FormField
                            control={changePasswordForm.control}
                            name="oldPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="oldPassword">
                                  Old Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative flex items-center justify-center">
                                    <Input
                                      type={isOldPassword ? "password" : "text"}
                                      placeholder="Your old password..."
                                      {...field}
                                      className="flex items-center"
                                      id="oldPassword"
                                    />
                                    {isOldPassword ? (
                                      <Eye
                                        size={18}
                                        className="absolute right-4 cursor-pointer"
                                        onClick={() =>
                                          setIsOldPassword(!isOldPassword)
                                        }
                                      />
                                    ) : (
                                      <EyeOff
                                        size={18}
                                        className="absolute right-4 cursor-pointer"
                                        onClick={() =>
                                          setIsOldPassword(!isOldPassword)
                                        }
                                      />
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={changePasswordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="newPassword">
                                  New Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative flex items-center justify-center">
                                    <Input
                                      type={isNewPassword ? "password" : "text"}
                                      placeholder="Your new password..."
                                      {...field}
                                      className="flex items-center"
                                      id="newPassword"
                                    />
                                    {isNewPassword ? (
                                      <Eye
                                        size={18}
                                        className="absolute right-4 cursor-pointer"
                                        onClick={() =>
                                          setIsNewPassword(!isNewPassword)
                                        }
                                      />
                                    ) : (
                                      <EyeOff
                                        size={18}
                                        className="absolute right-4 cursor-pointer"
                                        onClick={() =>
                                          setIsNewPassword(!isNewPassword)
                                        }
                                      />
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={changePasswordForm.control}
                            name="confirmNewPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel htmlFor="confirmNewPassword">
                                  New Password Confirmation
                                </FormLabel>
                                <FormControl>
                                  <div className="relative flex items-center justify-center">
                                    <Input
                                      type={
                                        isConfirmPassword ? "password" : "text"
                                      }
                                      placeholder="Retype your new password..."
                                      {...field}
                                      className="flex items-center"
                                      id="confirmNewPassword"
                                    />
                                    {isConfirmPassword ? (
                                      <Eye
                                        size={18}
                                        className="absolute right-4 cursor-pointer"
                                        onClick={() =>
                                          setIsConfirmPassword(
                                            !isConfirmPassword,
                                          )
                                        }
                                      />
                                    ) : (
                                      <EyeOff
                                        size={18}
                                        className="absolute right-4 cursor-pointer"
                                        onClick={() =>
                                          setIsConfirmPassword(
                                            !isConfirmPassword,
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit" disabled={isLoading}>
                              Update
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </Form>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
