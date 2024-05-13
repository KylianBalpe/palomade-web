import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const thisPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    const newUrl = `${pathname}?${params.toString()}`;
    return newUrl;
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={thisPage <= 1}
        asChild={thisPage > 1}
      >
        <Link href={createPageURL(thisPage - 1)}>Previous</Link>
      </Button>
      <span className="text-sm">
        Page {thisPage} of {totalPages}
      </span>
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={thisPage === totalPages}
        asChild={thisPage < totalPages}
      >
        <Link href={createPageURL(thisPage + 1)}>Next</Link>
      </Button>
    </div>
  );
}
