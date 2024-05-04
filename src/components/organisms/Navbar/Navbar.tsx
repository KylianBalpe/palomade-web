"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { Menu, Palmtree } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { MobileNavbar, TopNavbar } from "@/components/molecules/NavbarLink/";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 z-50 h-14 w-full border-b bg-white px-4">
      <div className="flex h-full flex-row items-center justify-between md:container md:gap-4">
        <div className="flex flex-row items-center gap-2">
          <Palmtree className="h-auto md:hidden md:w-6" />
          <Link
            href="/"
            className="hidden text-xl font-bold md:block md:text-2xl"
          >
            Palomade
          </Link>
        </div>
        <nav className="flex h-full items-center justify-between md:w-full">
          <TopNavbar />
          <div className="flex flex-row items-center gap-4">
            {status === "authenticated" ? (
              <>
                {/* <h1 className="font-medium">
                  Welcome, {session?.user?.name || session?.user?.username}!
                </h1> */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="font-medium">
                        Welcome,{" "}
                        {session?.user?.name || session?.user?.username}!
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="flex flex-col justify-end space-y-2 px-4 py-2">
                        <Button
                          onClick={() => signOut()}
                          variant={"destructive"}
                        >
                          Logout
                        </Button>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => signIn()} variant={"outline"}>
                  Login
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={"right"}
                className="flex flex-col gap-4 px-4 py-3"
              >
                <SheetHeader className="pr-8 text-end">
                  <SheetTitle>
                    <p className="font-bold">Palomade</p>
                  </SheetTitle>
                </SheetHeader>
                <MobileNavbar />
                {status === "authenticated" ? (
                  <>
                    <Button asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button onClick={() => signOut()} variant={"destructive"}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => signIn()} variant={"outline"}>
                      Login
                    </Button>
                    <Button asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
