import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapIcon, TruckIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Palomade
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Palomade is a leading provider of innovative solutions for
                managing and organizing employee, shipments, and lands of palm
                oil companies. Our team of experts is dedicated to helping our
                clients achieve their goals and succeed in today's competitive
                market.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="rounded-lg bg-gray-100 py-1 text-sm">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tailored Solutions for Your Palm Oil Business
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  At Palomade, we offer a wide range of services to help your
                  palm oil business thrive. From employee management and
                  shipment organization to land management and consulting, our
                  team of experts is here to help you every step of the way.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="mt-2 text-lg font-semibold">
                    Employee Management
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Our expert team will help you manage your employee records,
                    payroll, and other HR-related tasks.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <TruckIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="mt-2 text-lg font-semibold">
                    Shipment Organization
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    We'll help you streamline your shipment processes, from
                    tracking to logistics, to ensure efficient delivery.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <MapIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="mt-2 text-lg font-semibold">
                    Land Management
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Our team will help you manage your palm oil lands, including
                    mapping, surveying, and compliance.
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/image-1.jpg"
              width="550"
              height="310"
              alt="Services"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <Image
              src="/image-2.png"
              width="550"
              height="310"
              alt="Team"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              priority={true}
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Our Team
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Meet the Experts Behind Palomade
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our team of experts is dedicated to helping our clients
                  succeed. With years of experience in the palm oil industry, we
                  are committed to providing the highest level of service and
                  support.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <Avatar>
                    <img src="https://github.com/shadcn.png" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 text-lg font-semibold">John Doe</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    CEO
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <Avatar>
                    <img src="https://github.com/shadcn.png" alt="Jane Smith" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 text-lg font-semibold">Jane Smith</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    COO
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <Avatar>
                    <img
                      src="https://github.com/shadcn.png"
                      alt="Bob Johnson"
                    />
                    <AvatarFallback>BJ</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 text-lg font-semibold">Bob Johnson</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    CTO
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-950">
                  <Avatar>
                    <img src="https://github.com/shadcn.png" alt="Sarah Lee" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-2 text-lg font-semibold">Sarah Lee</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    CFO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-t py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center justify-center gap-4 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Get in Touch with Palomade
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you have a question, a comment, or are interested in our
                services, we'd love to hear from you. Fill out the form below
                and one of our team members will be in touch.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild>
                <Link href="/affiliate">Affiliate Now</Link>
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We'll never share your email with anyone else.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full border-t px-4 py-6 md:px-6">
        <div className="container flex shrink-0 flex-col items-center gap-2 sm:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; 2024 Palomade. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              href="#"
              className="text-xs underline-offset-4 hover:underline"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs underline-offset-4 hover:underline"
              prefetch={false}
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
