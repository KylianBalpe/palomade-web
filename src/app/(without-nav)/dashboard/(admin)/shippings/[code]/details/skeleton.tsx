"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, TruckIcon, PencilIcon } from "lucide-react";

export default function ShippingDetailSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="h-7 w-24 animate-pulse rounded-sm bg-gray-300" />
        <div className="flex flex-row space-x-2">
          <Button size={"sm"} disabled>
            <TruckIcon size={12} className="mr-2" /> Assign Driver
          </Button>
          <Button size={"sm"} disabled>
            <PencilIcon size={12} className="mr-2" /> Edit
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-[152px] w-full animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-[152px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <p>Activity</p>
      <div className="h-20 w-full animate-pulse rounded-md bg-gray-300"></div>
    </div>
  );
}
