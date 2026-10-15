import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { addPortfolioImage } from "@/lib/data";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const caption = formData.get("caption") || "";

    if (!file) {
      return NextResponse.json({ error: "ছবি পাওয়া যায়নি" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "ad-sign-portfolio",
    });

    await addPortfolioImage(result.secure_url, caption);

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "আপলোড ব্যর্থ হয়েছে" }, { status: 500 });
  }
}
