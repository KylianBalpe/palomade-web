import type { Metadata } from "next";
import { Settings } from "lucide-react";
import SideNav from "@/components/organisms/SideNav";
import DashboardNav from "@/components/organisms/DashboardNav";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Palomade - Dashboard",
  description: "Palm Oil Maturity Detection",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="fixed top-0 z-50 hidden h-14 w-screen border-b bg-white md:block">
        <DashboardNav />
      </div>
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="mt-14 flex-grow p-2 md:overflow-y-auto md:p-4">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
