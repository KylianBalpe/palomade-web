import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col space-y-8 rounded-md border p-4 shadow-md md:p-8 lg:flex-row lg:justify-start lg:space-x-8 lg:space-y-0 xl:space-x-8">
      <div className="flex flex-col items-center justify-center space-y-8 lg:justify-between lg:space-y-0">
        <p className="font-semibold">Profile Picture</p>
        <div className="flex h-[180px] w-[180px] animate-pulse rounded-full bg-gray-300" />
        <Button variant={"outline"} disabled>
          Change Profile Picture
        </Button>
      </div>
      <div className="flex w-full flex-col justify-between space-y-8 lg:space-y-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">First Name</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">Last Name</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">Username</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">Email</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">Company</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">Company Code</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
            <div className="flex h-16 flex-col space-y-1">
              <div className="flex h-full flex-col">
                <p className="font-semibold">Role</p>
                <div className="flex h-6 w-1/2 animate-pulse rounded-md bg-gray-300" />
              </div>
              <Separator />
            </div>
            <div className="flex h-16 flex-col justify-center space-y-1">
              <Button variant={"outline"} className="max-w-min" disabled>
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
