"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="pt-14" />
      <h1 className="text-3xl">Dashboard</h1>
      {status === "authenticated" && (
        <div className="flex flex-col items-center">
          <p>Welcome, {!session?.user?.name ? session?.user.username : session?.user?.name}</p>
          <p>Role, {session?.user?.role}</p>
          <p>Id, {session?.user?.id}</p>
          <Image src={session?.user?.picture} alt="profile picture" width={100} height={100} className="rounded-full" />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
