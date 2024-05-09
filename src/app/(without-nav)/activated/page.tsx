"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="rounded-full bg-green-500 p-4 text-white">
        <CheckCircle2Icon size={72} />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Account Verified</h1>
        <p className="text-gray-500">
          Congratulations! Your account has been successfully verified.
        </p>
      </div>
      <Button asChild>
        <Link href="/login">Login Now</Link>
      </Button>
    </main>
  );
}
