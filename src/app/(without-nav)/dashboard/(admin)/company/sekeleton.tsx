import { Button } from "@/components/ui/button";
import React from "react";

export default function CompanySekeleton() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center space-y-4 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
        <div className="aspect-square h-auto w-64 animate-pulse rounded-lg bg-gray-300 object-cover" />
        <div className="flex w-[1049px] flex-col justify-between space-y-8">
          <div className="flex w-full flex-col items-center justify-center space-y-2 lg:items-start">
            <div className="h-7 w-24 animate-pulse rounded-sm bg-gray-300"></div>
            <div className="h-8 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-6 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-6 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-6 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-6 w-full animate-pulse rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
            <Button variant={"outline"} disabled>
              Change Logo
            </Button>
            <Button disabled>Edit Information</Button>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col space-y-1 rounded-md bg-gray-100 p-4">
          <p className="text-lg text-gray-600">Employees</p>
          <div className="h-7 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>
        <div className="flex flex-col space-y-1 rounded-md bg-gray-100 p-4">
          <p className="text-lg text-gray-600">Shipment</p>
          <div className="h-7 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>
        <div className="flex flex-col space-y-1 rounded-md bg-gray-100 p-4">
          <p className="text-lg text-gray-600">Lands</p>
          <div className="h-7 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </div>
    </>
  );
}
