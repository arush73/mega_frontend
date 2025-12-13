import { NextResponse } from "next/server";

export function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";

  // Mobile detection regex
  const isMobile = /Android|iPhone|iPad|iPod|Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

  // If user is on mobile and NOT already on /home → redirect
  if (isMobile && !request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Otherwise continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // apply only on homepage OR change as needed
};
