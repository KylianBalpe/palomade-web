import type { Metadata } from "next";
import { Settings } from "lucide-react";
import SideNav from "@/components/organisms/SideNav";

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
      <div className="fixed top-0 z-10 hidden h-14 w-screen border-b bg-white md:block">
        <div className="flex h-full flex-row">
          <div className="flex w-64 flex-col items-center justify-center border-r">
            <h1 className="text-2xl font-bold">Palomade</h1>
          </div>
          <div className="flex h-full grow flex-row items-center justify-between px-4">
            <h1 className="text-xl font-bold">Logged in as, User</h1>
            <div className="flex flex-row items-center gap-4">
              this is logout button
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="mt-14 flex-grow p-2 md:overflow-y-auto md:p-4">
        {children}
      </div>
    </div>
  );
}
