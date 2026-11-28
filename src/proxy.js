import { NextResponse } from "next/server";
import { isSchoolNetwork } from "@/lib/auth/schoolNetwork";

export function proxy(request) {
  if (!isSchoolNetwork(request)) {
    return new NextResponse("Access restricted to the school network.", {
      status: 403,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
