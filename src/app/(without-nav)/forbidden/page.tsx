"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Forbidden() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-9xl font-bold">403</h1>
        <h1 className="text-5xl font-semibold">Forbidden</h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-lg font-medium">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => router.back()}>Return to previous page</Button>
      </div>
    </main>
  );
}
