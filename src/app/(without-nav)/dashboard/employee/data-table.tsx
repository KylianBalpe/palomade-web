"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
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
import { Cross, PencilIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const formSchema = z.object({
  email: z.string({
    required_error: "Please enter email address.",
  }),
  role: z.string({
    required_error: "Please select role to update.",
  }),
});

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    state: {
      globalFilter: filtering,
    },
  });
  const { data: session } = useSession();

  const debounced = useDebouncedCallback((value: string) => {
    setFiltering(value);
  }, 500);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/company/${session?.user.companyStringId}/employee`,
        {
          method: "POST",
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
        return;
      }

      toast.success(response.message);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex w-full flex-row justify-between">
          <Input
            placeholder="Search..."
            onChange={(e) => debounced(e.target.value)}
            className="max-w-sm"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Cross size={12} className="mr-2" />
                Add Employee
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit Employee Role</AlertDialogTitle>
              </AlertDialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Input Email</FormLabel>
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
                    {!form.formState.isDirty && FormMessage !== null ? (
                      <AlertDialogAction disabled>Add</AlertDialogAction>
                    ) : (
                      <AlertDialogAction type="submit">Add</AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {[...Array(columns.length)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {[...Array(5)].map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="h-12 w-96">
                        <div className="h-6 w-full animate-pulse rounded-md bg-gray-300" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {table.options.state.pagination!.pageIndex + 1} of{" "}
          {table.getPageCount()}{" "}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Toaster />
    </div>
  );
}
