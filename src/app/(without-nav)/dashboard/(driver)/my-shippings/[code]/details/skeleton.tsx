"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, TruckIcon, PencilIcon } from "lucide-react";

export default function DriverShippingDetailSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="h-7 w-24 animate-pulse rounded-sm bg-gray-300" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-[152px] w-full animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-[152px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
        <p>Activity</p>
        <div className="flex flex-row space-x-2">
          <Button size={"sm"} disabled>
            Update Activity
          </Button>
          <Button
            size={"sm"}
            className="bg-green-700 hover:bg-green-500"
            disabled
          >
            Finish Shipping
          </Button>
        </div>
      </div>
      <div className="h-20 w-full animate-pulse rounded-md bg-gray-300"></div>
    </div>
  );
}
