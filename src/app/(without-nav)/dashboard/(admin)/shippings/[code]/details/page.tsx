"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const params = useParams();

  return (
    <main className="flex flex-col space-y-4">
      <div>Detail Shippings</div>
      <div className="flex w-full flex-col space-y-4 rounded-md border p-8 shadow-md">
        <p>Shipping Code : {params.code}</p>
        <Link
          href="/dashboard/shippings"
          className="max-w-min rounded-md bg-zinc-950 px-4 py-2 text-white"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
