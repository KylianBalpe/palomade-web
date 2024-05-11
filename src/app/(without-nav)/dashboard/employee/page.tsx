"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getCompanyEmployees } from "@/utils/services/company-service";
import toast, { Toaster } from "react-hot-toast";

type Employees = {
  userId: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

export default function Employee() {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<Employees[]>([]);

  const getEmployees = async () => {
    try {
      if (status === "authenticated" && session) {
        const employee = await getCompanyEmployees(
          session.user.access_token,
          session.user.companyStringId,
        );

        setEmployees(employee.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();

    const interval = setInterval(() => {
      getEmployees();
    }, 2000);

    return () => clearInterval(interval);
  }, [session]);

  const data = employees;
  return (
    <main className="flex flex-col space-y-4">
      <h1>Employees</h1>
      <div className="flex flex-col rounded-md border p-4 shadow-md">
        <DataTable columns={columns} data={data} />
        <Toaster />
      </div>
    </main>
  );
}
