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
import { UserSideNavLinks } from "@/components/molecules/SideNavLink/SideNavLinks";

const SideNav = () => {
  const { data: session, status, update } = useSession();

  return (
    <div className="flex flex-col border-b p-4 md:h-screen md:border-r">
      <div className="md:pt-14"></div>
      <div className="flex h-full flex-row justify-between md:flex-col md:overflow-y-auto">
        <Sheet>
          <SheetTrigger className="rounded-md bg-zinc-950 px-2 text-white md:hidden">
            <Menu className="h-6 w-auto" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader className="text-start">
              <SheetTitle>Menu</SheetTitle>
              {session?.user?.role === "SUPERADMIN" && (
                <SuperAdminSideNavLinks />
              )}
              {session?.user?.role === "ADMIN" && <AdminSideNavLinks />}
              {session?.user?.role === "DRIVER" && <DriverSideNavLinks />}
              {session?.user?.role === "USER" && <UserSideNavLinks />}
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="hidden h-full flex-col space-y-2 md:flex md:space-y-4">
          <div className="hidden flex-col items-center justify-center space-y-1 md:flex">
            {status === "loading" || !update ? (
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-300" />
            ) : (
              <Image
                src={session?.user?.picture}
                alt="profile"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
                priority={true}
              />
            )}
            {status === "loading" || !update ? (
              <div className="h-7 w-36 animate-pulse rounded-full bg-gray-300" />
            ) : (
              <h1 className="text-center text-lg font-medium">
                {session?.user?.first_name}
              </h1>
            )}
            {status === "loading" || !update ? (
              <div className="h-4 w-28 animate-pulse rounded-full bg-gray-300" />
            ) : (
              <h2 className="text-xs">{session?.user?.email}</h2>
            )}
            {status === "loading" || !update ? (
              <div className="h-5 w-28 animate-pulse rounded-full bg-gray-300" />
            ) : (
              <h1 className="text-sm font-medium">
                {session?.user?.companyName}
              </h1>
            )}
            {status === "loading" || !update ? (
              <div className="h-6 w-14 animate-pulse rounded-full bg-gray-300" />
            ) : (
              <h1 className="rounded-full bg-blue-400 px-2 py-1 text-xs font-medium text-white">
                {session?.user?.role}
              </h1>
            )}
          </div>
          <Separator />
          <div className="flex h-full flex-col justify-between space-y-4">
            <div className="flex flex-col space-y-1">
              {status === "loading" || !update ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-9 w-full animate-pulse rounded-full bg-gray-300"
                    ></div>
                  ))}
                </>
              ) : session?.user?.role === "SUPERADMIN" ? (
                <SuperAdminSideNavLinks />
              ) : session?.user?.role === "ADMIN" ? (
                <AdminSideNavLinks />
              ) : session?.user?.role === "DRIVER" ? (
                <DriverSideNavLinks />
              ) : (
                session?.user?.role === "USER" && <UserSideNavLinks />
              )}
            </div>
            <Button
              className="hidden max-w-min justify-start md:flex md:w-full"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </Button>
          </div>
        </div>
        <Button
          className="flex max-w-min justify-start md:hidden md:w-full"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
