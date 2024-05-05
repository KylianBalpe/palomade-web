"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Company } from "@/utils/services/company-service";
import Image from "next/image";

type CompanyDetails = {
  id: number;
  companyId: string;
  name: string;
  logo: string;
  address: string;
  description: string;
  requestedBy: string;
  employees: number;
  shippings: number;
};

export default function CompanyDetails() {
  const { data: session, status } = useSession();
  const [companyDetail, setCompanyDetails] = useState<CompanyDetails>();

  useEffect(() => {
    const getCompany = async () => {
      try {
        if (status === "authenticated" && session) {
          const company = await Company.getCompany(
            session.user.access_token,
            session.user.companyStringId,
          );
          setCompanyDetails(company.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCompany();
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <div>Company Details</div>
      {companyDetail && ( // Render only if companyDetail exists
        <>
          <Image
            src={companyDetail.logo}
            alt="Company Logo"
            width={100}
            height={100}
          />
          <div className="flex flex-col items-center justify-between space-y-2">
            <p className="text-sm">{companyDetail.companyId}</p>
            <h1 className="text-lg font-medium">{companyDetail.name}</h1>
            <p className="text-sm">{companyDetail.address}</p>
            <p className="text-sm">{companyDetail.description}</p>
            <p className="text-sm">{companyDetail.requestedBy}</p>
            <p className="text-sm">{companyDetail.employees}</p>
            <p className="text-sm">{companyDetail.shippings}</p>
          </div>
        </>
      )}
    </main>
  );
}
