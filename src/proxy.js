import { NextResponse } from "next/server";
import { isSchoolNetwork } from "@/lib/auth/schoolNetwork";

export function proxy(request) {
  if (!isSchoolNetwork(request)) {
    return NextResponse.redirect(new URL("/restricted", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|restricted|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
