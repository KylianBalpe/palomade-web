"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <main>
      <div>Dashboard</div>
    </main>
  );
};

export default Dashboard;
