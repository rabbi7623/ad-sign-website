import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();

  if (password && password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("ad_sign_admin", process.env.ADMIN_SESSION_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "পাসওয়ার্ড ভুল হয়েছে" }, { status: 401 });
}
