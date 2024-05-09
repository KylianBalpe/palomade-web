import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const SuperAdminPaths = [
  "/dashboard/requests",
  "/dashboard/companies",
  "/dashboard/users",
];

const CompanyAdminPaths = [
  "/dashboard/company",
  "/dashboard/employee",
  "/dashboard/shippings",
];

export default withAuth(
  function middleware(req) {
    const isSuperAdmin = SuperAdminPaths.some((path) =>
      req.nextUrl.pathname.startsWith(path),
    );

    if (isSuperAdmin && req.nextauth.token?.role !== "SUPERADMIN") {
      const redirectUrl = "/forbidden";
      return NextResponse.rewrite(req.nextUrl.origin + redirectUrl);
    }

    const isCompanyAdmin = CompanyAdminPaths.some((path) =>
      req.nextUrl.pathname.startsWith(path),
    );

    if (isCompanyAdmin && req.nextauth.token?.role !== "ADMIN") {
      const redirectUrl = "/forbidden";
      return NextResponse.rewrite(req.nextUrl.origin + redirectUrl);
    }

    const isDriver = req.nextUrl.pathname.startsWith("/dashboard/shippings");

    if (isDriver && req.nextauth.token?.role !== "DRIVER") {
      const redirectUrl = "/forbidden";
      return NextResponse.rewrite(req.nextUrl.origin + redirectUrl);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
  },
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
