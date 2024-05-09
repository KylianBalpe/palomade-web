import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      Home
      <Link
        href="/activated"
        className="rounded-md bg-zinc-950 px-4 py-2 text-white"
      >
        Activated Page
      </Link>
    </main>
  );
}
