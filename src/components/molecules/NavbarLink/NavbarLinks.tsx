"use client";
import React from "react";
import Link from "next/link";
import NavLinks from "./NavbarLinkMenu";
import { usePathname } from "next/navigation";

export function TopNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden h-full flex-row items-center md:flex">
      {NavLinks.map((item, index) => {
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
  );
}

export function MobileNavbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col text-end">
      {NavLinks.map((item, index) => {
        const isActive =
          item.path === "/" && pathname === "/" ? true : item.path !== "/" && pathname.startsWith(item.path);
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
  );
}
