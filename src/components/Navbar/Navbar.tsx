"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Menu, Palmtree } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MenuItem from "./NavbarMenu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 h-14 w-full border-b bg-white px-4">
      <div className="flex h-full flex-row items-center justify-between md:container md:gap-4">
        <div className="flex flex-row items-center gap-2">
          <Palmtree className="h-auto md:hidden md:w-6" />
          <Link href="/" className="hidden text-xl font-bold md:block md:text-2xl">
            Palomade
          </Link>
        </div>
        <nav className="flex h-full items-center justify-between md:w-full">
          <div className="hidden h-full flex-row items-center md:flex">
            {MenuItem.map((item, index) => {
              const isActive =
                item.path === "/" && pathname === "/" ? true : item.path !== "/" && pathname.startsWith(item.path);
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`inline-flex h-full items-center border-y-2 border-y-transparent px-2 font-medium transition-colors duration-300 hover:border-b-zinc-700 ${isActive && "border-b-black"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-row gap-4">
            <Button variant={"outline"} asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side={"right"} className="flex flex-col gap-4 px-4 py-3">
                <SheetHeader className="pr-8 text-end">
                  <SheetTitle>
                    <p className="font-bold">Palomade</p>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col text-end">
                  {MenuItem.map((item, index) => {
                    const isActive =
                      item.path === "/" && pathname === "/"
                        ? true
                        : item.path !== "/" && pathname.startsWith(item.path);
                    return (
                      <Link
                        key={index}
                        href={item.path}
                        className={`rounded-md border-r-4 border-r-transparent px-7 py-2 font-medium transition-colors duration-300 hover:bg-zinc-100 ${isActive && "bg-zinc-100"}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
