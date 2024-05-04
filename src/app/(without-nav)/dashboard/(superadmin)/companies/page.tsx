"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Company = {
  address: string;
  companyId: string;
  id: number;
  logo: string;
  name: string;
};

export default function Companies() {
  const { data: session, status } = useSession();
  const [company, setCompany] = useState<Company[]>([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        if (status === "authenticated" && session) {
          const req = await fetch("http://localhost:8000/api/companies", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
            },
          });
          const response = await req.json();
          // const data: Company[] = response.map((company: any) => {
          //   return {
          //     address: company.address,
          //     companyId: company.companyId,
          //     id: company.id,
          //     logo: company.logo,
          //     name: company.name,
          //   };
          // });
          setCompany(response.data);
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
        {company.map((company: Company, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between"
          >
            <h1 className="text-lg font-medium">{company.name}</h1>
            <p className="text-sm font-light">{company.address}</p>
          </div>
        ))}
      </div>
    </>
  );
}
