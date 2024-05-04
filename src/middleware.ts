import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const SuperAdminPaths = [
  "/dashboard/requests",
  "/dashboard/companies",
  "/dashboard/users",
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

    const isCompanyAdmin = req.nextUrl.pathname.startsWith(
      "/dashboard/employee",
    );

    if (isCompanyAdmin && req.nextauth.token?.role !== "ADMIN") {
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
