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
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { updateEmployeeForm } from "@/utils/form/company-form";
import {
  removeEmployee,
  updateEmployee,
} from "@/utils/services/company-service";

type Employees = {
  userId: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

export const columns: ColumnDef<Employees>[] = [
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
            <div className="inline-flex items-center rounded-md bg-sky-500 px-2 py-1 text-xs font-medium text-white">
              {employee.role}
            </div>
          ) : employee.role === "DRIVER" ? (
            <div className="inline-flex items-center rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-white">
              {employee.role}
            </div>
          ) : (
            <div className="inline-flex items-center rounded-md border-black px-2 py-1 text-xs font-medium">
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
      const [openEdit, setOpenEdit] = useState<boolean>(false);
      const [openDelete, setOpenDelete] = useState<boolean>(false);

      const form = useForm<z.infer<typeof updateEmployeeForm>>({
        resolver: zodResolver(updateEmployeeForm),
      });

      const userId = row.original.userId;

      const onUpdate = async (data: z.infer<typeof updateEmployeeForm>) => {
        try {
          const res = await updateEmployee({
            token: session?.user.access_token,
            companyId: session?.user.companyStringId,
            userId: userId,
            data: data,
          });

          const response = await res.json();

          if (res.status !== 200) {
            toast.error(response.errors);
          }

          toast.success(response.message);
          setOpenEdit(false);
          return response;
        } catch (error) {
          console.error(error);
        }
      };

      const onDelete = async () => {
        try {
          const res = await removeEmployee({
            token: session?.user.access_token,
            companyId: session?.user.companyStringId,
            userId: userId,
          });

          const response = await res.json();

          if (res.status !== 200) {
            toast.error(response.errors);
          }

          toast.success(response.message);
          setOpenDelete(false);
          return response;
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="flex flex-row items-center justify-center space-x-2">
          <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
            <AlertDialogTrigger asChild>
              {employee.email === session?.user.email ? (
                <Button size={"sm"} variant={"outline"} disabled>
                  <PencilIcon size={16} />
                </Button>
              ) : (
                <Button size={"sm"} variant={"outline"}>
                  <PencilIcon size={16} />
                </Button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit Employee Role</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onUpdate)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Role</FormLabel>
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
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {!form.formState.isDirty ? (
                      <AlertDialogAction disabled>Update</AlertDialogAction>
                    ) : (
                      <Button type="submit">Update</Button>
                    )}
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogTrigger asChild>
              {employee.email === session?.user.email ? (
                <Button size={"sm"} variant={"destructive"} disabled>
                  <X size={16} />
                </Button>
              ) : (
                <Button size={"sm"} variant={"destructive"}>
                  <X size={16} />
                </Button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to remove this employee?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undo. You need to add again if you made
                  a mistake.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={onDelete}>Delete</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
