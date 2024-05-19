"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardNav() {
  const { data: session, status, update } = useSession();

  return (
    <div className="flex h-full flex-row">
      <div className="flex w-64 flex-col items-center justify-center border-r">
        <h1 className="text-2xl font-bold">Palomade</h1>
      </div>
      <div className="flex h-full grow flex-row items-center justify-end px-4">
        {status === "loading" || !update ? (
          <div className="flex flex-row items-center space-x-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
            <Button disabled>Home</Button>
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-2">
            <p className="font-medium">{session?.user.first_name}</p>
            <Avatar>
              <AvatarImage src={session?.user.picture} />
            </Avatar>
            <Button asChild>
              <Link href="/">Homepage</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
