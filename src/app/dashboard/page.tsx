"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      {status === "authenticated" ? (
        <div className="flex flex-col items-center">
          <p>Welcome, {session?.user?.name}</p>
          <p>Role, {session?.user?.role}</p>
        </div>
      ) : (
        <h1 className="text-3xl">Dashboard</h1>
      )}
    </main>
  );
};

export default Dashboard;
