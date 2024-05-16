"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCompany } from "@/utils/services/company-service";
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

  const getCompanyDetails = async () => {
    try {
      if (status === "authenticated" && session) {
        const res = await getCompany({
          token: session.user.access_token,
          companyId: session.user.companyStringId,
        });

        const company = await res.json();
        setCompanyDetails(company.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyDetails();
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-2 md:space-y-4">
      <div>Company Details</div>
      {companyDetail && ( // Render only if companyDetail exists
        <>
          <Image
            src={companyDetail.logo}
            alt="Company Logo"
            width={100}
            height={100}
            priority={true}
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
