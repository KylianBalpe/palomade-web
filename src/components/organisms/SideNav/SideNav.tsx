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
import { Badge } from "@/components/ui/badge";

const SideNav = () => {
  const { data: session, status, update } = useSession();

  return (
    <div className="fixed top-0 z-20 h-14 w-full border-b bg-white p-2 md:flex md:h-screen md:w-64 md:flex-col md:overflow-y-auto md:border-r md:p-4">
      <div className="md:pt-14"></div>
      <div className="flex h-full flex-row items-center justify-between md:flex-col md:items-stretch">
        <Sheet>
          <SheetTrigger
            className="rounded-md bg-zinc-950 text-white md:hidden"
            asChild
          >
            <Button size={"sm"} className="px-2">
              <Menu className="h-6 w-auto" />
            </Button>
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
              <div className="h-5 w-12 animate-pulse rounded-sm bg-gray-300" />
            ) : (
              <Badge variant={"sm"}>{session?.user?.role}</Badge>
            )}
          </div>
          <Separator />
          <div className="flex h-full flex-col justify-between space-y-4">
            <div className="flex flex-col space-y-1">
              {status === "loading" || !update ? (
                <>
                  {[...Array(6)].map((_, index) => (
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
          size={"sm"}
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
