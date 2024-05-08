// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/dashboard/:path*"] };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// client and server side protection
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/blog/create",
    "/api/user/:path*",
    "/api/admin/:path*",
    "/api/author/:path*",
    "/api/crud/:path*",
  ],
};

export default withAuth(
  async function middleware(req) {
    // Check user's roles
    const url = req.nextUrl.pathname;
    const userRoles = req?.nextauth?.token?.user?.role;

    if (
      url?.includes("/admin") &&
      (!userRoles || !userRoles.includes("admin"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      url?.includes("/author") &&
      (!userRoles || !userRoles.includes("author"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If the user doesn't have the required role for the route, redirect them
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
        return true; // Return true to allow access
      },
    },
  }
);
