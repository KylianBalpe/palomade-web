"use client";

import Navbar from "@/components/organisms/Navbar";
import { usePathname } from "next/navigation";

export default function IncludeNavbar() {
  const pathname = usePathname();
  const withoutNavbar = pathname === "/dashboard" || pathname.startsWith("/dashboard");
  return <>{!withoutNavbar && <Navbar />}</>;
}
