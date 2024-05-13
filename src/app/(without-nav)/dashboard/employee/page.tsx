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
import { set, z } from "zod";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { TableRoleBadges } from "@/components/atom/Badges";

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
    current_page: 1;
    total_page: 1;
    size: 10;
  };
};

export default function Employee() {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<Employees>();
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const thisPage = Number(searchParams.get("page")) || 1;

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
        setIsLoading(false);
        setEmployees(employees);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees(searchTerm, thisPage);
  }, [session, searchTerm, thisPage]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    const newUrl = `${pathname}?${params.toString()}`;
    return newUrl;
  };

  const debounced = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchTerm(value);
  }, 500);

  const updateForm = useForm<z.infer<typeof updateEmployeeForm>>({
    resolver: zodResolver(updateEmployeeForm),
  });

  const addForm = useForm<z.infer<typeof addEmployeeForm>>({
    resolver: zodResolver(addEmployeeForm),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof addEmployeeForm>) => {
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

  const onUpdate = async (
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

  const onDelete = async (userId: number) => {
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
    <main className="flex flex-col space-y-4">
      <h1>Employees</h1>
      <div className="flex flex-col space-y-4 rounded-md border p-4 shadow-md">
        <div className="flex flex-col-reverse justify-start gap-4 lg:flex-row lg:justify-between">
          <Input
            placeholder="Search..."
            onChange={(e) => debounced(e.target.value)}
            className="max-w-sm"
          />
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
                  onSubmit={addForm.handleSubmit(onSubmit)}
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
                <TableHead className="w-10 text-center">Action</TableHead>
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
                      <TableRoleBadges>{employee.role}</TableRoleBadges>
                    </TableCell>
                    <TableCell className="flex flex-row justify-center gap-2">
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
                            <PencilIcon size={16} />
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
                                onUpdate(data, employee.userId),
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
                            <X size={16} />
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
                            <Button onClick={() => onDelete(employee.userId)}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : isLoading ? (
                <>
                  {[...Array(5)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4">
          <Button
            size={"sm"}
            variant={"outline"}
            disabled={thisPage <= 1}
            asChild={thisPage > 1}
          >
            <Link href={createPageURL(thisPage - 1)}>Previous</Link>
          </Button>
          <span className="text-sm">
            Page {thisPage} of {employees?.paging.total_page}
          </span>
          <Button
            size={"sm"}
            variant={"outline"}
            disabled={thisPage === (employees?.paging.total_page ?? 1)}
            asChild={thisPage < (employees?.paging.total_page ?? 1)}
          >
            <Link href={createPageURL(thisPage + 1)}>Next</Link>
          </Button>
        </div>

        <Toaster />
      </div>
    </main>
  );
}
