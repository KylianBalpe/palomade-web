"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Shippings } from "@/utils/services/shippings-service";
import newFormatDate from "@/utils/helpers/helper";

type CompanyShippings = {
  code: string;
  companyId?: string;
  companyStringId?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  plat_nomor?: string;
  berat?: string;
  from: string;
  to: string;
  coordinates_start: string;
  coordinates_end: string;
  estimated_arrival?: Date;
  createdAt: string;
  updatedAt?: string;
  driverId?: number;
  driverName?: string;
};
export default function Page() {
  const { data: session, status } = useSession();
  const [companyShippings, setCompanyShippings] = useState<CompanyShippings[]>(
    [],
  );

  useEffect(() => {
    const getShippings = async () => {
      try {
        if (status === "authenticated" && session) {
          const employee = await Shippings.getCompanyShippings(
            session.user.access_token,
            session.user.companyStringId,
          );
          setCompanyShippings(employee.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getShippings();
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>Shippings</div>
      {companyShippings.map((shipping: CompanyShippings, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between space-y-2"
        >
          <h1 className="text-lg font-medium">{shipping.code}</h1>
          <p className="text-sm">{shipping.status}</p>
          <p className="text-sm">{shipping.from}</p>
          <p className="text-sm">{shipping.to}</p>
          <p className="text-sm">{newFormatDate(shipping.createdAt)}</p>
          <p className="text-sm">
            {shipping.updatedAt
              ? newFormatDate(shipping.updatedAt)
              : "Not updated yet"}
          </p>
          <p className="text-sm">{shipping.driverId}</p>
          <p className="text-sm">{shipping.driverName}</p>
        </div>
      ))}
    </main>
  );
}
