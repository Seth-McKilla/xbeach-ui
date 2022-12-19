import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });

  if (pathname === "/signin" && !!token) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  if (pathname.startsWith("/app") && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}
