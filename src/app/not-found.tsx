"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="flex w-full flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-max space-y-4 text-center">
          <h1 className="text-8xl font-bold tracking-tighter sm:text-5xl">
            404 Not Found
          </h1>
          <p className="text-lg text-zinc-500">
            Oops, the page you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.back()}>Return to previous page</Button>
        </div>
      </div>
    </main>
  );
}
