import { storeDocument } from "@/utils/vectorstore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid input: text is required" },
        { status: 400 }
      );
    }

    await storeDocument(text);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Embed error:", error);
    return NextResponse.json(
      {
        error: "Failed to store document",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
