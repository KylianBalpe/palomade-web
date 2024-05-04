"use client";

import { LoaderCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Profile() {
  const { data: session, status, update } = useSession();
  return (
    <>
      <div>Profile</div>
      {status !== "loading" && (
        <>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src={session?.user?.picture}
              alt="profile-picture"
              width={180}
              height={180}
              className="rounded-full"
              priority={true}
            />
            <h1 className="text-lg font-semibold">{session?.user?.name}</h1>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-xs">{session?.user?.email}</h2>
          </div>
        </>
      )}
    </>
  );
}
