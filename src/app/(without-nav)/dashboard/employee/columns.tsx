"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Company } from "@/utils/services/company-service";

type Employees = {
  userId: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

const FormSchema = z.object({
  role: z.string({
    required_error: "Please select role to update.",
  }),
});

export const columns: ColumnDef<Employees>[] = [
  {
    accessorKey: "number",
    header: () => <div className="text-center">#</div>,
    id: "number",
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <div className="text-center">
          {employee.role === "ADMIN" ? (
            <div className="inline-flex items-center rounded-md bg-sky-500 px-2 py-1 text-xs text-white">
              {employee.role}
            </div>
          ) : employee.role === "DRIVER" ? (
            <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-xs text-white">
              {employee.role}
            </div>
          ) : (
            <div className="inline-flex items-center rounded-md border-black px-2 py-1 text-xs">
              {employee.role}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;
      const { data: session } = useSession();

      const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      });

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const userId = row.original.userId;

      const onSubmit = useCallback(
        async (data: z.infer<typeof FormSchema>) => {
          try {
            const res = await fetch(
              `${baseUrl}/api/company/${session?.user.companyStringId}/employee/${userId}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${session?.user.access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              },
            );
            const response = await res.json();
            if (res.status !== 200) {
              toast.error(response.errors);
            }

            toast.success(response.message);
            return response;
          } catch (error) {
            console.error(error);
          }
        },
        [userId, session],
      );

      return (
        <div className="flex flex-row items-center justify-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"sm"} variant={"outline"}>
                <PencilIcon size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:px-4">
              <DialogHeader>
                <DialogTitle>Edit role</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a new role." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                            <SelectItem value="DRIVER">DRIVER</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
            <Toaster position="top-center" />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"sm"} variant={"destructive"}>
                <X size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Lu yakin mecat ni orang?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ini gabakal bisa dibalikin, kalo lu mau orang ini balik kudu
                  nambahin ulang.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Toaster position="top-center" />
        </div>
      );
    },
  },
];
