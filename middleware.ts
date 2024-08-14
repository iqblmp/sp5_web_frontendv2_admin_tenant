import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  //   if (request.nextUrl.pathname !== "/login" && !request.cookies.get("jwt")) {
  //     return NextResponse.redirect(new URL("/login", request.url))
  //   }
  //   if (request.nextUrl.pathname === "/login" && request.cookies.get("jwt")) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url))
  //   }
  //   if (request.nextUrl.pathname === "/") {
  //     return NextResponse.redirect(new URL("/dashboard", request.url))
  //   }
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
