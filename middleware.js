import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedPage = path.startsWith("/admin/dashboard");
  const isProtectedApi = path.startsWith("/api/admin");

  if (isProtectedPage || isProtectedApi) {
    const cookie = request.cookies.get("ad_sign_admin");
    const valid =
      cookie && cookie.value === process.env.ADMIN_SESSION_SECRET;

    if (!valid) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/admin/:path*"],
};
