"use client";

import React from "react";
import { Button } from "../../ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import {
  AdminSideNavLinks,
  DriverSideNavLinks,
  SuperAdminSideNavLinks,
} from "@/components/molecules/SideNavLink";
import { Separator } from "@/components/ui/separator";

const SideNav = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col border-b px-2 py-4 md:h-screen md:border-r md:p-4">
      <div className="pt-14"></div>
      <div className="flex h-full flex-row justify-between md:flex-col">
        <Sheet>
          <SheetTrigger className="rounded-md bg-zinc-950 px-2 text-white md:hidden">
            <Menu className="h-6 w-auto" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader className="text-start">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                {session?.user?.role === "SUPERADMIN" && (
                  <SuperAdminSideNavLinks />
                )}
                {session?.user?.role === "ADMIN" && <AdminSideNavLinks />}
                {session?.user?.role === "DRIVER" && <DriverSideNavLinks />}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="hidden grow flex-col space-y-2 md:flex md:space-y-4">
          <div className="hidden flex-col items-center justify-center space-y-1 md:flex">
            {status !== "loading" && (
              <Image
                src={session?.user?.picture}
                alt="profile"
                width={80}
                height={80}
                className="rounded-full"
                priority={true}
              />
            )}
            <h1 className="text-lg font-medium">{session?.user?.name}</h1>
            <h2 className="text-xs">{session?.user?.email}</h2>
            <h1 className="text-sm font-medium">
              {session?.user?.companyName}
            </h1>
            <h1 className="rounded-full bg-blue-400 px-2 py-1 text-xs font-medium text-white">
              {session?.user?.role}
            </h1>
          </div>
          <Separator />
          {session?.user?.role === "SUPERADMIN" && <SuperAdminSideNavLinks />}
          {session?.user?.role === "ADMIN" && <AdminSideNavLinks />}
          {session?.user?.role === "DRIVER" && <DriverSideNavLinks />}
        </div>
        <Button
          className="flex max-w-min justify-start md:w-full"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
