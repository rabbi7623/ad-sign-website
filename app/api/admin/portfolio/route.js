import { NextResponse } from "next/server";
import { deletePortfolioImage } from "@/lib/data";

export async function DELETE(request) {
  const { id } = await request.json();
  await deletePortfolioImage(id);
  return NextResponse.json({ success: true });
}
