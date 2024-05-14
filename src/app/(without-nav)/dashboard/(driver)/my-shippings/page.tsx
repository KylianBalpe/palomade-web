"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getDriverShippings } from "@/utils/services/shippings-service";
import newFormatDate from "@/utils/helpers/helper";

type ShippingsByDriver = {
  code: string;
  status: string;
  driverId: number;
  weight: string;
  from: string;
  to: string;
  coordinates_start: string;
  coordinates_end: string;
  createdAt: string;
};

export default function Page() {
  const { data: session, status } = useSession();
  const [myShippings, setMyShippings] = useState<ShippingsByDriver[]>([]);

  const getShippings = async () => {
    try {
      if (status === "authenticated" && session) {
        const shippings = await getDriverShippings(session.user.access_token);

        const data: ShippingsByDriver[] = shippings.data.map(
          (shipping: ShippingsByDriver) => {
            return {
              ...shipping,
              createdAt: newFormatDate(shipping.createdAt),
            };
          },
        );

        setMyShippings(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShippings();

    const interval = setInterval(() => {
      getShippings();
    }, 1500);

    return () => clearInterval(interval);
  }, [session]);

  const data = myShippings;

  return (
    <main className="flex flex-col space-y-4">
      <div>My Shippings</div>
      <div className="flex flex-col rounded-md border p-4 shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
