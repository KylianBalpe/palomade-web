"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Shippings } from "@/utils/services/shippings-service";
import newFormatDate from "@/utils/helpers/helper";
import { columns } from "./columns";
import { DataTable } from "./data-table";

type CompanyShippings = {
  code: string;
  companyId?: string;
  companyStringId?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  plat_nomor?: string;
  weight?: string;
  from: string;
  to: string;
  coordinates_start: string;
  coordinates_end: string;
  estimated_arrival?: string;
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
          const shippings = await Shippings.getCompanyShippings(
            session.user.access_token,
            session.user.companyStringId,
          );

          const data: CompanyShippings[] = shippings.data.map(
            (shipping: CompanyShippings) => {
              return {
                ...shipping,
                createdAt: newFormatDate(shipping.createdAt),
              };
            },
          );

          setCompanyShippings(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getShippings();
  }, [session]);

  const data = companyShippings;

  return (
    <main className="flex flex-col space-y-4">
      <div>Shippings</div>
      <div className="flex flex-col rounded-md border p-4 shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
