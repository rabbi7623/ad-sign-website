import { NextResponse } from "next/server";
import { updateContent } from "@/lib/data";

export async function PUT(request) {
  try {
    const body = await request.json();
    const updated = await updateContent(body);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "সেভ করা যায়নি" }, { status: 500 });
  }
}
