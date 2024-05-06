"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Company } from "@/utils/services/company-service";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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

  useEffect(() => {
    const getEmployees = async () => {
      try {
        if (status === "authenticated" && session) {
          const employee = await Company.getCompanyEmployees(
            session.user.access_token,
            session.user.companyStringId,
          );

          setEmployees(employee.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEmployees();
  }, [session]);

  const data = employees;
  return (
    <main className="flex flex-col space-y-4">
      <h1>Employees</h1>
      <div className="flex flex-col rounded-md border p-4 shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
