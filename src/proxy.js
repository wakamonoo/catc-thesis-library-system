import { NextResponse } from "next/server";
import { isSchoolNetwork } from "@/lib/auth/schoolNetwork";

export function proxy(request) {
  //—————————————————————————————for development—————————————————————————————//
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  if (!isSchoolNetwork(request)) {
    return NextResponse.rewrite(new URL("/restricted", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|restricted|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
