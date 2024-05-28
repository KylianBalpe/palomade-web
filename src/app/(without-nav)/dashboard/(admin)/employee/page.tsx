"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addEmployee,
  getCompanyEmployees,
} from "@/utils/services/company-service";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cross, PencilIcon, X } from "lucide-react";
import {
  removeEmployee,
  updateEmployee,
} from "@/utils/services/company-service";
import { addEmployeeForm, updateEmployeeForm } from "@/utils/form/company-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import Search from "@/components/atom/Search";
import Pagination from "@/components/molecules/Pagination";
import { Badge } from "@/components/ui/badge";

type Employees = {
  data: [
    {
      userId: number;
      name: string;
      companyStringId: string;
      username: string;
      email: string;
      role: string;
    },
  ];
  paging: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export default function Employee({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<Employees>();
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchTerm = searchParams?.search || "";
  const thisPage = Number(searchParams?.page) || 1;

  const getEmployees = async (search: string, page: number) => {
    try {
      if (status === "authenticated" && session) {
        const employee = await getCompanyEmployees({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
          search: search,
          page: page,
        });

        const employees = await employee.json();
        setEmployees(employees);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const totalPages = employees?.paging.total_page || 1;

  useEffect(() => {
    getEmployees(searchTerm, thisPage);
    toast.dismiss();
  }, [searchTerm, thisPage]);

  const updateForm = useForm<z.infer<typeof updateEmployeeForm>>({
    resolver: zodResolver(updateEmployeeForm),
  });

  const addForm = useForm<z.infer<typeof addEmployeeForm>>({
    resolver: zodResolver(addEmployeeForm),
    defaultValues: {
      email: "",
    },
  });

  const onAddEmployee = async (data: z.infer<typeof addEmployeeForm>) => {
    try {
      const res = await addEmployee({
        token: session?.user.access_token,
        companyId: session?.user.companyStringId,
        data: data,
      });

      const response = await res.json();

      if (res.status !== 200) {
        toast.error(response.errors);
        return;
      }

      toast.success(response.message);
      setOpenAdd(false);
      getEmployees(searchTerm, thisPage);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateEmployee = async (
    data: z.infer<typeof updateEmployeeForm>,
    userId: number,
  ) => {
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
      setOpenEdit(null);
      getEmployees(searchTerm, thisPage);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const onRemoveEmployee = async (userId: number) => {
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
      setOpenDelete(null);
      getEmployees(searchTerm, thisPage);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const data = employees?.data;

  return (
    <main className="flex flex-col space-y-2 md:space-y-4">
      <h1>Employees</h1>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Search placeholder="Search username, email or name..." />
          <AlertDialog open={openAdd} onOpenChange={setOpenAdd}>
            <AlertDialogTrigger asChild>
              <Button className="max-w-min">
                <Cross size={12} className="mr-2" />
                Add Employee
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Employee</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...addForm}>
                <form
                  onSubmit={addForm.handleSubmit(onAddEmployee)}
                  className="space-y-4"
                >
                  <FormField
                    control={addForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">
                          New Employee Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="New employee email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
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
                              <SelectValue placeholder="Select role for employee" />
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
                    <Button type="submit" disabled={!addForm.formState.isDirty}>
                      Add
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center" colSpan={2}>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length ? (
                data.map((employee) => (
                  <TableRow key={employee.userId}>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      <Badge variant={"sm"}>{employee.role}</Badge>
                    </TableCell>
                    <TableCell className="w-16 text-end">
                      <AlertDialog
                        open={openEdit === employee.userId}
                        onOpenChange={(isOpen) =>
                          isOpen
                            ? setOpenEdit(employee.userId)
                            : setOpenEdit(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            disabled={employee.email === session?.user.email}
                          >
                            <PencilIcon size={12} className="mr-2" />
                            Edit
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Edit Employee Role
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <Form {...updateForm}>
                            <form
                              onSubmit={updateForm.handleSubmit((data) =>
                                onUpdateEmployee(data, employee.userId),
                              )}
                              className="space-y-4"
                            >
                              <FormField
                                control={updateForm.control}
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
                                        <SelectItem value="ADMIN">
                                          ADMIN
                                        </SelectItem>
                                        <SelectItem value="DRIVER">
                                          DRIVER
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                  type="submit"
                                  disabled={!updateForm.formState.isDirty}
                                >
                                  Update
                                </Button>
                              </AlertDialogFooter>
                            </form>
                          </Form>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="w-16 text-start">
                      <AlertDialog
                        open={openDelete === employee.userId}
                        onOpenChange={(isOpen) =>
                          isOpen
                            ? setOpenDelete(employee.userId)
                            : setOpenDelete(null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size={"sm"}
                            variant={"destructive"}
                            disabled={employee.email === session?.user.email}
                          >
                            <X size={14} className="mr-2" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to remove this employee?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undo. You need to add again
                              if you made a mistake.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              onClick={() => onRemoveEmployee(employee.userId)}
                            >
                              Remove
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(4)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                        </TableCell>
                      ))}
                      <TableCell colSpan={2} className="text-center">
                        <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination totalPages={totalPages} />
        <Toaster />
      </div>
    </main>
  );
}
