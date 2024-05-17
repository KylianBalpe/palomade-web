"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Forbidden() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8 dark:bg-zinc-950">
      <div className="flex w-full flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-max space-y-4 text-center">
          <h1 className="text-8xl font-bold tracking-tighter sm:text-5xl">
            403 Forbidden
          </h1>
          <p className="text-lg text-zinc-500">
            Sorry, you don't have permission to access this page.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => router.back()}>
              Return to previous page
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
