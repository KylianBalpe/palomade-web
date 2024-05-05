"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Company } from "@/utils/services/company-service";

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

  return (
    <div>
      Employee
      <div className="flex w-full flex-col space-y-2 rounded-md border bg-white p-4 shadow-md">
        {employees.map((employee: Employees, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between"
          >
            <h1 className="text-lg font-medium">
              {employee.name || employee.username}
            </h1>
            <p className="text-sm font-light">{employee.email}</p>
            <p className="text-sm font-light">{employee.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
