import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Deprecated. Use /api/assistant/queries/stream." }, { status: 410 });
}
