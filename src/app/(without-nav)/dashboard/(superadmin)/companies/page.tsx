"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Company } from "@/utils/services/company-service";

type Companies = {
  address: string;
  companyId: string;
  id: number;
  logo: string;
  name: string;
};

export default function Companies() {
  const { data: session, status } = useSession();
  const [companies, setCompanies] = useState<Companies[]>([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        if (status === "authenticated" && session) {
          const company = await Company.getCompanies(session.user.access_token);
          setCompanies(company.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCompanies();
  }, [session]);

  return (
    <>
      <div>Companies</div>
      <div className="flex w-full flex-col space-y-2 rounded-md border bg-white p-4 shadow-md">
        {companies.map((company: Companies, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between"
          >
            <h1 className="text-lg font-medium">{company.name}</h1>
            <p className="text-sm font-light">{company.address}</p>
            <p className="text-sm font-light">{company.companyId}</p>
          </div>
        ))}
      </div>
    </>
  );
}
