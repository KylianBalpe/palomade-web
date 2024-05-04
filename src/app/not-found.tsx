"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-9xl font-bold">404</h1>
        <h1 className="text-5xl font-semibold">Page not found</h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <Button onClick={() => router.back()}>Return to previous page</Button>
      </div>
    </main>
  );
}
