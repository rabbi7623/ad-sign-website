import { NextResponse } from "next/server";
import { addProduct, updateProduct, deleteProduct } from "@/lib/data";

export async function POST(request) {
  const body = await request.json();
  const id = await addProduct(body);
  return NextResponse.json({ success: true, id });
}

export async function PUT(request) {
  const body = await request.json();
  await updateProduct(body.id, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
